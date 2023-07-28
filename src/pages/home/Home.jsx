import React, { useEffect, useState } from "react";
import "./Home.scss";
import { useApi, useCart, useGlobalContent } from "../../Context";
import { Link } from "react-router-dom";

function Home() {
  const [allProducts, setAllProduct] = useGlobalContent();
  const [api, setApi] = useApi();
  const [products, setProducts] = useState(allProducts);
  const [categories, setCategories] = useState([]);
  const [cart,setCart] = useCart();

  const getUniqueCategories = () => {
    const uniqueCategories = [
      ...new Set(allProducts.map((obj) => obj.category)),
    ];
    setCategories(uniqueCategories);
  };

  const getUniqueProductsByCategory = (selectedCategory) => {
    if (selectedCategory === "All") {
      setProducts(allProducts);
    } else {
      const uniqueProducts = allProducts.filter(
        (obj) => obj.category === selectedCategory
      );
      setProducts(uniqueProducts);
    }
  };

  const addToCart = (item) => {
    // Check if the cart already contains the same item
    const isItemInCart = cart.find((cartItem) => cartItem.id === item.id);

    // If the item is already in the cart, do not add it again
    if (isItemInCart) {
      alert("Item is already in the cart!");
    } else {
      // If the item is not in the cart, add it
      setCart([...cart, item]);
    }
  };

  useEffect(() => {
    getUniqueCategories();
    setProducts(allProducts);
    // console.log(cart)
  }, [allProducts]);

  return (
    <div className="home py-5">
       <div className="container">
        <div className="row">
          <div className="home__menu col-lg-2 border">
            <ul className="py-4">
              <li
                className="category my-2"
                onClick={() =>  getUniqueProductsByCategory('All')}
              >
                All
              </li>
              {categories.map((item, idx) => (
                <li
                  className="category my-2"
                  key={idx}
                  onClick={() => getUniqueProductsByCategory(item)}
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div className="home__content col-lg-10">
            <div className="row">
              {products.map((item, idx) => (
                <div className="col-lg-4 " key={idx}>
                    <div className="card p-2 mb-4 overflow-hidden">
                    <Link to={`/details/${item.id}`} className="text-decoration-none text-dark">
                      <div className="row">
                        <div className="card__1 col-5">
                          <img
                            src={item.image}
                            alt={item.title}
                            className="productImg"
                          />
                        </div>
                        <div className="card__2 col-7 bg-white">
                          <h5>{item.title}</h5>
                          <small>{item.category}</small>
                        </div>
                      </div>
                </Link>
                      <div className="card__3 w-75 m-auto">
                        <p>Rs. {item.price}</p>
                        <div className="row justify-content-between">
                          <button className="col-5 py-0 px-2 d-block border-success" onClick={() => addToCart(item)}>
                            Add to Cart
                          </button>
                          <button className="col-5 py-0 px-2 d-block border-success">
                            Buy Now
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
