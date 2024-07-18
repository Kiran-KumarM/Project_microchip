import logo from "./logo.svg";
import "./App.css";
import Weather from "./components/WeatherWidget/Weather";
import ScribblePad from "./components/scribblePad/ScribblePad";
import StockGraph from "./components/StockGraph/StockGraph";
import StockGraphMain from "./components/StockGraph/StockGraphMain";

function App() {
  return(
    <>
    <Weather />
    <ScribblePad/>
   <StockGraphMain/>
    </>

  ) 
}

export default App;
