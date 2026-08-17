"use client";

import { Suspense, useEffect, useMemo, useRef, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { PerspectiveCamera, useGLTF } from "@react-three/drei";
import * as THREE from "three";
import { VERTEX_COLORS } from "@/data/palette";

const isMobile = () => typeof window !== "undefined" && window.innerWidth < 768;

const SPRITE_SIZE = 0.035;
const JITTER_AMOUNT = 0.015;
const ZERO_VECTOR = new THREE.Vector3(0, 0, 0);

// Scatter-in intro: sprites start at a random point in a diffuse cloud around the
// figure's centroid, then ease back "magnetically" to their real position on the figure.
const SCATTER_RADIUS_MIN = 1.15;
const SCATTER_RADIUS_MAX = 1.6;
const INTRO_STAGGER = 0.5; // seconds spread across the whole group
const INTRO_MIN_DURATION = 0.7;
const INTRO_MAX_DURATION = 1.3;

// Ambient float: a small continuous drift applied to every sprite at all times,
// so they never sit perfectly still even once settled on the figure.
const FLOAT_AMOUNT = 0.02;
const FLOAT_FREQ_MIN = 0.15;
const FLOAT_FREQ_MAX = 0.4;

// Mouse repulsion: sprites within REPEL_RADIUS of the cursor's position (projected
// onto the figure's plane) get pushed directly away from it, falling off with distance.
// Scaled off the head's own bounding radius (not a flat number) so the reach covers
// most of the figure instead of only a small patch right under the cursor.
const REPEL_RADIUS_RATIO = 1.42;
const REPEL_STRENGTH = 1.44;
const REPEL_FALLOFF_EXPONENT = 6;

type RepelSettings = { radiusRatio: number; strength: number; falloffExponent: number };

const HEADER_ELEMENT_IDS = ["brand", "Works", "Exhibition", "Motion", "Information"];

function createCircleTexture(): THREE.Texture {
  const size = 1024;
  const canvas = document.createElement("canvas");
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext("2d")!;
  ctx.beginPath();
  ctx.arc(size / 2, size / 2, size / 2, 0, Math.PI * 2);
  ctx.fillStyle = "#fff";
  ctx.fill();
  const tex = new THREE.CanvasTexture(canvas);
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.generateMipmaps = true;
  tex.minFilter = THREE.LinearMipmapLinearFilter;
  tex.magFilter = THREE.LinearFilter;
  tex.anisotropy = 4;
  return tex;
}

function CameraRig() {
  const { camera } = useThree();
  useEffect(() => {
    camera.lookAt(0, 260, 0);
  }, [camera]);
  return null;
}

// ── Raw vertex collection (deterministic) ────────────────────────────────────
function collectVertexPositions(root: THREE.Object3D): THREE.Vector3[] {
  root.updateMatrixWorld(true);
  const rootInv = new THREE.Matrix4().copy(root.matrixWorld).invert();
  const positions: THREE.Vector3[] = [];
  root.traverse((obj) => {
    const geo = (obj as THREE.Mesh | THREE.Points).geometry as THREE.BufferGeometry | undefined;
    const posAttr = geo?.getAttribute("position");
    if (!posAttr) return;
    const transform = new THREE.Matrix4().multiplyMatrices(rootInv, obj.matrixWorld);
    for (let i = 0; i < posAttr.count; i++) {
      positions.push(new THREE.Vector3(posAttr.getX(i), posAttr.getY(i), posAttr.getZ(i)).applyMatrix4(transform));
    }
  });
  return positions;
}

function pickEvenly(all: THREE.Vector3[], count: number): THREE.Vector3[] {
  if (all.length <= count) return all;
  const result: THREE.Vector3[] = [];
  for (let i = 0; i < count; i++) result.push(all[Math.floor((i * all.length) / count)]);
  return result;
}

// ── Vertex circle sprites ─────────────────────────────────────────────────
function VertexImages({
  scene,
  hoveredRef,
  figureGroupRef,
  repelSettingsRef,
}: {
  scene: THREE.Object3D;
  hoveredRef: React.RefObject<string | null>;
  figureGroupRef: React.RefObject<THREE.Group | null>;
  repelSettingsRef: React.RefObject<RepelSettings>;
}) {
  const count = isMobile() ? 150 : 300;
  const allVertices = useMemo(() => collectVertexPositions(scene), [scene]);
  const positions = useMemo(() => pickEvenly(allVertices, count), [allVertices, count]);

  const elementAssignments = useMemo(
    () => positions.map(() => HEADER_ELEMENT_IDS[Math.floor(Math.random() * HEADER_ELEMENT_IDS.length)]),
    [positions]
  );

  const texture = useMemo(() => createCircleTexture(), []);
  useEffect(() => () => texture.dispose(), [texture]);

  const materials = useMemo(
    () =>
      VERTEX_COLORS.map(
        (color) =>
          new THREE.SpriteMaterial({
            map: texture,
            color,
            sizeAttenuation: true,
            transparent: true,
            depthWrite: false,
            alphaTest: 0.4,
          })
      ),
    [texture]
  );
  useEffect(() => () => { materials.forEach((m) => m.dispose()); }, [materials]);

  const originalMaterialIndices = useMemo(
    () => positions.map((_, i) => (materials.length ? i % materials.length : 0)),
    [positions, materials.length]
  );
  const shuffledMaterialIndices = useRef<number[]>([]);
  useEffect(() => {
    shuffledMaterialIndices.current = [...originalMaterialIndices];
  }, [originalMaterialIndices]);

  const jitterOffsets = useMemo(
    () =>
      positions.map(
        () =>
          new THREE.Vector3(
            (Math.random() - 0.5) * 2 * JITTER_AMOUNT,
            (Math.random() - 0.5) * 2 * JITTER_AMOUNT,
            (Math.random() - 0.5) * 2 * JITTER_AMOUNT
          )
      ),
    [positions]
  );
  const currentOffsets = useMemo(() => positions.map(() => new THREE.Vector3(0, 0, 0)), [positions]);

  const centroid = useMemo(() => {
    const c = new THREE.Vector3();
    positions.forEach((p) => c.add(p));
    if (positions.length) c.divideScalar(positions.length);
    return c;
  }, [positions]);

  const boundingRadius = useMemo(
    () => positions.reduce((max, p) => Math.max(max, p.distanceTo(centroid)), 0.001),
    [positions, centroid]
  );
  // A fully independent random point in a diffuse spherical cloud around the figure,
  // rather than scaling each point along its own radius — avoids a uniform "starburst"
  // where sprites near the centroid barely move and outer ones fly the farthest.
  const scatterPositions = useMemo(
    () =>
      positions.map(() => {
        const theta = Math.random() * Math.PI * 2;
        const phi = Math.acos(2 * Math.random() - 1);
        const radius = boundingRadius * (SCATTER_RADIUS_MIN + Math.random() * (SCATTER_RADIUS_MAX - SCATTER_RADIUS_MIN));
        return new THREE.Vector3(
          centroid.x + radius * Math.sin(phi) * Math.cos(theta),
          centroid.y + radius * Math.sin(phi) * Math.sin(theta),
          centroid.z + radius * Math.cos(phi)
        );
      }),
    [positions, centroid, boundingRadius]
  );

  const introTiming = useMemo(
    () =>
      positions.map((_, i) => ({
        delay: (i / Math.max(1, positions.length)) * INTRO_STAGGER + Math.random() * 0.15,
        duration: INTRO_MIN_DURATION + Math.random() * (INTRO_MAX_DURATION - INTRO_MIN_DURATION),
      })),
    [positions]
  );
  // Hover-driven version of the intro: instead of playing once on a timer, the same
  // scatter <-> settled interpolation now plays whenever the cursor is over a header
  // menu item, and reverses back to scattered on mouse-leave. Each sprite's original
  // stagger delay is reused to vary its settle speed, so sprites still converge in a
  // staggered wave instead of all snapping at once.
  const currentIntroT = useMemo(() => new Float32Array(positions.length).fill(0), [positions]);

  const floatSeeds = useMemo(
    () =>
      positions.map(() => ({
        phaseX: Math.random() * Math.PI * 2,
        phaseY: Math.random() * Math.PI * 2,
        phaseZ: Math.random() * Math.PI * 2,
        freqX: FLOAT_FREQ_MIN + Math.random() * (FLOAT_FREQ_MAX - FLOAT_FREQ_MIN),
        freqY: FLOAT_FREQ_MIN + Math.random() * (FLOAT_FREQ_MAX - FLOAT_FREQ_MIN),
        freqZ: FLOAT_FREQ_MIN + Math.random() * (FLOAT_FREQ_MAX - FLOAT_FREQ_MIN),
      })),
    [positions]
  );

  const currentRepelOffsets = useMemo(() => positions.map(() => new THREE.Vector3(0, 0, 0)), [positions]);
  const raycaster = useMemo(() => new THREE.Raycaster(), []);
  const repelPlane = useMemo(() => new THREE.Plane(), []);
  const localMouse = useMemo(() => new THREE.Vector3(), []);
  const camDir = useMemo(() => new THREE.Vector3(), []);
  const repelTarget = useMemo(() => new THREE.Vector3(), []);
  const worldCentroid = useMemo(() => new THREE.Vector3(), []);

  const groupRef = useRef<THREE.Group>(null);
  const currentSizes = useMemo(() => new Float32Array(positions.length).fill(SPRITE_SIZE), [positions]);
  const wasHoveredElement = useRef<boolean[]>([]);
  useEffect(() => {
    wasHoveredElement.current = positions.map(() => false);
  }, [positions]);

  useFrame((state, delta) => {
    const hovered = hoveredRef.current;
    const ease = 1 - Math.exp(-delta * 6);
    const introTriggerEase = 1 - Math.exp(-delta * 3.5);

    // Cast the cursor onto a plane through the head's actual center, facing the
    // camera, then bring that point into the figure's local space — the same
    // space `positions[i]` lives in — so distance comparisons are meaningful.
    // Anchoring on the group's own origin (rather than where the head visually
    // sits) was the bug behind the repulsion feeling lopsided — the group's
    // origin doesn't coincide with the head's center once rotated.
    let hasMouseTarget = false;
    if (figureGroupRef.current) {
      worldCentroid.copy(centroid);
      figureGroupRef.current.localToWorld(worldCentroid);
      state.camera.getWorldDirection(camDir);
      repelPlane.setFromNormalAndCoplanarPoint(camDir, worldCentroid);
      raycaster.setFromCamera(state.pointer, state.camera);
      hasMouseTarget = raycaster.ray.intersectPlane(repelPlane, localMouse) !== null;
      if (hasMouseTarget) figureGroupRef.current.worldToLocal(localMouse);
    }

    groupRef.current?.children.forEach((child, i) => {
      const isHoveredElement = !!hovered && elementAssignments[i] === hovered;
      const target = hovered ? SPRITE_SIZE * 1.3 : SPRITE_SIZE;
      currentSizes[i] += (target - currentSizes[i]) * ease;
      child.scale.set(currentSizes[i], currentSizes[i], 1);

      const targetOffset = hovered ? jitterOffsets[i] : ZERO_VECTOR;
      currentOffsets[i].lerp(targetOffset, ease);

      const { delay } = introTiming[i];
      const settleBias = delay / INTRO_STAGGER; // 0..~1, reused as a per-sprite settle-speed offset
      const targetIntroT = hovered !== null ? 0 : 1;
      const staggerEase = Math.min(1, introTriggerEase * (1.4 - settleBias * 0.8));
      currentIntroT[i] += (targetIntroT - currentIntroT[i]) * staggerEase;
      const introT = currentIntroT[i];
      // ease-in-out: slow start, fast middle, slow settle — instead of a linear scrub.
      const introEased = introT < 0.5 ? 4 * introT ** 3 : 1 - (-2 * introT + 2) ** 3 / 2;
      const scat = scatterPositions[i];
      const pos = positions[i];
      const baseX = scat.x + (pos.x - scat.x) * introEased;
      const baseY = scat.y + (pos.y - scat.y) * introEased;
      const baseZ = scat.z + (pos.z - scat.z) * introEased;

      // Float fades out as each sprite settles, so it's only alive while still adrift.
      const seed = floatSeeds[i];
      const floatAmount = FLOAT_AMOUNT * (1 - introEased);
      const floatX = Math.sin(state.clock.elapsedTime * seed.freqX + seed.phaseX) * floatAmount;
      const floatY = Math.sin(state.clock.elapsedTime * seed.freqY + seed.phaseY) * floatAmount;
      const floatZ = Math.sin(state.clock.elapsedTime * seed.freqZ + seed.phaseZ) * floatAmount;

      // Push settled sprites directly away from the cursor, falling off with distance.
      repelTarget.set(0, 0, 0);
      if (hasMouseTarget) {
        const { radiusRatio, strength: repelStrength, falloffExponent } = repelSettingsRef.current;
        const repelRadius = boundingRadius * radiusRatio;
        const dx = pos.x - localMouse.x;
        const dy = pos.y - localMouse.y;
        const dz = pos.z - localMouse.z;
        const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);
        if (dist < repelRadius && dist > 1e-5) {
          const falloff = 1 - dist / repelRadius;
          const strength = Math.pow(falloff, falloffExponent) * repelStrength;
          repelTarget.set((dx / dist) * strength, (dy / dist) * strength, (dz / dist) * strength);
        }
      }
      currentRepelOffsets[i].lerp(repelTarget, ease);

      child.position.set(
        baseX + currentOffsets[i].x + floatX + currentRepelOffsets[i].x,
        baseY + currentOffsets[i].y + floatY + currentRepelOffsets[i].y,
        baseZ + currentOffsets[i].z + floatZ + currentRepelOffsets[i].z
      );

      if (materials.length === 0) return;
      const sprite = child as THREE.Sprite;
      if (isHoveredElement) {
        if (!wasHoveredElement.current[i]) {
          shuffledMaterialIndices.current[i] = Math.floor(Math.random() * materials.length);
        }
        sprite.material = materials[shuffledMaterialIndices.current[i]];
      } else {
        sprite.material = materials[originalMaterialIndices[i]];
      }
      wasHoveredElement.current[i] = isHoveredElement;
    });
  });

  if (materials.length === 0 || positions.length === 0) return null;

  return (
    <group ref={groupRef}>
      {scatterPositions.map((pos, i) => (
        <sprite key={i} material={materials[originalMaterialIndices[i]]} position={[pos.x, pos.y, pos.z]} scale={[SPRITE_SIZE, SPRITE_SIZE, 1]} />
      ))}
    </group>
  );
}

// ── Figure ─────────────────────────────────────────────────────────────────
function Figure({ repelSettingsRef }: { repelSettingsRef: React.RefObject<RepelSettings> }) {
  const { scene } = useGLTF("/figure.glb");

  const groupRef = useRef<THREE.Group>(null);
  const pointer = useRef({ x: 0, y: 0 });
  const hoveredRef = useRef<string | null>(null);

  useEffect(() => {
    const onPointerMove = (e: PointerEvent) => {
      pointer.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      pointer.current.y = -(e.clientY / window.innerHeight) * 2 + 1;
    };
    window.addEventListener("pointermove", onPointerMove);
    return () => window.removeEventListener("pointermove", onPointerMove);
  }, []);

  useEffect(() => {
    const onHeaderHover = (e: Event) => {
      hoveredRef.current = (e as CustomEvent<string | null>).detail;
    };
    window.addEventListener("header-hover", onHeaderHover);
    return () => window.removeEventListener("header-hover", onHeaderHover);
  }, []);

  useFrame((state, delta) => {
    if (!groupRef.current) return;
    const targetY = pointer.current.x * 0.5;
    const targetX = -pointer.current.y * 0.15;
    const ease = 1 - Math.exp(-delta * 3);
    groupRef.current.rotation.y += (targetY - groupRef.current.rotation.y) * ease;
    groupRef.current.rotation.x += (targetX - groupRef.current.rotation.x) * ease;
  });

  return (
    <group ref={groupRef} scale={200}>
      <VertexImages scene={scene} hoveredRef={hoveredRef} figureGroupRef={groupRef} repelSettingsRef={repelSettingsRef} />
    </group>
  );
}

useGLTF.preload("/figure.glb");

const REPEL_DEBUG_CONTROLS: { key: keyof RepelSettings; label: string; min: number; max: number; step: number }[] = [
  { key: "radiusRatio", label: "Radius", min: 0.1, max: 2, step: 0.01 },
  { key: "strength", label: "Strength", min: 0, max: 2, step: 0.01 },
  { key: "falloffExponent", label: "Falloff", min: 0.5, max: 6, step: 0.1 },
];

function RepelDebugPanel({ repelSettingsRef }: { repelSettingsRef: React.RefObject<RepelSettings> }) {
  const [values, setValues] = useState<RepelSettings>(repelSettingsRef.current);

  return (
    <div className="fixed top-4 right-4 z-50 w-56 rounded-lg bg-black/80 p-3 font-mono text-xs text-white backdrop-blur">
      {REPEL_DEBUG_CONTROLS.map(({ key, label, min, max, step }) => (
        <label key={key} className="mb-2 block last:mb-0">
          <div className="mb-1 flex items-center justify-between">
            <span>{label}</span>
            <span>{values[key].toFixed(2)}</span>
          </div>
          <input
            type="range"
            min={min}
            max={max}
            step={step}
            value={values[key]}
            onChange={(e) => {
              const next = { ...repelSettingsRef.current, [key]: parseFloat(e.target.value) };
              repelSettingsRef.current = next;
              setValues(next);
            }}
            className="w-full"
          />
        </label>
      ))}
    </div>
  );
}

export default function FigureHero() {
  const repelSettingsRef = useRef<RepelSettings>({
    radiusRatio: REPEL_RADIUS_RATIO,
    strength: REPEL_STRENGTH,
    falloffExponent: REPEL_FALLOFF_EXPONENT,
  });
  const [panelVisible, setPanelVisible] = useState(false);

  // Debug panel is hidden by default — hold V+Z together to toggle it.
  useEffect(() => {
    let vDown = false;
    let zDown = false;
    let triggered = false;
    function onKeyDown(e: KeyboardEvent) {
      const key = e.key.toLowerCase();
      if (key === "v") vDown = true;
      else if (key === "z") zDown = true;
      else return;
      if (vDown && zDown && !triggered) {
        triggered = true;
        setPanelVisible((v) => !v);
      }
    }
    function onKeyUp(e: KeyboardEvent) {
      const key = e.key.toLowerCase();
      if (key === "v") vDown = false;
      else if (key === "z") zDown = false;
      else return;
      if (!vDown || !zDown) triggered = false;
    }
    window.addEventListener("keydown", onKeyDown);
    window.addEventListener("keyup", onKeyUp);
    return () => {
      window.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("keyup", onKeyUp);
    };
  }, []);

  return (
    <section className="relative h-[100dvh] w-full bg-white">
      <Canvas dpr={[1, isMobile() ? 1.5 : 2]} gl={{ antialias: true }}>
        <PerspectiveCamera makeDefault position={[0, 180, 430]} fov={40} near={0.1} far={5000} />
        <CameraRig />
        <Suspense fallback={null}>
          <Figure repelSettingsRef={repelSettingsRef} />
        </Suspense>
      </Canvas>
      {panelVisible && <RepelDebugPanel repelSettingsRef={repelSettingsRef} />}
    </section>
  );
}
