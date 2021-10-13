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
        axios.get('http://localhost:8001/auth/users/me/',{
            headers:{
                "Authorization": "JWT " + getToken()
            }})
            .then(function (response){
                let data:any= response.data;
                setUserid(data.id);
                setUsername(data.username);
            })
            .catch(function (error:any){
                alert(JSON.stringify(error.response.data, null, 2));
            })
    }, []);
    

    return (
        <div>
            <h1>Home Budget</h1>
            <h2>{username}</h2>
            <LogoutComponent/>
            <CreateBudgetComponent user_id={userid}/>
            <BudgetListComponent user_id={userid}/>
        </div>
    );

}


export default Homepage
