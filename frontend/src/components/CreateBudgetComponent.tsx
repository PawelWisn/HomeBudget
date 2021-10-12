import {useHistory} from "react-router-dom";
import axios from 'axios';
import $ from 'jquery';
import {storeToken, getUserID, getToken} from "./utils";

function CreateBudgetComponent() {

    const history = useHistory();

    return (
        <div>
            <form>
              <label>New budget name:</label><br/>
              <input type="text" id="create_budget" name="title"/><br/>
              <input type="submit" value="Create" onClick={(e)=>{
                e.preventDefault();
                axios.post('http://localhost:8001/budget/',{
                    "title": $('#create_budget').val(),
                    "owner": getUserID(),
                },{
                    headers:{
                        "Authorization": "JWT " + getToken()
                    }
                })
                .then(function (response){
                    history.push('/home');
                })
                .catch(function (error){
                    alert(error);
                })
              }}/>
            </form>
        </div>
    );

}


export default CreateBudgetComponent;
