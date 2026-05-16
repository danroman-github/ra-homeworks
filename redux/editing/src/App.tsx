import React from 'react';
import ServiceForm from './components/ServiceForm';
import ServiceList from './components/ServiceList';
import './App.css';

function App() {
  return (
    <div className="app">
      <header className="app-header">
        <h1>📋 Управление услугами</h1>
      </header>

      <main className="app-main">
        <div className="form-section">
          <ServiceForm />
        </div>

        <div className="list-section">
          <ServiceList />
        </div>
      </main>
    </div>
  );
}

export default App;