import React from 'react';
import { ThemeType } from '../types';

interface ThemeToggleButtonProps {
    currentTheme: ThemeType;
    onToggle: () => void;
}

const ThemeToggleButton: React.FC<ThemeToggleButtonProps> = ({ currentTheme, onToggle }) => {
    const styles = {
        light: {
            backgroundColor: '#000000',
            color: '#ffffff',
            border: '2px solid #000000',
        },
        dark: {
            backgroundColor: '#000000',
            color: '#ffffff',
            border: '2px solid #ffffff',
        }
    };

    const currentStyle = styles[currentTheme];

    return (
        <button onClick={onToggle} style={currentStyle}>
            Переключить тему (сейчас: {currentTheme})
        </button>
    );
};

export default ThemeToggleButton;