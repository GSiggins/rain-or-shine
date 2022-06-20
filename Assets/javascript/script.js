// const APIkey = 'fddd66118ec569d3e86667207b7ec986'
const searchBtn = document.querySelector('#search-btn')
let searchBarInput;
const cards = document.querySelectorAll('.card')
const cardArray = [...cards]
const dayText = document.querySelectorAll('.card-text')
const dayTextArray = [...dayText]
console.log(dayTextArray)

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


function cardPop(weatherInfoObj) {
    // FOR loop that assigns variables to the object properties we want
    // to populate within the cards. 

    //
    for (let i = 0; i < 5; i++) {
        let temp = weatherInfoObj.daily[i].temp.day;
        let wind = JSON.stringify(weatherInfoObj.daily[i].wind_speed);
        let humidity = weatherInfoObj.daily[i].humidity;
        let uvi = weatherInfoObj.daily[i].uvi;

        let cardTemp = $('.card-temp').eq(i);
        let cardWind = $('.card-wind').eq(i);
        let cardHumidity = $('.card-humidity').eq(i);
        let cardUVI = $('.card-uvi').eq(i);

        console.log(cardTemp, cardWind, cardHumidity, cardUVI)
        cardTemp.text('Tempurature: ' + temp);
        cardWind.text('Wind: ' + wind);
        cardHumidity.text('Humidity: ' + humidity);
        cardUVI.text('UVI: ' + uvi);
    };
}

timeclock = function () {
    var time = moment().format('[It is currently ] dddd, MMMM Do, YYYY [ at ] hh:mm:ss a');
    document.getElementById('current-day').textContent = time;
}


var userInputStore = JSON.parse(localStorage.getItem('userSearch')) || [];
var newInput = [
    ...userInputStore,
    searchBarInput,
];
localStorage.setItem('userSearch', JSON.stringify(newInput));

searchBtn.addEventListener('click', searchClick)

function daySet(dayTextArray) {

    var today = document.getElementById('day1');
    var tomorrow = document.getElementById('day2');
    var thirdDay = document.getElementById('day3');
    var fourthDay = document.getElementById('day4');
    var fifthDay = document.getElementById('day5');

    today.textContent = moment().format("MM-DD");
    tomorrow.textContent = moment().add(1, 'days').format("MM-DD");
    thirdDay.textContent = moment().add(2, 'days').format("MM-DD");
    fourthDay.textContent = moment().add(3, 'days').format("MM-DD");
    fifthDay.textContent = moment().add(4, 'days').format("MM-DD");

    for (let j = 0; j < 5; j++) {
        let dayTextDisplay = $('.card-text').eq(j);
        let dateText = moment().add(0+[j], "d").format('dddd');
        console.log(moment().add(0+[j], "d").format('dddd'));
        dayTextDisplay.text("This is the forecast for " + dateText);
    }
}

daySet()
timeclock()
setInterval(timeclock, 1000)