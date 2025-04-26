import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  Typography,
  Box,
  IconButton,
} from '@mui/material';
import { Add as AddIcon, Remove as RemoveIcon } from '@mui/icons-material';
import { useCart } from '../context/CartContext';

interface CartProps {
  open: boolean;
  onClose: () => void;
}

const Cart: React.FC<CartProps> = ({ open, onClose }) => {
  const { cart, removeFromCart, placeOrder } = useCart();

  const handlePlaceOrder = () => {
    placeOrder();
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>Your Cart</DialogTitle>
      <DialogContent>
        {cart.length === 0 ? (
          <Typography variant="body1" color="text.secondary" align="center">
            Your cart is empty
          </Typography>
        ) : (
          <List>
            {cart.map((item) => (
              <ListItem key={item.item.id} divider>
                <ListItemText
                  primary={item.item.name}
                  secondary={
                    <Box>
                      <Typography variant="body2" color="text.secondary">
                        {item.item.currency} {item.item.price} × {item.quantity}
                      </Typography>
                      {item.cookingPreferences.map((pref, index) => (
                        <Typography key={index} variant="body2" color="text.secondary">
                          {pref}
                        </Typography>
                      ))}
                    </Box>
                  }
                />
                <ListItemSecondaryAction>
                  <IconButton
                    edge="end"
                    onClick={() => removeFromCart(item.item.id)}
                    color="error"
                  >
                    <RemoveIcon />
                  </IconButton>
                </ListItemSecondaryAction>
              </ListItem>
            ))}
          </List>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Close</Button>
        {cart.length > 0 && (
          <Button onClick={handlePlaceOrder} variant="contained" color="primary">
            Place Order
          </Button>
        )}
      </DialogActions>
    </Dialog>
  );
};

export default Cart; 