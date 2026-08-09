"use client";

import { Suspense, useEffect, useMemo, useRef, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { PerspectiveCamera, useGLTF } from "@react-three/drei";
import * as THREE from "three";

const isMobile = () => typeof window !== "undefined" && window.innerWidth < 768;

const VERTEX_IMAGE_URLS = Array.from(
  { length: 59 - 27 + 1 },
  (_, i) => `/onemoretest/${encodeURIComponent(`Rectangle ${27 + i}.svg`)}`
);

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

// ── Vertex image sprites ───────────────────────────────────────────────────
function loadSvgTexture(url: string): Promise<THREE.Texture> {
  return new Promise((resolve) => {
    const img = new window.Image();
    img.decoding = "async";
    img.onload = () => {
      const canvas = document.createElement("canvas");
      canvas.width = 128;
      canvas.height = 128;
      canvas.getContext("2d")!.drawImage(img, 0, 0, 128, 128);
      const tex = new THREE.CanvasTexture(canvas);
      tex.colorSpace = THREE.SRGBColorSpace;
      tex.generateMipmaps = false;
      tex.minFilter = THREE.LinearFilter;
      resolve(tex);
    };
    img.onerror = () => resolve(new THREE.Texture());
    img.src = url;
  });
}

function VertexImages({ scene }: { scene: THREE.Object3D }) {
  const count = isMobile() ? 150 : 300;
  const triData = useMemo(() => buildTriangleData(scene), [scene]);
  const positions = useMemo(() => sampleTriangleData(triData, count), [triData, count]);

  const [textures, setTextures] = useState<THREE.Texture[]>([]);
  useEffect(() => {
    let cancelled = false;
    Promise.all(VERTEX_IMAGE_URLS.map(loadSvgTexture)).then((texs) => {
      if (!cancelled) setTextures(texs);
    });
    return () => { cancelled = true; };
  }, []);

  const materials = useMemo(
    () => textures.map((tex) => new THREE.SpriteMaterial({ map: tex, sizeAttenuation: true, transparent: true, depthWrite: false })),
    [textures]
  );
  useEffect(() => () => { materials.forEach((m) => m.dispose()); }, [materials]);
  useEffect(() => () => { textures.forEach((t) => t.dispose()); }, [textures]);

  if (materials.length === 0 || positions.length === 0) return null;

  const size = 0.035;
  return (
    <>
      {positions.map((pos, i) => (
        <sprite key={i} material={materials[i % materials.length]} position={[pos.x, pos.y, pos.z]} scale={[size, size, 1]} />
      ))}
    </>
  );
}

// ── Figure ─────────────────────────────────────────────────────────────────
function Figure() {
  const { scene } = useGLTF("/figure.glb");

  const groupRef = useRef<THREE.Group>(null);
  useFrame((state, delta) => {
    if (!groupRef.current) return;
    const targetY = state.pointer.x * 0.5;
    const targetX = -state.pointer.y * 0.15;
    const ease = 1 - Math.exp(-delta * 3);
    groupRef.current.rotation.y += (targetY - groupRef.current.rotation.y) * ease;
    groupRef.current.rotation.x += (targetX - groupRef.current.rotation.x) * ease;
  });

  return (
    <group ref={groupRef} scale={200}>
      <VertexImages scene={scene} />
    </group>
  );
}

useGLTF.preload("/figure.glb");

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
