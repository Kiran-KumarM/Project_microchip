
export default () => {
  self.addEventListener("message", (e) => {    // eslint-disable-line no-restricted-globals
    
    if (!e) return;
    let data = e.data;

    let interval;   

  // clearInterval(interval)
   fetchdata(data)
//    interval= setInterval(()=>{
//     console.log(data)
//     if(predata == data){
//         fetchdata(data)
//     }
//     else{
//         clearInterval(interval)
//     }
   

//    },5000)
  
  // let predata=data;
}) 



function fetchdata(data){
    let interval;
    fetch(`${data.WEATHER_API_URL}/weather?lat=${data.lat}&lon=${data.lon}&appid=${data.WEATHER_API_KEY}&units=metric`)
    .then(response => {
        return response.json();
    })
    .then(function(_ref) {
        postMessage(_ref);
      
    }).catch(()=>{throw Error('Something Went Wrong')});
}
    };
