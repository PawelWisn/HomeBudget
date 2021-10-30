import axios from 'axios';
import { useState, useEffect } from 'react';
import {getToken} from "./utils";
import BudgetDetailComponent from "./BudgetDetailComponent";

function buildBudgets(data:any, user_id:any){
    let budgets: any = [];
    if(data){
        if (data.length>0){
        data.forEach((obj:any)=>{
            budgets.push(<BudgetDetailComponent user_id={user_id} key={obj.id+obj.title} budget_title={obj.title} budget_id={obj.id} budget_owner={obj.owner} budget_total={obj.total} entries={obj.entries} />)
        })}}
    return budgets;
}

function BudgetListComponent(props:any) {
    const {user_id} = props;
    const [data, setData] = useState()

    useEffect(()=> {
        axios.get('http://localhost:8001/budget/',{
            headers:{
                "Authorization": "JWT " + getToken()
            }
        }).then(function (response){
            return response;
        })
        .then(function (response:any){
            setData(response.data.results);
        });

        
        }, []);
//TODO
    return (
        <div>
            {buildBudgets(data, user_id)}
        </div>
    );

}


export default BudgetListComponent;
