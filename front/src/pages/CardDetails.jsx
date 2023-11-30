function CartDetails(props) {
  let total = 0;

  return (
    <>
      <div className="container">
        {props.cart.map((element, index) => {
          {
            total += +element.price;
          }
          return (
            <div className="card mb-3">
              <div className="row g-0">
                <div className="col-md-4">
                  <img
                    src={`http://127.0.0.1:3030/${element.image}`}
                    className="img-fluid rounded-start"
                    alt="..."
                    style={{ width: "80px" }}
                  />
                </div>
                <div className="col-md-6">
                  <div className="card-body">
                    <h5 className="card-title">{element.name}</h5>
                    <p className="card-text">
                      This is a wider card with supporting text below as a
                      natural lead-in to additional content. This content is a
                      little bit longer.
                    </p>
                    <p className="card-text">
                      <small className="text-body-secondary">
                        Last updated 3 mins ago
                      </small>
                    </p>
                    <button
                      onClick={() => {
                        props.removeItem(index);
                      }}
                    >
                      Delete
                    </button>
                  </div>
                </div>
                <div className="col-md-2">Price: {element.price}</div>
              </div>
            </div>
          );
        })}
        <div><button>Reset</button></div>
        <div>Grand Total: {total}</div>
      </div>
    </>
  );
}

export default CartDetails;