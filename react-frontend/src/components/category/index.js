import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Grid } from '@mui/material';


const Category = (props) => {
    return(
        <Grid item xs={12} md={4}>
            <Card sx={{ display: 'flex' }}>
                <CardMedia
                    component="img"
                    sx={{ width: 171,height:120}}
                    image={props.image}
                    alt="Live from space album cover"
                />
                <CardContent>
                    <Typography gutterBottom variant="h7" component="div" style={{marginTop:10,fontWeight:'bold',color:'gray'}}>
                        {props.name}
                    </Typography>
                    <Typography gutterBottom variant="h9" component="div" style={{paddingTop:10}}>
                    </Typography>
                </CardContent>
            </Card>
        </Grid>
    )
}

export default Category