import {useHistory} from "react-router-dom";
import axios from 'axios';
import $ from 'jquery';
import React, { useState, useEffect } from 'react';
import {storeToken, getUserID, getToken} from "./utils";

function EntryDetailComponent(props:any) {
    const {entry_id, entry_creator, entry_amount, entry_category} = props;
    const history = useHistory();

    return (
            <h6>ENTRY;{entry_id}#{entry_creator}:amount={entry_amount},category={entry_category}</h6>
    );

}


export default EntryDetailComponent;
