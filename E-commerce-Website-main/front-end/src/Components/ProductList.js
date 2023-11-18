import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const ProductList=()=>{
    const [product,setProduct]= useState([]);

    useEffect(()=>{
        getProduct();
    },[])

    const getProduct=async()=>{
        // const userId = JSON.parse(localStorage.getItem("user"))._id;
        let result = await fetch('http://localhost:5000/products');
        result = await result.json();
        setProduct(result);
        // result.map((item,index)=>{
        //     if(userId===item.userId){
        //         setProduct(result);
        //     }
        // })
          console.log(result);
       
    }

    

    
    const deleteProduct=async(id)=>{
        let result = await fetch(`http://localhost:5000/product/${id}`,{
            method:'Delete'
        })
        result = await result.json();
        if(result){
            getProduct();
        }
    }

    const searchHandle=async(event)=>{
        let key = event.target.value;
        if(key){
            let result = await fetch(`http://localhost:5000/search/${key}`);
            result = await result.json();
            if(result){
                setProduct(result);
            }
        }else{
            getProduct();
        }
        
    }

    return(
        <div className="Product-List">
            <h3>Product-List</h3>
            <input type="text" placeholder="Search Product" className="search-product-box"
            onChange={searchHandle} />
            <ul>
                <li>S.no</li>
                <li>Name</li>
                <li>Price</li>
                <li>Company</li>
                <li>Operation</li>

            </ul>
            {
             product.length>0?   product.map((item,index)=>
                <ul>
                <li>{index+1}</li>
                <li>{item.name}</li>
                <li>{item.price}</li>
                <li>{item.company}</li>
                <li><button type="delete"  onClick={()=>deleteProduct(item._id)}>Delete</button>
                 <button ><Link to={'/update-product/'+item._id} style={ {textDecoration :  "none", color : "black"}}> Update</Link></button>
                </li>

            </ul>
              ): <h1>NO RESULT FOUND</h1>
            }
        </div>
    )
}

export default ProductList;