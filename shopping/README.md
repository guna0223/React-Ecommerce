# 🛒 VEXO - Premium E-Commerce Shopping Application

A modern, responsive e-commerce web application built with React and Vite. Features a premium Navy & Gold design with a professional look inspired by top e-commerce platforms.

![VEXO Banner](https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1200&q=80)

---

## ✨ Features

- **Modern Premium Design** - Navy (#001F3F) & Gold (#FFD700) color scheme
- **Responsive Layout** - Works seamlessly on desktop, tablet, and mobile
- **Product Catalog** - Browse products with category filtering
- **Search Functionality** - Search products by name
- **Product Details** - Detailed product view with recommendations
- **Shopping Cart** - Add/remove products from cart
- **Wishlist** - Save favorite products
- **Auto-sliding Carousel** - Hero banner with smooth animations

---

## 🛠️ Technologies Used

| Category | Technology |
|----------|------------|
| Framework | React 19 |
| Routing | React Router DOM 7 |
| Build Tool | Vite 7 |
| HTTP Client | Axios |
| Icons | Bootstrap Icons |
| Styling | CSS3 (Custom) |
| API | FakeStoreAPI |

---

## 🚀 Getting Started

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn

### Installation

1. **Clone the repository**
```bash
git clone <repository-url>
cd shopping
```

2. **Install dependencies**
```bash
npm install
```

3. **Start development server**
```bash
npm run dev
```

4. **Build for production**
```bash
npm run build
```

---

## 📁 Project Structure

```
shopping/
├── src/
│   ├── components/
│   │   ├── Css/                 # All CSS files
│   │   │   ├── index.css        # Global styles
│   │   │   ├── Navbar.css       # Navigation styling
│   │   │   ├── Footer.css       # Footer styling
│   │   │   ├── ProductCard.css  # Product cards
│   │   │   ├── Cart.css         # Cart & Wishlist
│   │   │   ├── ProductDetails.css
│   │   │   └── CarouselImages.css
│   │   ├── Navbar/              # Navbar component
│   │   ├── Footer/              # Footer component
│   │   ├── ProducCard/          # Product card component
│   │   └── CarouselImages/      # Hero carousel
│   ├── pages/
│   │   ├── Home.jsx             # Home page
│   │   ├── ProductDetails.jsx   # Product detail page
│   │   ├── Cart.jsx             # Shopping cart
│   │   └── Wishlist.jsx        # Wishlist page
│   ├── context/
│   │   └── CartContext.jsx     # Cart state management
│   ├── service/
│   │   └── api.js              # API functions
│   ├── App.jsx                  # Main app component
│   └── main.jsx                 # Entry point
├── package.json
└── vite.config.js
```

---

## 🔌 API Reference

This project uses [FakeStoreAPI](https://fakestoreapi.com/) - a free REST API for e-commerce prototypes.

### Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/products` | Get all products |
| GET | `/products?limit=X` | Get X products |
| GET | `/products/{id}` | Get product by ID |
| GET | `/products/categories` | Get all categories |
| GET | `/products/category/{name}` | Get products by category |

### Base URL
```
https://fakestoreapi.com
```

---

## 🎨 Design System

### Color Palette

| Color | Hex Code | Usage |
|-------|----------|-------|
| Navy | `#001F3F` | Primary, text, backgrounds |
| Gold | `#FFD700` | Accent, highlights, buttons |
| White | `#FFFFFF` | Backgrounds, cards |
| Light Gray | `#F5F5F5` | Secondary backgrounds |

### Typography
- **Font Family**: Poppins (Google Fonts)
- **Headings**: 700-800 weight
- **Body**: 400-500 weight

### Responsive Breakpoints
| Device | Width |
|--------|-------|
| Desktop | > 992px |
| Tablet | 576px - 992px |
| Mobile | < 576px |

---

## 📱 Pages

### 1. Home Page (`/`)
- Hero carousel with auto-sliding banners
- Product grid with category filters
- Search functionality
- Sort by price (low/high)

### 2. Product Details (`/product/:id`)
- Large product image
- Product title, price, description
- Add to cart / Add to wishlist buttons
- Related products recommendations

### 3. Cart (`/cart`)
- List of added products
- Remove from cart functionality
- Price display in INR

### 4. Wishlist (`/wishlist`)
- Saved favorite products
- Move to cart functionality

---

## 🔧 Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run preview` | Preview production build |
| `npm run lint` | Run ESLint |

---

## 📄 License

This project is for educational purposes. The product data is sourced from FakeStoreAPI.

---

## 🙏 Acknowledgments

- [FakeStoreAPI](https://fakestoreapi.com/) for the product data
- [Bootstrap Icons](https://icons.getbootstrap.com/) for the icon library
- [Unsplash](https://unsplash.com/) for carousel images

---

**Built with ❤️ using React & Vite**
