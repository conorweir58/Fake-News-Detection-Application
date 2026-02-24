import { useEffect, useState } from "react";
import { useParams, useLocation } from "react-router-dom";
import { cardClasses } from "../../styles/tailwindConstants";
import ResultProgress from "./ResultProgress";
import Cookies from 'js-cookie';

function ResultsDisplay() {
    const { id } = useParams();
    const location = useLocation();

    const csrftoken = Cookies.get("csrftoken");

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

    useEffect(() => {
        if (!results && id) {
            const fetchResults = async () => {
                try {
                    const res = await fetch(`http://127.0.0.1:8000/api/history/${id}/`, {
                        method: "GET",
                        credentials: "include",
                        headers: {
                            "Content-Type": "application/json",
                            "X-CSRFToken": csrftoken,
                        }
                    });

                    if (res.status === 401) {
                        setError("Unauthorized - Please log in to view results.");
                        return;
                    }

                    if (!res.ok) {
                        setError(`HTTP error! status: ${res.status}`);
                    }

                    const data = await res.json();
                    setResults(data);
                } catch (error) {
                    setError(`Error fetching results: ${error.message}`);
                }
            };

            fetchResults();
        }
    }, [id, results, csrftoken]);

    // Animate trust bar
    useEffect(() => {
        if (results) {
            const target = results.result * 100;
            move(target);
        }
    }, [results]);

    if (error) {
        return (
            <div className="p-4">
                <div className={`${cardClasses}`}>
                    <p className="text-red-500">{error}</p>
                </div>
            </div>
        )
    }

    if (!results) {
        return <p>Loading results…</p>;
    }

    const trustScore = results?.result ?? 0;
    const biasScore = results?.bias?.[0]?.[0]?.score ?? 0;
    const sentimentScore = results?.sentiment?.[0]?.score ?? 0;
    const aiScore = results?.gpt?.[0]?.score ?? 0;
    const pulkScore = results?.pulk?.[0]?.score ?? 0;

    const pulkLabel = results?.pulk?.[0]?.label ?? "This model was not selected";
    const aiLabel = results?.gpt?.[0]?.label ?? "This model was not selected";

    // Because of order of operations, have to set capital in seperate variables
    const sentimentLabelUgly = results?.sentiment?.[0]?.label;
    const sentimentLabel = sentimentLabelUgly ? sentimentLabelUgly.charAt(0).toUpperCase() + sentimentLabelUgly.slice(1) : "This model was not selected";

    const biasLabelUgly = results?.bias?.[0]?.[0]?.label;
    const biasLabel = biasLabelUgly ? biasLabelUgly.charAt(0).toUpperCase() + biasLabelUgly.slice(1) : "This model was not selected";
    return (
        <div className="p-4">
            <div className={`w-full ${cardClasses}`}>
                <div className="pb-8 border-b border-b-gray-500">
                    <h2 className="font-bold text-3xl pb-4">Trustworthiness Score</h2>
                    <h3 className="font-bold text-2xl">{(trustScore * 100).toFixed(2)}%</h3>

                    <div className="rounded-full mt-2" id="progressBar">
                        <div className="rounded-full" id="resultsBar"></div>
                    </div>
                </div>

                <div className="p-4">
                    <h3 className="font-bold text-2xl pb-4">Results Breakdown</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 p-4 items-stretch">
                        <div className=" flex flex-col h-full p-4">
                            <div className={`${cardClasses}`}>
                                <h4 className="font-bold text-xl border-b border-gray-500 pb-2">Submitted Article</h4>
                                <h5 className="font-bold text-lg">{results?.title ?? "No Title Avaliable :( "}</h5>
                                <p>{results?.text ?? "No Text Avaliable :( "}...</p>
                            </div>
                        </div>

                        <div className="md:border-l p-4">
                            <div className={`${cardClasses} flex flex-col h-full gap-4`}>
                                <div className={`${cardClasses} font-bold text-xl`}>
                                    <h4>REAL or FAKE?</h4>
                                    <p className="pb-4 font-normal">{pulkLabel}</p>
                                    <ResultProgress score={Math.round(pulkScore * 100)} />
                                    <p className="text-sm mt-4 text-body text-gray-500">This result represents how likely the article's claims are to be factually accurate based on detected patterns - The score indicates the confidence in the resulting classification. </p>
                                </div>

                                <div className={`${cardClasses} font-bold text-xl`}>
                                    <h4>Sentiment</h4>
                                    <p className="pb-4 font-normal">{sentimentLabel}</p>
                                    <ResultProgress score={Math.round(sentimentScore * 100)} />
                                    <p className="text-sm mt-4 text-body text-gray-500">This result measures the overall emotional tone of the article, and how strongly that tone is expressed and affects the article. </p>
                                </div> 

                                <div className={`${cardClasses} font-bold text-xl`}>
                                    <h4>Bias Type</h4>
                                    <p className="pb-4 font-normal">{biasLabel}</p>
                                    <ResultProgress score={Math.round(biasScore * 100)} />
                                    <p className="text-sm mt-4 text-body text-gray-500">The resulting bias type and score is the most prominent form of bias present in the article, and the strength of which it influences the article.</p>
                                </div>

                                <div className={`${cardClasses} font-bold text-xl`}>
                                    <h4>AI or Human?</h4>
                                    <p className="pb-4 font-normal">{aiLabel}</p>
                                    <ResultProgress score={Math.round(aiScore * 100)} />
                                    <p className="text-sm mt-4 text-body text-gray-500">This result represents whether or not the article was written by a Human or generated by an AI, and the confidence in this result.</p>
                                </div> 
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
}

export default ResultsDisplay;