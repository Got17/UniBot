import { useState, useEffect } from "react";
import Calendar from "./Calendar";

export default function Sidebar({ open, setOpen }) {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const saved = localStorage.getItem("sidebar");
    if (saved === "closed") setOpen(false);
  }, []);

  useEffect(() => {
    localStorage.setItem("sidebar", open ? "open" : "closed");
  }, [open]);

  return (
    <aside className={`sidebar ${open ? "open" : "closed hidden"} ${!open && isMobile ? "hidden" : ""}`}>
      <div className="relative group">
        <button className="close-btn flex" onClick={() => setOpen(false)}>
          <i className="fa-solid fa-times text-2xl"></i>
        </button>
        <span className="tooltip left-[25%] top-8">Close sidebar</span>
      </div>

      <div className="mt-10">
        <button className="btn">Study Office Opening hour</button>
        <button className="btn">IRO Opening hour</button>
      </div>

      <div className="links">
        <h3>Useful Links</h3>
        <ul>
          <li>
            <a href="https://www.uniduna.hu/" target="_blank">
              <i className="fa-solid fa-award"></i>
              <span className="link-element">University</span>
            </a>
          </li>
          <li>
            <a href="https://nappw.dfad.duf.hu/hallgato_ng/login" target="_blank">
              <i className="fa-solid fa-award"></i>
              <span className="link-element">Neptun</span>
            </a>
          </li>
          <li>
            <a href="https://v39.moodle.uniduna.hu/login/index.php" target="_blank">
              <i className="fa-solid fa-award"></i>
              <span className="link-element">Moodle</span>
            </a>
          </li>
        </ul>
      </div>

      <Calendar />
    </aside>
  );
}
