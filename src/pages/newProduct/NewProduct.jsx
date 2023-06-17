import "./newProduct.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";

import { useState } from "react";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";

import app from "../../firebase";
import { addProduct } from "../../redux/apiCalls";
import { useDispatch, useSelector } from "react-redux";
import { Alert } from "@mui/material";

export default function NewProduct() {
  const [inputs, setInputs] = useState({});
  const [file, setFile] = useState(null);
  const [cat, setCat] = useState([]);
  const dispatch = useDispatch();
  const [alert, setAlert] = useState(false);

  const [focused, setFocused] = useState(false);
  const handleFocus = (e) => {
    setFocused(true);
  };

  const { isFetching, error, errorMsg, addSuccess } = useSelector(
    (state) => state.product
  );

  const handleChange = (e) => {
    setInputs((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };
  const handleCat = (e) => {
    setCat(e.target.value.split(","));
  };

  const handleClick = (e) => {
    e.preventDefault();
    const fileName = new Date().getTime() + file.name;
    const storage = getStorage(app);
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, file);

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
          //console.log("file available at", downloadURL);
          const product = { ...inputs, img: downloadURL, categories: cat };
          addProduct(product, dispatch);
        });
      }
    );
    setAlert(true);
  };

  return (
    <div className="newProduct">
      <Sidebar />
      <div className="newContainer">
        <Navbar />

        <div className="top">
          <h1> Add Product</h1>
        </div>
        {alert && (
          <Alert severity="success"> new product added Successfully! </Alert>
        )}
        <div className="bottom">
          <div className="left">
            <img
              src={
                file
                  ? URL.createObjectURL(file)
                  : "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"
              }
              alt=""
            />
          </div>
          <div className="right">
            <form>
              <div className="formInput">
                <label htmlFor="file">
                  Image: <DriveFolderUploadOutlinedIcon className="icon" />
                </label>
                <input
                  type="file"
                  id="file"
                  accept="image/png, image/jpeg, image/jpg"
                  onChange={(e) => setFile(e.target.files[0])}
                  style={{ display: "none" }}
                  onBlur={handleFocus}
                  focused={focused.toString()}
                  required
                />
                <span>
                  Upload the image file is required, accept png and jpeg
                </span>
              </div>

              <div className="formInput">
                <label>Title</label>
                <input
                  type="text"
                  name="title"
                  pattern="^\w{1,20}( \w{1,20})*$"
                  placeholder="Apple Airpods"
                  onChange={handleChange}
                  onBlur={handleFocus}
                  focused={focused.toString()}
                  required
                />
                <span>
                  Product Title should have each word between 1-20 characters
                  and shouldn't include any special character!, no trailing
                  space, no more than one space, allow underscope
                </span>
              </div>
              <div className="formInput">
                <label>Description</label>
                <input
                  type="text"
                  name="desc"
                  placeholder="description.."
                  pattern="^(.|\s)*[a-zA-Z]+(.|\s)*$"
                  onChange={handleChange}
                  onBlur={handleFocus}
                  focused={focused.toString()}
                  required
                />
                <span>
                  Description shouldn't include only special character and
                  whitespaces!
                </span>
              </div>
              <div className="formInput">
                <label>Price</label>
                <input
                  type="number"
                  name="price"
                  min="0"
                  oninput="this.value = 
                  !!this.value && Math.abs(this.value) >= 0 ? Math.abs(this.value) : null"
                  placeholder="100"
                  onChange={handleChange}
                  onBlur={handleFocus}
                  focused={focused.toString()}
                  required
                />
                <span>Price should be greater than 0!</span>
              </div>
              <div className="formInput">
                <label>Categories</label>
                <input
                  type="text"
                  name="cat"
                  placeholder="Electronics, Headphones"
                  pattern="^[\w,_]{1,20}( [\w,_]{1,20})*$"
                  onChange={handleCat}
                  onBlur={handleFocus}
                  focused={focused.toString()}
                  required
                />
                <span>
                  Category can includes alphabets, number, commas, underscope
                  and shouldn't include any other special character and limited
                  to 1 to 20 character for one word, no more than one space
                </span>
              </div>
              <div className="formInput">
                <label>Stock</label>
                <select name="stock" onChange={handleChange}>
                  <option value="true">Yes</option>
                  <option value="false">No</option>
                </select>
              </div>

              <button className="addNewProduct" onClick={handleClick}>
                Add
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
