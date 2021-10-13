import {useHistory} from "react-router-dom";
import {deleteToken} from "./utils";

function CreateBudgetComponent() {

    const history = useHistory();

    return (
        <div>
            <form>
              <input type="submit" value="Logout" onClick={(e)=>{
                e.preventDefault();
                deleteToken();
                history.push('/auth');
              }}/>
            </form>
            <br/>
        </div>
    );

}


export default CreateBudgetComponent;
