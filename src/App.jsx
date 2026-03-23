import { useState } from 'react'
import './App.css'
import { Theme } from "@radix-ui/themes";
import Search from './components/search/search';
import CurrentWeather from './components/current-weather/current-weather';


function App() {
  const [count, setCount] = useState(0)
  
  const handleOnSearchChange = (searchData) => {
    console.log("Search data:", searchData);
  }

  return (
    <>
    <div className='container'>
      <Search onSearchChange={handleOnSearchChange} />
      <CurrentWeather />
    </div>
    </>
  )
}

export default App
