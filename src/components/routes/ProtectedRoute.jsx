import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  const { user } = useSelector((state) => state.user);

  return user ? children : Navigate('/login');
};

export default ProtectedRoute;
