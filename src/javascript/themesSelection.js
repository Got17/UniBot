const themeSelector = document.getElementById("theme-selector");

themeSelector.addEventListener("change", (e) => {
    const theme = e.target.value;

    if(["dark", "gruvbox", "light", "coffee"].includes(theme)) {
        document.body.classList.remove("theme-gruvbox", "theme-dark", "theme-light", "theme-coffee");
        document.body.classList.add(`theme-${theme}`);
    }
});