import React from "react";
import {BrowserRouter as Router, Switch, Route, Redirect} from "react-router-dom";
import Homepage from "../views/Homepage";
import Authorization from "../views/Authorization";


function MainRouter() {
    return (
        <Router>
            <Switch>
                <Route exact path="/" component={Authorization}/>
                <Route exact path="/home" component={Homepage}/>
                <Redirect to={"/"}/>
            </Switch>
        </Router>
    )
}


export default MainRouter;
