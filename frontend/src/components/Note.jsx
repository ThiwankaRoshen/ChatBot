
import "../styles/Note.css"
import LoadingIndicator from './LoadingIndicator'
import ChatBox from "../components/ChatBox";

import React, { useEffect, useState } from 'react';

function Note({ note, onDelete, onAsk }) {
    const [isCollapsed, setIsCollapsed] = useState(true); // State to manage collapse
    const [loading, setLoading] = useState(false);


    const formattedDate = new Date(note.created_at).toLocaleDateString("en-US");

    const toggleCollapse = () => {
        setIsCollapsed(!isCollapsed);
    };

    //ask rag for solution only the response hasn't recorded which means this was a new question
    useEffect(()=>{
        try{
            if(!note.response){
                setLoading(true);
                onAsk(note.id);
                
            }
        }
        catch(e){
            console.log(e);
        }
        finally{
            setLoading(false);
        }
    },[]);



    return (
        <div className="note-container">
            <h4 className="note-content">Query : {note.question}</h4>
            {!isCollapsed && (
                <>
                    
                    <p className="note-title"><b>Response : </b>  {loading && <LoadingIndicator />}{note.response}</p>
                    <p className="note-date">{formattedDate}</p>
                </>
            )}
            <button className="collapse-button" onClick={toggleCollapse}>
                {isCollapsed ? 'Expand' : 'Collapse'}
            </button>
            <button className="delete-button" onClick={() => onDelete(note.id)}>
                Delete
            </button>

            
            <button className="ask-button" onClick={() => {
               
                try{
                    
                        setLoading(true);
                        onAsk(note.id);
                    
                }
                catch(e){
                    console.log(e);
                }
                finally{
                    setLoading(false);
                }
                }}>
                Ask
            </button>
            
        </div>
    );
}

export default Note;
