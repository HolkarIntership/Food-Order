import { useApp } from '../context/AppContext';
import { renderStars, formatPrice } from '../utils/helpers';

const MenuItem = ({ item, onQuickView }) => {
  const { favorites, toggleFavorite, addToCart, addToRecentlyViewed } = useApp();
  const isFavorite = favorites.includes(item.id);
  const { fullStars, hasHalfStar, emptyStars } = renderStars(item.rating || 0);

  const handleQuickView = () => {
    addToRecentlyViewed(item.id);
    onQuickView(item);
  };

  return (
    <div className="bg-white rounded-2xl overflow-hidden shadow-lg transition-all duration-400 cursor-pointer flex flex-col border-none relative w-full max-w-full bg-gradient-to-br from-white to-gray-50 group">
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-orange-500 to-orange-400 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left z-10"></div>
      <button
        onClick={(e) => {
          e.stopPropagation();
          toggleFavorite(item.id);
        }}
        className={`absolute top-4 right-4 bg-white/95 border-none w-10 h-10 rounded-full cursor-pointer text-xl z-10 flex items-center justify-center transition-all duration-300 shadow-md backdrop-blur-md hover:scale-115 hover:shadow-lg ${
          isFavorite ? 'animate-pulse' : ''
        }`}
        title={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
      >
        {isFavorite ? '❤️' : '🤍'}
      </button>
      <div
        className="w-full h-[220px] bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center transition-all duration-500 relative overflow-hidden cursor-pointer"
        onClick={handleQuickView}
      >
        <img
          src={item.image}
          alt={item.name}
          className="w-full h-full object-cover transition-transform duration-600 block bg-gradient-to-br from-gray-100 to-gray-200 group-hover:scale-125 group-hover:rotate-2"
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = 'data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' width=\'400\' height=\'300\'%3E%3Crect fill=\'%23f0f0f0\' width=\'400\' height=\'300\'/%3E%3Ctext fill=\'%23999\' font-family=\'sans-serif\' font-size=\'18\' x=\'50%25\' y=\'50%25\' text-anchor=\'middle\' dy=\'.3em\'%3EImage not available%3C/text%3E%3C/svg%3E';
          }}
        />
        <button
          onClick={(e) => {
            e.stopPropagation();
            handleQuickView();
          }}
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white/95 border-none px-6 py-3 rounded-full font-bold cursor-pointer opacity-0 transition-all duration-300 z-10 text-sm shadow-lg group-hover:opacity-100 hover:bg-white hover:scale-105"
        >
          View More
        </button>
        {item.deliveryTime && (
          <span className="absolute bottom-4 left-4 bg-black/70 text-white px-3 py-1.5 rounded-full text-xs font-semibold backdrop-blur-md z-10">
            ⏱️ {item.deliveryTime}
          </span>
        )}
      </div>
      <div className="p-5 flex-grow flex flex-col min-h-0 overflow-hidden relative z-10">
        <span className="inline-block bg-gradient-to-r from-orange-500/10 to-orange-400/10 text-orange-500 px-3.5 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wider mb-3 w-fit border border-orange-500/20 transition-all duration-300 group-hover:bg-gradient-to-r group-hover:from-orange-500 group-hover:to-orange-400 group-hover:text-white group-hover:border-transparent group-hover:-translate-y-0.5">
          {item.category}
        </span>
        <h3
          className="text-xl font-extrabold mb-2 text-gray-900 tracking-tight leading-tight transition-colors duration-300 cursor-pointer group-hover:text-orange-500"
          onClick={handleQuickView}
        >
          {item.name}
        </h3>
        {item.rating && (
          <div className="flex items-center gap-2 mb-3">
            {Array.from({ length: fullStars }).map((_, i) => (
              <span key={i} className="text-yellow-400 text-lg">★</span>
            ))}
            {hasHalfStar && <span className="text-yellow-400 text-lg">★</span>}
            {Array.from({ length: emptyStars }).map((_, i) => (
              <span key={i} className="text-gray-300 text-lg">★</span>
            ))}
            <span className="font-bold text-gray-900 text-sm">{item.rating}</span>
            <span className="text-gray-500 text-xs">({item.reviews || 0})</span>
          </div>
        )}
        <p className="text-gray-500 text-sm mb-4 flex-grow leading-relaxed">{item.description}</p>
        <div className="flex justify-between items-center mt-auto pt-4 border-t-2 border-gray-200 gap-3 flex-wrap min-w-0 relative">
          <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-orange-500 to-orange-400 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-400 origin-left"></div>
          <span className="text-2xl font-black bg-gradient-to-r from-orange-500 to-orange-400 bg-clip-text text-transparent tracking-tight whitespace-nowrap flex-shrink-0 relative">
            {formatPrice(item.price)}
          </span>
          <button
            onClick={(e) => {
              e.stopPropagation();
              addToCart(item.id);
            }}
            className="bg-gradient-to-r from-orange-500 to-orange-400 text-white border-none px-5 py-2.5 rounded-lg cursor-pointer text-sm font-bold transition-all duration-300 shadow-lg shadow-orange-500/40 relative overflow-hidden inline-flex items-center justify-center gap-1.5 tracking-wide whitespace-nowrap flex-shrink-1 min-h-[40px] max-w-full hover:-translate-y-1 hover:shadow-xl hover:shadow-orange-500/50 hover:bg-gradient-to-r hover:from-orange-400 hover:to-orange-300"
          >
            <span className="relative z-10">Add to Cart</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default MenuItem;

