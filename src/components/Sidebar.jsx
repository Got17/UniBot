import React, { useState, useEffect } from "react";
import Calendar from "./Calendar";

export default function Sidebar({ open, setOpen, handleSend }) {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const links = [
    { name: "University", url: "https://www.uniduna.hu/" },
    { name: "Neptun", url: "https://nappw.dfad.duf.hu/hallgato_ng/login" },
    { name: "Moodle", url: "https://v39.moodle.uniduna.hu/login/index.php" },
  ];

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const saved = localStorage.getItem("sidebar");
    if (saved === "closed") setOpen(false);
  }, [setOpen]);

  useEffect(() => {
    localStorage.setItem("sidebar", open ? "open" : "closed");
  }, [open]);

  return (
    <aside className={`sidebar ${open ? "open" : "closed hidden"} ${!open && isMobile ? "hidden" : ""}`}>
      <div className="relative group-tooltip">
        <button className="close-btn btn flex" onClick={() => setOpen(false)}>
          <i className="fa-solid fa-times text-2xl"></i>
        </button>
        <span className="tooltip left-[25%] top-8">Close sidebar</span>
      </div>

      <div className="mt-10">
        <button className="office-btn" onClick={() => handleSend("when is the opening hours of study office")}>Study Office Opening hour</button>
        <button className="office-btn" onClick={() => handleSend("when is the opening hours of international office")}>International Office Opening hour</button>
      </div>

      <div className="links">
        <h3>Useful Links</h3>
        <div className="links-container">
          {links.map((link, index) => (
            <React.Fragment key={index}>
              <a href={link.url} target="_blank" rel="noopener noreferrer" className="display-inline-block">
                <span className="link-element">{link.name}</span>
              </a>
              {index < links.length - 1 && <span className="links-separator">|</span>}
            </React.Fragment>           
          ))}
        </div>
      </div>

      <Calendar />
    </aside>
  );
}
