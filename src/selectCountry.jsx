import React, { useEffect,useState,useContext } from 'react'
import {useLocation, useNavigate, useParams} from 'react-router-dom'
import LoadingScreen from './loadingScreen';
import {isDarkContext, countryAllContext } from './App';
//import borderCountry from './borderCountry';

export const SelectCountry = () => {

  const darkContext=useContext(isDarkContext);
  const allCountryContext=useContext(countryAllContext);


  const {id}= useParams();

  const location=useLocation();

  const navigate=useNavigate();

  const [loading, setLoading]=useState(true);

  const data=location.state;

  async function loadScreen(){
    await setTimeout(()=>{setLoading(false)},1000);
  }

  const [countries, setCountries] = useState([]);

  //const [border, setBorder] = useState([]);

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

  const country=countries.find((m)=>m.cca3.includes(id));

  const border=countries.reduce((acc,curr)=>{
    return [...acc,(curr.cca3)];
  },[]);

  // setBorder(()=>{
  //   let a=[];
  //   for(let i of countries){
  //     a[i.cca3]=i;
  //   }
  //   return a;
  // })

  //console.log(country.name)

  return (
    <>
    <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,0,0" />
    {loading? <LoadingScreen>{loadScreen()}</LoadingScreen>:
  <div className='selected-country'>
    {console.log(border)}
    <div className='go-back' onClick={()=>navigate(-1)} style={{backgroundColor: darkContext? 'hsl(209, 23%, 22%)':'white',boxShadow: darkContext? '':'2px 2px 8px 0 var(--Dark_Gray)', color: darkContext? 'white':'hsl(200, 15%, 8%)'}}><p style={{color: darkContext? 'white':'hsl(200, 15%, 8%)'}} className="material-symbols-outlined">arrow_back</p><p style={{color: darkContext? 'white':'hsl(200, 15%, 8%)'}}>Go back</p></div>
    <div className='selected'>
      <div className='selected-flag'>
        <img className='selected-flag-img' src={country.flags.svg}></img>
      </div>
      <div className='selected-right'>
      <div className='selected-information'>
        <div className='selected-country-name' style={{color: darkContext? 'white':'hsl(200, 15%, 8%)'}}>{country.name.common}</div>
        <div className='selected-info'>
          <div className='info-selected'>
            <p className='selected-country-info-heading' style={{color: darkContext? 'white':'hsl(200, 15%, 8%)'}}>Native Name:&nbsp;</p><p className='selected-country-info' style={{color: darkContext? 'white':'hsl(200, 15%, 8%)'}}>{Object.keys(country.name).includes('nativeName')?Object.values(country.name.nativeName)[0].official:''}</p>
          </div>
          <div className='info-selected'>
            <p className='selected-country-info-heading' style={{color: darkContext? 'white':'hsl(200, 15%, 8%)'}}>Population:&nbsp;</p><p className='selected-country-info' style={{color: darkContext? 'white':'hsl(200, 15%, 8%)'}}>{country.population}</p>
          </div>
          <div className='info-selected'>
            <p className='selected-country-info-heading' style={{color: darkContext? 'white':'hsl(200, 15%, 8%)'}}>Region:&nbsp;</p><p className='selected-country-info' style={{color: darkContext? 'white':'hsl(200, 15%, 8%)'}}>{country.region}</p>
          </div>
          <div className='info-selected'>
            <p className='selected-country-info-heading' style={{color: darkContext? 'white':'hsl(200, 15%, 8%)'}}>Sub Region:&nbsp;</p><p className='selected-country-info' style={{color: darkContext? 'white':'hsl(200, 15%, 8%)'}}>{country.subregion}</p>
          </div>
          <div className='info-selected'>
            <p className='selected-country-info-heading' style={{color: darkContext? 'white':'hsl(200, 15%, 8%)'}}>Capital:&nbsp;</p><p className='selected-country-info' style={{color: darkContext? 'white':'hsl(200, 15%, 8%)'}}>{country.capital}</p>
          </div>
          <div className='info-selected'>
            <p className='selected-country-info-heading' style={{color: darkContext? 'white':'hsl(200, 15%, 8%)'}}>Top Level Domain:&nbsp;</p><p className='selected-country-info' style={{color: darkContext? 'white':'hsl(200, 15%, 8%)'}}>{Object.keys(country).includes('tld')?country.tld.toString():''}</p>
          </div>
          <div className='info-selected'>
            <p className='selected-country-info-heading' style={{color: darkContext? 'white':'hsl(200, 15%, 8%)'}}>Currencies:&nbsp;</p><p className='selected-country-info' style={{color: darkContext? 'white':'hsl(200, 15%, 8%)'}}>{Object.keys(country).includes('currencies')?Object.values(country.currencies)[0].name:''}</p>
          </div>
          <div className='info-selected'>
            <p className='selected-country-info-heading' style={{color: darkContext? 'white':'hsl(200, 15%, 8%)'}}>Languages:&nbsp;</p><p className='selected-country-info' style={{color: darkContext? 'white':'hsl(200, 15%, 8%)'}}>{Object.keys(country).includes('languages')?Object.values(country.languages).toString():''}</p>
          </div>
        </div>
      </div>
       <div className='border-countries'>
          <div className='border-country-heading' style={{color: darkContext? 'white':'hsl(200, 15%, 8%)'}}>Border Countries:&nbsp;</div>
          <div className='border-country-set'>
          {Object.keys(country).includes('borders')?country.borders.map((m)=>{
            return <div className='border-country' key={m} onClick={()=>{navigate(`/country/${m}`)}} style={{backgroundColor: darkContext? 'hsl(209, 23%, 22%)':'white',boxShadow: darkContext? '':'2px 2px 8px 0 var(--Dark_Gray)', color: darkContext? 'white':'hsl(200, 15%, 8%)'}}>{countries[border.indexOf(m)].name.common}</div>
          }):''}
          </div>
        </div>
      </div>
    </div>
  </div>
    }
    </>
  )
}
