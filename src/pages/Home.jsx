import { useState, useMemo } from 'react';
import { useApp } from '../context/AppContext';
import { sortMenuItems, renderStars, formatPrice } from '../utils/helpers';
import MenuItem from '../components/MenuItem';
import QuickViewModal from '../components/QuickViewModal';

const Home = ({ onCartClick }) => {
  const { menuItems, recentlyViewed } = useApp();
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(1600);
  const [sortBy, setSortBy] = useState('');
  const [quickViewItem, setQuickViewItem] = useState(null);

  const categories = ['all', 'pizza', 'burgers', 'drinks', 'desserts'];

  const filteredMenu = useMemo(() => {
    let filtered = [...menuItems];

    // Category filter
    if (activeCategory !== 'all') {
      filtered = filtered.filter(item => item.category === activeCategory);
    }

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(item =>
        item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.category.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Price range filter
    filtered = filtered.filter(item => item.price >= minPrice && item.price <= maxPrice);

    // Sort
    if (sortBy) {
      filtered = sortMenuItems(filtered, sortBy);
    }

    return filtered;
  }, [menuItems, activeCategory, searchTerm, minPrice, maxPrice, sortBy]);

  const recentlyViewedItems = useMemo(() => {
    return recentlyViewed
      .slice(0, 4)
      .map(id => menuItems.find(item => item.id === id))
      .filter(Boolean);
  }, [recentlyViewed, menuItems]);

  const scrollToMenu = () => {
    document.getElementById('menuSection')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Hero Section */}
      <section className="pt-32 pb-16 px-5 relative overflow-hidden">
        <div className="container mx-auto max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center relative z-10">
            <div className="text-center lg:text-left">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold mb-6 text-gray-900 leading-tight tracking-tight">
                Delicious Food <span className="bg-gradient-to-r from-orange-500 to-orange-400 bg-clip-text text-transparent">Delivered</span> to Your Door
              </h1>
              <p className="text-lg md:text-xl text-gray-600 font-normal mb-8 leading-relaxed max-w-xl mx-auto lg:mx-0">
                Experience the best flavors in town. Order from our extensive menu and get fresh, hot meals delivered within 30 minutes.
              </p>
              <div className="flex gap-4 justify-center lg:justify-start flex-wrap mb-12">
                <button
                  onClick={scrollToMenu}
                  className="px-8 py-4 rounded-full text-base font-semibold cursor-pointer transition-all duration-300 inline-flex items-center gap-2 border-none bg-gradient-to-r from-orange-500 to-orange-400 text-white shadow-lg shadow-orange-500/40 hover:-translate-y-1 hover:shadow-xl hover:shadow-orange-500/50"
                >
                  <i className='bx bx-restaurant text-xl'></i>
                  Order Now
                </button>
                <button
                  onClick={onCartClick}
                  className="px-8 py-4 rounded-full text-base font-semibold cursor-pointer transition-all duration-300 inline-flex items-center gap-2 border-2 border-orange-500 bg-white text-orange-500 hover:bg-orange-500 hover:text-white hover:-translate-y-1 hover:shadow-lg hover:shadow-orange-500/30"
                >
                  <i className='bx bx-cart text-xl'></i>
                  View Cart
                </button>
              </div>
              <div className="flex gap-8 justify-center lg:justify-start flex-wrap">
                <div className="text-center">
                  <div className="text-3xl font-extrabold bg-gradient-to-r from-orange-500 to-orange-400 bg-clip-text text-transparent mb-1">
                    500+
                  </div>
                  <div className="text-sm text-gray-500 font-medium">Happy Customers</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-extrabold bg-gradient-to-r from-orange-500 to-orange-400 bg-clip-text text-transparent mb-1">
                    30min
                  </div>
                  <div className="text-sm text-gray-500 font-medium">Fast Delivery</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-extrabold bg-gradient-to-r from-orange-500 to-orange-400 bg-clip-text text-transparent mb-1">
                    4.8⭐
                  </div>
                  <div className="text-sm text-gray-500 font-medium">Average Rating</div>
                </div>
              </div>
            </div>
            <div className="relative">
              <div className="relative rounded-3xl overflow-hidden shadow-2xl bg-white p-4">
                <img
                  src="https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=600&h=600&fit=crop"
                  alt="Delicious Food"
                  className="w-full h-auto rounded-2xl block object-cover"
                />
                <div className="absolute top-[10%] right-[10%] bg-white px-5 py-3 rounded-full flex items-center gap-2 shadow-lg font-semibold text-sm text-gray-900 animate-bounce">
                  <i className='bx bx-star text-xl text-orange-500'></i>
                  <span>4.8 Rating</span>
                </div>
                <div className="absolute bottom-[20%] left-[10%] bg-white px-5 py-3 rounded-full flex items-center gap-2 shadow-lg font-semibold text-sm text-gray-900 animate-bounce" style={{ animationDelay: '1s' }}>
                  <i className='bx bx-time-five text-xl text-orange-500'></i>
                  <span>30 Min</span>
                </div>
                <div className="absolute top-1/2 right-[5%] bg-white px-5 py-3 rounded-full flex items-center gap-2 shadow-lg font-semibold text-sm text-gray-900 animate-bounce" style={{ animationDelay: '2s' }}>
                  <i className='bx bx-gift text-xl text-orange-500'></i>
                  <span>20% Off</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Filters Section */}
      <section className="mb-12 px-5">
        <div className="container mx-auto max-w-7xl">
          <div className="relative max-w-2xl mx-auto mb-8">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search menu items..."
              className="w-full py-4 px-7 pr-14 border-2 border-gray-200 rounded-full text-base font-normal transition-all duration-300 bg-white shadow-sm focus:outline-none focus:border-orange-500 focus:shadow-lg focus:shadow-orange-500/10 focus:-translate-y-0.5"
            />
            <span className="absolute right-5 top-1/2 transform -translate-y-1/2 text-xl pointer-events-none text-gray-400 flex items-center">
              <i className='bx bx-search'></i>
            </span>
          </div>
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex justify-center flex-wrap gap-4">
              {categories.map(category => (
                <button
                  key={category}
                  onClick={() => setActiveCategory(category)}
                  className={`px-7 py-3 border-2 rounded-full cursor-pointer text-sm font-semibold transition-all duration-300 shadow-sm relative overflow-hidden ${
                    activeCategory === category
                      ? 'bg-gradient-to-r from-orange-500 to-orange-400 text-white border-transparent shadow-md'
                      : 'border-gray-200 bg-white text-gray-800 hover:border-orange-500 hover:text-white hover:-translate-y-1 hover:shadow-md'
                  }`}
                >
                  <span className="relative z-10 capitalize">{category}</span>
                </button>
              ))}
            </div>
            <div className="flex flex-col md:flex-row gap-8 items-center w-full md:w-auto">
              <div className="flex flex-col gap-2 min-w-[200px] w-full md:w-auto">
                <label className="font-semibold text-sm text-gray-800">
                  Price Range: {formatPrice(minPrice)} - {formatPrice(maxPrice)}
                </label>
                <div className="flex gap-4 items-center">
                  <input
                    type="range"
                    min="0"
                    max="1600"
                    value={minPrice}
                    onChange={(e) => setMinPrice(Number(e.target.value))}
                    step="50"
                    className="flex-1 h-1.5 rounded bg-gray-200 outline-none appearance-none"
                  />
                  <input
                    type="range"
                    min="0"
                    max="1600"
                    value={maxPrice}
                    onChange={(e) => setMaxPrice(Number(e.target.value))}
                    step="50"
                    className="flex-1 h-1.5 rounded bg-gray-200 outline-none appearance-none"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Recently Viewed Section */}
      {recentlyViewedItems.length > 0 && (
        <section className="mb-12 px-5">
          <div className="container mx-auto max-w-7xl">
            <h3 className="text-3xl font-extrabold text-gray-900 mb-6 tracking-tight">Recently Viewed</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              {recentlyViewedItems.map(item => (
                <MenuItem key={item.id} item={item} onQuickView={setQuickViewItem} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* All Menu Items */}
      <section id="menuSection" className="mb-16 px-5">
        <div className="container mx-auto max-w-7xl">
          <h3 className="text-3xl font-extrabold text-gray-900 mb-6 tracking-tight">All Menu Items</h3>
          {filteredMenu.length === 0 ? (
            <div className="text-center py-16 col-span-full">
              <div className="text-6xl mb-4">🔍</div>
              <h3 className="mb-2 text-xl font-semibold">No items found</h3>
              <p className="text-gray-500">Try adjusting your filters or search terms</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-7">
              {filteredMenu.map(item => (
                <MenuItem key={item.id} item={item} onQuickView={setQuickViewItem} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Services Section */}
      <section className="py-12 mb-16 px-5">
        <div className="container mx-auto max-w-7xl">
          <h3 className="text-3xl font-extrabold text-gray-900 mb-8 text-center tracking-tight">Our Services</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mt-8">
            {[
              { icon: 'bx-package', title: 'Fast Delivery', desc: 'Get your order delivered within 30 minutes' },
              { icon: 'bx-credit-card', title: 'Secure Payment', desc: '100% secure and encrypted payment gateway' },
              { icon: 'bx-gift', title: 'Special Offers', desc: 'Daily deals and exclusive discounts' },
              { icon: 'bx-star', title: 'Quality Food', desc: 'Fresh ingredients and authentic recipes' }
            ].map((service, idx) => (
              <div
                key={idx}
                className="bg-white p-8 rounded-2xl text-center shadow-lg transition-all duration-400 border border-gray-200 relative overflow-hidden hover:-translate-y-2 hover:shadow-2xl hover:border-orange-500 group"
              >
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-orange-500 to-orange-400 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-400 origin-left"></div>
                <div className="text-5xl mb-4 inline-block transition-transform duration-400 text-orange-500 group-hover:scale-110 group-hover:rotate-6">
                  <i className={`bx ${service.icon} text-5xl`}></i>
                </div>
                <h4 className="text-xl font-bold mb-3 text-gray-900">{service.title}</h4>
                <p className="text-gray-500 text-sm leading-relaxed m-0">{service.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {quickViewItem && (
        <QuickViewModal item={quickViewItem} onClose={() => setQuickViewItem(null)} />
      )}
    </div>
  );
};

export default Home;

