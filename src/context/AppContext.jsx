import { createContext, useContext, useState, useEffect } from 'react';
import { menuItems, promoCodes } from '../data/menuItems';

const AppContext = createContext();

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within AppProvider');
  }
  return context;
};

export const AppProvider = ({ children }) => {
  const [cart, setCart] = useState(() => {
    const saved = localStorage.getItem('cart');
    return saved ? JSON.parse(saved) : [];
  });

  const [favorites, setFavorites] = useState(() => {
    const saved = localStorage.getItem('favorites');
    return saved ? JSON.parse(saved) : [];
  });

  const [recentlyViewed, setRecentlyViewed] = useState(() => {
    const saved = localStorage.getItem('recentlyViewed');
    return saved ? JSON.parse(saved) : [];
  });

  const [orders, setOrders] = useState(() => {
    const saved = localStorage.getItem('orders');
    return saved ? JSON.parse(saved) : [];
  });

  const [toast, setToast] = useState({ show: false, message: '', type: 'success' });

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  // Save favorites to localStorage
  useEffect(() => {
    localStorage.setItem('favorites', JSON.stringify(favorites));
  }, [favorites]);

  // Save recently viewed to localStorage
  useEffect(() => {
    localStorage.setItem('recentlyViewed', JSON.stringify(recentlyViewed));
  }, [recentlyViewed]);

  // Save orders to localStorage
  useEffect(() => {
    localStorage.setItem('orders', JSON.stringify(orders));
  }, [orders]);

  const addToCart = (itemId) => {
    const item = menuItems.find(i => i.id === itemId);
    if (!item) return;

    setCart(prevCart => {
      const existingItem = prevCart.find(c => c.id === itemId);
      if (existingItem) {
        return prevCart.map(c =>
          c.id === itemId ? { ...c, quantity: c.quantity + 1 } : c
        );
      } else {
        return [...prevCart, { ...item, quantity: 1 }];
      }
    });

    showToast('Item added to cart!', 'success');
  };

  const removeFromCart = (itemId) => {
    setCart(prevCart => prevCart.filter(item => item.id !== itemId));
    showToast('Item removed from cart', 'success');
  };

  const updateQuantity = (itemId, change) => {
    setCart(prevCart => {
      const item = prevCart.find(c => c.id === itemId);
      if (!item) return prevCart;

      const newQuantity = item.quantity + change;
      if (newQuantity <= 0) {
        return prevCart.filter(c => c.id !== itemId);
      }

      return prevCart.map(c =>
        c.id === itemId ? { ...c, quantity: newQuantity } : c
      );
    });
  };

  const toggleFavorite = (itemId) => {
    setFavorites(prev => {
      const isFavorite = prev.includes(itemId);
      if (isFavorite) {
        showToast('Removed from favorites', 'success');
        return prev.filter(id => id !== itemId);
      } else {
        showToast('Added to favorites', 'success');
        return [...prev, itemId];
      }
    });
  };

  const addToRecentlyViewed = (itemId) => {
    setRecentlyViewed(prev => {
      if (prev.includes(itemId)) {
        return prev.filter(id => id !== itemId);
      }
      const updated = [itemId, ...prev].slice(0, 10);
      return updated;
    });
  };

  const applyPromoCode = (code) => {
    const promo = promoCodes[code.toUpperCase()];
    if (!promo) {
      return { success: false, message: 'Invalid promo code' };
    }

    if (cart.length === 0) {
      return { success: false, message: 'Cart is empty' };
    }

    const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    let discount = 0;

    if (promo.type === 'percentage') {
      discount = (subtotal * promo.discount) / 100;
    } else {
      discount = promo.discount;
    }

    return { success: true, discount: Math.round(discount), code: code.toUpperCase() };
  };

  const addOrder = (orderData) => {
    const orderId = 'ORDER_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
    const newOrder = {
      ...orderData,
      orderId,
      timestamp: new Date().toISOString()
    };
    setOrders(prev => [...prev, newOrder]);
    setCart([]);
    return orderId;
  };

  const showToast = (message, type = 'success') => {
    setToast({ show: true, message, type });
    setTimeout(() => {
      setToast(prev => ({ ...prev, show: false }));
    }, 3000);
  };

  const getCartTotal = () => {
    return cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  };

  const getCartItemCount = () => {
    return cart.reduce((sum, item) => sum + item.quantity, 0);
  };

  const value = {
    cart,
    favorites,
    recentlyViewed,
    orders,
    toast,
    addToCart,
    removeFromCart,
    updateQuantity,
    toggleFavorite,
    addToRecentlyViewed,
    applyPromoCode,
    addOrder,
    showToast,
    getCartTotal,
    getCartItemCount,
    menuItems
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

