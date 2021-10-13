import {useHistory} from "react-router-dom";
import axios from 'axios';
import $ from 'jquery';
import React, { useState, useEffect } from 'react';
import {storeToken, getUserID, getToken} from "./utils";

function EntryDetailComponent(props:any) {
    const {entry_id, entry_creator, entry_amount, entry_category} = props;
    const history = useHistory();

    return (<div>
                <p>{entry_creator}: {entry_category} {entry_amount}</p>
                <input type="submit" value="Delete entry" onClick={(e)=>{
                e.preventDefault();
                axios.delete(`http://localhost:8001/entry/${entry_id}/`,{
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
                <br/>
            </div>
    );

}


export default EntryDetailComponent;
