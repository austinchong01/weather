import "./styles.css";

async function processData(location) {
  const response = await fetch(
    `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}?unitGroup=us&elements=datetime%2Cname%2Ctemp%2Cprecipcover%2Cpreciptype%2Ccloudcover%2Cconditions&include=current&key=KT8X949TC3E7E5KJVX5B3YJSL&contentType=json`,
    { mode: "cors" },
  );
  const responseJSON = await response.json();
  const { currentConditions } = responseJSON;

  console.log(currentConditions);
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
