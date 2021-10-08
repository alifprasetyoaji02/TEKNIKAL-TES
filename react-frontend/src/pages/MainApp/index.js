import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Footer from "../../components/footer";
import Header from "../../components/header";
import Home from "../Home";
import { useHistory } from 'react-router-dom'
import DetailProduct from "../../components/detailProduct";
import Cart from "../Cart";

const MainApp = () => {
    
    const validate = JSON.parse(localStorage.getItem("idUser"))
    const history = useHistory();
    
    if(!validate){
        history.push('/login')
    }

    return(
        
        <div className="main-app-wrapper">
            <div className="header-wrapper">
                <Header />
            </div>
            <div className="main-wrapper">
                <BrowserRouter>
                    <Switch>
                        <Route exact path="/" component={Home} />
                        <Route exact path="/detailProduct/:id" component={DetailProduct} />
                        <Route exact path="/cart" component={Cart} />
                    </Switch>
                </BrowserRouter>
            </div>
            <div className="footer-wrapper">
                <Footer />
            </div>
        </div>
    )
}

export default MainApp