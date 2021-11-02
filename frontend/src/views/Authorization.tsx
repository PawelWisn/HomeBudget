import LoginComponent from "../components/LoginComponent";
import RegisterComponent from "../components/RegisterComponent";

function Authorization() {

    return (
        <div className={"authform shadow-sm p-3 mb-5 bg-body rounded"}>
            <h2>Home Budget</h2>
            <LoginComponent/>
            <RegisterComponent/>
        </div>
    );

}


export default Authorization
