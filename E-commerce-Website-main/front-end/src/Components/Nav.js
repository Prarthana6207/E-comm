import React from "react";
import { Link, useNavigate } from "react-router-dom";

const Nav = () => {
  const auth = localStorage.getItem("user");
  const navigate = useNavigate();
  const logout = () => {
    localStorage.clear();
    navigate("/SignUp");
  };
  return (
    <div>
        <img className="logo"
        src="https://www.seekpng.com/png/detail/247-2474955_ecommerce-ecommerce-png.png" 
        alt="logo" />

       {auth? <ul className="nav-ul">
        <li>
          <Link to="/">Product</Link>
        </li>
        <li>
          <Link to="/addproduct">Add-Products</Link>
        </li>
        <li>
          <Link to="/update-product/:id">update-Product</Link>
        </li>

        
        <li>
        <Link onClick={logout} to="/SignUp">
            Logout ({JSON.parse (auth).name})
          </Link>
        </li>
       </ul>
       :
       <ul className="nav-ul nav-right">
       <li>
              <Link to="/SignUp">Sign-Up</Link>
            </li>

            <li>
              <Link to="/login">Login</Link>
            </li>
       </ul>
       }
    </div>
  );
};

export default Nav;
