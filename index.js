const API_KEY = "13425780d1fa9905f37ad99ba58c21a8";

const input = document.querySelector("#city");
const searchbtn = document.querySelector("#searchbtn");
const WeatherData = document.querySelector("#WeatherData");
const yourLocation = document.querySelector("#yourLocation");

searchbtn.addEventListener("click", async (e) => {
    try {
        const res = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${input.value}&appid=${API_KEY}&units=metric`);
        const data = await res.json();
        // console.log(data);
        if(data.message){
            WeatherData.innerHTML = `<h1 class="p-5 text-2xl" >${input.value} ${data.message}</h1>`;
        }else{
            showWeather(data)
        }
        input.value = "";
    } catch (error) {
        console.log(error);
    }

})

yourLocation.addEventListener("click", () => {
    navigator.geolocation.getCurrentPosition((position) => {
        const lati = position.coords.latitude
        const longi = position.coords.longitude;
        fetchByCoordinate(lati, longi)
    })
})

async function fetchByCoordinate(lati, longi) {
    try {
        const res = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lati}&lon=${longi}&appid=${API_KEY}&units=metric`);
        const data = await res.json()
        showWeather(data);
    } catch (error) {
        console.log(error.message);
    }

}

function convertTime(UNX) {
    const time = new Date(UNX * 1000);
    return (time.toLocaleTimeString())
}

function showWeather({ main, wind, name, sys }) {
    WeatherData.innerHTML = ` <div class="flex flex-col items-center">
                <div class="text-3xl pt-5 font-bold">
                    ${main.temp}°C
                </div>
                <p class="font-mono">${name}</p>
                <p>Feels Like ${main.feels_like}°C</p>
            </div>
            <div id="detail" class="flex gap-5 text-lg pt-5">
                <div class="justify-center items-center flex flex-col">
                    <p>Wind</p>
                    <p class="font-bold">${wind.speed}km/h</p>
                </div>
                <div class="justify-center items-center flex flex-col">
                    <p>Pressure</p>
                    <p class="font-bold">${main.pressure}Pa</p>
                </div>
                <div class="justify-center items-center flex flex-col">
                    <p>Humidity</p>
                    <p class="font-bold">${main.humidity}%</p>
                </div>
            </div>
            <div class="flex justify-around text-lg pt-8">
                <div class="flex flex-col items-center bg-amber-400/70 p-2 rounded-md">
                    <p >Sunrise</p>
                    <p class="font-bold">${convertTime(sys.sunrise)}</p>
                </div>
                <div class="flex flex-col items-center bg-amber-400/70 p-2 rounded-md">
                    <p >Sunset</p>
                    <p class="font-bold">${convertTime(sys.sunset)}</p>
                </div>
            </div>
        </div>`
}