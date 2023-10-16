import React,{ useEffect, useState, useContext } from 'react';
import { searchCountryContext, searchRegionContext, isDarkContext } from './App';

function Country(){

    const countryContext=useContext(searchCountryContext);
    const regionContext=useContext(searchRegionContext);
    const darkContext=useContext(isDarkContext);

    const [countries,setCountries] = useState([]);

    // const [filteredCountry, setFilteredCountry] = useState([]);

    useEffect(() => {
        async function fetchMyAPI() {
        let response = await fetch('https://restcountries.com/v3.1/all')
        response = await response.json();
        //console.log(document.querySelector('.container').className)
        //console.log(response);
        setCountries(response)
        }

        fetchMyAPI()
    }, []);

    // function filterCountry(){
    //     setFilteredCountry(countries.filter(match=>
    //         match.name.common.toLowerCase().includes(countryContext.toLowerCase()) && match.region.includes(regionContext)
    //     ))
    //     console.log(filteredCountry);
    // }

    //console.log(props.findRegion);
    //countries.map(item=>console.log(item.name.common))

    return(
        
    <div className='countries'>
        {
        countries.filter(match=>
            match.name.common.toLowerCase().includes(countryContext.toLowerCase()) && match.region.includes(regionContext)
        ).length!=0 ?countries.filter(match=>
            match.name.common.toLowerCase().includes(countryContext.toLowerCase()) && match.region.includes(regionContext)).map((country,index)=>{
      return <div className='country' key={index} style={{backgroundColor: darkContext? 'hsl(209, 23%, 22%)':'white',boxShadow: darkContext? '':'2px 2px 8px 0 var(--Dark_Gray)'}}>
        <div className='flag'>
            <img src={country.flags.png}></img>
        </div>
        <div className='information'>
            <div className='country-name' style={{color: darkContext? 'white':'hsl(200, 15%, 8%)'}}>{country.name.common}</div>
            <div className='info'>
                <p className='country-info-heading' style={{color: darkContext? 'white':'hsl(200, 15%, 8%)'}}>Population:&nbsp;</p><p className='country-info' style={{color: darkContext? 'white':'hsl(200, 15%, 8%)'}}>{country.population}</p>
            </div>
            <div className='info'>
                <p className='country-info-heading' style={{color: darkContext? 'white':'hsl(200, 15%, 8%)'}}>Region:&nbsp;</p><p className='country-info' style={{color: darkContext? 'white':'hsl(200, 15%, 8%)'}}>{country.region}</p>
            </div>
            <div className='info'>
                <p className='country-info-heading' style={{color: darkContext? 'white':'hsl(200, 15%, 8%)'}}>Capital:&nbsp;</p><p className='country-info' style={{color: darkContext? 'white':'hsl(200, 15%, 8%)'}}>{country.capital}</p>
            </div>
        </div>
        </div>
    }):<div className='no-data' style={{color: darkContext? 'white':'hsl(200, 15%, 8%)'}}>No Data</div>}
    </div>
    )
}

export default Country;