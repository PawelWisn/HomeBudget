import axios from 'axios';
import $ from 'jquery';

function RegisterComponent() {

    return (
        <div className={"authform"}>
            <h5>Register new account</h5>
            <form>
                <div className="mb-2 mt-3">
                    <label htmlFor="inputUsername2" className="form-label align-self-start">Username</label>
                    <input type="text" className="form-control" id="inputUsername2" aria-describedby="emailHelp"/>
                </div>
                <div className="mb-2">
                    <label htmlFor="inputPassword2" className="form-label">Password</label>
                    <input type="password" className="form-control" id="inputPassword2"/>
                </div>
                <div className="mb-1 mt-3">
                    <button type="submit" className="btn btn-primary" onClick={(e)=>{
                        e.preventDefault();
                        axios.post(`${process.env.REACT_APP_API_PROTOCOL}://${process.env.REACT_APP_API_IP}:${process.env.REACT_APP_API_PORT}/auth/users/`,{
                            "username": $('#inputUsername2').val(),
                            "password": $('#inputPassword2').val(),
                        })
                        .then(function (response){
                            window.location.reload();
                        })
                        .catch(function (error){
                            alert(JSON.stringify(error.response.data, null, 2));
                        })
                        }}>Register
                    </button>
                </div>
            </form>
        </div>
    );

}


export default RegisterComponent;
