import React, { useState } from 'react';

interface InfoButtonProps {
    onToggle?: (isOn: boolean) => void; // Optional callback when toggled
}

const InfoButton: React.FC<InfoButtonProps> = ({ onToggle }) => {
    const [isToggleOn, setIsToggleOn] = useState(false);

    // Handle toggle state and trigger callback
    const handleToggle = () => {
        const newState = !isToggleOn;
        setIsToggleOn(newState);
        if (onToggle) {
            onToggle(newState); // Call the parent callback if provided
        }
    };

    // Button styles
    const buttonStyle: React.CSSProperties = {
        font: 'menu',
        position: 'absolute',
        top: 20,
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
        <button
            style={buttonStyle}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            onClick={handleToggle}
        >
            {isToggleOn ? 'Hide Info' : 'Show Info'}
        </button>
    );
};

export default InfoButton;
