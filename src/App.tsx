import React from 'react';
import './App.css';
import AuthContextProvider from './components/Auth-Context-Provider/AuthContextProvider.tsx';
import { BrowserRouter as Router } from "react-router-dom";
import RoutePaths from './components/RoutePaths/RoutePaths.tsx';
import Header from './views/Header/Header.tsx';

const App: React.FC = () => {

  return (
    <>
      <Router>
          <AuthContextProvider>
            <Header />
            <RoutePaths />
          </AuthContextProvider >
      </Router>
    </>
  );
};

export default App;