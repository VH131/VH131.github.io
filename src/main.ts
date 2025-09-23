// Import all necessary CSS files to be processed by webpack
import "../styles/base.css";
import "../styles/layout.css";
import "../styles/theme.css";
import "../styles/cv-sections.css";
import "../styles/settings.css";
import "../styles/sun-cycle-widget.css";

// Import necessary modules and functions from the same directory
import { renderCV } from "./cv-renderer";
import { initializeSettingsAndTheme } from "./settings-handler";
import { initSunCycleWidget } from "./sun-cycle-widget";
import type { CVConfig } from "./cv-types";

const loaderElement = document.getElementById("cvLoader");
const errorElement = document.getElementById("cvError");

async function fetchCVConfig(): Promise<CVConfig> {
  const response = await fetch("/cv-config.json");
  if (!response.ok) throw new Error("Failed to load CV config");
  return response.json();
}

// The function to initialize all event listeners and rendering
async function initApp(): Promise<void> {
  try {
    // Call the function to initialize settings and theme
    initializeSettingsAndTheme();

    errorElement?.classList.add("hidden");
    loaderElement?.classList.remove("hidden");

    // Call the main function to render the CV
    const cvConfig = await fetchCVConfig();
    renderCV(cvConfig);

    // Call the function to update the sun position
    initSunCycleWidget();
  } catch (error) {
    // Log any errors to the console to help with debugging
    console.error(
      "An error occurred during application initialization:",
      error
    );
    console.error("App initialization error:", error);
    if (errorElement) {
      errorElement.textContent =
        error instanceof Error ? error.message : String(error);
      errorElement.classList.remove("hidden");
    }
  } finally {
    loaderElement?.classList.add("hidden");
  }
}

// Ensure the DOM is fully loaded before running the app
document.addEventListener("DOMContentLoaded", initApp);
