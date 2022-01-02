import * as React from 'react';
import './header.scss';
import { Link } from "react-router-dom";
import Button from '@mui/material/Button';
import AddBusinessIcon from '@mui/icons-material/AddBusiness';

function Header(props) {
  return (
   <div className='header'>
      <h1>Property</h1>
      <Button variant="contained" startIcon={<AddBusinessIcon />} >
        <Link 
          to={ `/addProperty`}>
          Add Property
          </Link>
      </Button>
      
   </div>
  );
}

export default Header;