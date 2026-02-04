import { useEffect, useState } from "react";


function User_History(){

    const [history, SetHistory] = useState(null)

     useEffect(() => {
        fetch(`http://127.0.0.1:8000/api/history/`, {
            credentials: "include"
        })
        .then(response => response.json())
        .then(data => {
            console.log("API Response:", data);
            SetHistory(data);
            })
            .catch(error => console.error("API Error fetching history:", error))
    }, []);

    return(
        <div>
            <pre>{history && JSON.stringify(history, null, 2)}</pre>
        </div>
    )
}

export default User_History;