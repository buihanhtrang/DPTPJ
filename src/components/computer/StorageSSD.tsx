import * as THREE from "three";
import React from "react";
import { useGLTF, Text } from "@react-three/drei";
import { GLTF } from "three-stdlib";

type GLTFResult = GLTF & {
  nodes: {
    Object_4: THREE.Mesh;
    Object_5: THREE.Mesh;
    Object_6: THREE.Mesh;
    Object_7: THREE.Mesh;
    Object_8: THREE.Mesh;
  };
  materials: {
    Material_1: THREE.MeshStandardMaterial;
    Material_2: THREE.MeshStandardMaterial;
    Material_3: THREE.MeshStandardMaterial;
    Material_4: THREE.MeshStandardMaterial;
    Material_5: THREE.MeshStandardMaterial;
  };
};

export function StorageSSD() {
  const { nodes, materials } = useGLTF("/assets/storage/storage.glb") as GLTFResult;
  const [showInfo, setShowInfo] = React.useState(false);

  return (
    <group
      dispose={null}
      onClick={(e) => {
        e.stopPropagation(); 
        setShowInfo((prev) => !prev); 
      }}
    >
      <group
        name="Scene" rotation={[-Math.PI / 1, 1, 0]} scale={0.3} position={[0.5, -1.1, 2]}
        onPointerOver={() => (document.body.style.cursor = "pointer")}
        onPointerOut={() => (document.body.style.cursor = "default")}
      >
        <mesh
          name="Object_4"
          castShadow
          receiveShadow
          geometry={nodes.Object_4.geometry}
          material={materials.Material_1}
        />
        <mesh
          name="Object_5"
          castShadow
          receiveShadow
          geometry={nodes.Object_5.geometry}
          material={materials.Material_2}
        />
        <mesh
          name="Object_6"
          castShadow
          receiveShadow
          geometry={nodes.Object_6.geometry}
          material={materials.Material_3}
        />
        <mesh
          name="Object_7"
          castShadow
          receiveShadow
          geometry={nodes.Object_7.geometry}
          material={materials.Material_4}
        />
        <mesh
          name="Object_8"
          castShadow
          receiveShadow
          geometry={nodes.Object_8.geometry}
          material={materials.Material_5}
        />
      </group>

      {showInfo && (
        <group rotation={[-Math.PI / 1, 1, Math.PI]} position={[0.5, 1, 2]}>
          <mesh>
            <planeGeometry args={[1.8, 1]}  />
            <meshStandardMaterial color="white" transparent opacity={0.8} />
          </mesh>
          <Text
            fontSize={0.2}
            color="black"
            position={[0, 0.2, 0.01]} 
            anchorX="center"
            anchorY="middle"
          >
            Storage SSD Info{"\n"}
          </Text>
          <Text
            fontSize={0.1}
            color="black"
            position={[0, -0.1, 0.01]} 
            anchorX="center"
            anchorY="middle"
          >
            Capacity: 1TB {"\n"}{"\n"}
            Speed: 3500MB/s
          </Text>
        </group>
      )}
    </group>
  );
}

useGLTF.preload("/assets/storage/storage.glb");
