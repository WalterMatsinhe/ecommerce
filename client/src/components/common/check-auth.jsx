import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const CheckAuth = ({ children }) => {
  const { isAuthenticated, checkingAuth } = useSelector(state => state.auth);

  // ✅ Wait for checkAuth to complete
  if (checkingAuth) {
    return <div>Loading...</div>;
  }

  // ✅ Only redirect if truly unauthenticated AFTER checkAuth
  if (!isAuthenticated) {
    return <Navigate to="/auth/login" />;
  }

  return children;
};

export default CheckAuth;
