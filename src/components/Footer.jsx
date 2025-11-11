import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-gradient-to-br from-gray-900 to-gray-800 text-white pt-16 mt-16 relative">
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-orange-500 to-orange-400"></div>
      <div className="container mx-auto px-5 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          <div>
            <h3 className="text-2xl font-bold mb-4 bg-gradient-to-r from-orange-500 to-orange-400 bg-clip-text text-transparent flex items-center gap-2">
              <i className='bx bx-restaurant text-3xl'></i>
              Foodie Delight
            </h3>
            <p className="text-white/80 leading-relaxed mb-6 text-sm">
              Delicious food delivered to your door. Experience the best flavors in town with our premium quality ingredients and fast delivery service.
            </p>
            <div className="flex gap-4 flex-wrap">
              <a href="#" className="w-10 h-10 flex items-center justify-center bg-white/10 rounded-full text-white no-underline text-xl transition-all duration-300 backdrop-blur-md border border-white/10 hover:bg-gradient-to-r hover:from-orange-500 hover:to-orange-400 hover:-translate-y-1 hover:shadow-lg hover:shadow-orange-500/40 hover:border-transparent">
                <i className='bx bxl-facebook text-2xl'></i>
              </a>
              <a href="#" className="w-10 h-10 flex items-center justify-center bg-white/10 rounded-full text-white no-underline text-xl transition-all duration-300 backdrop-blur-md border border-white/10 hover:bg-gradient-to-r hover:from-orange-500 hover:to-orange-400 hover:-translate-y-1 hover:shadow-lg hover:shadow-orange-500/40 hover:border-transparent">
                <i className='bx bxl-instagram text-2xl'></i>
              </a>
              <a href="#" className="w-10 h-10 flex items-center justify-center bg-white/10 rounded-full text-white no-underline text-xl transition-all duration-300 backdrop-blur-md border border-white/10 hover:bg-gradient-to-r hover:from-orange-500 hover:to-orange-400 hover:-translate-y-1 hover:shadow-lg hover:shadow-orange-500/40 hover:border-transparent">
                <i className='bx bxl-twitter text-2xl'></i>
              </a>
              <a href="#" className="w-10 h-10 flex items-center justify-center bg-white/10 rounded-full text-white no-underline text-xl transition-all duration-300 backdrop-blur-md border border-white/10 hover:bg-gradient-to-r hover:from-orange-500 hover:to-orange-400 hover:-translate-y-1 hover:shadow-lg hover:shadow-orange-500/40 hover:border-transparent">
                <i className='bx bxl-youtube text-2xl'></i>
              </a>
            </div>
          </div>

          <div>
            <h4 className="text-lg font-bold mb-5 text-white relative pb-3 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-12 after:h-0.5 after:bg-gradient-to-r after:from-orange-500 after:to-orange-400 after:rounded">
              Quick Links
            </h4>
            <ul className="list-none p-0 m-0">
              <li className="mb-3">
                <Link to="/" className="text-white/80 no-underline transition-all duration-300 inline-block text-sm hover:text-orange-500 hover:translate-x-1 hover:pl-1">
                  Home
                </Link>
              </li>
              <li className="mb-3">
                <Link to="/orders" className="text-white/80 no-underline transition-all duration-300 inline-block text-sm hover:text-orange-500 hover:translate-x-1 hover:pl-1">
                  My Orders
                </Link>
              </li>
              <li className="mb-3">
                <a href="#" className="text-white/80 no-underline transition-all duration-300 inline-block text-sm hover:text-orange-500 hover:translate-x-1 hover:pl-1">
                  About Us
                </a>
              </li>
              <li className="mb-3">
                <a href="#" className="text-white/80 no-underline transition-all duration-300 inline-block text-sm hover:text-orange-500 hover:translate-x-1 hover:pl-1">
                  Contact
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-bold mb-5 text-white relative pb-3 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-12 after:h-0.5 after:bg-gradient-to-r after:from-orange-500 after:to-orange-400 after:rounded">
              Services
            </h4>
            <ul className="list-none p-0 m-0">
              <li className="mb-3">
                <a href="#" className="text-white/80 no-underline transition-all duration-300 inline-block text-sm hover:text-orange-500 hover:translate-x-1 hover:pl-1">
                  Fast Delivery
                </a>
              </li>
              <li className="mb-3">
                <a href="#" className="text-white/80 no-underline transition-all duration-300 inline-block text-sm hover:text-orange-500 hover:translate-x-1 hover:pl-1">
                  Secure Payment
                </a>
              </li>
              <li className="mb-3">
                <a href="#" className="text-white/80 no-underline transition-all duration-300 inline-block text-sm hover:text-orange-500 hover:translate-x-1 hover:pl-1">
                  Special Offers
                </a>
              </li>
              <li className="mb-3">
                <a href="#" className="text-white/80 no-underline transition-all duration-300 inline-block text-sm hover:text-orange-500 hover:translate-x-1 hover:pl-1">
                  Quality Food
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-bold mb-5 text-white relative pb-3 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-12 after:h-0.5 after:bg-gradient-to-r after:from-orange-500 after:to-orange-400 after:rounded">
              Contact Info
            </h4>
            <ul className="list-none p-0 m-0">
              <li className="text-white/80 mb-3 text-sm flex items-start gap-2 leading-relaxed">
                <i className='bx bx-phone text-lg mt-0.5 flex-shrink-0 text-orange-500'></i>
                +1 (555) 123-4567
              </li>
              <li className="text-white/80 mb-3 text-sm flex items-start gap-2 leading-relaxed">
                <i className='bx bx-envelope text-lg mt-0.5 flex-shrink-0 text-orange-500'></i>
                info@foodiedelight.com
              </li>
              <li className="text-white/80 mb-3 text-sm flex items-start gap-2 leading-relaxed">
                <i className='bx bx-map text-lg mt-0.5 flex-shrink-0 text-orange-500'></i>
                123 Food Street, City, State 12345
              </li>
              <li className="text-white/80 mb-3 text-sm flex items-start gap-2 leading-relaxed">
                <i className='bx bx-time-five text-lg mt-0.5 flex-shrink-0 text-orange-500'></i>
                Mon-Sun: 10:00 AM - 11:00 PM
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 pt-8 flex justify-between items-center flex-wrap gap-4">
          <p className="text-white/60 text-sm m-0">
            &copy; 2024 Foodie Delight. All rights reserved.
          </p>
          <div className="flex gap-6 flex-wrap">
            <a href="#" className="text-white/60 no-underline text-sm transition-all duration-300 hover:text-orange-500">
              Privacy Policy
            </a>
            <a href="#" className="text-white/60 no-underline text-sm transition-all duration-300 hover:text-orange-500">
              Terms of Service
            </a>
            <a href="#" className="text-white/60 no-underline text-sm transition-all duration-300 hover:text-orange-500">
              Cookie Policy
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

