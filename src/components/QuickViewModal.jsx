import { useApp } from '../context/AppContext';
import { renderStars, formatPrice } from '../utils/helpers';

const QuickViewModal = ({ item, onClose }) => {
  const { favorites, toggleFavorite, addToCart } = useApp();
  const isFavorite = favorites.includes(item.id);
  const { fullStars, hasHalfStar, emptyStars } = renderStars(item.rating || 0);

  if (!item) return null;

  const handleAddToCart = () => {
    addToCart(item.id);
    onClose();
  };

  return (
    <div
      className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[3000] flex items-center justify-center p-8 animate-fadeIn"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-3xl max-w-4xl w-full max-h-[90vh] overflow-y-auto relative shadow-2xl animate-slideInUp"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 bg-gray-100 border-none w-10 h-10 rounded-full text-2xl cursor-pointer z-10 transition-all duration-300 flex items-center justify-center hover:bg-orange-500 hover:text-white hover:rotate-90"
        >
          &times;
        </button>
        <div className="flex flex-col md:flex-row gap-8">
          <div className="flex-1 min-h-[300px] rounded-2xl overflow-hidden bg-gray-100">
            <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
          </div>
          <div className="flex-1 p-8">
            <button
              onClick={() => toggleFavorite(item.id)}
              className={`absolute top-4 right-4 bg-white/95 border-none w-10 h-10 rounded-full cursor-pointer text-xl z-10 flex items-center justify-center transition-all duration-300 shadow-md backdrop-blur-md hover:scale-115 ${
                isFavorite ? 'animate-pulse' : ''
              }`}
            >
              {isFavorite ? '❤️' : '🤍'}
            </button>
            <span className="inline-block bg-gradient-to-r from-orange-500/10 to-orange-400/10 text-orange-500 px-3.5 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wider mb-3">
              {item.category}
            </span>
            <h2 className="text-3xl font-extrabold mb-4 text-gray-900">{item.name}</h2>
            {item.rating && (
              <div className="flex items-center gap-2 mb-4">
                {Array.from({ length: fullStars }).map((_, i) => (
                  <span key={i} className="text-yellow-400 text-lg">★</span>
                ))}
                {hasHalfStar && <span className="text-yellow-400 text-lg">★</span>}
                {Array.from({ length: emptyStars }).map((_, i) => (
                  <span key={i} className="text-gray-300 text-lg">★</span>
                ))}
                <span className="font-bold text-gray-900 text-sm">{item.rating}</span>
                <span className="text-gray-500 text-xs">({item.reviews || 0} reviews)</span>
              </div>
            )}
            {item.deliveryTime && (
              <p className="text-gray-600 mb-4">⏱️ Est. Delivery: {item.deliveryTime}</p>
            )}
            <p className="text-lg leading-relaxed text-gray-500 my-6">{item.description}</p>
            <div className="flex items-center gap-4 my-6">
              <span className="text-3xl font-black bg-gradient-to-r from-orange-500 to-orange-400 bg-clip-text text-transparent">
                {formatPrice(item.price)}
              </span>
              {item.popularity && (
                <span className="bg-gradient-to-r from-orange-500 to-orange-400 text-white px-4 py-1.5 rounded-full text-sm font-bold">
                  🔥 {item.popularity}% Popular
                </span>
              )}
            </div>
            <button
              onClick={handleAddToCart}
              className="w-full bg-gradient-to-r from-orange-500 to-orange-400 text-white border-none py-5 rounded-xl text-xl font-bold cursor-pointer transition-all duration-300 shadow-lg mt-4 hover:-translate-y-1 hover:shadow-2xl"
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuickViewModal;

