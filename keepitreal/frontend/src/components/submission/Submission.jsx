import {useState, useEffect} from 'react';
import Cookies from 'js-cookie';
import CircularProgress from "../results/CircleProgress";
import Models from './ChosenModels';
import SubmissionSelection from './SubmissionSelection'
import { cardClasses } from '../../styles/tailwindConstants';

function Submission(){

    const [text, setText] = useState("");
    const [url, setUrl] = useState("");
    const [file, setFile] = useState(null);

    const [submissionType, setSubmissionType] = useState("url") // default to url

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

    return(
        <div>
            <p>Submit your News Source and Select Analysis Types</p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4">

                {/* While no results show submission - need to add some form of reversal of action without needing to use the navbar - UI concept of easy reversal of action */}
                {!results && (
                    <div className={`${cardClasses} md:col-span-2 flex flex-col`}> {/* the md is applied to the grid colms so that on smaller devices they are stacked instead */}
                        <h2 className="text-2xl font-bold whitespace-nowrap">Submit Your News Source</h2>
                        <p className="font-bold text-gray-500 pt-1">Choose A Submission Format:</p>

                        <SubmissionSelection submissionType={submissionType} onChange={setSubmissionType}/>

                        <form onSubmit={SubmitData} className="flex flex-col h-full border-b border-t border-gray-500">
                            <div className="flex-1 flex flex-col justify-evenly items-center gap-2 text-black dark:text-white mb-4 mt-2">
                                
                                {submissionType === "url" && (
                                    // show message for when a url is invalid or not possible to extract from and recommend using text
                                    <input type="text" placeholder="Enter your URL here..." value = {url} onChange = {(e) => setUrl(e.target.value)} className="w-3/4 border text-sm rounded-base rounded-lg focus:ring-2 focus:ring-green-700 focus:border-green-700 focus:outline-none block p-2 resize-none placeholder:font-bold"></input>
                                )}

                                {submissionType === "text" && (
                                    <textarea placeholder='Paste your article here...' value = {text} onChange = {(e) => setText(e.target.value)} rows="12" className="border text-sm rounded-base rounded-lg focus:ring-2 focus:ring-green-700 focus:border-green-700 focus:outline-none block w-full p-2 shadow-xs resize-none placeholder:font-bold"/> // Will this update after every key press? is that gonna be too many updates?
                                )}                            
                                
                                {submissionType === "file" && (
                                    // make it so its green when valid file given and red if file not valid, and shows message when trying to submit invalid file
                                    <input type="file" onChange = {(e) => setFile(e.target.files[0])} className="w-full p-10 border-2 border-dashed rounded-lg text-center cursor-pointer transition"></input>
                                )}

                                <button type="submit" className="w-1/4 px-3 py-1 rounded-2xl cursor-pointer text-white font-bold bg-green-700 outline-none ring-1 ring-green-500 ring-opacity-400 hover:bg-green-600 transition duration-150 ease-in-out">Submit Article</button>
                            </div>

                        </form>
                    </div>
                )}

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
