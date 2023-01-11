// dom
const submitButton = document.getElementById("button")
const inputEl = document.getElementById("input-el")
const ipAddressEl = document.getElementById("ip-address-el")
const locationEl = document.getElementById("location-el")
const timezoneEl = document.getElementById("timezone-el")
const countryEl = document.getElementById("country-el")
const ispEl = document.getElementById("isp-el")

// fecth variables
let ip
let municipality
let state
let zipCode
let nation
let zoneTime
let serviceProvider

// map variables
let geoCoordinates = [51.505, -0.09]
let zoomLevel = 13

// // initialize map & set view to our chosen GEO coordinates & zoom level
// let map = L.map('map').setView(geoCoordinates, zoomLevel)

// // adding a marker to the geo cordinates on the map
// let marker = L.marker(geoCoordinates).addTo(map)

// // tile layer (OpenStreetMap) on map
// L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
//      maxZoom: 19,
//      attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
// }).addTo(map);

// event listener for submit button
submitButton.addEventListener("click", function () {
    if (inputEl.value){
        // if user inputted ip address
        let ipAddress
        ipAddress = inputEl.value
        fetchLocation(`https://geo.ipify.org/api/v2/country,city?apiKey=at_9SrUcFOnbAIhvMwIifMbo0rJeFVdq&ipAddress=${ipAddress}`)
        inputEl.value = ""
    } else {
        // if user did not input anything
        fetchLocation("https://geo.ipify.org/api/v2/country,city?apiKey=at_9SrUcFOnbAIhvMwIifMbo0rJeFVdq")
    }
})
// submits HTTP request to IP Geolocation API
function fetchLocation (url) {
    fetch(url).then(response => {
        return response.json();
    }).then(location => {
        let responseObj = location
        console.log(responseObj)

        // stores object attributes into variables
        ip = responseObj.ip
        municipality = responseObj.location.city
        state = responseObj.location.region
        zipCode = responseObj.location.postalCode
        nation = responseObj.location.country
        zoneTime = responseObj.location.timezone
        serviceProvider = responseObj.isp
        latitude = responseObj.location.lat
        longtitude = responseObj.location.lng

        // dom manipulation
        ipAddressEl.innerHTML = ip
        locationEl.innerHTML = `${municipality}, ${state} ${zipCode}`
        countryEl.innerHTML =  nation
        timezoneEl.innerHTML = zoneTime
        ispEl.innerHTML = serviceProvider
    })
}