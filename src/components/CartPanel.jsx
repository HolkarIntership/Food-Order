import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { formatPrice } from '../utils/helpers';

const CartPanel = ({ isOpen, onClose }) => {
  const { cart, removeFromCart, updateQuantity, getCartTotal } = useApp();
  const navigate = useNavigate();
  const total = getCartTotal();

  const handleCheckout = () => {
    if (cart.length > 0) {
      onClose();
      navigate('/order');
    }
  };

  if (!isOpen) return null;

  return (
    <>
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[200] animate-fadeIn"
        onClick={onClose}
      ></div>
      <div className="fixed top-0 right-0 w-full max-w-[420px] h-full bg-white shadow-2xl z-[300] flex flex-col transition-all duration-400 translate-x-0">
        <div className="p-8 pb-6 border-b-2 border-gray-200 flex justify-between items-center bg-gradient-to-r from-orange-500 to-orange-400 text-white">
          <h2 className="text-white font-bold text-2xl">Your Cart</h2>
          <button
            onClick={onClose}
            className="bg-white/20 border-none text-4xl cursor-pointer text-white transition-all duration-300 w-10 h-10 rounded-full flex items-center justify-center leading-none hover:bg-white/30 hover:rotate-90"
          >
            &times;
          </button>
        </div>

        <div className="flex-grow overflow-y-auto p-6 bg-gray-50">
          {cart.length === 0 ? (
            <p className="text-center text-gray-500 py-16 text-lg">Your cart is empty</p>
          ) : (
            cart.map(item => (
              <div
                key={item.id}
                className="flex gap-4 p-5 border-b border-gray-200 mb-4 bg-white rounded-2xl shadow-sm transition-all duration-300 hover:shadow-md hover:translate-x-1"
              >
                <div className="w-[85px] h-[85px] rounded-xl bg-gray-100 flex items-center justify-center flex-shrink-0 overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover block bg-gray-100"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = 'data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' width=\'100\' height=\'100\'%3E%3Crect fill=\'%23f0f0f0\' width=\'100\' height=\'100\'/%3E%3Ctext fill=\'%23999\' font-family=\'sans-serif\' font-size=\'12\' x=\'50%25\' y=\'50%25\' text-anchor=\'middle\' dy=\'.3em\'%3EN/A%3C/text%3E%3C/svg%3E';
                    }}
                  />
                </div>
                <div className="flex-grow">
                  <div className="font-bold mb-1 text-gray-900 text-base">{item.name}</div>
                  <div className="text-gray-500 text-sm mb-3">{formatPrice(item.price)} each</div>
                  <div className="flex items-center gap-3 mt-3 flex-wrap">
                    <button
                      onClick={() => updateQuantity(item.id, -1)}
                      className="bg-gray-100 border-none w-8 h-8 rounded-full cursor-pointer text-xl flex items-center justify-center transition-all duration-300 font-semibold text-gray-800 hover:bg-orange-500 hover:text-white hover:scale-110"
                    >
                      −
                    </button>
                    <span className="font-bold min-w-[35px] text-center text-base">{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item.id, 1)}
                      className="bg-gray-100 border-none w-8 h-8 rounded-full cursor-pointer text-xl flex items-center justify-center transition-all duration-300 font-semibold text-gray-800 hover:bg-orange-500 hover:text-white hover:scale-110"
                    >
                      +
                    </button>
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="bg-red-500 text-white border-none px-4 py-2 rounded-lg cursor-pointer text-sm font-semibold transition-all duration-300 ml-auto whitespace-nowrap flex-shrink-0 hover:bg-red-600 hover:-translate-y-0.5 hover:shadow-md"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        <div className="p-7 border-t-2 border-gray-200 bg-white">
          <div className="text-2xl mb-5 text-center text-gray-900 font-extrabold">
            Total: {formatPrice(total)}
          </div>
          <button
            onClick={handleCheckout}
            disabled={cart.length === 0}
            className="w-full bg-gradient-to-r from-orange-500 to-orange-400 text-white border-none py-4 rounded-full text-lg font-bold cursor-pointer transition-all duration-300 shadow-lg disabled:bg-gray-200 disabled:text-gray-400 disabled:cursor-not-allowed disabled:transform-none disabled:shadow-none hover:-translate-y-1 hover:shadow-2xl"
          >
            Proceed to Checkout
          </button>
        </div>
      </div>
    </>
  );
};

export default CartPanel;

