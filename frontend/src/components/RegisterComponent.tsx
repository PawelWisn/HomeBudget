import {useHistory} from "react-router-dom";
import axios from 'axios';
import $ from 'jquery';
import {storeToken} from "./utils";

function RegisterComponent() {

    const history = useHistory();

    return (
        <div>
            <p>Register new account:</p>
            <form>
              <label>Username:</label><br/>
              <input type="text" id="reg_username" name="username"/><br/>
              <label>Password:</label><br/>
              <input type="password" id="reg_password" name="password"/><br/>
              <input type="submit" value="Register" onClick={(e)=>{
                e.preventDefault();
                axios.post('http://localhost:8001/auth/users/',{
                    "username": $('#reg_username').val(),
                    "password": $('#reg_password').val(),
                })
                .then(function (response){
                    history.push('/auth');
                })
                .catch(function (error){
                    alert(error);
                })
              }}/>
            </form>
        </div>
    );

}


export default RegisterComponent;
