import React, { useRef, useState } from "react";
import { Float, Lightformer, useGLTF } from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";

function UFOScene({ isVisible }: { isVisible: boolean }) {
  const ufoRef = useRef<any>(null);

  // Load the UFO model
  const ufo = useGLTF("/path/to/ufo-model.glb");

  useFrame((state, delta) => {
    if (ufoRef.current && isVisible) {
      const time = state.clock.elapsedTime;

      // UFO Movement: Emerge from the ring and move upwards
      ufoRef.current.position.y = Math.sin(time) * 1.5; // Up and down oscillation
      ufoRef.current.position.z += delta * 5; // Move forward

      // Reset position when the UFO moves too far
      if (ufoRef.current.position.z > 20) {
        ufoRef.current.position.z = -10; // Reset position
      }
    }
  });

  if (!isVisible) return null; // Hide UFOScene if isVisible is false

  return (
    <>
      {/* Emitting Ring */}
      <Float speed={2} floatIntensity={2} rotationIntensity={1}>
        <Lightformer
          form="ring"
          color="blue"
          intensity={2}
          scale={10}
          position={[0, 2, -10]} // Position of the ring
        />
      </Float>

      {/* UFO Model */}
      <primitive
        ref={ufoRef}
        object={ufo.scene}
        scale={[0.5, 0.5, 0.5]} // Adjust the size of the UFO
        position={[0, 2, -10]} // Initial position at the center of the ring
      />

      {/* Background */}
      <mesh scale={100}>
        <sphereGeometry args={[1, 64, 64]} />
        <meshBasicMaterial color="black" side={2} />
      </mesh>
    </>
  );
}

function App() {
  const [isVisible, setIsVisible] = useState(true);

  return (
    <div style={{ width: "100vw", height: "100vh", position: "relative" }}>
      {/* 3D Scene */}
      <Canvas>
        <UFOScene isVisible={isVisible} />
      </Canvas>

      {/* Button to toggle UFO visibility */}
      <button
        onClick={() => setIsVisible(!isVisible)}
        style={{
          position: "absolute",
          top: "20px",
          left: "20px",
          padding: "10px 20px",
          fontSize: "16px",
          zIndex: 10,
        }}
      >
        {isVisible ? "Hide UFO" : "Show UFO"}
      </button>
    </div>
  );
}

export default App;
