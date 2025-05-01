// src/App.jsx
import { useEffect, useState, useRef } from "react";
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

  const chatRef = useRef(null);
  const [showScrollButton, setShowScrollButton] = useState(false);

  // Scroll to the bottom of the chat when new messages are added
  // This effect runs every time the messages array changes
  useEffect(() => {
    if (chatRef.current) {
      chatRef.current.scrollTo({
        top: chatRef.current.scrollHeight,
        behavior: 'smooth',
      });
    }
  }, [messages]);

  // Show the scroll button when the user scrolls up
  const handleScroll = () => {
    const threshold  = 75; 

    if (!chatRef.current) return;

    if (chatRef.current) {
      const { scrollTop, scrollHeight, clientHeight } = chatRef.current;
      setShowScrollButton(scrollTop + clientHeight < scrollHeight - threshold);
    }
  };

  // Add event listener to the chat box for scroll events
  useEffect(() => {
    const chaBox = chatRef.current;

    chaBox?.addEventListener('scroll', handleScroll);
    
    return () => {
      chaBox?.removeEventListener('scroll', handleScroll);
    };
  }, []);

  let scrollToBottom = () => {
    if (chatRef.current) {
      chatRef.current.scrollTo({
        top: chatRef.current.scrollHeight,
        behavior: 'smooth',
      });
    }
    setTimeout(() => setShowScrollButton(false), 500);
  }

  return (
    <div className="container">
      <Sidebar open={sidebarOpen} setOpen={setSidebarOpen} handleSend={handleSend}/>
      <main className="chat-window">
        <ChatHeader theme={theme} setTheme={setTheme} sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
        <ChatBox messages={messages} chatRef={chatRef}/>
        <ChatInput onSend={handleSend} scrollToBottom={scrollToBottom} showScrollButton={showScrollButton} />
      </main>
    </div>
  );
}
