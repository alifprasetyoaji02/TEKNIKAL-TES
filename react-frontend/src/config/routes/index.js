import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Cart from "../../pages/Cart";
import Category from "../../pages/Category";
import Register from "../../pages/CreateAccount";
import CreateCategory from "../../pages/CreateCategory";
import CreateProduct from "../../pages/CreateProduct";
import EditCategory from "../../pages/EditCategory";
import EditProduct from "../../pages/EditProduct";
import HomeAdmin from "../../pages/HomeAdmin";
import Login from "../../pages/login";
import MainApp from "../../pages/MainApp";

const Routes = () => {
    return (
        <BrowserRouter>
            <Switch>
                <Route exact path="/" component={MainApp} />
                <Route exact path="/login" component={Login} />
                <Route exact path="/register" component={Register} />
                <Route exact path="/detailProduct/:id" component={MainApp} />
                <Route exact path="/cart" component={Cart} />
                <Route exact path="/admin" component={HomeAdmin} />
                <Route exact path="/admin/create" component={CreateProduct} />
                <Route exact path="/editProduct/:id" component={EditProduct} />
                <Route exact path="/admin/category" component={Category} />
                <Route exact path="/admin/category/create" component={CreateCategory} />
                <Route exact path="/admin/category/editCategory/:id" component={EditCategory} />

            </Switch>
        </BrowserRouter>
    )
}

export default Routes    
