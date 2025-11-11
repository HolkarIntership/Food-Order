import { Link } from 'react-router-dom';
import { useApp } from '../context/AppContext';

const Header = ({ onCartClick }) => {
  const { getCartItemCount } = useApp();
  const cartCount = getCartItemCount();

  return (
    <header className="fixed top-5 left-1/2 transform -translate-x-1/2 w-[95%] max-w-[1400px] bg-white/95 backdrop-blur-xl text-gray-800 px-8 py-3 rounded-full shadow-2xl border border-white/20 z-50 transition-all duration-300 hover:shadow-3xl hover:-translate-y-0.5">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold bg-gradient-to-r from-orange-500 to-orange-400 bg-clip-text text-transparent flex items-center gap-2">
          <i className='bx bx-restaurant text-3xl'></i>
          Foodie Delight
        </Link>
        <nav className="flex gap-4 items-center">
          <Link to="/orders" className="text-gray-800 no-underline px-5 py-2 rounded-full font-semibold text-sm transition-all duration-300 inline-flex items-center gap-2 bg-orange-500/8 border border-orange-500/15 hover:bg-orange-500/15 hover:text-orange-500 hover:border-orange-500/30 hover:-translate-y-0.5">
            <i className='bx bx-list-ul text-lg'></i>
            Orders
          </Link>
          <button
            onClick={onCartClick}
            className="bg-gradient-to-r from-orange-500 to-orange-400 border-none text-white px-5 py-2 rounded-full cursor-pointer text-sm font-semibold transition-all duration-300 flex items-center gap-2 shadow-lg shadow-orange-500/30 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-orange-500/40"
          >
            <i className='bx bx-cart text-lg'></i>
            Cart
            <span className="bg-white/30 text-white rounded-full w-5 h-5 inline-flex items-center justify-center text-xs font-bold backdrop-blur-md">
              {cartCount}
            </span>
          </button>
        </nav>
      </div>
    </header>
  );
};

export default Header;

