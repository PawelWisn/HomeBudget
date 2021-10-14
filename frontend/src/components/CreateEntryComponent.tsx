import axios from 'axios';
import $ from 'jquery';
import {getToken} from "./utils";

function buildCategoryOptions(categories:any){
    let cat_options: any = [];
    if(!categories){
        return [];
    }
    if(categories){
        if (categories.length>0){
            categories.map((obj:any)=>{
            cat_options.push(<option key={obj.id} value={obj.id}>{obj.name}</option>)
        })}
    }
    return cat_options;
}



function CreateEntryComponent(props:any) {
    const {budget_id, categories, user_id} = props

    return (
        <div className={"createentry"}>
            <form>
              <label>Amount:</label><br/>
              <input type="text" id={`post_amount${budget_id}`} name="amount" placeholder="50.00"/><br/>
              <label>Category:</label><br/>
              <select id={`post_category${budget_id}`} name="category">
              {buildCategoryOptions(categories)}
              </select>
              <br/>
              <input type="submit" value="Create Entry" onClick={(e)=>{
                e.preventDefault();
                axios.post('http://localhost:8001/entry/',{
                    "amount": $(`#post_amount${budget_id}`).val(),
                    "category": $(`#post_category${budget_id}`).val(),
                    "creator": user_id,
                    "budget": budget_id
                },{
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
            </form>
        </div>
    );

}


export default CreateEntryComponent;
