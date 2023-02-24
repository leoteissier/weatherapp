const container = document.querySelector('.container');
const search = document.querySelector('.search-box button');
const weatherBox = document.querySelector('.weather-box');
const weatherDetails = document.querySelector('.weather-details');
const time = document.querySelector('.time');
const error404 = document.querySelector('.not-found');

search.addEventListener('click', async () => {
    const APIKey = '6BMECT4LRUG4PDBRA443VSGR2';
    const cityInput = document.querySelector('.search-box input');
    const city = cityInput.value.trim();

    if (!city) {
        return;
    }

    try {
        const response = await fetch(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${city}/today?unitGroup=metric&include=current&key=${APIKey}&contentType=json`);
        const json = await response.json();

        if (json.cod === '404') {
            container.style.height = '400px';
            weatherBox.style.display = 'none';
            weatherDetails.style.display = 'none';
            time.style.display = 'none';
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
        const windspeed = document.querySelector('.weather-details .wind span');
        const datetime = document.querySelector('.time span');


        switch(json.currentConditions.icon) {
            case 'clear-day':
                image.src = 'images/clear-day.svg';
                break;
            case 'clear-night':
                image.src = 'images/clear-night.svg';
                break;
            case 'cloudy':
                image.src = 'images/cloudy.svg';
                break;
            case 'fog':
                image.src = 'images/fog.svg';
                break;
            case 'hail':
                image.src = 'images/hail.svg';
                break;
            case 'partly-cloudy-day':
                image.src = 'images/partly-cloudy-day.svg';
                break;
            case 'partly-cloudy-night':
                image.src = 'images/partly-cloudy-night.svg';
                break;
            case 'rain':
                image.src = 'images/rain.svg';
                break;
            case 'rain-snow':
                image.src = 'images/rain-snow.svg';
                break;
            case 'rain-snow-showers-day':
                image.src = 'images/rain-snow-showers-day.svg';
                break;
            case 'rain-snow-showers-night':
                image.src = 'images/rain-snow-showers-night.svg';
                break;
            case 'showers-day':
                image.src = 'images/showers-day.svg';
                break;
            case 'showers-night':
                image.src = 'images/showers-night.svg';
                break;
            case 'sleet':
                image.src = 'images/sleet.svg';
                break;
            case 'snow':
                image.src = 'images/snow.svg';
                break;
            case 'snow-showers-day':
                image.src = 'images/snow-showers-day.svg';
                break;
            case 'snow-showers-night':
                image.src = 'images/snow-showers-night.svg';
                break;
            case 'thunder':
                image.src = 'images/thunder.svg';
                break;
            case 'thunder-rain':
                image.src = 'images/thunder-rain.svg';
                break;
            case 'thunder-showers-day':
                image.src = 'images/thunder-showers-day.svg';
                break;
            case 'thunder-showers-night':
                image.src = 'images/thunder-showers-night.svg';
                break;
            case 'wind':
                image.src = 'images/wind.svg';
                break;
            default:
                image.src = '';
                break;
        }

        temperature.innerHTML = `${parseInt(json.currentConditions.temp)}<span>°C</span>`;
        description.innerHTML = `${json.currentConditions.conditions}`;
        humidity.innerHTML = `${json.currentConditions.humidity}%`;
        windspeed.innerHTML = `${parseInt(json.currentConditions.windspeed)}Km/h`;
        datetime.innerHTML = `${json.currentConditions.datetime}`;

        weatherBox.style.display = '';
        weatherDetails.style.display = '';
        time.style.display = '';
        weatherBox.classList.add('fadeIn');
        weatherDetails.classList.add('fadeIn');
        time.classList.add('fadeIn');
        container.style.height = '600px';

        // Reset the input value
        cityInput.value = '';
    } catch (error) {
        console.error(error);
    }
});