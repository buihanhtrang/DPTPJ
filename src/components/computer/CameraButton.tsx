import React, { useState, useRef } from 'react';

interface CameraButtonProps {
  onToggleCamera?: (isCameraActive: boolean) => void;
}

const CameraButton: React.FC<CameraButtonProps> = ({ onToggleCamera }) => {
  const [isCameraActive, setIsCameraActive] = useState(false);
  const localVideo = useRef<HTMLVideoElement | null>(null);

  // Toggle camera
  const toggleCamera = async () => {
    if (isCameraActive && localVideo.current) {
      const stream = localVideo.current.srcObject as MediaStream;
      stream?.getTracks().forEach((track) => track.stop());
      localVideo.current.srcObject = null;
      setIsCameraActive(false);
      if (onToggleCamera) onToggleCamera(false);
    } else {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      if (localVideo.current) {
        localVideo.current.srcObject = stream;
      }
      setIsCameraActive(true);
      if (onToggleCamera) onToggleCamera(true);
    }
  };
  

  // Button styles
  const buttonStyle: React.CSSProperties = {
    font: 'menu',
    position: 'absolute',
    top: 80,
    right: 20,
    padding: '10px 15px',
    fontSize: '16px',
    backgroundColor: 'rgba(30, 30, 30, 0.7)',
    color: '#fff',
    border: '1px solid rgba(21, 45, 45, 0.9)',
    borderRadius: '5px',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.2)',
    zIndex: 10, // To ensure the button is on top of the 3D scene
  };

  // Hover styles
  const handleMouseEnter = (e: React.MouseEvent<HTMLButtonElement>) => {
    const button = e.currentTarget;
    button.style.backgroundColor = 'rgba(53, 115, 115, 0.9)';
    button.style.color = '#000';
  };

  const handleMouseLeave = (e: React.MouseEvent<HTMLButtonElement>) => {
    const button = e.currentTarget;
    button.style.backgroundColor = 'rgba(30, 30, 30, 0.7)';
    button.style.color = '#fff';
  };

  return (
    <>
      {/* Camera toggle button */}
      <button
        style={buttonStyle}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onClick={toggleCamera}
      >
        {isCameraActive ? 'Turn Off Camera' : 'Turn On Camera'}
      </button>

      {/* Hidden video element for camera feed */}
      {isCameraActive && <video ref={localVideo} style={{ display: 'none' }} autoPlay />}
    </>
  );
};

export default CameraButton;
