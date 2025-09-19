//Lviv default coordinates
const DEFAULT_LAT = 49.842957;
const DEFAULT_LON = 24.03111;
const DEFAULT_LOCATION_DATA = { lat: DEFAULT_LAT, lon: DEFAULT_LON };

// Showing function
function showSunCycleLoader(
  sunCycleLoader: HTMLElement,
  sunCycleInfo: HTMLElement,
  sunCycleError: HTMLElement
): void {
  sunCycleInfo.classList.add("hidden");
  sunCycleError.classList.add("hidden");
  sunCycleLoader.classList.remove("hidden");
}

function hideSunCycleLoader(sunCycleLoader: HTMLElement): void {
  sunCycleLoader.classList.add("hidden");
}

function showSunCycleInfo(
  sunCycleLoader: HTMLElement,
  sunCycleError: HTMLElement,
  sunCycleInfo: HTMLElement
): void {
  sunCycleLoader.classList.add("hidden");
  sunCycleError.classList.add("hidden");
  sunCycleInfo.classList.remove("hidden");
}

function showSunCycleError(
  message: string,
  sunCycleLoader: HTMLElement,
  sunCycleInfo: HTMLElement,
  sunCycleError: HTMLElement,
  sunCycleErrorText: HTMLElement
): void {
  sunCycleLoader.classList.add("hidden");
  sunCycleInfo.classList.add("hidden");
  sunCycleErrorText.textContent = message;
  sunCycleError.classList.remove("hidden");
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
function renderSunriseSunset(
  data: SunriseSunsetData,
  sunCycleInfo: HTMLElement,
  sunCycleLoader: HTMLElement,
  sunCycleError: HTMLElement
): void {
  if (!data || !data.results) {
    throw new Error("Incorrect data format received for rendering.");
  }

  const { sunrise, sunset, day_length } = data.results;

  // Local data format
  const formatTime = (isoTime: string): string => {
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

  showSunCycleInfo(sunCycleLoader, sunCycleError, sunCycleInfo);
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
      navigator.geolocation.getCurrentPosition(onSuccess, onError);
    } else {
      console.warn("Browser does not support Geolocation API.");
      resolve(undefined);
    }
  });
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
    throw new Error(`Error API: ${data.status} - ${data.status_code || ""}`);
  }
  return data;
}

// Widget initialization function
export async function initSunCycleWidget(): Promise<void> {
  const sunCycleLoader = document.getElementById("sunCycleLoader")!;
  const sunCycleInfo = document.getElementById("sunCycleInfo")!;
  const sunCycleError = document.getElementById("sunCycleError")!;
  const sunCycleErrorText = sunCycleError.querySelector(
    ".sun-cycle-error-text"
  ) as HTMLElement;

  showSunCycleLoader(sunCycleLoader, sunCycleInfo, sunCycleError);

  try {
    const userLocationData = await getUserGeolocationData();
    const resolvedLocationData = userLocationData || DEFAULT_LOCATION_DATA;
    const data = await fetchSunriseSunsetData(
      resolvedLocationData.lat,
      resolvedLocationData.lon
    );
    renderSunriseSunset(data, sunCycleInfo, sunCycleLoader, sunCycleError);
  } catch (error: unknown) {
    console.error("Failed to load or render sunrise/sunset data:", error);
    if (error instanceof Error) {
      showSunCycleError(
        `Error: ${error.message}`,
        sunCycleLoader,
        sunCycleInfo,
        sunCycleError,
        sunCycleErrorText
      );
    } else {
      showSunCycleError(
        "An unexpected error occurred.",
        sunCycleLoader,
        sunCycleInfo,
        sunCycleError,
        sunCycleErrorText
      );
    }
  } finally {
    hideSunCycleLoader(sunCycleLoader);
  }
}
