import { Link } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';
import logo from '../../assets/KeepItREAL_Icon.png';
import { linkClasses } from '../../styles/tailwindConstants';

function Navbar()  {

  const { isAuth } = useAuth(); // Custom hook checks if a user is authenticated in backend and returns auth status

  return (
    <nav className="bg-neutral-100 dark:bg-slate-900 fixed w-full z-50 top-0 start-0 border-b border-default dark:border-b-slate-800 shadow-lg">
        <div className="grid grid-cols-3 items-center mx-auto p-4">

          {/* Link acts as KeepItREAL title which routes to home page */}
          <div className="flex items-center justify-self-start space-x-3">
            <Link to="/"><img src={logo} alt="KeepItREAL Logo" className="h-8 w-auto rounded-md object-contain"/></Link>
            <h1 className="text-2xl font-bold whitespace-nowrap">
              <Link to="/" className="transition duration-150 ease-in-out hover:drop-shadow-lg">KeepItREAL</Link>
            </h1>
          </div>

          {/* These links act as normal navigation of the KeepItREAL app */}
          <div className="justify-self-center items-center justify-between hidden md:flex md:order-1">
            <ul className="flex flex-col p-4 md:p-0 mt-4 font-medium border border-default rounded-base md:space-x-8 md:flex-row md:mt-0 md:border-0 md:bg-neutral-primary">
              <li className="font-semibold"><Link to="/" className={linkClasses}>Submission</Link></li>
              <li className="font-semibold"><Link to="/about" className={linkClasses}>About</Link></li>
              <li className="font-semibold" ><Link to="/help" className={linkClasses}>Help</Link></li>
              <li className="font-semibold"><Link to="/contact" className={linkClasses}>Contact Us</Link></li>
              <li className="font-semibold"><Link to="/history" className={linkClasses}>History</Link></li>
            </ul>
          </div>

          {/* These links are for user account actions - Maybe change to user icon with account options below like delete, history, account details, etc. */}
          <div className="justify-self-end items-center flex md:order-2 space-x-3 md:space-x-0">
            {isAuth ? (
              <div className="font-semibold">
                <Link to="/logout" className={linkClasses}>Logout</Link>
              </div>
            ) : (
              <div className="font-semibold">
                <Link to="/register" className={linkClasses}>Register</Link>
                <span className="font-light text-gray-500 select-none"> | </span>
                <Link to="/login" className={linkClasses}>Login</Link>
              </div>
            )}
          </div>
        </div>
    </nav>
  );
};

export default Navbar;