import React, { useEffect, useState } from "react"

export const TempCart=()=>{
    // const [cartItem,setCartItem]=useState([] as any)
    const item = sessionStorage.getItem("cartItem")
  const result = item ? JSON.parse(item) : undefined
 console.log("result==>",result)
    return(
        <div>
            <h1>Temp Cart</h1>
        </div>
    )
}