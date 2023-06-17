import "./productedit.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";

import { useLocation } from "react-router-dom";

import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import ImageSearchIcon from "@mui/icons-material/ImageSearch";
import CircularProgress from "@mui/material/CircularProgress";
import { updateProduct } from "../../redux/apiCalls";
import { Alert } from "@mui/material";

import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import app from "../../firebase";
import { getProducts } from "../../redux/apiCalls";

const ProductEdit = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const productId = location.pathname.split("/")[3];

  const product = useSelector((state) =>
    state.product.products.find((product) => product._id === productId)
  );

  useEffect(() => {
    getProducts(dispatch);
  }, [dispatch]);

  const [inputs, setInputs] = useState({});
  const [img, setImg] = useState(product ? product.img : "");
  const [loading, setLoading] = useState(false);
  const [cat, setCat] = useState(product ? product.cat : null);

  const handleCat = (e) => {
    setCat(e.target.value.split(","));
  };

  const handleChange = (e) => {
    setInputs((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };

  const handleFile = (e) => {
    e.preventDefault();
    setLoading(true);
    const uploadedFile = e.target.files[0];
    const fileName = new Date().getTime() + uploadedFile.name;
    const storage = getStorage(app);
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, uploadedFile);
    console.log(uploadedFile);
    // Register three observers:
    // 1. 'state_changed' observer, called any time the state changes
    // 2. Error observer, called on failure
    // 3. Completion observer, called on successful completion
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        // Observe state change events such as progress, pause, and resume
        // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log("Upload is " + progress + "% done");
        switch (snapshot.state) {
          case "paused":
            console.log("Upload is paused");
            break;
          case "running":
            console.log("Upload is running");
            break;
          default:
        }
      },
      (error) => {
        // Handle unsuccessful uploads
      },
      () => {
        // Handle successful uploads on complete
        // For instance, get the download URL: https://firebasestorage.googleapis.com/...
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setLoading(false);
          setImg(downloadURL);
        });
      }
    );
  };

  const handleClick = (e) => {
    e.preventDefault();
    const product = { ...inputs, img: img, categories: cat };
    updateProduct(productId, product, dispatch);
  };
  return (
    <div className="single">
      <Sidebar />
      <div className="singleContainer">
        <Navbar />
        {!product ? (
          "Loading"
        ) : (
          <div className="productEdit">
            <div className="error">
              {product.error && (
                <Alert severity="error"> Error: {product.errorMsg} </Alert>
              )}
              {product.success && (
                <Alert severity="success">Product updated successfully</Alert>
              )}
            </div>
            <form className="productForm">
              <div className="productFormLeft">
                <label>Product Name</label>
                <input
                  type="text"
                  name="title"
                  onChange={handleChange}
                  placeholder={product.title}
                />
                <label>Product Description</label>
                <input
                  type="text"
                  name="desc"
                  onChange={handleChange}
                  placeholder={product.desc}
                />
                <label>Price</label>
                <input
                  type="number"
                  name="price"
                  onChange={handleChange}
                  placeholder={product.price}
                />
                <label>Category</label>
                <input
                  type="text"
                  name="categories"
                  onChange={handleCat}
                  placeholder={product.categories}
                />
                <label>In Stock</label>
                <select name="inStock" onChange={handleChange} id="idStock">
                  <option value="true">Yes</option>
                  <option value="false">No</option>
                </select>
                <button onClick={handleClick} className="productButton">
                  Update
                </button>
              </div>
              <div className="productFormRight">
                <div className="productUpload">
                  <div className="productUploadImg">
                    {loading ? <CircularProgress /> : <img src={img} alt="" />}
                  </div>
                  <label for="file">
                    <ImageSearchIcon className="browseIcon" />
                  </label>
                  <input
                    type="file"
                    id="file"
                    placeholder={product.img}
                    onChange={handleFile}
                    style={{ display: "none" }}
                  />
                </div>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductEdit;
