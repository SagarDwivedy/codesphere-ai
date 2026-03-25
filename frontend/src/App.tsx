import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useAuthStore } from './store/authStore';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Chat from './pages/Chat';
import DSAExplorer from './pages/DSAExplorer';
import CodeExplainer from './pages/CodeExplainer';
import Bookmarks from './pages/Bookmarks';
import NotFound from './pages/NotFound';
import VerifyOTP from './pages/VerifyOTP';

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated } = useAuthStore();
  return isAuthenticated ? <>{children}</> : <Navigate to="/login" />;
};

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
       <Route path="/register" element={<Register />} />
<Route path="/verify-otp" element={<VerifyOTP />} />
<Route path="/login" element={<Login />} />
        <Route path="/chat" element={<ProtectedRoute><Chat /></ProtectedRoute>} />
        <Route path="/dsa" element={<ProtectedRoute><DSAExplorer /></ProtectedRoute>} />
        <Route path="/explain" element={<ProtectedRoute><CodeExplainer /></ProtectedRoute>} />
        <Route path="/bookmarks" element={<ProtectedRoute><Bookmarks /></ProtectedRoute>} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;