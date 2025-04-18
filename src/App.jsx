// src/App.jsx
import { useEffect, useState } from "react";
import Sidebar from "./components/Sidebar";
import ChatHeader from "./components/ChatHeader";
import ChatBox from "./components/ChatBox";
import ChatInput from "./components/ChatInput";
import "./index.css";

export default function App() {
  const savedTheme = localStorage.getItem("theme");
  const [theme, setTheme] = useState(savedTheme);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [messages, setMessages] = useState([
    {
      type: "bot",
      text: `How can I help you?`,
      icon: "🐶",
    },
  ]);

  useEffect(() => {
    if (savedTheme) setTheme(savedTheme);
  }, []);

  useEffect(() => {
    document.body.className = `theme-${theme}`;
    localStorage.setItem("theme", theme);
  }, [theme]);

  const handleSend = (inputText) => {
    const newMessages = [
      ...messages,
      { type: "user", text: inputText, icon: "🐻" },
      {
        type: "bot",
        text: `Sorry, I don't understand yet. Please try again later.`,
        icon: "🐶",
      },
    ];
    setMessages(newMessages);
  };

  return (
    <div className="container">
      <Sidebar open={sidebarOpen} setOpen={setSidebarOpen} />
      <main className="chat-window">
        <ChatHeader theme={theme} setTheme={setTheme} sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
        <ChatBox messages={messages} />
        <ChatInput onSend={handleSend} />
      </main>
    </div>
  );
}
