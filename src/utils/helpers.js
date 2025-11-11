// Helper functions

export const renderStars = (rating) => {
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 >= 0.5;
  const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

  return { fullStars, hasHalfStar, emptyStars };
};

export const sortMenuItems = (items, sortBy) => {
  const sorted = [...items];
  switch (sortBy) {
    case 'price-low':
      return sorted.sort((a, b) => a.price - b.price);
    case 'price-high':
      return sorted.sort((a, b) => b.price - a.price);
    case 'name':
      return sorted.sort((a, b) => a.name.localeCompare(b.name));
    case 'rating':
      return sorted.sort((a, b) => (b.rating || 0) - (a.rating || 0));
    case 'popularity':
      return sorted.sort((a, b) => (b.popularity || 0) - (a.popularity || 0));
    default:
      return sorted;
  }
};

export const getEstimatedDeliveryTime = (items) => {
  const baseTime = 20;
  const itemTime = items.length * 3;
  return baseTime + itemTime;
};

export const formatPrice = (price) => {
  return `₹${price.toLocaleString('en-IN')}`;
};

export const getRecommendedItems = (currentItemId, menuItems, limit = 4) => {
  const currentItem = menuItems.find(i => i.id === currentItemId);
  if (!currentItem) return [];

  return menuItems
    .filter(item => item.id !== currentItemId && item.category === currentItem.category)
    .sort((a, b) => (b.popularity || 0) - (a.popularity || 0))
    .slice(0, limit);
};

