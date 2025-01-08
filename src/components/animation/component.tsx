import { Float, Lightformer, useGLTF } from "@react-three/drei";
import { useRef } from "react";
import { useFrame } from "@react-three/fiber";

function UFOScene() {
  const ufoRef = useRef<any>(null);

  // Load the UFO model
  const ufo = useGLTF("/assets/ufo/ufo.glb");

  useFrame((state, delta) => {
    if (ufoRef.current) {
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

  return (
    <>
      {/* Emitting Ring */}
      <Float speed={5} floatIntensity={2} rotationIntensity={2}>
        <Lightformer
          form="ring"
          color="darkgreen"
          intensity={2}
          scale={10}
          position={[-15, 4, -18]}
          target={[0, 0, 0]
          } // Position of the ring
        />
      </Float>

      {/* UFO Model */}
      <primitive
        ref={ufoRef}
        object={ufo.scene}
        scale={[0.5, 0.5, 0.5]} // Adjust the size of the UFO
        position={[-10, 4, -18]} // Initial position at the center of the ring
      />

      {/* Background */}
      <mesh scale={100}>
        <sphereGeometry args={[1, 64, 64]} />
      </mesh>
    </>
  );
}

export default UFOScene;
