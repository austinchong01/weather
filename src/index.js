import "./styles.css";

function clearDOM(time, temperature, cloud, precipitation) {
  time.innerHTML = "";
  temperature.innerHTML = "";
  cloud.innerHTML = "";
  precipitation.innerHTML = "";
}

function renderDOM(currentConditions) {
  const content = document.querySelector("#content");

  const time = document.querySelector("#time");
  const temperature = document.querySelector("#temperature");
  const cloud = document.querySelector("#cloud");
  const precipitation = document.querySelector("#precipitation");

  clearDOM(time, temperature, cloud, precipitation);

  time.innerHTML = `Time: ${currentConditions.datetime}`;
  temperature.innerHTML = `Temperature: ${currentConditions.temp}`;
  cloud.innerHTML = `Cloud Status: ${currentConditions.conditions}`;
  if (currentConditions.preciptype === null) {
    precipitation.innerHTML = "Precipitation: None";
  } else {
    precipitation.innerHTML = `Precipitation: ${currentConditions.preciptype}`;
  }
}

async function processData(location) {
  try {
    const response = await fetch(
      `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}?unitGroup=us&elements=datetime%2Cname%2Ctemp%2Cprecipcover%2Cpreciptype%2Ccloudcover%2Cconditions&include=current&key=KT8X949TC3E7E5KJVX5B3YJSL&contentType=json`,
      { mode: "cors" },
    );
    const responseJSON = await response.json();
    const { currentConditions } = responseJSON;

    renderDOM(currentConditions);
    console.log(currentConditions);
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
}

const searchBtn = document.querySelector("#search");
searchBtn.addEventListener("click", search);
