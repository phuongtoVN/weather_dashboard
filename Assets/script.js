const cityInput = document.querySelector('input');
var city = cityInput.value;
const cityUrl = 'http://api.openweathermap.org/geo/1.0/direct?q=' +city +'&limit=5&appid=bae2cbfa4fdf07dcf4575ab5ebd73910'
fetch(cityUrl)
    .then(response => response.json())
    .then(data => {

        console.log(data)
    })
    