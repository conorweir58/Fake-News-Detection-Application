import { useEffect, useState } from "react";
import LoadingSpinner from "../../pages/loading/LoadingSpinner";
import { cardClasses, formButton } from "../../styles/tailwindConstants";
import Cookies from 'js-cookie';

function UserHistory(){

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
    }

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
                    <button className="px-3 py-1 rounded-2xl cursor-pointer text-white font-bold bg-red-700 outline-none ring-1 ring-red-500 ring-opacity-400 hover:bg-red-600 transition duration-150 ease-in-out" onClick={() => deleteHistory(prev_sub.response.id)}>Delete</button>
                </div>
            ))}
        </div>
    )
}

export default UserHistory;