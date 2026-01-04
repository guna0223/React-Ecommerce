import { useContext } from "react";
import { CartContext } from "../../context/CartContext";
import "../Css/ProductCard.css"

function ProductCard({ product }) {
  const { addToCart } = useContext(CartContext);

  return (
    <div className="product-card">
      <Link to={`/product/${product.id}`}>
        <img src={product.image} alt={product.title} className="h-40 mx-auto object-contain" />
      </Link>

      <Link to={`/product/${product.id}`} className="card-title-link">
        <h2 className="text-sm mt-3 line-clamp-2">{product.title}</h2>
      </Link>
      <p className="price">${product.price}</p>
      <button onClick={() => addToCart(product)}>Add to Cart</button>
    </div>
  );
}

export default ProductCard;
