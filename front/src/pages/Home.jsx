import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function Home(props) {
  return (
    <>
      <div className="hompage" style={{ backgroundColor: "gold" }}>
        <h1>All Products</h1>
        {/* <button onClick={getPosts}>Get Posts</button> */}
        <div className="container">
          <div className="row">
            {props.products.length == 0 ? (
              <div class="spinner-border text-danger" role="status">
                <span class="visually-hidden">Loading...</span>
              </div>
            ) : null}
            {props.products.map((element, index) => {
              return (
                <div className="col-md-3 mb-3" key={element.id}>
                  <div className="card">
                    <img
                      src="https://picsum.photos/200/200"
                      className="card-img-top"
                      alt="..."
                    />
                    <div className="card-body">
                      <Link to={`/details/${element._id}`}>
                        <h5 className="card-title">{element.name}</h5>
                      </Link>

                      <h6>Price: {element.price}</h6>
                      <h6>Category: {element.category}</h6>
                      <button
                        onClick={() => {
                          props.addToCart(element);
                        }}
                        className="btn btn-primary"
                      >
                        Add To Cart
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;