import { Button, Grid } from "@mui/material";
import React, { useState, useEffect } from "react";
import axios from "axios";
import Header from "../../components/header";
import Footer from "../../components/footer";
import { useHistory } from 'react-router-dom'
import ListCategoryAdmin from "../../components/listCategoryAdmin";

const Category = () => {

    const [dataCat, setCategory] = useState([])
    const history = useHistory();

    async function getAllCategory(){
        try{
            const resp = await axios.get('http://192.168.0.121:4000/v1/category/getCategory')
            setCategory(resp.data.data)
        } catch (err){
            console.log(err)
        }
    }

    useEffect(() => {
      
        getAllCategory()

    },[])
    
    return(
        <div>
            <Header />
            <div style={{marginLeft:'10%',marginRight:'10%',paddingBottom:'20%'}}>
                <div>
                    <Button onClick={() =>history.push('/admin/category/create')} style={{right:0,marginTop:10}} variant="contained" color="primary">ADD CATEGORY</Button>
                    <p style={{fontSize:30,fontWeight:'bold',color:'gray'}}>List Category</p>
                </div>
                <Grid container spacing={2}>
                    
                    {dataCat.map((rows) =>
                        <ListCategoryAdmin idItem={rows.id} name={rows.name} image={`http://192.168.0.121:4000/${rows.image}`} id={rows._id} key={rows._id} />
                    )}
                </Grid>
            </div>
            <Footer />
        </div>
    )
}

export default Category