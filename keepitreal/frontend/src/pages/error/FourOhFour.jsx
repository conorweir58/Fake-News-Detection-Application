import { Link } from 'react-router-dom';
import { cardClasses } from '../../styles/tailwindConstants';

function FourOhFour(){

    return(
        <div className="p-8 md:p-20">
            <div className={`${cardClasses}`}>
                <h2 className="font-bold text-3xl pb-4 text-red-600">ERROR 404</h2>
                <h3 className="font-bold text-xl pb-2">Uh Oh! This page doesn't seem to exist :(</h3>
                <p className="text-gray-600 dark:text-gray-400 pb-4">It is possible the page address was entered incorrectly or that the page no longer exists or has been moved to a different address.</p>
                <p className="text-gray-600 dark:text-gray-400 p-2">If you would like to return to the submission page, <Link to="/" className="text-blue-500">Click Here!</Link></p>
                <p className="text-gray-600 dark:text-gray-400 p-2">Or if you believe there is an issue, please feel free to <Link to="contact" className="text-blue-500">Contact Us Here!</Link></p>
            </div>
        </div>
    );
};

export default FourOhFour;
