import React, { useState } from 'react';
import { Box, IconButton, Badge, AppBar, Toolbar, Button } from '@mui/material';
import { ShoppingCart, MenuBook } from '@mui/icons-material';
import { useNavigate, useLocation } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import Cart from './Cart';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const { cart } = useCart();
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <Box sx={{ 
      height: '100vh',
      display: 'flex',
      flexDirection: 'column',
      overflow: 'hidden'
    }}>
      <AppBar position="static" color="default" elevation={1}>
        <Toolbar>
          <Button
            startIcon={<MenuBook />}
            onClick={() => navigate('/')}
            color={location.pathname === '/' ? 'primary' : 'inherit'}
          >
            Menu
          </Button>
          <Button
            startIcon={<ShoppingCart />}
            onClick={() => navigate('/my-orders')}
            color={location.pathname === '/my-orders' ? 'primary' : 'inherit'}
            sx={{ ml: 2 }}
          >
            My Orders
          </Button>
          <Box sx={{ flexGrow: 1 }} />
          <IconButton
            color="primary"
            onClick={() => setIsCartOpen(true)}
            sx={{
              bgcolor: 'white',
              boxShadow: 3,
              '&:hover': {
                bgcolor: 'white',
              },
            }}
          >
            <Badge badgeContent={cart.length} color="primary">
              <ShoppingCart />
            </Badge>
          </IconButton>
        </Toolbar>
      </AppBar>

      <Box sx={{ flex: 1, overflow: 'hidden' }}>
        {children}
      </Box>

      <Cart open={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </Box>
  );
};

export default Layout; 