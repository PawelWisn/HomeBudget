import {useHistory} from "react-router-dom";


function Homepage() {

    const history = useHistory();

    function tileOnclick(url: string) {
        history.push(url);
    }

    return (
        <div>
            <h1>Home Budget</h1>
        </div>
    );

}


export default Homepage
