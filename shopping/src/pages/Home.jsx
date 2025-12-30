import { useState, useEffect } from "react";
import axios from "axios";
import ProductCard from "../components/ProducCard/ProductCard";

function Home() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [filter, setFilter] = useState("all");
  const [sort, setSort] = useState("");

  useEffect(() => {
    axios.get("https://fakestoreapi.com/products").then(res => setProducts(res.data));
    axios.get("https://fakestoreapi.com/products/categories").then(res => setCategories(res.data));
  }, []);

  const filteredProducts =
    filter === "all" ? products : products.filter(p => p.category === filter);

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sort === "low") return a.price - b.price;
    if (sort === "high") return b.price - a.price;
    return 0;
  });

  return (
    <div className="p-4">
      {/* Filter & Sort */}
      <div className="flex gap-4 mb-6">
        <select onChange={(e) => setFilter(e.target.value)} className="border p-2 rounded-xl">
          <option value="all">All</option>
          {categories.map(cat => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>

        <select onChange={(e) => setSort(e.target.value)} className="border p-2 rounded-xl">
          <option value="">Sort By</option>
          <option value="low">Price: Low to High</option>
          <option value="high">Price: High to Low</option>
        </select>
      </div>

      {/* Products */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {sortedProducts.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}
export default Home;
