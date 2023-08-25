import React from 'react';
import './App.css';
import AuthContextProvider from './components/Auth-Context-Provider/AuthContextProvider.tsx';
import { BrowserRouter as Router } from "react-router-dom";
import RoutePaths from './components/RoutePaths/RoutePaths.tsx';
import ResponsiveAppBar from './components/AppBar/AppBar.tsx';
import StickyFooter from './components/Footer/Footer.tsx';


const App: React.FC = () => {

  return (
    <>
      <Router>
          <AuthContextProvider>
            <ResponsiveAppBar />
            <RoutePaths />
            <StickyFooter/>
          </AuthContextProvider >
      </Router>
    </>
  );
};

export default App;