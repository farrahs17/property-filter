import * as React from 'react';
import './propertyList.scss';
import PropertyCard from '../Property/property';
import * as Manager from './../../ListingsManager/manager';
import BrowserNotSupportedIcon from '@mui/icons-material/BrowserNotSupported';
import { useEffect, useState } from 'react';

function PropertyList(props) {
    const [listings, setListings] = useState([]);
  
    useEffect(() => {
      let list = Manager.getFilteredListings();
      setListings(list)
    }, [listings]);
    
  return (
    <div>
      {props.listings.length === 0 ?
        <div className="noListings">
          <BrowserNotSupportedIcon className='icon'/> 
          No available listings
        </div>:
       props.listings.map((el, i) => {
        return <PropertyCard key={el.id} data={el}/>
      })}
    </div>
  );
}
export default PropertyList;