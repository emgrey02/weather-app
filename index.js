let baseUrl = 'http://api.weatherapi.com/v1';
const apiKey = '2f77a080fba64a2bb5d11415242601';

let cityText = document.querySelector('h2');
let tempText = document.querySelector('.temp');
let humidityText = document.querySelector('.humidity');
let feelText = document.querySelector('.feelsLike')
let windText = document.querySelector('.wind');
let conditionText = document.querySelector('.condition')
let weatherIcon = document.querySelector('img')
let windDirectionText = document.querySelector('.direction')
let citySearch = document.querySelector('form');
let time = document.querySelector('.time');

let weatherData;


let getWeatherData = async (city='london') => {
    try {
        let response = await fetch(`${baseUrl}/current.json?key=${apiKey}&q=${city}`, { mode: 'cors' });
        if (response.status === 200) {
            let data = await response.json();
            console.log(data);
            weatherData = {
                "location": data.location.name,
                "country": data.location.country,
                "time": data.location.localtime,
                "temp": data.current.temp_f,
                "humidity": data.current.humidity,
                "feelsLike": data.current.feelslike_f,
                "wind": data.current.wind_mph,
                "condition": data.current.condition.text,
                "icon": data.current.condition.icon,
                "windDirection": data.current.wind_dir,
            }
            updateHTML();
            return data;
        } else {
            throw 'Error getting weather';
        }
    } catch (error) {
        throw 'trouble reaching WeatherAPI';
    }
}

let updateHTML = () => {
    cityText.innerText = `${weatherData.location}, ${weatherData.country}`;
    time.innerText = weatherData.time;
    tempText.innerText = weatherData.temp;
    humidityText.innerText = weatherData.humidity;
    feelText.innerText = weatherData.feelsLike;
    windText.innerText = weatherData.wind;
    conditionText.innerText = weatherData.condition;
    weatherIcon.src = weatherData.icon;
    windDirectionText.innerText = weatherData.windDirection;
}

citySearch.addEventListener('submit', (e) =>
{
    e.preventDefault();
    let cityInput = document.querySelector('#search');
    let city = cityInput.value.toLowerCase();
    cityInput.value = '';
    getWeatherData(city);
})

getWeatherData();