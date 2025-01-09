import React from "react";

interface ModelControlButtonProps {
  onMoveModel: (direction: string) => void;
}

const ModelControlButton: React.FC<ModelControlButtonProps> = ({ onMoveModel }) => {
  // Button styles
  const buttonStyle: React.CSSProperties = {
    font: "menu",
    padding: "10px 15px",
    margin: "10px",
    fontSize: "16px",
    backgroundColor: "rgba(30, 30, 30, 0.7)",
    color: "#fff",
    border: "1px solid rgba(21, 45, 45, 0.9)",
    borderRadius: "5px",
    cursor: "pointer",
    transition: "all 0.3s ease",
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.2)",
  };

  return (
    <div style={{ textAlign: "center", marginTop: "20px" }}>
      <button style={buttonStyle} onClick={() => onMoveModel("up")}>
        Move Up
      </button>
      <button style={buttonStyle} onClick={() => onMoveModel("down")}>
        Move Down
      </button>
      <button style={buttonStyle} onClick={() => onMoveModel("left")}>
        Move Left
      </button>
      <button style={buttonStyle} onClick={() => onMoveModel("right")}>
        Move Right
      </button>
    </div>
  );
};

export default ModelControlButton;
