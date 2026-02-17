import {useState, useEffect} from 'react';
import Cookies from 'js-cookie';
import Models from './ChosenModels';
import CircularProgress from "../results/CircleProgress";


function Submission(){

    const [text, setText] = useState("");
    const [url, setUrl] = useState("");
    const [file, setFile] = useState(null);
    const [selectedModels, setSelectedModels] = useState([]);
    let [error, setError] = useState(null);
    let [results, setResults] = useState(null);
    let [submitted, setSubmitted] = useState(null);

    function move(target) {
        const elem = document.getElementById("resultsBar");
        let width = 1;
        const id = setInterval(frame, 10);
        function frame() {
        if (width >= target) {
            clearInterval(id);
        } else {
            width = width + 0.25;
            elem.style.width = width + "%";
        }
        }
    }
    const SubmitData = async (e) => {
        e.preventDefault();

        setResults(null);
        setError(null);

        if (!text && !url && !file){
            setError("Please select file, write text or provide URL before submitting!");
            return;
        }

        const csrftoken = Cookies.get("csrftoken");

        let body;
        let headers = {"X-CSRFToken": csrftoken};

        if (selectedModels.every((x) => x === false)){
            setError("Please select one model before submitting!");
            return;
        }

        if (file) {
            body = new FormData();
            body.append("file", file);
            body.append("selected", JSON.stringify(selectedModels));
        }
        else {
            body = JSON.stringify({text, url, selected:selectedModels});
            headers["Content-Type"] = "application/json";
        }

        try{
            const response = await fetch("http://127.0.0.1:8000/api/analysis/", {
                method: "POST",
                credentials: "include",
                headers,
                body
            })

            if (!response.ok){
                throw new Error(`API Error: ${response.status} ${response.statusText}`);
            }

            const data = await response.json();

            if (data.error){
                setError(data.error);
            }

            if (data.id == null){
                setResults(data);
            }else{
                setSubmitted(data.id);
            }
        } catch (error) {
            throw new Error(`Failed to fetch data: ${error.message}`)
        }


    }

    
    useEffect(() => {
        if (!submitted){
            return;
        }
        const submittedResults = async () => {
            try {
                const response = await fetch(`http://127.0.0.1:8000/api/analysis/${submitted}/`);
                
                if (!response.ok){
                    throw new Error(`API Error Fetching Results: ${response.status} ${response.statusText}`)
                }
                
                const data = await response.json();
                console.log("API Response:", data);
                setResults(data);
            } catch {
                throw new Error(`API Error fetching results: ${error.message}`)
            }
        }
        submittedResults();
    }, [submitted]);
    

    useEffect(() => {
        if (results) {
            const target = results.result * 100
            move(target);
        } else {
            return;
        }
    }, [results]);

    const trustScore = results?.result ?? 0; //this is a mix of optional chaininh and the nullish coalescing operator
    const biasScore = results?.bias?.[0]?.[0]?.score ?? 0;
    const sentimentScore = results?.["Sentiment"]?.[0]?.score ?? 0;
    const aiScore = results?.["AI or Human"]?.[0]?.score ?? 0;
    const pulkScore = results?.["True or False"]?.[0]?.score ?? 0

    return(
        <div>
            <div>
                <Models onSelectionChange={setSelectedModels}/>
            </div>
            <form onSubmit={SubmitData}>
                <textarea placeholder='Paste your text into here...' value = {text} onChange = {(e) => setText(e.target.value)}/>
                <input type="text" placeholder="Enter your URL here..." value = {url} onChange = {(e) => setUrl(e.target.value)}></input>
                <input type="file" onChange = {(e) => setFile(e.target.files[0])}></input>
                <button type="submit">Send Article</button>
            </form>

            {error && (
                <div style={{ color: "red", marginTop: "10px" }}>
                    {error}
                </div>
            )}

            <h1 class="text-3xl font-bold underline">Results</h1>
            <div>
                {results && (
                <>
                    <div id="progressBar">
                        <div id ="resultsBar">{(trustScore * 100).toFixed(2)}%</div>
                    </div>
                    <div>
                        <CircularProgress value={biasScore * 100} />
                        <CircularProgress value={sentimentScore * 100} />
                        <CircularProgress value={aiScore * 100} />
                        <CircularProgress value={pulkScore * 100} />
                    </div>
                </>
                )}
            </div>
        </div>
    );
};

export default Submission;