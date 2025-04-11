import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
} from '@mui/material';
import {
  School as SchoolIcon,
  Person as PersonIcon,
  Book as BookIcon,
  Extension as ExtensionIcon,
  Inventory as InventoryIcon,
} from '@mui/icons-material';

// Crée un thème gris pour l'AppBar et les boutons
import { createTheme, ThemeProvider } from '@mui/material/styles';

// Crée un thème personnalisé avec des couleurs grises
const theme = createTheme({
  palette: {
    primary: {
      main: '#9e9e9e', // Gris clair pour la couleur principale
    },
    secondary: {
      main: '#616161', // Gris moyen pour la couleur secondaire
    },
    background: {
      default: '#f5f5f5', // Gris clair pour le fond de l'application
    },
  },
});

const Navigation = () => {
  return (
    <ThemeProvider theme={theme}>
      <AppBar position="static">
        <Toolbar>
          <SchoolIcon sx={{ mr: 2 }} />
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            School Management
          </Typography>
          <Box sx={{ display: 'flex', gap: 2 }}>
            <Button
              color="inherit"
              component={RouterLink}
              to="/"
              startIcon={<PersonIcon />}
            >
              Students {/* Ancien: Élèves -> Nouveau: Students */}
            </Button>
            <Button
              color="inherit"
              component={RouterLink}
              to="/enseignants"
              startIcon={<PersonIcon />}
            >
              Teachers {/* Ancien: Enseignants -> Nouveau: Teachers */}
            </Button>
            <Button
              color="inherit"
              component={RouterLink}
              to="/cours"
              startIcon={<BookIcon />}
            >
              Courses {/* Ancien: Cours -> Nouveau: Courses */}
            </Button>
            <Button
              color="inherit"
              component={RouterLink}
              to="/services"
              startIcon={<ExtensionIcon />}
            >
              Services {/* Ancien: Services -> Nouveau: Services */}
            </Button>
            <Button
              color="inherit"
              component={RouterLink}
              to="/ressources"
              startIcon={<InventoryIcon />}
            >
              Resources {/* Ancien: Ressources -> Nouveau: Resources */}
            </Button>
          </Box>
        </Toolbar>
      </AppBar>
    </ThemeProvider>
  );
};

export default Navigation;
