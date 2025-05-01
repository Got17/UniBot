import { useState, useEffect, useRef } from "react";

export default function ChatInput({ onSend, scrollToBottom, showScrollButton }) {
  const [input, setInput] = useState("");
  const inputRef = useRef(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const handleSend = () => {
    if (input.trim() === "") return;
    onSend(input);
    setInput("");

    inputRef.current?.focus();
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") handleSend();
  };

  return (
    <div className="chat-input-container">
      <div className="chat-input">
        <input
          ref={inputRef}
          type="text"
          placeholder="Message..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <button title="Send" className="send-btn btn" onClick={handleSend}>
            <i className="fas fa-paper-plane btn"></i>
          </button>
      </div>
      <button 
        aria-label="Scroll to bottom"
        title="Scroll to bottom" 
        onClick={() => {scrollToBottom()}} 
        className={`scroll-btn ${showScrollButton ? 'visible' : 'hidden'}`}
      >
        <i className="fa-solid fa-arrow-down"></i>
      </button>
      
    </div>
  );
}
