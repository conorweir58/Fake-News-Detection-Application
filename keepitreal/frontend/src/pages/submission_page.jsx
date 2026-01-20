import {useState} from 'react';

function Submission(){

    const [text, setText] = useState("")
    const [url, setUrl] = useState("")
    const [file, setFile] = useState(null)


    const SubmitData = (e) => {
        e.preventDefault();

        let info;
        let headers = {}

        if (file) {
            info = new FormData()
            info.append("file", file)
        } 
        else {
            info = JSON.stringify({text, url})
            headers["Content-Type"] = "application/json"
        }

        fetch("http://127.0.0.1:8000/api/analyse/", {
            method: "POST",
            headers,
            info
        })
        .then(response => response.json())
        console.log(response.json)

    }

    return(
        <div>
            <form onSubmit={SubmitData}>
                <textarea placeholder='Paste your text into here...' value = {text} onChange = {(e) => setText(e.target.value)}/>
                <input type="text" placeholder="Enter your URL here..." value = {url} onChange = {(e) => setUrl(e.target.value)}></input>
                <input type="file" value = {file} onChange = {(e) => setFile(e.target.files[0])}></input>
                <button type="submit">Send Article</button>
            </form>
        </div>
    );
};

export default Submission;