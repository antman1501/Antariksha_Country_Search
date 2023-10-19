import React,{ useEffect, useState } from 'react'
import { Routes, Route} from 'react-router-dom'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Country  from './countries'
import LoadingScreen from './loadingScreen'
import { SelectCountry } from './selectCountry'

export const isDarkContext = React.createContext();
export const countryAllContext = React.createContext();

function App() {

  const [loading, setLoading]=useState(true);

  const [searchCountry, setSearchCountry]=useState('');

  const [searchRegion, setSearchRegion]=useState('');

  const [isDark, setIsDark]=useState(false);

  const [countries, setCountries] = useState([]);

  const [searchSubRegion, setSearchSubRegion]=useState('');

  const [sorting, setSorting]=useState('');

  //const [countryDup,setCountryDup]=useState([]);

  //const [subRegion,setSubRegion]=useState([]);

  useEffect(() => {
    async function fetchMyAPI() {
      let response1 = await fetch('https://restcountries.com/v3.1/all')
      let response = await response1.json();
      //console.log(document.querySelector('.container').className)
      //console.log(response);
      setCountries(response);
      setCountries((oldValue)=>{
        return oldValue.map((m)=>{
          if(m.subregion==undefined){
            m.subregion='';
          }
          return m;
        })
      })
      // setCountryDup(response);
      // setCountryDup((oldValue)=>{
      //   return oldValue.map((m)=>{
      //     if(m.subregion==undefined){
      //       m.subregion='';
      //     }
      //     return m;
      //   })
      // })
    }
    fetchMyAPI();
  }, []);

  const filterCountry=countries.filter((m)=>m.name.common.toLowerCase().includes(searchCountry.toLowerCase()))
                                .filter((m)=>m.region.includes(searchRegion))
                                .filter((m)=>m.subregion.includes(searchSubRegion));
    
  const subRegions=[...new Set(countries.filter((m)=>m.region.includes(searchRegion))
                                      .map((m)=>m.subregion))];
  
  //const subReg=[...new Set(countries.map((m)=>m.subregion))];

  //const [filtered,setFiltered]=useState(filterCountry);

  function regionChange(reg){
    if(reg!='')
    {
      setSearchSubRegion('');
    }
  }

  // function sortCountries(srt){
  //   if(srt=='ascend by population'){
  //     setCountries(oldValue=>oldValue.sort((a,b)=>a.population-b.population));
  //   }
  //   else if(srt=='descend by population'){
  //     setCountries(oldValue=>oldValue.sort((a,b)=>b.population-a.population));
  //   }
  //   else if(srt=='ascend by area'){
  //     setCountries(oldValue=>oldValue.sort((a,b)=>a.area-b.area));
  //   }
  //   else if(srt=='descend by area'){
  //     setCountries(oldValue=>oldValue.sort((a,b)=>b.area-a.area));
  //   }
  // }
    
  async function loadScreen(){
    await setTimeout(()=>{setLoading(false)},1000);
  }

  console.log(countries);
  
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
      <Routes>
        <Route path='/' element={<><div className='search'>
        <div className='search-button' style={{backgroundColor: isDark? 'hsl(209, 23%, 22%)':'white',boxShadow: isDark? '':'2px 2px 8px 0 var(--Dark_Gray)'}}>
          <p className="material-symbols-outlined" style={{color: isDark? 'white':'hsl(200, 15%, 8%)'}}>search</p>
          <input type='text' placeholder='Search for a country' value={searchCountry} onChange={e=>{setSearchCountry(e.target.value);}} style={{backgroundColor: isDark? 'hsl(209, 23%, 22%)':'white',color: isDark? 'white':'hsl(200, 15%, 8%)'}} className={`${isDark? "white-placeholder":""}`}></input>
        </div>
        <div className='sort'>
          <select className='sorting-options' value={sorting} onChange={e=>{setSorting(e.target.value);}} style={{backgroundColor: isDark? 'hsl(209, 23%, 22%)':'white',color: isDark? 'white':'hsl(200, 15%, 8%)',boxShadow: isDark? '':'2px 2px 8px 0 var(--Dark_Gray)'}}>
            <option value=''>None</option>
            <option value='ascend by population'>Sort By Population(Ascending)</option>
            <option value='descend by population'>Sort By Population(Descending)</option>
            <option value='ascend by area'>Sort By Area(Ascending)</option>
            <option value='descend by area'>Sort By Area(Descending)</option>
          </select>
        </div>
        <div className='filter'>
          <select className='region' value={searchRegion} onChange={e=>{setSearchRegion(e.target.value);regionChange(e.target.value)}} style={{backgroundColor: isDark? 'hsl(209, 23%, 22%)':'white',color: isDark? 'white':'hsl(200, 15%, 8%)',boxShadow: isDark? '':'2px 2px 8px 0 var(--Dark_Gray)'}}>
            <option value=''>All Region</option>
            <option value='Africa'>Africa</option>
            <option value='America'>America</option>
            <option value='Asia'>Asia</option>
            <option value='Antarctic'>Antarctic</option>
            <option value='Europe'>Europe</option>
            <option value='Oceania'>Oceania</option>
          </select>
          <select className='subregion' value={searchSubRegion} onChange={e=>{setSearchSubRegion(e.target.value);}} style={{backgroundColor: isDark? 'hsl(209, 23%, 22%)':'white',color: isDark? 'white':'hsl(200, 15%, 8%)',boxShadow: isDark? '':'2px 2px 8px 0 var(--Dark_Gray)'}}>
            <option value=''>All Sub-Region</option>
            {subRegions.map((m,index)=>{
              return <option value={m} key={index}>{m}</option>
            })}
          </select>
        </div>
      </div>
      <countryAllContext.Provider value={filterCountry}>
            <isDarkContext.Provider value={isDark}>
              <Country sorted={sorting}/>
            </isDarkContext.Provider>
      </countryAllContext.Provider></>}></Route>
      <Route path='country/:id' element={<countryAllContext.Provider value={filterCountry}>
            <isDarkContext.Provider value={isDark}>
              <SelectCountry/>
            </isDarkContext.Provider>
      </countryAllContext.Provider>}></Route>
      </Routes>
    </div>
    }
    </>
  )
}
export default App
