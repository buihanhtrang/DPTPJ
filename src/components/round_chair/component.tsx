import * as THREE from "three";
import React, { useRef } from "react";
import { useGLTF } from "@react-three/drei";
import { GLTF } from "three-stdlib";

type GLTFResult = GLTF & {
  nodes: {
    Object_2: THREE.Mesh;
    Object_3: THREE.Mesh;
  };
  materials: {
    aiStandardSurface2SG: THREE.MeshStandardMaterial;
    aiStandardSurface6SG: THREE.MeshStandardMaterial;
  };
};

type RoundChairProps = {
    bodyColor?: string
    seatingColor?: string
  
}
interface ColorProps {
    'material-color'?: string
}
export function RoundChair({ bodyColor, seatingColor, }: RoundChairProps) {
  const { nodes, materials } = useGLTF("/assets/chair.glb") as GLTFResult;

    let bodyColorProps: ColorProps = {}
    if(bodyColor != null) {
        bodyColorProps['material-color'] = bodyColor
    }
    

    let seatingColorProps: ColorProps = {}
    if(seatingColor != null) {
        seatingColorProps['material-color'] = seatingColor
    }
    return (
        <group dispose={null}>
        <group name="Scene">
            <group
            name="Sketchfab_model"
            position={[-7.02, 0, 5.52]}
            rotation={[-Math.PI / 2, 0, 0]}
            >
            <group name="Round_Chairobjcleanermaterialmergergles">
                <mesh
                    name="Object_2"
                    castShadow
                    receiveShadow
                    geometry={nodes.Object_2.geometry}
                    material={materials.aiStandardSurface2SG}
                    { ...bodyColorProps }
                />
                <mesh
                    name="Object_3"
                    castShadow
                    receiveShadow
                    geometry={nodes.Object_3.geometry}
                    material={materials.aiStandardSurface6SG}
                    { ...seatingColorProps }
                />
            </group>
            </group>
        </group>
        </group>
    );
}

useGLTF.preload("/assets/chair.glb");