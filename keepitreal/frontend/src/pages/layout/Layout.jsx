import { Outlet } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";

function Layout() {
    return (
        <div className="min-h-svh min-w-xs flex flex-col"> {/* Full viewport height - use svh instead bc reddit post said screen can cause issues on some mobile devices - flex col pushes footer to bottom*/}
            <Header />
            
            <main className="grow pt-16 md:pt-20">
                <div>
                    <h1 className="text-3xl font-bold whitespace-nowrap">KeepItREAL</h1>
                    <Outlet />                    
                </div>
            </main>

            <Footer />
        </div>
    );
};

export default Layout;