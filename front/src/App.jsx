import { useEffect, useState } from "react";
import "./App.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

import { Routes, Route, Link } from "react-router-dom";

import Home from "./pages/Home";
import Navbar from "./component/Navbar";
import Details from "./pages/Details";
import CardDetails from "./pages/CardDetails";

// dashboard
import Dashboard from "./pages/dashboard/Dashboard";
import Create from "./pages/dashboard/Create";
import Edit from "./pages/dashboard/Edit";
import Products from "./pages/dashboard/Products";
import About from "./pages/About";




function App() {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [updated, setUpdated] = useState(false);
  // const successMsg = () => toast("Product succesfully added to cart");
  const successMsg = () =>
    toast.success("Product successfully added", {
      position: "top-right",
      autoClose: 1000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light"
    });

  const getProducts = () => {
    // Make a request for a user with a given ID
    axios
      .get("http://localhost:3030/products")
      .then((response) => {
        if (response.status == 200) {
          setProducts(response.data.products);
          setUpdated(false);
        }
      });
  };

  const addToCart = (element) => {
    const tempAr = [...cart, element];
    setCart(tempAr);
    successMsg();
  };

  const removeItem = (index) => {
    const tempAr = [...cart];
    tempAr.splice(index, 1);
    setCart(tempAr);
  };

  console.log("cart", cart);

  useEffect(() => {
    getProducts();
    console.log("use effect ran again");
  }, [updated]);

  return (
    <div className="App">
      <Navbar cart={cart} />
  

      <Routes>
        <Route
          path="/"
          element={<Home addToCart={addToCart} products={products} />}
        />
        <Route path="/details/:pid" element={<Details />} />
        <Route
          path="/cart"
          element={<CardDetails removeItem={removeItem} cart={cart} />}
        />
        <Route path="/about"element={<About />} />
        <Route path="/dashboard" element={<Dashboard />}>
          <Route index element={<Products />} />
          <Route
            path="product/create"
            element={<Create setUpdated={setUpdated} />}
          />
          <Route path="product/edit/:id" element={<Edit />} />

        </Route>
      </Routes>

      <ToastContainer />
    </div>
  );
}

export default App;