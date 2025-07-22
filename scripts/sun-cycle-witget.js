//Lviv default coordinates
const DEFAULT_LAT = 49.842957;
const DEFAULT_LON = 24.03111;

// Get DOM elements
const sunCycleLoader = document.getElementById("sunCycleLoader");
const sunCycleInfo = document.getElementById("sunCycleInfo");
const sunCycleError = document.getElementById("sunCycleError");
const sunCycleErrorText = sunCycleError.querySelector(".sun-cycle-error-text");

// Showing function
function showSunCycleLoader() {
  sunCycleInfo.classList.add("hidden");
  sunCycleError.classList.add("hidden");
  sunCycleLoader.classList.remove("hidden");
}

function hideSunCycleLoader() {
  sunCycleLoader.classList.add("hidden");
}

function showSunCycleInfo() {
  sunCycleLoader.classList.add("hidden");
  sunCycleError.classList.add("hidden");
  sunCycleInfo.classList.remove("hidden");
}

function showSunCycleError(message) {
  sunCycleLoader.classList.add("hidden");
  sunCycleInfo.classList.add("hidden");
  sunCycleErrorText.textContent = message;
  sunCycleError.classList.remove("hidden");
}

//Function for rendering sunrise/sunset data
function renderSunriseSunset(data) {
  if (!data || !data.results) {
    showSunCycleError("Incorrect data.");
    return;
  }

  const { sunrise, sunset, day_length } = data.results;

  // Local data format
  const formatTime = (isoTime) => {
    const date = new Date(isoTime);
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };

  sunCycleInfo.innerHTML = `
        <p><span class="label">Sunrise:</span> <span class="value">${formatTime(
          sunrise
        )}</span></p>
        <p><span class="label">Sunset:</span> <span class="value">${formatTime(
          sunset
        )}</span></p>
        <p><span class="label">Day:</span> <span class="value">${day_length}</span></p>
    `;
  showSunCycleInfo();
}

// Function to retrieve sunrise/sunset data from API
async function fetchSunriseSunsetData(lat, lon) {
  showSunCycleLoader();
  try {
    const url = `https://api.sunrise-sunset.org/json?lat=${lat}&lng=${lon}&formatted=0`;
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`Error HTTP: ${response.status}`);
    }

    const data = await response.json();

    if (data.status !== "OK") {
      throw new Error(`Error API: ${data.status}`);
    }

    renderSunriseSunset(data);
  } catch (error) {
    console.error("Sunrise/sunset data download error:", error);
    showSunCycleError(`Error: ${error.message}`);
  } finally {
    hideSunCycleLoader();
  }
}

// Get current user geolocation function
function initSunCycleWidget() {
  showSunCycleLoader();
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const lat = position.coords.latitude;
        const lon = position.coords.longitude;
        fetchSunriseSunsetData(lat, lon);
      },
      (error) => {
        console.warn(
          "Geolocation is not available. Use default values:",
          error
        );
        showSunCycleError("Geolocation is not available");
        fetchSunriseSunsetData(DEFAULT_LAT, DEFAULT_LON);
      }
    );
  } else {
    console.warn("Browser is not support");
    showSunCycleError("Geolocation is not available");
    fetchSunriseSunsetData(DEFAULT_LAT, DEFAULT_LON);
  }
}

// Widget initialization in DOM
document.addEventListener("DOMContentLoaded", initSunCycleWidget);
