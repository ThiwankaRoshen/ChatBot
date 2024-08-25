import React from 'react';
import { Link } from 'react-router-dom'; // Assuming you're using React Router for navigation
import '../styles/Nav.css'; // Import CSS for styling

function Nav({logged}) {
    return (
        <nav className="navbar">
            <div className="navbar-container">
                <div className="navbar-logo">
                    <Link to="/"><img src='../../public/icon.png'/>Chatbot For private file Queries</Link> 
                </div>
                <ul className="navbar-menu">
                    
                    <li className="navbar-item">
                    </li>
                    <li className="navbar-item">
                        {
                            logged?(
                                <Link to="/logout">
                                    <button className="navbar-button" >Logout</button>
                                </Link>
                            ):(
                                <>
                                <Link to="/login">
                                    <button className="navbar-button" >login</button>
                                </Link>
                                <Link to="/register">
                                <button className="navbar-button" >Register</button>
                                </Link>
                                </>
                            )
                        }
                        
                    </li>
                </ul>
            </div>
        </nav>
    );
}



export default Nav;
