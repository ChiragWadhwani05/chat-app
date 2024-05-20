import { Navigate, Outlet } from 'react-router-dom';
import PropTypes from 'prop-types';

const ProtectRoute = ({ children, user, redirect = '/signin' }) => {
  if (!user) return <Navigate to={redirect} />;

  return children ? children : <Outlet />;
};

ProtectRoute.propTypes = {
  children: PropTypes.node.isRequired,
  user: PropTypes.bool,
  redirect: PropTypes.string,
};

export default ProtectRoute;
