import {useHistory} from "react-router-dom";
import axios from 'axios';
import $ from 'jquery';
import {deleteToken, deleteUserID} from "./utils";

function CreateBudgetComponent() {

    const history = useHistory();

    return (
        <div>
            <form>
              <input type="submit" value="Logout" onClick={(e)=>{
                e.preventDefault();
                deleteToken();
                deleteUserID();
                history.push('/auth');
              }}/>
            </form>
        </div>
    );

}


export default CreateBudgetComponent;
