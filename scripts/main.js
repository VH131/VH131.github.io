// Import all necessary CSS files to be processed by webpack
import "../styles/base.css";
import "../styles/layout.css";
import "../styles/theme.css";
import "../styles/cv-sections.css";
import "../styles/settings.css";
import "../styles/sun-cycle-widget.css";

// Import necessary modules and functions from the same directory
import { renderCV } from "./cv-renderer.js";
import { initializeSettingsAndTheme } from "./settings-handler.js";
import { initSunCycleWidget } from "./sun-cycle-widget.js";

// The function to initialize all event listeners and rendering
function initApp() {
  try {
    // Call the function to initialize settings and theme
    initializeSettingsAndTheme();

    // Call the main function to render the CV
    renderCV();

    // Call the function to update the sun position
    initSunCycleWidget();
  } catch (error) {
    // Log any errors to the console to help with debugging
    console.error(
      "An error occurred during application initialization:",
      error
    );
  }
}

// Ensure the DOM is fully loaded before running the app
document.addEventListener("DOMContentLoaded", initApp);
