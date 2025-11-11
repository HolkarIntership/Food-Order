import { useSearchParams, useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { formatPrice } from '../utils/helpers';

const Track = () => {
  const [searchParams] = useSearchParams();
  const orderId = searchParams.get('id');
  const { orders } = useApp();
  const navigate = useNavigate();

  if (!orderId) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white pt-32 pb-16 px-5">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center py-16">
            <p className="text-xl mb-4">No order ID provided</p>
            <button
              onClick={() => navigate('/orders')}
              className="inline-block bg-gradient-to-r from-orange-500 to-orange-400 text-white px-8 py-4 rounded-xl no-underline font-bold transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
            >
              View All Orders
            </button>
          </div>
        </div>
      </div>
    );
  }

  const order = orders.find(o => o.orderId === orderId);

  if (!order) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white pt-32 pb-16 px-5">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center py-16">
            <p className="text-xl mb-4">Order not found</p>
            <button
              onClick={() => navigate('/orders')}
              className="inline-block bg-gradient-to-r from-orange-500 to-orange-400 text-white px-8 py-4 rounded-xl no-underline font-bold transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
            >
              View All Orders
            </button>
          </div>
        </div>
      </div>
    );
  }

  const orderTime = new Date(order.timestamp);
  const estimatedDelivery = new Date(
    orderTime.getTime() +
    (parseInt(order.deliveryDetails.deliveryTime === 'asap' ? 30 : order.deliveryDetails.deliveryTime.replace(/\D/g, '')) || 30) * 60000
  );
  const now = new Date();
  const minutesSinceOrder = (now - orderTime) / (1000 * 60);

  let status = 'preparing';
  let statusText = 'Preparing your order';
  let progress = 25;
  let statusIcon = '👨‍🍳';

  // Check order status in priority order (most advanced first)
  if (now >= estimatedDelivery) {
    status = 'delivered';
    statusText = 'Delivered';
    progress = 100;
    statusIcon = '✅';
  } else if (now >= new Date(orderTime.getTime() + 15 * 60000)) {
    status = 'on-the-way';
    statusText = 'On the way';
    progress = 75;
    statusIcon = '🚗';
  } else if (now >= new Date(orderTime.getTime() + 10 * 60000)) {
    status = 'ready';
    statusText = 'Ready for pickup';
    progress = 50;
    statusIcon = '📦';
  }

  // Timeline: "Preparing" step only becomes active after 5 minutes
  const isPreparingActive = minutesSinceOrder > 5 || status === 'ready' || status === 'on-the-way' || status === 'delivered';

  const timelineSteps = [
    { key: 'placed', label: 'Order Placed', time: orderTime.toLocaleString(), completed: true },
    { key: 'preparing', label: 'Preparing', desc: 'Your order is being prepared', completed: isPreparingActive },
    { key: 'ready', label: 'Ready for Pickup', desc: 'Order is ready', completed: status === 'ready' || status === 'on-the-way' || status === 'delivered' },
    { key: 'on-the-way', label: 'On the Way', desc: 'Out for delivery', completed: status === 'on-the-way' || status === 'delivered' },
    { key: 'delivered', label: 'Delivered', time: status === 'delivered' ? estimatedDelivery.toLocaleString() : `Estimated: ${estimatedDelivery.toLocaleString()}`, completed: status === 'delivered' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white pt-32 pb-16 px-5">
      <div className="container mx-auto max-w-4xl">
        <div className="bg-white rounded-3xl p-10 shadow-lg border border-gray-200">
          <div className="text-center mb-8 pb-8 border-b-2 border-gray-200">
            <h3 className="text-3xl font-extrabold mb-2 text-gray-900">Order #{order.orderId}</h3>
            <p className="text-gray-500 text-sm">Placed on {orderTime.toLocaleString()}</p>
          </div>

          <div className="mb-12">
            <div className="text-center mb-8">
              <div className="text-6xl mb-4">{statusIcon}</div>
              <h2 className="text-3xl font-extrabold text-gray-900">{statusText}</h2>
            </div>
            <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden mt-6">
              <div
                className="h-full bg-gradient-to-r from-orange-500 to-orange-400 transition-all duration-500 rounded-full"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
          </div>

          <div className="relative py-8 mb-8">
            <div className="absolute left-5 top-0 bottom-0 w-0.5 bg-gray-200"></div>
            {timelineSteps.map((step, idx) => (
              <div
                key={step.key}
                className={`relative pl-16 mb-8 transition-opacity duration-300 ${step.completed ? 'opacity-100' : 'opacity-50'}`}
              >
                <div
                  className={`absolute left-[11px] top-1 w-5 h-5 rounded-full border-4 border-white transition-all duration-300 ${
                    step.completed
                      ? 'bg-orange-500 shadow-[0_0_0_3px_rgb(249,115,22)]'
                      : 'bg-gray-200 shadow-[0_0_0_3px_rgb(229,231,235)]'
                  }`}
                ></div>
                <div>
                  <h4 className="font-bold mb-1 text-gray-900">{step.label}</h4>
                  <p className="text-gray-500 text-sm">{step.time || step.desc}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 pt-8 border-t-2 border-gray-200">
            <h3 className="text-2xl font-extrabold mb-6 text-gray-900">Order Details</h3>
            <div className="mb-4">
              {order.items.map((item, idx) => (
                <div key={idx} className="flex justify-between items-center py-3 border-b border-gray-200 text-sm">
                  <span>{item.name} x{item.quantity}</span>
                  <span>{formatPrice(item.price * item.quantity)}</span>
                </div>
              ))}
            </div>
            <div className="mt-6 pt-6 border-t-2 border-gray-200">
              <div className="flex justify-between mb-2 text-lg font-semibold text-gray-800">
                <span>Subtotal:</span>
                <span>{formatPrice(order.subtotal)}</span>
              </div>
              {order.discount && order.discount > 0 && (
                <div className="flex justify-between mb-2 text-lg font-semibold text-gray-800">
                  <span>Discount ({order.promoCode || 'Promo'}):</span>
                  <span className="text-green-500">-{formatPrice(order.discount)}</span>
                </div>
              )}
              <div className="flex justify-between mb-2 text-lg font-semibold text-gray-800">
                <span>Tax:</span>
                <span>{formatPrice(order.tax)}</span>
              </div>
              <div className="flex justify-between mt-6 pt-6 border-t-3 border-gray-200 text-3xl font-extrabold text-orange-500">
                <span>Total:</span>
                <span>{formatPrice(order.totalPrice)}</span>
              </div>
            </div>
            <div className="mt-6 p-6 bg-gray-50 rounded-xl">
              <h4 className="font-bold mb-4 text-gray-900">Delivery Address</h4>
              <p className="mb-1 text-gray-800">{order.deliveryDetails.customerName}</p>
              <p className="mb-1 text-gray-800">{order.deliveryDetails.address}</p>
              <p className="mb-1 text-gray-800">
                {order.deliveryDetails.city}, {order.deliveryDetails.zipCode}
              </p>
              <p className="text-gray-800">Phone: {order.deliveryDetails.phone}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Track;

