import { marked } from "marked";
import { useRef, useEffect } from "react";

export default function ChatBox({ messages }) {
  const chatRef = useRef(null);

  useEffect(() => {
    if (chatRef.current) {
      chatRef.current.scrollTo({
        top: chatRef.current.scrollHeight,
        behavior: 'smooth',
      });
    }
  }, [messages]);

  return (
    <div className="chat-box" ref={chatRef}>
      {messages.map((msg, idx) => (
        <div key={idx} className={`message ${msg.type}`}>
          {msg.type === "bot" && <span className="bot-icon">{msg.icon}</span>}
          
          <p
              dangerouslySetInnerHTML={{ __html: marked.parse(msg.text) }}
              className="markdown break-words"
            ></p>

          {msg.type === "user" && <span className="user-icon">{msg.icon}</span>}
        </div>
      ))}
    </div>
  );
}
  