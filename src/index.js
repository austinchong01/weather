import "./styles.css";
import sunny from "./images/sunny.svg";
import clouds from "./images/clouds.svg";
import rain from "./images/rain.svg";
import snow from "./images/snow.svg";

function clearDOM(address, temperature, cloud, precipitation) {
  address.innerHTML = "";
  temperature.innerHTML = "";
  cloud.innerHTML = "";
  precipitation.innerHTML = "";
}

function renderDOM(resolvedAddress, currentConditions) {
  const address = document.querySelector("#address");
  const temperature = document.querySelector("#temperature");
  const cloud = document.querySelector("#cloud");
  const precipitation = document.querySelector("#precipitation");

  clearDOM(address, temperature, cloud, precipitation);

  address.innerHTML = `${resolvedAddress}`;
  temperature.innerHTML = `${currentConditions.temp}&deg;`;

  const condition = document.createElement("img");
  if (currentConditions.conditions === "Clear"){
    condition.src = sunny;
  } else {
    condition.src = clouds;
  }
  cloud.appendChild(condition);

  const precip = document.createElement("img");
  if (currentConditions.preciptype === "Snow") {
    precip.src = snow;
    precipitation.appendChild(precip);
  } else if (currentConditions.preciptype === "Rain") {
    precip.src = rain;
    precipitation.appendChild(precip);
  } else {
    precipitation.innerHTML = `No Precipitation`;
  }
}

async function processData(location) {
  try {
    const response = await fetch(
      `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}?unitGroup=us&elements=datetime%2Cname%2Ctemp%2Cprecipcover%2Cpreciptype%2Ccloudcover%2Cconditions&include=current&key=KT8X949TC3E7E5KJVX5B3YJSL&contentType=json`,
      { mode: "cors" },
    );
    const responseJSON = await response.json();
    const { currentConditions, resolvedAddress } = responseJSON;

    renderDOM(resolvedAddress, currentConditions);
  } catch (error) {
    console.log(error);
  }
}

function search() {
  event.preventDefault();
  const input = document.querySelector("#location");
  const location = input.value;
  processData(location);
  input.value = "";
  input.focus();
}

const searchBtn = document.querySelector("#search");
searchBtn.addEventListener("click", search);
