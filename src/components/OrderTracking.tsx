import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  LinearProgress,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
  Chip,
} from '@mui/material';
import { Edit, Timer } from '@mui/icons-material';
import { MenuItem } from '../types/menu';

interface OrderTrackingProps {
  order: {
    item: MenuItem;
    quantity: number;
    cookingPreferences: string[];
    timestamp: number;
  };
  onEdit: (order: any) => void;
  onCancel: () => void;
}

export const OrderTracking: React.FC<OrderTrackingProps> = ({ order, onEdit, onCancel }) => {
  const [timeLeft, setTimeLeft] = useState(180); // 3 minutes in seconds
  const [progress, setProgress] = useState(0);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [canEdit, setCanEdit] = useState(true);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 0) {
          setCanEdit(false);
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    // Update progress based on time left
    setProgress(((180 - timeLeft) / 180) * 100);
  }, [timeLeft]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handleEdit = () => {
    setEditDialogOpen(true);
  };

  const handleCloseEdit = () => {
    setEditDialogOpen(false);
  };

  const handleSaveEdit = (editedOrder: any) => {
    onEdit(editedOrder);
    setEditDialogOpen(false);
  };

  return (
    <Box sx={{ 
      p: 2, 
      border: '1px solid #e0e0e0', 
      borderRadius: 2,
      mb: 2,
      position: 'relative'
    }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
        <Typography variant="h6">{order.item.name}</Typography>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Timer color="primary" />
          <Typography variant="body2" color="primary">
            {formatTime(timeLeft)}
          </Typography>
        </Box>
      </Box>

      <LinearProgress 
        variant="determinate" 
        value={progress} 
        sx={{ 
          height: 8,
          borderRadius: 4,
          mb: 2,
          '& .MuiLinearProgress-bar': {
            backgroundColor: progress < 50 ? '#4CAF50' : progress < 80 ? '#FFC107' : '#F44336'
          }
        }}
      />

      <Box sx={{ display: 'flex', gap: 1, mb: 2, flexWrap: 'wrap' }}>
        <Chip label={`Quantity: ${order.quantity}`} size="small" />
        {order.cookingPreferences.map((pref, index) => (
          <Chip key={index} label={pref} size="small" />
        ))}
      </Box>

      {canEdit && (
        <Button
          variant="outlined"
          startIcon={<Edit />}
          onClick={handleEdit}
          sx={{ mt: 1 }}
        >
          Edit Order
        </Button>
      )}

      <Dialog open={editDialogOpen} onClose={handleCloseEdit} maxWidth="sm" fullWidth>
        <DialogTitle>Edit Your Order</DialogTitle>
        <DialogContent>
          {/* Add your edit form components here */}
          <Typography>Edit functionality will be implemented here</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseEdit}>Cancel</Button>
          <Button onClick={() => handleSaveEdit(order)} variant="contained">
            Save Changes
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}; 