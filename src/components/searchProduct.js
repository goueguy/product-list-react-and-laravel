import Header from '../components/Header';
import React,{useState} from 'react'
import { Table, Container,Row} from 'react-bootstrap'
import { BASE_URL,UPLOADS_DIRECTORY } from '../constants';

const SearchProduct = ()=>{
	const [data, setData] = useState([]);
    const [error, setError] = useState(false);
   	const findProducts = async(key)=>{
   		let search = await fetch(`${BASE_URL}/api/search/${key}`);
   		search = await search.json();
        setData(search.data);
        console.log(search)
        if(search.code===400){
            setError(true);
        }else{
            setError(false);
        }
   		
   	}
    return(
        <>
        	<Header/>
            <Container className="mt-4">
            <h1 className="text-center">Recherche un produit</h1>
            <Row>
                <input className="mb-2 form-control" type="text" placeholder="Rechercher le produit" onChange={(e)=>findProducts(e.target.value)}/>
            </Row>
               
            <Row>

            	 {

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
                                               
                                            </td>
                                        </tr>
                                    )
                                })
                            }
                        </tbody>
                    </Table>
                 }
                  {
                    (error) ? (<h3 className="text-center">Pas de produit trouvé</h3>):(<h1 className="text-center"></h1>)
                }
            </Row>
        </Container>
        </>
    )
}

export default SearchProduct;