import React from 'react';
import { Box, Tabs, Tab, useTheme } from '@mui/material';
import RestaurantMenuIcon from '@mui/icons-material/RestaurantMenu';
import LocalBarIcon from '@mui/icons-material/LocalBar';
import CakeIcon from '@mui/icons-material/Cake';
import RamenDiningIcon from '@mui/icons-material/RamenDining';

interface CategoryNavProps {
  category: string;
  onCategoryChange: (category: string) => void;
}

export const CategoryNav: React.FC<CategoryNavProps> = ({ category, onCategoryChange }) => {
  const theme = useTheme();

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    onCategoryChange(newValue);
  };

  return (
    <Box sx={{ 
      width: '100%', 
      bgcolor: 'background.paper',
      position: 'sticky',
      top: 0,
      zIndex: 1000,
      boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
    }}>
      <Tabs
        value={category}
        onChange={handleChange}
        centered
        variant="scrollable"
        scrollButtons="auto"
        allowScrollButtonsMobile
        sx={{
          '& .MuiTab-root': {
            minWidth: 120,
            color: theme.palette.text.secondary,
            '&.Mui-selected': {
              color: theme.palette.primary.main,
            },
          },
          '& .MuiTabs-indicator': {
            backgroundColor: theme.palette.primary.main,
          },
        }}
      >
        <Tab 
          icon={<RestaurantMenuIcon />} 
          label="Main Course" 
          value="Main Course"
        />
        <Tab 
          icon={<RamenDiningIcon />} 
          label="Starters" 
          value="Starters"
        />
        <Tab 
          icon={<LocalBarIcon />} 
          label="Beverages" 
          value="Beverages"
        />
        <Tab 
          icon={<CakeIcon />} 
          label="Desserts" 
          value="Desserts"
        />
      </Tabs>
    </Box>
  );
}; 