import { Routes, Route } from "react-router-dom";
import "./App.css";

import NavBar from "./components/NavBar.jsx";
import Home from "./pages/Home.jsx";
import Login from "./pages/Login.jsx";
import Signup from "./pages/Signup.jsx";
import ForgotPassword from "./pages/ForgotPassword.jsx";
import ResetPassword from "./pages/ResetPassword.jsx";
import Profile from './pages/Profile.jsx';
import SellerDashboard from "./pages/SellerDashboard";
import BuyerDashboard from "./pages/BuyerDashboard";
import ProductListings from "./pages/ProductListings";
import ProductDetail from "./pages/ProductDetail";
import NewArrivals from "./pages/NewArrivals";
import ChatLayout from "./components/chat/ChatLayout.jsx";

function App() {
  return (
    <div>
      <NavBar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/profile" element={<Profile />} />
        
        {/* Buyer Routes */}
        <Route path="/buyer/dashboard" element={<BuyerDashboard />} />
        <Route path="/products" element={<ProductListings />} />
        <Route path="/new-arrivals" element={<NewArrivals />} />
        <Route path="/products/:id" element={<ProductDetail />} />
        
        {/* Seller Routes */}
        <Route path="/seller/dashboard" element={<SellerDashboard />} />

        {/* Auth */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />


        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/chat" element={<ChatLayout />} />
      </Routes>
    </div>
  );
}

export default App;
