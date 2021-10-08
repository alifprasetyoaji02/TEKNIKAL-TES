import { Grid } from "@mui/material";
import React, { useEffect, useState } from "react";
import Category from "../../components/category";
import ListProduct from "../../components/listProduct";
import axios from "axios";




const Home = () => {

    const [dataCat, setCategory] = useState([])
    const [dataProd, setProduct] = useState([])

    async function getAllProduct(){

        try {
            const resp = await axios.get('http://192.168.0.121:4000/v1/products/allProduct')
            setProduct(resp.data.data)
        } catch (err) {
            console.log(err)
        }
    }

    async function getAllCategory(){

        try {
            const resp = await axios.get('http://192.168.0.121:4000/v1/category/getCategory')
            setCategory(resp.data.data)
        } catch (err) {
            console.log(err)
        }
    }

    useEffect(() => {
        getAllProduct()
        getAllCategory()
    
    })
    
    return(
        <div>
            <div style={{marginLeft:'10%',marginRight:'10%'}}>
                <div>
                    <p style={{fontSize:30,fontWeight:'bold',color:'gray'}}>List Category</p>
                </div>
                <Grid container spacing={2}>

                    {dataCat.map((blog) =>
                        <Category name={blog.name} image={`http://192.168.0.121:4000/${blog.image}`} key={blog._id} />
                    )}
                    
                </Grid>
                <div>
                    <p style={{fontSize:30,fontWeight:'bold',color:'gray'}}>List Product</p>
                </div>
                <Grid container spacing={2}>
                    
                    {dataProd.map((rows) =>
                        <ListProduct item={rows} idItem={rows.id} title={rows.title} price={rows.price} image={`http://192.168.0.121:4000/${rows.image}`} id={rows._id} key={rows._id} />
                    )}
                </Grid>

            </div>
        </div>
    )
}

export default Home