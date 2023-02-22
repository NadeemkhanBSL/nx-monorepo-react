import React from "react"
import { Grid } from "@mui/material"
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import { Link } from 'react-router-dom';
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

export const NavBar = () => {
    return (
        <div style={{ backgroundColor: "#00adf2", padding: "5px" }}>
            <Grid container >
                <Grid item xs={0.2}></Grid>
                <Grid item xs={3}><Link to="/"><LocalShippingIcon fontSize="large" style={{ color: "white",position:"relative",top:"3px" }} /></Link><span style={{ fontWeight: "bold", fontSize: "22px", position: "relative", color: "white", bottom: "5px" }}>E-Comm</span></Grid>
                <Grid item xs={6}> <Paper
                    component="form"
                    sx={{ p: '2px 2px', display: 'flex', alignItems: 'center', width: 400 ,height:25}}
                    style={{position:"relative",top:"5px"}}
                >
                    <IconButton sx={{ p: '10px' }} aria-label="menu">
                        <MenuIcon />
                    </IconButton>
                    <InputBase
                        sx={{ ml: 1, flex: 1 }}
                        placeholder="Search Product"
                    />
                    <IconButton type="button" sx={{ p: '10px' }} aria-label="search">
                        <SearchIcon />
                    </IconButton>
                </Paper></Grid>
                <Grid item xs={2}></Grid>
                <Grid item xs={0.8}><Link to="/tempcart"><ShoppingCartIcon fontSize="large" /></Link></Grid>
            </Grid>
        </div>
    )
}