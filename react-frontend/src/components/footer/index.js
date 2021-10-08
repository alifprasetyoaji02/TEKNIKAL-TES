import React from "react";
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { Container } from "@mui/material";


const Footer = () => {
    return(
        <AppBar position="static" color="primary" style={{marginTop:20}}>
          <Container maxWidth="md">
            <Toolbar>
              <Typography variant="body1" color="inherit">
                E-Commerce Ala ala© 2021 Alif Prasetyo Aji
              </Typography>
            </Toolbar>
          </Container>
        </AppBar>
    )
}

export default Footer