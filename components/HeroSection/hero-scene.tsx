"use client";

import React, { useEffect, useRef } from "react";
import { Canvas, useFrame, useLoader } from "@react-three/fiber";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
import { MotionValue } from "framer-motion";
import { motion } from "framer-motion-3d";

type MotionNumber = MotionValue<number>;

interface FlyingDonutProps {
  gltfPath: string;
  rotateX: MotionNumber;
  donutPosX: MotionNumber;
  donutPosY: MotionNumber;
  donutPosZ: MotionNumber;
  scale: MotionNumber;
}

interface HeroDonutProps {
  gltfPath: string;
  donut2PosX: MotionNumber;
  donut2PosY: MotionNumber;
  donut2PosZ: MotionNumber;
  scale: MotionNumber;
  rotationX: MotionNumber;
}

export interface HeroSceneProps {
  gltfPath: string;
  gltfPath2: string;
  scale: MotionNumber;
  donutPosX: MotionNumber;
  donutPosY: MotionNumber;
  donutPosZ: MotionNumber;
  rotateX: MotionNumber;
  donut2PosX: MotionNumber;
  donut2PosY: MotionNumber;
  donut2PosZ: MotionNumber;
  donut2Scale: MotionNumber;
  donut2RotationX: MotionNumber;
}

const FlyingDonut: React.FC<FlyingDonutProps> = ({
  donutPosX,
  donutPosY,
  donutPosZ,
  rotateX,
  gltfPath,
  scale,
}) => {
  const gltf = useLoader(GLTFLoader, gltfPath);

  useEffect(() => {
    // Make sure the loaded GLTF meshes participate in the shadow pipeline.
    gltf.scene.traverse((child: any) => {
      if (child?.isMesh) {
        child.castShadow = true;
        child.receiveShadow = true;
      }
    });
  }, [gltf]);

  return (
    <motion.primitive
      object={gltf.scene}
      scale={scale}
      rotation-x={rotateX}
      duration={300}
      position={[donutPosX, donutPosY, donutPosZ]}
    />
  );
};

const HeroDonut: React.FC<HeroDonutProps> = ({
  gltfPath,
  donut2PosX,
  donut2PosY,
  donut2PosZ,
  scale,
  rotationX,
}) => {
  const gltf = useLoader(GLTFLoader, gltfPath);
  const mesh = useRef<any>();

  useEffect(() => {
    // Make sure the loaded GLTF meshes participate in the shadow pipeline.
    gltf.scene.traverse((child: any) => {
      if (child?.isMesh) {
        child.castShadow = true;
        child.receiveShadow = true;
      }
    });
  }, [gltf]);

  useFrame(() => {
    if (mesh.current) {
      mesh.current.rotation.y += 0.0009;
    }
  });

  return (
    <motion.primitive
      ref={mesh}
      object={gltf.scene}
      scale={scale}
      rotation-x={rotationX}
      position={[donut2PosX, donut2PosY, donut2PosZ]}
    />
  );
};

export default function HeroScene({
  gltfPath,
  gltfPath2,
  scale,
  donutPosX,
  donutPosY,
  donutPosZ,
  rotateX,
  donut2PosX,
  donut2PosY,
  donut2PosZ,
  donut2Scale,
  donut2RotationX,
}: HeroSceneProps) {
  return (
    <Canvas
      shadows
      style={{
        zIndex: "50",
        position: "fixed",
        top: "50%",
        transform: "translateY(-50%)",
        left: "0px",
        height: "100svh",
        width: "100vw",
      }}
    >
      <ambientLight intensity={1.25} />
      <pointLight position={[3, 3, -5]} intensity={2.2} />
      <directionalLight position={[6, 8, 2]} intensity={1.4} />
      <directionalLight position={[-6, 2, -2]} intensity={0.6} />

      {/* Invisible ground to receive real GLTF shadows */}
      <mesh receiveShadow rotation-x={-Math.PI / 2} position={[0, 0, 0]}>
        <planeGeometry args={[200, 200]} />
        <meshStandardMaterial color="#000000" transparent opacity={0} />
      </mesh>

      <FlyingDonut
        scale={scale}
        donutPosX={donutPosX}
        donutPosY={donutPosY}
        donutPosZ={donutPosZ}
        rotateX={rotateX}
        gltfPath={gltfPath}
      />

      <HeroDonut
        donut2PosX={donut2PosX}
        donut2PosY={donut2PosY}
        donut2PosZ={donut2PosZ}
        gltfPath={gltfPath2}
        scale={donut2Scale}
        rotationX={donut2RotationX}
      />
    </Canvas>
  );
}
