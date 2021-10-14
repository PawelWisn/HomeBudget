import axios from 'axios';
import {getToken} from "./utils";

function EntryDetailComponent(props:any) {
    const {entry_id, entry_creator, entry_amount, entry_category} = props;

    return (<div>
                <p>{entry_creator}: {entry_category} {entry_amount}</p>
                <input type="submit" value="Delete entry" onClick={(e)=>{
                e.preventDefault();
                axios.delete(`http://localhost:8001/entry/${entry_id}/`,{
                    headers:{
                        "Authorization": "JWT " + getToken()
                    }
                })
                .then(function (response){
                    window.location.reload();
                })
                .catch(function (error){
                    alert(JSON.stringify(error.response.data, null, 2));
                })
              }}/>
                <br/>
            </div>
    );

}


export default EntryDetailComponent;
