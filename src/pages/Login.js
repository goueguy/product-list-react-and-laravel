import Header from '../components/Header';
import React,{useState,useEffect} from 'react'
import { Container,Row, Col, Button, Alert } from 'react-bootstrap'
import { useHistory } from 'react-router-dom';
import { BASE_URL } from '../constants';
const Login = ()=>{
    const history = useHistory();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setErrors] = useState([]);
    const [status, setStatus] = useState(false);
    useEffect(()=>{
        if(localStorage.getItem("user-info"))
        {
            history.push('./add-product');
        }
        
    },[]);
    const login = async ()=>{
        //console.warn("data",email,password);
        let item = {email,password};
        let result = await fetch(`${BASE_URL}/api/login`,{
            method:"POST",
            headers:{
                "access-control-allow-origin" : "*",
                "Content-Type":"application/json",
                "Accept":"application/json",
            },
            body: JSON.stringify(item)
        });
        result = await result.json();
        if(result.code===400){
            setErrors(result.message);
            setStatus(true);
        }else{
            //console.log(result);
            localStorage.setItem("user-info",JSON.stringify(result));
            history.push('./add-product');
        }
    }
    return(
        <>
            <Header/>
            <Container className="col-md-6 offset-md-3 mt-4">
            <h1 className="text-center">Connexion</h1>
            <Row>
                {
                    (status) && 
                    <Col>
                        {
                            (!error["email"] && !error['password']) && <Alert variant="danger">{error}</Alert>
                        }
                    </Col>
                    
                }
                <Col md={12} className="form-group">
                    <input type="email" className="form-control" value={email} onChange={(e)=>setEmail(e.target.value)} placeholder="Adresse Email" />
                    {
                        (error["email"]) && (<Alert variant="danger" className="mt-2">{error["email"]}</Alert>)
                    }
                </Col>
                <Col md={12} className="form-group">
                    <input type="password" className="form-control rounded" value={password} onChange={(e)=>setPassword(e.target.value)} placeholder="Mot de passe"/>
                    {
                        (error["password"]) && (<Alert variant="danger" className="mt-2">{error["password"]}</Alert>)
                    }
                </Col>
                
                {/* {(error["error_password"]) && (error["error_password"])} */}
                <Col className="text-center">
                    <Button variant="outline-success" onClick={login}>SE CONNECTER</Button>
                </Col>
            </Row>
        </Container>
        </>
    )
}

export default Login;