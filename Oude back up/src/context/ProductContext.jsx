import { createContext, useContext, useEffect, useState } from "react";
import initialProducts from "../data/products";

const ProductContext = createContext();

export function ProductProvider({ children }) {
  const [products, setProducts] = useState(() => {
    const saved = localStorage.getItem("products");

    return saved ? JSON.parse(saved) : initialProducts;
  });

  useEffect(() => {
    localStorage.setItem("products", JSON.stringify(products));
  }, [products]);

  const addProduct = (product) => {
    setProducts((prev) => [
      ...prev,
      {
        id: Date.now().toString(),
        favorite: false,
        ...product,
      },
    ]);
  };

  const updateProduct = (id, updates) => {
    setProducts((prev) =>
      prev.map((product) =>
        product.id === id
          ? {
              ...product,
              ...updates,
            }
          : product
      )
    );
  };

  const deleteProduct = (id) => {
    setProducts((prev) =>
      prev.filter((product) => product.id !== id)
    );
  };

  const toggleFavorite = (id) => {
    setProducts((prev) =>
      prev.map((product) =>
        product.id === id
          ? {
              ...product,
              favorite: !product.favorite,
            }
          : product
      )
    );
  };
    return (
    <ProductContext.Provider
      value={{
        products,
        addProduct,
        updateProduct,
        deleteProduct,
        toggleFavorite,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
}

export function useProducts() {
  return useContext(ProductContext);
}