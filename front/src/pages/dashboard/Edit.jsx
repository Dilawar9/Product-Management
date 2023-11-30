
import axios from "axios";
import { useState,useEffect } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useParams  } from "react-router-dom";


function Edit() {

  const params = useParams();
  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [category, setCategory] = useState("");
  const[image,setImage]=useState(null);
  const [loading, setLoading] = useState(false);

  const navegate=useNavigate();

  const successMsg = () =>
  toast.success("Product Update Successfully", {
    position: "top-right",
    autoClose: 1000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "dark",
    });


    useEffect(() => {
      axios
        .get(`http://localhost:3030/products/${params.id}`)
        .then((response) => {
          console.log(response)
          if (response.status === 200) {
            setName(response.data.product.name)
            setPrice(response.data.product.price)
            setCategory(response.data.product.category)
            setImage(response.data.product.image)
          }
        });
    },[]);

  const handleSubmit = () => {
    console.log(name, price);

    if (name !== "" && price !== 0 && category!=="" && image!==null) {
    //  Edit product
      setLoading(true);
      axios.put(`http://localhost:3030/products/${params.id}`, {
          name: name,
          price: price,
          category:category,
          image:image
       
        }, {
          headers: {
            "Content-Type": "multipart/form-data"
          },
        })
        .then((res) => {
          console.log(res);
          if (res.status === 200) {
            successMsg();
            setTimeout(()=>{
              navegate("/dashboard")
            },2000)
            setName("");
            setPrice("");
            setCategory("");
            setImage(null);
          }
        })
        .catch((er) => {
          console.log(er.message);
        })
        .finally(() => setLoading(false));
    } else {
      alert("Please Enter Data");
    }
  };

    return(
      <>
    <h4>Edit product</h4>
      <form 
        onSubmit={(e) => {
          e.preventDefault();
        }}
      >
        <div className="mb-3">
          <label id="name">Product Name</label>
          <input
            type="text"
            id="name"
            name="name"
            onChange={(e) => {
              setName(e.target.value);
            }}
            className="form-control"
            value={name}
            placeholder="product name"
          />
        </div>
        <div className="mb-3">
          <label id="price">Price</label>
          <input
            type="number"
            id="price"
            className="form-control"
            value={price}
            onChange={(e) => {
              setPrice(e.target.value);
            }}
            placeholder="product price"
          />
        </div>
        
        <div className="mb-3">
          <label id="category">Product Category</label>
          <input
            type="text"
            id="category"
            className="form-control"
            value={category}
            onChange={(e) => {
              setCategory(e.target.value);
            }}
            placeholder="product Category"
          />
        </div>

        <div className="mb-3">
          <label id="image">Product image</label>
          <input
            type="file"
            id="image"
            className="form-control"
            onChange={(e) => {
              setCategory(e.target.files[0]);
            }}
          />
        </div>

        <button
          class="btn btn-warning"
          type="button"
          onClick={handleSubmit}
          disabled={loading === true ? true : ""}
        >
          {loading === true ? (
            <span
              class="spinner-grow spinner-grow-sm me-1"
              aria-hidden="true"
            ></span>
          ) : null}

          <span role="status">
            {loading === false ? "Product Edit " : "Loading..."}
          </span>
        </button>
      </form>
    
    </>

    )
  }
  
  export default Edit;
  