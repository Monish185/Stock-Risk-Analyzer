import React from 'react';
import { AppBar, Toolbar, Typography, Box } from '@mui/material';
import ShowChartIcon from '@mui/icons-material/ShowChart';
import { useThemeMode } from '../context/ThemeContext';
import ThemeToggle from './ThemeToggle';


const NavBar = () => {
  return (
    <AppBar position="static" sx={{ backgroundColor: '#0D47A1' }}>
      <Toolbar>
        <ShowChartIcon sx={{ mr: 1 }} />
        <Typography variant="h6" component="div">
          Stock Risk Analyzer
        </Typography>
        <Box sx={{ flexGrow: 1 }} />
        <Typography variant="body2" sx={{ fontWeight: 300 }}>
          powered by FastAPI + DL 🔥
        </Typography>
        <ThemeToggle />
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;
