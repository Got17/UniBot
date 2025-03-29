const themeSelector = document.getElementById("theme-selector");

// Load saved theme (if any)
const savedTheme = localStorage.getItem("theme");
if (savedTheme) {
    document.body.classList.add(`theme-${savedTheme}`);
    themeSelector.value = savedTheme; 
}

// Listen for theme changes
themeSelector.addEventListener("change", (e) => {
    const theme = e.target.value;

    if(["dark", "light", "coffee"].includes(theme)) {
        // Remove all other theme classes
        document.body.classList.remove("theme-dark", "theme-light", "theme-coffee");
        
        // Add the selected theme
        document.body.classList.add(`theme-${theme}`);
    }

    // Save it to localStorage
    localStorage.setItem("theme", theme);
});