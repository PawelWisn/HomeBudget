import axios from 'axios';
import $ from 'jquery';
import {getToken} from "./utils";

function CreateBudgetComponent(props:any) {
    const {user_id} = props;

    return (
        <div className={"budgetcreate"}>
            <form>
              <input type="text" id="create_budget" name="title" placeholder="New budget title"/><br/>
              <input type="submit" value="Create budget" onClick={(e)=>{
                e.preventDefault();
                axios.post('http://localhost:8001/budget/',{
                    "title": $('#create_budget').val(),
                    "owner": user_id,
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
