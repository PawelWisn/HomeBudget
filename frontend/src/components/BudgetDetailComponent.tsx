import axios from 'axios';
import $ from 'jquery';
import {useState, useEffect } from 'react';
import {getToken} from "./utils";
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
                entries.forEach((obj:any)=>{
                entries_arr.push(<EntryDetailComponent key={obj.id+obj.budget} entry_amount={obj.amount} entry_id={obj.id} entry_creator={obj.creator_name} entry_category={obj.category_name} />)
            })}
            else{
                entries_arr.push(<p>No Entries</p>)
            }
        }
    }
    else{
        entries_arr.push(<p>No Entries</p>)
    }
    return entries_arr;
}

function BudgetDetailComponent(props:any) {
    const {budget_id, budget_title, budget_total, user_id, entries} = props;
    const [categories, setCategories] = useState();

    useEffect(()=> {
        axios.get(`${process.env.REACT_APP_API_PROTOCOL}://${process.env.REACT_APP_API_IP}:${process.env.REACT_APP_API_PORT}/category/`)
        .then(function (response){
            return response;
        })
        .then(function (response:any){
            setCategories(response.data.results);
        });

    }, [budget_id]);


    return (
        <div className={"budget"}>
            <h2>{budget_title}</h2>

            <h4>Balance: {budget_total}</h4>

            <input type="submit" value="Delete budget" onClick={(e)=>{
                e.preventDefault();
                axios.delete(`${process.env.REACT_APP_API_PROTOCOL}://${process.env.REACT_APP_API_IP}:${process.env.REACT_APP_API_PORT}/budget/${budget_id}/`,{
                    headers:{
                        "Authorization": "JWT " + getToken()
                    }
                })
                .then(function (response){
                    window.location.reload();
                })
                .catch(function (error){
                    alert(JSON.stringify(error.response.data, null, 2));
                })
            }}/>

            <div className={"inviteuser"}>
                <input type="text" id={`invited${budget_id}`} name="invited" placeholder="username"/><br/>
                <input type="submit" value="Invite user" onClick={(e)=>{
                    e.preventDefault();
                    axios.patch(`${process.env.REACT_APP_API_PROTOCOL}://${process.env.REACT_APP_API_IP}:${process.env.REACT_APP_API_PORT}/invitation/${budget_id}/`,{
                        "new_user": $(`#invited${budget_id}`).val(),
                    },{
                        headers:{
                            "Authorization": "JWT " + getToken()
                        }
                    })
                    .then(function (response){
                        window.location.reload();
                    })
                    .catch(function (error){
                        alert(JSON.stringify(error.response.data, null, 2));
                    })
                }}/>
              </div>
              <br/>

              <CreateEntryComponent budget_id={budget_id} categories={categories} user_id={user_id}/>
              <div className={"entries"}>
            {buildEntries(entries)}
            </div>
        </div>
    );

}


export default BudgetDetailComponent;
