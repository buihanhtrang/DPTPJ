"use client";
import {
  AccumulativeShadows,
  Environment,
  Float,
  Lightformer,
  OrbitControls,
  RandomizedLight,
  Shadow,
  Stage,
  Text,
  Text3D,
  useHelper,
} from "@react-three/drei";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import React, { useRef, useState } from "react";
import { useSpring, a } from "@react-spring/three";
import * as THREE from "three";
import { RGBELoader } from "three/examples/jsm/loaders/RGBELoader";
import { useWindowWidth } from "@react-hook/window-size";
import { motion } from "framer-motion";

// components
import ConfiguratorComponent from "@/components/configurator/component";
import ColorPickerComponent from "@/components/color_picker/component";
// import DetailPickerComponent from "@/components/detail_picker/component"

// models
import { IConfiguratorOption } from "../../models/configuration";

// styles
import { itemVariants } from "@/styles/variants";
import { Computer } from "@/components/computer/component";
import { StorageSSD } from "@/components/computer/StorageSSD";

const keyboardColor = "Keyboard Color";
const screenColor = "Screen Color";
const bodyColor = "Body Color";

const HDRI_PATHS = {
  coffee_shop: "/assets/coffeeshop.hdr",
  outdoor: "/assets/outdoor.hdr",
  indoor: "/assets/home.hdr",
};

const HDRILoader = ({ path }: { path: string }) => {
  const { scene, gl } = useThree();

  React.useEffect(() => {
    const loader = new RGBELoader();
    const pmremGenerator = new THREE.PMREMGenerator(gl);

    const defaultColor = new THREE.Color(0xD3D3D3); // Black as default
    scene.background = defaultColor;
    scene.environment = null;

    const ambientLight = new THREE.AmbientLight(0xcccccc, 30); // Soft ambient light
    scene.add(ambientLight);

    if (path) {
      loader.load(path, (texture) => {
        const envMap = pmremGenerator.fromEquirectangular(texture).texture;

        scene.background = envMap; // Update with HDRI background
        scene.environment = envMap; // Update environment lighting

        scene.remove(ambientLight);

        texture.dispose();
        pmremGenerator.dispose();
      });
    }

    return () => {
      scene.remove(ambientLight); // Cleanup ambient light on component unmount
    };
  }, [path, scene, gl]);

  return null;
};

const ComputerPage = () => {
  const width = useWindowWidth();
  const isMobile = width < 800;

  const [isConfiguratorOpen, setIsConfiguratorOpen] = useState(true);
  const [selectedRoom, setSelectedRoom] = useState<keyof typeof HDRI_PATHS | "">(""); // "" as default
  const [showSSD, setShowSSD] = useState(false);
  const [isMenuVisible, setIsMenuVisible] = useState(true);

  const [configOptions, setConfigOptions] = useState<Array<IConfiguratorOption>>([
    {
      title: bodyColor,
      colors: ["#1e1e1e", "#F8FAFC", "#06D001", "#FFE700", "#4CC9FE", "#A4A5A6", "#BA3B2E"],
      selectedColor: "#1e1e1e",
    },
    {
      title: keyboardColor,
      colors: ["#1e1e1e", "#F8FAFC", "#06D001", "#FFE700", "#4CC9FE", "#A4A5A6", "#BA3B2E"],
      selectedColor: "#1e1e1e",
    },
    {
      title: screenColor,
      colors: ["#1e1e1e", "#F8FAFC", "#06D001", "#FFE700", "#4CC9FE", "#A4A5A6", "#BA3B2E"],
      selectedColor: "#1e1e1e",
    },
  ]);

  const props = useSpring({
    position: showSSD ? [0, 0, 0] : [-3.5, 0, -3.5],
    config: { mass: 1, tension: 100, friction: 40 },
  });

  const onSelectedColor = (title: string, color: string) => {
    setConfigOptions((state) =>
      state.map((opt) => {
        if (opt.title === title) {
          opt.selectedColor = color;
        }
        return opt;
      })
    );
  };

  const getbodyColor = () => configOptions.find((c) => c.title === bodyColor)!.selectedColor;
  const getkeyboardColor = () => configOptions.find((c) => c.title === keyboardColor)!.selectedColor;
  const getscreenColor = () => configOptions.find((c) => c.title === screenColor)!.selectedColor;

  // Reset function to clear selected room and reset background
  const resetBackground = () => {
    setSelectedRoom(""); // Clears the selected room
  };

  return (
    <div className="page">
      {/* Menu GUI */}
      <div
        className="menu"
        style={{
          position: "absolute",
          bottom: "20px",
          right: "20px",
          zIndex: 10,
          display: "flex",
          flexDirection: "column",
          gap: "10px",
          backgroundColor: "rgba(0, 0, 0, 0.8)",
          padding: "15px",
          borderRadius: "10px",
        }}
      >
        {/* Menu Toggle Button */}
        <button
          onClick={() => setIsMenuVisible((prev) => !prev)}
          style={{
            backgroundColor: "#4CC9FE",
            color: "#fff",
            padding: "10px 20px",
            borderRadius: "5px",
            border: "none",
            cursor: "pointer",
            fontWeight: "bold",
          }}
        >
          {isMenuVisible ? "Hide Menu" : "Show Menu"}
        </button>

        {/* Room Buttons */}
        {isMenuVisible && (
          <>
            <button
              onClick={() => setSelectedRoom("coffee_shop")}
              style={{
                backgroundColor: "#1e1e1e",
                color: "#fff",
                padding: "10px",
                borderRadius: "5px",
                border: "none",
                cursor: "pointer",
              }}
            >
              Coffee Shop
            </button>
            <button
              onClick={() => setSelectedRoom("outdoor")}
              style={{
                backgroundColor: "#1e1e1e",
                color: "#fff",
                padding: "10px",
                borderRadius: "5px",
                border: "none",
                cursor: "pointer",
              }}
            >
              Outdoor
            </button>
            <button
              onClick={() => setSelectedRoom("indoor")}
              style={{
                backgroundColor: "#1e1e1e",
                color: "#fff",
                padding: "10px",
                borderRadius: "5px",
                border: "none",
                cursor: "pointer",
              }}
            >
              Home
            </button>
            {/* Reset Button */}
            <button
              onClick={resetBackground}
              style={{
                backgroundColor: "#BA3B2E",
                color: "#fff",
                padding: "10px",
                borderRadius: "5px",
                border: "none",
                cursor: "pointer",
              }}
            >
              Reset Background
            </button>
          </>
        )}
      </div>

      <Canvas shadows camera={{ position: [5, 0, 15], fov: 30 }} style={{ width: "100vw", height: "100vh" }}>
        <HDRILoader path={selectedRoom ? HDRI_PATHS[selectedRoom] : ""} />

        <ambientLight color="gray" />

        <AccumulativeShadows position={[0, -2, 0]} frames={100} alphaTest={0.9} scale={50}>
          <RandomizedLight amount={8} radius={10} ambient={0.5} position={[1, 5, -1]} />
        </AccumulativeShadows>

        <OrbitControls />

        <group
          position={isMobile ? [0.3, isConfiguratorOpen ? -0.5 : -1.8, -2] : [-1.5, -1.1, -2]}
          scale={isMobile ? 1.3 : 2.5}
          rotation-y={Math.PI / 5}
        >
          <Computer
            bodyColor={getbodyColor()}
            keyboardColor={getkeyboardColor()}
            screenColor={getscreenColor()}
            setShowSSD={setShowSSD}
          />
        </group>
        {showSSD && (
          <a.group position={props.position.to((x, y, z) => [x, y, z])}>
            <StorageSSD />
          </a.group>
        )}

        <group position={[0, 1, -9]}>
          <Text3D font="/fonts/optimer_regular.typeface.json" scale={isMobile ? 1 : 1.8} position={isMobile ? [0, 2.5, -4] : [-0.5, 1.8, -4]}>
            Alien Laptop
            <meshBasicMaterial color="#059212" />
          </Text3D>
        </group>
      </Canvas>

      <ConfiguratorComponent title="Configure Your" subTitle="Laptop" isConfiguratorOpen={(v) => setIsConfiguratorOpen(v)}>
        {configOptions.map((config, i) => (
          <motion.div variants={itemVariants} key={i}>
            <ColorPickerComponent key={i} options={config} onSelectedColor={onSelectedColor} />
          </motion.div>
        ))}
      </ConfiguratorComponent>
    </div>
  );
};

export default ComputerPage;
