import { useContext, useState, useEffect } from "react";
import { CartContext } from "../../context/CartContext";
import { Link } from "react-router-dom";
import { getAllCategories } from "../../service/api";
import "bootstrap-icons/font/bootstrap-icons.css";
import "../Css/Navbar.css";

function Navbar() {
  const { cartCount, setSearchTerm, wishlist, selectedCategory, setSelectedCategory, sortOption, setSortOption } = useContext(CartContext);
  const [input, setInput] = useState("");
  const [categories, setCategories] = useState([]);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [ordersCount, setOrdersCount] = useState(0);

  useEffect(() => {
    getAllCategories()
      .then(data => setCategories(data))
      .catch(err => console.error("Error:", err));
      
    const savedOrders = JSON.parse(localStorage.getItem('vexo_orders') || '[]');
    setOrdersCount(savedOrders.length);
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    setSearchTerm(input);
  };

  return (
    <nav className="navbar">
      {/* Logo */}
      <div className="navbar-left">
        <Link to="/" className="logo">
          <span className="v">V</span><span className="exo">EXO</span>
        </Link>
      </div>

      {/* Search Bar - Desktop */}
      <form onSubmit={handleSearch} className="search-bar">
        <input
          type="text"
          placeholder="Search for products..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button type="submit" className="search-btn">
          <i className="bi bi-search"></i>
        </button>
      </form>

      {/* Nav Icons - Right */}
      <div className="nav-buttons">
        <Link to="/orders" className="nav-icon-btn" title="Orders">
          <i className="bi bi-bag-check"></i>
          {ordersCount > 0 && <span className="count">{ordersCount}</span>}
        </Link>
        <Link to="/wishlist" className="nav-icon-btn" title="Wishlist">
          <i className="bi bi-heart"></i>
          {wishlist.length > 0 && <span className="count">{wishlist.length}</span>}
        </Link>
        <Link to="/cart" className="nav-icon-btn" title="Cart">
          <i className="bi bi-cart3"></i>
          {cartCount > 0 && <span className="count">{cartCount}</span>}
        </Link> 
      </div>

      {/* Mobile Menu Toggle */}
      <button className="mobile-menu-btn" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
        <i className={`bi ${mobileMenuOpen ? 'bi-x-lg' : 'bi-list'}`}></i>
      </button>

      {/* Mobile Menu Dropdown */}
      <div className={`mobile-menu ${mobileMenuOpen ? 'active' : ''}`}>
        {/* Mobile Search */}
        <form onSubmit={handleSearch} className="search-bar">
          <input
            type="text"
            placeholder="Search products..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <button type="submit" className="search-btn">
            <i className="bi bi-search"></i>
          </button>
        </form>

        {/* Mobile Filter Section */}
        <div className="mobile-filter-section">
          <label>Category</label>
          <select 
            value={selectedCategory} 
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            <option value="all">All Categories</option>
            {categories.map(cat => (
              <option key={cat} value={cat}>
                {cat.charAt(0).toUpperCase() + cat.slice(1)}
              </option>
            ))}
          </select>
        </div>
        <div className="mobile-filter-section">
          <label>Sort By</label>
          <select 
            value={sortOption} 
            onChange={(e) => setSortOption(e.target.value)}
          >
            <option value="">Sort By</option>
            <option value="low">Price: Low → High</option>
            <option value="high">Price: High → Low</option>
          </select>
        </div>
        
        {/* Mobile Nav Links */}
        <div className="mobile-nav-links">
          <Link to="/orders" onClick={() => setMobileMenuOpen(false)}>
            <i className="bi bi-bag-check"></i>
            Orders ({ordersCount})
          </Link>
          <Link to="/wishlist" onClick={() => setMobileMenuOpen(false)}>
            <i className="bi bi-heart"></i>
            Wishlist ({wishlist.length})
          </Link>
          <Link to="/cart" onClick={() => setMobileMenuOpen(false)}>
            <i className="bi bi-cart3"></i>
            Cart ({cartCount})
          </Link>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
