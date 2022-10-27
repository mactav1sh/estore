import { Routes, Route } from 'react-router-dom';
import AppProviders from './AppProviders';
import Login from './features/authentication/routes/Login';
import Register from './features/authentication/routes/Register';

function App() {
  return (
    <AppProviders>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/" element={<h1 className="font-bold">HOME</h1>} />
        <Route path="*" element={<h1 className="font-bold">NOT FOUND</h1>} />
      </Routes>
    </AppProviders>
  );
}

export default App;
