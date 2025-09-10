// This file handles the settings menu and theme switching logic
let themeSwitch: HTMLInputElement | null;
let settingsButton: HTMLButtonElement | null;
let closeSidebarButton: HTMLElement | null;
let sidebarOverlay: HTMLElement | null;

// Function to set the theme
function setTheme(themeName: string): void {
  localStorage.setItem("theme", themeName); // Save theme to localStorage
  document.body.className = themeName; // Apply the theme class to the body
  if (themeSwitch) {
    themeSwitch.checked = themeName === "dark-theme";
  }
}

// Function to toggle theme
function toggleTheme(): void {
  if (localStorage.getItem("theme") === "dark-theme") {
    setTheme("light-theme");
  } else {
    setTheme("dark-theme");
  }
}

// Function to open the settings menu
function openSettingsMenu(): void {
  document.body.classList.add("sidebar-open");
}

// Function to close the settings menu
function closeSettingsMenu(): void {
  document.body.classList.remove("sidebar-open");
}

// When DOM has loaded, initialize everything
export function initializeSettingsAndTheme(): void {
  // Get elements
  themeSwitch = document.getElementById("checkbox") as HTMLInputElement | null;
  settingsButton = document.querySelector(".settings-button");
  closeSidebarButton = document.querySelector(".close-sidebar-button");
  sidebarOverlay = document.getElementById("sidebarOverlay");

  // Add event listener for theme switcher
  if (themeSwitch) {
    themeSwitch.addEventListener("change", toggleTheme);
  }

  // Initialize theme on page load
  const savedTheme = localStorage.getItem("theme");
  if (savedTheme) {
    setTheme(savedTheme);
  } else if (
    window.matchMedia &&
    window.matchMedia("(prefers-color-scheme: dark)").matches
  ) {
    setTheme("dark-theme");
  } else {
    setTheme("light-theme");
  }

  // Add event listeners for settings menu
  if (settingsButton) {
    settingsButton.addEventListener("click", openSettingsMenu);
  }
  if (closeSidebarButton) {
    closeSidebarButton.addEventListener("click", closeSettingsMenu);
  }

  if (sidebarOverlay) {
    sidebarOverlay.addEventListener("click", closeSettingsMenu);
  }
}
