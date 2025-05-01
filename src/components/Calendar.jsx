import { useState, useEffect } from "react";

export default function Calendar() {
    const [currentDate, setCurrentDate] = useState(new Date());
    const [days, setDays] = useState([]);
    const [title, setTitle] = useState('');

    useEffect(() => {
        renderCalendar(currentDate);
    }, [currentDate]);

    function renderCalendar(date) {
        const year = date.getFullYear();
        const month = date.getMonth();

        const monthNames = [
        "January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
        ];
        setTitle(`${monthNames[month]} ${year}`);

        const firstDayOfMonth = new Date(year, month, 1);
        const lastDayOfMonth = new Date(year, month + 1, 0);

        let firstDayIndex = firstDayOfMonth.getDay();
        if (firstDayIndex === 0) firstDayIndex = 7; // Sunday last

        const newDays = [];

        // Add empty days before the first of the month
        for (let i = 1; i < firstDayIndex; i++) {
            newDays.push(<div key={`empty-${i}`} className="opacity-0"></div>);          
        }

        for (let day = 1; day <= lastDayOfMonth.getDate(); day++) {
            const today = new Date();
            const isToday = 
                day === today.getDate() &&
                month === today.getMonth() &&
                year === today.getFullYear();
                
            newDays.push(
                <div
                    key={day}
                    className={`p-2 text-center rounded-md cursor-pointer transition duration-200 ${
                        isToday
                          ? "bg-[var(--calendar-today)] font-bold text-[--today-text]"
                          : "hover:bg-[var(--button-hover)]"
                      }`}
                    >
                    {day}
                </div>
            );
        }

        setDays(newDays);
    }

    const handlePrev = () => {
        const newDate = new Date(currentDate);
        newDate.setMonth(newDate.getMonth() - 1);
        setCurrentDate(newDate);
    }

    const handleNext = () => {
        const newDate = new Date(currentDate);
        newDate.setMonth(newDate.getMonth() + 1);
        setCurrentDate(newDate);
    }

    const handleToday = () => {
        const today = new Date();
        setCurrentDate(today);
    }

    return (
        <div className="calendar">
            <div className="calendar-header">
                <button id="prev-month" className="prev-btn btn" onClick={handlePrev}>
                    <i className="fa-solid fa-angle-left cursor-pointer"></i>
                </button>

                <div id="calendar-title" className="font-bold text-base cursor-pointer" onClick={handleToday}>
                    {title}
                </div>

                <button id="next-month" className="next-btn btn" onClick={handleNext}>
                    <i className="fa-solid fa-angle-right"></i>
                </button>
            </div>

            <div className="weekdays">
                <span>Mon</span><span>Tue</span><span>Wed</span><span>Thu</span><span>Fri</span><span>Sat</span><span>Sun</span>
            </div>

            <div id="calendar-days" className="days">
                {days}
            </div>
        </div>
    );
}