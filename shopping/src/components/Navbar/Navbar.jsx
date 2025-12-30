import { useContext } from "react";
import { CartContext } from "../../context/CartContext";
import { Link } from "react-router-dom";
import "../Css/Navbar.css"

function Navbar() {
  const { cart } = useContext(CartContext);

  return (
    <nav className="navbar">
      <Link to="/" className="logo">FakeStore Shop</Link>

      <Link to="/cart" className="cart-btn">
        🛒 Cart <span className="cart-count">{cart.length}</span>
      </Link>
    </nav>
  );
}

export default Navbar;
