import {useHistory} from "react-router-dom";
import axios from 'axios';
import $ from 'jquery';
import React, { useState, useEffect } from 'react';
import {storeToken, getUserID, getToken} from "./utils";
import EntryDetailComponent from './EntryDetailComponent';

function buildEntries(entries:any){
    let entries_arr: any = [];
    if(!entries){
        return [];
    }
    if(entries_arr){
        if(entries){
            if (entries.length>0){
                entries.map((obj:any)=>{
                entries_arr.push(<EntryDetailComponent key={obj.id+obj.budget} entry_amount={obj.amount} entry_id={obj.id} entry_creator={obj.creator_name} entry_category={obj.category_name} />)
            })}
            else{
                entries_arr.push(<h6>No Entries</h6>)
            }
        }
    }
    else{
        entries_arr.push(<h6>No Entries</h6>)
    }
    return entries_arr;
}

function BudgetDetailComponent(props:any) {
    const {budget_id, budget_title,budget_owner, budget_total} = props;
    const history = useHistory();
    const [entries, setEntries] = useState();

    useEffect(()=> {
        axios.get(`http://localhost:8001/budget/${budget_id}/`,{
            headers:{
                "Authorization": "JWT " + getToken()
            }
        }).then(function (response){
            let data:any = response.data;
            setEntries(data.entries);
        });
      }, []);

    return (
        <div>
            <br/>
            <h3>{budget_title}#{budget_id}:owner={budget_owner},sum={budget_total}</h3>
            {buildEntries(entries)}
        </div>
    );

}


export default BudgetDetailComponent;
