import * as THREE from "three";
import React, { useRef } from "react";
import { useGLTF } from "@react-three/drei";
import { GLTF } from "three-stdlib";

type GLTFResult = GLTF & {
  nodes: {
    Object_6: THREE.Mesh;
    Object_8: THREE.Mesh;
    Object_4: THREE.Mesh;
    Object_10: THREE.Mesh;
    Object_12: THREE.Mesh;
  };
  materials: {
    ["Material.002"]: THREE.MeshStandardMaterial;
    ["Material.003"]: THREE.MeshStandardMaterial;
    material_0: THREE.MeshStandardMaterial;
  };
};


type ArmChairProps = {
  bodyColor?: string
  pillowColor?: string
  legColor?: string
}
interface ColorProps {
    'material-color'?: string
}
export function ArmChair({ bodyColor, pillowColor, legColor, }: ArmChairProps) {
  const { nodes, materials } = useGLTF("/assets/round-chair.glb") as GLTFResult;

  let bodyColorProps: ColorProps = {}
  if(bodyColor != null) {
      bodyColorProps['material-color'] = bodyColor
  }
  

  let pillowColorProps: ColorProps = {}
  if(pillowColor != null) {
      pillowColorProps['material-color'] = pillowColor
  }

  let legColorProps: ColorProps = {}
  if(legColor != null) {
      legColorProps['material-color'] = legColor
  }
  return (
    <group dispose={null}>
      <group name="Scene">
        <group name="Sketchfab_model" rotation={[-Math.PI / 2, 0, 0]}>
          <group name="root">
            <group name="GLTF_SceneRootNode" rotation={[Math.PI / 2, 0, 0]}>
              <group name="Cube001_3" scale={[0.934, 0.99, 0.99]}>
                <mesh
                  name="Object_6"
                  castShadow
                  receiveShadow
                  geometry={nodes.Object_6.geometry}
                  material={materials["Material.002"]}
                />
              </group>
              <group
                name="Cube002_4"
                position={[0, 0.229, 0.039]}
                scale={[0.863, 1.02, 0.914]}
              >
                <mesh
                  name="Object_8"
                  castShadow
                  receiveShadow
                  geometry={nodes.Object_8.geometry}
                  material={materials["Material.002"]}
                />
              </group>
              <group name="Cube_2" scale={[0.944, 1, 1]}>
                <mesh
                  name="Object_4"
                  castShadow
                  receiveShadow
                  geometry={nodes.Object_4.geometry}
                  material={materials["Material.002"]}
                  // body
                  { ...bodyColorProps }
                />
              </group>
              <group name="Cylinder_5" position={[0, 0.017, 0]}>
                <mesh
                  name="Object_10"
                  castShadow
                  receiveShadow
                  geometry={nodes.Object_10.geometry}
                  material={materials["Material.003"]}
                  // legs
                  { ...legColorProps }
                />
              </group>
              <group
                name="Plane_6"
                position={[0.006, 0.678, -0.478]}
                rotation={[1.24, -0.013, -0.104]}
                scale={[0.4, 0.294, 0.354]}
              >
                <mesh
                  name="Object_12"
                  castShadow
                  receiveShadow
                  geometry={nodes.Object_12.geometry}
                  material={materials.material_0}
                  // pillow
                  { ...pillowColorProps }
                />
              </group>
            </group>
          </group>
        </group>
      </group>
    </group>
  );
}

useGLTF.preload("/assets/round-chair.glb");
