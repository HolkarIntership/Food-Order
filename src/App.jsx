import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AppProvider } from './context/AppContext';
import Header from './components/Header';
import Footer from './components/Footer';
import CartPanel from './components/CartPanel';
import Toast from './components/Toast';
import Home from './pages/Home';
import Orders from './pages/Orders';
import Order from './pages/Order';
import Track from './pages/Track';

function App() {
  const [isCartOpen, setIsCartOpen] = useState(false);

  return (
    <AppProvider>
      <Router>
        <div className="min-h-screen flex flex-col">
          <Header onCartClick={() => setIsCartOpen(true)} />
          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<Home onCartClick={() => setIsCartOpen(true)} />} />
              <Route path="/orders" element={<Orders />} />
              <Route path="/order" element={<Order />} />
              <Route path="/track" element={<Track />} />
            </Routes>
          </main>
          <Footer />
          <CartPanel isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
          <Toast />
        </div>
      </Router>
    </AppProvider>
  );
}

export default App;
