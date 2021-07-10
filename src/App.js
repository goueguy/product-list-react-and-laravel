import './App.css';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import AddProduct from './pages/AddProduct';
import Error404 from './pages/Error404';
import Home from './pages/Home';
import Protected from './components/Protected';
import ProductList from './components/ProductList';
import EditProduct from './pages/EditProduct';
import Search from './components/searchProduct';
function App() {
  
  return (
    <div>
        <BrowserRouter>
          <Switch>
            <Route exact path="/rechercher">
              <Protected Cmp={Search}/>
            </Route>
            <Route exact path="/">
              <Protected Cmp={Home}/>
            </Route>
            <Route exact path="/list-product">
              <Protected Cmp={ProductList}/>
            </Route>
            <Route exact path="/add-product">
              <Protected Cmp={AddProduct}/>
            </Route>
            <Route path="/login">
              <Login/>
            </Route>
            <Route exact path="/register">
              <Register/>
            </Route>
            <Route exact path="/edit/:id">
              <Protected Cmp={EditProduct}/>
            </Route>
            <Route path="*">
              <Error404/>
            </Route>
          </Switch>
        </BrowserRouter>
    </div>
  );
}

export default App;

