import CreateBudgetComponent from "../components/CreateBudgetComponent";
import LogoutComponent from "../components/LogoutComponent";
import { useEffect, useState } from 'react';
import BudgetListComponent from "../components/BudgetListComponent";
import axios from 'axios';
import {getToken} from "../components/utils";

function Homepage() {
    const [userid, setUserid] = useState();
    const [username, setUsername] = useState();

    useEffect(()=> {
        axios.get(`${process.env.REACT_APP_API_PROTOCOL}://${process.env.REACT_APP_API_IP}:${process.env.REACT_APP_API_PORT}/auth/users/me/`,{
            headers:{
                "Authorization": "JWT " + getToken()
            }})
            .then(function (response){
                return response;
            })
            .then(function (response:any){
                setUserid(response.data.id);
                setUsername(response.data.username);
            })
            .catch(function (error:any){
                alert(JSON.stringify(error.response.data, null, 2));
            })
    }, []);
    

    return (
        <div className={'homepage'}>
            <h1 className={"hometitle"}>Home Budget</h1>
            <h2 className={"homeuser text-capitalize"}>{username}</h2>
            <LogoutComponent/>
            <CreateBudgetComponent user_id={userid}/>
            <BudgetListComponent user_id={userid}/>
        </div>
    );

}


export default Homepage
