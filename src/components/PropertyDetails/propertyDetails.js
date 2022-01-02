import React from 'react';
import { useState } from 'react';
import './propertyDetails.scss';
import Carousel from 'react-material-ui-carousel';
import { useLocation } from "react-router";
import Header from '../Header/header';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import ViewInArIcon from '@mui/icons-material/ViewInAr';
import BedroomParentIcon from '@mui/icons-material/BedroomParent';
import BathtubIcon from '@mui/icons-material/Bathtub';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import VisibilityIcon from '@mui/icons-material/Visibility';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import Button from '@mui/material/Button';
import { Link } from "react-router-dom";
import * as Manager from './../../ListingsManager/manager';

function PropertyDetailsPage (props) {
    const [favorite, setFavorite] = useState();
    const location = useLocation();
    const property = location.state.el;
    let images = [
    "https://pyxis.nymag.com/v1/imgs/711/486/d8297fabeda7f1880ef08532befcfe4626-petsfit-outdoor-triangle-cat-house-.rsocial.w1200.jpg",
    "https://idsb.tmgrup.com.tr/ly/uploads/images/2021/06/13/121551.jpg",
    "https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/cat-house-1523376147.jpg?crop=0.955xw:0.914xh;0,0.0864xh&resize=480:*",
    "https://blythewoodworks.com/wp-content/uploads/2018/11/Cat-Dplx-with-PD.jpg",
    "https://m.media-amazon.com/images/I/711a7pu9WUL._AC_SL1500_.jpg",
    "https://hgtvhome.sndimg.com/content/dam/images/hgtv/fullset/2021/9/20/0/Original_Crafty-Lumberjacks_Haunted_Cat_House_13-2_Glue-Facade.jpg.rend.hgtvcom.616.462.suffix/1632171905242.jpeg"
]
    
return (
    <div>
        <Header/>
        <Link to="/"  className="navigate">
            <div className="navigate">
                <ArrowBackIosIcon/>Back
            </div>
        </Link>
        <div className="carContainer">

            <Carousel className='car'>
                {
                    images.map( (item, i) => <img key={i}  src={item} /> )
                }
            </Carousel>
        </div>
        <div className="content">
            <div className="content-col">

                <h1>{property.name}</h1>
                <h1>${property.price}</h1>
                <p>{property.address}</p>
                <p>{property.description}</p>

                <div className="details">
                    <div className="details-col">
                    <div className="row">
                        <LocationOnIcon/>
                        <p>{property.locality}</p>
                    </div>
                    <div className="row">
                        <ViewInArIcon/>
                        <p>Property Size:</p>
                        <p>{property.carpet}</p>
                    </div>
                    </div>
                    <div className="details-col">
                    <div className="row">
                        <BedroomParentIcon/>
                        <p>
                            Bedrooms:
                        </p>
                        <p>{property.bedrooms}</p>
                    </div>
                    <div className="row">
                        <BathtubIcon/>
                        <p>
                            Bathrooms:
                        </p>
                        <p>{property.bathrooms}</p>
                    </div>
                    </div>
                </div>
            </div>
            <div className="content-col">
                <div className="views">
                    <VisibilityIcon/>
                    <p>{property.views}</p>
                </div>
                <Button variant="outlined" onClick={() => {
                        Manager.favoriteListing(property.id);
                        setFavorite(property.isFavorite);
                    }}>
                    {property.isFavorite === false ? <FavoriteBorderIcon/> : <FavoriteIcon/>}
                </Button>
            </div>
                
        </div>

    </div>
    );
};

export default PropertyDetailsPage;