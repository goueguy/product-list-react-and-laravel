import { useHistory } from 'react-router-dom';
import React,{useEffect} from 'react';

const Protected = (props)=>{
    let Cmp=props.Cmp;
    const history = useHistory();
    useEffect(()=>{
        if(!localStorage.getItem("user-info"))
        {
            history.push('./register');
        }
    },[]);
    return(
        <div>
            <Cmp/>
        </div>
    )
}

export default Protected;