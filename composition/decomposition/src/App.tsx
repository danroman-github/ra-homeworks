import { Logo } from './components/Sidebar/Logo';
import { Header } from './components/Header/Header';
import { Sidebar } from './components/Sidebar/Sidebar';
import { MainContent } from './components/MainContent/MainContent';
import { Footer } from './components/Footer/Footer';
import './App.css';

export const App = () => (
  <div className="app">
    <div className="layout-header">
      <Logo />
      <Header />
    </div>
    <div className="layout">
      <Sidebar />
      <MainContent />
    </div>
    <Footer />
  </div>
);
