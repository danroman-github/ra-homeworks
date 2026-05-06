import React, { useState } from 'react';
import WorldClockForm from './components/WorldClockForm';
import WorldClockList from './components/WorldClockList';
import { CityClock } from './types';
import './App.css';

const App: React.FC = () => {
  const [clocks, setClocks] = useState<CityClock[]>([]);

  const handleAddClock = (name: string, timezoneOffset: number) => {
    const newClock: CityClock = {
      id: Date.now(),
      name,
      timezoneOffset
    };
    setClocks(prev => [...prev, newClock]);
  };

  const handleRemoveClock = (id: number) => {
    setClocks(prev => prev.filter(clock => clock.id !== id));
  };

  return (
    <div className="app">
      <div className="container">
        <h1 className="title">Мировые часы</h1>
        <WorldClockForm onAdd={handleAddClock} />
        <WorldClockList clocks={clocks} onRemove={handleRemoveClock} />
      </div>
    </div>
  );
};

export default App;
