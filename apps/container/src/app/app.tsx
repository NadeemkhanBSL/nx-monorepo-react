import * as React from 'react';
import "./app.module.css"
import {useState,useEffect} from "react"
import NxWelcome from './nx-welcome';

import { Link, Route, Routes } from 'react-router-dom';
import {NavBar} from "./NavBar"
import { TempCart } from './TempCart';
import axios from 'axios';

const Cart = React.lazy(() => import('cart/Module'));

const Products = React.lazy(() => import('products/Module'));

export function App() {
  const [searchText,setSearchText]=useState("")
  const [badgeCount,setbadgeCount]=useState("")

  const hadleSearch=(e:any)=>{
    console.log(e.target.value)
    setSearchText(e.target.value)
  }
  useEffect(()=>{
    handleBadgeCount()
  },[])
  const handleBadgeCount=async()=>{
    const response = await axios.get("http://localhost:4004/getcarts")
    console.log("api badge count",response?.data?.length)
        setbadgeCount(response?.data?.length)
  }
  console.log("badgeCount",badgeCount)
  return (
    <React.Suspense fallback={null}>
      <NavBar hadleSearch={hadleSearch} badgeCount={badgeCount}/>
      {/* <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/cart">Cart</Link>
        </li>
        <li>
          <Link to="/products">Products</Link>
        </li>
      </ul> */}
      <Routes>
        <Route path="/" element={<NxWelcome handleBadgeCount={handleBadgeCount} searchText={searchText}/>} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/products" element={<Products />} />
        <Route path="/tempcart" element={<TempCart  handleBadgeCount={ handleBadgeCount}/>} />
      </Routes>
    </React.Suspense>
  );
}

export default App;
