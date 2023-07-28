import { useState, useEffect } from "react";
import React from "react";
import { useParams } from "react-router-dom";
import "./Details.scss";
import { useGlobalContent } from "../../Context";

function Details() {
  // const [data, setData] = useState({});
  // const { id } = useParams();
  // const apiUrl = `https://fakestoreapi.com/products/${id}`;

  // useEffect(() => {
  //   fetchData();
  // }, [id]);

  // const fetchData = async () => {
  //   try {
  //     const response = await fetch(apiUrl);

  //     if (!response.ok) {
  //       throw new Error('Failed to fetch product details');
  //     }

  //     const jsonData = await response.json();
  //     setData(jsonData);
  //   } catch (error) {
  //     console.error('Error fetching data:', error);
  //   }
  // };
  const [product, setProduct] = useGlobalContent();
  const [data, setData] = useState({});
  const { id } = useParams();
  const apiUrl = `https://fakestoreapi.com/products/${id}`;

  const filterData = () => {
    const idNumber = parseInt(id); // Convert the id to an integer
    const uniqueProduct = product.find((item) => item.id === idNumber);
    setData(uniqueProduct || {}); // Set data to an empty object if uniqueProduct is undefined
    // console.log(uniqueProduct)
  };

  useEffect(() => {
    filterData();
  }, [id, product]);

  return (
    <div className="details my-5">
      {data.id ? (
        <>
          <img src={data.image} alt="" />
          <h2>{data.title}</h2>
          <p>{data.description}</p>
          <p>Price: {data.price}</p>
          {/* Add any other information you want to display */}
        </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default Details;
