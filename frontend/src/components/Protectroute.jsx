import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';

const ProtectRoute = ({ children, isPublic = false, redirectTo }) => {
  const { user } = useSelector((state) => state.auth);

  if (isPublic) {
    return user ? <Navigate to={redirectTo} /> : children;
  }

  return user ? children : <Navigate to={redirectTo} />;
};

ProtectRoute.propTypes = {
  children: PropTypes.node.isRequired,
  isPublic: PropTypes.bool,
  redirectTo: PropTypes.string.isRequired,
};

export default ProtectRoute;
