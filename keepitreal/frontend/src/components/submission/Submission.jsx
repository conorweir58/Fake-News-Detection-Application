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
            setError("Please select at least one model before submitting!");
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
                                    <input type="text" placeholder="Enter your URL here..." value = {url} onChange = {(e) => setUrl(e.target.value)} className="w-3/4 border text-sm rounded-base rounded-lg focus:ring-green-700 focus:border-green-700 block p-2 shadow-xs resize-none placeholder:font-bold"></input>
                                )}

                                {submissionType === "text" && (
                                    <textarea placeholder='Paste your article here...' value = {text} onChange = {(e) => setText(e.target.value)} rows="10" className="border text-sm rounded-base focus:ring-green-700 focus:border-green-700 block w-full p-2 shadow-xs resize-none placeholder:font-bold"/> // Will this update after every key press? is that gonna be too many updates?
                                )}                            
                                
                                {submissionType === "file" && (
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