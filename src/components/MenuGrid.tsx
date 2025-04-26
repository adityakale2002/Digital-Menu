import React from 'react';
import { Container, Grid } from '@mui/material';
import { menuItems } from '../data/menuItems';
import { MenuItemCard } from './MenuItemCard';

export const MenuGrid: React.FC = () => {
  // Only take the first two items
  const displayedItems = menuItems.slice(0, 2);
  
  return (
    <Container maxWidth="xl" sx={{ py: 2 }}>
      <Grid container spacing={3} alignItems="stretch">
        {displayedItems.map((item) => (
          <Grid item xs={12} md={6} key={item.id}>
            <MenuItemCard item={item} />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}; 