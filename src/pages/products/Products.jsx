import React, { useEffect, useState } from 'react';
import { useGlobalContent } from '../../Context';
import { Link, useParams } from 'react-router-dom';

function 
Products() {
  const [data] = useGlobalContent();
  const [product, setProduct] = useState(data);
  const [keyword, setKeyword] = useState('');

  const { search } = useParams();

  const handleInputChange = (event) => {
    const val = event.target.value;
    setKeyword(val);
  };

  const updateProducts = (val) => {
    const filterProduct = data.filter((item) =>
      item.title.toLowerCase().includes(val.toLowerCase())
    );
    setProduct(filterProduct);
  };

  useEffect(() => {
    // Reset the products list to the original data when the keyword is empty
    if (keyword === '' && !search) {
      setProduct(data);
    } else if (keyword !== '') {
      updateProducts(keyword);

    } else if (search) {
      updateProducts(search);
      
    }
  }, [keyword, data, search]);

  return (
    <div className="home__content py-4">
      <div className="container">
      {!search &&
        <input
          type="text"
          value={keyword}
          onChange={handleInputChange}
          placeholder="Search..."
        />
      }
        <div className="row">
          {product.map((item, idx) => (
            <Link to={`/details/${item.id}`} className="col-lg-4 text-decoration-none" key={idx}>
              <div className="card p-2 mb-4 overflow-hidden">
                <div className="row ">
                  <div className="card__1 col-5">
                    <img src={item.image} alt={item.title} className="productImg" />
                  </div>
                  <div className="card__2 col-7 bg-white">
                    <h5>{item.title}</h5>
                    <small>{item.category}</small>
                  </div>
                </div>
                <div className="card__3 w-75 m-auto">
                  <p>Rs. {item.price}</p>
                  <div className="row justify-content-between">
                    <button className="col-5 py-0 px-2 d-block border-success">Add to Cart</button>
                    <button className="col-5 py-0 px-2 d-block border-success">Buy Now</button>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Products;
