import React, { useState } from 'react';
import { Box, Grid, useTheme, Tabs, Tab, IconButton } from '@mui/material';
import { motion, AnimatePresence, PanInfo } from 'framer-motion';
import { MenuItem } from '../types/menu';
import { MenuItemCard } from './MenuItemCard';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';

interface SwipeableMenuProps {
  items: MenuItem[];
}

const ITEMS_PER_PAGE = 8;

export const SwipeableMenu: React.FC<SwipeableMenuProps> = ({ items }) => {
  const theme = useTheme();
  const [currentPage, setCurrentPage] = useState(0);
  const [direction, setDirection] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState('All');
  
  const categories = ['All', ...new Set(items.map(item => item.category))];
  const filteredItems = items.filter(item => 
    selectedCategory === 'All' || item.category === selectedCategory
  );

  const totalPages = Math.ceil(filteredItems.length / ITEMS_PER_PAGE);
  
  const handlePageChange = (newPage: number) => {
    if (newPage >= 0 && newPage < totalPages) {
      setDirection(newPage > currentPage ? 1 : -1);
      setCurrentPage(newPage);
    }
  };

  const handleDragEnd = (_: any, info: PanInfo) => {
    const swipeThreshold = 50;
    if (Math.abs(info.offset.x) > swipeThreshold) {
      if (info.offset.x > 0 && currentPage > 0) {
        handlePageChange(currentPage - 1);
      } else if (info.offset.x < 0 && currentPage < totalPages - 1) {
        handlePageChange(currentPage + 1);
      }
    }
  };

  const pageVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 1000 : -1000,
      rotateY: direction > 0 ? 60 : -60,
      scale: 0.8,
      opacity: 0
    }),
    center: {
      x: 0,
      rotateY: 0,
      scale: 1,
      opacity: 1
    },
    exit: (direction: number) => ({
      x: direction < 0 ? 1000 : -1000,
      rotateY: direction < 0 ? 60 : -60,
      scale: 0.8,
      opacity: 0
    })
  };

  const pageTransition = {
    type: "spring",
    stiffness: 300,
    damping: 30
  };

  const getCurrentPageItems = () => {
    const startIndex = currentPage * ITEMS_PER_PAGE;
    return filteredItems.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  };

  return (
    <Box
      sx={{
        width: '100%',
        height: 'calc(100vh - 64px)',
        overflow: 'hidden',
        bgcolor: theme.palette.background.default,
        perspective: '1000px',
        display: 'flex',
        flexDirection: 'column'
      }}
    >
      {/* Category Tabs */}
      <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 2, flexShrink: 0 }}>
        <Tabs
          value={selectedCategory}
          onChange={(e, newValue) => {
            setSelectedCategory(newValue);
            setCurrentPage(0);
          }}
          variant="scrollable"
          scrollButtons="auto"
          sx={{
            '& .MuiTab-root': {
              minWidth: 100,
              textTransform: 'none',
              fontWeight: 500,
            }
          }}
        >
          {categories.map((category) => (
            <Tab 
              key={category} 
              label={category} 
              value={category}
              sx={{
                color: selectedCategory === category ? 'primary.main' : 'text.secondary',
              }}
            />
          ))}
        </Tabs>
      </Box>

      <Box sx={{ 
        flex: 1, 
        position: 'relative', 
        overflow: 'hidden',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        {/* Left Navigation Button */}
        <IconButton
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 0}
          sx={{
            position: 'absolute',
            left: 10,
            zIndex: 1000,
            bgcolor: 'rgba(255, 255, 255, 0.8)',
            '&:hover': { bgcolor: 'rgba(255, 255, 255, 0.9)' }
          }}
        >
          <ChevronLeftIcon />
        </IconButton>

        <Box sx={{
          width: '100%',
          height: '100%',
          position: 'relative',
          overflow: 'hidden'
        }}>
          <AnimatePresence initial={false} custom={direction} mode="wait">
            <motion.div
              key={currentPage}
              custom={direction}
              variants={pageVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={pageTransition}
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.2}
              onDragEnd={handleDragEnd}
              style={{
                width: '100%',
                height: '100%',
                position: 'absolute',
                transformStyle: 'preserve-3d',
                backfaceVisibility: 'hidden'
              }}
            >
              <Grid
                container
                spacing={1}
                sx={{
                  p: 1,
                  height: '100%',
                  alignItems: 'center',
                  justifyContent: 'center',
                  overflow: 'hidden'
                }}
              >
                {getCurrentPageItems().map((item) => (
                  <Grid item xs={6} sm={4} md={3} key={item.id}>
                    <Box sx={{ 
                      transform: 'scale(0.95)',
                      height: '100%',
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'center'
                    }}>
                      <MenuItemCard item={item} />
                    </Box>
                  </Grid>
                ))}
              </Grid>
            </motion.div>
          </AnimatePresence>
        </Box>

        {/* Right Navigation Button */}
        <IconButton
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages - 1}
          sx={{
            position: 'absolute',
            right: 10,
            zIndex: 1000,
            bgcolor: 'rgba(255, 255, 255, 0.8)',
            '&:hover': { bgcolor: 'rgba(255, 255, 255, 0.9)' }
          }}
        >
          <ChevronRightIcon />
        </IconButton>
      </Box>

      {/* Page indicators */}
      <Box
        sx={{
          position: 'fixed',
          bottom: 20,
          left: '50%',
          transform: 'translateX(-50%)',
          display: 'flex',
          gap: 1,
          zIndex: 1000
        }}
      >
        {Array.from({ length: totalPages }).map((_, index) => (
          <Box
            key={index}
            sx={{
              width: 8,
              height: 8,
              borderRadius: '50%',
              bgcolor: currentPage === index ? 'primary.main' : 'grey.300',
              transition: 'background-color 0.3s'
            }}
          />
        ))}
      </Box>
    </Box>
  );
}; 