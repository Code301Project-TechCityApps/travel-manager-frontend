// App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';
import OffcanvasNavbar from './components/OffcanvasNavbar';
import 'bootstrap/dist/css/bootstrap.min.css';
import LandingPage from './components/LandingPage';
import HomePage from './components/Home'; 
import Currency from './components/Currency';
import Translator from './components/Translator';


// const ConditionalNavbar = () => {
//   const location = useLocation();
//   const showNavbar = location.pathname !== "/";
//   return showNavbar ? <OffcanvasNavbar /> : null;
// };

function App() {
  const { isAuthenticated, isLoading } = useAuth0();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <Router>
        { isAuthenticated && <OffcanvasNavbar />}
      <Routes>
        <Route path="/" element={isAuthenticated ? <HomePage /> : <LandingPage />} />
        <Route path="/currency" element={isAuthenticated && <Currency />} />
        <Route path="/translator" element={isAuthenticated && <Translator />} />
      </Routes>
    </Router>
  );
}


//fixed branch 

export default App;
