import { Routes, Route } from 'react-router-dom';
import AppProviders from './AppProviders';
import Login from './features/authentication/routes/Login';
import Register from './features/authentication/routes/Register';
import Product from './features/products/routes/Product';
import Products from './features/products/routes/Products';
import Cart from './features/cart/routes/Cart';
import Home from './features/misc/routes/Home';
import ProtectedRoute from './lib/Authorization';
import Header from './components/layout/Header/Header';
import Footer from './components/layout/Footer/Footer';
import OrderConfirmation from './features/Orders/routes/OrderConfirmation';

function App() {
  return (
    <AppProviders>
      <Header />
      <Routes>
        {/* AUTH */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        {/* PRODUCTS */}
        <Route path="/products" element={<Products />} />
        <Route path="/products/:productId" element={<Product />} />
        {/* HOME */}
        <Route path="/" element={<Home />} />
        {/* CART */}
        <Route path="/cart" element={<ProtectedRoute path="/login" />}>
          <Route path="/cart" element={<Cart />} />
        </Route>
        {/* ORDER */}
        <Route path="/order" element={<ProtectedRoute path="/login" />}>
          <Route path="/order" element={<OrderConfirmation />} />
        </Route>
        {/* NOT FOUND */}
        <Route path="*" element={<h1 className="font-bold">NOT FOUND</h1>} />
      </Routes>
      <Footer />
    </AppProviders>
  );
}

export default App;
