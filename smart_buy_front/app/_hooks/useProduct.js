import { useEffect, useState } from "react";
import { getProducts } from "../_actions/product";

export function useProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [refreshKey, setRefreshKey] = useState(0);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const productData = await getProducts();

        setProducts(productData);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [refreshKey]);

  const refreshProducts = () => setRefreshKey((prev) => prev + 1);


  return { products, loading, error, refreshProducts };
}
