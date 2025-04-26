import React, { createContext, useContext, useState, ReactNode } from 'react';
import { MenuItem } from '../types/menu';

interface CartItem {
  item: MenuItem;
  quantity: number;
  cookingPreferences: string[];
}

interface ActiveOrder extends CartItem {
  id: string;
  timestamp: number;
  status: 'pending' | 'preparing' | 'ready';
}

interface CartContextType {
  cart: CartItem[];
  activeOrders: ActiveOrder[];
  addToCart: (item: MenuItem, quantity: number, cookingPreferences: string[]) => void;
  removeFromCart: (itemId: string) => void;
  clearCart: () => void;
  placeOrder: () => void;
  updateOrder: (orderId: string, updatedOrder: Partial<ActiveOrder>) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [activeOrders, setActiveOrders] = useState<ActiveOrder[]>([]);

  const addToCart = (item: MenuItem, quantity: number, cookingPreferences: string[]) => {
    setCart((prevCart) => [...prevCart, { item, quantity, cookingPreferences }]);
  };

  const removeFromCart = (itemId: string) => {
    setCart((prevCart) => prevCart.filter((item) => item.item.id !== itemId));
  };

  const clearCart = () => {
    setCart([]);
  };

  const placeOrder = () => {
    const newOrders: ActiveOrder[] = cart.map((item) => ({
      ...item,
      id: Math.random().toString(36).substr(2, 9),
      timestamp: Date.now(),
      status: 'pending' as const,
    }));

    setActiveOrders((prevOrders) => [...prevOrders, ...newOrders]);
    clearCart();
  };

  const updateOrder = (orderId: string, updatedOrder: Partial<ActiveOrder>) => {
    setActiveOrders((prevOrders) =>
      prevOrders.map((order) =>
        order.id === orderId ? { ...order, ...updatedOrder } : order
      )
    );
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        activeOrders,
        addToCart,
        removeFromCart,
        clearCart,
        placeOrder,
        updateOrder,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}; 