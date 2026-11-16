
/* =========================================
   BAZI KHOONE - SHARED JAVASCRIPT
   ========================================= */

(() => {
    "use strict";

    const palettes = [
        "violet",
        "blue",
        "green",
        "orange",
        "pink"
    ];

    const root = document.documentElement;

    const themeButton = document.getElementById("themeButton");
    const paletteButton = document.getElementById("paletteButton");
    const paletteMenu = document.getElementById("paletteMenu");
    const paletteWrap = document.querySelector(".palette-wrap");

    function applyPreferences() {
        const theme = localStorage.getItem("bk-theme") || "dark";
        const palette = localStorage.getItem("bk-palette") || "violet";

        root.dataset.theme = theme;
        root.dataset.palette = palette;

        if (themeButton) {
            themeButton.textContent = theme === "dark" ? "☀️" : "🌙";
            themeButton.title = theme === "dark"
                ? "تغییر به حالت روشن"
                : "تغییر به حالت تاریک";
        }

        document.querySelectorAll(".palette-option").forEach(button => {
            const isActive = button.dataset.palette === palette;
            button.classList.toggle("active", isActive);
            button.setAttribute("aria-pressed", String(isActive));
        });
    }

    // Theme toggle
    if (themeButton) {
        themeButton.addEventListener("click", () => {
            const current = localStorage.getItem("bk-theme") || "dark";
            const next = current === "dark" ? "light" : "dark";

            localStorage.setItem("bk-theme", next);
            applyPreferences();
        });
    }

    // Open/close palette menu on touch devices
    if (paletteButton && paletteWrap) {
        paletteButton.addEventListener("click", event => {
            event.stopPropagation();

            const isOpen = paletteWrap.classList.toggle("open");
            paletteButton.setAttribute("aria-expanded", String(isOpen));
        });

        document.addEventListener("click", event => {
            if (!paletteWrap.contains(event.target)) {
                paletteWrap.classList.remove("open");
                paletteButton.setAttribute("aria-expanded", "false");
            }
        });

        document.addEventListener("keydown", event => {
            if (event.key === "Escape") {
                paletteWrap.classList.remove("open");
                paletteButton.setAttribute("aria-expanded", "false");
            }
        });
    }

    // Direct palette selection
    if (paletteMenu) {
        paletteMenu.querySelectorAll("[data-palette]").forEach(button => {
            button.addEventListener("click", () => {
                const selectedPalette = button.dataset.palette;

                if (!palettes.includes(selectedPalette)) return;

                localStorage.setItem("bk-palette", selectedPalette);
                applyPreferences();

                if (paletteWrap) {
                    paletteWrap.classList.remove("open");
                    paletteButton.setAttribute("aria-expanded", "false");
                }
            });
        });
    }

    applyPreferences();
})();
