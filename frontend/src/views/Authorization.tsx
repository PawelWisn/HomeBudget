import {useHistory} from "react-router-dom";
import LoginComponent from "../components/LoginComponent";
import RegisterComponent from "../components/RegisterComponent";

function Homepage() {

    const history = useHistory();

    return (
        <div>
            <h2>Authorization</h2>
            <LoginComponent/>
            <RegisterComponent/>
        </div>
    );

}


export default Homepage
