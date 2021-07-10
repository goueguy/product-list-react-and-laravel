import React,{useEffect,useState} from 'react';
import {Table, Row, Col, Container} from 'react-bootstrap';
import Header from './Header';
import { BASE_URL,UPLOADS_DIRECTORY } from '../constants';
import Pagination from 'react-js-pagination';
import {Link } from 'react-router-dom';
import swal from 'sweetalert';
function ProductList() {
    const [data, setData] = useState([]);
    const [perPage,setPerPage] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [total, setTotal] = useState(0);
    useEffect(() => {
        getProductData();
    },[]);
    
    const handleChange = async(pageNumber)=>{
        let result = await fetch(`${BASE_URL}/api/products?page=${pageNumber}`)
        result = await result.json();
        setData(result.data.data);
        setPerPage(result.data.per_page);
        setCurrentPage(result.data.current_page);
        setTotal(result.data.total);
    }
    const deleteProduct = async(id)=>{
        
            if(window.confirm('Voulez-vous supprimer ce produit')){
                let action = await fetch(`${BASE_URL}/api/products/delete/${id}`,{
                method:"DELETE",
            });
            action = await action.json();

            if(action.code===400){
                 swal("Error!", action.message, "warning");
            }else{
                swal("Success!", action.message, "success");
                getProductData();
            }
        }
        
    }
    const editProduct = async(id)=>{
        
        let result = await fetch(`${BASE_URL}/api/products/${id}`,{
            method:"GET",
        });
        result = await result.json();
    }
    const getProductData = async()=>{
         let result = await fetch(`${BASE_URL}/api/products`)
        result = await result.json();
        setData(result.data.data);
        setPerPage(result.data.per_page);
        setCurrentPage(result.data.current_page);
        setTotal(result.data.total);
    }
    return (
            <>
                <Header/>

                    <Container>
                        <Row>
                            <Col md={12}>
                                <h1>Product List</h1>
                                <Table striped bordered hover>
                                    <thead>
                                        <tr>
                                            <th>#</th>
                                            <th>Name</th>
                                            <th>Description</th>
                                            <th>Image</th>
                                            <th>Price</th>
                                            <th>Opération</th>
                                        </tr>
                                    </thead>
                                    <tbody >
                                        {
                                            
                                            data.map((product,key)=>{
                                                return(
                                                    <tr key={key}>
                                                        <td>{key+1}</td>
                                                        <td>{product.name}</td>
                                                        <td>{product.description}</td>
                                                        <td>
                                                            <img alt={product.name} src={`${UPLOADS_DIRECTORY}/${product.file}`} style={{height:56,width:"40%"}}  />
                                                        </td>
                                                        <td>{product.price} FCFA</td>
                                                        <td>
                                                            <span onClick={()=>deleteProduct(product.id)} className="btn btn-danger">Delete</span>
                                                            <Link to={"edit/"+product.id}><span className="btn btn-success">Update</span></Link>
                                                        </td>
                                                    </tr>
                                                )
                                            })
                                        }
                                    </tbody>
                                </Table>
                            </Col>
                        </Row>
                         <Pagination
                      activePage={currentPage}
                      itemsCountPerPage={perPage}
                      totalItemsCount={total}
                      pageRangeDisplayed={5}
                      onChange={handleChange}
                      itemClass="page-item"
                      linkClass="page-link"
                    />
                    </Container>

            </>
    )
}

export default ProductList;
