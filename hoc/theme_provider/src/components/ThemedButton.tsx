import React from 'react';
import { withTheme } from '../hoc/withTheme';
import { ThemeType } from '../types';

interface ThemedButtonProps {
    theme: ThemeType;
    onClick?: () => void;
    children?: React.ReactNode;
}

const ThemedButton: React.FC<ThemedButtonProps> = ({ theme, onClick, children }) => {
    const styles = {
        light: {
            backgroundColor: '#f0f0f0',
            color: '#000000',
            border: '1px solid #f0f0f0',
        },
        dark: {
            backgroundColor: '#333333',
            color: '#ffffff',
            border: '1px solid #333333',
        }
    };

    const currentStyle = styles[theme];

    return (
        <button onClick={onClick} style={currentStyle}>
            {children}
        </button>
    );
};

ThemedButton.displayName = 'ThemedButton';

export default withTheme(ThemedButton);