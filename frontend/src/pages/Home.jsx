import { useState, useEffect } from "react";
import api from "../api";
import Note from "../components/Note";
import "../styles/Home.css";
import {Logout }from "../App"
import Nav from "../components/Nav";

function Home() {
    const [notes, setNotes] = useState([]);
    const [question, setquestion] = useState("");
    const [response, setResponse] = useState("");
    const [file, setFile] = useState(null);
    const [answer, setAnswer] = useState("");

    useEffect(() => {
        getNotes();
    }, []);

    const getNotes = () => {
        api
            .get("/api/notes/")
            .then((res) => res.data)
            .then((data) => {
                setNotes(data);
            })
            .catch((err) => alert(err));
    };

    const deleteNote = (id) => {
        api
            .delete(`/api/notes/delete/${id}/`)
            .then((res) => {
                if (res.status === 204) alert("Note deleted!");
                else alert("Failed to delete note.");
                getNotes();
            })
            .catch((error) => alert(error));
    };

    //

    // const askQ = (id) => {
    //     api
    //         .get(`/api/notes/ask/${id}/`)
    //         .then((res) => res.json)
    //         .then((data) => {
    //             setAnswer(data.answer);
    //             console.log(data.answer);
    //         })
    //         .catch((err) => alert(err));
    // };
    const askQ = (id) => {
        api
            .get(`/api/notes/ask/${id}/`)
            .then((res) => {
                
    
                return res.data;
                
            })
            .then((data) => {
                // Check if data and data.answer are defined
                
                
                if (data && data.answer) {
                    setAnswer(data.answer);
                    console.log(data.answer);
                } else {
                    console.error('Unexpected response format:', data);
                    alert('The server response was not in the expected format.');
                }
            })
            .catch((err) => {
                console.error('Error:', err);
                alert('An error occurred while fetching the answer.');
            });
    };

    //
    const createNote = (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("question", question);
        
        
        if (file) {
            formData.append("pdf_file", file);
        }
        console.log(formData);

        api
            .post("/api/notes/", formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            })
            .then((res) => {
                if (res.status === 201) {{
                    alert("Note created!");

                }}
                else alert("Failed to make note.");
                getNotes();
            })
            .catch((err) => alert(err));
    };

    return (
        <div>
            <Nav logged={true}/>
            <div>
                <h2>Notes</h2>
                {notes.map((note) => (
                    <Note note={note} onDelete={deleteNote} onAsk={askQ} key={note.id} />
                ))}
            </div>
            <h2>Create a Note</h2>
            <form onSubmit={createNote} encType="multipart/form-data" method="post">
                
                <br />
                <label htmlFor="file">Attach PDF:</label>
                <br />
                <input
                    type="file"
                    id="file"
                    name="file"
                    accept=".pdf"
                    onChange={(e) => setFile(e.target.files[0])}
                />
                <br />
                <label htmlFor="question">Question:</label>
                <br />
                <textarea
                    id="question"
                    name="question"
                    required
                    value={question}
                    onChange={(e) => setquestion(e.target.value)}
                ></textarea>
                <br />
                <input type="submit" value="Submit" />
                
                
            </form>
        </div>
    );
}

export default Home;
