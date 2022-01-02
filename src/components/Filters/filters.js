import * as React from 'react';
import './filters.scss';
import * as Manager from './../../ListingsManager/manager';
import Slider from '@mui/material/Slider';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';

function valuetext(value) {
    return `${value}`;
}

//Return evenly spaces markers for the Slider component
function equalLabels(max,num){
    //Return evenly spaced numbers over a specified interval.
    function linSpace(stopValue, cardinality) {
        var arr = [];
        var step = (stopValue - 0) / (cardinality - 1);
        for (var i = 0; i < cardinality; i++) {
            arr.push(Math.round((step * i) / (1000))*1000);
        }
        return arr;
    }

    let labels = linSpace(max,num).map((x)=>{return {value:x,label:"$"+x}})
    return labels
}

function Filters(props){
    let priceRange = Manager.getPriceRange();
    const [price, setPrice] = React.useState([0,priceRange[1]]);
    const [locality, setLocality] = React.useState(0);
    const [bedrooms, setBedrooms] = React.useState(0);
    const [date, setDate] = React.useState(0);

    const marks = equalLabels(priceRange[1], 5)

    return (
        <div className='filters'>
            <h2>Filters</h2>

            <div className="filter">
                <p>Filter by location</p>
                <FormControl sx={{ m: 1, minWidth: 120 }}>
                    <Select
                    value={locality}
                    onChange={(event) => {setLocality(event.target.value)}}
                    displayEmpty
                    inputProps={{ 'aria-label': 'Without label' }}
                    >
                    <MenuItem value={0}>
                        <em>None</em>
                    </MenuItem>
                    <MenuItem value={'Scratchtown'}>Scratchtown</MenuItem>
                    <MenuItem value={'Purr District'}>Purr District</MenuItem>
                    <MenuItem value={'Katnip Province'}>Katnip Province</MenuItem>
                    </Select>
                </FormControl>
                <div className="selectedLocal">

                </div>
            </div>

            <div>
                <p>Filter by price range</p>

                <Slider
                    getAriaLabel={() => 'Price range'}
                    value={price}
                    min={0}
                    max={priceRange[1]}
                    onChange={(event, newValue) => {setPrice(newValue)}}
                    valueLabelDisplay="auto"
                    marks={marks}
                    step={1000}
                    disableSwap
                    defaultValue={[20, 37]}
                    getAriaValueText={valuetext}
                />
            </div>

            <div className="filter">
                <p>Filter by number of bedrooms</p>
                <TextField
                    id="outlined-number"
                    label="Bedrooms"
                    type="number"
                    placeholder="1"
                    InputLabelProps={{
                        shrink: true,
                    }}
                    variant="outlined"
                    margin="normal"
                    onChange={(event) => {setBedrooms(+event.target.value)}}

                />
                
            </div>

            <div className="filter">
                <p>Filter by added date</p>
                <FormControl sx={{ m: 1, minWidth: 120 }}>
                    <Select
                    value={date}
                    onChange={(event) => {setDate(event.target.value)
                    }}
                    displayEmpty
                    inputProps={{ 'aria-label': 'Without label' }}
                    >
                    <MenuItem value={0}>
                        <em>Any</em>
                    </MenuItem>
                    <MenuItem value={'this week'}>This Week</MenuItem>
                    <MenuItem value={'5 weeks'}>Last 5 Weeks</MenuItem>
                    <MenuItem value={'15 weeks'}>Last 15 Weeks</MenuItem>
                    </Select>
                </FormControl>
                
            </div>

            <Button variant="contained" onClick={()=> {
                let filter = {
                    locality: [locality],
                    price: price,
                    bedrooms: bedrooms,
                    date: date
                }
                props.applyFilters(filter);
            }}>Apply Filters</Button>

           
        </div>
    );
}

export default Filters