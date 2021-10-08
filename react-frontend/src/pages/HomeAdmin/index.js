import { Button, Grid } from "@mui/material";
import React, { useState, useEffect } from "react";
import ListProductAdmin from "../../components/listProductAdmin";
import axios from "axios";
import Header from "../../components/header";
import Footer from "../../components/footer";
import { useHistory } from 'react-router-dom'

const HomeAdmin = () => {

    const [dataProd, setProduct] = useState([])
    const history = useHistory();

    async function getAllProduct(){
        try {
            const resp = await axios.get('http://192.168.0.121:4000/v1/products/allProduct')
            setProduct(resp.data.data)

        } catch(err){
            console.log(err)
        }
    }

    useEffect(() => {
      
        getAllProduct()

    })
    
    return(
        <div>
            <Header />
            <div style={{marginLeft:'10%',marginRight:'10%'}}>
                <div>
                    <Button onClick={() =>history.push('/admin/create')} style={{right:0,marginTop:10}} variant="contained" color="primary">ADD PRODUCT</Button>
                    <p style={{fontSize:30,fontWeight:'bold',color:'gray'}}>List Product</p>
                </div>
                <Grid container spacing={2}>
                    
                    {dataProd.map((rows) =>
                        <ListProductAdmin item={rows} idItem={rows.id} title={rows.title} price={rows.price} image={`http://192.168.0.121:4000/${rows.image}`} id={rows._id} key={rows._id} />
                    )}
                </Grid>

            </div>
            <Footer />
        </div>
    )
}

export default HomeAdmin