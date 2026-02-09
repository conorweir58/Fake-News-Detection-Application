import { Link } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';

function Navbar()  {

  const { isAuth } = useAuth(); // Custom hook checks if a user is authenticated in backend and returns auth status

  return (
    <nav className="navbar">
      <div><Link to="/">Home</Link></div>
      {isAuth ? (
        <div><Link to="/logout">Logout</Link></div>
      ) : (
        <div>
          <div><Link to="/register">Register</Link></div>
          <div><Link to="/login">Login</Link></div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;