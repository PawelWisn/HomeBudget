import {useHistory} from "react-router-dom";
import axios from 'axios';
import $ from 'jquery';
import {storeToken} from "./utils";

function LoginComponent() {

    const history = useHistory();

    return (
        <div>
            <p>Login in to your account:</p>
            <form id='loginForm'>
              <label>Username:</label><br/>
              <input type="text" id="log_username" name="username"/><br/>
              <label>Password:</label><br/>
              <input type="password" id="log_password" name="password"/><br/>
              <input type="submit" value="Login" onClick={(e)=>{
                e.preventDefault();
                axios.post('http://localhost:8001/auth/jwt/create/',{
                    "username": $('#log_username').val(),
                    "password": $('#log_password').val(),
                })
                .then(function (response){
                    return response;
                })
                .then(function (response:any){
                    storeToken(response.data.access);
                    history.push('/home');
                })}}/>
            </form>
        </div>
    );

}


export default LoginComponent;
