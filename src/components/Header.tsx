import React from 'react';
import { AppBar, Toolbar, Typography, Box, useTheme } from '@mui/material';
import RestaurantMenuIcon from '@mui/icons-material/RestaurantMenu';

export const Header: React.FC = () => {
  const theme = useTheme();

  return (
    <AppBar 
      position="static" 
      sx={{ 
        bgcolor: 'primary.main',
        boxShadow: 'none',
        borderBottom: `1px solid ${theme.palette.primary.light}`,
      }}
    >
      <Toolbar>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <RestaurantMenuIcon sx={{ fontSize: 32 }} />
          <Typography variant="h6" component="h1" sx={{ fontWeight: 600 }}>
            Digital Menu
          </Typography>
        </Box>
      </Toolbar>
    </AppBar>
  );
}; 