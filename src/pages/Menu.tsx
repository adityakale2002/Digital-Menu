import React, { useRef } from 'react';
import { Box, Typography, IconButton, Chip } from '@mui/material';
import { ChevronLeft, ChevronRight } from '@mui/icons-material';
import { LocalFireDepartment, Cookie, Spa } from '@mui/icons-material';
import { MenuItemCard } from '../components/MenuItemCard';
import { MenuItem } from '../types/menu';
import HTMLFlipBook from 'react-pageflip';
import '../styles/pageFlip.css';


const menuItems: MenuItem[] = [
  {    
    id: '1',
    name: 'Margherita Pizza',
    description: 'Classic Italian pizza with fresh basil, mozzarella, and tomato sauce',
    price: 55,
    currency: 'AED',
    category: 'Pizza',
    cookingInstructions: ['Baked in wood-fired oven', 'Served hot and fresh'],
    addons: [],
    isVegetarian: true,
    isSpicy: false,
    tasteIndicators: ['mild', 'cheesy'],
    preparationTime: '15-20 mins',
    images: [
      'https://images.unsplash.com/photo-1604068549290-dea0e4a305ca',
      'https://images.unsplash.com/photo-1585238342024-78d387f4a707'
    ],
    recipe: ['Fresh Mozzarella', 'Basil Leaves', 'Tomato Sauce', 'Olive Oil'],
    servesCount: 'Serves 1-2 people',
    nutritionalInfo: {
      calories: 850,
      proteins: 35,
      carbs: 95,
      fats: 32,
    },
  },
  {
    id: '2',
    name: 'Paneer Tikka Masala',
    description: 'Grilled cottage cheese in rich, creamy tomato curry sauce',
    price: 48,
    currency: 'AED',
    category: 'Indian',
    cookingInstructions: ['Slow-cooked in clay oven', 'Simmered in rich gravy'],
    addons: [],
    isVegetarian: true,
    isSpicy: true,
    tasteIndicators: ['spicy', 'creamy'],
    preparationTime: '25-30 mins',
    images: [
      'https://images.unsplash.com/photo-1631452180519-c014fe946bc7',
      'https://images.unsplash.com/photo-1596797038530-2c107229654b'
    ],
    recipe: ['Paneer', 'Tomato Gravy', 'Cream', 'Indian Spices'],
    servesCount: 'Serves 2 people',
    nutritionalInfo: {
      calories: 550,
      proteins: 28,
      carbs: 35,
      fats: 28,
    },
  },
  {
    id: '3',
    name: 'Mediterranean Falafel Platter',
    description: 'Crispy chickpea falafels with hummus, tahini, and fresh pita',
    price: 42,
    currency: 'AED',
    category: 'Mediterranean',
    cookingInstructions: ['Freshly fried', 'Served with warm pita'],
    addons: [],
    isVegetarian: true,
    isSpicy: false,
    tasteIndicators: ['savory', 'herby'],
    preparationTime: '20-25 mins',
    images: [
      'https://images.unsplash.com/photo-1603360946369-dc9bb6258143?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1603360946369-dc9bb6258143?auto=format&fit=crop&w=800&q=80'
    ],
    recipe: ['Chickpeas', 'Fresh Herbs', 'Garlic', 'Mediterranean Spices'],
    servesCount: 'Serves 2 people',
    nutritionalInfo: {
      calories: 480,
      proteins: 22,
      carbs: 65,
      fats: 18,
    },
  },
  {
    id: '4',
    name: 'Thai Green Curry',
    description: 'Aromatic coconut curry with seasonal vegetables and tofu',
    price: 45,
    currency: 'AED',
    category: 'Thai',
    cookingInstructions: ['Fresh curry paste', 'Simmered to perfection'],
    addons: [],
    isVegetarian: true,
    isSpicy: true,
    tasteIndicators: ['spicy', 'coconutty'],
    preparationTime: '20-25 mins',
    images: [
      'https://images.unsplash.com/photo-1455619452474-d2be8b1e70cd',
      'https://images.unsplash.com/photo-1562565652-a0d8f0c59eb4'
    ],
    recipe: ['Coconut Milk', 'Thai Basil', 'Green Curry Paste', 'Tofu'],
    servesCount: 'Serves 2 people',
    nutritionalInfo: {
      calories: 420,
      proteins: 18,
      carbs: 45,
      fats: 22,
    },
  },
  {
    id: '5',
    name: 'Mushroom Risotto',
    description: 'Creamy Italian risotto with wild mushrooms and parmesan',
    price: 52,
    currency: 'AED',
    category: 'Italian',
    cookingInstructions: ['Slow-cooked', 'Made to order'],
    addons: [],
    isVegetarian: true,
    isSpicy: false,
    tasteIndicators: ['creamy', 'umami'],
    preparationTime: '25-30 mins',
    images: [
      'https://img.freepik.com/free-photo/creamy-mushroom-risotto-with-parmesan-cheese_2829-19744.jpg',
      'https://img.freepik.com/free-photo/creamy-mushroom-risotto-with-parmesan-cheese_2829-19744.jpg'
    ],
    recipe: ['Arborio Rice', 'Wild Mushrooms', 'Parmesan', 'White Wine'],
    servesCount: 'Serves 1-2 people',
    nutritionalInfo: {
      calories: 580,
      proteins: 15,
      carbs: 75,
      fats: 25,
    },
  },
  {
    id: '6',
    name: 'Buddha Bowl',
    description: 'Nutritious bowl with quinoa, roasted vegetables, and tahini dressing',
    price: 38,
    currency: 'AED',
    category: 'Healthy',
    cookingInstructions: ['Fresh ingredients', 'Assembled to order'],
    addons: [],
    isVegetarian: true,
    isSpicy: false,
    tasteIndicators: ['healthy', 'fresh'],
    preparationTime: '15-20 mins',
    images: [
      'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=800&q=80'
    ],
    recipe: ['Quinoa', 'Roasted Vegetables', 'Avocado', 'Tahini'],
    servesCount: 'Serves 1 person',
    nutritionalInfo: {
      calories: 450,
      proteins: 18,
      carbs: 65,
      fats: 22,
    },
  }
];

const Menu: React.FC = () => {
  const bookRef = useRef<any>(null);

  const handlePrev = () => {
    if (bookRef.current) {
      bookRef.current.pageFlip().flipPrev();
    }
  };

  const handleNext = () => {
    if (bookRef.current) {
      bookRef.current.pageFlip().flipNext();
    }
  };

  const handleFlip = (e: any) => {
    console.log('Current page: ' + e.data);
  };

  return (
    <Box sx={{ 
      width: '100%',
      minHeight: '100vh',
      py: { xs: 1, sm: 3 },
      position: 'relative',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      bgcolor: '#f5f5f5',
    }}>
      {/* Navigation Buttons */}
      <IconButton 
        sx={{ 
          position: 'fixed',
          left: { xs: 4, sm: 10 },
          top: '50%',
          transform: 'translateY(-50%)',
          zIndex: 2,
          bgcolor: 'white',
          boxShadow: 3,
          '&:hover': { bgcolor: 'white' },
          width: { xs: 32, sm: 40 },
          height: { xs: 32, sm: 40 },
        }}
        onClick={handlePrev}
      >
        <ChevronLeft />
      </IconButton>
      
      <IconButton 
        sx={{ 
          position: 'fixed',
          right: { xs: 4, sm: 10 },
          top: '50%',
          transform: 'translateY(-50%)',
          zIndex: 2,
          bgcolor: 'white',
          boxShadow: 3,
          '&:hover': { bgcolor: 'white' },
          width: { xs: 32, sm: 40 },
          height: { xs: 32, sm: 40 },
        }}
        onClick={handleNext}
      >
        <ChevronRight />
      </IconButton>

      {/* Page Flip Book */}
      <HTMLFlipBook
        width={window.innerWidth < 600 ? 350 : 900}
        height={window.innerWidth < 600 ? 500 : 700}
        size="stretch"
        minWidth={window.innerWidth < 600 ? 300 : 700}
        maxWidth={1000}
        minHeight={window.innerWidth < 600 ? 400 : 600}
        maxHeight={800}
        maxShadowOpacity={0.5}
        showCover={true}
        mobileScrollSupport={true}
        onFlip={handleFlip}
        className="demo-book"
        ref={bookRef}
        style={{ margin: '0 auto' }}
        startPage={0}
        drawShadow={true}
        flippingTime={1000}
        usePortrait={window.innerWidth < 600}
        startZIndex={0}
        autoSize={true}
        clickEventForward={true}
        useMouseEvents={true}
        swipeDistance={window.innerWidth < 600 ? 50 : 0}
        showPageCorners={true}
        disableFlipByClick={false}
      >
        {/* Cover Page */}
        <div className="page page-cover">
          <div className="page-cover-content">
            <Typography variant="h3" className="page-cover-title" sx={{ fontSize: { xs: '2rem', sm: '3rem' } }}>
              Digital Menu
            </Typography>
            <Typography variant="h6" className="page-cover-subtitle" sx={{ fontSize: { xs: '1rem', sm: '1.5rem' } }}>
              Discover our delicious vegetarian dishes
            </Typography>
          </div>
        </div>

        {/* Menu Items */}
        {menuItems.map((item, index) => (
          <div key={item.id} className="page">
            <div className="page-content">
              <Box
                sx={{
                  width: '100%',
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                }}
              >
                <MenuItemCard item={item} />
              </Box>
            </div>
          </div>
        ))}
      </HTMLFlipBook>
    </Box>
  );
};

export default Menu; 