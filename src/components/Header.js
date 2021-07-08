
import {Navbar,Nav,Form,FormControl, Button} from 'react-bootstrap';
import {Link} from 'react-router-dom';

function Header() {
    return (
        <div>
            <Navbar bg="dark" variant="dark">
                <Navbar.Brand>
                    <Link to="/" className="pr-4 text-white">Home</Link>
                </Navbar.Brand>
                        <Nav className="mr-auto">
                        {
                            localStorage.getItem('user-info') ? 
                            <>
                                <Link to="/add-product" className="pr-4 text-white">ADD PRODUCT</Link>
                                <Link to="/update" className="pr-4 text-white">UPDATE PRODUCT</Link>
                            </>
                            :
                            <>
                                <Link to="/login" className="pr-4 text-white">LOGIN</Link>
                                <Link to="/register" className="text-white">REGISTER</Link>
                            </>
                        
                        }
                    </Nav>
                
            </Navbar>
            
        </div>
    )
}

export default Header
