// first thing we do is get longitude and latitude, using in-built JS function.

window.addEventListener('load',()=>{
    let long ;
    let lat;
    let temperatureDescription = document.querySelector(".temperature-description");
    let temperatureDegree = document.querySelector(".temperature-degree");
    let locationTimezone = document.querySelector(".location-timezone");
    let ic = document.getElementById("icon");
    let temperatureSection = document.querySelector(".temperature");
    let temperatureSpan = document.querySelector(".temperature span");
    // if this exists in browser
    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(position => {
            long = position.coords.longitude;
            lat = position.coords.latitude;
            const api =`https://api.weatherapi.com/v1/current.json?key=117d8f778efe4c5fb53231729222505&q=${lat},${long}`;
            
            const iconapi = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=f4b57399c560c2b41f1438adb75e30ff`
            fetch(api)
                .then(response =>{
                    return response.json()
                })
                .then(data =>{
                    //console.log(data);
                    const {temp_f, condition, temp_c} = data.current;
                    const {name} = data.location;
                    const {text}= data.current.condition;
                    // Set DOM Elements from API
                   temperatureDegree.textContent = temp_f;
                   temperatureDescription.textContent = text;
                   locationTimezone.textContent = name;
                   
                   temperatureSection.addEventListener('click', () => {
                    if(temperatureSpan.textContent === "F"){
                        temperatureDegree.textContent = temp_c;
                        temperatureSpan.textContent = "C";
                    }
                    else{
                        temperatureDegree.textContent = temp_f;
                        temperatureSpan.textContent ="F";
                    }

                   });

                });
            fetch (iconapi)
                .then(response =>{
                    return response.json();
                })
                .then(data=>{
                    const {ico} = data.weather;
                    icon.src = ico;
                })
        });        
    }
});