import {useState, useEffect} from 'react';
import Cookies from 'js-cookie'


function Submission(){

    const [text, setText] = useState("");
    const [url, setUrl] = useState("");
    const [file, setFile] = useState(null);
    let [results, SetResults] = useState(null);
    let [submitted, SetSubmitted] = useState(null);



    const SubmitData = (e) => {
        e.preventDefault();

        const csrftoken = Cookies.get("csrftoken")

        let body;
        let headers = {"X-CSRFToken": csrftoken}

        if (file) {
            body = new FormData()
            body.append("file", file)
        } 
        else {
            body = JSON.stringify({text, url})
            headers["Content-Type"] = "application/json"
        }

        fetch("http://127.0.0.1:8000/api/analysis/", {
            method: "POST",
            credentials: "include",
            headers,
            body
        })
        .then(res => res.json())
        .then(data => {
            console.log("Backend response:", data);
            if (data.id == null){
                SetResults(data)
            }else{
                SetSubmitted(data.id);
            }
        })
        


    }

    
    useEffect(() => {
            if (!submitted) return;
            fetch(`http://127.0.0.1:8000/api/analysis/${submitted}/`)
            .then(response => response.json())
            .then(data => {
                console.log("API Response:", data);
                SetResults(data);
                })
                .catch(error => console.error("API Error fetching results:", error))
        }, [submitted])
    

    return(
        <div>
            <form onSubmit={SubmitData}>
                <textarea placeholder='Paste your text into here...' value = {text} onChange = {(e) => setText(e.target.value)}/>
                <input type="text" placeholder="Enter your URL here..." value = {url} onChange = {(e) => setUrl(e.target.value)}></input>
                <input type="file" onChange = {(e) => setFile(e.target.files[0])}></input>
                <button type="submit">Send Article</button>
            </form>
            <h1>Results</h1>
            <div>
                {results && (
                    <div>
                        <pre>{JSON.stringify(results, null, 2)}</pre>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Submission;