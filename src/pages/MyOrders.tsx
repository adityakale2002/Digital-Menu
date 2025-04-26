import React, { useState } from 'react';
import { Box, Typography, Container, Paper } from '@mui/material';
import { OrderTracking } from '../components/OrderTracking';
import { useCart } from '../context/CartContext';

const MyOrders: React.FC = () => {
  const { activeOrders, updateOrder } = useCart();

  const handleEditOrder = (orderId: string, updatedOrder: any) => {
    updateOrder(orderId, updatedOrder);
  };

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        My Orders
      </Typography>
      
      {activeOrders.length === 0 ? (
        <Paper sx={{ p: 3, textAlign: 'center' }}>
          <Typography variant="body1" color="text.secondary">
            You don't have any active orders.
          </Typography>
        </Paper>
      ) : (
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          {activeOrders.map((order) => (
            <OrderTracking
              key={order.id}
              order={order}
              onEdit={(updatedOrder) => handleEditOrder(order.id, updatedOrder)}
              onCancel={() => {}}
            />
          ))}
        </Box>
      )}
    </Container>
  );
};

export default MyOrders; 