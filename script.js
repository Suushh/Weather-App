const apiKey = 'c51b6c451fa56bb2fc1c8fde5da0f06e';
const apiUrl = 'https://api.openweathermap.org/data/2.5/weather';

function getWeather() {
    const locationInput = document.getElementById('locationInput');
    const location = locationInput.value;

    if (!location) {
        alert('Please enter a location');
        return;
    }

    fetch(`${apiUrl}?q=${location}&appid=${apiKey}`)
        .then(response => response.json())
        .then(data => {
            displayWeather(data);
            // Show toggle unit and get forecast buttons
            document.querySelector('.toggle-unit-container').style.display = 'block';
            document.getElementById('getForecastButton').style.display = 'inline-block';
        })
        .catch(error => {
            console.error('Error fetching weather data:', error);
            alert('Error fetching weather data. Please try again.');
        });
}
let isCelsius = true;

function toggleTemperatureUnit() {
    isCelsius = !isCelsius;
    getWeather(); // Refresh weather data with the new unit
    // Update the button label
    document.getElementById('toggleUnitButton').innerText = isCelsius ? "Switch to Fahrenheit" : "Switch to Celsius";
}

function displayWeather(data) {
    const weatherInfo = document.getElementById('weatherInfo');

    // const temperature = Math.round(data.main.temp - 273.15); // Convert Kelvin to Celsius
    const humidity = data.main.humidity;
    const windSpeed = data.wind.speed;
    const weatherDescription = data.weather[0].description;
    const weatherIcon = data.weather[0].icon;
    const iconUrl = `http://openweathermap.org/img/w/${weatherIcon}.png`;
    let temperatureUnit = isCelsius ? "°C" : "°F";
    const temperatur = isCelsius ? Math.round(data.main.temp - 273.15) : Math.round((data.main.temp - 273.15) * 9/5 + 32);


    const weatherHtml = `
        <h1 style="text-decoration: underline; font-style:italic; font-size:40px;">Current Weather</h1>
        <p style="font-size:25px;" ><strong>Temperature:</strong> ${temperatur}${temperatureUnit}</p>
        
        <p style="font-size:25px;"><strong>Humidity:</strong> ${humidity}%</p>
        <p style="font-size:25px;"><strong>Wind Speed:</strong> ${windSpeed} m/s</p>
        <p style="font-size:25px;"><strong>Weather:</strong> ${weatherDescription}</p>
        <div style="background-color: white; display: inline-block; padding: 5px; border-radius: 8px;">
        <img src="${iconUrl}" alt="Weather Icon" style="width: 50px; height: 50px; border-radius: 50%;">
    </div>
    `;

    weatherInfo.innerHTML = weatherHtml;
    
   

    document.getElementById('weatherInfo').innerHTML = weatherHtml;
}


function getWeatherForecast() {
    const locationInput = document.getElementById('locationInput');
    const location = locationInput.value;

    if (!location) {
        alert('Please enter a location');
        return;
    }

    fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${location}&appid=${apiKey}`)
        .then(response => response.json())
        .then(data => {
            displayWeatherForecast(data);
        })
        .catch(error => {
            console.error('Error fetching weather forecast data:', error);
            alert('Error fetching weather forecast data. Please try again.');
        });
}



function displayWeatherForecast(data) {
    const forecastContainer = document.getElementById('forecast');
    forecastContainer.innerHTML = ''; // Clear previous forecast data

    const forecastDays = Math.min(5, Math.floor(data.list.length / 8)); // Display forecast for the next 5 days

    for (let i = 0; i < forecastDays; i++) {
        const forecastData = data.list[i * 8]; // Take data for every 8th interval (24 hours)
        const forecastDate = new Date(forecastData.dt * 1000); // Convert timestamp to Date object
        const forecastTemperature = Math.round(forecastData.main.temp - 273.15); // Convert Kelvin to Celsius
        const forecastWeatherDescription = forecastData.weather[0].description;
        const forecastIcon = forecastData.weather[0].icon;
        const forecastIconUrl = `http://openweathermap.org/img/w/${forecastIcon}.png`;

        const forecastHtml = `
            <div class="forecast-day">
                <p class="forecast-date">${forecastDate.toLocaleDateString()}</p>
                <p class="forecast-temperature">${forecastTemperature}°C</p>
                <p class="forecast-description">${forecastWeatherDescription}</p>
                <img src="${forecastIconUrl}" alt="Forecast Weather Icon">
            </div>
        `;

        forecastContainer.innerHTML += forecastHtml;
    }
}
