import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";


function Produts(props) {

  const [posts, setPosts] = useState([]);

  const getPosts = () => {
    // Make a request for a user with a given ID
    axios
      .get("http://localhost:3030/products")
      .then((response) => {
        if (response.status === 200) {
          setPosts(response.data.products);
        }
      });
  };

  useEffect(() => {
    getPosts();
  }, []);

  const successMsg = () =>
  toast.warning("Product Delete Successfully", {
    position: "top-right",
    autoClose: 1000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "colored"
  });

  const delet = (id) => {

    axios.delete(`http://localhost:3030/products/${id}`)
      .then((response) => {
        if (response.status === 200) {
          console.log(response)
          getPosts();
          successMsg();
        }


      })
  };




  return (
    <>
      <h4>Mian Product Panel</h4>
      <table className="table border">
        <tr className="bg-primary">
          <th scope="row">ID</th>
          <th>Image</th>
          <th>Name</th>
          <th>Price</th>
          <th>Category</th>
          <th>Action----</th>
        </tr>

        {

          posts.map((element, index) => {
            return (
              <tr key={index}>
                <td>{element._id}</td>
                <td> <img style={{ width: "60px", height: "60px", borderRadius: "50%" }}
                  src={`http://127.0.0.1:3030/${element.image}`}
                  className="card-img-top"
                  alt="..."
                /></td>
                <td>{element.name}</td>
                <td>{element.price}</td>
                <td>{element.category}</td>
                <td>

                  <Link>
                  <button className="btn btn-danger" onClick={() => {
                    delet(element._id)
                  }}>Delete</button>
                  </Link>
                 


                  <Link to={`/dashboard/product/edit/${element._id}`}>
                    <button className=" btn btn-warning">Update</button>
                  </Link>


                  <Link to={`/details/${element._id}`}>
                    <button className=" btn btn-primary">View</button>
                  </Link>
                </td>
              </tr>

            )


          })
        }


      </table>

    </>
  )
}

export default Produts;