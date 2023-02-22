import axios from "axios"
import React, { useEffect, useState } from "react"
import {Button} from "@mui/material"

interface Item {
  id: number;
  title: string;
  description: string;
  image:string;
  price:string
}

export function NxWelcome() {
  const [data,setData]=useState<Item[]>([]);

  useEffect(()=>{
    getData() 
  },[])
  const getData=async()=>{
    const response =await axios.get("https://fakestoreapi.com/products")
    setData(response.data)
    console.log(response)
  }
  const [allCartItem,setAllCartItem]=useState([] as any)
  const [CartItem,setCartItem]=useState({} as any)
  const handleAddItem=(item:{})=>{
    setCartItem(item)
  }
  useEffect(()=>{
    setAllCartItem([...allCartItem,CartItem])
    localStorage.setItem("cartItem",JSON.stringify(allCartItem))
  },[CartItem])
  return (
    <>
      {
        data.map((item,i)=>{
          return(
            <div style={{border:"1px solid black",width:"20%",float:"left",textAlign:"center",margin:"20px",padding:"10px",boxShadow:"0px 0px 5px black"}} key={i}>
              <img  width={200} height={200} src={item.image} alt="" />
              <br />
              <span style={{fontWeight:"bold"}}>{item.title.substring(0,20)}...</span>
              <br />
              <span>{item.description.substring(0,20)}...</span>
              <br />
              <span ><span style={{fontWeight:"bold"}}>Price:</span>{item.price}</span>
              <br />
              {/* <button >Add To Cart</button> */}
              <Button variant="contained" onClick={()=>handleAddItem(item)}>Add To Cart</Button>
            </div>
          )
        })
      }
    </>
  );
}

export default NxWelcome;
