"use client";
import { useState, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Points, PointMaterial } from "@react-three/drei";
import * as random from "maath/random/dist/maath-random.esm";

export default function StarsBg() {
  return (
    <Canvas
      style={{
        width: "100%",
        height: "100svh",
        minHeight: "100svh",
        position: "fixed",
        left: "0",
        top: "0",
      }}
      camera={{ position: [0, 0, -1] }}
    >
      <Stars />
    </Canvas>
  );
}

function Stars(props: any) {
  const ref = useRef<any>();
  const [sphere] = useState(() =>
    random.inSphere(new Float32Array(3000), { radius: 5 })
  );
  useFrame((state, delta) => {
    ref.current.rotation.x -= delta / 55;
    ref.current.rotation.y -= delta / 35;
  });
  return (
    <group rotation={[0, 0, Math.PI / 4]}>
      <Points
        ref={ref}
        positions={sphere}
        stride={3}
        frustumCulled={false}
        {...props}
      >
        <PointMaterial
          transparent
          color="rgb(150,150,150)"
          size={4}
          sizeAttenuation={false}
          depthWrite={false}
        />
      </Points>
    </group>
  );
}
