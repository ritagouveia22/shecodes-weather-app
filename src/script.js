let now = new Date;
let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
let dayOfWeek = days[now.getDay()]
let months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
let month = months[now.getMonth()]
let day = now.getDate()
let hours = now.getHours()
if (hours < 10) {
  hours = `0${hours}`
}
let minutes = now.getMinutes()
if (minutes < 10) {
  minutes = `0${minutes}`
}

let date = document.querySelector("#date")

date.innerHTML = `${dayOfWeek} ${month} ${day}, ${hours}:${minutes}`


function showCityDetails(response){
  let city = document.querySelector("#current-location")
  city.innerHTML = response.data.name

  let temperature = Math.round(response.data.main.temp)
  let tempElement = document.querySelector("#current-temp");
  tempElement.innerHTML = `${temperature}ºC`
  
  let min =document.querySelector("#min")
  let tempMin = Math.round(response.data.main.temp_min)
  min.innerHTML =` ${tempMin}ºC`

  let max = document.querySelector("#max")
  let tempMax = Math.round(response.data.main.temp_max)
  max.innerHTML = `${tempMax}ºC |`

  let description = document.querySelector("#description")
  let goodDescription = (response.data.weather[0].description).charAt(0).toUpperCase() + (response.data.weather[0].description).slice(1)
  description.innerHTML =` ${goodDescription} `

  let humidity = document.querySelector("#humidity")
  humidity.innerHTML =`${response.data.main.humidity}%`

  let speed = document.querySelector("#wind-speed")
  let windSpeed = Math.round(response.data.wind.speed * 3.6)
  speed.innerHTML =`${windSpeed}Km/h`

  let sunrise = new Date(response.data.sys.sunrise * 1000)
  let sunriseHours = sunrise.getHours()
  let sunriseMinutes = "0" + sunrise.getMinutes()
  let newSunriseMinutes = sunriseMinutes.substr(-2)
  let sunriseTime = document.querySelector("#sunrise")
  sunriseTime.innerHTML = `${sunriseHours}h${newSunriseMinutes}`
  
  let sunset = new Date(response.data.sys.sunset * 1000)
  let sunsetHours = sunset.getHours()
  let sunsetMinutes = "0" + sunset.getMinutes()
  let newSunsetMinutes = sunsetMinutes.substr(-2)
  let sunsetTime = document.querySelector("#sunset")
  sunsetTime.innerHTML = `${sunsetHours}h${newSunsetMinutes}`
}

function searchOnLoad(city) {
  let apiEndpoint = "https://api.openweathermap.org/data/2.5/weather"
  let apiKey = "05d59b97163becec12a0f8000856ca3e"
  let unit = "metric"
  let apiUrl = `${apiEndpoint}?q=${city}&appid=${apiKey}&units=${unit}`
  axios.get(apiUrl).then(showCityDetails)
}

function getCitySearched(event) {
  event.preventDefault()
  let city = document.querySelector("#searched-city").value
  searchOnLoad(city)
}

function showCurrentDetails(response){
  let currentCity = document.querySelector("#current-location")
  currentCity.innerHTML = response.data.name

  let currentTemp = Math.round(response.data.main.temp)
  let currentTempElement = document.querySelector("#current-temp");
  currentTempElement.innerHTML = `${currentTemp}ºC`

  let currentMin =document.querySelector("#min")
  let currentTempMin = Math.round(response.data.main.temp_min)
  currentMin.innerHTML =` ${currentTempMin}ºC`

  let currentMax = document.querySelector("#max")
  let currentTempMax = Math.round(response.data.main.temp_max)
  currentMax.innerHTML = `${currentTempMax}ºC |`

  let currentDescription = document.querySelector("#description")
  let currentGoodDescription = (response.data.weather[0].description).charAt(0).toUpperCase() + (response.data.weather[0].description).slice(1)
  currentDescription.innerHTML =` ${currentGoodDescription} `

  let currentHumidity = document.querySelector("#humidity")
  currentHumidity.innerHTML =`${response.data.main.humidity}%`

  let currentSpeed = document.querySelector("#wind-speed")
  let currentWindSpeed = Math.round(response.data.wind.speed * 3.6)
  currentSpeed.innerHTML =`${currentWindSpeed}Km/h`

  let sunrise = new Date(response.data.sys.sunrise * 1000)
  let sunriseHours = sunrise.getHours()
  let sunriseMinutes = "0" + sunrise.getMinutes()
  let newSunriseMinutes = sunriseMinutes.substr(-2)
  let sunriseTime = document.querySelector("#sunrise")
  sunriseTime.innerHTML = `${sunriseHours}h${newSunriseMinutes}`
  
  let sunset = new Date(response.data.sys.sunset * 1000)
  let sunsetHours = sunset.getHours()
  let sunsetMinutes = "0" + sunset.getMinutes()
  let newSunsetMinutes = sunsetMinutes.substr(-2)
  let sunsetTime = document.querySelector("#sunset")
  sunsetTime.innerHTML = `${sunsetHours}h${newSunsetMinutes}`
}

function getCurrentDetails(position){
  let lat = position.coords.latitude
  let lon = position.coords.longitude
  let apiEndpoint = "https://api.openweathermap.org/data/2.5/weather"
  let apiKey = "05d59b97163becec12a0f8000856ca3e"
  let unit = "metric"
  let apiUrl = `${apiEndpoint}?lat=${lat}&lon=${lon}&appid=${apiKey}&units=${unit}`

  axios.get(apiUrl).then(showCurrentDetails)
}

function getCoordinates(){
  navigator.geolocation.getCurrentPosition(getCurrentDetails)
}

let searchForm = document.querySelector("#search-form")
searchForm.addEventListener("submit", getCitySearched)

let searchButton = document.querySelector("#search-button")
searchButton.addEventListener("click", getCitySearched)

let currentLocButton = document.querySelector("#current-loc-button")
currentLocButton.addEventListener("click", getCoordinates)

searchOnLoad("Lisbon")