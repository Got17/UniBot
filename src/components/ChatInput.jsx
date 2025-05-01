import { useState, useEffect, useRef } from "react";

export default function ChatInput({ onSend }) {
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
        <div className="relative group-tooltip">
          <button className="send-btn btn" onClick={handleSend}>
            <i className="fas fa-paper-plane btn"></i>
          </button>
          <span className="tooltip left-1/2 bottom-4">Send</span>
        </div>
      </div>
    </div>
  );
}
