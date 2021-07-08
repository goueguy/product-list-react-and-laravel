import Header from '../components/Header';
import { useHistory } from 'react-router-dom';
import React,{useEffect} from 'react'
const Login = ()=>{
    const history = useHistory();
    useEffect(()=>{
        if(localStorage.getItem("user-info"))
        {
            history.push('./add-product');
        }
    },[]);
    return(
        <>
            <Header/>
            <div>
                <h1>LOGIN PAGE</h1>
            </div>
        </>
    )
}

export default Login;