import { useContext, useState } from "react";
import { CartContext } from "../../context/CartContext";
import { Link } from "react-router-dom";
import "../Css/Navbar.css";

function Navbar() {
  const { cart, setSearchTerm } = useContext(CartContext);
  const [input, setInput] = useState("");

  const handleSearch = (e) => {
    e.preventDefault();
    setSearchTerm(input); // store search text in context
  };

  return (
    <nav className="navbar">
      <Link to="/" className="logo">FakeStore Shop</Link>

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

      {/* CART BUTTON */}
      <Link to="/cart" className="cart-btn">
        🛒 Cart <span className="cart-count">{cart.length}</span>
      </Link>
    </nav>
  );
}

export default Navbar;
