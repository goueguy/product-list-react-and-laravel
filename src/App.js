import './App.css';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import UpdateProduct from './pages/UpdateProduct';
import AddProduct from './pages/AddProduct';
import Error404 from './pages/Error404';
import Home from './pages/Home';
import Protected from './components/Protected';
function App() {
  
  return (
    <div>
        <BrowserRouter>
          <Switch>
            <Route exact path="/">
              <Home/>
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
            <Route exact path="/update">
              <Protected Cmp={UpdateProduct}/>
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

