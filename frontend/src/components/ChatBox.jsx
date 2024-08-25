import React, { useState } from 'react';
import '../styles/ChatBox.css'; // Import the CSS file

const ChatBox = ({note}) => {
    const [messages, setMessages] = useState([]);
    const [inputValue, setInputValue] = useState('');

    

    const handleSendMessage = () => {
        if (inputValue.trim()) {
            setMessages([...messages, { text: inputValue, sender: 'user' }]);
            setInputValue('');
            // Handle sending message to the server or processing it here
        }
    };

    const handleInputChange = (e) => {
        setInputValue(e.target.value);
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            handleSendMessage();
        }
    };

    return (
        <div className="chat-container">
            <div className="chat-history">
                {messages.map((msg, index) => (
                    <div key={index} className={`message-${msg.sender}`}>
                        {msg.text}
                    </div>
                ))}
            </div>
            <div className="input-container">
                <input
                    type="text"
                    value={inputValue}
                    onChange={handleInputChange}
                    onKeyPress={handleKeyPress}
                    className="input-field"
                    placeholder="Type a message..."
                />
                <button onClick={handleSendMessage} className="send-button">
                    Send
                </button>
            </div>
        </div>
    );
};

export default ChatBox;
