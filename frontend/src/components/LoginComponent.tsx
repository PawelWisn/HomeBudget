import {useHistory} from "react-router-dom";
import axios from 'axios';
import $ from 'jquery';
import {storeToken} from "./utils";

function LoginComponent() {

    const history = useHistory();

    return (
        <div className={"authform"}>
            <h5>Login in to your account</h5>
            <form>
                <div className="mb-2 mt-3">
                    <label htmlFor="inputUsername1" className="form-label ">Username</label>
                    <input type="text" className="form-control" id="inputUsername1" aria-describedby="emailHelp"/>
                </div>
                <div className="mb-2">
                    <label htmlFor="inputPassword1" className="form-label">Password</label>
                    <input type="password" className="form-control" id="inputPassword1"/>
                </div>
                <div className="mb-1 mt-3">
                    <button type="submit" className="btn btn-primary" onClick={(e)=>{
                        e.preventDefault();
                        axios.post(`${process.env.REACT_APP_API_PROTOCOL}://${process.env.REACT_APP_API_IP}:${process.env.REACT_APP_API_PORT}/auth/jwt/create/`,{
                            "username": $('#inputUsername1').val(),
                            "password": $('#inputPassword1').val(),
                        })
                        .then(function (response){
                            return response;
                        })
                        .then(function (response:any){
                            storeToken(response.data.access);
                            history.push('/home');
                        })}}>Login
                    </button>
                </div>
            </form>
        </div>
    );

}


export default LoginComponent;
