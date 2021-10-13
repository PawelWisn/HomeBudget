import {useHistory} from "react-router-dom";
import axios from 'axios';
import $ from 'jquery';
import {getUserID, getToken} from "./utils";

function CreateBudgetComponent() {

    const history = useHistory();

    return (
        <div className={"budgetcreate"}>
            <form>
              <input type="text" id="create_budget" name="title" placeholder="New budget name"/><br/>
              <input type="submit" value="Create budget" onClick={(e)=>{
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
                    window.location.reload();
                })
                .catch(function (error){
                    alert(JSON.stringify(error.response.data, null, 2));
                })
              }}/>
            </form>
        </div>
    );

}


export default CreateBudgetComponent;
