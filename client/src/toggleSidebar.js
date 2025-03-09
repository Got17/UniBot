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

    function fixContainerHeight() {
        const container = document.querySelector('.container');
        const chatBox = document.querySelector('.chat-box');
        const chatInput = document.querySelector('.chat-input-container');
    
        // Get correct viewport height dynamically
        let viewportHeight = document.documentElement.clientHeight; // More reliable than window.innerHeight
    
        if (window.visualViewport) {
            viewportHeight = window.visualViewport.height; // Fix for Safari's shrinking viewport
        }
    
        // Apply fixed height
        container.style.height = `${viewportHeight}px`;
        container.style.minHeight = `${viewportHeight}px`;
    
        // Adjust chat-box height dynamically to prevent cut-offs
        const headerHeight = document.querySelector('.chat-header').offsetHeight;
        const inputHeight = chatInput.offsetHeight;
        chatBox.style.maxHeight = `${viewportHeight - headerHeight - inputHeight - 20}px`;
    }
    
    // Run fixes on page load, resize, and orientation change
    window.addEventListener('resize', fixContainerHeight);
    window.addEventListener('load', fixContainerHeight);
    window.addEventListener('orientationchange', fixContainerHeight);
    
});