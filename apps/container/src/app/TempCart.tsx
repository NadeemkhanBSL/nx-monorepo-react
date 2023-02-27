import { Grid } from "@mui/material";
import Button from "@mui/material/Button";
import axios from "axios"
import React, { useEffect, useState } from "react"
import Rating from '@mui/material/Rating';

interface Item {
    id: number;
    title: string;
    description: string;
    image: string;
    price: number;
    rating: { rate: number }
}

export const TempCart = ({ handleBadgeCount }: { handleBadgeCount: any }) => {
    const [cartList, setCartList] = useState<Item[]>([] as any)
    const [noData, setNoData] = useState("")
    const [totalPrice, setTotalPrice] = useState({
        tprice: 0,
        length: 0
    })
    const [duplicateCount, setDuplicateCount] = useState([] as any)
    useEffect(() => {
        getData()
    }, [])
    const getData = async () => {
        const response = await axios.get("http://localhost:4004/getcarts")
        if (response.data == '') {
            setNoData("NO Item In Cart")
        } else {
            // setCartList(response?.data)
            const arr = response?.data

            const uniqueItems = arr.reduce((acc: Item[], current: Item) => {
                const existingItem = acc.find((item) => item.id === current.id);
                if (!existingItem) {
                    return [...acc, current];
                }
                return acc;
            }, []);
            setCartList(uniqueItems)

            const itemCounts = uniqueItems.reduce((acc: { [key: string]: number }, current: Item) => {
                const count = arr.filter((item: any) => item.id === current.id).length;
                return { ...acc, [current.id]: count };
            }, {});
            setDuplicateCount(itemCounts)

            const arrayPrice = response?.data
            const a = arrayPrice?.map((item: any) => item.price)
            const b = a?.reduce((curr: any, next: any) => curr + next)
            const totalPriceCount = Math.round(b)
            const totalCount = response?.data?.length
            setTotalPrice({ tprice: totalPriceCount * 83, length: totalCount })
        }
    }

    const handleDelete = async (id: any) => {
        const response = await axios.delete(`http://localhost:4004/delete/${id}`)
        if (response.status == 200) {
            handleBadgeCount()
            getData()
        }
    }

    const handleEmptyCart = async () => {
        const response = await axios.delete(`http://localhost:4004/deleteall`)
        if (response.status == 204) {
            handleBadgeCount()
            getData()
        }
    }
    const convertDollarToIndian=83

    return (
        <div style={{ position: "relative", top: "50px" }}>
            <h1>Temp Cart</h1>
            <br />
            {
                noData ?
                    <div>

                        <div style={{ border: "0.5px solid black", boxShadow: "0px 0px 5px black", display: "flex", justifyContent: "center" }}>
                            {/* <h4 style={{ position: "relative", left: "400px" }}>No Item In The Cart</h4> */}
                            <img src="https://mir-s3-cdn-cf.behance.net/projects/404/95974e121862329.Y3JvcCw5MjIsNzIxLDAsMTM5.png" alt="" />
                        </div>
                        <a href="" style={{ display: "flex", justifyContent: "center" }}>--Shop Now--</a>
                    </div>
                    :
                    <div>
                        {
                            cartList?.map((item, i) => {
                                return (
                                    <div key={i} style={{ border: "1px sold black", boxShadow: "0px 0px 3px black", marginTop: "10px", padding: "3px" }}>
                                        <Grid container>
                                            <Grid item xs={0.4}>
                                            </Grid>
                                            <Grid item xs={2.6}>
                                                <img width={150} height={150} src={item.image} alt="" />
                                            </Grid>
                                            <Grid item xs={6}>
                                                <Grid item xs={12}>
                                                    <span>{item.description.substring(0, 150)}...</span>
                                                </Grid>
                                                <br />
                                                <Grid item xs={12}>
                                                    <span><span style={{ fontWeight: "bold" }}>₹</span>{Math.round(item.price) * convertDollarToIndian}</span>
                                                </Grid> <br />
                                                <Grid item xs={12}>
                                                    <span><span style={{ fontWeight: "bold" }}>Rating:<Rating name="read-only" value={item.rating.rate} readOnly /></span>{item.rating.rate}</span>
                                                </Grid>
                                                <Grid item xs={12}>
                                                    <Button variant="contained" color="error" onClick={() => handleDelete(item.id)}>Delete</Button>
                                                </Grid>
                                            </Grid>
                                            <Grid item xs={1}></Grid>
                                            <Grid item xs={2}>
                                                <br /><br /> <br /><br />
                                                <span style={{ fontSize: "16px", fontWeight: "bold" }}>Quantity:</span> {duplicateCount[item.id]}
                                            </Grid>
                                        </Grid>
                                    </div>
                                )
                            })
                        }
                        <br />
                        <Grid container>
                            <Grid item xs={5}></Grid>
                            <Grid item xs={1.5}><h3>TotalCount: {totalPrice?.length}</h3></Grid>
                            <Grid item xs={1.5}><h3>TotalPrice: ₹{totalPrice?.tprice}</h3></Grid>
                            <Grid item xs={2}>  <Button variant="contained" onClick={handleEmptyCart}>Empty Cart</Button></Grid>
                            <Grid item xs={2}>
                                <Button variant="contained" color="success" >buy now</Button>
                            </Grid>
                        </Grid>
                    </div>
            }
        </div>
    )
}