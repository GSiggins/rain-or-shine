const APIkey = 'fddd66118ec569d3e86667207b7ec986'
const searchBtn = document.querySelector('#search-btn')
let searchBarInput;
const cardArray = [document.querySelector('.card')]

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
            return;
        })
}

function cardPop(dayInfoArray) {
    for (let i = 0; i < cardArray.length; i++) {
        let temp = dayInfoArray[i].temp.day;
        let wind = dayInfoArray[i].weather.wind_speed;
        let humidity = dayInfoArray[i].humidity;
        let uvi = dayInfoArray[i].uvi;
        
    }
}

searchBtn.addEventListener('click', searchClick)