import React,{ useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Country  from './countries'
import LoadingScreen from './loadingScreen'

export const isDarkContext = React.createContext();
export const countryAllContext = React.createContext();

function App() {

  const [loading, setLoading]=useState(true);

  const [searchCountry, setSearchCountry]=useState('');

  const [searchRegion, setSearchRegion]=useState('');

  const [isDark, setIsDark]=useState(false);

  const [countries,setCountries] = useState([]);

    useEffect(() => {
        async function fetchMyAPI() {
        let response = await fetch('https://restcountries.com/v3.1/all')
        response = await response.json();
        //console.log(document.querySelector('.container').className)
        //console.log(response);
        setCountries(response)
        }

        fetchMyAPI();
    }, []);

    const filterCountry=countries.filter((m)=>m.name.common.toLowerCase().includes(searchCountry.toLowerCase()))
                                  .filter((m)=>m.region.includes(searchRegion));

  async function loadScreen(){
    await setTimeout(()=>{setLoading(false)},1000);
  }
  
  return (
    <>
    {loading? <LoadingScreen>{loadScreen()}</LoadingScreen>:
    <div className='container' style={{backgroundColor: isDark? 'hsl(207, 26%, 17%)':'hsl(0, 0%, 98%)',color: isDark? 'white':'hsl(200, 15%, 8%)'}}>
      <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,0,0"/>
      <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,0,0"/>
      <link rel="preconnect" href="https://fonts.googleapis.com"/>
      <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin/>
      <link href="https://fonts.googleapis.com/css2?family=Nunito+Sans:opsz,wght@6..12,300;6..12,600;6..12,800&display=swap" rel="stylesheet"/>
      <div className='heading' style={{backgroundColor: isDark? 'hsl(209, 23%, 22%)':'white',boxShadow: isDark? '':'2px 2px 8px 0 var(--Dark_Gray)'}}>
        <p className='search-heading' style={{color: isDark? 'white':'hsl(200, 15%, 8%)'}}>Where in the world?</p>
        <div className='dark-mode' onClick={()=>setIsDark(!isDark)}>
          <p className="material-symbols-outlined" style={{color: isDark? 'white':'hsl(200, 15%, 8%)'}}>dark_mode</p><p style={{color: isDark? 'white':'hsl(200, 15%, 8%)'}}>Dark Mode</p>
        </div>
      </div>
      <div className='search'>
        <div className='search-button' style={{backgroundColor: isDark? 'hsl(209, 23%, 22%)':'white',boxShadow: isDark? '':'2px 2px 8px 0 var(--Dark_Gray)'}}>
          <p className="material-symbols-outlined" style={{color: isDark? 'white':'hsl(200, 15%, 8%)'}}>search</p>
          <input type='text' placeholder='Search for a country' value={searchCountry} onChange={e=>{setSearchCountry(e.target.value);}} style={{backgroundColor: isDark? 'hsl(209, 23%, 22%)':'white',color: isDark? 'white':'hsl(200, 15%, 8%)'}} className={`${isDark? "white-placeholder":""}`}></input>
        </div>
        <select className='region' value={searchRegion} onChange={e=>{setSearchRegion(e.target.value);}} style={{backgroundColor: isDark? 'hsl(209, 23%, 22%)':'white',color: isDark? 'white':'hsl(200, 15%, 8%)',boxShadow: isDark? '':'2px 2px 8px 0 var(--Dark_Gray)'}}>
          <option value=''>All Region</option>
          <option value='Africa'>Africa</option>
          <option value='America'>America</option>
          <option value='Asia'>Asia</option>
          <option value='Europe'>Europe</option>
          <option value='Oceania'>Oceania</option>
        </select>
      </div>
      (<countryAllContext.Provider value={filterCountry}>
            <isDarkContext.Provider value={isDark}>
              <Country/>
            </isDarkContext.Provider>
      </countryAllContext.Provider>
      )
    </div>
    }
    </>
  )
}
export default App
