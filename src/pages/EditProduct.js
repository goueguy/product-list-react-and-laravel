import Header from '../components/Header';
import React,{useState,useRef,useEffect} from 'react'
import { Container,Row, Col, Button} from 'react-bootstrap'
import { BASE_URL , UPLOADS_DIRECTORY} from '../constants';
import { useParams, useHistory} from 'react-router-dom';
import swal from 'sweetalert';


const EditProduct = (props)=>{
    const history = useHistory();
    const [data, setData] = useState([]);
    const [name, setName] = useState("");
    const [image, setImage] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState("");
    const [error,setError] = useState(false);
    const fileInputRef  = useRef();
    let {id} = useParams();

    useEffect( async()=>{
        let result = await fetch(`${BASE_URL}/api/products/${id}`,{
            method:"GET"
        });
        result = await result.json();
        setData(result.data);
        setName(result.data.name);
        setDescription(result.data.description);
        setImage(result.data.image);
        setPrice(result.data.price);
    },[]);

    const updateProduct = async (id)=>{
        /*const productData = {

            name: name,
            image: image,
            description: description,
            price: price
        }*/
        const formData = new FormData();

        formData.append("name",name);
        formData.append("image",image);
        formData.append("description",description);
        formData.append("price",price);
        
        let result = await fetch("http://127.0.0.1:8000/api/products/update/"+id+"?_method=PUT",{
            method: "POST",
            body: formData
        });
        result = await result.json();
        //console.log(result);
        if(result.code===400){
            setError(result.code);
        }else{
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
            
            <h1>Edit produit</h1>
            <Row>
                <Col md={12} className="form-group">
                    <input type="text" name="name" className="form-control" onChange={(e)=>setName(e.target.value)} defaultValue={data.name} placeholder="Nom"/>
                    
                </Col>
                
                <Col md={12} className="form-group">
                    <textarea type="text" name="description" className="form-control" rows={6} defaultValue={data.description} onChange={(e)=>setDescription(e.target.value)} placeholder="Description"></textarea>
                    
                </Col>
               
                <Col md={12} className="form-group">
                    <input type="number" className="form-control" defaultValue={data.price} onChange={(e)=>setPrice(e.target.value)} placeholder="Prix"/>
                    
                </Col>
                 <Col md={12} className="form-group">
                      <input type="file"  className="form-control"  defaultValue={data.file} onChange={(e)=>setImage(e.target.files[0])} ref={fileInputRef}/>
                    
                </Col>
                 <Col md={12} className="form-group">
                    <img alt={data.name} src={`${UPLOADS_DIRECTORY}/${data.file}`} style={{height:120,width:"20%"}}  />
                    
                </Col>
                <Col>
                    <Button variant="outline-success" onClick={()=>updateProduct(data.id)}>UPDATE</Button>
                </Col>
            </Row>
        </Container>
        </>
    )
}

export default EditProduct;