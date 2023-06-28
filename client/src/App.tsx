import { Routes, Route } from 'react-router-dom';
import AppProviders from './AppProviders';
import { Login, Register } from './features/authentication';
import { Product, Products } from './features/products';
import { Cart } from './features/cart';
import { Home } from './features/misc';
import { Footer, Header } from './components';
import { OrderConfirmationForm } from './features/Orders';
import ProtectedRoute from './lib/Authorization';

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
          <Route path="/order" element={<OrderConfirmationForm />} />
        </Route>
        {/* NOT FOUND */}
        <Route path="*" element={<h1 className="font-bold">NOT FOUND</h1>} />
      </Routes>
      <Footer />
    </AppProviders>
  );
}

export default App;
