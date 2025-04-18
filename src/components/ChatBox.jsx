export default function ChatBox({ messages }) {
    return (
      <div className="chat-box">
        {messages.map((msg, idx) => (
          <div key={idx} className={`message ${msg.type}`}>
            {msg.type === "bot" && <span className="bot-icon">{msg.icon}</span>}
            <p dangerouslySetInnerHTML={{ __html: msg.text }}></p>
            {msg.type === "user" && <span className="user-icon">{msg.icon}</span>}
          </div>
        ))}
      </div>
    );
  }
  