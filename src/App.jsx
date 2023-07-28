import { useState, useEffect } from "react";
import "./App.css";
import { Outlet, RouterProvider, createBrowserRouter } from "react-router-dom";
import Navbar from "./components/navbar/Navbar";
import Footer from "./components/footer/Footer";
import Home from "./pages/home/Home";
import Details from "./pages/details/Details";
import Products from "./pages/products/Products";
import Error from "./pages/error/Error";
import { AppProvider, useGlobalContent } from "./Context";

function App() {
  const Layout = () => {
    return (
      <div className="app">
        <Navbar />
        <Outlet />
        <Footer />
      </div>
    );
  };

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          path: "/",
          element: <Home />,
        },
        {
          path: "/products/:search",
          element: <Products />,
        },
        {
          path: "/details/:id",
          element: <Details />,
        },
        {
          path: "/products",
          element: <Products />,
        },
      ],
    },
    {
      path: "*",
      element: <Error />,
    },
  ]);

  //api call

  return (
    <>
        <RouterProvider router={router} />
    </>
  );
}

export default App;
