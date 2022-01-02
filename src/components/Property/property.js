import * as React from 'react';
import './property.scss';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import ViewInArIcon from '@mui/icons-material/ViewInAr';
import BedroomParentIcon from '@mui/icons-material/BedroomParent';
import BathtubIcon from '@mui/icons-material/Bathtub';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import VisibilityIcon from '@mui/icons-material/Visibility';
import Button from '@mui/material/Button';
import {
  Link,
  useParams
} from "react-router-dom";
import * as Manager from './../../ListingsManager/manager';
import { useEffect, useState } from 'react';

function PropertyCard (props) {
  let el = props.data;
  let { id } = useParams();
  id = el.id;
  const [favorite, setFavorite] = useState();
  const [view, setView] = useState();


  useEffect(() => {
    setFavorite(el.isFavorite);
    setView(el.views)
  }, [favorite, view]);


  return (
    <Card sx={{ maxWidth: 800, minWidth: 600 }} className="propertyCard">
    <CardMedia
      component="img"
      alt="green iguana"
      height="200"
      image={el.images}
    />
    <CardContent>
      <div className="title-price">
        <h2>{el.name}</h2>
        <h3>$ {el.price}</h3>
      </div>
      <p>{el.description}</p>

      <div className="details">
        <div className="details-col">
          <div className="location">
            <LocationOnIcon/>
            <p>{el.locality}</p>
          </div>
          <div className="area">
            <ViewInArIcon/>
            <p>{el.carpet}</p>
          </div>
        </div>
        <div className="details-col">
          <div className="bedrooms">
            <BedroomParentIcon/>
            <p>{el.bedrooms}</p>
          </div>
          <div className="bathrooms">
            <BathtubIcon/>
            <p>{el.bathrooms}</p>
          </div>
        </div>
      </div>
      
    </CardContent>
    <CardActions className ="actions">
      <div className="actions-1">

        <div className="views">
          <VisibilityIcon/>
          <p>{el.views}</p>
        </div>
        <Button onClick={() => {
          Manager.favoriteListing(el.id);
          setFavorite(el.isFavorite);
        }}>
          {favorite === false ? <FavoriteBorderIcon/> : <FavoriteIcon/>}
        </Button>
      </div>
        <Button variant="contained" className='view'
        onClick={() => {
          Manager.viewListing(el.id);
          setView(el.views);
        }}>
          <Link 
          to={ {pathname:`/property/${id}`, state: {el}}}>
            View
          </Link>
        </Button>
    </CardActions>
    </Card>
  )
  
}

export default PropertyCard;