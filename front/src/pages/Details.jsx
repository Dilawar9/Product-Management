import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";

function Details() {
  const [product, setProduct] = useState(null);

  const params = useParams();

  console.log(params.pid);

  useEffect(() => {
    axios
      .get(`http://localhost:3030/products/${params.pid}`)
      .then((response) => {
        console.log(response);
        if (response.status == 200) {
          setProduct(response.data.product);
        }
      });
  }, []);

  if (product === null) {
    return (
      <div className="spinner-border text-danger" role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
    );
  }

  return (
    <>
       {product !== null ? (
        <div>PRODUTC NAME:{product.name}</div>
      ) : (
        <p className="alert alert-danger">No product found</p>
      )}
        <div className="card mb-3 m-4">
        <div className="row g-0">
          <div className="col-md-4">
            <img src={`http://127.0.0.1:3030/${element.image}`} className="img-fluid rounded-start" alt="..." />
          </div>
          <div className="col-md-8">
            <div className="card-body">
              <h5 className="card-title">Produtc Price:{product.price}</h5>
              <p className="card-text">Product Detail:{product.createdAt}<br></br>This is a wider card with supporting text below as a n</p>
              <p className="card-text"><small className="text-body-secondary">Product Catogory:{product.category}</small></p>
              <Link to="/">Go to Home</Link>
              <br />
              <Link to="/dashboard">Go to Dashboard</Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Details;