import {useHistory} from "react-router-dom";
import CreateBudgetComponent from "../components/CreateBudgetComponent";
import LogoutComponent from "../components/LogoutComponent";
import { useEffect, useState } from 'react';


function Homepage() {

    const history = useHistory();

    return (
        <div>
            <h1>Home Budget</h1>
            <LogoutComponent/>
            <CreateBudgetComponent/>
        </div>
    );

}


export default Homepage
