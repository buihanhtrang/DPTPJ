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
import React, { useRef, useState, useEffect } from "react";
import { useSpring, a } from "@react-spring/three";
import * as THREE from "three";
import { RGBELoader } from "three/examples/jsm/loaders/RGBELoader";
import { useWindowWidth } from "@react-hook/window-size";
import { motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome } from "@fortawesome/free-solid-svg-icons";


//API
const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
recognition.continuous = true; 
recognition.interimResults = false; 
recognition.lang = 'en-US'; 

// components
import ConfiguratorComponent from "@/components/configurator/component";
import ColorPickerComponent from "@/components/color_picker/component";
import UFOComponent from "@/components/animation/component";
import InfoButton from "@/components/showinfo/InfoButton";

// models
import { IConfiguratorOption } from "../../models/configuration";

// styles
import { itemVariants } from "@/styles/variants";
import { Computer } from "@/components/computer/component";
import { StorageSSD } from "@/components/computer/StorageSSD";
import CameraButton from "@/components/computer/CameraButton";

const keyboardColor = "Keyboard Color";
const screenColor = "Screen Color";
const bodyColor = "Body Color";

const HDRI_PATHS = {
  coffee_shop: "/assets/coffeeshop.hdr",
  outdoor: "/assets/outdoor.hdr",
  indoor: "/assets/home.hdr",
};

const AUDIO_PATHS = {
  coffee_shop: "/assets/coffeeshop.mp3",
  outdoor: "/assets/outdoor.mp3",
  indoor: "/assets/home.mp3",
  intro: "/assets/intro.mp3", 
  click: "/assets/click.wav", 
};


const playClickSound = () => {
  const audio = new Audio(AUDIO_PATHS.click);
  audio.play();
};

const HDRILoader = ({ path }: { path: string }) => {
  const { scene, gl } = useThree();

  useEffect(() => {
    const loader = new RGBELoader();
    const pmremGenerator = new THREE.PMREMGenerator(gl);

    const defaultColor = new THREE.Color(0xD3D3D3); // Default background
    scene.background = defaultColor;
    scene.environment = null;

    const ambientLight = new THREE.AmbientLight(0x686868, 20); // Soft ambient light
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
  const [isMotionVisible, setIsMotionVisible] = useState(true);
  const [selectedRoom, setSelectedRoom] = useState<keyof typeof HDRI_PATHS | "">(""); 
  const [showSSD, setShowSSD] = useState(false);
  const [isMenuVisible, setIsMenuVisible] = useState(false);
  const [isInfoVisible, setIsInfoVisible] = useState(false);
  const [audio, setAudio] = useState<HTMLAudioElement | null>(null);
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);
  const [isHelpModalVisible, setIsHelpModalVisible] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [isCameraActive, setIsCameraActive] = useState(false);

  const [microphoneActive, setMicrophoneActive] = useState(false);
  const [recognizedText, setRecognizedText] = useState("");
  const [recognitionStatus, setRecognitionStatus] = useState("Waiting for command...");
  const [isRecognitionStarted, setIsRecognitionStarted] = useState(false);
  const [isSpeechRecognitionVisible, setIsSpeechRecognitionVisible] = useState(false);
  const handleNext = () => {
    setCurrentStep((prev) => (prev < 2 ? prev + 1 : 1));
  };

  const handlePrevious = () => {
    setCurrentStep((prev) => (prev > 1 ? prev - 1 : 2));
  };
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
    position: showSSD ? [0, 0, 0] : [-2, 0, -3],
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
  
  const [isRotating, setIsRotating] = useState(false); 
  const computerGroupRef = useRef(null); 

  
  const ComputerRotationHandler = () => {
    useFrame(() => {
      if (isRotating && computerGroupRef.current) {
        computerGroupRef.current.rotation.y += 0.01; 
      }
    });
    return null; 
  };

  const toggleAudio = (room: keyof typeof AUDIO_PATHS) => {
    if (audio) {
      audio.pause();
      audio.currentTime = 0;
      setAudio(null);
    }

    if (room && AUDIO_PATHS[room]) {
      const newAudio = new Audio(AUDIO_PATHS[room]);
      setAudio(newAudio);
      newAudio.loop = true;
      newAudio.play();
      setIsAudioPlaying(true);

      newAudio.addEventListener("ended", () => {
        setIsAudioPlaying(false);
      });
    } else {
      setIsAudioPlaying(false);
    }
  };

  const handleAudioToggle = () => {
    if (audio) {
      if (isAudioPlaying) {
        audio.pause();
        setIsAudioPlaying(false);
      } else {
        audio.play();
        setIsAudioPlaying(true);
      }
    }
  };

  const resetBackground = () => {
    setSelectedRoom(""); 
    if (audio) {
      audio.pause();
      audio.currentTime = 0;
      setAudio(null);
    }
    setIsAudioPlaying(false);
    
    const introAudio = new Audio(AUDIO_PATHS.intro);
    setAudio(introAudio);
    introAudio.loop = true;
    introAudio.play();
    setIsAudioPlaying(true);
  };

  

  useEffect(() => {
    // const defaultAudio = new Audio(AUDIO_PATHS.intro);
    // setAudio(defaultAudio);
    // defaultAudio.loop = true;
    // defaultAudio.play();
    // setIsAudioPlaying(true);
  
    // recognition starts only if it's not already running
    const startRecognition = () => {
      if (!isRecognitionStarted) {
        recognition.start();
        setIsRecognitionStarted(true);
      }
    };

    // stop recognition
    const stopRecognition = () => {
      if (isRecognitionStarted) {
        recognition.stop();
        setIsRecognitionStarted(false);
      }
    };

    if (microphoneActive ) {
      startRecognition();
      setRecognitionStatus("Listening...");
      // Pause music when microphone is on
      
    } else {
      stopRecognition();
      setRecognitionStatus("Stopped listening.");
    }
  
    
    recognition.onresult = (event) => {
      const command = event.results[0][0].transcript.toLowerCase();
      setRecognizedText(command); 
      
      const extractColor = (command: string): string | undefined => {
        const colorsMap: { [key: string]: string } = {
          black: "#1e1e1e",
          white: "#F8FAFC",
          green: "#06D001",
          yellow: "#FFE700",
          blue: "#4CC9FE",
          gray: "#A4A5A6",
          red: "#BA3B2E",
        };
        const color = Object.keys(colorsMap).find((key) => command.includes(key)); 
        return colorsMap[color || ""];
      };
    
      const newColor = extractColor(command);
      console.log(`Extracted color: ${newColor}`);

      // Handle recognized commands
      if (command.includes("start rotation")) {
        setIsRotating(true);
      } else if (command.includes("stop rotation")) {
        setIsRotating(false);
      } else if (command.includes("show menu")) {
        setIsMenuVisible(true);
      } else if (command.includes("hide menu")) {
        setIsMenuVisible(false);
      } else if (command.includes("coffee shop")) {
        setSelectedRoom("coffee_shop");
        toggleAudio("coffee_shop");
      } else if (command.includes("outdoor")) {
        setSelectedRoom("outdoor");
        toggleAudio("outdoor");
      } else if (command.includes("home")) {
        setSelectedRoom("indoor");
        toggleAudio("indoor");
      } else if (command.includes("reset background")) {
        resetBackground();
      } else if (command.includes("play music")) {
        handleAudioToggle();
      } else if (command.includes("pause music")) {
        handleAudioToggle();
      } else if (command.includes("AR application") || command.includes("application")) {
        setIsHelpModalVisible(true);
        playClickSound();
      } else if (command.includes("show information")) {
        setIsInfoVisible(true); 
      } else if (command.includes("hide information")) {
        setIsInfoVisible(false); 
      } else if (command.includes("turn off camera")) {
        setIsCameraActive(false); 
      } else if (command.includes("turn on camera")) {
        setIsCameraActive(true); 
      } else if (newColor) {
        console.log(`Applying color: ${newColor}`);
        if (command.includes("keyboard")) {
          onSelectedColor("keyboardColor", newColor);
        } else if (command.includes("body")) {
          onSelectedColor("bodyColor", newColor);
        } else if (command.includes("screen")) {
          onSelectedColor("screenColor", newColor);
        }
      }
    };
  
    recognition.onend = () => {
      if (microphoneActive) {
        recognition.start(); // Restart recognition if the microphone is still active
      }
    };

    // Cleanup: microphone is off when the component is unmounted
    const handleBeforeUnload = () => {
      stopRecognition();
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      stopRecognition(); 
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [microphoneActive, isRecognitionStarted]);
  
  useEffect(() => {
    //microphone is off when the page loads or reloads
    setMicrophoneActive(false);
  }, []);

  const toggleMicrophone = () => {
    setMicrophoneActive((prevState) => !prevState);
  };
  



  return (
    <div className="page">
      {isSpeechRecognitionVisible && (
      <div
      className="menu-top-left"
      style={{
        position: "absolute",
        top: "20px",
        left: "20px",
        zIndex: 10,
        display: "flex",
        flexDirection: "column",
        gap: "10px",
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        padding: "15px",
        borderRadius: "10px",
      }}
    >

      {/* Microphone Control Button */}
      <button
        onClick={toggleMicrophone}
        className={`btn ${microphoneActive ? "btn-danger" : "btn-success"}`}
        style={{
          height: "50px",
          width: "180px",
          color: "#000",
          borderRadius: "5px",
          border: "1px solid #007bff",
          fontWeight: "300",
          fontSize: 20,
        }}
      >
        {microphoneActive ? "Turn off " : "Turn on "}
      </button>

      {/* Display the recognized script */}
      {recognizedText && (
        <div
          className="recognized-text-box"
          style={{
            marginTop: "0px",
            padding: "5px",
            border: "1px solid #007bff",
            backgroundColor: "#d9d9d9",
            borderRadius: "5px",
            color: "#000",
            fontSize: "18"
          }}
        >
          <h3 style={{fontWeight: "300"}}>Recognized Script:</h3>
          <p style={{fontSize: 30, color: "blue", fontWeight: "bold"}}>{recognizedText}</p>
        </div>
      )}    
      {/* Display the recognition status */}
      <div
        style={{
          marginTop: "10px",
          color: "#fff",
        }}
      >
        <p>{recognitionStatus}</p>
      </div>
    </div>)}

    {/* Back to Homepage Button with Icon */}
    <div
            style={{
              position: "absolute",
              zIndex: 10,
              display: "flex",
              flexDirection: "column",
              gap: "10px",
              backgroundColor: "rgba(34, 100, 158, 0.15)",
              padding: "15px",
              borderRadius: "10px",
    }}
      >
      <button
        onClick={() => window.location.href = "/"} // Redirect to homepage
        style={{
          backgroundColor: "#007bff",
          color: "white",
          padding: "10px 20px",
          borderRadius: "5px",
          border: "none",
          fontWeight: "bold",
          fontSize: "16px",
          display: "flex",
          alignItems: "center",
        }}
      >
            <FontAwesomeIcon icon={faHome} style={{ fontSize: "20px", marginRight: "10px" }} />
            Back to Homepage
      </button>
      </div>

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
        <button
              onClick={() => setIsRotating((prev) => !prev)}
              style={{
                backgroundColor: isRotating ? "#BA3B2E" : "#00ab41",
                color: "#fff",
                padding: "10px 20px",
                borderRadius: "5px",
                border: "none",
                cursor: "pointer",
                fontWeight: "bold",
                }}
              >
                {isRotating ? "Stop Rotation" : "Start Rotation"} 
        </button>

        {/* Toggle Button for UFO */}
        <button
              onClick={() => setIsMotionVisible(!isMotionVisible)}
              style={{
                backgroundColor: isRotating ? "#BA3B2E" : "#00ab41",
                color: "#fff",
                padding: "10px 20px",
                borderRadius: "5px",
                border: "none",
                cursor: "pointer",
                fontWeight: "bold",
                }}
              >
              {isMotionVisible ? "Hide UFO Motion" : "Show UFO Motion"}
        </button>
            
        <button
          onClick={() => {
            setIsMenuVisible((prev) => !prev);
            playClickSound();
          }}
          style={{
            backgroundColor: "#00ab41",
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
        {isMenuVisible && (
          <>
            <button
              onClick={() => {
                setSelectedRoom("coffee_shop");
                toggleAudio("coffee_shop");
                playClickSound();
              }}
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
              onClick={() => {
                setSelectedRoom("outdoor");
                toggleAudio("outdoor");
                playClickSound();
              }}
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
              onClick={() => {
                setSelectedRoom("indoor");
                toggleAudio("indoor");
                playClickSound();
              }}
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

            <button
              onClick={() => {
                resetBackground();
                playClickSound();
              }}
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

            <button
              onClick={() => {
                handleAudioToggle();
                playClickSound();
              }}
              style={{
                backgroundColor: isAudioPlaying ? "#BA3B2E" : "#00ab41",
                color: "#fff",
                padding: "10px",
                borderRadius: "5px",
                border: "none",
                cursor: "pointer",
              }}
            >
              {isAudioPlaying ? "Pause Music" : "Play Music"}
            </button>

        </>
        )}
          {/* Speech Recognition UI */}
        <button
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: isSpeechRecognitionVisible ?  "BA3B2E" : "#d9d9d9" ,
            padding: "10px 15px",
            borderRadius: "5px",
            color: "#fff",
            cursor: "pointer",
          }}
          onClick={() => {

        setIsSpeechRecognitionVisible((prev) => !prev);
        playClickSound();
      
        }}
        >
        {/* Speech recognition button */}
          <img
              src="/assets/mic.png"  // Đường dẫn tới hình ảnh của bạn
              alt="Microphone"
              style={{ width: "10px", height: "15px" }}  
            />
        </button>

        <button
          onClick={() => {
            setIsHelpModalVisible(true);
            playClickSound();  
          }}
          style={{
            backgroundColor: "#00ab41",
            color: "#fff",
            padding: "10px 20px",
            borderRadius: "5px",
            border: "none",
            cursor: "pointer",
            fontWeight: "bold",
          }}
        >
          AR app
        </button>
      </div>
      
      {isHelpModalVisible && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
            backgroundColor: "rgba(0, 0, 0, 0.8)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 1000,
          }}
        >
          <div
            style={{
              backgroundColor: "#fff",
              borderRadius: "10px",
              padding: "20px",
              width: "90%",
              maxWidth: "550px",
              textAlign: "center",
            }}
          >
            <h2 style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
            <span style={{ flexGrow: 1, textAlign: 'center', fontSize:"30px" }}>Help</span>
            <button
            onClick={() => {
              setIsHelpModalVisible(false);
              playClickSound();  
            }}
            style={{
              marginLeft: "10px", 
              backgroundColor: "#d9d9d9",
              color: "#fff",
              padding: "10px 10px",
              borderRadius: "5px",
              border: "none",
              cursor: "pointer",
              fontWeight: "bold",
            }}
          >
            X
          </button>
          </h2>

            
            {currentStep === 1 && (
              <div>
                <p style={{ fontSize: "24px", marginBottom: "40px" }}>Step 1: Scan QR code to download the app on an Android mobile phone</p>
                <img src="/assets/dpt.png" alt="" style={{ width: "50%" }} />
              </div>
            )}
            {currentStep === 2 && (
              <div>
                <p style={{ fontSize: "24px", marginBottom: "40px" }}>Step 2: Scan this image to explore </p>
                <img src="/assets/thuat-tu-tuong.jpg" alt="" style={{ width: "50%" }} />
              </div>
            )}
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: "20px", position: "absolute", top: "53%", left: "50%", transform: "translate(-50%, -50%)" }}>
            <button
              onClick={() => {
                handlePrevious();
                playClickSound();  
              }}
              style={{
              backgroundColor: "#000",
              color: "#fff",
              padding: "10px 15px",
              borderRadius: "360px",
              border: "none",
              cursor: "pointer",
              fontWeight: "bold",
            }}
            >
              {"<"}
            </button>
            <div style={{ width: "450px" }}></div>
            <button
              onClick={() => {
                handleNext();
                playClickSound();  
              }}
              style={{
              backgroundColor: "#000",
              color: "#fff",
              padding: "10px 15px",
              borderRadius: "360px",
              border: "none",
              cursor: "pointer",
              fontWeight: "bold",
            }}
            >
            {">"}
            </button>
            </div>  
          </div>
        </div>
      )}

      <Canvas shadows camera={{ position: [5, 0, 15], fov: 30 }} style={{ width: "100vw", height: "100vh" }}>
        <HDRILoader path={selectedRoom ? HDRI_PATHS[selectedRoom] : ""} />
        <ambientLight color='red' intensity={0.5} />
        <spotLight position={[0, 15, 0]} angle={0.3} penumbra={1} castShadow intensity={2} shadow-bias={-0.0001} /> 
        <spotLight position={[-8, -1, 0]} angle={1} penumbra={1} castShadow intensity={2} shadow-bias={-0.0001} />
        <ambientLight color='gray' />


        <AccumulativeShadows position={[0, -2, 0]} frames={100} alphaTest={0.9} scale={50}>
          <RandomizedLight amount={8} radius={10} ambient={0.5} position={[1, 5, -1]} />
        </AccumulativeShadows>

        <UFOComponent isVisible={isMotionVisible} />
        <OrbitControls />

        <group
          ref={computerGroupRef}
          position={isMobile ? [0.3, isConfiguratorOpen ? -0.5 : -1.8, -2] : [-1.5, -1.1, -2]}
          scale={isMobile ? 1.3 : 2.5}
          rotation-y={Math.PI / 5}
        >
          <Computer
            bodyColor={getbodyColor()}
            keyboardColor={getkeyboardColor()}
            screenColor={getscreenColor()}
            setShowSSD={(value) => {
              setShowSSD(value);
              playClickSound();
            }}
            isInfoVisible={isInfoVisible}
            isCameraActive={isCameraActive}
          />
        </group>

        <ComputerRotationHandler />
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

      <InfoButton
        onToggle={(isOn) => {
          setIsInfoVisible(isOn);
          playClickSound();
        }}
      />
      <CameraButton
        onToggleCamera={(isOn) => {
          setIsCameraActive(isOn);
          playClickSound();
        }}
      />

      <ConfiguratorComponent title="Configure Your" subTitle="Laptop" isConfiguratorOpen={(v) => {
        setIsConfiguratorOpen(v);
        playClickSound();
      }}>
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
