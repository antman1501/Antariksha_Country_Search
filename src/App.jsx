import React,{ useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Country  from './countries'
import LoadingScreen from './loadingScreen'

export const searchCountryContext = React.createContext();
export const searchRegionContext = React.createContext();
export const isDarkContext = React.createContext();

function App() {

  const [loading, setLoading]=useState(false);

  const [searchCountry, setSearchCountry]=useState('');

  const [searchRegion, setSearchRegion]=useState('');

  const [isDark, setIsDark]=useState(false);

  async function loadScreen(){
    await setTimeout(()=>{setLoading(false)},1000);
  }


  // useEffect(() => {
  //   setTimeout(() => {
  //     setLoading(false);
  //   },2000);
  // },[]);
  
  return (
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
          <input type='text' placeholder='Search for a country' value={searchCountry} onChange={e=>{setSearchCountry(e.target.value);setLoading(true);}} style={{backgroundColor: isDark? 'hsl(209, 23%, 22%)':'white',color: isDark? 'white':'hsl(200, 15%, 8%)'}} className={`${isDark? "white-placeholder":""}`}></input>
        </div>
        <select className='region' value={searchRegion} onChange={e=>{setSearchRegion(e.target.value);setLoading(true)}} style={{backgroundColor: isDark? 'hsl(209, 23%, 22%)':'white',color: isDark? 'white':'hsl(200, 15%, 8%)',boxShadow: isDark? '':'2px 2px 8px 0 var(--Dark_Gray)'}}>
          <option value=''>All Region</option>
          <option value='Africa'>Africa</option>
          <option value='America'>America</option>
          <option value='Asia'>Asia</option>
          <option value='Europe'>Europe</option>
          <option value='Oceania'>Oceania</option>
        </select>
      </div>
      {loading ? <LoadingScreen dark={isDark}>{loadScreen()}</LoadingScreen>:
      (<searchCountryContext.Provider value={searchCountry}>
        <searchRegionContext.Provider value={searchRegion}>
          <isDarkContext.Provider value={isDark}>
            <Country/>
          </isDarkContext.Provider>
        </searchRegionContext.Provider>
      </searchCountryContext.Provider>)}
    </div>
  )
}
export default App
