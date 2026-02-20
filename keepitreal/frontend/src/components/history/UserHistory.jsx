import { useEffect, useState } from "react";
import LoadingSpinner from "../../pages/loading/LoadingSpinner";
import { cardClasses, formButton } from "../../styles/tailwindConstants";
import Cookies from 'js-cookie';
import { useAuth } from '../../contexts/AuthContext';
import { Link } from 'react-router-dom';
import { useNavigate } from "react-router-dom";

function UserHistory(){

    const navigate = useNavigate();

    const { isAuth } = useAuth(); // Get global auth status

    const [history, setHistory] = useState(null)

    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const fetchHistory = async() => {
            setError(null);
            setIsLoading(true);

            try{
                const response = await fetch(`http://127.0.0.1:8000/api/history/`, {
                    credentials: "include"
                });

                if (!response.ok){
                    setError(`API Error fetching history: ${response.status} ${response.statusText}`);
                    return;
                }
                const data = await response.json()
                setHistory(data);
            } catch (error) {
                setError(`API Error fetching history: ${error.message}`);
            } finally {
                setIsLoading(false);
            }
        }
        fetchHistory()
    }, []);

    const deleteHistory = async (id) => {
        const csrftoken = Cookies.get("csrftoken");

        const res = await fetch(`http://127.0.0.1:8000/api/history/${id}/delete/`, {
            method: "DELETE",
            credentials: "include",
            headers: {
                "X-CSRFToken": csrftoken
            }
        });

        if (res.ok) {
            // This removes the item from the current UI
            setHistory(prev => prev.filter(item => item.id !== id));
        }
    };


    if(isLoading){
        return <LoadingSpinner />;
    };

    if(!isAuth) {
        return (
            <div className="p-8 md:p-20">
                <div className={`${cardClasses}`}>
                    <h2 className="font-bold text-3xl pb-4 text-red-600">Sorry :(</h2>
                    <h3 className="font-bold text-xl pb-2">History is only accessible with a KeepItREAL account.</h3>
                    <Link to="/register" className="text-blue-500 p-2">Click Here to Register!</Link>
                    <Link to="/login" className="text-blue-500 p-2">Click Here to Log In!</Link>
                </div>
            </div>
        );
    };

    return(
        <div className="flex flex-col items-center gap-6 p-10">
            {history && history.map(prev_sub => (
                <div className={`${cardClasses}  w-full max-w-md text-left`} key={prev_sub.response.id}>

                    <h1 className="text-2xl font-bold">{prev_sub.response?.title ?? "No heading Provided"}</h1><br></br>
                    <div className="text-l">ID: {prev_sub.response.id}</div><br></br>
                    <button className="px-3 py-1 rounded-2xl cursor-pointer text-white font-bold bg-blue-700 outline-none ring-1 ring-blue-500 ring-opacity-400 hover:bg-blue-600 transition duration-150 ease-in-out" onClick={() => navigate(`/results/${prev_sub.response.id}`)}>See Results</button>
                    <button className="px-3 py-1 rounded-2xl cursor-pointer text-white font-bold bg-red-700 outline-none ring-1 ring-red-500 ring-opacity-400 hover:bg-red-600 transition duration-150 ease-in-out" onClick={() => deleteHistory(prev_sub.response.id)}>Delete</button>
                </div>
            ))}
        </div>
    )
}

export default UserHistory;