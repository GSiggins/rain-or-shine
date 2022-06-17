const APIkey = 'fddd66118ec569d3e86667207b7ec986'
const searchBtn = document.querySelector('#search-btn')
let searchBarInput;
const cardArray = [document.querySelectorAll('.card')]
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
            cardPop(weatherInfoObj)
            return;
        })
}

cardArray.forEach(cardPop);

function cardPop(cardArray, weatherInfoObj) {
    
    for (let i = 0; i < cardArray.length; i++) {
        let temp = weatherInfoObj[i].temp.day;
        let wind = weatherInfoObj[i].weather.wind_speed;
        let humidity = weatherInfoObj[i].humidity;
        let uvi = weatherInfoObj[i].uvi;
        let cardTemp = document.getElementById('card-temp');
        let cardWind = document.getElementById('card-wind');
        let cardHumidity = document.getElementById('card-humidity');
        let cardUVI = document.getElementById('card-uvi');
        cardTemp.textContent = temp;
        cardWind.textContent = wind;
        cardHumidity.textContent = humidity;
        cardUVI.textContent = uvi;
    }
}

searchBtn.addEventListener('click', searchClick)