import { useEffect, useState } from "react";
import LoadingSpinner from "../../pages/loading/LoadingSpinner";

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

    if(isLoading){
        return <LoadingSpinner />;
    }

    return(
        <div>
            <pre>{history && JSON.stringify(history, null, 2)}</pre>
        </div>
    )
}

export default UserHistory;