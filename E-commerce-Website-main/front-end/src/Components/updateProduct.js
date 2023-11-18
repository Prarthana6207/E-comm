import { useEffect, useState } from "react";
import React from "react";
import { useParams ,useNavigate} from "react-router-dom";

const UpdateProduct = () => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [company, setCompany] = useState("");
const navigate = useNavigate();
  const params = useParams();

  useEffect(() => {
    getProductDetails();
  },[]);

    
  const getProductDetails = async () => {
    let result = await fetch(`http://localhost:5000/product/${params.id}`);
    result = await result.json();
    // console.log(result);
    setName(result.name);
    setCategory(result.category);
    setPrice(result.price);
    setCompany(result.company);
  };

  const updateproduct = async () => {
    let result = await fetch(`http://localhost:5000/product/${params.id}`,{
      method :'put',
      body:JSON.stringify({name,price,category,company}),
      headers:{
        'Content-Type':'application/json'
      }
    });
    result = await result.json();
    console.log(result)
navigate('/');
    
  };

  return (
    <div className="addProduct">
      <h3>Update-Product</h3>
      <input
        type="text"
        placeholder="Enter your name"
        className="inputBox"
        onChange={(e) => {
          setName(e.target.value);
        }}
        value={name}
      />

      <input
        type="text"
        placeholder="Enter your Price"
        className="inputBox"
        onChange={(e) => {
          setPrice(e.target.value);
        }}
        value={price}
      />

      <input
        type="text"
        placeholder="Enter your Category"
        className="inputBox"
        onChange={(e) => {
          setCategory(e.target.value);
        }}
        value={category}
      />

      <input
        type="text"
        placeholder="Enter your Company"
        className="inputBox"
        onChange={(e) => {
          setCompany(e.target.value);
        }}
        value={company}
      />

      <button type="button" onClick={updateproduct} className="appButton ">
        Update Product
      </button>
    </div>
  );
};

export default UpdateProduct;
