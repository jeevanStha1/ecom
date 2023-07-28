import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useCart } from "../../Context";
import {AiOutlineShoppingCart} from "react-icons/ai";
import {CiCircleRemove} from "react-icons/ci";
import "./Navbar.scss";

function Navbar() {
  const [search,setSearch] = useState('');
  const [cart,setCart] = useCart();
  const [active,setActive] = useState(false);
  const [count,setCount] = useState(0);


  const searchVal = (e) => {
    setSearch(e.target.value);
  }

  //delete item
  const deleteItemCart = (index) => {
    const updatedItem = cart.filter((curCart) => {
      return curCart.id !== index;
    });
    setCart(updatedItem);
  };


  return (
    <div className="Navbar">
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container">
          <Link to={"/"} className="navbar-brand">
            Hamro Bazar
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link to={"/"} className="nav-link active">
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link to={"/products"} className="nav-link">
                  Products
                </Link>
              </li>
            </ul>
            <form className="d-flex">
              <input
                className="form-control me-2"
                type="search"
                placeholder="Search"
                aria-label="Search"
                onChange={searchVal}
              />
              <Link to={`/products/${search}`}><button className="btn btn-outline-success" type="submit">    Search
              </button></Link>
            
            </form>
            <div className="cart mx-3">
              <AiOutlineShoppingCart className="fs-2" style={{cursor: 'pointer'}} onClick={() => setActive(!active)}/>
              <small className=" text-success">{cart.length}</small>
              {active && <div className="cart__item border border-3 border-primary p-3">
                <div>
                  {cart.length!== 0 ? cart.map((item,idx) => (
                    <div key={idx} className="border my-3 p-2">
                      <img src={item.image} alt="" />
                      <p>{item.title}</p>
                      {/* <input type="number" value={count} onChange={(e) => setCount(e.target.value)}/>
                      <button>Update</button> */}
                      <CiCircleRemove className="icon fs-2" onClick={()=> deleteItemCart(item.id)}/>
                    </div>
                  )):<p>No items in Cart</p>
                }
                </div>
              </div>}
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default Navbar;
