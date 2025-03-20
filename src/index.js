import "./styles.css";

const input = document.querySelector("#location");
const searchBtn = document.querySelector("#search");

function search() {
  event.preventDefault();
  const location = input.value;

  fetch(
    `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}?unitGroup=us&elements=datetime%2CdatetimeEpoch%2Cname%2Caddress%2Ctemp&key=KT8X949TC3E7E5KJVX5B3YJSL&contentType=json`,
    { mode: "cors" },
  )
    .then((response) => response.json())
    .then((response) => response.days[0])
    .catch((error) => {
      console.log(error);
    });

  input.value = "";
}

searchBtn.addEventListener("click", search);
