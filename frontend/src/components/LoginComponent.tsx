import {useHistory} from "react-router-dom";
import axios from 'axios';
import $ from 'jquery';
import {storeToken, getToken, storeUserID} from "./utils";

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
                    let data:any= response.data;
                    storeToken(data.access);
                    history.push('/home');
                })
                .then(()=>{
                    axios.get('http://localhost:8001/auth/users/me/',{
                        headers:{
                            "Authorization": "JWT " + getToken()
                        }
                    }).then(function (response){
                        let data:any= response.data;
                    storeUserID(data.id);
                    })
                })
                .catch(function (error){
                    alert(error);
                })
              }}/>
            </form>
        </div>
    );

}


export default LoginComponent;
