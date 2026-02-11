import { Link } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';

function Navbar()  {

  const { isAuth } = useAuth(); // Custom hook checks if a user is authenticated in backend and returns auth status

  return (
    <nav className="fixed w-full z-20 top-0 start-0 border-b border-default shadow-lg">
        <div className="max-w-7xl grid grid-cols-3 items-center mx-auto p-4">

          {/* Link acts as KeepItREAL title which routes to home page */}
          <div className="flex items-center justify-self-start space-x-3">
            <img src="../../../assets/logo.png"/> {/* Placeholder for logo */}
            <h1 className="text-2xl font-bold whitespace-nowrap">
              <Link to="/" className="transition duration-150 ease-in-out hover:drop-shadow-lg">KeepItREAL</Link>
            </h1>
          </div>

          {/* These links act as normal navigation of the KeepItREAL app */}
          <div className="justify-self-center items-center justify-between hidden w-full md:flex md:w-auto md:order-1">
            <ul className="flex flex-col p-4 md:p-0 mt-4 font-medium border border-default rounded-base md:space-x-8 md:flex-row md:mt-0 md:border-0 md:bg-neutral-primary">
              <li className="font-semibold"><Link to="/" className="transition duration-150 ease-in-out hover:text-red-500 hover:drop-shadow-lg active:text-red-600 active:drop-shadow-red-500">Home</Link></li>
              <li className="font-semibold"><Link to="/about" className="transition duration-150 ease-in-out hover:text-red-500 hover:drop-shadow-lg active:text-red-600 active:drop-shadow-red-500">About</Link></li>
              <li className="font-semibold" ><Link to="/help" className="transition duration-150 ease-in-out hover:text-red-500 hover:drop-shadow-lg active:text-red-600 active:drop-shadow-red-500">Help</Link></li>
              <li className="font-semibold"><Link to="/contact" className="transition duration-150 ease-in-out hover:text-red-500 hover:drop-shadow-lg active:text-red-600 active:drop-shadow-red-500">Contact Us</Link></li>
            </ul>
          </div>

          {/* These links are for user account actions */}
          <div className="justify-self-end flex md:order-2 space-x-3 md:space-x-0">
            {isAuth ? (
              <div className="font-semibold">
                <Link to="/logout" className="transition duration-150 ease-in-out hover:text-red-500 hover:drop-shadow-lg active:text-red-600 active:drop-shadow-red-500">Logout</Link>
              </div>
            ) : (
              <div className="font-semibold">
                <Link to="/register" className="transition duration-150 ease-in-out hover:text-red-500 hover:drop-shadow-lg active:text-red-600 active:drop-shadow-red-500">Register</Link>
                <span className="font-light text-gray-500 select-none"> | </span>
                <Link to="/login" className="transition duration-150 ease-in-out hover:text-red-500 hover:drop-shadow-lg active:text-red-600 active:drop-shadow-red-500">Login</Link>
              </div>
            )}
          </div>
        </div>
    </nav>
  );
};

export default Navbar;