//    Weather JS

const weatherIcon = document.querySelector('#weather-icon');
const report = document.querySelector('#report');
const forecast = document.querySelector('#forecast')


const lat="6.53"
const lon="3.37"
const apiKey="ce9a09c1441779d65d25a012f9c25bca"

// Weather url
const url1 = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`

//Forecast url
const url2 = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`

async function apiFetch1() {
    try {
      const response = await fetch(url1);
      if (response.ok) {
        const data1 = await response.json();
        console.log(data1);
    	  displayweather(data1); 
      } else {
          throw Error(await response.text());
      }
    } catch (error) {
        console.log(error);
    }
  }

  async function apiFetch2() {
    try {
      const response = await fetch(url2);
      if (response.ok) {
        const data2 = await response.json();
        console.log(data2);
    	  displayForecast(data2); 
      } else {
          throw Error(await response.text());
      }
    } catch (error) {
        console.log(error);
    }
  }
  
function displayweather(data) {
    const iconsrc = `https://openweathermap.org/img/w/${data.weather[0].icon}.png`;
    weatherIcon.setAttribute('src', iconsrc);
    weatherIcon.setAttribute('alt', `weather icon`);
    
    // const city=document.createElement('p')
    // city.innerHTML = `City: ${data1.city.name}`
    // report.appendChild(city)

    const temp=document.createElement('p')
    temp.innerHTML = `Temp: ${data.main.temp}&deg;C`
    report.appendChild(temp)
 
    const description=document.createElement('p')
    description.innerHTML = `Desc: ${data.weather[0].description}`
    report.appendChild(description)

    const high=document.createElement('p')
    high.innerHTML = `High: ${data.main.temp_max}&deg;C`
    report.appendChild(high)

    const low=document.createElement('p')
    low.innerHTML = `Low: ${data.main.temp_min}&deg;C`
    report.appendChild(low)

    const humidity=document.createElement('p')
    humidity.innerHTML = `Humidity: ${data.main.humidity}%`
    report.appendChild(humidity)
}

function displayForecast(data) {
   //forecast
   const dayNames=["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"]
   const d = new Date();

   const temp1 = document.createElement('p')
   const weatherIcon1 = document.createElement('img')
   const iconsrc1 = `https://openweathermap.org/img/w/${data.list[0].weather[0].icon}.png`;
   weatherIcon1.setAttribute('src', iconsrc1);
   weatherIcon1.setAttribute('alt', `weather icon`);

     // Append the image to the paragraph
   temp1.appendChild(weatherIcon1);
   temp1.innerHTML += `${dayNames[d.getDay()]}: ${data.list[0].main.temp}&deg;C`
    
   // Append the paragraph to the forecast container
   forecast.appendChild(temp1);




   const temp2 = document.createElement('p')
   const weatherIcon2 = document.createElement('img')
   const iconsrc2 = `https://openweathermap.org/img/w/${data.list[8].weather[0].icon}.png`;
   weatherIcon2.setAttribute('src', iconsrc2);
   weatherIcon2.setAttribute('alt', `weather icon`);

    // Append the image to the paragraph
    temp2.appendChild(weatherIcon2);
    temp2.innerHTML += `${dayNames[d.getDay()+1]}: ${data.list[8].main.temp}&deg;C`
     
    // Append the paragraph to the forecast container
    forecast.appendChild(temp2);


   const temp3 = document.createElement('p')
   const weatherIcon3 = document.createElement('img')
   const iconsrc3 = `https://openweathermap.org/img/w/${data.list[16].weather[0].icon}.png`;
   weatherIcon3.setAttribute('src', iconsrc3);
   weatherIcon3.setAttribute('alt', `weather icon`);

    // Append the image to the paragraph
    temp3.appendChild(weatherIcon3);
    temp3.innerHTML += `${dayNames[d.getDay()+2]}: ${data.list[16].main.temp}&deg;C`
     
    // Append the paragraph to the forecast container
    forecast.appendChild(temp3);
}

apiFetch1();
apiFetch2();