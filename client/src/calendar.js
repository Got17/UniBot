document.addEventListener("DOMContentLoaded", () => {
    const calendarTitle = document.getElementById("calendar-title");
    const calendarDays = document.getElementById("calendar-days");
    const prevMonthBtn = document.getElementById("prev-month");
    const nextMonthBtn = document.getElementById("next-month");

    // Current date
    let currentDate = new Date();

    function renderCalendar(date) {
        const year = date.getFullYear();
        const month = date.getMonth();

        // Update the title with the current month and year
        const monthNames = [
            "January", "February", "March", "April", "May", "June",
            "July", "August", "September", "October", "November", "December"
        ];
        calendarTitle.textContent = `${monthNames[month]} ${year}`;

        // Clear the previous calendar
        calendarDays.innerHTML = "";

        // Get the first and last day of the month
        const firstDayOfMonth = new Date(year, month, 1);
        const lastDayOfMonth = new Date(year, month + 1, 0);

        // Get the day of the week the first day falls on (0 = Sunday, adjust for Monday start)
        let firstDayIndex = firstDayOfMonth.getDay();
        if (firstDayIndex === 0) firstDayIndex = 7; // Make Sunday the last day

        // Fill in blank spaces before the first day
        for (let index = 1; index < firstDayIndex; index++) {
            const emptyCell = document.createElement("div");
            emptyCell.classList.add("opacity-0");
            calendarDays.appendChild(emptyCell);
        }

        // Populate the calendar with actual dates
        for (let day = 1; day < lastDayOfMonth.getDate(); day++) {
            const dayElement = document.createElement("div");
            dayElement.textContent = day;
            dayElement.classList.add(
                "p-3", "text-center", "rounded-md", "cursor-pointer", "transition", "duration-200"
            );         
            
            
            // Highlight today's date
            const today = new Date();
            if (
                day === today.getDate() &&
                month === today.getMonth() &&
                year === today.getFullYear()
            ) {
                dayElement.classList.add("bg-blue-500", "text-white", "font-bold");
            } else {
                dayElement.classList.add("hover:bg-gray-200");
            }

            calendarDays.appendChild(dayElement);
        }
    }

    // Initial render
    renderCalendar(currentDate);

    // Event listeners for navigating months
    prevMonthBtn.addEventListener("click", () => {
        currentDate.setMonth(currentDate.getMonth() - 1);
        renderCalendar(currentDate);
    });

    nextMonthBtn.addEventListener("click", () => {
        currentDate.setMonth(currentDate.getMonth() + 1);
        renderCalendar(currentDate);
    })
});