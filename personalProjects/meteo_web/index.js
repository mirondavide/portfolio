const container = document.querySelector('.container');
const searchButton = document.querySelector('.search-box button');
const searchInput = document.querySelector('.search-box input');
const weatherBox = document.querySelector('.weather-box');
const weatherDetails = document.querySelector('.weather-details');
const error404 = document.querySelector('.not-found');

const APIKey = '89d77bb80d9c7ae86a46f2faa01c1e0c';

function fetchWeather(city) {
    console.log('Fetching weather data for city:', city);  

    if (!city) {
        console.log('City input is empty');
        return;
    }

    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${APIKey}`)
        .then(response => {
            console.log('API Response:', response); 
            if (!response.ok) {
                console.error('API Error:', response);
                return Promise.reject('Failed to fetch weather data');
            }
            return response.json();
        })
        .then(json => {
            console.log('Weather Data:', json);  

            if (json.cod === '404') {
                console.log('City not found');  
                container.style.height = '400px';
                weatherBox.style.display = 'none';
                weatherDetails.style.display = 'none';
                error404.style.display = 'block';
                error404.classList.add('fadeIn');
                return;
            }

            error404.style.display = 'none';
            error404.classList.remove('fadeIn');

            const image = document.querySelector('.weather-box img');
            const temperature = document.querySelector('.weather-box .temperature');
            const description = document.querySelector('.weather-box .description');
            const humidity = document.querySelector('.weather-details .humidity span');
            const wind = document.querySelector('.weather-details .wind span');

            switch (json.weather[0].main) {
                case 'Clear':
                    image.src = 'images/clear.jpg.png';
                    break;
                case 'Rain':
                    image.src = 'images/rain.jpg.png';
                    break;
                case 'Snow':
                    image.src = 'images/snow.jpg.png';
                    break;
                case 'Clouds':
                    image.src = 'images/cloud.jpg.png';
                    break;
                case 'Haze':
                    image.src = 'images/mist.jpgs.png';
                    break;
                default:
                    image.src = '';
            }

            temperature.innerHTML = `${parseInt(json.main.temp)}<span>°C</span>`;
            description.innerHTML = `${json.weather[0].description}`;
            humidity.innerHTML = `${json.main.humidity}%`;
            wind.innerHTML = `${parseInt(json.wind.speed)} Km/h`;

            weatherBox.style.display = '';
            weatherDetails.style.display = '';
            weatherBox.classList.add('fadeIn');
            weatherDetails.classList.add('fadeIn');
            container.style.height = '590px';
        })
        .catch(error => {
            console.error('Error:', error);
        });
}

searchButton.addEventListener('click', () => {
    const city = searchInput.value.trim();  
    console.log('City input value on button click:', city);
    fetchWeather(city);
});

searchInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
        const city = searchInput.value.trim(); 
        console.log('City input value on Enter key:', city);
        fetchWeather(city);
    }
});
