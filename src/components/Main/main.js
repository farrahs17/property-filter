import './main.scss';
import { useEffect, useState } from 'react';
import  PropertyList  from '../PropertyList/propertyList';
import Header from '../Header/header';
import RecentlyViewed from '../RecentlyViewed/recentlyViewed';
import Filters from "../Filters/filters";
import * as Manager from './../../ListingsManager/manager';

function Main() {
  const [listings, setListings] = useState([]);

  useEffect(() => {
    let list = Manager.getFilteredListings();
    setListings(list)
    }, [listings]);

    const applyFilters = (filter) => {
      console.log(filter);
      Manager.filter(filter);
      let list = Manager.getFilteredListings();
      setListings(list);
    };

  return (
    <div className="main">
      <Header/>
      <div className="appContainer">
        <Filters className="filters" applyFilters={applyFilters}/>
        <PropertyList className="list" listings= {listings}/>
        <RecentlyViewed className="recent"/>
      </div>
    </div>
  );
}

export default Main;
