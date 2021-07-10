import Header from '../components/Header';
import React,{useState,useRef} from 'react'
import { Container,Row, Col, Button,Alert} from 'react-bootstrap'
import { useHistory} from 'react-router-dom';
import { BASE_URL } from '../constants';
import swal from 'sweetalert';

const AddProduct = ()=>{
    const history = useHistory();
    const [name, setName] = useState("");
    const [image, setImage] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState("");
    const [error,setError] = useState(false);
    const fileInputRef = useRef();
    const saveProduct = async ()=>{
        //console.warn('data',name,image);
        //console.log(image);
        const formData = new FormData(); 
        formData.append("name",name);
        formData.append("image",image);
        formData.append("description",description);
        formData.append("price",price);
        let result = await fetch(`${BASE_URL}/api/product/store`,{
            method: "POST",
            body: formData,
        })

        result = await result.json();
        if(result.error){
            setError(result.error);
        }else{
             fileInputRef.current.value="";
            setName("");
            setPrice("");
            setError("");
            setDescription("");
            swal("Success!", result.message, "success");
            swal({
                title:"Bravo!", 
                text:result.message, 
                type:"success",
                timer:2000
                }).then(()=>{
                   history.push('/list-product')
                });
           
        }
        
    }
    return(
        <>
            <Header/>
            <Container className="mt-4">
            
            <h1>Ajouter un produit</h1>
            <Row>
                <Col md={12} className="form-group">
                    <input type="text" name="name" className="form-control" value={name} onChange={(e)=>setName(e.target.value)} placeholder="Nom"/>
                    {
                        (error["name"]) && (<Alert variant="danger" className="mt-2">{error["name"]}</Alert>)
                    }
                </Col>
                
                <Col md={12} className="form-group">
                    <textarea type="text" name="description" rows={6} className="form-control" value={description} onChange={(e)=>setDescription(e.target.value)} placeholder="Description"></textarea>
                    {
                        (error["description"]) && (<Alert variant="danger" className="mt-2">{error["description"]}</Alert>)
                    }
                </Col>
                <Col md={12} className="form-group">
                    <input type="file" name="image" className="form-control"  onChange={(e)=>setImage(e.target.files[0])} ref={fileInputRef}/>
                    {
                        (error["image"]) && (<Alert variant="danger" className="mt-2">{error["image"]}</Alert>)
                    }
                </Col>
                <Col md={12} className="form-group">
                    <input type="number" className="form-control" value={price} onChange={(e)=>setPrice(e.target.value)} placeholder="Prix"/>
                    {
                        (error["price"]) && (<Alert variant="danger" className="mt-2">{error["price"]}</Alert>)
                    }
                </Col>
                <Col>
                    <Button variant="outline-success" onClick={saveProduct}>AJOUTER</Button>{''}
                </Col>
            </Row>
        </Container>
        </>
    )
}

export default AddProduct;