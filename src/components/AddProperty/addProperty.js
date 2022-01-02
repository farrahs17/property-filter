import * as React from 'react';
import './addProperty.scss';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import * as Manager from './../../ListingsManager/manager';
import {
  Link,
  useHistory
} from "react-router-dom";
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import { useEffect, useState } from 'react';


export default function AddPropertyModal() {
    const [locality, setLocality] = React.useState("");
    const [name, setName] = React.useState("");
    const [description, setDescription] = React.useState("");
    const [image, setImage] = React.useState("");
    const [address, setAddress] = React.useState("");
    const [price, setPrice] = React.useState(0);
    const [bedrooms, setBedroom] = React.useState(0);
    const [bathrooms, setBathroom] = React.useState(0);
    const [carpet, setCarpet] = React.useState(0);
    const [error, setError] = React.useState();

    let history = useHistory();

    return (
        <div className='addProperty'>
            <Link to="/"  className="navigate">
                <div className="navigate">
                    <ArrowBackIosIcon/>Back
                </div>
            </Link>
            
            <div className='page'>
                <div className="container">

                    <div className="col">

                        <TextField
                            required
                            id="standard-required"
                            label="Name"
                            placeholder="Property name"
                            variant="outlined"
                            margin="normal"
                            error= {!name && error}
                            onChange={(event) => setName(event.target.value)}
                        />
                        <TextField
                            required
                            id="outlined-multiline-static"
                            label="Description"
                            placeholder="Describe your property"
                            variant="outlined"
                            margin="normal"
                            error= {!description && error}
                            onChange={(event) => setDescription(event.target.value)}
                            
                        />
                        <TextField
                            required
                            id="outlined-basic"
                            label="Image"
                            placeholder="Link to image"
                            variant="outlined"
                            margin="normal"
                            error= {!image && error}
                            onChange={(event) => setImage(event.target.value)}

                        />
                        <TextField
                            required
                            id="outlined-basic"
                            label="Address"
                            placeholder="Hello World"
                            variant="outlined"
                            margin="normal"
                            error= {!address && error}
                            onChange={(event) => setAddress(event.target.value)}

                        />
                        <FormControl fullWidth className='select'>
                        <InputLabel id="demo-simple-select-label">Locality</InputLabel>
                        <Select
                            required
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={locality}
                            label="locality"
                            placeholder="test"
                            error= {!locality && error}
                            onChange={(event) => setLocality(event.target.value)}
                        >
                            <MenuItem value={'Scratchtown'}>Scratchtown</MenuItem>
                            <MenuItem value={'Purr District'}>Purr District</MenuItem>
                            <MenuItem value={'Katnip Province'}>Katnip Province</MenuItem>
                        </Select>
                        </FormControl>
                    </div>

                    <div className="col">

                        <TextField
                            required
                            id="outlined-number"
                            label="Price"
                            type="number"
                            placeholder= "1000"
                            InputLabelProps={{
                                shrink: true,
                            }}
                            variant="outlined"
                            margin="normal"
                            min = {0}
                            error= {(price == 0 )&& error}
                            inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
                            onChange={(event) => setPrice(event.target.value)}

                        />
                        <TextField
                            required
                            id="outlined-number"
                            label="Bedrooms"
                            type="number"
                            placeholder="1"
                            InputLabelProps={{
                                shrink: true,
                            }}
                            variant="outlined"
                            margin="normal"
                            min = {0}
                            error= {(bedrooms == 0 )&& error}
                            inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
                            onChange={(event) => setBedroom(event.target.value)}

                        />
                        <TextField
                            required
                            id="outlined-number"
                            label="Bathrooms"
                            type="number"
                            placeholder="1"
                            InputLabelProps={{
                                shrink: true,
                            }}
                            variant="outlined"
                            margin="normal"
                            min = {0}
                            error= {(bathrooms == 0 )&& error}
                            inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
                            onChange={(event) => setBathroom(event.target.value)}

                        />
                        <TextField
                            required
                            id="outlined-number"
                            label="Carpet Area"
                            type="number"
                            placeholder="50"
                            InputLabelProps={{
                                shrink: true,
                            }}
                            variant="outlined"
                            margin="normal"
                            min = {0}
                            error= {(carpet == 0 )&& error}
                            inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
                            onChange={(event) => setCarpet(event.target.value)}

                        />
                    </div>
                </div>

                
                <Button variant="contained" onClick={()=> {
                    if (!name || !description || !image || !address || price === 0 || bedrooms === 0 || bathrooms === 0 || carpet === 0){
                        setError(true);
                    } else {
                        Manager.createListing(name, description, image, address, locality, price, bedrooms, bathrooms, carpet);
                        let b = Manager.getAllListings();
                        history.push('/');
     
                    }
                }}>Create Listing</Button>
    
            </div>
            

        </div>
    );
}