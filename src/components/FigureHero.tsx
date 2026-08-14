"use client";

import { Suspense, useEffect, useMemo, useRef } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { PerspectiveCamera, useGLTF } from "@react-three/drei";
import * as THREE from "three";

const isMobile = () => typeof window !== "undefined" && window.innerWidth < 768;

const SPRITE_SIZE = 0.035;
const JITTER_AMOUNT = 0.015;
const ZERO_VECTOR = new THREE.Vector3(0, 0, 0);

const HEADER_ELEMENT_IDS = ["brand", "Works", "Exhibition", "Motion", "Information"];

const VERTEX_COLORS = [
  "#FF2020", "#FF9442", "#FFC72D", "#F6FF00", "#D4FF00", "#AFFF2D", "#20FF3A", "#2FFFE7",
  "#46C7FF", "#2790FF", "#7315FF", "#BE19FF", "#EC16FF", "#FF258B", "#FF2962", "#A82424",
  "#DBDE46", "#89C74C", "#2DBD71", "#0F6E52", "#FF9365", "#1B60C1", "#7521CF", "#D223E5",
  "#FF37DE", "#C598BE", "#D26F6F", "#9A0003", "#C8E6E0", "#FFE679", "#FF9500", "#9A9A9A",
  "#252525",
];

function createCircleTexture(): THREE.Texture {
  const canvas = document.createElement("canvas");
  canvas.width = 64;
  canvas.height = 64;
  const ctx = canvas.getContext("2d")!;
  ctx.beginPath();
  ctx.arc(32, 32, 32, 0, Math.PI * 2);
  ctx.fillStyle = "#fff";
  ctx.fill();
  const tex = new THREE.CanvasTexture(canvas);
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.generateMipmaps = false;
  tex.minFilter = THREE.LinearFilter;
  return tex;
}

function CameraRig() {
  const { camera } = useThree();
  useEffect(() => {
    camera.lookAt(0, 260, 0);
  }, [camera]);
  return null;
}

// ── Area-weighted triangle sampler (deterministic) ───────────────────────────
type Tri = { a: THREE.Vector3; b: THREE.Vector3; c: THREE.Vector3; area: number };
type TriangleData = { tris: Tri[]; cum: Float64Array; totalArea: number };

function buildTriangleData(root: THREE.Object3D): TriangleData {
  root.updateMatrixWorld(true);
  const rootInv = new THREE.Matrix4().copy(root.matrixWorld).invert();
  const tris: Tri[] = [];
  let totalArea = 0;
  root.traverse((obj) => {
    const mesh = obj as THREE.Mesh;
    if (!mesh.isMesh) return;
    const geo = mesh.geometry;
    const posAttr = geo.getAttribute("position");
    if (!posAttr) return;
    const transform = new THREE.Matrix4().multiplyMatrices(rootInv, mesh.matrixWorld);
    const getP = (i: number) => new THREE.Vector3(posAttr.getX(i), posAttr.getY(i), posAttr.getZ(i)).applyMatrix4(transform);
    const idx = geo.index;
    const triCount = idx ? idx.count / 3 : posAttr.count / 3;
    for (let t = 0; t < triCount; t++) {
      const ia = idx ? idx.getX(t * 3) : t * 3;
      const ib = idx ? idx.getX(t * 3 + 1) : t * 3 + 1;
      const ic = idx ? idx.getX(t * 3 + 2) : t * 3 + 2;
      const a = getP(ia), b = getP(ib), c = getP(ic);
      const area = new THREE.Triangle(a, b, c).getArea();
      totalArea += area;
      tris.push({ a, b, c, area });
    }
  });
  const cum = new Float64Array(tris.length);
  let acc = 0;
  for (let i = 0; i < tris.length; i++) { acc += tris[i].area; cum[i] = acc; }
  return { tris, cum, totalArea };
}

function sampleTriangleData({ tris, cum, totalArea }: TriangleData, count: number): THREE.Vector3[] {
  if (count === 0 || tris.length === 0 || totalArea === 0) return [];
  const result: THREE.Vector3[] = [];
  for (let s = 0; s < count; s++) {
    const target = (s + 0.5) / count * totalArea;
    let lo = 0, hi = tris.length - 1;
    while (lo < hi) { const mid = (lo + hi) >> 1; if (cum[mid] < target) lo = mid + 1; else hi = mid; }
    const tri = tris[lo];
    const u = (s * 0.7548776662) % 1;
    const v = (s * 0.5698402910) % 1;
    const su = Math.sqrt(u);
    const r1 = 1 - su, r2 = v * su, r3 = 1 - r1 - r2;
    const pos = new THREE.Vector3().addScaledVector(tri.a, r1).addScaledVector(tri.b, r2).addScaledVector(tri.c, r3);
    result.push(pos);
  }
  return result;
}

// ── Vertex circle sprites ─────────────────────────────────────────────────
function VertexImages({ scene, hoveredRef }: { scene: THREE.Object3D; hoveredRef: React.RefObject<string | null> }) {
  const count = isMobile() ? 150 : 300;
  const triData = useMemo(() => buildTriangleData(scene), [scene]);
  const positions = useMemo(() => sampleTriangleData(triData, count), [triData, count]);

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

  const groupRef = useRef<THREE.Group>(null);
  const currentSizes = useMemo(() => new Float32Array(positions.length).fill(SPRITE_SIZE), [positions]);
  const wasHoveredElement = useRef<boolean[]>([]);
  useEffect(() => {
    wasHoveredElement.current = positions.map(() => false);
  }, [positions]);

  useFrame((_, delta) => {
    const hovered = hoveredRef.current;
    const ease = 1 - Math.exp(-delta * 6);

    groupRef.current?.children.forEach((child, i) => {
      const isHoveredElement = !!hovered && elementAssignments[i] === hovered;
      const target = hovered ? SPRITE_SIZE * 1.3 : SPRITE_SIZE;
      currentSizes[i] += (target - currentSizes[i]) * ease;
      child.scale.set(currentSizes[i], currentSizes[i], 1);

      const targetOffset = hovered ? jitterOffsets[i] : ZERO_VECTOR;
      currentOffsets[i].lerp(targetOffset, ease);
      const pos = positions[i];
      child.position.set(pos.x + currentOffsets[i].x, pos.y + currentOffsets[i].y, pos.z + currentOffsets[i].z);

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
      {positions.map((pos, i) => (
        <sprite key={i} material={materials[originalMaterialIndices[i]]} position={[pos.x, pos.y, pos.z]} scale={[SPRITE_SIZE, SPRITE_SIZE, 1]} />
      ))}
    </group>
  );
}

// ── Figure ─────────────────────────────────────────────────────────────────
function Figure() {
  const { scene } = useGLTF("https://xpm2mzg2i8lygpiz.public.blob.vercel-storage.com/figure.glb");

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
      <VertexImages scene={scene} hoveredRef={hoveredRef} />
    </group>
  );
}

useGLTF.preload("https://xpm2mzg2i8lygpiz.public.blob.vercel-storage.com/figure.glb");

export default function FigureHero() {
  return (
    <section className="h-[100dvh] w-full bg-white">
      <Canvas dpr={[1, isMobile() ? 1.5 : 2]} gl={{ antialias: true }}>
        <PerspectiveCamera makeDefault position={[0, 180, 430]} fov={40} near={0.1} far={5000} />
        <CameraRig />
        <Suspense fallback={null}>
          <Figure />
        </Suspense>
      </Canvas>
    </section>
  );
}
