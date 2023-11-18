import { useState } from "react";
import React from "react";

const AddProduct = () => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [company, setCompany] = useState("");
  const[error,setError] = useState(false)

  const addproduct = async () => {

    if(!name||!price||!category||!company){
        setError(true);
        return false;
    }

    // console.log(name,price,category,company);
    const userId = JSON.parse(localStorage.getItem("user"))._id;
    let result = await fetch("http://localhost:5000/add-product", {
      method: "post",
      body: JSON.stringify({ name, price, category, company, userId }),
      headers: { "Content-Type": "application/json" },
    });
    result = await result.json();
    console.log(result);
    // this.setState({name:"",price:"",company:"",category:""})
    setName("");
    setCategory("");
    setPrice("");
    setCompany("");
  };

  return (
    <div className="addProduct">
      <h3>Add-Product</h3>
      <input
        type="text"
        placeholder="Enter your name"
        className="inputBox"
        onChange={(e) => {
          setName(e.target.value);
        }}
        value={name}
      />
      {error && !name && <span className="valid-input">Enter valid name</span>}
      <input
        type="text"
        placeholder="Enter your Price"
        className="inputBox"
        onChange={(e) => {
          setPrice(e.target.value);
        }}
        value={price}
      />
       {error && !price && <span className="valid-input">Enter valid price</span>}
      <input
        type="text"
        placeholder="Enter your Category"
        className="inputBox"
        onChange={(e) => {
          setCategory(e.target.value);
        }}
        value={category}
      />
       {error && !category && <span className="valid-input">Enter valid category</span>}
      <input
        type="text"
        placeholder="Enter your Company"
        className="inputBox"
        onChange={(e) => {
          setCompany(e.target.value);
        }}
        value={company}
      />
       {error && !company && <span className="valid-input">Enter valid company</span>}
      <button type="button" onClick={addproduct} className="appButton ">
        Add-Product
      </button>
    </div>
  );
};

export default AddProduct;
