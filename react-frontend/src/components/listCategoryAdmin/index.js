import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Grid } from '@mui/material';
import { useHistory } from 'react-router-dom'
import axios from 'axios';

const ListCategoryAdmin = (props) => {

    const history = useHistory();

    const hapusCategory = (id) => {
        if (window.confirm("Delete the category?")) {

            const formData = new FormData()
            formData.append('id',id)
        
            axios.post('http://192.168.0.121:4000/v1/category/deleteCategory',formData,{"Content-Type": "multipart/form-data" })
            .then(result => {
                console.log(result.data)
                history.push('/admin')
            })
            .catch(err => console.log(err))
          }
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
                        {props.name}
                    </Typography>
                </CardContent>
                <CardActions>
                    <Button size="small" color="success" onClick={() => history.push(`/admin/category/editCategory/${props.id}`)}>Edit</Button>
                    <Button size="small" color="error" onClick={() => hapusCategory(props.id)}>Hapus</Button>
                </CardActions>
            </Card>
        </Grid>
    )
}

export default ListCategoryAdmin