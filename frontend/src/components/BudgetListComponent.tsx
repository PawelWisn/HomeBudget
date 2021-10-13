import {useHistory} from "react-router-dom";
import axios from 'axios';
import { useState, useEffect } from 'react';
import {getToken} from "./utils";
import BudgetDetailComponent from "./BudgetDetailComponent";

function buildBudgets(data:any){
    let budgets: any = [];
    if(data){
        if (data.length>0){
        data.map((obj:any)=>{
            budgets.push(<BudgetDetailComponent key={obj.id+obj.title} budget_title={obj.title} budget_id={obj.id} budget_owner={obj.owner} budget_total={obj.total} />)
        })}}
    return budgets;
}

function BudgetListComponent(props:any) {
    const {budget_id, budget_title} = props;
    const history = useHistory();
    const [data, setData] = useState()

    useEffect(()=> {
        axios.get('http://localhost:8001/budget/',{
            headers:{
                "Authorization": "JWT " + getToken()
            }
        }).then(function (response){
            let data:any = response.data;
            setData(data.results);
        });
     
        
      }, []);

    return (
        <div>
            {buildBudgets(data)}            
        </div>
    );

}


export default BudgetListComponent;
