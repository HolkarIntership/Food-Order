import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { formatPrice } from '../utils/helpers';

const Orders = () => {
  const { orders } = useApp();
  const navigate = useNavigate();

  const sortedOrders = [...orders].sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));

  const printOrder = (orderId) => {
    const order = orders.find(o => o.orderId === orderId);
    if (!order) return;

    const printWindow = window.open('', '_blank');
    printWindow.document.write(`
      <html>
        <head>
          <title>Order ${orderId}</title>
          <style>
            body { font-family: Arial, sans-serif; padding: 20px; }
            h1 { color: #ff6b35; }
            table { width: 100%; border-collapse: collapse; margin: 20px 0; }
            th, td { padding: 10px; text-align: left; border-bottom: 1px solid #ddd; }
            th { background-color: #f8f9fa; }
            .total { font-weight: bold; font-size: 1.2em; }
          </style>
        </head>
        <body>
          <h1>Foodie Delight - Order Receipt</h1>
          <p><strong>Order ID:</strong> ${order.orderId}</p>
          <p><strong>Date:</strong> ${new Date(order.timestamp).toLocaleString()}</p>
          <h2>Delivery Details</h2>
          <p>${order.deliveryDetails.customerName}<br>
          ${order.deliveryDetails.address}<br>
          ${order.deliveryDetails.city}, ${order.deliveryDetails.zipCode}<br>
          Phone: ${order.deliveryDetails.phone}</p>
          <h2>Order Items</h2>
          <table>
            <tr><th>Item</th><th>Quantity</th><th>Price</th></tr>
            ${order.items.map(item => `
              <tr>
                <td>${item.name}</td>
                <td>${item.quantity}</td>
                <td>${formatPrice(item.price * item.quantity)}</td>
              </tr>
            `).join('')}
            <tr><td colspan="2"><strong>Subtotal:</strong></td><td>${formatPrice(order.subtotal)}</td></tr>
            ${order.discount && order.discount > 0 ? `<tr><td colspan="2"><strong>Discount (${order.promoCode || 'Promo'}):</strong></td><td style="color: #28a745;">-${formatPrice(order.discount)}</td></tr>` : ''}
            <tr><td colspan="2"><strong>Tax:</strong></td><td>${formatPrice(order.tax)}</td></tr>
            <tr class="total"><td colspan="2"><strong>Grand Total:</strong></td><td>${formatPrice(order.totalPrice)}</td></tr>
          </table>
        </body>
      </html>
    `);
    printWindow.document.close();
    printWindow.print();
  };

  if (orders.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white pt-32 pb-16 px-5">
        <div className="container mx-auto max-w-7xl">
          <h2 className="text-5xl font-extrabold text-center mb-8 text-gray-900 bg-gradient-to-r from-orange-500 to-orange-400 bg-clip-text text-transparent">
            Order History
          </h2>
          <div className="text-center py-16">
            <div className="text-8xl mb-6 opacity-50">📋</div>
            <h3 className="text-2xl mb-2 font-semibold text-gray-900">No orders yet</h3>
            <p className="text-gray-500 mb-8">Your order history will appear here</p>
            <button
              onClick={() => navigate('/')}
              className="inline-block bg-gradient-to-r from-orange-500 to-orange-400 text-white px-8 py-4 rounded-xl no-underline font-bold transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
            >
              Start Ordering
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white pt-32 pb-16 px-5">
      <div className="container mx-auto max-w-7xl">
        <h2 className="text-5xl font-extrabold text-center mb-12 text-gray-900 bg-gradient-to-r from-orange-500 to-orange-400 bg-clip-text text-transparent">
          Order History
        </h2>
        <div className="flex flex-col gap-8 mb-12">
          {sortedOrders.map(order => (
            <div
              key={order.orderId}
              className="bg-white rounded-2xl p-8 shadow-lg border border-gray-200 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl"
            >
              <div className="flex justify-between items-start mb-6 pb-4 border-b-2 border-gray-200 flex-wrap gap-4">
                <div>
                  <h3 className="text-2xl font-extrabold text-gray-900 mb-1">Order #{order.orderId}</h3>
                  <p className="text-gray-500 text-sm">{new Date(order.timestamp).toLocaleString()}</p>
                </div>
                <div className="flex gap-3">
                  <button
                    onClick={() => navigate(`/track?id=${order.orderId}`)}
                    className="px-5 py-2.5 rounded-xl font-semibold cursor-pointer transition-all duration-300 border-none text-sm bg-gradient-to-r from-orange-500 to-orange-400 text-white hover:-translate-y-0.5 hover:shadow-md"
                  >
                    Track Order
                  </button>
                  <button
                    onClick={() => printOrder(order.orderId)}
                    className="px-5 py-2.5 rounded-xl font-semibold cursor-pointer transition-all duration-300 border-none text-sm bg-gray-100 text-gray-800 hover:bg-gray-200"
                  >
                    🖨️ Print
                  </button>
                </div>
              </div>
              <div className="mb-4">
                {order.items.map((item, idx) => (
                  <div key={idx} className="flex justify-between items-center py-3 border-b border-gray-200 text-sm">
                    <span>{item.name} x{item.quantity}</span>
                    <span>{formatPrice(item.price * item.quantity)}</span>
                  </div>
                ))}
              </div>
              <div className="mt-6 pt-6 border-t-2 border-gray-200">
                <div className="flex justify-between mb-2 text-base font-semibold text-gray-800">
                  <span>Subtotal:</span>
                  <span>{formatPrice(order.subtotal)}</span>
                </div>
                {order.discount && order.discount > 0 && (
                  <div className="flex justify-between mb-2 text-base font-semibold text-gray-800">
                    <span>Discount ({order.promoCode || 'Promo'}):</span>
                    <span className="text-green-500">-{formatPrice(order.discount)}</span>
                  </div>
                )}
                <div className="flex justify-between mb-2 text-base font-semibold text-gray-800">
                  <span>Tax:</span>
                  <span>{formatPrice(order.tax)}</span>
                </div>
                <div className="flex justify-between mt-6 pt-6 border-t-3 border-gray-200 text-2xl font-extrabold text-orange-500">
                  <span>Total:</span>
                  <span>{formatPrice(order.totalPrice)}</span>
                </div>
              </div>
              <div className="mt-6 pt-6 border-t border-gray-200 text-gray-500">
                <p className="mb-1"><strong>Delivery to:</strong> {order.deliveryDetails.address}, {order.deliveryDetails.city}</p>
                <p><strong>Phone:</strong> {order.deliveryDetails.phone}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Orders;

