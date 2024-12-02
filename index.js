const temp = document.getElementById("temperature");
const Display_city = document.getElementById("city");
const search_btn = document.getElementById("srch_btn");
const day1_icon = document.getElementById("day1_icon");
const day2_icon = document.getElementById("day2_icon");
const day3_icon = document.getElementById("day3_icon");
const day4_icon = document.getElementById("day4_icon");
const day5_icon = document.getElementById("day5_icon");
const day6_icon = document.getElementById("day6_icon");
const day7_icon = document.getElementById("day7_icon");
const block1_temp = document.getElementById("block1_temp");
const block2_temp = document.getElementById("block2_temp");
const block3_temp = document.getElementById("block3_temp");
const block4_temp = document.getElementById("block4_temp");
const block5_temp = document.getElementById("block5_temp");
const block6_temp = document.getElementById("block6_temp");
const day1_weather = document.getElementById("day1_weather");
const day2_weather = document.getElementById("day2_weather");
const day3_weather = document.getElementById("day3_weather");
const day4_weather = document.getElementById("day4_weather");
const day5_weather = document.getElementById("day5_weather");
const day6_weather = document.getElementById("day6_weather");
const day7_weather = document.getElementById("day7_weather");
const rain_percent = document.getElementById("rain_percent");
const air_sect_temp = document.getElementById("air_sect_temp");
const air_sect_wind = document.getElementById("air_sect_wind");
const air_sect_index = document.getElementById("air_sect_index");
const weather_display = document.getElementById("weather_display");
const block1_weather_icon = document.getElementById("block1_weather");
const block2_weather_icon = document.getElementById("block2_weather");
const block3_weather_icon = document.getElementById("block3_weather");
const block4_weather_icon = document.getElementById("block4_weather");
const block5_weather_icon = document.getElementById("block5_weather");
const block6_weather_icon = document.getElementById("block6_weather");
const air_sect_rain_percentage = document.getElementById("air_sect_rain_percentage");

async function fetchData() {
    try {
        const city = document.getElementById("search_id").value.toLowerCase();
        const apiKey = "ee50633030c1ade10dd8db497604aa7d";
        const apiURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

        const response = await fetch(apiURL);

        if(!response.ok) {
            throw new Error("Could not fetch resource");
        }
        const data = await response.json();
        // rain_percent.innerHTML = data.main.temp;
        Display_city.innerHTML = data.name;
        temp.innerHTML = `${data.main.temp}°`;
        console.log(data);
        
    } catch(error){ 
        console.error()
    }
}