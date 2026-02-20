function ResultProgress({ score }) {

    return (
        <div className="w-full bg-gray-700 dark:bg-gray-300 rounded-full">
            <div className="bg-blue-500 text-md font-bold text-white text-center p-0.5 leading-none rounded-full h-6 flex items-center justify-center" style={{ width: `${score}%` }}>{score}%</div>
        </div>
    );
}

export default ResultProgress;
