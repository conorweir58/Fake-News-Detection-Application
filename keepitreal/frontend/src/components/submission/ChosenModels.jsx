import {useState} from 'react';
import { cardClasses } from '../../styles/tailwindConstants';

// Array of objects containing info needed to display check box and inform backend of models to use - based on idea from https://stackoverflow.com/questions/48333685/how-do-i-set-multiple-values-in-a-javascript-map-at-once
const models = [
    {
        id: "pulk",
        name: "Fake News Analysis",
        description: "Analysis for fake news patterns using a detection model with 99.58% accuracy."
    },
    {
        id: "sentiment",
        name: "Sentiment Analysis",
        description: "Analysis on the emotional tone of a news source."
    },
    {
        id: "bias",
        name: "Bias Analysis",
        description: "Analysis for patterns of many different forms of bias in a news source."
    },
    {
        id: "gpt",
        name: "AI Generation Analysis",
        description: "Analysis of AI Generated Content in a news source."
    }
];

function Models({ onSelectionChange }){

    const [checkedState, setCheckedState] = useState(new Array(models.length).fill(true)); // default to all true

    const handleOnChange = (position) => {
        const updatedCheckedState = checkedState.map((item, index) =>
            index === position ? !item : item
        );

        setCheckedState(updatedCheckedState);

        // Get the models id to send to backend
        const selectedModels = [];
        for (let i = 0; i < updatedCheckedState.length; i++) {
            if (updatedCheckedState[i]) {
                selectedModels.push(models[i].id);
            }
        }

        onSelectionChange(selectedModels);
    }

    return(
        <div>
            {models.map((model, index) => (
                // Wrap everything in label tag so clicking anywhere inside selection card will select the check box
                // NOTE: Maybe add has-checked stlying so unselected models are dimmed
                <label key={index} htmlFor={model.id} className={`w-full ${cardClasses} flex items-center cursor-pointer transition duration-150 ease-in-out select-none`}>
                    <input type="checkbox" id={model.id} checked={checkedState[index]} onChange={() => handleOnChange(index)} className="w-5 h-5 mr-3 border rounded-xs focus:ring-1 focus:ring-brand-soft"/>
                    
                    <div className="flex-1">
                        <span className="font-bold text-heading">{model.name}</span>
                        <p className="text-xs mt-1 text-body text-gray-500">{model.description}</p>
                    </div>
                </label>
            ))}
        </div>
    )
}

export default Models;