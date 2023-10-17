import React from 'react'
import Country from './countries';

const sortCountry = (props) => {

    if(props.sorted=='ascend by population'){
      props.filteredCountry(oldValue=>oldValue.sort((a,b)=>a.population-b.population));
    }
    else if(props.sorted=='descend by population'){
      props.filteredCountry(oldValue=>oldValue.sort((a,b)=>b.population-a.population));
    }
    else if(props.sorted=='ascend by area'){
      props.filteredCountry(oldValue=>oldValue.sort((a,b)=>a.area-b.area));
    }
    else if(props.sorted=='descend by area'){
      props.filteredCountry(oldValue=>oldValue.sort((a,b)=>b.area-a.area));
    }
  return (
    <Country filter={props.filteredCountry}/>
  )
}

export default sortCountry