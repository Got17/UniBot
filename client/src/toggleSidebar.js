document.addEventListener("DOMContentLoaded", function () {
    const menuBtn = document.querySelector(".menu-btn");
    const closeBtn = document.querySelector(".close-btn");
    const sidebar = document.querySelector(".sidebar");

    function toggleSidebar() {
        if (sidebar.classList.contains("closed")){
            sidebar.classList.remove("hidden");
            setTimeout(() => {
                sidebar.classList.remove("closed");
            }, 10);
            menuBtn.classList.add("hidden");
            sidebar.classList.add("open");
        } else {
            sidebar.classList.add("closed");
            setTimeout(() => {
                sidebar.classList.add("hidden");
            }, 200);
            menuBtn.classList.remove("hidden");
            sidebar.classList.remove("open");
        }
    }

    // Open Sidebar when clicking the hamburger menu
    menuBtn.addEventListener("click", toggleSidebar);

    // Close Sidebar when clicking the close button
    closeBtn.addEventListener("click", toggleSidebar);
});