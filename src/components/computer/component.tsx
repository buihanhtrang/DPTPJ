import * as THREE from "three";
import React, {useState, useRef, useEffect } from "react";
import { useGLTF, Text } from "@react-three/drei";
import { useSpring, animated, to } from "@react-spring/three";
import { GLTF } from "three-stdlib";
import * as handpose from "@tensorflow-models/handpose";
import "@tensorflow/tfjs-backend-webgl"; 

import InfoMesh from "../showinfo/InfoMesh";

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
  isInfoVisible: boolean
  isCameraActive: boolean
  videoUrls?: string[];
}
interface ColorProps {
    'material-color'?: string
}
export function Computer({ bodyColor, screenColor, keyboardColor, setShowSSD, isInfoVisible= false, isCameraActive=false, videoUrls = ["/assets/videos/video1.mp4", "/assets/videos/video.mp4"], }: ComputerProps) {
  const { nodes, materials } = useGLTF("/assets/gaming_laptop/scene-1.glb") as GLTFResult;

  const buttonRef = React.useRef<THREE.Mesh>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const videoTexture = useRef<THREE.VideoTexture | null>(null);
  const cameraTexture = useRef<THREE.VideoTexture | null>(null);

  const [isFloating, setIsFloating] = useState(false);
  const [visibleInfo, setVisibleInfo] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  const [modelPosition, setModelPosition] = useState(new THREE.Vector3(0, 0, 0));
  
  const moveModel = (direction: string) => {
    const newPosition = modelPosition.clone();
    switch (direction) {
      case "up":
        newPosition.y += 0.1;
        break;
      case "down":
        newPosition.y -= 0.1;
        break;
      case "left":
        newPosition.x -= 0.1;
        break;
      case "right":
        newPosition.x += 0.1;
        break;
      case "forward":
        newPosition.z -= 0.1;
        break;
      case "backward":
        newPosition.z += 0.1;
        break;
      default:
        break;
    }
    setModelPosition(newPosition);
  };

  const Button = ({ rotation, position, label, color, onClick }: any) => (
    <mesh
      rotation={rotation}
      position={position}
      onClick={onClick}
      onPointerOver={() => (document.body.style.cursor = "pointer")}
      onPointerOut={() => (document.body.style.cursor = "default")}
    >
      {/* Arrow Geometry */}
      <coneGeometry args={[0.2, 0.4, 32]} />
      <meshStandardMaterial color={color} />

      {/* Button Label */}
      {/* <Text
        position={[0, 0, 0.05]} // Slightly above the button
        fontSize={0.12}
        color="black"
        anchorX="center"
        anchorY="middle"
      >
        {label}
      </Text> */}
    </mesh>
  );

  const { Object16Position } = useSpring({
    Object16Position: isFloating ? [0, 1, 0] : [0, 0, 0], 
    config: { mass: 1, tension: 120, friction: 14 },
  });
  const [isSplit, setIsSplit] = useState(false);

  const { Cube001_1, Cube003_2 } = useSpring({
    Cube001_1: isSplit ? [-1, 0.2, 0] : [-1, 0, 0],
    Cube003_2: isSplit ? [0, -0.2, 0] : [0, 0, 0],
    config: { mass: 1, tension: 170, friction: 26 },
  });
  const handleInfoToggle = (infoType) => {
    setVisibleInfo((prev) => (prev === infoType ? null : infoType));
  };
  const toggleVideo = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause(); 
        videoRef.current.currentTime = 0; 
        setIsPlaying(false);
      } else {
        videoRef.current.play(); 
        setIsPlaying(true);
      }
    }
  };
  useEffect(() => {
    let localVideo: HTMLVideoElement | null = null;
    let animationFrameId: number;
  
    if (!isCameraActive) return;
  
    const runHandpose = async () => {
      const model = await handpose.load();
  
      // Tạo video element
      const video = document.createElement("video");
      video.style.display = "none";
      document.body.appendChild(video);
      localVideo = video;
  
      // Bật camera
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      video.srcObject = stream;
      video.play();
  
      // Nhận diện bàn tay
      const detectHands = async () => {
        if (!isCameraActive) return; // Dừng nếu camera tắt

        // Hàm phát hiện "Thumbs Up"
        const isThumbsUp = (landmarks) => {
        const thumbTip = landmarks[4]; // Đỉnh ngón cái
        const thumbBase = landmarks[2]; // Gốc ngón cái
        const indexFingerBase = landmarks[5]; // Gốc ngón trỏ

        // Kiểm tra ngón cái hướng lên trên và tách khỏi các ngón khác
        return thumbTip[1] < thumbBase[1] && thumbBase[1] < indexFingerBase[1];
         };

        // Hàm phát hiện "Thumbs Down"
        const isThumbsDown = (landmarks) => {
        const thumbTip = landmarks[4];
        const thumbBase = landmarks[2];
        const indexFingerBase = landmarks[5];

        // Kiểm tra ngón cái hướng xuống dưới và tách khỏi các ngón khác
        return thumbTip[1] > thumbBase[1] && thumbBase[1] > indexFingerBase[1];
        };

        // Hàm phát hiện "Peace Sign"
        const isPeaceSign = (landmarks) => {
        const indexTip = landmarks[8];
        const middleTip = landmarks[12];
        const indexBase = landmarks[5];
        const middleBase = landmarks[9];

        // Kiểm tra khoảng cách giữa ngón trỏ và giữa lớn hơn, còn các ngón khác không giơ lên
        return (
        indexTip[1] < indexBase[1] &&
        middleTip[1] < middleBase[1] &&
        Math.abs(indexTip[0] - middleTip[0]) > 0.3
        );
        };

        // Hàm phát hiện "Fist"
        const isFist = (landmarks) => {
          // Kiểm tra tất cả các đầu ngón tay gần lòng bàn tay
          for (let i = 4; i <= 20; i += 4) {
            if (landmarks[i][1] < landmarks[i - 2][1]) {
              return false;
            }
          }
          return true;
        };
  
        const predictions = await model.estimateHands(video);
        if (predictions.length > 0) {
          const fingers = predictions[0].landmarks;
          const fingerCount = countFingers(fingers);
  
          if (fingerCount === 1) setIsSplit((prev) => !prev);
          if (fingerCount === 2) setShowSSD((prev) => !prev);
          if (fingerCount === 3) setIsFloating((prev) => !prev);
          
          // Phát hiện cử chỉ
          if (isThumbsUp(fingers)) moveModel("up"); // Ngón cái chỉ lên
          if (isThumbsDown(fingers)) moveModel("down"); // Ngón cái chỉ xuống
          if (isPeaceSign(fingers)) moveModel("forward"); // Hình chữ V
          if (isFist(fingers)) moveModel("backward"); // Nắm tay
          
        }
        setTimeout(detectHands, 1000);
      };
  
      video.addEventListener("loadeddata", detectHands);
    };
  
    runHandpose();
  
    // Cleanup
    return () => {
      if (localVideo) {
        const stream = localVideo.srcObject as MediaStream;
        stream?.getTracks().forEach((track) => track.stop());
        localVideo.pause();
        localVideo.srcObject = null;
        localVideo.remove();
      }
      cancelAnimationFrame(animationFrameId);
    };
  }, [isCameraActive, setShowSSD]);
  
  useEffect(() => {
    const setupCameraStream = async () => {
      if (!isCameraActive) return; // Chỉ bật khi camera active

      try {
        const video = document.createElement('video');
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        video.srcObject = stream;
        video.play();
        videoRef.current = video;

        // Tạo VideoTexture từ camera
        cameraTexture.current = new THREE.VideoTexture(video);
        cameraTexture.current.minFilter = THREE.LinearFilter;
        cameraTexture.current.magFilter = THREE.LinearFilter;
        cameraTexture.current.format = THREE.RGBAFormat;
      } catch (error) {
        console.error('Error accessing camera:', error);
      }
    };

    setupCameraStream();

    return () => {
      // Cleanup camera stream
      if (videoRef.current) {
        const stream = videoRef.current.srcObject as MediaStream;
        if (stream && stream.getTracks) {
          stream.getTracks().forEach((track) => track.stop());
        }
        videoRef.current.pause();
        videoRef.current.srcObject = null;
      }
    };
  }, [isCameraActive]);

  const countFingers = (landmarks) => {
    let count = 0;
    const thresholds = [10, 12, 14, 16, 20]; // Chỉ số ngón tay
    thresholds.forEach((index) => {
      const tip = landmarks[index];
      const dip = landmarks[index - 2];
      if (tip[1] < dip[1]) count += 1; // So sánh trục y
    });
    return count;
  };
  
  useEffect(() => {
    if (!videoRef.current) {
      const video = document.createElement("video");
      video.src = videoUrls[currentVideoIndex];
      video.loop = true;
      video.muted = true;
      video.play();
      videoRef.current = video;

      const texture = new THREE.VideoTexture(video);
      texture.encoding = THREE.sRGBEncoding;
      videoTexture.current = texture;
    } else if (videoRef.current) {
      videoRef.current.src = videoUrls[currentVideoIndex];
      videoRef.current.play();
    }
  }, [currentVideoIndex, videoUrls]);

  const handleNextVideo = () => {
    setCurrentVideoIndex((prevIndex) => (prevIndex + 1) % videoUrls.length);
  };

  const handlePreviousVideo = () => {
    setCurrentVideoIndex(
      (prevIndex) => (prevIndex - 1 + videoUrls.length) % videoUrls.length);
  };
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
    <>
    <group dispose={null} position={modelPosition.toArray()}>
      <group name="Scene">
        <group name="Sketchfab_model" 
        scale={[0.5, 0.5, 0.5]}
        rotation={[-Math.PI / 2, 0, 0]}>
          <group name="root">
            <group name="GLTF_SceneRootNode" rotation={[Math.PI / 2, 0, 0]}>
              <animated.group name="Cube001_1"
              position={Cube001_1.to((x, y, z) => [x, y, z])}
              rotation={[0, 0, (-(Math.PI)*79.082) /180]}
              >
              <mesh
                position={[-0.2, 0.2, -1]}
                rotation={[-Math.PI / 2, 0, 0]}
                onClick={() => setIsSplit((prev) => !prev)}         
                onPointerOver={() => (document.body.style.cursor = "pointer")}
                onPointerOut={() => (document.body.style.cursor = "default")}
              >
                <circleGeometry args={[0.1, 30]} /> 
                <meshStandardMaterial color="white" transparent opacity={0.6} />

                <mesh>
                  <ringGeometry args={[0.1, 0.12, 64]} /> 
                  <meshStandardMaterial color="white" transparent opacity={0.6} />
                </mesh>

                <Text
                  rotation={[0, 0, Math.PI / 2]}
                  position={[0, 0, 0.01]} 
                  fontSize={0.1}
                  color="white"
                  anchorX="center"
                  anchorY="middle"
                >
                  1
                </Text>
              </mesh>
              {isInfoVisible && (
                  <InfoMesh 
                    rotation={[Math.PI / 2, Math.PI, 0]} 
                    position={[-0.45, 0.05, -1.4]} 
                    onClick={(e) => {
                      e.stopPropagation();
                      handleInfoToggle("info1");} } 
                  />
              )}
              <group>
                {isInfoVisible && visibleInfo === "info1" && (
                  <group rotation={[Math.PI / 2, Math.PI, -Math.PI/2]} position={[-1, 0.2, -2.8]}>
                    <mesh>
                      <planeGeometry args={[1.8, 1]} />
                      <meshStandardMaterial color="white" transparent opacity={0.8} />
                    </mesh>
                    <Text
                      fontSize={0.2}
                      color="black"
                      position={[0, 0.2, 0.01]} 
                      anchorX="center"
                      anchorY="middle"
                    >
                      Battery Information{"\n"}
                    </Text>
                    <Text
                      fontSize={0.1}
                      color="black"
                      position={[0, -0.1, 0.01]} 
                      anchorX="center"
                      anchorY="middle"
                      textAlign="center"
                    >
                      Voltage: 14.8VDC {"\n"}
                      Operating: 0°C to 35°C{"\n"}
                      300 discharge/charge cycles
                    </Text>
                  </group>
                )}

              {isInfoVisible && (
                  <InfoMesh 
                    rotation={[-Math.PI/2, 0, 0]} 
                    position={[-2, 0.1, -2]} 
                    onClick={() => handleInfoToggle("info2")} 
                  />

              )}
                {isInfoVisible && visibleInfo === "info2" && (
                  <group rotation={[Math.PI / 2, Math.PI, -Math.PI/2]} position={[-2, 0.2, -2.8]}>
                    <mesh>
                      <planeGeometry args={[1.8, 1]} />
                      <meshStandardMaterial color="white" transparent opacity={0.8} />
                    </mesh>
                    <Text
                      fontSize={0.2}
                      color="black"
                      position={[0, 0.2, 0.01]} 
                      anchorX="center"
                      anchorY="middle"
                    >
                      Monitor{"\n"}
                    </Text>
                    <Text
                      fontSize={0.1}
                      color="black"
                      position={[0, -0.1, 0.01]} 
                      anchorX="center"
                      anchorY="middle"
                      textAlign="center"
                    >
                      15.6-inch FHD Ultraslim {"\n"}
                      Anti-Glare non-touch screen {"\n"}
                      Resolution: 1920 x 1080
                    </Text>
                  </group>
                )}
              </group>

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
                onClick={(e) => {
                  e.stopPropagation(); 
                  toggleVideo();
                }} 
                onPointerOver={() => (document.body.style.cursor = "pointer")}
                onPointerOut={() => (document.body.style.cursor = "default")}
              >
                
                  <meshStandardMaterial
                  map={cameraTexture.current ? cameraTexture.current : (isPlaying && videoTexture.current ? videoTexture.current : null)}
                  attach="material"
                  {...(!isPlaying && materials.Material_4)}
                />
                
                <group rotation={[Math.PI / 2, Math.PI, -Math.PI/2]} position={[0, 0.03, 0]}>
                  <mesh
                    position={[-1.8, 1.3, 0]} 
                    onClick={(e) => {
                      e.stopPropagation(); 
                      handlePreviousVideo();
                    }}
                    onPointerOver={() => (document.body.style.cursor = "pointer")}
                    onPointerOut={() => (document.body.style.cursor = "default")}
                  >
                    <planeGeometry args={[0.3, 0.3]} />
                    <meshStandardMaterial color="red" transparent opacity={0.5} />
                    <Text
                      fontSize={0.12}
                      position={[0, 0, 0.02]}
                      color="white"
                      anchorX="center"
                      anchorY="middle"
                    >
                      Prev
                    </Text>
                  </mesh>

                  <mesh
                    position={[1.8, 1.3, 0]} // Nút Next
                    onClick={(e) => {
                      e.stopPropagation(); // Ngăn chặn sự kiện lan sang các phần tử khác
                      handleNextVideo();
                    }}
                    onPointerOver={() => (document.body.style.cursor = "pointer")}
                    onPointerOut={() => (document.body.style.cursor = "default")}
                  >
                    <planeGeometry args={[0.3, 0.3]} />
                    <meshStandardMaterial color="green" transparent opacity={0.5} />
                    <Text
                      fontSize={0.12}
                      position={[0, 0, 0.02]}
                      color="white"
                      anchorX="center"
                      anchorY="middle"
                    >
                      Next
                    </Text>
                  </mesh>
                </group>
              </mesh>

                <mesh
                  name="Object_8"
                  castShadow
                  receiveShadow
                  geometry={nodes.Object_8.geometry}
                  material={materials.Material_5}
                  { ...screenColorProps }
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
                  { ...screenColorProps }
                />
              </animated.group>

              <animated.group
                name="Cube003_2"
                position={Cube003_2.to((x, y, z) => [x, y, z])}
              >
                <mesh
                ref={buttonRef} 
                position={[-0.4, 0.3, 1.8]}
                rotation={[0, Math.PI/2, (-(Math.PI)*90) /180]}
                onClick={() => setShowSSD((prev) => !prev)}
                onPointerOver={() => (document.body.style.cursor = "pointer")}
                onPointerOut={() => (document.body.style.cursor = "default")}
              >
                <circleGeometry args={[0.1, 30]} /> 
                <meshStandardMaterial color="black" transparent opacity={0.6} />

                <mesh>
                  <ringGeometry args={[0.1, 0.12, 64]} /> 
                  <meshStandardMaterial color="white" transparent opacity={0.6} />
                </mesh>

                <Text
                  rotation={[0, 0, Math.PI / 2]}
                  position={[0, 0, 0.01]} 
                  fontSize={0.1}
                  color="white"
                  anchorX="center"
                  anchorY="middle"
                >
                  2
                </Text>
              </mesh>
              <mesh
                position={[-0.2, 0.22, -1.8]}
                rotation={[0, Math.PI/2, (-(Math.PI)*90) /180]}
                onClick={() => setIsFloating((prev) => !prev)} 
                onPointerOver={() => (document.body.style.cursor = "pointer")}
                onPointerOut={() => (document.body.style.cursor = "default")}
              >
                <circleGeometry args={[0.1, 30]} />
                <meshStandardMaterial color="black" transparent opacity={0.6} />

                <mesh>
                  <ringGeometry args={[0.1, 0.12, 64]} />
                  <meshStandardMaterial color="white" transparent opacity={0.6} />
                </mesh>

                <Text
                  rotation={[0, 0, Math.PI / 2]}
                  position={[0, 0, 0.01]}
                  fontSize={0.1}
                  color="white"
                  anchorX="center"
                  anchorY="middle"
                >
                  3
                </Text>
              </mesh>
              {isInfoVisible && (
                  <InfoMesh 
                    rotation={[-Math.PI/2, 0, 0]} 
                    position={[1, 0.1, 0]} 
                    onClick={() => handleInfoToggle("info3")} 
                  />

              )}
              <group>
                {isInfoVisible && visibleInfo === "info3" && (
                  <group rotation={[Math.PI / 2, Math.PI/2, -Math.PI/2]} position={[2, 0.2, -1.2]}>
                    <mesh>
                      <planeGeometry args={[1.8, 1]} />
                      <meshStandardMaterial color="white" transparent opacity={0.8} />
                    </mesh>
                    <Text
                      fontSize={0.2}
                      color="black"
                      position={[0, 0.2, 0.01]} 
                      anchorX="center"
                      anchorY="middle"
                    >
                      Touchpad{"\n"}
                    </Text>
                    <Text
                      fontSize={0.1}
                      color="black"
                      position={[0, -0.1, 0.01]} 
                      anchorX="center"
                      anchorY="middle"
                      textAlign="center"
                    >
                      Resolution: 300 DPI {"\n"}
                      Horizontal: 133mm{"\n"}
                      Vertical: 90mm
                    </Text>
                  </group>
                )}

                {isFloating && (
                  <group rotation={[Math.PI / 2, Math.PI/2, -Math.PI/2]} position={[1, 1, -3.0]}>
                    <mesh>
                      <planeGeometry args={[1.8, 1]} />
                      <meshStandardMaterial color="white" transparent opacity={0.8} />
                    </mesh>
                    <Text
                      fontSize={0.2}
                      color="black"
                      position={[0, 0.2, 0.01]} 
                      anchorX="center"
                      anchorY="middle"
                    >
                      Keyboard{"\n"}
                    </Text>
                    <Text
                      fontSize={0.1}
                      color="black"
                      position={[0, -0.1, 0.01]} 
                      anchorX="center"
                      anchorY="middle"
                      textAlign="center"
                    >
                      3 Bluetooth channel LEDs {"\n"}
                      Supported by Logi Options {"\n"}
                      Battery LED
                    </Text>
                  </group>
                )}
              </group>
                <mesh
                  name="Object_13"
                  castShadow
                  receiveShadow
                  geometry={nodes.Object_13.geometry}
                  material={materials.Material_8}
                  { ...bodyColorProps }
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
                <animated.mesh
                  name="Object_16"
                  castShadow
                  receiveShadow
                  geometry={nodes.Object_16.geometry}
                  material={materials.Material_10}
                  position={Object16Position.to((x, y, z) => [x, y, z])}
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
              </animated.group>
            </group>
          </group>
        </group>
      </group>
    </group>

      {/* Movement Buttons */}
      <Button
        rotation={[0, -Math.PI / 6, 0]}
        position={[4, 0.6, -1]}
        label="Up"
        color ="green"
        onClick={() => moveModel("up")}
      />
      <Button
        rotation={[Math.PI, -Math.PI / 6, 0]}
        position={[4, -0.6, -1]}
        label="Down"
        color ="green"
        onClick={() => moveModel("down")}
      />
      <Button
        rotation={[0, -Math.PI / 6, Math.PI/2]}
        position={[3.4, 0, -1]}
        label="Left"
        color ="lightgreen"
        onClick={() => moveModel("left")}
      />
      <Button
        rotation={[0, -Math.PI / 6, -Math.PI/2]}
        position={[4.6, 0, -0.7]}
        label="Right"
        color ="lightgreen"
        onClick={() => moveModel("right")}
      />
      <Button
        rotation={[-Math.PI/2, -Math.PI / 6, 0]}
        position={[4, 0, -1.7]}
        label="Forward"
        color ="darkgreen"
        onClick={() => moveModel("forward")}
      />
      <Button
        rotation={[Math.PI/2, -Math.PI / 6, 0]}
        position={[4, 0, -0.4]}
        label="Backward"
        color ="darkgreen"
        onClick={() => moveModel("backward")}
      />
  </>
  );
}

useGLTF.preload("/assets/gaming_laptop/scene-1.glb");