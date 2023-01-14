// dom
const submitButton = document.getElementById("button")
const inputEl = document.getElementById("input-el")
const ipAddressEl = document.getElementById("ip-address-el")
const locationEl = document.getElementById("location-el")
const timezoneEl = document.getElementById("timezone-el")
const countryEl = document.getElementById("country-el")
const ispEl = document.getElementById("isp-el")

// map variables
let geoCoordinates
const zoomLevel = 13

// initialize map
const map = L.map('map')

// adding a marker to the map
let marker = L.marker(null).addTo(map)

// tile layer (OpenStreetMap) on map
L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);

// using async and await
async function getLocation(url){
    // send http get request to IPGeolocation API
    try {
        let response = await fetch(url)
        let data = await response.json()

        // destructuring returned object
        const {ip, location:{city}, location:{region}, location:{postalCode}, location:{country}, location:{timezone}, isp, location:{lat}, location:{lng}} = data

        // dom manipulation
        ipAddressEl.innerHTML = ip
        locationEl.innerHTML = `${city}, ${region}, ${postalCode}`
        countryEl.innerHTML = country
        timezoneEl.innerHTML = timezone
        ispEl.innerHTML = isp

        // updates map on UI
        geoCoordinates = [lat, lng]
        marker.setLatLng(geoCoordinates)
        map.setView(geoCoordinates, zoomLevel, {
            animate: true,
            duration: 1.5,
            easeLinearity: 0.2
        })
    } catch (error) {
        console.error(error)
        alert(error)
    }
}
// validates the format of the ipv4 or ipv6 address
function validateIpAddress(ipAddress) {
    if (ipAddress.match(/^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/) || ipAddress.match(/^(([0-9a-fA-F]{1,4}:){7,7}[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,7}:|([0-9a-fA-F]{1,4}:){1,6}:[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,5}(:[0-9a-fA-F]{1,4}){1,2}|([0-9a-fA-F]{1,4}:){1,4}(:[0-9a-fA-F]{1,4}){1,3}|([0-9a-fA-F]{1,4}:){1,3}(:[0-9a-fA-F]{1,4}){1,4}|([0-9a-fA-F]{1,4}:){1,2}(:[0-9a-fA-F]{1,4}){1,5}|[0-9a-fA-F]{1,4}:((:[0-9a-fA-F]{1,4}){1,6})|:((:[0-9a-fA-F]{1,4}){1,7}|:))$/)) {
        return true
    } else {
        return false
    }
}
// event listener for submit button
submitButton.addEventListener("click", function () {
    // if user entered something, validate it
    if (inputEl.value) {
        const address = validateIpAddress(inputEl.value)
        // if ip address valid, add it to url in http request
        if (address) {
            getLocation(`https://geo.ipify.org/api/v2/country,city?apiKey=at_9SrUcFOnbAIhvMwIifMbo0rJeFVdq&ipAddress=${inputEl.value}`)
            inputEl.value = ""
        } else {
            alert("You have entered an invalid IP address!")
            inputEl.value = ""
        }
    } else {
        // if user did not input anything, http request is made with the client's ip address by default
        getLocation("https://geo.ipify.org/api/v2/country,city?apiKey=at_9SrUcFOnbAIhvMwIifMbo0rJeFVdq")
    }
})

// user sees location of their own IP address on initial page load
getLocation("https://geo.ipify.org/api/v2/country,city?apiKey=at_9SrUcFOnbAIhvMwIifMbo0rJeFVdq")