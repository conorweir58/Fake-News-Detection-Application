import {useState, useEffect} from 'react';
import Cookies from 'js-cookie';
import CircularProgress from "../results/CircleProgress";
import Models from '../submission/ChosenModels';

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
            body = new FormData();
            body.append("file", file);
            body.append("selected", JSON.stringify(selectedModels));
        } 
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

    // CSS variables
    const cardClasses = "w-full bg-neutral-100 dark:bg-slate-900 border border-default dark:border-slate-800 rounded-base shadow-md p-4 sm:p-6 mb-4";

    return(
        <div>
            <h1 className="text-3xl font-bold whitespace-nowrap">KeepItREAL</h1>
            <p>Submit your News Source and Select Analysis Types </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4">


                <div className={`${cardClasses} md:col-span-2`}> {/* the md is applied to the grid colms so that on smaller devices they are stacked instead */}
                    <h2 className="text-2xl font-bold whitespace-nowrap">Submit Your News Source</h2>
                    <p className="font-bold text-gray-500 pt-1">Choose A Submission Format:</p>
                    <form onSubmit={SubmitData}>
                        <textarea placeholder='Paste your text into here...' value = {text} onChange = {(e) => setText(e.target.value)}/>
                        <input type="text" placeholder="Enter your URL here..." value = {url} onChange = {(e) => setUrl(e.target.value)}></input>
                        <input type="file" onChange = {(e) => setFile(e.target.files[0])}></input>
                        <button type="submit">Send Article</button>
                    </form>
                </div>

                <div className={`${cardClasses} md:col-span-1`}>
                    <h2 className="text-2xl font-bold whitespace-nowrap">Select Analysis Types</h2>
                    <p className="font-bold text-gray-500 pt-1">
                        <small>The following selection will be used to build your analysis of your chosen news source:</small>
                    </p>
                    <div className="pt-4">
                        <Models onSelectionChange={setSelectedModels}/>
                    </div>
                </div>

                {results && (
                    <div className={cardClasses}>
                        <h1 className="text-3xl font-bold">Results</h1>
                        <div id="progressBar">
                            <div id ="resultsBar">{(results.result * 100).toFixed(2)}%</div>
                        </div>

                        <div>
                            <CircularProgress value={results.bias?.[0]?.[0]?.score * 100} />
                            <CircularProgress value={results["Sentiment"]?.[0]?.score * 100} />
                            <CircularProgress value={results["AI or Human"]?.[0]?.score * 100} />
                            <CircularProgress value={results["True or False"]?.[0]?.score * 100} />
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Submission;
