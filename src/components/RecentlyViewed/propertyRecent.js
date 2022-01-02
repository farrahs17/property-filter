import * as React from 'react';
import './propertyRecent.scss';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import VisibilityIcon from '@mui/icons-material/Visibility';


function PropertyRecent(props) {
    let el = props.data;
   
    return (
        <Card sx={{ maxWidth: 300, minWidth: 150 }} className="propertyRecent">
            <CardMedia
                component="img"
                alt="green iguana"
                height="200"
                image={el.images}
            />
            <CardContent>
                <div className="title-price">
                    <h3>{el.name}</h3>
                    <div className="views">
                        <VisibilityIcon />
                        <p>{el.views}</p>
                    </div>
                </div>
            </CardContent>
        </Card>
    )

}

export default PropertyRecent;