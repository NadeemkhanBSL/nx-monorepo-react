
  
 
    import { Grid } from "@mui/material";
    import Button from "@mui/material/Button";
    import axios from "axios"
    import React, { useEffect, useState } from "react"
    import CircularProgress from '@mui/material/CircularProgress';
    import Rating from '@mui/material/Rating';
    
    interface Item {
        id: number;
        title: string;
        description: string;
        image: string;
        price: string;
        rating: { rate: number }
    }
    export function NxWelcome() {
    // export const TempCart = ( {handleBadgeCount}:{ handleBadgeCount:any}) => {
        const [cartList, setCartList] = useState<Item[]>([] as any)
        const [spinner, setSpinner] = useState(false)
        const [noData, setNoData] = useState("")
        const [totalPrice, setTotalPrice] = useState({
            tprice: 0,
            length: 0
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
                const arrayPrice = response?.data
                const a = arrayPrice?.map((item: any) => item.price)
                const b = a?.reduce((curr: any, next: any) => curr + next)
                const totalPriceCount = Math.round(b)
                const totalCount = response?.data?.length
                setTotalPrice({ tprice: totalPriceCount, length: totalCount })
            }
    
        }
    
        const handleDelete = async (id: any) => {
            const response = await axios.delete(`http://localhost:4004/delete/${id}`)
            console.log("delete res",response)
            if(response.status==200){
                // handleBadgeCount()            
            }
            getData()
        }
        const handleEmptyCart = async () => {
            const response = await axios.delete(`http://localhost:4004/deleteall`)
            if(response.status==204){
                // handleBadgeCount()            
            }
            getData()
        }
        return (
            <div>
                <h1> Cart</h1>
                <br />
                {
                    noData ?
                    <div>
    
                    <div style={{border:"0.5px solid black",boxShadow:"0px 0px 5px black",display:"flex",justifyContent:"center"}}>
                        {/* <h4 style={{ position: "relative", left: "400px" }}>No Item In The Cart</h4> */}
                        <img src="https://mir-s3-cdn-cf.behance.net/projects/404/95974e121862329.Y3JvcCw5MjIsNzIxLDAsMTM5.png" alt="" /> 
                    </div>
                        <a href="" style={{display:"flex",justifyContent:"center"}}>--Shop Now--</a>
                    </div>
                         :
                        <div>
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
                                                        <span><span style={{ fontWeight: "bold" }}>Rating:<Rating name="read-only" value={item.rating.rate} readOnly /></span>{item.rating.rate}</span>
                                                    </Grid>
                                                    <Grid item xs={12}>
                                                        <Button variant="contained" color="error" onClick={() => handleDelete(item.id)}>Delete</Button>
                                                    </Grid>
                                                </Grid>
                                                <Grid item xs={3}></Grid>
                                            </Grid>
                                        </div>
                                    )
                                })
                            }
                            <Grid container>
                                <Grid item xs={10}></Grid>
                                <Grid item xs={2}>
                                    <Button variant="contained" onClick={handleEmptyCart}>Empty Cart</Button>
                                </Grid>
                            </Grid>
                            <h3>TotalCount: {totalPrice?.length}</h3>
                            <h3>TotalPrice: ${totalPrice?.tprice}</h3>
                        </div>
                }
            </div>
        )
    }

export default NxWelcome;
