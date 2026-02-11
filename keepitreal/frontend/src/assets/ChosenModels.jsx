import {useState, useEffect} from 'react';

const models = ["pulk", "sentiment", "bias", "gpt"];

function Models({ onSelectionChange }){

    const [checkedState, setCheckedState] = useState(new Array(models.length).fill(false))

    const handleOnChange = (position) => {
        const updatedCheckedState = checkedState.map((item, index) =>
            index === position ? !item : item
        );

        setCheckedState(updatedCheckedState);

        onSelectionChange(updatedCheckedState)
    }

    return(
        <div>
            {models.map((model, index) => (
                <div key={index}>
                    <input type="checkbox" checked={checkedState[index]} onChange={() => handleOnChange(index)}/>
                    <label>{model}</label>
                </div>
            ))}
        </div>
    )
}

export default Models;