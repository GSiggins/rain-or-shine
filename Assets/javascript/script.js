const APIkey = 'fddd66118ec569d3e86667207b7ec986'
const searchBtn = document.querySelector('#search-btn')
let searchBarInput;
const cards = document.querySelectorAll('.card')
const cardArray = [...cards]
console.log(cardArray)

function searchClick(event) {
    event.preventDefault();
    searchBarInput = document.querySelector('#search-text').value;
    console.log(searchBarInput)
    geoCodeQuery();
    return;
}

function geoCodeQuery() {
    //fetch with built URL to return recipe info
    fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${searchBarInput},3166&limit=1&appid=fddd66118ec569d3e86667207b7ec986`)

        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            console.log(data)
            var result = data;
            weatherQuery(result);
            return;
        })
}

function weatherQuery(data) {
    let lat = data[0].lat;
    let lon = data[0].lon;
    //fetch with built URL to return recipe info
    fetch(`https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${lon}&units=imperial&exclude=minutely,hourly&appid=fddd66118ec569d3e86667207b7ec986`)

        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            console.log(data)
            var weatherInfoObj = data;
            cardPop(weatherInfoObj, cardArray)
            return;
        })
}


function cardPop(weatherInfoObj, cardArray) {
   cardArray.forEach((card, i) => {
        let temp = weatherInfoObj.daily[i].temp.day;
        let wind = weatherInfoObj.daily[i].weather.wind_speed;
        let humidity = weatherInfoObj.daily[i].humidity;
        let uvi = weatherInfoObj.daily[i].uvi;
        let cardTemp = document.querySelector('.card-temp');
        let cardWind = document.querySelector('.card-wind');
        let cardHumidity = document.querySelector('.card-humidity');
        let cardUVI = document.querySelector('.card-uvi');
        cardTemp.textContent = 'Tempurature: ' + temp;
        cardWind.textContent = 'Wind: ' + wind;
        cardHumidity.textContent = 'Humidity: ' + humidity;
        cardUVI.textContent = 'UVI: ' + uvi;
        currentCard++;
    });
    }


searchBtn.addEventListener('click', searchClick)

