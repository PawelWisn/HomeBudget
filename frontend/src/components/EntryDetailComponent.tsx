import axios from 'axios';
import {getToken} from "./utils";

function EntryDetailComponent(props:any) {
    const {entry_id, entry_creator, entry_amount, entry_category} = props;

    return (<div className={'entry card mb-3'}>
                <div className={"row g-0"}>
                    <div className={"col-md-2 d-flex align-items-center"}>
                        <div className={'card-body'}>
                            <h6 className={'card-text text-capitalize fw-bolder'}>{entry_creator}</h6>
                        </div>
                    </div>
                    <div className={"col-md-2 d-flex align-items-center"}>
                        <div className={'card-body'}>
                            <p className={'card-text'}>{entry_category}</p>
                        </div>
                    </div>
                    <div className={"col-md-4 d-flex align-items-center"}>
                        <div className={'card-body'}>
                            <p className={'card-text'}>{entry_amount}</p>
                        </div>
                    </div>
                    <div className={'col-md-4 d-flex align-items-center justify-content-center'}>
                            <input className={'btn btn-danger'} type="submit" value="Delete entry" onClick={(e)=>{
                            e.preventDefault();
                            axios.delete(`${process.env.REACT_APP_API_PROTOCOL}://${process.env.REACT_APP_API_IP}:${process.env.REACT_APP_API_PORT}/entry/${entry_id}/`,{
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
                    </div>
                </div>
            </div>
    );

}


export default EntryDetailComponent;
