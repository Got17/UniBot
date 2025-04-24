// src/App.jsx
import { useEffect, useState } from "react";
import Sidebar from "./components/Sidebar";
import ChatHeader from "./components/ChatHeader";
import ChatBox from "./components/ChatBox";
import ChatInput from "./components/ChatInput";
import "./index.css";
import { API_URL } from "./config";

export default function App() {
  const savedTheme = localStorage.getItem("theme");
  const [theme, setTheme] = useState(savedTheme || "dark");
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

  // const handleSend = (inputText) => {
  //   const newMessages = [
  //     ...messages,
  //     { type: "user", text: inputText, icon: "🐻" },
  //     {
  //       type: "bot",
  //       text: `Sorry, I don't understand yet. Please try again later.`,
  //       icon: "🐶",
  //     },
  //   ];
  //   setMessages(newMessages);
  // };

  const handleSend = async (inputText) => {
    const userMessage = { type: "user", text: inputText, icon: "🐻" };
    setMessages((prev) => [...prev, userMessage]);

    // Add loading state
    const loadingId = setTimeout(() => {
      setMessages((prev) => [
        ...prev, 
        { type: "bot", text: "Thinking...", icon: "🐶", isLoading: true }
      ]);
    }, 1000);
  
    try {
      const res = await fetch(`${API_URL}/chat`, { // Change this to your deployed API
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question: inputText }),
      });

      clearTimeout(loadingId);
  
      // Remove loading message if it was added
      setMessages((prev) => prev.filter(msg => !msg.isLoading));
      
      if (!res.ok) {
        throw new Error(`Server responded with status: ${res.status}`);
      }
      
      const data = await res.json();
      const botReply = { type: "bot", text: data.response || "Sorry, I couldn't generate a response.", icon: "🐶" };
      setMessages((prev) => [...prev, botReply]);
    } catch (error) {
      clearTimeout(loadingId);
      
      // Remove loading message if it was added
      setMessages((prev) => prev.filter(msg => !msg.isLoading));
      
      console.error("Chat error:", error);
      setMessages((prev) => [
        ...prev,
        { type: "bot", text: "An error occurred. Please try again later.", icon: "🐶" },
      ]);
    }
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
