import { useContext, useState, useEffect } from "react";
import { CartContext } from "../../context/CartContext";
import { Link } from "react-router-dom";
import axios from "axios";
import "bootstrap-icons/font/bootstrap-icons.css";
import "../Css/Navbar.css";

function Navbar() {
  const { cart, setSearchTerm, wishlist, selectedCategory, setSelectedCategory, sortOption, setSortOption } = useContext(CartContext);
  const [input, setInput] = useState("");
  const [categories, setCategories] = useState([]);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    axios.get("https://fakestoreapi.com/products/categories")
      .then(res => setCategories(res.data));
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    setSearchTerm(input);
  };

  return (
    <nav className="navbar">
      <div className="navbar-left">
        <Link to="/" className="logo">FAKE<span>STORE</span></Link>
      </div>

      {/* SEARCH BAR */}
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

      {/* FILTER & SORT - Desktop */}
      <div className="filter-sort-container">
        <div className="custom-select">
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

        <div className="custom-select">
          <select 
            value={sortOption} 
            onChange={(e) => setSortOption(e.target.value)}
          >
            <option value="">Sort By</option>
            <option value="low">Price: Low → High</option>
            <option value="high">Price: High → Low</option>
          </select>
        </div>
      </div>

      {/* NAVIGATION BUTTONS */}
      <div className="nav-buttons">
        <Link to="/wishlist" className="wishlist-btn-nav">
          <i className="bi bi-heart"></i>
          <span className="wishlist-count">{wishlist.length}</span>
        </Link>
        <Link to="/cart" className="cart-btn">
          <i className="bi bi-cart3"></i>
          <span className="cart-count">{cart.length}</span>
        </Link>
      </div>

      {/* Mobile Menu Toggle */}
      <button className="mobile-menu-btn" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
        <i className={`bi ${mobileMenuOpen ? 'bi-x-lg' : 'bi-list'}`}></i>
      </button>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="mobile-menu">
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
          <div className="mobile-nav-links">
            <Link to="/wishlist" onClick={() => setMobileMenuOpen(false)}>
              <i className="bi bi-heart"></i>
              Wishlist ({wishlist.length})
            </Link>
            <Link to="/cart" onClick={() => setMobileMenuOpen(false)}>
              <i className="bi bi-cart3"></i>
              Cart ({cart.length})
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
