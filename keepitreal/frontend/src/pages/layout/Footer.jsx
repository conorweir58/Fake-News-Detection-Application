import { Link } from 'react-router-dom';
import logo from '../../assets/KeepItREAL_Icon.png';

function Footer() {
    const currentYear = new Date().getFullYear();

  const linkClasses = "font-semibold transition duration-150 ease-in-out hover:text-red-500 hover:drop-shadow-lg active:text-red-600 active:drop-shadow-red-500";

    return (
        <footer className="bottom-0 left-0 z-20 w-full p-4 border-t border-default shadow-sm md:grid md:grid-cols-3 md:items-center md:p-6">
            <div className="md:justify-self-start">
                <Link to="/"><img src={logo} alt="KeepItREAL Logo" className="h-6 w-auto rounded-md object-contain"/></Link>
            </div>

            <div className="md:justify-self-center">
                <p className="font-semibold">
                    <small>KeepItREAL © 2025 - {currentYear}</small>
                </p>
            </div>

            <div className="md:justify-self-end">
                <a href="mailto:conor.weir5@mail.dcu.ie" className={linkClasses}><small>Conor Weir</small></a>
                <span className="font-light text-gray-500 select-none"><small> | </small></span>
                <a href="mailto:brady.andrew5@mail.dcu.ie" className={linkClasses}><small>Andrew Brady</small></a>
            </div>

        </footer>
    );
};

export default Footer;