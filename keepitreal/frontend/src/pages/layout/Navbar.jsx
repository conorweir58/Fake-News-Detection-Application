import { Link } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';

function Navbar()  {

  const { isAuth } = useAuth(); // Custom hook checks if a user is authenticated in backend and returns auth status

  return (
    <nav className="fixed w-full z-20 top-0 start-0 border-b border-default">
        <div className="max-w-7xl grid grid-cols-3 items-center mx-auto p-4">

          {/* Link acts as KeepItREAL title which routes to home page */}
          <div className="flex items-center justify-self-start justify-evenly space-x-3 rtl:space-x-reverse">
            <Link to="/">
              <h1 className="self-center text-heading font-semibold whitespace-nowrap">KeepItREAL</h1>
            </Link>
          </div>

          {/* These links act as normal navigation of the KeepItREAL app */}
          <div className="justify-self-center items-center justify-between hidden w-full md:flex md:w-auto md:order-1">
            <ul className="flex flex-col p-4 md:p-0 mt-4 font-medium border border-default rounded-base md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-neutral-primary">
              <li><Link to="/">Home</Link></li>
              <li><Link to="/about">About</Link></li>
              <li><Link to="/help">Help</Link></li>
              <li><Link to="/contact">Contact Us</Link></li>
            </ul>
          </div>

          {/* These links are for user account actions */}
          <div className="justify-self-end flex md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
            {isAuth ? (
              <div>
                <Link to="/logout">Logout</Link>
              </div>
            ) : (
              <div>
                <Link to="/register">Register</Link>
                <span> | </span>
                <Link to="/login">Login</Link>
              </div>
            )}
          </div>
        </div>
    </nav>
  );
};

export default Navbar;