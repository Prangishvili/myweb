"use client";

import { Suspense, useEffect, useMemo, useRef } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { PerspectiveCamera, useGLTF } from "@react-three/drei";
import * as THREE from "three";

const isMobile = () => typeof window !== "undefined" && window.innerWidth < 768;

function CameraRig() {
  const { camera } = useThree();
  useEffect(() => {
    camera.lookAt(0, 260, 0);
  }, [camera]);
  return null;
}

function FigureDots() {
  const { scene } = useGLTF("/figure.glb");

  const geometry = useMemo(() => {
    const DOT_COUNT = isMobile() ? 10000 : 30000;
    scene.updateMatrixWorld(true);
    const rootInv = new THREE.Matrix4().copy(scene.matrixWorld).invert();
    const all: number[] = [];
    scene.traverse((obj) => {
      const mesh = obj as THREE.Mesh;
      if (!mesh.isMesh) return;
      const rel = new THREE.Matrix4().copy(mesh.matrixWorld).premultiply(rootInv);
      const pos = mesh.geometry.getAttribute("position");
      for (let i = 0; i < pos.count; i++) {
        const v = new THREE.Vector3(pos.getX(i), pos.getY(i), pos.getZ(i)).applyMatrix4(rel);
        all.push(v.x, v.y, v.z);
      }
    });
    const stride = Math.max(1, Math.floor(all.length / 3 / DOT_COUNT));
    const sub: number[] = [];
    for (let i = 0; i < all.length / 3 && sub.length / 3 < DOT_COUNT; i += stride) {
      sub.push(all[i * 3], all[i * 3 + 1], all[i * 3 + 2]);
    }
    const g = new THREE.BufferGeometry();
    g.setAttribute("position", new THREE.BufferAttribute(new Float32Array(sub), 3));
    return g;
  }, [scene]);

  useEffect(() => () => geometry.dispose(), [geometry]);

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
      <points geometry={geometry}>
        <pointsMaterial color="#000000" size={0.75} sizeAttenuation />
      </points>
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
          <FigureDots />
        </Suspense>
      </Canvas>
    </section>
  );
}
