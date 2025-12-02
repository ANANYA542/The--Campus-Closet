import { Routes, Route } from "react-router-dom";
import "./App.css";

import NavBar from "./components/NavBar.jsx";
import Home from "./pages/Home.jsx";
import Login from "./pages/Login.jsx";
import Signup from "./pages/Signup.jsx";
import ForgotPassword from "./pages/ForgotPassword.jsx";
import ResetPassword from "./pages/ResetPassword.jsx";
import Profile from './pages/Profile.jsx';
import Cart from './pages/Cart.jsx';
import Shop from './pages/Shop.jsx';
import SellerDashboard from "./pages/SellerDashboard";
import BuyerDashboard from "./pages/BuyerDashboard";
import ProductListings from "./pages/ProductListings";
import ProductDetail from "./pages/ProductDetail";
import NewArrivals from "./pages/NewArrivals";
import ChatLayout from "./components/chat/ChatLayout.jsx";
import CategoryPage from "./pages/CategoryPage";
import RentPage from "./pages/RentPage";
import CheckoutPage from "./pages/CheckoutPage";
import OrderSuccessPage from "./pages/OrderSuccessPage";
import OrdersPage from "./pages/OrdersPage";
// AddItem page is not present; removing import to fix Vite error

function App() {
  return (
    <>
      <NavBar />
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        {/* Buyer Routes */}
        <Route path="/buyer/dashboard" element={<BuyerDashboard />} />
        <Route path="/products" element={<ProductListings />} />
        <Route path="/new-arrivals" element={<NewArrivals />} />
        <Route path="/category/:slug" element={<CategoryPage />} />
        <Route path="/rent/:itemId" element={<RentPage />} />
        <Route path="/products/:id" element={<ProductDetail />} />
        <Route path="/checkout/:itemId" element={<CheckoutPage />} />
        <Route path="/order-success" element={<OrderSuccessPage />} />
        <Route path="/orders" element={<OrdersPage />} />

        {/* Seller Routes */}
        <Route path="/seller/dashboard" element={<SellerDashboard />} />
        {/* Seller add-item route removed until page exists */}

        {/* Password Reset */}
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/chat" element={<ChatLayout />} />
      </Routes>
    </>
  );
}

export default App;
