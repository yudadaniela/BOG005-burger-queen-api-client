import React from "react";
import { BrowserRouter, Switch, Route, Link } from 'react-router-dom'
import App from "../App";
import Login from "../views/login/login";
const Router = () => {
    return (
        <BrowserRouter>
            <h1> NAVEGACION</h1>
            <Switch>
                <Route exact path="/Login" component ={Login}/>
               
            </Switch>

        </BrowserRouter>
    )
}

export default Router;