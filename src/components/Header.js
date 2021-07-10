
import {Navbar,Nav,NavDropdown} from 'react-bootstrap';
import {Link, useHistory} from 'react-router-dom';

function Header() {
    const user = JSON.parse(localStorage.getItem('user-info'));
    const history = useHistory();
    const logout = ()=>{
        localStorage.clear();
        history.push('./login');
    }
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
                                <Link to="/list-product" className="pr-4 text-white">LIST PRODUCT</Link>
                                <Link to="/add-product" className="pr-4 text-white">ADD PRODUCT</Link>
                                 <Link to="/rechercher" className="pr-4 text-white">SEARCH PRODUCT</Link>
                            </>
                            :
                            <>
                                <Link to="/login" className="pr-4 text-white">LOGIN</Link>
                                <Link to="/register" className="text-white">REGISTER</Link>
                            </>
                        }
                    </Nav>
                    {
                        localStorage.getItem('user-info') ? 
                        <>
                            <Nav className="mr-5">
                                <NavDropdown title={user.data.name && user.data.name}>
                                    <NavDropdown.Item onClick={logout}>
                                        Logout
                                    </NavDropdown.Item>
                                    <NavDropdown.Item>
                                        Profile
                                    </NavDropdown.Item>
                                </NavDropdown>
                            </Nav>
                        </>
                        :null
                    }
                    
            </Navbar>
            
        </div>
    )
}

export default Header
