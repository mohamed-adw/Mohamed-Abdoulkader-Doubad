import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Navigation from './components/Navigation';
import Eleves from './components/Eleves';
import Enseignants from './components/Enseignants';
import Cours from './components/Cours';
import Services from './components/Services';
import Ressources from './components/Ressources';

const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#dc004e',
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Navigation />
        <Routes>
          <Route path="/" element={<Eleves />} />
          <Route path="/enseignants" element={<Enseignants />} />
          <Route path="/cours" element={<Cours />} />
          <Route path="/services" element={<Services />} />
          <Route path="/ressources" element={<Ressources />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App; 