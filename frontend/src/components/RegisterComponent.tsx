import axios from 'axios';
import $ from 'jquery';

function RegisterComponent() {

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


export default RegisterComponent;
