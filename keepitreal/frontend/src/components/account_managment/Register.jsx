import { useEffect, useState } from 'react'
import Cookies from 'js-cookie'
import { Link } from 'react-router-dom';
import { formButton, formInput, formLabel, cardClasses } from '../../styles/tailwindConstants';
import logo from '../../assets/KeepItREAL_Icon.png';

function Register () {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");
    const [username, setUsername] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const getCSRF = async () => {
            try{
                fetch("http://127.0.0.1:8000/api/csrf/", {
                    credentials: "include"
                });
            } catch (error) {
                console.log("Error fetching CSRF", error);
            }
        };
        getCSRF();
    }, []);

    const SubmitData = async (e) => {
        e.preventDefault();

        if (password !== confirmPassword){
            setMessage("Passwords do not match");
            return;
        }
        
        setError(null);
        setIsLoading(true);

        try{
            const csrftoken = Cookies.get('csrftoken')

            const response = await fetch("http://127.0.0.1:8000/api/register/", {
                method: "POST",
                credentials: "include",
                headers: {"Content-type":"application/json", "X-CSRFToken": csrftoken},
                body: JSON.stringify({email, password, username, confirmPassword})
            })

            const data = await response.json()

            if (!response.ok){
                setMessage(data?.message || `API Error registering account: ${response.status}`);
                return;
            }

            setMessage(data.message);
        } catch (error){
            setError(`Failed to fetch register endpoint data: ${error.message}`);
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
                                <h2 className="font-bold text-xl">Register an account with KeepItREAL!</h2>
                                <p className="text-md mt-1 text-body text-gray-500">Already have an account? <Link to="/login" className="text-blue-500">Login Here!</Link></p>
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

                        {/* COME BACK TO AND MAKE IT SO THAT AFTER AN INVALID INPUT, THE INVALID VALUES GO RED OR SOMEHTING LIKE THIS */}
                        <form onSubmit={SubmitData} className="flex flex-col items-center gap-8">

                            <div className="w-full">
                                <label className={formLabel}>Your Email</label>
                                <input type="email" required placeholder="Enter your email" value = {email} onChange = {(e) => setEmail(e.target.value)} className={`${formInput}`}></input>
                            </div>

                            <div className="w-full">
                                <label className={formLabel}>Your Username</label>
                                <input type="text" required placeholder="Enter your username" value = {username} onChange = {(e) => setUsername(e.target.value)} className={`${formInput}`}></input>
                            </div>

                            <div className="w-full">
                                <label className={formLabel}>Your Password</label>
                                <input type="password" required placeholder="Enter your password" value = {password} onChange = {(e) => setPassword(e.target.value)} className={`${formInput}`}></input>
                            </div>

                            <div className="w-full">
                                <label className={formLabel}>Confirm Your Password</label>
                                <input type="password" required placeholder="Confirm your password" value = {confirmPassword} onChange = {(e) => setConfirmPassword(e.target.value)} className={`${formInput}`}></input>
                            </div>

                            <button type="submit" className={`${formButton} w-1/5 mt-4`}>Register</button>

                            {message &&
                                <div>
                                    <p>{message}</p>
                                </div>
                            }

                            {error &&
                                <div className="text-red-500">
                                    <p>{error}</p>
                                </div>
                            }
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );

}

export default Register;