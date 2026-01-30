import { useContext } from "react";
import { Link } from "react-router-dom";
import { CartContext } from "../../context/CartContext";
import "../Css/ProductCard.css"

function ProductCard({ product }) {
  const { addToCart } = useContext(CartContext);

  return (
    <div className="product-card">
      <Link to={`/product/${product.id}`}>
        <img src={product.image} alt={product.title} className="product-image" />
      </Link>

      <Link to={`/product/${product.id}`} className="card-title-link">
        <h2 className="product-title">{product.title}</h2>
      </Link>
      <p className="product-price">${product.price.toFixed(2)}</p>
      <button onClick={() => addToCart(product)} className="add-to-cart-btn">Add to Cart</button>
    </div>
  );
}

export default ProductCard;
