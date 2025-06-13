// This file handles the settings menu and theme switching logic
let themeSwitch;
let settingsButton;
let settingsMenu;
let closeSidebarButton;
let sidebarOverlay;

// Function to set the theme
function setTheme(themeName) {
  localStorage.setItem("theme", themeName); // Save theme to localStorage
  document.body.className = themeName; // Apply the theme class to the body
  if (themeSwitch) {
    themeSwitch.checked = themeName === "dark-theme";
  }
}

// Function to toggle theme
function toggleTheme() {
  if (localStorage.getItem("theme") === "dark-theme") {
    setTheme("light-theme");
  } else {
    setTheme("dark-theme");
  }
}

// Function to open the settings menu
function openSettingsMenu() {
  document.body.classList.add("sidebar-open");
}

// Function to close the settings menu
function closeSettingsMenu() {
  document.body.classList.remove("sidebar-open");
}

// When DOM has loaded, initialize everything
function initializeSettingsAndTheme() {
  // Get elements
  themeSwitch = document.getElementById("checkbox");
  settingsButton = document.querySelector(".settings-button");
  settingsMenu = document.getElementById("settingsMenu");
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
