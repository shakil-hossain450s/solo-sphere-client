import { useContext } from 'react';
import AuthContext from '../contexts/AuthContext';
import { Navigate, useLocation } from 'react-router';
import Loader from '../components/Loader';

const PrivateRoutes = ({ children }) => {
  const { user, loading } = useContext(AuthContext);
  const location = useLocation();

  if (loading) {
    return <Loader />
  }

  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />
  }

  return children;
};

export default PrivateRoutes;