import { Link } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';

function Navbar()  {

  const { isAuth } = useAuth(); // Custom hook checks if a user is authenticated in backend and returns auth status

  return (
    <div>
      <nav className="bg-neutral-100 border-b border-default">
        <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl p-4">
            <h1 className="text-xl font-bold">KeepItREAL</h1>

            {/* Uses the custom useAuth hook to get the auth status - show login or register on not logged in (not auth) or logout if logged in */}
            {isAuth ? (
              <div><Link to="/logout">Logout</Link></div>
            ) : (
              <div className="flex items-center space-x-4 rtl:space-x-reverse">
                <Link to="/register">Register</Link>
                <span>|</span>
                <Link to="/login">Login</Link>
              </div>
            )}

        </div>
      </nav>

      <nav className="bg-neutral-50 border-y border-default border-default">
        <div className="max-w-screen-xl px-4 py-3 mx-auto">
          <div className="flex items-center">

            {/* Maybe change/add diff sections of website - just have these for now while creating */}
            <ul className="flex flex-row font-medium mt-0 space-x-8 rtl:space-x-reverse text-sm">
              <li>
                  <div className="text-heading"><Link to="/">Submission</Link></div>
              </li>
              <li>
                  <div className="text-heading"><Link to="/">About</Link></div>
              </li>
              <li>
                  <div className="text-heading"><Link to="/">Credits</Link></div>
              </li>
              <li>
                  <div className="text-heading"><Link to="/history">History</Link></div>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;