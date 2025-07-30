import { useEffect } from 'react';
import './App.css';
import { Navigate, Route, Routes } from 'react-router-dom';
import Login_SignUp_Page from './pages/Login_SignUp_Page';
import { Toaster } from 'react-hot-toast';
import Navbar from './components/Navbar';
import { authStore } from './store/authStore';
import { Loader } from 'lucide-react';
import AdminPage from './pages/AdminPage';
import AgentPage from './pages/AgentPage';

function App() {
  const { checkAuth, isCheckingAuth, authUser,userData } = authStore();

  useEffect(() => {
    checkAuth();
  }, []);

  // console.log(userData)
  if (isCheckingAuth) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader className="w-10 h-10 animate-spin text-blue-500" />
      </div>
    );
  }

  return (
    <div>
      <Routes>
        <Route
          path="/"
          element={
            authUser === 'user' ? (
              <>
                <Navbar />
                <AgentPage />
              </>
            ) : authUser === 'admin' ? (
              <>
                <Navbar />
                <AdminPage />
              </>
            ) : (
              <Navigate to="/login" />
            )
          }
        />
        <Route
          path="/login"
          element={!authUser ? <Login_SignUp_Page /> : <Navigate to="/" />}
        />
      </Routes>

      <Toaster />
    </div>
  );
}

export default App;
