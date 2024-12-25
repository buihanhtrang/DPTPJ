import React, { useRef } from "react";
import { useFrame } from "@react-three/fiber";

interface InfoMeshProps {
  position: [number, number, number];
  rotation?: [number, number, number]; 
  onClick?: (event: THREE.Event) => void;
}

const InfoMesh = ({ position, rotation = [-Math.PI / 2, 0, 0], onClick }: InfoMeshProps) => {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame(({ clock }) => {
    if (meshRef.current) {
      const scale = 1 + 0.1 * Math.sin(clock.getElapsedTime() * 2); 
      meshRef.current.scale.set(scale, scale, scale);
    }
  });

  return (
    <mesh
      ref={meshRef}
      position={position}
      rotation={rotation} // Sử dụng rotation
      onClick={onClick}
      onPointerOver={() => (document.body.style.cursor = "pointer")}
      onPointerOut={() => (document.body.style.cursor = "default")}
    >
      <circleGeometry args={[0.07, 30]} />
      <meshStandardMaterial color="black" transparent opacity={0.6} />

      <mesh>
        <ringGeometry args={[0.07, 0.09, 64]} />
        <meshStandardMaterial color="white" transparent opacity={0.6} />
      </mesh>
    </mesh>
  );
};

export default InfoMesh;
