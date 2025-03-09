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
    
        // Get correct viewport height
        let viewportHeight = window.innerHeight;
    
        // Fix for Safari visual viewport issues
        if (window.visualViewport) {
            viewportHeight = window.visualViewport.height;
        }
    
        // Apply height fixes
        container.style.height = `${viewportHeight}px`;
        container.style.minHeight = `${viewportHeight}px`;
    
        // Ensure chat input is visible
        chatInput.style.bottom = `${Math.max(16, window.visualViewport?.height * 0.02)}px`;
    
        // Adjust chat-box height dynamically
        const headerHeight = document.querySelector('.chat-header').offsetHeight;
        const inputHeight = chatInput.offsetHeight;
        chatBox.style.maxHeight = `${viewportHeight - headerHeight - inputHeight - 20}px`;
    }
    
    // Run on load and resize
    window.addEventListener('resize', fixContainerHeight);
    window.addEventListener('load', fixContainerHeight);
});