const weather = document.querySelector(".js-weather");

const COORDS = "coords";
const API_KEY = "00dd20340bb4af846e128f4539843e8e";

function getWeather(lat,lon){
  fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&lang=kr&units=metric`
  ).then(function(response){
    return(response.json());
  }).then(function(json){
    const temperature = json.main.temp;
    const country = json.sys.country;
    const place = json.name;
    weather.innerText = `${temperature} @ ${country}.${place}`;
  })
}

function saveCoords(coordsObj){
  localStorage.setItem(COORDS, JSON.stringify(coordsObj));
}

function handleGeoSucces(position){
  const latitude = (position.coords.latitude);
  const longitude =  position.coords.longitude;
  const coordsObj = {
    latitude,
    longitude
  };
  saveCoords(coordsObj);
  getWeather(latitude,longitude);
}

function handleGeoError(){
  console.log("Can't access geo location");
}

function askForCoords(){
  navigator.geolocation.getCurrentPosition(handleGeoSucces, handleGeoError)
}


function loadCoords(){
  const loadedCoords = localStorage.getItem(COORDS);
  if(loadedCoords === null){
    askForCoords();
  } else{
      const parsedCoords = JSON.parse(loadedCoords);
      getWeather(parsedCoords.latitude, parsedCoords.longitude);
  }
}

function init(){
  loadCoords();
}

init();
