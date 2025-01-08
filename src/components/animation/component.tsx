// src/components/UFOComponent.tsx

import React, { useRef } from "react";
import { Float, Lightformer, useGLTF } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";

interface UFOProps {
  isVisible: boolean;
}

const UFOComponent: React.FC<UFOProps> = ({ isVisible }) => {
  const ufoRef = useRef<any>(null);
  const ufo = useGLTF("assets/ufo/ufo2.glb"); // Replace with your actual model path

  useFrame((state, delta) => {
    if (ufoRef.current && isVisible) {
      const time = state.clock.elapsedTime;

      // UFO movement logic
      ufoRef.current.position.y = Math.sin(time) * 1.5; // Float up and down
      ufoRef.current.position.z += delta * 5; // Move forward

      // Reset when it goes out of bounds
      if (ufoRef.current.position.z > 20) {
        ufoRef.current.position.z = -10;
      }
    }
  });

  if (!isVisible) return null; // Hide UFO if not visible

  return (
    <>
      {/* Glowing Ring */}
      <Float speed={2} floatIntensity={2} rotationIntensity={1}>
        <Lightformer
          form="ring"
          color="blue"
          intensity={2}
          scale={10}
          position={[0, 2, -10]} // Ring position
        />
      </Float>

      {/* UFO */}
      <primitive
        ref={ufoRef}
        object={ufo.scene}
        scale={[0.5, 0.5, 0.5]} // UFO scale
        position={[0, 2, -10]} // Initial position
      />
    </>
  );
};

export default UFOComponent;
