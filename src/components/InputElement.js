import React, { useRef, useState } from 'react'
import { STOCK_API_URL,STOCK_API_KEY ,GEO_API_URL,geoApiOptions} from '../api';
import './InputElement.css'
const InputElement = ({type,handleSelect}) => {
   let  [data,setData]=useState(null)
  const inputFeild=useRef(null)
  
   function handelEnter(event){
      if(!event.target.value){

        setData(null)
      }

        if (event.key === "Enter") {
            if(type=="Weather"){
                console.log('enter',event)
                let keyword =event.target.value
                return fetch(
                    `${GEO_API_URL}/cities?minPopulation=1000000&namePrefix=${keyword}`,
                    geoApiOptions
                  )
                    .then((response) => response.json())
                    .then((response) => {
                        setData(response.data)
                    //   return {
                    //     options: response.data.map((city) => {
                    //         setData( {
                    //         value: `${city.latitude} ${city.longitude}`,
                    //         label: `${city.name}, ${city.countryCode}`,
                    //       })
                    //     }),
                    //   };
                    });
            }else{
               // let keyword ='tesco' //
                let keyword =event.target.value
              fetch(`${STOCK_API_URL}query?function=SYMBOL_SEARCH&keywords=${keyword}&apikey=${STOCK_API_KEY}`)
              .then((res) => {
                  return res.json();
                })
                .then((data) => {
                  setData(data.bestMatches)
              });
            }
    
          

          }
        console.log('ee',event)
      }

function resetData(){
  setData(null);
  if (inputFeild.current) {
    inputFeild.current.value = "";
}
}

  return (
    <div >
    <input type="text"  className={`${type=="Weather" ? 'weather' : 'stock'}`} placeholder={`${type=="Weather" ? 'Enter City' : 'Enter Stock Name'}`} ref={inputFeild} onKeyUp={handelEnter} />
    { data &&
          <ul className={`searchresult ${type=="Weather" ? 'weather' : 'stock'}`}>
            {data == null? 
            <div className="no_result"> No Data Found</div>  :

          <>
        {type == "Stock"  && data.map((x)=> (   
         
          <li key={x["1. symbol"]} onClick={()=>{handleSelect(x);resetData()} }>{`${x["2. name"]} (${x["1. symbol"]})`}</li>        
        ))}

        {type == "Weather" && data.map((x)=> (   
         <li key={x["id"]} onClick={()=>{handleSelect(x);resetData()} }>{`${x["name"]} (${x["country"]})`}</li>        
       ))}</>
      }
          </ul>
}
</div>
  )
}

export default InputElement