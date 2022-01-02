import * as React from 'react';
import './recentlyViewed.scss';
import PropertyRecent from "./propertyRecent";
import * as Manager from './../../ListingsManager/manager';
import { useEffect, useState } from 'react';

function RecentlyViewed (props) {
   const [recentList, setRecentList] = useState([]);

    useEffect(() => {
      let list = Manager.getRecentListings();
      setRecentList(list)
    }, [recentList]);
  

    return (
      <div className="recentlyViewed">
          <h3>Recently Viewed</h3>
        {recentList.map((el, i) => {
            return <PropertyRecent key={el.id} data={el} />
          })
        }
      </div>
    )
}

export default RecentlyViewed;
