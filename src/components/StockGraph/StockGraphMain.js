import React, { useEffect, useState } from 'react'
import { STOCK_API_URL,STOCK_API_KEY } from '../../api';
import StockGraph from './StockGraph';
import './stockGraph.css';
import InputElement from '../InputElement';
// import {StockGraph} from './StockGraph'


const StockGraphMain = () => {
    let [stockList,setStockList]= useState(null);
    let [stockData,setStockData]=useState(null);
    let [selectedStock,setselectedStock]=useState('IBM')

    useEffect(()=>{

        fetch(`${STOCK_API_URL}query?function=TIME_SERIES_DAILY&symbol=${selectedStock}&apikey=${STOCK_API_KEY}`)
        .then((res) => {
          return res.json();
        })
        .then((data) => {
            let sData=[]
           for(let key in data["Time Series (Daily)"]) {
                sData.push({x:key , y:+data["Time Series (Daily)"][key]["2. high"]})
           }
           var decreaseValue = sData[0].y -sData[sData.length-1].y;

          let result= (decreaseValue / sData[0].y) * 100;
          result =  sData[sData.length-1].y > sData[0].y   ? result.toFixed(2) : '+'+result.toFixed(2) 

          setStockData({metaInfo:data["Meta Data"]  , data:sData,percentChange : result , priceChange:  sData[sData.length-1].y > sData[0].y  ? decreaseValue.toFixed(2) : '+'+decreaseValue.toFixed(2),
            color: result.includes('+') ? 'green' : 'red'      
          });
          console.log(stockData)
        });
      
      //  setStockData(getStockData())         
      },[selectedStock])

      function handleSelect(value){
        setselectedStock(value["1. symbol"])
        setStockList(null)
      }
  return (
    <>
    {stockData == null ? 
       <div>loading...</div> : 
    <div className="container_main">
      <InputElement type="Stock" handleSelect={(e)=>handleSelect(e)}/>
        {/* <div className='input'>
            <input type="text" placeholder='search stock' className='input_search' onKeyDown={handelEnter}></input>
            { stockList &&
                <ul className="searchresult">
              {stockList.map((x)=> (   
                <li key={x["1. symbol"]} onClick={()=>handleSelect(x) }>{`${x["2. name"]} (${x["1. symbol"]})`}</li>        
              ))}
                </ul>
}
        </div> */}
        <div className='stockInfo'>
          <span>{stockData?.metaInfo["2. Symbol"]}</span> <span style={{color : stockData?.color  }}>({stockData?.percentChange + ' %'})</span>
          <div><span>{stockData.data[0].y}</span><span>{stockData.priceChange}</span></div>
        </div>

        
            <StockGraph  data={stockData.data} width={1000} height={500} linecolor={stockData?.color}/>
        
   </div>
}
   </>
  )
}

export default StockGraphMain;