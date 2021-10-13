import {useHistory} from "react-router-dom";
import axios from 'axios';
import $ from 'jquery';
import React, { useState, useEffect } from 'react';
import {storeToken, getUserID, getToken} from "./utils";
import EntryDetailComponent from './EntryDetailComponent';
import CreateEntryComponent from './CreateEntryComponent';

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
    const [categories, setCategories] = useState();

    useEffect(()=> {
        axios.get(`http://localhost:8001/budget/${budget_id}/`,{
            headers:{
                "Authorization": "JWT " + getToken()
            }
        }).then(function (response){
            let data:any = response.data;
            setEntries(data.entries);
        });

        axios.get(`http://localhost:8001/category/`)
        .then(function (response){
            var data:any = response.data;
            console.log("first",data);
            setCategories(data.results);
            console.log("second",data.results);
        });

    }, []);


    return (
        <div className={"budget"}>
            <h4>Name: {budget_title}</h4>

            <input type="submit" value="Delete budget" onClick={(e)=>{
                e.preventDefault();
                axios.delete(`http://localhost:8001/budget/${budget_id}/`,{
                    headers:{
                        "Authorization": "JWT " + getToken()
                    }
                })
                .then(function (response){
                    window.location.reload();
                })
                .catch(function (error){
                    alert(error);
                })
            }}/>
            
            <p>Balance: {budget_total}</p>

            <div>
                <input type="text" id="invited" name="invited" placeholder="username"/><br/>
                <input type="submit" value="Invite user" onClick={(e)=>{
                    e.preventDefault();
                    axios.patch(`http://localhost:8001/budget/${budget_id}/`,{
                        "username": $('#invited').val(),
                    },{
                        headers:{
                            "Authorization": "JWT " + getToken()
                        }
                    })
                    .then(function (response){
                        window.location.reload();
                    })
                    .catch(function (error){
                        alert(error);
                    })
                }}/>
              </div>
              <br/>

              <CreateEntryComponent budget_id={budget_id} categories={categories}/>
              <div className={"entries"}>
            {buildEntries(entries)}
            </div>
        </div>
    );

}


export default BudgetDetailComponent;
