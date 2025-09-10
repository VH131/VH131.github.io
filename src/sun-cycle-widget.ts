//Lviv default coordinates
const DEFAULT_LAT = 49.842957;
const DEFAULT_LON = 24.03111;
const DEFAULT_LOCATION_DATA = { lat: DEFAULT_LAT, lon: DEFAULT_LON };

// Get DOM elements
const sunCycleLoader = document.getElementById("sunCycleLoader");
const sunCycleInfo = document.getElementById("sunCycleInfo");
const sunCycleError = document.getElementById("sunCycleError");
const sunCycleErrorText = sunCycleError?.querySelector(".sun-cycle-error-text");

// Showing function
function showSunCycleLoader(): void {
  sunCycleInfo?.classList.add("hidden");
  sunCycleError?.classList.add("hidden");
  sunCycleLoader?.classList.remove("hidden");
}

function hideSunCycleLoader(): void {
  sunCycleLoader?.classList.add("hidden");
}

function showSunCycleInfo(): void {
  sunCycleLoader?.classList.add("hidden");
  sunCycleError?.classList.add("hidden");
  sunCycleInfo?.classList.remove("hidden");
}

function showSunCycleError(message: string): void {
  sunCycleLoader?.classList.add("hidden");
  sunCycleInfo?.classList.add("hidden");
  if (sunCycleErrorText) {
    sunCycleErrorText.textContent = message;
  }
  sunCycleError?.classList.remove("hidden");
}

interface SunriseSunsetResults {
  sunrise: string;
  sunset: string;
  day_length: string;
}

interface SunriseSunsetData {
  results: SunriseSunsetResults;
  status?: string;
  status_code?: number;
}

//Function for rendering sunrise/sunset data
function renderSunriseSunset(data: SunriseSunsetData): void {
  if (!data || !data.results) {
    throw new Error("Incorrect data format received for rendering.");
  }

  const { sunrise, sunset, day_length } = data.results;

  // Local data format
  const formatTime = (isoTime: string): string => {
    const date = new Date(isoTime);
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };

  if (sunCycleInfo) {
    sunCycleInfo.innerHTML = `
        <p><span class="label">Sunrise:</span> <span class="value">${formatTime(
          sunrise
        )}</span></p>
        <p><span class="label">Sunset:</span> <span class="value">${formatTime(
          sunset
        )}</span></p>
        <p><span class="label">Day:</span> <span class="value">${day_length}</span></p>
    `;
  }
  showSunCycleInfo();
}
// Create promise function to resolve geolocation
async function getUserGeolocationData(): Promise<
  { lat: number; lon: number } | undefined
> {
  return new Promise((resolve) => {
    if (navigator.geolocation) {
      const onError = (error: GeolocationPositionError) => {
        console.warn("Geolocation error:", error);
        resolve(undefined);
      };
      const onSuccess = (position: GeolocationPosition) => {
        const lat = position.coords.latitude;
        const lon = position.coords.longitude;
        resolve({ lat, lon });
      };
      // Get current user position.
      navigator.geolocation.getCurrentPosition(onSuccess, onError);
    } else {
      console.warn("Browser does not support Geolocation API.");
    }
  });
}
// Widget initialization function
export async function initSunCycleWidget(): Promise<void> {
  showSunCycleLoader();
  try {
    const userLocationData = await getUserGeolocationData();
    const resovedLocationData = userLocationData || DEFAULT_LOCATION_DATA;
    const data = await fetchSunriseSunsetData(
      resovedLocationData.lat,
      resovedLocationData.lon
    );
    renderSunriseSunset(data);
  } catch (error: unknown) {
    console.error("Failed to load or render sunrise/sunset data:", error);
    if (error instanceof Error) {
      showSunCycleError(`Error: ${error.message}`);
    } else {
      showSunCycleError("An unexpected error occurred.");
    }
  } finally {
    hideSunCycleLoader();
  }
}
// Function to retrieve sunrise/sunset data from API
async function fetchSunriseSunsetData(
  lat: number,
  lon: number
): Promise<SunriseSunsetData> {
  const url = `https://api.sunrise-sunset.org/json?lat=${lat}&lng=${lon}&formatted=0`;
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`Error HTTP: ${response.status}`);
  }

  const data: SunriseSunsetData = await response.json();

  if (data.status !== "OK") {
    throw new Error(`Error API: ${data.status} - ${data.status_code} || ''`);
  }
  return data;
}
