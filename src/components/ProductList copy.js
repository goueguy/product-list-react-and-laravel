import React,{useEffect,useState,useTable} from 'react';
import {Table, Row, Col, Container} from 'react-bootstrap';
import Header from './Header';
import { BASE_URL } from '../constants';
import {useTable, usePagination} from 'react-table';

function ProductList() {
    const [data, setData] = useState([]);
    const [currentPage,setCurrentPage] = useState(1);
    const [postsPerPage, setPostsPerPage] = useState(10);
    const {
        getTableBodyProps,
        getTableProps,
        Page,
        headerGroups,
        prepareRows,
    } = useTable({columns,data},usePagination)
    useEffect( async() => {
        
        let result = await fetch(`${BASE_URL}/api/products`)
        result = await result.json();
        setData(result.data);
        
    },[]);
   
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
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            
                                            data.map((item,key)=>{
                                                return(
                                                    <tr>
                                                        <td>{key+1}</td>
                                                        <td>{item.name}</td>
                                                        <td>{item.description}</td>
                                                        <td>
                                                            <img src={`${BASE_URL}/uploads/${item.file}`} style={{height:56,width:"40%"}}  />
                                                        </td>
                                                        <td>{item.price} FCFA</td>
                                                    </tr>
                                                )
                                            })
                                        }
                                    </tbody>
                                </Table>
                            </Col>
                        </Row>
                    </Container>
            </>
    )
}

export default ProductList;
