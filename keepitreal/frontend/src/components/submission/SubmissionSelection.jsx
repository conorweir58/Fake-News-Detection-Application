import { submissionTabClasses, selectedTabClasses, unselectedTabClasses } from '../../styles/tailwindConstants';

function SubmissionSelection({submissionType, onChange}){

    // based on the current selected type, either load selected tab styling or unselceted tab styling - can't use "focus:"if we want url to be loaded as selected at page load
    const getSelectionState = (type) => (
        `${submissionTabClasses} ${submissionType === type ? selectedTabClasses : unselectedTabClasses}`
    );

    return(
        <div className="flex gap-3 m-4">
            <button onClick={() => onChange("url")} className={getSelectionState("url")}>URL</button>
            <button onClick={() => onChange("text")} className={getSelectionState("text")}>Text</button>
            <button onClick={() => onChange("file")} className={getSelectionState("file")}>File</button>
        </div>
    );

};

export default SubmissionSelection;