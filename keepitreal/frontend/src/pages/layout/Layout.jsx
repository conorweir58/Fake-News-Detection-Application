import { Outlet } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";

function Layout() {
    return (
        <div className="min-h-svh flex flex-col"> {/* Full viewport height - use svh instead bc reddit post said screen can cause issues on some mobile devices - flex col pushes footer to bottom*/}
            <Header />
            
            <main className="grow pt-16 md:pt-20">
                <div>
                    <Outlet />
                </div>
            </main>

            <Footer />
        </div>
    );
};

export default Layout;