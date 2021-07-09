import React,{useState,useEffect} from 'react'
import { Container,Row, Col, Button, Alert } from 'react-bootstrap'
import { useHistory } from 'react-router-dom';
import { BASE_URL } from '../constants';
import Header from '../components/Header';

function Register() {

    useEffect(()=>{
        if(localStorage.getItem("user-info"))
        {
            history.push('./add-product');
        }
    },[]);
    const [name,setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errors, setErrors] = useState("");

    const history = useHistory();
    const signUp = async()=>{
        let item = {name,email,password};
        let result = await fetch(`${BASE_URL}/api/register`,{
            method:"POST",
            headers:{
                "Content-Type":"application/json",
                "Accept":"application/json",
            },
            body: JSON.stringify(item)
        })
        result = await result.json();
        if(result.code===400){
                setErrors(result.error);
        }else{
            localStorage.setItem("user-info",JSON.stringify(result));
            history.push('/login');
        }
        //console.warn(errors);
    }
    return (
        <>
        <Header/>
        <Container className="mt-4">
            
            <h1>Inscription</h1>
            <Row>
                <Col md={12} className="form-group">
                    <input type="text" className="form-control" value={name} onChange={(e)=>setName(e.target.value)} placeholder="Nom"/>
                    {
                        (errors["name"]) && (<Alert variant="danger" className="mt-2">{errors["name"]}</Alert>)
                    }
                </Col>
                
                <Col md={12} className="form-group">
                    <input type="email" className="form-control" value={email} onChange={(e)=>setEmail(e.target.value)} placeholder="Adresse Email"/>
                    {
                        (errors["email"]) && (<Alert variant="danger" className="mt-2">{errors["email"]}</Alert>)
                    }
                </Col>
                <Col md={12} className="form-group">
                    <input type="password" className="form-control" value={password} onChange={(e)=>setPassword(e.target.value)} placeholder="Mot de passe"/>
                    {
                        (errors["password"]) && (<Alert variant="danger" className="mt-2">{errors["password"]}</Alert>)
                    }
                </Col>
                <Col>
                    <Button variant="outline-success" onClick={signUp}>VALIDER</Button>{''}
                </Col>
            </Row>
        </Container>
        </>
    )
}

export default Register
