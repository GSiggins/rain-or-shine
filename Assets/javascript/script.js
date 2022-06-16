const APIkey = 'fddd66118ec569d3e86667207b7ec986'
const searchBtn = document.querySelector('#search-btn')
// fetch weather url = https://api.openweathermap.org/data/3.0/onecall?lat={lat}&lon={lon}&exclude={part}&appid={API key}

// geocoding fetch url = http://api.openweathermap.org/geo/1.0/direct?q={city name},{state code},{country code}&limit={limit}&appid={API key}

// const weatherAPI = {
//     method: 'GET',
//     headers: {
//         'X-RapidAPI-Key': 'fddd66118ec569d3e86667207b7ec986',
//         'X-RapidAPI-Host': 'https://api.openweathermap.org/data/3.0/onecall'
//     }
// };

// const geoCodeAPI = {
//     method: 'GET',
//     headers: {
//         'X-RapidAPI-Key': 'fddd66118ec569d3e86667207b7ec986',
//         'X-RapidAPI-Host': 'http://api.openweathermap.org/geo/1.0/direct'
//     }
// };

function searchClick(event) {
    event.preventDefault();
    var searchBarInput = document.querySelector('#search-btn').value;
    console.log(searchBarInput)
    // build first url request
    // var weatherString = `https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${lon}&units=imperial&exclude=minutely,hourly&appid=${APIkey}`;

    // // build second url request
    // var geoCodeString = `http://api.openweathermap.org/geo/1.0/direct?q=${cityname},${state$code},${countrycode}&limit=${limit}&appid=${APIkey}`;
 
    // Call fetch functions
    geoCodeQuery();
    weatherQuery();
    //window.location.href = 'results-page.html';
    // return variables to use in fetch functions
    return;
}

function geoCodeQuery(recipeString) {
    //fetch with built URL to return recipe info
    fetch(recipeString, {
       var weatherURL: `https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${lon}&units=imperial&exclude=minutely,hourly&appid=${APIkey}`
    })

        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            console.log(data)
            var resultArray = data;
            displayResult(resultArray);
            return resultArray;
        })
}

function weatherQuery(recipeString) {
    //fetch with built URL to return recipe info
    fetch(recipeString, {
        headers: {
            'X-RapidAPI-Key': 'fddd66118ec569d3e86667207b7ec986',
            'X-RapidAPI-Host': 'https://api.openweathermap.org/data/3.0/onecall'
        }
    })

        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            console.log(data)
            displayResult(resultArray);
            return resultArray;
        })
}

searchBtn.addEventListener('click', searchClick)