import React,{useEffect,useState} from "react"
import { Grid, Tooltip } from "@mui/material"
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import { Link } from 'react-router-dom';
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import Badge from '@mui/material/Badge';
import axios from "axios";

export const NavBar = ({ hadleSearch ,badgeCount}: { hadleSearch: any,badgeCount:any }) => {
   
    const item = sessionStorage.getItem("bagdeCount")
  const count = item ? JSON.parse(item) : undefined
  console.log(count)
  
//   setbadgeCount(count)

    return (
        <div style={{ backgroundColor: "#00adf2", padding: "5px",position:"fixed",width:"100%",zIndex:"1"}}>
            <Grid container >
                <Grid item xs={0.2}></Grid>
                <Grid item xs={3}><Link to="/products"><Tooltip title="Go To Product List" arrow><LocalShippingIcon fontSize="large" style={{position: "relative", top: "3px" }} /></Tooltip></Link><span style={{ fontWeight: "bold", fontSize: "22px", position: "relative", color: "white", bottom: "5px" }}>E-Comm</span></Grid>
                <Grid item xs={6}> <Paper
                    component="form"
                    sx={{ p: '2px 2px', display: 'flex', alignItems: 'center', width: 400, height: 25 }}
                    style={{ position: "relative", top: "5px" }}
                >
                    <InputBase
                        sx={{ ml: 1, flex: 1 }}
                        placeholder="Search Product"
                        onChange={hadleSearch}
                    />
                    <IconButton type="button" sx={{ p: '10px' }} aria-label="search">
                        <SearchIcon />
                    </IconButton>
                </Paper></Grid>
                <Grid item xs={2}></Grid>
                <Grid item xs={0.8}><Link to="/cart">
                    <Badge badgeContent={badgeCount} showZero style={{position:"relative",top:"5px"}} color="primary">
                    <Tooltip title="Go To Cart" arrow><ShoppingCartIcon fontSize="large" /></Tooltip>
                    </Badge>
                </Link></Grid>
            </Grid>
        </div>
    )
}