import React, { useState } from 'react';
import ThemedButton from './components/ThemedButton';
import ThemeToggleButton from './components/ThemeToggleButton';
import { ThemeType } from './types';
import './App.css';

const App: React.FC = () => {
  const [theme, setTheme] = useState<ThemeType>('light');

  const toggleTheme = () => {
    setTheme(prevTheme => prevTheme === 'light' ? 'dark' : 'light');
  };

  const appStyles = {
    light: {
      backgroundColor: '#ffffff',
      minHeight: '100vh',
      display: 'flex',
      gap: '20px',
      justifyContent: 'center',
      alignItems: 'center',
      transition: 'all 0.3s ease',
    },
    dark: {
      backgroundColor: '#1a1a1a',
      minHeight: '100vh',
      display: 'flex',
      gap: '20px',
      justifyContent: 'center',
      alignItems: 'center',
      transition: 'all 0.3s ease',
    }
  };

  const currentAppStyle = appStyles[theme];

  return (
    <div style={currentAppStyle}>
      <ThemeToggleButton
        currentTheme={theme}
        onToggle={toggleTheme}
      />

      <ThemedButton theme={theme}>
        Кнопка с темой
      </ThemedButton>
    </div>
  );
};

export default App;