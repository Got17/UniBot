document.addEventListener("DOMContentLoaded", function () {
    const menuBtn = document.querySelector(".menu-btn");
    const closeBtn = document.querySelector(".close-btn");
    const sidebar = document.querySelector(".sidebar");

    // Function to check if the device is mobile
    function isMobile() {
        return window.innerWidth < 768;
    }

    // Initialize sidebar state based on screen size
    function initializeSidebar() {
        if (isMobile()) {
            sidebar.classList.add("closed", "hidden");
            sidebar.classList.remove("open");
            menuBtn.classList.remove("hidden");
        } else {
            sidebar.classList.remove("closed", "hidden");
            sidebar.classList.add("open");
            menuBtn.classList.add("hidden");
        }
    }

    // Sidebar toggle function
    function toggleSidebar() {
        const isClosed = sidebar.classList.contains("closed");

        if (isClosed) {
            sidebar.classList.remove("closed", "hidden");
            sidebar.classList.add("open");
            menuBtn.classList.add("hidden");
        } else {
            sidebar.classList.remove("open");
            sidebar.classList.add("closed");

            // Wait for animation to finish before hiding
            setTimeout(() => {
                sidebar.classList.add("hidden");
                menuBtn.classList.remove("hidden");
            }, 200);
        }
    }

    // Initialize sidebar on page load
    initializeSidebar();

    // Open sidebar when clicking the hamburger menu
    menuBtn.addEventListener("click", toggleSidebar);

    // Close sidebar when clicking the close button
    closeBtn.addEventListener("click", toggleSidebar);
});
