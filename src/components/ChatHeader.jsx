import { useEffect } from "react";

export default function ChatHeader({ theme, setTheme, sidebarOpen, setSidebarOpen }){

    useEffect(() => {
        // Save theme on changex
        localStorage.setItem("theme", theme);
    }, [theme]);

    const handleThemeChange = (e) => {
        const selectedTheme = e.target.value;
        if (["dark", "light", "coffee"].includes(selectedTheme)) {
            setTheme(selectedTheme);
        }
    };

    return (
        <div className="chat-header">
            <div className="relative group">
                {/* Hamburger Menu for Mobile */}
                <button 
                    className={`menu-btn ${sidebarOpen ? 'hidden' : ''}`}
                    onClick={() => setSidebarOpen(true)}
                >
                    <i className="fa-solid fa-bars text-2xl"></i>
                </button>
                <span className="tooltip left-16 top-10">Open Sidebar</span>
            </div>

            {/* Title + Logo */}
            <div className="flex items-center justify-center">
                <img className="w-[40px] h-[40px] mr-4" src={`${import.meta.env.BASE_URL}images/logo.png`} alt="uniduna-logo" />
                <span className="sm:hidden">UniBot</span>
                <span className="hidden sm:inline">
                UniBot - a chatbot dedicated for student of UniDuna
                </span>
            </div>

            {/* Theme Dropdown + Help */}
            <div className="flex justify-center items-center">
                <div className="mr-4 relative inline-flex">
                <svg
                    className="w-4 h-4 absolute top-0 right-0 m-[0.7rem] pointer-events-none"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
                <select
                    name="themes"
                    id="theme-selector"
                    className="theme-selector"
                    value={theme}
                    onChange={handleThemeChange}
                >
                    <option value="dark">Dark</option>
                    <option value="light">Light</option>
                    <option value="coffee">Coffee</option>
                </select>
                </div>

                <div className="relative group">
                <button className="help-btn">?</button>
                <span className="tooltip left-1/2 top-full">Help</span>
                </div>
            </div>
        </div>
    );
}