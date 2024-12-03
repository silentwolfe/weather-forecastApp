const day1 = document.getElementById("day1");
const day2 = document.getElementById("day2");
const day3 = document.getElementById("day3");
const day4 = document.getElementById("day4");
const day5 = document.getElementById("day5");
const day6 = document.getElementById("day6");
const day7 = document.getElementById("day7");
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
const day1_temp = document.getElementById("day1_temp");
const day2_temp = document.getElementById("day2_temp");
const day3_temp = document.getElementById("day3_temp");
const day4_temp = document.getElementById("day4_temp");
const day5_temp = document.getElementById("day5_temp");
const day6_temp = document.getElementById("day6_temp");
const day7_temp = document.getElementById("day7_temp");
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
// const search_data = document.getElementById("search_id");
const air_sect_rain_percentage = document.getElementById("air_sect_rain_percentage");

async function cityToLatLon() {
    const city_name = document.getElementById("search_id").value.toLowerCase().trim();
    
    if (!city_name) {
        alert("Please enter a city name.");
        return;
    }
    
    try {
        const apiKey = "ee50633030c1ade10dd8db497604aa7d";
        const apiUrl = `http://api.openweathermap.org/geo/1.0/direct?q=${city_name}&limit=1&appid=${apiKey}`;
        
        const response = await fetch(apiUrl);
        if (!response.ok) {
            if (response.status === 404) {
                throw new Error("City not found.");
            } else {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
        }
        
        const data = await response.json();
        
        if (data.length === 0) {
            throw new Error("City not found.");
        }
        // city_name.innerText = "";
        return {lat: data[0].lat, lon: data[0].lon, name: data[0].name};
        
    } catch (error) {
        console.error("Error fetching city data:", error);
        alert("Error: " + error.message);  // Display error to the user
    }
}

async function fetchData() {
    try {
        //Initialization process
        const {lat, lon, name} = await cityToLatLon();
        const open_meteoUrl = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,rain&hourly=temperature_2m,relative_humidity_2m,dew_point_2m,apparent_temperature,precipitation_probability,wind_speed_10m,uv_index&daily=weather_code,temperature_2m_max,temperature_2m_min,uv_index_max,uv_index_clear_sky_max,rain_sum`;

        const response = await fetch(open_meteoUrl);
        
        // if the response isn't 200-299 then throw an error
        if (!response.ok) {
            throw new Error(`Failed to fetch. status code: ${response.status}`);
        }

        // converts the string to json format
        const data = await response.json();
        
        // Calculate average probability of rainfall for the entire day
        const hourlyProbabilities = data.hourly.precipitation_probability;
        const totalProbability = hourlyProbabilities.reduce((sum, prob) => sum + prob, 0);
        const averageProbability = totalProbability / hourlyProbabilities.length;
        rain_percent.innerText = `${averageProbability.toFixed(2)}%`;
        
        // Display the name, temp of the city
        Display_city.innerText = name;
        temp.innerText = `${data.current.temperature_2m}°C`;

        if (data.current.temperature_2m <= 0) {
            weather_display.src = "./images/snow.png";
            weather_display.style.display = "block";
        } else if (data.current.temperature_2m > 0 && data.current.temperature_2m <= 15) {
            weather_display.src = "./images/raindrop.png";
            weather_display.style.display = "block";
        } else if (data.current.temperature_2m > 15 && data.current.temperature_2m <= 25) {
            weather_display.src = "./images/clear-sky.png";
            weather_display.style.display = "block";
        } else if (data.current.temperature_2m > 25) {
            weather_display.src = "./images/Sun.png";
            weather_display.style.display = "block";
        } else {
            weather_display.src = "./images/cloudy-thunderstorm.png";
            weather_display.style.display = "block";
        }
        
        // Displaying hourly temperature with an interval of 3Hrs
        const blockArray = [6, 9, 12, 15, 18, 21];
        const hourly_temp = data.hourly.temperature_2m;

        // Assigning temperatures to the respective blocks
        blockArray.forEach((hour, index) => {
            // Update temperature text
            document.getElementById(`block${index + 1}_temp`).innerText = `${hourly_temp[hour]}°C`;

            // Dynamically set the weather icon based on temperature
            let weatherIcon;
            if (hourly_temp[hour] <= 0) {
                weatherIcon = "./images/snow.png";
            } else if (hourly_temp[hour] > 0 && hourly_temp[hour] <= 15) {
                weatherIcon = "./images/raindrop.png";
            } else if (hourly_temp[hour] > 15 && hourly_temp[hour] <= 25) {
                weatherIcon = "./images/clear-sky.png";
            } else if (hourly_temp[hour] > 25) {
                weatherIcon = "./images/Sun.png";
            } else {
                weatherIcon = "./images/cloudy-thunderstorm.png";
            }

            // Update the weather icon
            document.getElementById(`block${index + 1}_weather`).src = weatherIcon;
        });
        // air conditon section
        air_sect_temp.innerText = `${data.hourly.apparent_temperature[0]}°C`;
        air_sect_index.innerText = data.hourly.uv_index[0];
        air_sect_rain_percentage.innerText = `${averageProbability.toFixed(2)}%`;
        air_sect_wind.innerText = `${data.hourly.wind_speed_10m[0]}km/h`;

        // Right side section
        const timeArray = [
            "2024-12-03",
            "2024-12-04",
            "2024-12-05",
            "2024-12-06",
            "2024-12-07",
            "2024-12-08",
            "2024-12-09"
        ];
        
        // Mapping of day numbers to day names
        const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
        
        const dayNames = timeArray.map(dateStr => {
            const dateObj = new Date(dateStr);  // Convert string to Date object
            const dayIndex = dateObj.getDay();  // Get day of the week (0 = Sunday, 1 = Monday, etc.)
            return daysOfWeek[dayIndex];     // Map to day name
        });
        
        day1.innerText = dayNames[0];
        day2.innerText = dayNames[1];
        day3.innerText = dayNames[2];
        day4.innerText = dayNames[3];
        day5.innerText = dayNames[4];
        day6.innerText = dayNames[5];
        day7.innerText = dayNames[6];

        day1_temp.textContent = `${data.daily.temperature_2m_max[0]}/${data.daily.temperature_2m_min[0]}`;
        day2_temp.textContent = `${data.daily.temperature_2m_max[1]}/${data.daily.temperature_2m_min[1]}`;
        day3_temp.textContent = `${data.daily.temperature_2m_max[2]}/${data.daily.temperature_2m_min[2]}`;
        day4_temp.textContent = `${data.daily.temperature_2m_max[3]}/${data.daily.temperature_2m_min[3]}`;
        day5_temp.textContent = `${data.daily.temperature_2m_max[4]}/${data.daily.temperature_2m_min[4]}`;
        day6_temp.textContent = `${data.daily.temperature_2m_max[5]}/${data.daily.temperature_2m_min[5]}`;
        day7_temp.textContent = `${data.daily.temperature_2m_max[6]}/${data.daily.temperature_2m_min[6]}`;

        console.log(data);
    } catch(error){ 
        console.error("Error fetching data:", error);
    }
}