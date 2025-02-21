const weatherApiKey = "0d6626119b7dcd5981abb80ca104b10a";
const  geoApiKey = "ad72b91fb5f541a2b212e45af668eee4";

function getWeatherByCity() {
    const city = document.getElementById("cidade").value.trim();

    if (city === "") {
        alert("Por favor, insira o nome de uma cidade.");
        return;
    }
    const urlClima = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&lang=pt_br&appid=${API}`

    fetch(urlClima)
    .then(response => {
        if (!response.ok){
            throw new Error("Cidade não encontrada");
        }
        return response.json();
    })
    .then(data => {
        const lat = data.coord.lat;
        const lon = data.coord.lon;

        document.getElementById("nomecidade").innerText = `${data.name}, ${data.sys.country}`;
        document.getElementById("temperature").innerText = data.main.temp;
        document.getElementById("clima").innerText = data.weather[0].description;
        document.getElementById("humidade").innerText = data.main.humidity;
        document.getElementById("vento").innerText = (data.wind.speed * 3.6).toFixed(2);
        document.getElementById("latitude").innerText = lat;
        document.getElementById("longitude").innerText = lon;

        return fetch(`https://api.opencagedata.com/geocode/v1/json?q=${lat}+${lon}&key=${API}&language=pt`);
    })
    .then(response => response.json())
    .then(data => {
        if (data.results.legth > 0) {
            const details = data.results[0].components;
            document.getElementById("state").innerText = details.state || "Não disponível";
            document.getElementById("postal-code").innerText = details.postcode || "Não diponível";
        }

        document.getElementById("weather-info").classList.remove("d-none");
    })
    .catch(error => {
        alert(error.message);
    });
}