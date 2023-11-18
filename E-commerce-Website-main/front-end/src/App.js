
import './App.css';
import Nav from './Components/Nav';
import { BrowserRouter, Routes,Route} from 'react-router-dom';
import Footer from './Components/Footer';
import SignUp from './Components/SignUp';
import PrivatComponent from './Components/PrivateComponent';
import Login from './Components/Login';
import AddProduct from './Components/addProduct';
import ProductList from './Components/ProductList';
import UpdateProduct from './Components/updateProduct';

function App() {
  return (
    <div className="App">
    <BrowserRouter>
    <Nav />
      <Routes>
      <Route element = {<PrivatComponent />}>
        <Route path='/' element={<ProductList />} />
        <Route path='/addproduct' element={<AddProduct />} />
        <Route path='/update-product/:id' element={<UpdateProduct />} />
        <Route path='/Logout' element={<h1>Logout Page</h1>} />
        {/* <Route path='/Profile' element={<h1>Users Profile</h1>} /> */}
      </Route>

        <Route path='/SignUp' element={<SignUp />} />
        <Route path='/login' element={<Login />} />
        </Routes>
    </BrowserRouter>
    
       <Footer />
    </div>
  );
}

export default App;
