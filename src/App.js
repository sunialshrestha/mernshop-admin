import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import Logout from "./pages/login/Logout";

import Register from "./pages/register/Register"
import List from "./pages/list/List";
import ProductList from  "./pages/productList/ProductList"
import Single from "./pages/single/Single";
import New from "./pages/new/New";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { userInputs } from "./formSource";
import "./style/dark.scss";
import { useContext } from "react";
import { DarkModeContext } from "./context/darkModeContext";
import ProtectedRoutes from "./ProtectedRoutes";
import Product from "./pages/product/Product";
import ProductEdit from "./pages/product/ProductEdit";
import ProductNew from "./pages/newProduct/NewProduct";
import Categories from "./pages/categories/Categories";
import AddCategories from "./pages/categories/addCategories";
import CategoryList from "./pages/categories/CategoryList";
import Test from "./pages/categories/Test";

function App() {
  const { darkMode } = useContext(DarkModeContext);

  return (
    <div className={darkMode ? "app dark" : "app"}>
      <BrowserRouter forceRefresh >
        <Routes>
        <Route path="login" element={<Login />} />
        <Route path="logout" element={<Logout />} />
        <Route path="register" element={<Register />} />
          <Route path="/" element={<ProtectedRoutes />}>
            <Route index element={<Home />} />
            <Route path="/list/:listing" element={<List/> } />
            <Route path="products/view/:listing" element={<Product/> } />

            <Route path="users">
              <Route index element={<List />} />
              <Route path=":userId" element={<Single />} />
              <Route
                path="new"
                element={<New inputs={userInputs} title="Add New User" />}
              />
            </Route>
            <Route path="products">
              <Route index element={<ProductList />} />
              <Route path=":productId" element={<Product />} />
              <Route path="edit">
              <Route path=":productId" element={<ProductEdit />} />
                </Route>
              {/* <Route
                path="new"
                element={<New inputs={productInputs} title="Add New Product" />}
              /> */}
              <Route
                path="new"
                element={<ProductNew />}/>
            </Route>

            <Route path="category">
              <Route index element={<Categories />} />
              <Route path="list" element={<CategoryList/> } />
              <Route
                path="new"
                element={<AddCategories />} />
              </Route>

              <Route path="test">
              <Route index element={<Test />} />
              </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
