import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { formatPrice, getEstimatedDeliveryTime } from '../utils/helpers';

const Order = () => {
  const { cart, addOrder, applyPromoCode, showToast } = useApp();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    customerName: '',
    phone: '',
    email: '',
    address: '',
    city: '',
    zipCode: '',
    deliveryTime: 'asap',
    specialInstructions: ''
  });
  const [promoCode, setPromoCode] = useState('');
  const [appliedDiscount, setAppliedDiscount] = useState(0);
  const [appliedPromoCode, setAppliedPromoCode] = useState('');
  const [promoMessage, setPromoMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

  useEffect(() => {
    if (cart.length === 0) {
      navigate('/');
    }
  }, [cart, navigate]);

  const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const tax = Math.max(0, (subtotal - appliedDiscount) * 0.10);
  const grandTotal = Math.max(0, subtotal + tax - appliedDiscount);
  const estimatedMinutes = getEstimatedDeliveryTime(cart);
  const estimatedTime = `${estimatedMinutes}-${estimatedMinutes + 10} minutes`;

  // Validation functions
  const validateField = (name, value) => {
    let error = '';

    switch (name) {
      case 'customerName':
        if (!value.trim()) {
          error = 'Full name is required';
        } else if (value.trim().length < 2) {
          error = 'Name must be at least 2 characters';
        } else if (!/^[a-zA-Z\s]+$/.test(value.trim())) {
          error = 'Name can only contain letters and spaces';
        }
        break;

      case 'phone':
        if (!value.trim()) {
          error = 'Phone number is required';
        } else {
          const phoneRegex = /^[\+]?[(]?[0-9]{1,4}[)]?[-\s\.]?[(]?[0-9]{1,4}[)]?[-\s\.]?[0-9]{1,9}$/;
          const digitsOnly = value.replace(/\D/g, '');
          if (digitsOnly.length < 10 || digitsOnly.length > 15) {
            error = 'Phone number must be 10-15 digits';
          } else if (!phoneRegex.test(value)) {
            error = 'Please enter a valid phone number';
          }
        }
        break;

      case 'email':
        if (value.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim())) {
          error = 'Please enter a valid email address';
        }
        break;

      case 'address':
        if (!value.trim()) {
          error = 'Delivery address is required';
        } else if (value.trim().length < 10) {
          error = 'Address must be at least 10 characters';
        }
        break;

      case 'city':
        if (!value.trim()) {
          error = 'City is required';
        } else if (value.trim().length < 2) {
          error = 'City must be at least 2 characters';
        } else if (!/^[a-zA-Z\s]+$/.test(value.trim())) {
          error = 'City can only contain letters and spaces';
        }
        break;

      case 'zipCode':
        if (!value.trim()) {
          error = 'Zip code is required';
        } else {
          const zipRegex = /^\d{5,6}(-\d{4})?$/;
          if (!zipRegex.test(value.trim())) {
            error = 'Please enter a valid zip code (5-6 digits)';
          }
        }
        break;

      default:
        break;
    }

    return error;
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    setTouched({ ...touched, [name]: true });
    const error = validateField(name, value);
    setErrors({ ...errors, [name]: error });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    
    // Clear error when user starts typing
    if (errors[name] && touched[name]) {
      const error = validateField(name, value);
      setErrors({ ...errors, [name]: error });
    }
  };

  const validateForm = () => {
    const newErrors = {};
    const fieldsToValidate = ['customerName', 'phone', 'address', 'city', 'zipCode'];
    
    fieldsToValidate.forEach(field => {
      const error = validateField(field, formData[field]);
      if (error) {
        newErrors[field] = error;
      }
    });

    // Validate email if provided
    if (formData.email) {
      const emailError = validateField('email', formData.email);
      if (emailError) {
        newErrors.email = emailError;
      }
    }

    setErrors(newErrors);
    setTouched({
      customerName: true,
      phone: true,
      email: true,
      address: true,
      city: true,
      zipCode: true
    });

    return Object.keys(newErrors).length === 0;
  };

  const handlePromoApply = () => {
    if (!promoCode) {
      setPromoMessage('Please enter a promo code');
      return;
    }

    const result = applyPromoCode(promoCode);
    if (result.success) {
      setAppliedDiscount(result.discount);
      setAppliedPromoCode(result.code);
      setPromoMessage(`Promo code "${result.code}" applied! Saved ${formatPrice(result.discount)}`);
    } else {
      setAppliedDiscount(0);
      setPromoMessage(result.message || 'Invalid promo code');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (cart.length === 0) {
      showToast('Your cart is empty!', 'error');
      return;
    }

    // Validate form before submission
    if (!validateForm()) {
      showToast('Please fix the errors in the form', 'error');
      return;
    }

    setIsLoading(true);

    const orderData = {
      items: cart.map(item => ({
        id: item.id,
        name: item.name,
        price: item.price,
        quantity: item.quantity,
        category: item.category
      })),
      subtotal,
      discount: appliedDiscount,
      promoCode: appliedPromoCode,
      tax,
      totalPrice: grandTotal,
      deliveryDetails: formData
    };

    try {
      const orderId = addOrder(orderData);
      showToast(`Order placed successfully! Order ID: ${orderId}`, 'success');
      
      setTimeout(() => {
        navigate(`/track?id=${orderId}`);
      }, 2000);
    } catch (error) {
      showToast('An error occurred. Please try again.', 'error');
      console.error('Order submission error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  if (cart.length === 0) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white pt-32 pb-16 px-5">
      <div className="container mx-auto max-w-7xl">
        <h2 className="text-5xl font-extrabold text-center mb-12 text-gray-900 bg-gradient-to-r from-orange-500 to-orange-400 bg-clip-text text-transparent">
          Order Summary
        </h2>

        <div className="flex flex-col lg:flex-row gap-10 mb-16">
          {/* Order Summary */}
          <section className="bg-white p-10 rounded-3xl shadow-lg border border-gray-200 lg:flex-1">
            <h3 className="mb-8 text-gray-900 text-3xl font-bold tracking-tight">Your Order</h3>
            <div className="mb-8">
              {cart.map(item => (
                <div key={item.id} className="flex justify-between items-center py-5 border-b border-gray-200 transition-all duration-300 hover:pl-2">
                  <span className="font-bold text-gray-900">{item.name} <span className="text-gray-500 font-normal">x{item.quantity}</span></span>
                  <span className="font-bold text-orange-500 text-lg">{formatPrice(item.price * item.quantity)}</span>
                </div>
              ))}
            </div>
            <div className="border-t-2 border-gray-200 pt-6">
              <div className="flex justify-between mb-4 text-lg font-semibold text-gray-800">
                <span>Subtotal:</span>
                <span>{formatPrice(subtotal)}</span>
              </div>
              
              {/* Promo Code Section */}
              <div className="py-4 border-t border-b border-gray-200 my-4">
                <div className="flex gap-3 mb-3">
                  <input
                    type="text"
                    value={promoCode}
                    onChange={(e) => setPromoCode(e.target.value)}
                    placeholder="Enter promo code"
                    className="flex-1 px-4 py-3 border-2 border-gray-200 rounded-xl text-sm focus:outline-none focus:border-orange-500 focus:shadow-lg focus:shadow-orange-500/10"
                  />
                  <button
                    type="button"
                    onClick={handlePromoApply}
                    className="bg-orange-500 text-white border-none px-6 py-3 rounded-xl font-bold cursor-pointer transition-all duration-300 hover:bg-orange-600 hover:-translate-y-0.5"
                  >
                    Apply
                  </button>
                </div>
                {promoMessage && (
                  <div className={`text-sm font-semibold mt-2 ${promoMessage.includes('applied') ? 'text-green-500' : 'text-red-500'}`}>
                    {promoMessage}
                  </div>
                )}
                {appliedDiscount > 0 && (
                  <div className="flex justify-between mt-3 text-base font-semibold text-gray-800">
                    <span>Discount:</span>
                    <span className="text-green-500">-{formatPrice(appliedDiscount)}</span>
                  </div>
                )}
              </div>

              <div className="flex justify-between mb-4 text-lg font-semibold text-gray-800">
                <span>Tax (10%):</span>
                <span>{formatPrice(tax)}</span>
              </div>
              <div className="flex justify-between mt-6 pt-6 border-t-3 border-gray-200 text-3xl font-extrabold text-orange-500">
                <span>Grand Total:</span>
                <span>{formatPrice(grandTotal)}</span>
              </div>
              <div className="mt-6 pt-6 border-t border-gray-200 text-center text-gray-500">
                <p>⏱️ Estimated delivery time: <strong className="text-orange-500">{estimatedTime}</strong></p>
              </div>
            </div>
          </section>

          {/* Delivery Form */}
          <section className="bg-white p-10 rounded-3xl shadow-lg border border-gray-200 lg:flex-[1.2]">
            <h3 className="mb-8 text-gray-900 text-3xl font-bold tracking-tight">Delivery Details</h3>
            <form onSubmit={handleSubmit} className="flex flex-col gap-6">
              <div className="flex flex-col gap-2.5">
                <label className="font-semibold text-gray-900 text-sm">Full Name *</label>
                <input
                  type="text"
                  name="customerName"
                  required
                  value={formData.customerName}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={`px-5 py-4 border-2 rounded-xl text-base font-inherit transition-all duration-300 bg-white text-gray-800 focus:outline-none focus:shadow-lg focus:-translate-y-0.5 ${
                    errors.customerName && touched.customerName
                      ? 'border-red-500 focus:border-red-500 focus:shadow-red-500/10'
                      : 'border-gray-200 focus:border-orange-500 focus:shadow-orange-500/10'
                  }`}
                  placeholder="Enter your full name"
                />
                {errors.customerName && touched.customerName && (
                  <p className="text-red-500 text-sm mt-1">{errors.customerName}</p>
                )}
              </div>
              <div className="flex flex-col gap-2.5">
                <label className="font-semibold text-gray-900 text-sm">Phone Number *</label>
                <input
                  type="tel"
                  name="phone"
                  required
                  value={formData.phone}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={`px-5 py-4 border-2 rounded-xl text-base font-inherit transition-all duration-300 bg-white text-gray-800 focus:outline-none focus:shadow-lg focus:-translate-y-0.5 ${
                    errors.phone && touched.phone
                      ? 'border-red-500 focus:border-red-500 focus:shadow-red-500/10'
                      : 'border-gray-200 focus:border-orange-500 focus:shadow-orange-500/10'
                  }`}
                  placeholder="Enter your phone number"
                />
                {errors.phone && touched.phone && (
                  <p className="text-red-500 text-sm mt-1">{errors.phone}</p>
                )}
              </div>
              <div className="flex flex-col gap-2.5">
                <label className="font-semibold text-gray-900 text-sm">Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={`px-5 py-4 border-2 rounded-xl text-base font-inherit transition-all duration-300 bg-white text-gray-800 focus:outline-none focus:shadow-lg focus:-translate-y-0.5 ${
                    errors.email && touched.email
                      ? 'border-red-500 focus:border-red-500 focus:shadow-red-500/10'
                      : 'border-gray-200 focus:border-orange-500 focus:shadow-orange-500/10'
                  }`}
                  placeholder="Enter your email (optional)"
                />
                {errors.email && touched.email && (
                  <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                )}
              </div>
              <div className="flex flex-col gap-2.5">
                <label className="font-semibold text-gray-900 text-sm">Delivery Address *</label>
                <textarea
                  name="address"
                  required
                  rows="3"
                  value={formData.address}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={`px-5 py-4 border-2 rounded-xl text-base font-inherit transition-all duration-300 bg-white text-gray-800 resize-y min-h-[100px] focus:outline-none focus:shadow-lg focus:-translate-y-0.5 ${
                    errors.address && touched.address
                      ? 'border-red-500 focus:border-red-500 focus:shadow-red-500/10'
                      : 'border-gray-200 focus:border-orange-500 focus:shadow-orange-500/10'
                  }`}
                  placeholder="Enter your complete delivery address"
                />
                {errors.address && touched.address && (
                  <p className="text-red-500 text-sm mt-1">{errors.address}</p>
                )}
              </div>
              <div className="flex flex-col gap-2.5">
                <label className="font-semibold text-gray-900 text-sm">City *</label>
                <input
                  type="text"
                  name="city"
                  required
                  value={formData.city}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={`px-5 py-4 border-2 rounded-xl text-base font-inherit transition-all duration-300 bg-white text-gray-800 focus:outline-none focus:shadow-lg focus:-translate-y-0.5 ${
                    errors.city && touched.city
                      ? 'border-red-500 focus:border-red-500 focus:shadow-red-500/10'
                      : 'border-gray-200 focus:border-orange-500 focus:shadow-orange-500/10'
                  }`}
                  placeholder="Enter your city"
                />
                {errors.city && touched.city && (
                  <p className="text-red-500 text-sm mt-1">{errors.city}</p>
                )}
              </div>
              <div className="flex gap-5 max-sm:flex-col">
                <div className="flex flex-col gap-2.5 flex-1">
                  <label className="font-semibold text-gray-900 text-sm">Zip Code *</label>
                  <input
                    type="text"
                    name="zipCode"
                    required
                    value={formData.zipCode}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className={`px-5 py-4 border-2 rounded-xl text-base font-inherit transition-all duration-300 bg-white text-gray-800 focus:outline-none focus:shadow-lg focus:-translate-y-0.5 ${
                      errors.zipCode && touched.zipCode
                        ? 'border-red-500 focus:border-red-500 focus:shadow-red-500/10'
                        : 'border-gray-200 focus:border-orange-500 focus:shadow-orange-500/10'
                    }`}
                    placeholder="Enter zip code"
                  />
                  {errors.zipCode && touched.zipCode && (
                    <p className="text-red-500 text-sm mt-1">{errors.zipCode}</p>
                  )}
                </div>
                <div className="flex flex-col gap-2.5 flex-1">
                  <label className="font-semibold text-gray-900 text-sm">Preferred Time</label>
                  <select
                    value={formData.deliveryTime}
                    onChange={(e) => setFormData({ ...formData, deliveryTime: e.target.value })}
                    className="px-5 py-4 border-2 border-gray-200 rounded-xl text-base font-inherit transition-all duration-300 bg-white text-gray-800 focus:outline-none focus:border-orange-500 focus:shadow-lg focus:shadow-orange-500/10 focus:-translate-y-0.5"
                  >
                    <option value="asap">ASAP</option>
                    <option value="30min">30 minutes</option>
                    <option value="1hr">1 hour</option>
                    <option value="2hr">2 hours</option>
                  </select>
                </div>
              </div>
              <div className="flex flex-col gap-2.5">
                <label className="font-semibold text-gray-900 text-sm">Special Instructions</label>
                <textarea
                  name="specialInstructions"
                  rows="2"
                  placeholder="Any special delivery instructions..."
                  value={formData.specialInstructions}
                  onChange={handleChange}
                  className="px-5 py-4 border-2 border-gray-200 rounded-xl text-base font-inherit transition-all duration-300 bg-white text-gray-800 resize-y focus:outline-none focus:border-orange-500 focus:shadow-lg focus:shadow-orange-500/10 focus:-translate-y-0.5"
                />
              </div>
              <button
                type="submit"
                disabled={isLoading}
                className="bg-gradient-to-r from-orange-500 to-orange-400 text-white border-none py-5 rounded-full text-xl font-bold cursor-pointer mt-2 transition-all duration-300 shadow-lg disabled:bg-gray-200 disabled:text-gray-400 disabled:cursor-not-allowed disabled:transform-none disabled:shadow-none hover:-translate-y-1 hover:shadow-2xl"
              >
                {isLoading ? 'Placing Order...' : 'Place Order'}
              </button>
            </form>
          </section>
        </div>
      </div>

      {isLoading && (
        <div className="fixed inset-0 bg-black/75 backdrop-blur-md z-[2000] flex items-center justify-center flex-col text-white">
          <div className="border-4 border-white/20 border-t-white rounded-full w-16 h-16 animate-spin mb-6"></div>
          <p className="text-xl font-semibold tracking-wide">Placing your order...</p>
        </div>
      )}
    </div>
  );
};

export default Order;

