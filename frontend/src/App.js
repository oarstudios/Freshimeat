import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";

// User Components
import Navbar from "./component/Navbar/Navbar";
import SliderComponent from "./component/Slider/SliderComponent";
import CategorySection from "./component/CategorySection/CategorySection";
import BestSellers from "./component/BestSellers/BestSellers";
import ShopByPrice from "./component/ShopByPrice/ShopByPrice";
import FlashDeal from "./component/FlashDeal/FlashDeal";
import DealOfTheDay from "./component/DealOfTheDay/DealOfTheDay";
import AboutUs from "./component/AboutUs/AboutUs";
import Footer from "./component/Footer/Footer";

// Admin Components
import AdminNavbar from "./component/Admin/AdminNavbar"; 
import AdminProducts from "./component/Admin/AdminProducts";
import AddNewProduct from "./component/Admin/AddNewProduct";
import EditAdminProducts from "./component/Admin/EditAdminProducts";
import AdminOrders from "./component/Admin/AdminOrders";
import AdminCustomersDetails from "./component/Admin/AdminCustomersDetails";
import AdminDashboard from "./component/Admin/AdminDashboard";
import QuickPricing from "./component/Admin/QuickPricing";
import DeliveryPricing from "./component/Admin/DeliveryPricing";
import Creatives from "./component/Admin/Creatives";

// Product Page Components
import MainProductPage from "./component/MainProductPage/MainProductPage";

// Scroll to Top Component
import ScrollToTop from "./component/ScrollToTop"; 
import Checkout from "./component/Checkout/Checkout";
import MyAccount from "./component/MyAccount/MyAccount";
import OrderSection from "./component/OrderSection/OrderSection";
import CategoryFull from "./component/CategorySection/CategoryFull";

function App() {
  return (
    <Router>
      <ScrollToTop /> {/* Ensure Scroll to Top applies globally */}
      <div className="App">
        <Routes>
          {/* User Routes */}
          <Route
            path="/"
            element={
              <>
                <Navbar />
                <div className="comps">
                  <SliderComponent />
                  <CategorySection />
                  <BestSellers />
                  <ShopByPrice />
                  <FlashDeal />
                  <DealOfTheDay />
                  <AboutUs />
                </div>
                <Footer />
              </>
            }
          />

          {/* Product Details Page */}
          <Route
            path="/product"
            element={
              <>
                <Navbar />
                <div className="comps">
                  <MainProductPage />
                </div>
                <Footer />
              </>
            }
          />

<Route
  path="/checkout"
  element={
    <>
      <Navbar />
      <div className="comps">
        <Checkout />
      </div>
      <Footer />
    </>
  }
/>
<Route
  path="/myaccount"
  element={
    <>
      <Navbar />
      <div className="comps">
        <MyAccount />
      </div>
      <Footer />
    </>
  }
/>
<Route
  path="/order"
  element={
    <>
      <Navbar />
      <div className="comps">
        <OrderSection />
      </div>
      <Footer />
    </>
  }
/>
<Route
  path="/category"
  element={
    <>
      <Navbar />
      <div className="comps">
        <CategoryFull/>
      </div>
      <Footer />
    </>
  }
/>
          {/* Admin Routes */}
          <Route
            path="/admin/*"
            element={
              <>
                <AdminNavbar />
                <Routes>
                  <Route path="products" element={<AdminProducts />} />
                  <Route path="add-product" element={<AddNewProduct />} />
                  <Route path="edit-product" element={<EditAdminProducts />} />
                  <Route path="customer-orders" element={<AdminOrders />} />
                  <Route path="customers" element={<AdminCustomersDetails />} />
                  <Route path="" element={<AdminDashboard />} />
                  <Route path="quick-pricing" element={<QuickPricing />} />
                  <Route path="delivery-pricing" element={<DeliveryPricing />} />
                  <Route path="creatives" element={<Creatives />} />
                </Routes>
              </>
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
