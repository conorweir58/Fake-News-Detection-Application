import {useState, useEffect} from 'react';
import Cookies from 'js-cookie';
import CircularProgress from "../results/CircleProgress";
import Models from '../assets/ChosenModels';

function Submission(){

    const [text, setText] = useState("");
    const [url, setUrl] = useState("");
    const [file, setFile] = useState(null);
    const [selectedModels, setSelectedModels] = useState([]);
    let [results, SetResults] = useState(null);
    let [submitted, SetSubmitted] = useState(null);

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

    const SubmitData = (e) => {
        e.preventDefault();

        SetResults(null);

        const csrftoken = Cookies.get("csrftoken");

        let body;
        let headers = {"X-CSRFToken": csrftoken};

        if (file) {
<<<<<<< HEAD:keepitreal/frontend/src/components/submission/Submission.jsx
            body = new FormData()
            body.append("file", file)
        }
=======
            body = new FormData();
            body.append("file", file);
            body.append("selected", JSON.stringify(selectedModels));
        } 
>>>>>>> backend:keepitreal/frontend/src/pages/SubmissionPage.jsx
        else {
            body = JSON.stringify({text, url, selected:selectedModels});
            headers["Content-Type"] = "application/json";
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
                SetResults(data);
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
    }, [submitted]);
    

    useEffect(() => {
        if (results) {
            const target = results.result * 100
            move(target);
        }
    }, [results]);


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

            <h1 className="text-3xl font-bold underline">Results</h1>
            <div>
                {results && (
                <>
                    <div id="progressBar">
                        <div id ="resultsBar">{(results.result * 100).toFixed(2)}%</div>
                    </div>
                    <div>
                        <CircularProgress value={results.bias?.[0]?.[0]?.score * 100} />
                        <CircularProgress value={results["Sentiment"]?.[0]?.score * 100} />
                        <CircularProgress value={results["AI or Human"]?.[0]?.score * 100} />
                        <CircularProgress value={results["True or False"]?.[0]?.score * 100} />
                    </div>
                </>
                )}
            </div>
        </div>
    );
};

export default Submission;
