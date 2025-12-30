import { useContext } from "react";
import { CartContext } from "../context/CartContext";

function Cart() {
  const { cart, removeFromCart } = useContext(CartContext);

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Your Cart</h2>
      {cart.length === 0 && <p>Cart is empty 😢</p>}

      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {cart.map(item => (
          <div key={item.id} className="border p-4 rounded-2xl shadow-md">
            <img src={item.image} className="h-32 mx-auto object-contain"/>
            <h3 className="text-sm mt-2 line-clamp-2">{item.title}</h3>
            <p className="font-bold">${item.price}</p>
            <button
              onClick={() => removeFromCart(item.id)}
              className="w-full bg-red-600 text-white py-2 mt-3 rounded-xl hover:opacity-90"
            >
              Remove
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
export default Cart;
