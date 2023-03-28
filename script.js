var ipUrl1 = `https://geo.ipify.org/api/v2/country,city?apiKey=at_vMXW8jlrTtq9MoyjXol3dGSL6T3T9`;

//targeting results
const current_ip = document.getElementById("current_ip");
const current_loc = document.getElementById("current_loc");
const current_time = document.getElementById("current_time");
const current_isp = document.getElementById("current_isp");

//targeting form
const entered_ip = document.getElementById("ip_address");
const btn = document.getElementById("search_btn");

//function retuning controls of map and setting map to div
const map = L.map("map", {
  center: [0, 0],
  zoom: 2,
  layers: [
    L.tileLayer("https://{s}.tile.osm.org/{z}/{x}/{y}.png", {
      attribution:
        '&copy; <a href="https://osm.org/copyright">OpenStreetMap</a> contributors',
    }),
  ],
});

//add and update marker
updateMarker = (update_marker = [-33.665, 18.993]) => {
  map.setView(update_marker, 13);
  L.marker(update_marker).addTo(map);
};

//function when load and click is fired
function handleIpDetails(e) {
    let defaultIp = entered_ip.value;
    if (e.type === "DOMContentLoaded") {    
      updateMarker();
      getIpDetails(ipUrl1);
    } 
    else if (e.type === "click") {
        e.preventDefault();
        if (defaultIp == undefined) {
          var ip_url = ipUrl1;
        } else {
          var ip_url = `${ipUrl1}&ipAddress=${defaultIp}`;
        }
      
        getIpDetails(ip_url);
    }
  }
  

//function to get and update marker from api
async function getIpDetails(ip_url) {
  try {
    const response = await fetch(ip_url);

    const result = await response.json();
    const data = await result;

    current_ip.innerHTML = data.ip;
    current_loc.innerHTML = data.location.country;
    current_time.innerHTML = data.location.timezone;
    current_isp.innerHTML = data.isp;

    updateMarker([data.location.lat, data.location.lng]);
  } catch (error) {
    console.error("Error:", error);
  }
}

//adding event listners
document.addEventListener("DOMContentLoaded", handleIpDetails);

search_btn.addEventListener("click", handleIpDetails)




