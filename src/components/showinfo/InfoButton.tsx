import React, { useState } from 'react';

interface InfoButtonProps {
    onToggle?: (isOn: boolean) => void; 
}

const InfoButton: React.FC<InfoButtonProps> = ({ onToggle }) => {
    const [isToggleOn, setIsToggleOn] = useState(false);

    const handleToggle = () => {
        const newState = !isToggleOn;
        setIsToggleOn(newState);
        if (onToggle) {
            onToggle(newState); 
        }
    };

    return (
        <button
            style={{
                font: 'menu',
                position: 'absolute',
                top: 20,
                right: 20,
                padding: '10px 15px',
                fontSize: '16px',
                backgroundColor: 'rgba(30, 30, 30, 0.7)', 
                color: '#fff',
                border: '1px rgba(21, 45, 45, 0.9)', 
                borderRadius: '5px',
                cursor: 'pointer',
                transition: 'all 0.3s ease', 
                boxShadow: '0 4px 6px rgba(0, 0, 0, 0.2)', 
            }}
            onMouseEnter={(e) => {
                (e.target as HTMLButtonElement).style.backgroundColor = 'rgba(53, 115, 115, 0.9)'; 
                (e.target as HTMLButtonElement).style.color = '#000';
            }}
            onMouseLeave={(e) => {
                (e.target as HTMLButtonElement).style.backgroundColor = 'rgba(30, 30, 30, 0.7)'; 
                (e.target as HTMLButtonElement).style.color = '#fff';
            }}
            onClick={handleToggle}
        >
            {isToggleOn ? 'Hide Info' : 'Show Info'}
        </button>
    );
};

export default InfoButton;
