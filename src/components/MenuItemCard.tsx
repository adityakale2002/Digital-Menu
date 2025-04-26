import React, { useState } from 'react';
import {
  Card,
  CardContent,
  Typography,
  Button,
  Box,
  Grid,
  MobileStepper,
  IconButton,
  CardMedia,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  Divider,
  Checkbox,
  FormControlLabel,
  Chip,
} from '@mui/material';
import { 
  KeyboardArrowLeft, 
  KeyboardArrowRight,
  Add as AddIcon,
  Remove as RemoveIcon,
  LocalFireDepartment,
  Cookie,
  Spa,
} from '@mui/icons-material';
import SwipeableViews from 'react-swipeable-views';
import { MenuItem } from '../types/menu';
import { useCart } from '../context/CartContext';

interface MenuItemCardProps {
  item: MenuItem;
}

interface CookingPreference {
  id: string;
  name: string;
  included: boolean;
  quantity: number;
  unit: string;
}

// Container component for horizontal scrolling
export const MenuItemsContainer: React.FC<{ items: MenuItem[] }> = ({ items }) => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'row',
        overflowX: 'auto',
        whiteSpace: 'nowrap',
        minWidth: '100%',
        py: 2,
        px: 3,
        gap: '16px',
        '&::-webkit-scrollbar': {
          height: '8px',
        },
        '&::-webkit-scrollbar-track': {
          background: '#f1f1f1',
          borderRadius: '4px',
        },
        '&::-webkit-scrollbar-thumb': {
          background: '#888',
          borderRadius: '4px',
          '&:hover': {
            background: '#555',
          },
        },
      }}
    >
      {items.map((item) => (
        <Box
          key={item.id}
          sx={{
            flex: '0 0 300px',
            width: '300px',
            minWidth: '300px',
            maxWidth: '300px',
          }}
        >
          <MenuItemCard item={item} />
        </Box>
      ))}
    </Box>
  );
};

export const MenuItemCard: React.FC<MenuItemCardProps> = ({ item }) => {
  const [activeStep, setActiveStep] = useState(0);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [cookingPreferences, setCookingPreferences] = useState<CookingPreference[]>([
    { id: 'onion', name: 'Onions', included: true, quantity: 1, unit: 'portion' },
    { id: 'capsicum', name: 'Capsicum', included: true, quantity: 1, unit: 'portion' },
    { id: 'spicy', name: 'Spice Level', included: true, quantity: 2, unit: 'level' },
    { id: 'garlic', name: 'Garlic', included: true, quantity: 1, unit: 'portion' },
  ]);
  
  const maxSteps = item.images.length;
  const { addToCart } = useCart();

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleStepChange = (step: number) => {
    setActiveStep(step);
  };

  const handleOpenDialog = () => {
    setDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
    // Reset quantities when closing
    setQuantity(1);
    setCookingPreferences(prev => prev.map(pref => ({ ...pref, included: true, quantity: 1 })));
  };

  const handleAddToCart = () => {
    // Create cooking instructions string from preferences
    const instructions = cookingPreferences
      .map(pref => {
        if (!pref.included) return `No ${pref.name}`;
        if (pref.quantity !== 1) return `${pref.quantity}x ${pref.name}`;
        return null;
      })
      .filter(Boolean)
      .join(', ');
    
    addToCart(item, quantity, [], instructions);
    handleCloseDialog();
  };

  const handleQuantityChange = (change: number) => {
    setQuantity(prev => Math.max(1, prev + change));
  };

  const handlePreferenceChange = (prefId: string) => {
    setCookingPreferences(prev =>
      prev.map(pref =>
        pref.id === prefId
          ? { ...pref, included: !pref.included }
          : pref
      )
    );
  };

  const handlePreferenceQuantityChange = (prefId: string, change: number) => {
    setCookingPreferences(prev =>
      prev.map(pref =>
        pref.id === prefId
          ? { 
              ...pref, 
              quantity: Math.max(0, pref.quantity + change),
              included: Math.max(0, pref.quantity + change) > 0
            }
          : pref
      )
    );
  };

  return (
    <>
      <Card 
        sx={{ 
          display: 'flex',
          flexDirection: 'column',
          width: '100%',
          height: '100%',
          position: 'relative',
          '&:hover': {
            transform: 'translateY(-4px)',
            transition: 'transform 0.2s ease-in-out',
            boxShadow: 3,
          },
        }}
      >
        <Box sx={{ position: 'relative', height: { xs: '200px', sm: '250px' }, flexShrink: 0 }}>
          <SwipeableViews
            axis="x"
            index={activeStep}
            onChangeIndex={handleStepChange}
            enableMouseEvents
          >
            {item.images.map((image, index) => (
              <div key={index}>
                {Math.abs(activeStep - index) <= 2 ? (
                  <CardMedia
                    component="img"
                    height={window.innerWidth < 600 ? 200 : 250}
                    image={image}
                    alt={`${item.name} ${index + 1}`}
                    sx={{ objectFit: 'cover' }}
                  />
                ) : null}
              </div>
            ))}
          </SwipeableViews>
          <MobileStepper
            steps={maxSteps}
            position="static"
            activeStep={activeStep}
            sx={{
              position: 'absolute',
              bottom: 0,
              width: '100%',
              background: 'rgba(0, 0, 0, 0.3)',
            }}
            nextButton={
              <IconButton
                size="small"
                onClick={handleNext}
                disabled={activeStep === maxSteps - 1}
                sx={{ color: 'white' }}
              >
                <KeyboardArrowRight />
              </IconButton>
            }
            backButton={
              <IconButton
                size="small"
                onClick={handleBack}
                disabled={activeStep === 0}
                sx={{ color: 'white' }}
              >
                <KeyboardArrowLeft />
              </IconButton>
            }
          />
        </Box>

        <CardContent sx={{ 
          flex: '1 0 auto', 
          p: { xs: 1, sm: 2 },
          display: 'flex',
          flexDirection: 'column',
          overflow: 'auto',
        }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 1 }}>
            <Typography variant="h6" sx={{ fontSize: { xs: '1rem', sm: '1.25rem' } }}>
              {item.name}
            </Typography>
            <Typography variant="h6" color="primary.main" sx={{ fontWeight: 'bold', fontSize: { xs: '1rem', sm: '1.25rem' } }}>
              {item.currency} {item.price}
            </Typography>
          </Box>
          
          <Box sx={{ display: 'flex', gap: 0.5, mb: 1, flexWrap: 'wrap' }}>
            {item.isSpicy && (
              <Chip
                icon={<LocalFireDepartment sx={{ color: '#ff4d4d' }} />}
                label="Spicy"
                size="small"
                variant="outlined"
              />
            )}
            {item.tasteIndicators.map((taste) => (
              <Chip
                key={taste}
                icon={taste === 'sweet' ? <Cookie /> : <Spa />}
                label={taste}
                size="small"
                variant="outlined"
                sx={{
                  '& .MuiChip-icon': {
                    color: taste === 'sweet' ? '#ff9900' : '#2A9D8F',
                  },
                }}
              />
            ))}
          </Box>

          <Typography variant="body2" color="text.secondary" sx={{ mb: 1, fontSize: { xs: '0.75rem', sm: '0.875rem' } }}>
            {item.description}
          </Typography>

          <Box sx={{ mb: 1 }}>
            <Typography variant="subtitle2" sx={{ mb: 0.5, fontSize: { xs: '0.75rem', sm: '0.875rem' } }}>
              Recipe:
            </Typography>
            <Grid container spacing={1}>
              {item.recipe.map((ingredient, index) => (
                <Grid item xs={6} key={index}>
                  <Typography variant="body2" sx={{ fontSize: { xs: '0.7rem', sm: '0.85rem' } }}>
                    • {ingredient}
                  </Typography>
                </Grid>
              ))}
            </Grid>
          </Box>

          <Typography variant="body2" sx={{ mb: 1, fontSize: { xs: '0.7rem', sm: '0.85rem' } }}>
            {item.servesCount}
          </Typography>

          <Grid container spacing={1} sx={{ mb: 1 }}>
            <Grid item xs={4}>
              <Typography variant="body2" sx={{ fontSize: { xs: '0.7rem', sm: '0.85rem' } }}>
                Protein: {item.nutritionalInfo.proteins}g
              </Typography>
            </Grid>
            <Grid item xs={4}>
              <Typography variant="body2" sx={{ fontSize: { xs: '0.7rem', sm: '0.85rem' } }}>
                Carbs: {item.nutritionalInfo.carbs}g
              </Typography>
            </Grid>
            <Grid item xs={4}>
              <Typography variant="body2" sx={{ fontSize: { xs: '0.7rem', sm: '0.85rem' } }}>
                Kcal: {item.nutritionalInfo.calories}
              </Typography>
            </Grid>
          </Grid>

          <Box sx={{ mt: 'auto', pt: { xs: 1, sm: 2 }, position: 'sticky', bottom: 0, background: 'white', zIndex: 1 }}>
            <Button 
              variant="contained" 
              onClick={handleOpenDialog}
              fullWidth
              sx={{ 
                py: { xs: 1, sm: 1.5 },
                fontSize: { xs: '0.875rem', sm: '1rem' },
                bgcolor: 'primary.main',
                '&:hover': {
                  bgcolor: 'primary.dark',
                },
              }}
            >
              Add to Cart
            </Button>
          </Box>
        </CardContent>
      </Card>

      <Dialog
        open={dialogOpen}
        onClose={handleCloseDialog}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle sx={{ bgcolor: 'primary.main', color: 'white' }}>
          Customize Your Order
        </DialogTitle>
        <DialogContent dividers>
          <List>
            <ListItem>
              <ListItemText 
                primary={item.name}
                secondary="Quantity"
              />
              <ListItemSecondaryAction>
                <IconButton 
                  edge="end" 
                  onClick={() => handleQuantityChange(-1)}
                  disabled={quantity <= 1}
                >
                  <RemoveIcon />
                </IconButton>
                <Typography component="span" sx={{ mx: 2 }}>
                  {quantity}
                </Typography>
                <IconButton 
                  edge="end" 
                  onClick={() => handleQuantityChange(1)}
                >
                  <AddIcon />
                </IconButton>
              </ListItemSecondaryAction>
            </ListItem>
            
            <Divider sx={{ my: 2 }} />
            
            <Typography variant="subtitle1" sx={{ mb: 1 }}>
              Cooking Instructions
            </Typography>
            
            {cookingPreferences.map((pref) => (
              <ListItem 
                key={pref.id}
                sx={{
                  display: 'flex',
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  py: 2
                }}
              >
                <ListItemText 
                  primary={pref.name}
                  secondary={`${pref.quantity}x ${pref.unit}`}
                />
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <IconButton
                    size="small"
                    onClick={() => handlePreferenceQuantityChange(pref.id, -1)}
                    disabled={pref.quantity === 0}
                  >
                    <RemoveIcon />
                  </IconButton>
                  <Typography sx={{ minWidth: '30px', textAlign: 'center' }}>
                    {pref.quantity}
                  </Typography>
                  <IconButton
                    size="small"
                    onClick={() => handlePreferenceQuantityChange(pref.id, 1)}
                    disabled={pref.quantity >= 5}
                  >
                    <AddIcon />
                  </IconButton>
                </Box>
              </ListItem>
            ))}
          </List>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button 
            variant="contained"
            onClick={handleAddToCart}
            sx={{ bgcolor: 'primary.main' }}
          >
            Done
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}; 