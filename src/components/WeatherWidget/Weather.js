import React, { useEffect, useState } from "react";
import "./weather.css";

import WorkerFactory from "../webWorkers/workerFactory";
import myWorker from "../webWorkers/weatherWorker";
import { WEATHER_API_URL, WEATHER_API_KEY } from "../../api";
import InputElement from "../InputElement";

const Weather = () => {
  const workerInstance = new WorkerFactory(myWorker);
  let [data,setData]=useState(null);
 
  let [lati, long]=[localStorage.getItem('lat'),localStorage.getItem('lon')]
  lati=localStorage.getItem('lat') ?13.342 : localStorage.getItem('lat');
  long=localStorage.getItem('lon') ? 80.27 :localStorage.getItem('lon');

  useEffect(() => {
  
    // localStorage.setItem('lat',13.343)
    // localStorage.setItem('lon',80.2705)
    // Create a new web worker
    workerInstance.postMessage({WEATHER_API_URL:WEATHER_API_URL,WEATHER_API_KEY:WEATHER_API_KEY,lat:13.34,lon:80.27})
    // Set up event listener for messages from the worker
    //refreshData()


  }, []);

//   function refreshData(){
//  let interval = setInterval(() => {
//     workerInstance.postMessage({WEATHER_API_URL:WEATHER_API_URL,WEATHER_API_KEY:WEATHER_API_KEY,lat:lati,lon:long})
//     }, 10000);
//   }

  workerInstance.onmessage = function (event) {
    updatedata(event.data)
  };

  function  updatedata(event){
        setData(event);
    }


    function handleSelect(e){
      localStorage.setItem('lat',e.latitude)
      localStorage.setItem('lon',e.longitude)
      lati=e.latitude;
      long=e.longitude;
      workerInstance.postMessage({WEATHER_API_URL:WEATHER_API_URL,WEATHER_API_KEY:WEATHER_API_KEY,lat:e.latitude,lon:e.longitude})
    }
  return (
    <>
  {data==null ? 
        <div>loading....</div>   
        : 
 <div className="weather">
       <div className="searchCity">
        <InputElement type="Weather"  handleSelect={(e)=>handleSelect(e)} />
          
       </div>
       <div className="weather_card">
        <div className="cityName">{data.name}</div>
         <div className="temp_info">
            <img src={`https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`} alt="" />
           <div className="current_temp">{data.main.temp}</div>
           <div className="temp_desc">
            <div className="info">{data.weather[0].description}</div>
            <div className="feels_like">{'Feels Like '+data.main.feels_like}</div>
           </div>
        </div>
         <div className="extra_info">
           <div>
                <div className="img wind"></div>
                <div className="title">Wind</div>
                <div className="data">{data.wind.speed} meter/sec</div>
           </div>
           <div >
                 <div className="img humid"></div>
                <div className="title">Humidity</div>
                <div className="data">{data.main.humidity}</div>
           </div>
           <div >
                <div className="img pressure"></div>
                <div className="title">Pressure</div>
                <div className="data">{data.main.pressure}</div>
           </div>
           <div >
                <div className="img visible"></div>
                <div className="title">Visibility</div>
                <div className="data">{data.visibility + ' meters'}</div>
           </div>
        
         
         </div>
       </div>
     </div>
}
</>
  
  );
};

export default Weather;
