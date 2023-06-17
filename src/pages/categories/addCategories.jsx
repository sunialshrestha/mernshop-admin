import "./addCategories.scss";
import "./test.css";
import "./material.indigo-pink.min.css";
import "./dropdownstyles.css";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";

import { useState, useEffect, useRef } from "react";

import { useDispatch, useSelector } from "react-redux";
import { Alert } from "@mui/material";

import DropdownTreeSelect from "react-dropdown-tree-select";
import { getCategoryList, addCategory } from "../../redux/apiCalls";

export default function AddCategories() {
  const dispatch = useDispatch();
  const categories = useSelector((state) => state.category.nestedCategory);
  const savedCategory = useSelector((state) => state.category.savedCategory);
  const [categoryList, setCategoryList] = useState({});
  const error = useSelector((state) => state.category.error);
  const errorMsg = useSelector((state) => state.category.errorMsg);
  const loading = useSelector((state) => state.category.loading);
  const parent = useRef(null);

  // Using a `Map` here to provide a `Map` example, but you can ue an object as
  // in the previous ones if you prefer if the keys are strings
  const mapShortToLong = new Map([
    ["name", "label"],
    ["_id", "value"],
  ]);
  function refit_keys(o) {
    // Only handle non-null objects
    if (o === null || typeof o !== "object") {
      return o;
    }

    // Handle array just by handling their contents
    if (Array.isArray(o)) {
      return o.map(refit_keys);
    }

    const build = {};
    for (const key in o) {
      // Get the destination key
      const destKey = mapShortToLong.get(key) || key;

      // Get the value
      let value = o[key];

      // If this is an object, recurse
      if (typeof value === "object") {
        value = refit_keys(value);
      }

      // Set it on the result using the destination key
      build[destKey] = value;
    }
    return build;
  }

  useEffect(() => {
    if (Object.keys(categoryList).length === 0) {
      getCategoryList(dispatch);
    }

    if (categories) {
      setCategoryList(refit_keys(categories));
    }
  }, [dispatch, savedCategory, categories]);

  const [alert, setAlert] = useState(false);
  const [inputs, setInputs] = useState({});

  const [focused, setFocused] = useState(false);
  const handleFocus = (e) => {
    setFocused(true);
  };

  const handleChange = (e) => {
    setInputs((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };

  const onChange = (currentNode, selectedNodes) => {
    if (selectedNodes.length !== 0) {
      parent.current = selectedNodes[0].value;
    } else {
      parent.current = null;
    }
  };

  const handleClick = (e) => {
    e.preventDefault();
    const slug = inputs.name
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, "")
      .replace(/[\s_-]+/g, "-")
      .replace(/^-+|-+$/g, "");

    const category = { ...inputs, slug, parent_id: parent.current };
    addCategory(category, dispatch);
  };

  return (
    <div className="newCategory">
      <Sidebar />
      <div className="newContainer">
        <Navbar />

        <div className="top">
          <h1> Add Category</h1>
        </div>
        {savedCategory.length !== 0 && (
          <Alert severity="success"> new category added Successfully! </Alert>
        )}

        {error && <Alert severity="error"> {errorMsg} </Alert>}

        <div className="bottom">
          <div className="right">
            <form className="formCategory">
              <div className="formInput">
                <label className="lblCategory">Category Name</label>
                <input
                  className="inputCategory"
                  type="text"
                  name="name"
                  pattern="^\w{1,10}( \w{1,10}){0,2}$"
                  placeholder="Electronics"
                  onChange={handleChange}
                  onBlur={handleFocus}
                  focused={focused.toString()}
                  required
                />
                <span className="error">
                  Category Name can have 1 to 3 word and each words with
                  characters 1-10 and shouldn't include any special character!,
                  no trailing space, no more than one space, allow underscope
                </span>
              </div>
              <div className="formInput">
                <label className="lblCategory">Parent Category</label>
                {categories && (
                  <DropdownTreeSelect
                    multiSelect
                    name="parent_id"
                    className="mdl-demo"
                    mode="radioSelect"
                    data={categoryList}
                    onChange={onChange}
                  />
                )}
              </div>

              <button className="btnAddCategory" onClick={handleClick}>
                Add
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
