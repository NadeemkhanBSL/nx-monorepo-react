import { Grid } from "@mui/material";
import Button from "@mui/material/Button";
import axios from "axios"
import React, { useEffect, useState } from "react"
import CircularProgress from '@mui/material/CircularProgress';

interface Item {
    id: number;
    title: string;
    description: string;
    image: string;
    price: string;
    rating: { rate: number }
}

export const TempCart = () => {
    const [cartList, setCartList] = useState<Item[]>([] as any)
    const [spinner, setSpinner] = useState(false)
    const [noData, setNoData] = useState("")
    const [totalPrice,setTotalPrice]=useState({
        tprice:0,
        length:0
    })
    useEffect(() => {
        getData()
    }, [])
    const getData = async () => {
        setSpinner(true)
        const response = await axios.get("http://localhost:4004/getcarts")
        if (response.data == '') {
            setNoData("NO Item In Cart")
            setSpinner(false)
        } else {
            setCartList(response?.data)
            setSpinner(false)
            sessionStorage.setItem("bagdeCount", JSON.stringify(response?.data?.length))
            const arrayPrice=response?.data
            const a = arrayPrice?.map((item:any) => item.price)
            const b = a?.reduce((curr:any, next:any) => curr + next)
            const totalPriceCount=Math.round(b)
            const totalCount=response?.data?.length
            setTotalPrice({tprice:totalPriceCount,length:totalCount})
        }

    }

    const handleDelete=async(id:any)=>{
        console.log("idddd",id)
        const response = await axios.delete(`http://localhost:4004/delete/${id}`)
        console.log("delete res",response)
    }
    return (
        <div>
            <h1>Temp Cart</h1>
            <br />
            <h4 style={{ position: "relative", left: "400px" }}>{noData}</h4>
            {spinner ? <div style={{ position: "relative", left: "50%", top: "250px" }}>
                <CircularProgress color="success" />
            </div> : null}
            {
                cartList?.map((item, i) => {
                    return (
                        <div key={i} style={{ border: "1px sold black", boxShadow: "0px 0px 3px black", marginTop: "10px" }}>
                            <Grid container>
                                <Grid item xs={3}>
                                    <img width={150} height={150} src={item.image} alt="" />
                                </Grid>
                                <Grid item xs={6}>
                                    <Grid item xs={12}>
                                        <span>{item.description.substring(0, 150)}...</span>
                                    </Grid>
                                    <br />
                                    <Grid item xs={12}>
                                        <span><span style={{ fontWeight: "bold" }}>$</span>{item.price}</span>
                                    </Grid> <br />
                                    <Grid item xs={12}>
                                        <span><span style={{ fontWeight: "bold" }}>Rating:</span>{item.rating.rate}</span>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Button variant="contained" color="error" onClick={()=>handleDelete(item.id)}>Delete</Button>
                                    </Grid>
                                </Grid>
                                <Grid item xs={3}></Grid>
                            </Grid>
                        </div>
                    )
                })
            }
            <h3>TotalCount: {totalPrice?.length}</h3>
            <h3>TotalPrice: ${totalPrice?.tprice}</h3>
            
            
        </div>
    )
}