"use client"

import { AccumulativeShadows, Environment, Float, Lightformer, OrbitControls, RandomizedLight, Shadow, Stage, Text, Text3D, useHelper } from '@react-three/drei'
import { Canvas, useFrame } from '@react-three/fiber'
import React, { useRef, useState } from 'react'
import * as THREE from 'three'
import { useWindowWidth } from '@react-hook/window-size'
import { motion } from 'framer-motion'


// components
import ConfiguratorComponent from '@/components/configurator/component'
import ColorPickerComponent from '@/components/color_picker/component'

// models
import { IConfiguratorOption } from '../../models/configuration'

// styles
import { itemVariants } from '@/styles/variants'
import { ArmChair } from '@/components/arm_chair/component'


const LegColor = "Seat Color"
const PillowColor = "Pillow Color"
const BodyColor = "Body Color"
const ArmChairPage = () => {
    const width = useWindowWidth()
    const isMobile = width < 1000

    const [isConfiguratorOpen, setIsConfiguratorOpen] = useState(true)

    const [ configOptions, setConfigOptions ] = useState<Array<IConfiguratorOption>>(
        [
            {
                title: BodyColor,
                colors: [ '#1e1e1e', '#A58962', 'white', '#E9D69E', '#87898C', '#A4A5A6', '#BA3B2E' ],
                selectedColor: '#E9D69E'
            },
            {
                title: LegColor,
                colors: [ '#1e1e1e', '#A58962', 'white', '#E9D69E', '#87898C', '#A4A5A6', '#BA3B2E' ],
                selectedColor: 'white'
            },
            {
                title: PillowColor,
                colors: [ '#1e1e1e', '#A58962', 'white', '#E9D69E', '#87898C', '#A4A5A6', '#BA3B2E' ],
                selectedColor: 'white'
            },
        ]
    )


    const onSelectedColor = (title: string, color: string) => {
        setConfigOptions((state)=> {
            return state.map(opt=> {
                if( opt.title === title ) {
                    opt.selectedColor = color
                }
                return opt
            })
        })
    }

    const getBodyColor = ()=> {
        return configOptions.find(c=> c.title === BodyColor)!.selectedColor
    }

    const getLegColor = ()=> {
        return configOptions.find(c=> c.title === LegColor)!.selectedColor
    }

    const getPillowColor = ()=> {
        return configOptions.find(c=> c.title === PillowColor)!.selectedColor
    }
    


    return (
        <div className='page'>
            <Canvas shadows camera={{ position: [5, 0, 15], fov: 30 }} style={{ width: '100vw', height: '100vh' }}>
                
                <spotLight position={[0, 15, 0]} angle={0.3} penumbra={1} castShadow intensity={2} shadow-bias={-0.0001} />
                <ambientLight color='gray' />
                
                <AccumulativeShadows position={[0, -2, 0]} frames={100} alphaTest={0.9} scale={50}>
                    <RandomizedLight amount={8} radius={10} ambient={0.5} position={[1, 5, -1]} />
                </AccumulativeShadows>

                {/** PerfMon will detect performance issues */}
                {/* Renders contents "live" into a HDRI environment (scene.environment). */}
                <Environment resolution={256} background blur={1}>
                    <Lightformers />
                </Environment>
                <CameraRig />

                <OrbitControls autoRotate />

                <group
                    position={isMobile ? [ .3, isConfiguratorOpen ? -.5 : -1.8, -2 ] : [ -1.5, -1.1, -2 ]}
                    scale={isMobile ? 1.3 : 2.5}
                    rotation-y={ Math.PI / 5 }
                >
                    <ArmChair
                        bodyColor={getBodyColor()}
                        legColor={getLegColor()}
                        pillowColor={getPillowColor()}
                    />
                </group>

                
                <group position={[ 0, 1, -9 ]}>
                    <Text
                        font="/fonts/Rubik_Light_Regular.json"
                        scale={ isMobile ? 1 : 1.8 }
                        position={ isMobile ? [ 0, 2.5, -4 ] : [ -.5, 1.8, -4 ] }
                    >
                        Round Chair
                        <meshBasicMaterial color="tomato" />
                    </Text>
                </group>


            </Canvas>

            <ConfiguratorComponent
                title='Configure Your'
                subTitle="Arm Chair"
                isConfiguratorOpen={(v)=> setIsConfiguratorOpen(v)}
            >
                {
                    configOptions.map((config, i)=> {

                        return (
                            <motion.div variants={itemVariants} key={i}>
                                <ColorPickerComponent
                                    key={i}
                                    options={config}
                                    onSelectedColor={ onSelectedColor }
                                />
                            </motion.div>
                        )
                    })
                }
            </ConfiguratorComponent>
        </div>
    )
}

const Lights = ()=> {
    const light = useRef<any>(null)
    useHelper(light, THREE.SpotLightHelper, 'cyan')

    return (
        <group>
            <ambientLight />
            <spotLight ref={light} color={'red'} intensity={1} position={[5, 10, 4]} castShadow/>
            <spotLight color={'white'} castShadow position={[ -1, 3, -4 ]} />
        </group>
    )
}
function CameraRig({ v = new THREE.Vector3() }) {
  return useFrame((state) => {
    const t = state.clock.elapsedTime
    state.camera.position.lerp(v.set(Math.sin(t / 5), 0, 12 + Math.cos(t / 5) / 2), 0.05)
    state.camera.lookAt(0, 0, 0)
  })
}
function Lightformers({ positions = [2, 0, 2, 0, 2, 0, 2, 0] }) {
  const group = useRef<any>(null)
  useFrame((state, delta) => (group.current!.position!.z += delta * 10) > 20 && (group.current.position.z = -60))
  return (
    <>
      {/* Ceiling */}
      <Lightformer intensity={0.75} rotation-x={Math.PI / 2} position={[0, 5, -9]} scale={[10, 10, 1]} />
      <group rotation={[0, 0.5, 0]}>
        <group ref={group}>
          {positions.map((x, i) => (
            <Lightformer key={i} form="circle" intensity={2} rotation={[Math.PI / 2, 0, 0]} position={[x, 4, i * 4]} scale={[3, 1, 1]} />
          ))}
        </group>
      </group>
      {/* Sides */}
      <Lightformer intensity={4} rotation-y={Math.PI / 2} position={[-5, 1, -1]} scale={[20, 0.1, 1]} />
      <Lightformer rotation-y={Math.PI / 2} position={[-5, -1, -1]} scale={[20, 0.5, 1]} />
      <Lightformer rotation-y={-Math.PI / 2} position={[10, 1, 0]} scale={[20, 1, 1]} />
      {/* Accent (red) */}
      <Float speed={5} floatIntensity={2} rotationIntensity={2}>
        <Lightformer form="ring" color="red" intensity={1} scale={10} position={[-15, 4, -18]} target={[0, 0, 0]} />
      </Float>
      {/* Background */}
      <mesh scale={100}>
        <sphereGeometry args={[1, 64, 64]} />
      </mesh>
    </>
  )
}


export default ArmChairPage
