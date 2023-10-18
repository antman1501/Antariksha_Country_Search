import React, { useEffect,useState } from 'react'
import {useLocation} from 'react-router-dom'

export const SelectCountry = (props) => {

  const location=useLocation();

  const data=location.state;

  const [countries, setCountries] = useState([]);

  useEffect(() => {
    async function fetchMyAPI() {
      let response = await fetch('https://restcountries.com/v3.1/all')
      response = await response.json();
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

  const selectCountry=countries.filter((m)=>m.name.common.includes(props.selected))

  return <div>
    {selectCountry.map((country)=>{
      return <div className='country' key={country.name.common} >
        <div className='flag'>
            <img src={country.flags.png}></img>
        </div>
        <div className='information'>
            <div className='country-name' >{country.name.common}</div>
            <div className='info'>
                <p className='country-info-heading' >Population:&nbsp;</p><p className='country-info' >{country.population}</p>
            </div>
            <div className='info'>
                <p className='country-info-heading' >Region:&nbsp;</p><p className='country-info' >{country.region}</p>
            </div>
            <div className='info'>
                <p className='country-info-heading' >Capital:&nbsp;</p><p className='country-info' >{country.capital}</p>
            </div>
        </div>
        </div>
    })}
  </div>
}
