import axios from "axios"
import React, { useEffect, useState } from "react"
import { Button } from "@mui/material"
import CircularProgress from '@mui/material/CircularProgress';

interface Item {
  id: number;
  title: string;
  description: string;
  image: string;
  price: number
}

export function NxWelcome({ searchText, handleBadgeCount }: { searchText: string, handleBadgeCount: any }) {
  const [data, setData] = useState<Item[]>([]);
  const [cartListcopy, setCartListcopy] = useState<Item[]>([] as any)
  const [spinner, setSpinner] = useState(false)

  useEffect(() => {
    getData()
  }, [])
  const getData = async () => {
    setSpinner(true)
    const response = await axios.get("https://fakestoreapi.com/products")
    if (response.status == 200) {
      setSpinner(false)
      setData(response.data)
      
      setCartListcopy(response?.data)
    }
    console.log(response)
  }

  const handleAddItem = async (item: {}) => {
    const response = await axios.post("http://localhost:4004/addcart", item)
    console.log("res==>", response)
    if (response.status == 200) {
      handleBadgeCount()
    }
  }

  useEffect(() => {
    const result = cartListcopy.filter((item) => item.title.toLowerCase().includes(searchText.toLowerCase()))
    setData(result)
  }, [searchText])

  const convertDollarToIndian=83
  return (
    <>
      {spinner ? <div style={{ position: "relative", left: "50%", top: "250px" }}>
        <CircularProgress color="success" />
      </div> : null}
      <div style={{ position: "relative", top: "50px" }}>
        {
          data.map((item, i) => {
            return (
              <div style={{ border: "1px solid black", width: "20%", float: "left", textAlign: "center", margin: "20px", padding: "10px", boxShadow: "0px 0px 5px black" }} key={i}>
                <img width={"80%"} height={200} src={item.image} alt="" />
                <br />
                <span style={{ fontWeight: "bold" }}>{item.title.substring(0, 20)}...</span>
                <br />
                <span>{item.description.substring(0, 20)}...</span>
                <br />
                <span ><span style={{ fontWeight: "bold" }}>Price:???</span>{item.price * convertDollarToIndian}</span>
                <br />
                <Button variant="contained" onClick={() => handleAddItem(item)}>Add To Cart</Button>
              </div>
            )
          })
        }
      </div>
    </>
  );
}

export default NxWelcome;
