# 🍽️ Foodie Delight - Food Ordering App

A modern, responsive food ordering web application built with React and Tailwind CSS. Order delicious food from an extensive menu with features like cart management, order tracking, favorites, and more.

![React](https://img.shields.io/badge/React-19.1.1-blue)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-4.1.17-38bdf8)
![Vite](https://img.shields.io/badge/Vite-7.1.7-646cff)

## ✨ Features

### 🛒 Shopping Experience
- **Menu Browsing**: Browse through a variety of food items (Pizza, Burgers, Drinks, Desserts)
- **Search & Filter**: Search menu items and filter by category and price range
- **Quick View**: View detailed item information in a modal
- **Cart Management**: Add, remove, and update quantities in the cart
- **Favorites**: Save your favorite items for quick access
- **Recently Viewed**: See your recently viewed items

### 📦 Order Management
- **Order Placement**: Complete order form with delivery details
- **Form Validation**: Comprehensive validation for all delivery fields
- **Promo Codes**: Apply discount codes (SAVE10, SAVE20, FLAT400, etc.)
- **Order History**: View all your past orders
- **Order Tracking**: Real-time order status tracking with timeline
- **Order Details**: View complete order information and delivery address

### 🎨 User Interface
- **Modern Design**: Beautiful, modern UI with smooth animations
- **Responsive**: Fully responsive design for all devices
- **Dark/Light Theme**: Clean, professional color scheme
- **Toast Notifications**: User-friendly notifications for actions
- **Loading States**: Visual feedback during order processing

## 🚀 Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/VickyNarvare/Advance-Food-Ordering-App.git
   cd Advance-Food-Ordering-App
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:5173` (or the port shown in terminal)

### Build for Production

```bash
npm run build
```

The production build will be in the `dist` folder.

### Preview Production Build

```bash
npm run preview
```

## 📁 Project Structure

```
src/
├── components/          # Reusable components
│   ├── CartPanel.jsx   # Shopping cart side panel
│   ├── Footer.jsx      # Footer component
│   ├── Header.jsx      # Navigation header
│   ├── MenuItem.jsx    # Menu item card
│   ├── QuickViewModal.jsx  # Product quick view
│   └── Toast.jsx       # Toast notifications
├── context/            # React Context
│   └── AppContext.jsx  # Global state management
├── data/               # Data files
│   └── menuItems.js    # Menu items and promo codes
├── pages/              # Page components
│   ├── Home.jsx        # Main menu page
│   ├── Order.jsx       # Checkout page
│   ├── Orders.jsx      # Order history
│   └── Track.jsx       # Order tracking
├── utils/              # Utility functions
│   └── helpers.js      # Helper functions
├── App.jsx             # Main app component
├── main.jsx            # Entry point
└── index.css           # Global styles
```

## 🎯 Key Features Explained

### Cart Management
- Add items to cart with quantity management
- Persistent cart using localStorage
- Real-time cart total calculation
- Cart panel with slide-in animation

### Order Tracking
- Visual timeline showing order progress
- Status updates: Order Placed → Preparing → Ready → On the Way → Delivered
- Estimated delivery time calculation
- Order details with delivery address

### Form Validation
- **Full Name**: Required, min 2 characters, letters only
- **Phone**: Required, 10-15 digits, valid format
- **Email**: Optional, valid email format if provided
- **Address**: Required, min 10 characters
- **City**: Required, min 2 characters, letters only
- **Zip Code**: Required, 5-6 digits format

### Promo Codes
Available promo codes:
- `SAVE10` - 10% discount
- `SAVE20` - 20% discount
- `FLAT400` - ₹400 flat discount
- `FIRST` - 15% discount
- `WEEKEND20` - 20% discount
- `HAPPY15` - 15% discount
- `FIRST100` - 100% discount

## 🛠️ Technologies Used

- **React 19.1.1** - UI library
- **React Router DOM 7.9.5** - Routing
- **Tailwind CSS 4.1.17** - Styling
- **Vite 7.1.7** - Build tool
- **Boxicons** - Icons
- **Poppins Font** - Typography

## 📱 Responsive Design

The app is fully responsive and works seamlessly on:
- 📱 Mobile devices (320px+)
- 📱 Tablets (768px+)
- 💻 Desktops (1024px+)
- 🖥️ Large screens (1440px+)

## 🎨 Design Features

- Gradient buttons and text
- Smooth animations and transitions
- Hover effects on interactive elements
- Custom scrollbar styling
- Loading skeletons
- Toast notifications
- Modal overlays

## 📦 Data Storage

The app uses **localStorage** to persist:
- Shopping cart
- Favorite items
- Recently viewed items
- Order history

## 🔧 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## 📝 License

This project is open source and available under the MIT License.

## 👨‍💻 Author

**Vicky Narvare**

- GitHub: [@VickyNarvare](https://github.com/VickyNarvare)
- Repository: [Advance-Food-Ordering-App](https://github.com/VickyNarvare/Advance-Food-Ordering-App)

## 🙏 Acknowledgments

- Images from Unsplash
- Icons from Boxicons
- Fonts from Google Fonts

## 🚧 Future Enhancements

- [ ] User authentication
- [ ] Payment gateway integration
- [ ] Real-time order updates
- [ ] Restaurant admin panel
- [ ] Multiple restaurant support
- [ ] Reviews and ratings
- [ ] Push notifications
- [ ] Dark mode toggle

---

Made with ❤️ using React and Tailwind CSS
