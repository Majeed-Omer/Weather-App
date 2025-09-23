const apiKey = "f8846f571e24b9eceef226a697447a09"; // Replace with your real key

// Allow Enter key to trigger search
document.getElementById("cityInput").addEventListener("keydown", function (event) {
  if (event.key === "Enter") {
    getWeather();
  }
});

async function getWeather() {
  const city = document.getElementById("cityInput").value.trim();
  const loader = document.getElementById("loader");
  const errorMsg = document.getElementById("errorMsg");
  const weatherCard = document.getElementById("weatherResult");

  if (!city) {
    showError("⚠️ Please enter a city name");
    return;
  }

  if (apiKey === "YOUR_API_KEY") {
    showError("⚠️ Please set your OpenWeatherMap API key in script.js");
    return;
  }

  // Reset UI
  loader.classList.remove("hidden");
  errorMsg.classList.add("hidden");
  weatherCard.classList.add("hidden");

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  try {
    const response = await fetch(url);
    loader.classList.add("hidden");

    if (!response.ok) throw new Error("City not found ❌");

    const data = await response.json();

    document.getElementById("cityName").textContent = `${data.name}, ${data.sys.country}`;
    document.getElementById("temp").textContent = `${data.main.temp.toFixed(1)}°C`;
    document.getElementById("description").textContent = data.weather[0].description;
    document.getElementById("humidity").textContent = `💧 ${data.main.humidity}%`;
    document.getElementById("wind").textContent = `🌬 ${data.wind.speed} m/s`;

    const iconCode = data.weather[0].icon;
    const iconUrl = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
    document.getElementById("weatherIcon").src = iconUrl;

    // Dynamic background based on weather
    setBackground(data.weather[0].main);

    weatherCard.classList.remove("hidden");
  } catch (error) {
    loader.classList.add("hidden");
    showError(error.message);
  }
}

// Show error inside app
function showError(message) {
  const errorMsg = document.getElementById("errorMsg");
  errorMsg.textContent = message;
  errorMsg.classList.remove("hidden");
}

// Change background dynamically
function setBackground(weather) {
  const body = document.body;
  switch (weather.toLowerCase()) {
    case "clear":
      body.style.background = "linear-gradient(135deg, #f9d423, #ff4e50)"; // sunny
      break;
    case "clouds":
      body.style.background = "linear-gradient(135deg, #757f9a, #d7dde8)"; // cloudy
      break;
    case "rain":
    case "drizzle":
      body.style.background = "linear-gradient(135deg, #2c3e50, #3498db)"; // rainy
      break;
    case "snow":
      body.style.background = "linear-gradient(135deg, #83a4d4, #b6fbff)"; // snowy
      break;
    case "thunderstorm":
      body.style.background = "linear-gradient(135deg, #141e30, #243b55)"; // stormy
      break;
    default:
      body.style.background = "linear-gradient(135deg, #4facfe, #00f2fe)"; // default
  }
}
