import { useEffect, useState } from "react";


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
        <div>
            <pre>{history && JSON.stringify(history, null, 2)}</pre>
        </div>
    )
}

export default UserHistory;