import {useHistory} from "react-router-dom";
import CreateBudgetComponent from "../components/CreateBudgetComponent";
import LogoutComponent from "../components/LogoutComponent";
import { useEffect, useState } from 'react';
import BudgetListComponent from "../components/BudgetListComponent";


function Homepage() {

    const history = useHistory();

    return (
        <div>
            <h1>Home Budget</h1>
            <LogoutComponent/>
            <CreateBudgetComponent/>
            <BudgetListComponent/>
        </div>
    );

}


export default Homepage
