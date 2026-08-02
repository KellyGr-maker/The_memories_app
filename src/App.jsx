import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import LoginPage from "./pages/Login/LoginPage";
import DashboardPage from "./pages/Dashboard/DashboardPage";
import TablesPage from "./pages/Tables/TablesPage";
import OrderPage from "./pages/Orders/OrderPage";
import BarPage from "./pages/Bar/BarPage";

import ProductsPage from "./pages/Products/ProductsPage";
import CategoriesPage from "./pages/Categories/CategoriesPage";
import FavoritesPage from "./pages/Favorites/FavoritesPage";
import SettingsPage from "./pages/Settings/SettingsPage";


export default function App() {
  return(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<LoginPage />} />

      <Route path="/dashboard" element={<DashboardPage />} />

      <Route path="/tables/:zone" element={<TablesPage />} />

      <Route path="/order/:orderId" element={<OrderPage />} />

      <Route path="/bar" element={<BarPage />} />

      <Route path="/products" element={<ProductsPage />} />

      <Route path="/categories" element={<CategoriesPage />} />

      <Route path="/favorites" element={<FavoritesPage />} />

      <Route path="/settings" element={<SettingsPage />} />

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  </BrowserRouter>
);
}