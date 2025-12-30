import { useContext } from "react";
import { CartContext } from "../../context/CartContext";
import "../Css/ProductCard.css"

function ProductCard({ product }) {
  const { addToCart } = useContext(CartContext);

  return (
    <div className="product-card">
      <img src={product.image} alt={product.title} />
      <h2 className="title">{product.title}</h2>
      <p className="price">${product.price}</p>
      <button onClick={() => addToCart(product)}>Add to Cart</button>
    </div>
  );
}

export default ProductCard;
