
let loc = document.getElementById("location");
let tempicon = document.getElementById("temp-icon");
let tempvalue = document.getElementById("temp-value");
let climate = document.getElementById("climate");
let iconfile;
const searchInput = document.getElementById("search-input");
const searchButton = document.getElementById("search-button");


// now we are creating a function which will get the weather of the city which we will search
searchButton.addEventListener("click", (e) => {

    // now we are preventing the default behaviour of the button
    e.preventDefault();

    // now we are getting the value of the input field
    getWeather(searchInput.value);

    // now we are clearing the input field
    searchInput.value = "";
});

const getWeather =async(city) => {
    try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=698f3f74834f4ed04141f3a92e031b2e`, { mode: 'cors' });
     
    const weatherData = await response.json();//returning the response in json format and storing it in the variable weatherData
    const{name} = weatherData; //returning the name of the city and storing it in the variable name
    const{feels_like} = weatherData.main; //returning the feels like temperature and storing it in the variable feels_like
    const{id,main} = weatherData.weather[0]; //returning the id and main of the weather and storing it in the variable id and main

    loc.textContent = name; //setting the value of the variable name to the html element loc
    climate.textContent = main; //setting the value of the variable main to the html element climate
    tempvalue.textContent = Math.round(feels_like - 273); //setting the value of the variable feels_like to the html element tempvalue
    

    if (id < 300 && id > 200) {
        tempicon.src = "./temp-icons/thunderstorm.png";
    }
    else if (id < 400 && id > 300) {
        tempicon.src = "./temp-icons/drizzle.png";
    }
    else if (id < 600 && id > 500) {
        tempicon.src = "./temp-icons/rain.png";
    }
    else if (id < 700 && id > 600) {
        tempicon.src = "./temp-icons/snow.png";
    }
    else if (id < 800 && id > 700) {
        tempicon.src = "./temp-icons/atmosphere.png";
    }
    else if (id == 800) {
        tempicon.src = "./temp-icons/clear.png";
    }
    else if (id > 800) {
        tempicon.src = "./temp-icons/clouds.png";
    }
}
    catch (error) {
        alert("City not found");
    }
}

//or current location
// window.addEventListener("load", () => { --->this will run the code only when the window is loaded
window.addEventListener("load", ()=>{
    let long;
    let lat;
    // if the browser supports the geolocation api then only the code will run otherwise it will not run
    if(navigator.geolocation)
    {
        //navigator.geolocation.getCurrentPosition((position)=> //this is the function which will get the current position of the user
        navigator.geolocation.getCurrentPosition((position)=>
        {
            long = position.coords.longitude;
            lat = position.coords.latitude;
            //this is the proxy server which will help us to fetch the api from the url
            const proxy = "https://cors-anywhere.herokuapp.com/"; 
            //this is the api url which we are fetching

            const api = `${proxy}api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=698f3f74834f4ed04141f3a92e031b2e`;    
            
            // fetching the api from the url and converting it into json format and then storing it in the variable response 
            fetch(api).then((response)=>{
                return response.json(); //returning the response in json format
            })

            // now we are storing the data in the variable data
            .then((data)=>{
                const{name} = data;
                const{feels_like} = data.main;
                const{id,main} = data.weather[0];

                //setting the values of the variables to the html elements
                loc.textContent = name;
                climate.textContent = main;
                tempvalue.textContent = Math.round(feels_like - 273);
                // console.log(data);
                if(id<300 && id>200)
                {
                    tempicon.src = "./temp-icons/thunderstorm.png";
                }
                else if(id<400 && id>300)
                {
                    tempicon.src = "./temp-icons/drizzle.png";
                }
                else if(id<600 && id>500)
                {
                    tempicon.src = "./temp-icons/rain.png";
                }
                else if(id<700 && id>600)
                {
                    tempicon.src = "./temp-icons/snow.png";
                }
                else if(id<800 && id>700)
                {
                    tempicon.src = "./temp-icons/atmosphere.png";
                }
                else if(id==800)
                {
                    tempicon.src = "./temp-icons/clear.png";
                }
                else if(id>800)
                {
                    tempicon.src = "./temp-icons/clouds.png";
                }


                
            })
        }
    )}
})
