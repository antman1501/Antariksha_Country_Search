import React,{ useEffect, useState, useContext } from 'react';
import {isDarkContext, countryAllContext } from './App';
import {Routes, Route, useNavigate} from 'react-router-dom'
import { SelectCountry } from './selectCountry';

function Country(props){

    const darkContext=useContext(isDarkContext);
    const allCountryContext=useContext(countryAllContext);

    const [selectCountry, setSelectCountry]=useState('')

    if(props.sorted=='ascend by population'){
      allCountryContext.sort((a,b)=>a.population-b.population);
    }
    else if(props.sorted=='descend by population'){
      allCountryContext.sort((a,b)=>b.population-a.population);
    }
    else if(props.sorted=='ascend by area'){
      allCountryContext.sort((a,b)=>a.area-b.area);
    }
    else if(props.sorted=='descend by area'){
      allCountryContext.sort((a,b)=>b.area-a.area);
    }

    const navigate=useNavigate();

    return(
        <Routes>
        <Route path='/' element={<div className='countries'>
        {
        allCountryContext.length!=0 ?allCountryContext.map((country)=>{
      return <div className='country' key={country.name.common} onClick={(e)=>{setSelectCountry(country.name.common);navigate('select')}} style={{backgroundColor: darkContext? 'hsl(209, 23%, 22%)':'white',boxShadow: darkContext? '':'2px 2px 8px 0 var(--Dark_Gray)'}}>
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
    }):<div className='no-data' style={{color: darkContext? 'white':'hsl(200, 15%, 8%)'}}>No Such Countries Found</div>}
    </div>}></Route>
      <Route path='select' element={<SelectCountry selected={selectCountry}/>}></Route>
      </Routes>
    )
}

export default Country;