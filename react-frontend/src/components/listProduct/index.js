import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Grid } from '@mui/material';
import { useHistory } from 'react-router-dom'
import { useCart } from 'react-use-cart';
import axios from 'axios';

const ListProduct = (props) => {

    const history = useHistory();
    const { addItem, items } = useCart()
    const validate = JSON.parse(localStorage.getItem("idUser"))

    const addItemCart = () => {

        addItem(props.item)
        const formCart = new FormData()
        formCart.append('products',JSON.stringify(items));
        formCart.append('userId',validate.id);
        formCart.append('date',"2021-06-02");

        axios.post('http://192.168.0.121:4000/v1/cart/addCart', formCart,{"Content-Type": "multipart/form-data" })    
        .then(result => {
        })
        .catch(err => {
            console.log(err)
        })
    }   

    const detailProduct = () => {
        history.push(`/detailProduct/${props.id}`)
    }

    return(
        <Grid item xs={12} md={3} style={{marginTop:10}}>
            <Card sx={{ maxWidth: 345 }}>
                <CardMedia
                component="img"
                alt=""
                height="170"
                image={props.image}
                />
                <CardContent>
                    <Typography gutterBottom variant="h9" component="div" style={{textAlign:'justify'}}>
                        {props.title.substring(0,20)}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        Harga : {props.price}
                    </Typography>
                </CardContent>
                <CardActions>
                    <Button size="small" onClick={detailProduct}>Detail</Button>
                    <Button size="small" onClick={addItemCart}>Add Cart</Button>
                </CardActions>
            </Card>
        </Grid>
    )
}

export default ListProduct