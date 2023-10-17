import React,{ useEffect, useState, useContext } from 'react';
import {isDarkContext, countryAllContext } from './App';

function Country(){

    const darkContext=useContext(isDarkContext);
    const allCountryContext=useContext(countryAllContext);

    return(
        
    <div className='countries'>
        {
        allCountryContext.length!=0 ?allCountryContext.map((country,index)=>{
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
    }):<div className='no-data' style={{color: darkContext? 'white':'hsl(200, 15%, 8%)'}}>No Such Countries Found</div>}
    </div>
    )
}

export default Country;