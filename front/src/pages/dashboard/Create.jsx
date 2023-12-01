import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function Create(props) {
  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [category, setCategory] = useState("");
  const[image,setImage]=useState(null);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors]  = useState(false);


  const navigator = useNavigate();

  const successMsg = () =>
    toast.success("Product successfully created", {
      position: "top-right",
      autoClose: 1000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light"
    });

  const handleSubmit = () => {
    console.log(name, price,category,image);

 
    // create product
    setLoading(true);
    axios.post("http://localhost:3030/products", {
        name: name,
        price: price,
        category: category,
        image:image
      }, {
        headers: {
          "Content-Type": "multipart/form-data"
        },
      })
      .then((res) => {
        console.log(res);
        if (res.data.status == true) {
          successMsg();
          setTimeout(() => {
            navigator("/dashboard");
            props.setUpdated(true);
         
          }, 2000)
          setName("");
          setPrice("");
          setCategory("");
          setImage(null);
        // } else if (res.data.status == false) {
        //     console.log(res.data.errors);
        //     setErrors(res.data.errors);
        // })
      }})
      .catch((er) => {
        console.log(er.message);
      })
      .finally(() => {
        setLoading(false);
      });
    // } else {
    //   alert("fields are empty");
    // }
  };

  return (
    <>
      <h2>Create Product</h2>
      <form
        onSubmit={(e) => {
          e.preventDefault();
        }}
      >
        <div className="mb-3">
          <label id="name" className="text-start d-block font-bold">Product Name</label>
          <input
            type="text"
            id="name"
            onChange={(e) => {
              setName(e.target.value);
            }}
            className="form-control"
            value={name}
            placeholder="product name"
          />
          { (errors.name) ?  <div className="alert alert-danger py-1 mt-1"> {errors.name}</div> : null}

        </div>
        <div className="mb-3">
          <label id="price" className="text-start d-block font-bold">Price</label>
          <input
            type="number"
            id="price"
            onChange={(e) => {
              setPrice(e.target.value);
            }}
            className="form-control"
            value={price}
            placeholder="product name"
          />
           { (errors.price) ?  <div className="alert alert-danger py-1 mt-1"> {errors.price}</div> : null}
        </div>

        <div className="mb-3">
          <label id="category" className="text-start d-block font-bold">Select Category</label>
          <select id="category" value={category} className="form-control" onChange={(e) => { setCategory(e.target.value) }}>
            <option value='Shirts'>Shirts</option>
            <option value='Pents'>Pents</option>
            <option value='Mobiles'>Mobiles</option>
          </select>
          { (errors.category) ?  <div className="alert alert-danger py-1 mt-1"> {errors.category}</div> : null}
        </div>

        <div className="mb-3">
          <label id="image" className="text-start d-block font-bold">Produt image</label>
          <input
            type="file"
            id="image"
            onChange={(e) => {
              setImage(e.target.files[0]);
            }}
            className="form-control"
          />
           { (errors.price) ?  <div className="alert alert-danger py-1 mt-1"> {errors.price}</div> : null}
        </div>

        <button
          class="btn btn-warning"
          type="button"
          onClick={handleSubmit}
          disabled={loading == true ? true : ""}
        >
          {loading == true ? (
            <span
              class="spinner-grow spinner-grow-sm me-1"
              aria-hidden="true"
            ></span>
          ) : null}

          <span role="status">
            {loading == false ? "Create Product" : "Loading..."}
          </span>
        </button>
      </form>
    </>
  );
}

export default Create;