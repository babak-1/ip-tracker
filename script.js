var map = L.map('map');
map.setView([51.505, -0.09], 13);


L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);

navigator.geolocation.watchPosition(success); 

// deyisenler
const input = document.querySelector(".search-input");
const ipAddress = document.querySelector(".ip-address h2");
const form = document.querySelector(".search")
const placeLocation = document.querySelector(".location h2");
const timeZone = document.querySelector(".time-zone h2");
const isp = document.querySelector(".isp h2");

function success(pos){
    const lat = pos.coords.latitude;
    const lng = pos.coords.longitude;
    map.setView([lat, lng], 13);
    L.marker({lat,lng}).addTo(map);
   
}
getLocation();

async function getLocation(){
    map.eachLayer(function (layer) {
        if (layer instanceof L.Marker || layer instanceof L.Circle) {
           map.removeLayer(layer);
        }
     });

   const res= await fetch(`https://geo.ipify.org/api/v2/country,city?apiKey=at_iN3S4i5Pt3oUsO3WFlcD42NoIZzH9&ipAddress=${input.value}`)

    const result =await res.json();
    console.log(result);
    ipAddress.innerHTML =result.ip;
    placeLocation.innerHTML = `${result.location.country}  | ${result.location.region}`
    timeZone.innerHTML =result.location.timezone
    isp.innerHTML = result.isp
    if(input.value){
        const lat = result.location.lat
        const lng = result.location.lng
        map.setView([lat, lng], 13);
        L.marker({lat,lng}).addTo(map);
    }
   
}


form.addEventListener('submit',(e)=>{
    e.preventDefault();
    getLocation();
});

