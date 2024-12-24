import * as THREE from "three";
import React from "react";
import { useGLTF } from "@react-three/drei";
import { GLTF } from "three-stdlib";


type GLTFResult = GLTF & {
  nodes: {
    Object_4: THREE.Mesh;
    Object_5: THREE.Mesh;
    Object_6: THREE.Mesh;
    Object_7: THREE.Mesh;
    Object_8: THREE.Mesh;
    Object_9: THREE.Mesh;
    Object_10: THREE.Mesh;
    Object_11: THREE.Mesh;
    Object_13: THREE.Mesh;
    Object_14: THREE.Mesh;
    Object_15: THREE.Mesh;
    Object_16: THREE.Mesh;
    Object_17: THREE.Mesh;
    Object_18: THREE.Mesh;
    Object_19: THREE.Mesh;
  };
  materials: {
    Material_1: THREE.MeshStandardMaterial;
    Material_2: THREE.MeshStandardMaterial;
    Material_3: THREE.MeshStandardMaterial;
    Material_4: THREE.MeshStandardMaterial;
    Material_5: THREE.MeshStandardMaterial;
    Material_6: THREE.MeshStandardMaterial;
    Material_7: THREE.MeshStandardMaterial;
    Material_8: THREE.MeshStandardMaterial;
    ["Material.009"]: THREE.MeshStandardMaterial;
    Material_10: THREE.MeshStandardMaterial;
    Material_11: THREE.MeshStandardMaterial;
    Material_12: THREE.MeshStandardMaterial;
    Material_13: THREE.MeshStandardMaterial;
    Material_14: THREE.MeshStandardMaterial;
  };
};


type ComputerProps = {
  bodyColor?: string
  screenColor?: string
  keyboardColor?: string
  setShowSSD: React.Dispatch<React.SetStateAction<boolean>>
}
interface ColorProps {
    'material-color'?: string
}
export function Computer({ bodyColor, screenColor, keyboardColor, setShowSSD }: ComputerProps) {
  const { nodes, materials } = useGLTF("/assets/gaming_laptop/scene-1.glb") as GLTFResult;

  const buttonRef = React.useRef<THREE.Mesh>(null);

  let bodyColorProps: ColorProps = {}
  if(bodyColor != null) {
      bodyColorProps['material-color'] = bodyColor
  }
  

  let screenColorProps: ColorProps = {}
  if(screenColor != null) {
      screenColorProps['material-color'] = screenColor
  }

  let keyboardColorProps: ColorProps = {}
  if(keyboardColor != null) {
      keyboardColorProps['material-color'] = keyboardColor
  }
  return (
    <group dispose={null}>
      <group name="Scene">
        <group name="Sketchfab_model" 
        scale={[0.5, 0.5, 0.5]}
        rotation={[-Math.PI / 2, 0, 0]}>
          <group name="root">
            <group name="GLTF_SceneRootNode" rotation={[Math.PI / 2, 0, 0]}>
              <group name="Cube001_1"
              position={[-1, 0, 0]}
              rotation={[0, 0, (-(Math.PI)*79.082) /180]}
              >
                <mesh
                  ref={buttonRef}
                  position={[0, 0.2, 2]} 
                  geometry={new THREE.SphereGeometry(0.05, 32, 32)} 
                  material={new THREE.MeshStandardMaterial({ color: "red" })} 
                  onClick={() => setShowSSD((prev) => !prev)} 
                />
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
                  {...screenColorProps}
                />
                <mesh
                  name="Object_8"
                  castShadow
                  receiveShadow
                  geometry={nodes.Object_8.geometry}
                  material={materials.Material_5}
                  { ...bodyColorProps }

                />
                <mesh
                  name="Object_9"
                  castShadow
                  receiveShadow
                  geometry={nodes.Object_9.geometry}
                  material={materials.Material_6}
                />
                <mesh
                  name="Object_10"
                  castShadow
                  receiveShadow
                  geometry={nodes.Object_10.geometry}
                  material={materials.Material_7}
                />
                <mesh
                  name="Object_11"
                  castShadow
                  receiveShadow
                  geometry={nodes.Object_11.geometry}
                  material={materials.Material_13}
                  { ...bodyColorProps }
                />
              </group>

              <group
                name="Cube003_2"
              >
                <mesh
                  name="Object_13"
                  castShadow
                  receiveShadow
                  geometry={nodes.Object_13.geometry}
                  material={materials.Material_8}
                />
                <mesh
                  name="Object_14"
                  castShadow
                  receiveShadow
                  geometry={nodes.Object_14.geometry}
                  material={materials["Material.009"]}
                />
                <mesh
                  name="Object_15"
                  castShadow
                  receiveShadow
                  geometry={nodes.Object_15.geometry}
                  material={materials["Material.009"]}
                />
                <mesh
                  name="Object_16"
                  castShadow
                  receiveShadow
                  geometry={nodes.Object_16.geometry}
                  material={materials.Material_10}
                  {...keyboardColorProps}
                />
                <mesh
                  name="Object_17"
                  castShadow
                  receiveShadow
                  geometry={nodes.Object_17.geometry}
                  material={materials.Material_11}
                />
                <mesh
                  name="Object_18"
                  castShadow
                  receiveShadow
                  geometry={nodes.Object_18.geometry}
                  material={materials.Material_12}
                />
                <mesh
                  name="Object_19"
                  castShadow
                  receiveShadow
                  geometry={nodes.Object_19.geometry}
                  material={materials.Material_14}
                />
              </group>
            </group>
          </group>
        </group>
      </group>
    </group>

  );
}

useGLTF.preload("/assets/gaming_laptop/scene-1.glb");

