import { useEffect, useState } from "react";
import { cardClasses } from "../../styles/tailwindConstants";


function UserHistory(){

    const [history, setHistory] = useState(null)

    useEffect(() => {
        const fetchHistory = async() => {
            try{
                const response = await fetch(`http://127.0.0.1:8000/api/history/`, {
                    credentials: "include"
                });

                if (!response.ok){
                    throw new Error(`API Error: ${response.status} ${response.statusText}`);
                }
                const data = await response.json()
                setHistory(data);
            } catch (error) {
                throw new error (`API Error fetching history: ${error.message}`);
            }
        }
        fetchHistory()
    }, []);

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