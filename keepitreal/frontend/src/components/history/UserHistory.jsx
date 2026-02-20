import { useEffect, useState } from "react";
import LoadingSpinner from "../../pages/loading/LoadingSpinner";
import { cardClasses } from "../../styles/tailwindConstants";
import { useAuth } from '../../contexts/AuthContext';
import { Link } from 'react-router-dom';

function UserHistory(){

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
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 p-10">
            {history && history.map(prev_sub => (
                <div className={`${cardClasses}`} key={prev_sub.response.id}>
                    <h1 className="text-2xl font-bold">{prev_sub.response?.title ?? "No heading Provided"}</h1><br></br>
                    <p>Result: {(prev_sub.response.result * 100).toFixed(2)}</p><br></br>
                    <p>Bias: {prev_sub.response?.bias?.[0]?.[0]?.label ?? "Model was not used for this submission"} {(prev_sub.response?.bias?.[0]?.[0]?.score * 100) ?? 0}</p><br></br>
                    <p>Sentiment: {prev_sub.response?.sentiment?.[0]?.label ?? "Model was not used for this submission"} {(prev_sub.response?.sentiment?.[0]?.score * 100) ?? 0}</p><br></br>
                    <p>AI or Human: {prev_sub.response?.gpt?.[0]?.label ?? "Model was not used for this submission"} {(prev_sub.response?.gpt?.[0]?.score * 100) ?? 0}</p><br></br>
                    <p>Pulk Model: {prev_sub.response?.pulk?.[0]?.label ?? "Model was not used for this submission"} {(prev_sub.response?.pulk?.[0]?.score * 100) ?? 0}</p><br></br>
                    <p>Submitted on: {prev_sub.response.created_at}</p><br></br>
                    <p>Story snippet: {prev_sub.response?.text?.split(" ").slice(0, 200).join(" ") ?? "There was no text saved for this submission"}</p><br></br>
                </div>
            ))}
        </div>
    )
}

export default UserHistory;