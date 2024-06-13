document.addEventListener('DOMContentLoaded', () => {
    const apiKey = '038c6d1c72cb62436c70e172a08f72d5';
    const getWeatherButton = document.getElementById('get-weather');
    const locationInput = document.getElementById('location');
    const cityElement = document.getElementById('city');
    const temperatureElement = document.getElementById('temperature');
    const conditionsElement = document.getElementById('conditions');
    const humidityElement = document.getElementById('humidity');
    const windElement = document.getElementById('wind');

    getWeatherButton.addEventListener('click', () => {
        const location = locationInput.value;
        if (location) {
            getWeather(location);
        } else {
            alert('Please enter a location');
        }
    });

    function getWeather(location) {
        fetch(`https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiKey}&units=metric`)
            .then(response => response.json())
            .then(data => {
                if (data.cod === 200) {
                    cityElement.textContent = `Weather in ${data.name}`;
                    temperatureElement.textContent = `Temperature: ${data.main.temp}°C`;
                    conditionsElement.textContent = `Conditions: ${data.weather[0].description}`;
                    humidityElement.textContent = `Humidity: ${data.main.humidity}%`;
                    windElement.textContent = `Wind Speed: ${data.wind.speed} m/s`;
                } else {
                    alert('Location not found');
                }
            })
            .catch(error => {
                alert('Error fetching weather data');
                console.error('Error:', error);
            });
    }

    // Optionally, get the user's current location and fetch weather data
    if ('geolocation' in navigator) {
        navigator.geolocation.getCurrentPosition(position => {
            const { latitude, longitude } = position.coords;
            fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`)
                .then(response => response.json())
                .then(data => {
                    if (data.cod === 200) {
                        cityElement.textContent = `Weather in ${data.name}`;
                        temperatureElement.textContent = `Temperature: ${data.main.temp}°C`;
                        conditionsElement.textContent = `Conditions: ${data.weather[0].description}`;
                        humidityElement.textContent = `Humidity: ${data.main.humidity}%`;
                        windElement.textContent = `Wind Speed: ${data.wind.speed} m/s`;
                    } else {
                        alert('Location not found');
                    }
                })
                .catch(error => {
                    alert('Error fetching weather data');
                    console.error('Error:', error);
                });
        });
    }
});
