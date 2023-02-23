import axios from "axios"
import { useEffect, useState } from "react"

export function NxWelcome() {
  const [cartList,setCartList]=useState([] as any)
    useEffect(()=>{
        getData()
    },[])
    const getData=async()=>{
        const response=await axios.get("http://localhost:4000/getcarts")
        setCartList(response)
        console.log("list",response)
    }
  return (
    <>
      <h1>Cart</h1>
    </>
  );
}

export default NxWelcome;
