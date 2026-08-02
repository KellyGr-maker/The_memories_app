import { createContext, useContext, useState } from "react";
import { useEffect } from "react";

const CategoryContext = createContext();

const DEFAULT_CATEGORIES = [
{ id: crypto.randomUUID(), name: "Frisdranken", shortName: "Fris", icon: "🥤" },
{ id: crypto.randomUUID(), name: "Waters", shortName: "Water", icon: "💧" },
{ id: crypto.randomUUID(), name: "Fruitsappen", shortName: "Sap", icon: "🧃" },
{ id: crypto.randomUUID(), name: "Koffie & Thee", shortName: "Koffie", icon: "☕" },

{ id: crypto.randomUUID(), name: "Bieren van 't vat", shortName: "Vat", icon: "🍺" },
{ id: crypto.randomUUID(), name: "Bieren op fles", shortName: "Fles", icon: "🍾" },

{ id: crypto.randomUUID(), name: "Aperitieven", shortName: "Apero", icon: "🍻" },
{ id: crypto.randomUUID(), name: "Jenever", shortName: "Jenever", icon: "🥃" },
{ id: crypto.randomUUID(), name: "Sterke drank", shortName: "Sterke D.", icon: "🥂" },
{ id: crypto.randomUUID(), name: "Mixers", shortName: "Mix", icon: "🧊" },
{ id: crypto.randomUUID(), name: "Whisky", shortName: "Whisky", icon: "🥃" },

{ id: crypto.randomUUID(), name: "Cocktails", shortName: "Cockt.", icon: "🍸" },
{ id: crypto.randomUUID(), name: "Alcoholvrije cocktails", shortName: "0%", icon: "🍹" },
{ id: crypto.randomUUID(), name: "Wijnen & Bubbels", shortName: "Wijn", icon: "🍷" },

{ id: crypto.randomUUID(), name: "Geniet momentjes", shortName: "Hapjes", icon: "🥨" },

{ id: crypto.randomUUID(), name: "Ijsjes", shortName: "Ijs", icon: "🍦" },
{ id: crypto.randomUUID(), name: "Desserts", shortName: "Dessert", icon: "🍰" },
{ id: crypto.randomUUID(), name: "Ontbijt", shortName: "Ontbijt", icon: "🥐" },
];

export function CategoryProvider({ children }) {
  const [categories, setCategories] = useState(() => {
  const saved = localStorage.getItem("categories");

  if (saved) {
    return JSON.parse(saved);
  }

  return DEFAULT_CATEGORIES;
});
useEffect(() => {
  localStorage.setItem(
    "categories",
    JSON.stringify(categories)
  );
}, [categories]);
  function addCategory(category) {
    setCategories((prev) => [
      ...prev,
      {
        id: crypto.randomUUID(),
        ...category,
      },
    ]);
  }

  function updateCategory(id, data) {
    setCategories((prev) =>
      prev.map((cat) =>
        cat.id === id ? { ...cat, ...data } : cat
      )
    );
  }

  function deleteCategory(id) {
    setCategories((prev) =>
      prev.filter((cat) => cat.id !== id)
    );
  }

  return (
    <CategoryContext.Provider
      value={{
        categories,
        addCategory,
        updateCategory,
        deleteCategory,
      }}
    >
      {children}
    </CategoryContext.Provider>
  );
}

export function useCategories() {
  return useContext(CategoryContext);
}