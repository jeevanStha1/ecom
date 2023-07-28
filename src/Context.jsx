import React, { useState, useEffect, useContext } from "react";

const AppContext = React.createContext(); //create context
const apiContext = React.createContext();
const cartContext = React.createContext();

//provider function
const AppProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [api, setApi] = useState("https://fakestoreapi.com/products");
  const [cart, setCart] = useState([])

  const handleChange = (newVal) => {
    return !newVal
      ? "https://fakestoreapi.com/products"
      : `https://fakestoreapi.com/products/${newVal}`;
  };

  // Function to call the API
  const fetchDataFromApi = async () => {
    try {
      const response = await fetch(api);
      const jsonData = await response.json();
      return jsonData;
    } catch (error) {
      throw new Error("Error fetching data from API");
    }
  };
  useEffect(() => {
    // Call the API here
    fetchDataFromApi()
      .then((apiData) => {
        setProducts(apiData); // Store the API response in the 'data' state
      })
      .catch((error) => {
        console.error("Error fetching data from API:", error);
      });
  }, [api]);

  return (
    <AppContext.Provider value={[products, setProducts]}>
      <apiContext.Provider value={[api, setApi]}>
        <cartContext.Provider value={[cart, setCart]}>{children}</cartContext.Provider>
      </apiContext.Provider>
    </AppContext.Provider>
  );
};

//costom hook create
const useGlobalContent = () => {
  return useContext(AppContext);
};
const useApi = () => {
  return useContext(apiContext);
};
const useCart = () => {
  return useContext(cartContext);
};

export { AppContext, AppProvider, useGlobalContent, useApi, useCart };
