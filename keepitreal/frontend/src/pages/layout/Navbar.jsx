import { Link } from 'react-router-dom';

function Navbar()  {
  return (
    <nav className="navbar">
        <div><Link to="/">Home</Link></div>
        <div><Link to="/login">Login</Link></div>
        <div><Link to="/register">Register</Link></div>
        <div><Link to="/logout">Logout</Link></div>
    </nav>
  );
};

export default Navbar;