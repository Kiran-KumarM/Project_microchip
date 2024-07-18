
export default () => {
  self.addEventListener("message", (e) => {    // eslint-disable-line no-restricted-globals
    
    if (!e) return;
    let data = e.data;
  //  clearInterval(interval)
   fetchdata(data)

// let interval =   setInterval(()=>{
//     console.log('inside timeout')
//     fetchdata(data)
//    },10000)
 
    
}) 



function fetchdata(data){

    fetch(`${data.WEATHER_API_URL}/weather?lat=${data.lat}&lon=${data.lon}&appid=${data.WEATHER_API_KEY}&units=metric`)
    .then(response => {
        return response.json();
    })
    .then(function(_ref) {
        postMessage(_ref);
    }).catch(()=>{throw Error('Something Went Wrong')});
}
    };
