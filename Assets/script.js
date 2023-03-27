const cityInput = document.querySelector('input');
const searchBtn = document.querySelector('#search-button');
const todayWeather = document.querySelector('.today');
const in5Days = document.querySelector('.weather-in-5-days');
const historySearch = document.querySelector('.history');
const cities = historySearch.children;
var key = "inputValue";
function TempInF(kelvin) {
    const fahrenheit = (kelvin - 273.15) * 1.8 + 32;
    return fahrenheit;
  }

// function give the day in format MM/DD(+x)/YYYY, x is the days of the future
var theDate = (x) => {
    const today = new Date();
    const month = today.getMonth() + 1;
    const day = today.getDate() + x ;
    const year = today.getFullYear(); 
    return (month + "/" + day + "/" + year);
}

function todayOutput(todayData) {
    var todayDate = document.createElement("h1");
    var city = cityInput.value;
    todayDate.textContent = city + " " +  theDate(0);
    todayWeather.append(todayDate);

    var todayTempOutput = document.createElement("p");
    todayTempOutput.textContent = "Temp: " + Math.round(TempInF(todayData.temp)) + " °F";
    todayWeather.append(todayTempOutput);


    var todayWindOutput = document.createElement("p");
    todayWindOutput.textContent = "Wind: " + todayData.wind + " MPS";
    todayWeather.append(todayWindOutput);

    var todayHumOutput = document.createElement("p");
    todayHumOutput.textContent = "Humidity: " + todayData.wind +" %";
    todayWeather.append(todayHumOutput);
}

function fiveDaysOutput(day) {
    day.forEach(function(each, index) {
        console.log( each);
        var dayth = document.createElement("div");
        var dateTh = document.createElement("h3");
        dateTh.textContent = theDate(index+1);
        dayth.append(dateTh);
    
        var dayTempOutput = document.createElement("p");
        dayTempOutput.textContent = "Temp: " + Math.round(TempInF(each.temp)) + " °F";
        dayth.append(dayTempOutput);
    
    
        var dayWindOutput = document.createElement("p");
        dayWindOutput.textContent = "Wind: " + each.wind + " MPS";
        dayth.append(dayWindOutput);
    
        var dayHumOutput = document.createElement("p");
        dayHumOutput.textContent = "Humidity: " + each.wind +" %";
        dayth.append(dayHumOutput);
        dayth.classList.add('card');
        in5Days.append(dayth);
    })
}

/* function to remove previous search */
function removeResult() {
    in5Days.innerHTML = "";
    todayWeather.innerHTML = "";
}

searchBtn.addEventListener('click', () => {
    var city = cityInput.value;
    if (cities.length > 0) removeResult();
    
    // Get weather data for today
    var cityUrl = 'http://api.openweathermap.org/data/2.5/weather?q=' + city +'&appid=bae2cbfa4fdf07dcf4575ab5ebd73910'
    fetch(cityUrl)
        .then(response => response.json())
        .then(data => todayData = {
            temp: data.main.temp,
            wind: data.wind.speed,
            hum: data.main.humidity,
            
        })
        .then(() => {
            todayOutput(todayData);

        })

    
    var weatherUrl = 'http://api.openweathermap.org/data/2.5/forecast?q=' + city + '&appid=bae2cbfa4fdf07dcf4575ab5ebd73910'
    
    //get data weather for 5 days
    
    
    fetch(weatherUrl)
        .then(response => response.json())
        .then(data => day = [
            {
                temp: data.list[3].main.temp,
                wind: data.list[3].wind.speed,
                hum: data.list[3].main.humidity,
            },
            {
                temp: data.list[11].main.temp,
                wind: data.list[11].wind.speed,
                hum: data.list[11].main.humidity,
            },
            {
                temp: data.list[19].main.temp,
                wind: data.list[19].wind.speed,
                hum: data.list[19].main.humidity,
            },
            {
                temp: data.list[27].main.temp,
                wind: data.list[27].wind.speed,
                hum: data.list[27].main.humidity,
            },
            {
                temp: data.list[35].main.temp,
                wind: data.list[35].wind.speed,
                hum: data.list[35].main.humidity,
            },
            
        ])
        .then (() => {
            fiveDaysOutput(day);
        })

    /* Save input in local storage */

    localStorage.setItem(key, city);
    
    //if the city from the input already exist in the history, we don't have to save it
    
    var found = false;
    if (cities.length === 0) {
        addCityToHistory();
    }
    else {
        for (var i = 0; i < cities.length; i++) {
            console.log(city, cities[i]);
            if (city === cities[i].textContent) {
                found = true;
                break; 
            }
        };
        if (!found) {addCityToHistory()}
    }
    

});

function addCityToHistory() {
    var city = cityInput.value;
    var newCity = document.createElement("button");
    newCity.setAttribute("class", "city-btn");
    newCity.textContent = city;
    historySearch.insertBefore(newCity,cities[0]);
}