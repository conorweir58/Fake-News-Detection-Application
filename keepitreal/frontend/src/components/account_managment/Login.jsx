import { useState, useEffect } from 'react'
import Cookies from 'js-cookie'
import { Link } from 'react-router-dom';
import { cardClasses, formLabel, formButton, formInput } from '../../styles/tailwindConstants';
import logo from '../../assets/KeepItREAL_Icon.png';
import { useAuth } from '../../contexts/AuthContext';
import LoadingSpinner from '../../pages/loading/LoadingSpinner';

function Login () {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");
    const { login } = useAuth();
    

    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetch("http://127.0.0.1:8000/api/csrf/", {
            credentials: "include"
        });
    }, []);

    const SubmitData = async (e) => {
        e.preventDefault();

        setError(null);
        setIsLoading(true);
       
        try{
            const csrftoken = Cookies.get('csrftoken')

            const response = await fetch("http://127.0.0.1:8000/api/login/", {
                method: "POST",
                credentials: "include",
                headers: {"Content-type":"application/json", "X-CSRFToken": csrftoken},
                body: JSON.stringify({email, password})
            })

            const data = await response.json()

            if (!response.ok){
                setMessage(data?.message || `API Error logging in to account: ${response.status}`);
                return;
            }

            if(data.authenticated === "true") {
                login(data.username); // update global isAuth and auth username
            }
            setMessage(data.message);
            console.log(message);
        } catch (error){
            setError(`Failed to fetch login endpoint data: ${error.message}`);
        } finally {
            setIsLoading(false);
        }
    };

    if(isLoading){
        return <LoadingSpinner />;
    }
    
    return (
        <div>
            <div className="p-4">
                <div className={`w-full ${cardClasses}`}>
                    <div className="grid grid-cols-1 md:grid-cols-2 p-4 items-center">
                        <div className="md:border-r flex flex-col h-full justify-evenly">
                            <div className="pb-4">
                                <h2 className="font-bold text-xl">Log In To Your KeepItREAL Account!</h2>
                                <p className="text-md mt-1 text-body text-gray-500">Don't have an account? <Link to="/register" className="text-blue-500">Register Now!</Link></p>
                            </div>

                            <img src={logo} alt="KeepItREAL Logo" className="h-32 rounded-md shadow-md mx-auto block"/>

                            <div className="pt-4 mr-4">
                                <h3 className="font-bold">An Account Is Required To:</h3>
                                <ul className="mt-2 list-disc list-inside text-body text-gray-600 dark:text-gray-400">
                                    <li>Store A History of Previous Submissions</li>
                                    <li>Manage and Access Your Submission History</li>
                                </ul>
                            </div>
                        </div>

                        <form onSubmit={SubmitData} className="flex flex-col items-center gap-8">

                            <div className="w-full">
                                <label className={formLabel}>Your Email</label>
                                <input type="email" id="email" required placeholder="Enter your email" value={email} onChange = {(e) => setEmail(e.target.value)} className={`${formInput}`}></input>
                            </div>

                            <div className="w-full">
                                <label className={formLabel}>Your Password</label>
                                <input type="password" id="password" required placeholder="Enter your password" value={password} onChange = {(e) => setPassword(e.target.value)} className={formInput}></input>
                            </div>
                            <div className="w-full">
                                {message &&
                                    <p className="text-xl font-bold text-red-500">{message}</p>
                                }
                                <button type="submit" className={`${formButton} w-1/5 mt-4`}>Log In</button>
                            </div>
                            
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;