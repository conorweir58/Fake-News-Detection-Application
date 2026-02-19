import { useEffect, useState } from "react";
import { useParams, useLocation } from "react-router-dom";
import CircularProgress from "../results/CircleProgress";
import { cardClasses } from "../../styles/tailwindConstants";

function ResultsDisplay() {
    const { id } = useParams();
    const location = useLocation();

    // If results were passed directly (no ID)
    const directResults = location.state?.results || null;

    const [results, setResults] = useState(directResults);
    const [error, setError] = useState(null);

    function move(target) {
        const elem = document.getElementById("resultsBar");
        let width = 1;
        const intervalId = setInterval(frame, 10);

        function frame() {
            if (width >= target) {
                clearInterval(intervalId);
            } else {
                width = width + 0.25;
                elem.style.width = width + "%";
            }
        }
    }

    // Animate trust bar
    useEffect(() => {
        if (results) {
            const target = results.result * 100;
            move(target);
        }
    }, [results]);

    if (error) {
        return <p className="text-red-500">{error}</p>;
    }

    if (!results) {
        return <p>Loading results…</p>;
    }
    console.log(results)

    const trustScore = results?.result ?? 0;
    const biasScore = results?.bias?.[0]?.[0]?.score ?? 0;
    const sentimentScore = results?.sentiment?.[0]?.score ?? 0;
    const aiScore = results?.gpt?.[0]?.score ?? 0;
    const pulkScore = results?.pulk?.[0]?.score ?? 0;

    return (
        <div>
            <h1 className="text-4xl pt-10 pb-5">{(trustScore * 100).toFixed(2)}%</h1>
            <div id="progressBar">
                <div id="resultsBar"></div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 p-10">
                <div className={`bg-neutral-100 dark:bg-slate-900 border border-default dark:border-slate-800 rounded-base shadow-md mb-4 pl-15 pr-15 pt-10`}>{results?.text ?? "No text"}...</div>
                <div className={`${cardClasses}`}>
                    <div className={`dark:bg-slate-900 border border-default dark:border-slate-800 rounded-base shadow-md mb-6`}>
                        <CircularProgress value={biasScore * 100}/>
                        <div className="mr-100 pb-25 text-4xl">Bias Type: {results?.bias?.[0]?.[0]?.label ?? "This model was not selected"} {Math.round(biasScore * 100)}% </div>    
                    </div>
                    <div className={`dark:bg-slate-900 border border-default dark:border-slate-800 rounded-base shadow-md mb-6`}>
                        <CircularProgress value={sentimentScore * 100}/>
                        <div className="mr-100 pb-20 text-4xl">Sentiment: {results?.sentiment?.[0]?.label ?? "This model was not selected"} {Math.round(sentimentScore * 100)}% </div>    
                    </div>
                    <div className={`dark:bg-slate-900 border border-default dark:border-slate-800 rounded-base shadow-md mb-6`}>
                        <CircularProgress value={aiScore * 100} />
                        <div className="mr-100 pb-20 text-4xl">AI or Human: {results?.gpt?.[0]?.label ?? "This model was not selected"} {Math.round(aiScore * 100)}% </div>    
                    </div>
                    <div className={`dark:bg-slate-900 border border-default dark:border-slate-800 rounded-base shadow-md mb-6`}>
                        <CircularProgress value={pulkScore * 100} />
                        <div className="mr-100 pb-20 text-4xl">True or False: {results?.pulk?.[0]?.label ?? "This model was not selected"} {Math.round(pulkScore * 100)}% </div>    
                    </div>
                </div>
                
            </div>
        </div>
    );
}

export default ResultsDisplay;