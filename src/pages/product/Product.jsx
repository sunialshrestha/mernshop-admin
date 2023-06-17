import "./product.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import Chart from "../../components/chart/Chart";
import List from "../../components/table/Table";

import { Link, useLocation } from "react-router-dom";

import { useSelector } from "react-redux";
import { useEffect, useMemo, useState } from "react";
import { userRequest } from "../../requestMethods";

const Product = () => {
  const location = useLocation();
  const productId = location.pathname.split("/")[2];
  const [pStats, setPStats] = useState([]);

  const product = useSelector((state) =>
    state.product.products.find((product) => product._id === productId)
  );

  const MONTHS = useMemo(
    () => [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Agu",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ],
    []
  );

  useEffect(() => {
    const getStats = async () => {
      try {
        const res = await userRequest.get("orders/income?pid=" + productId);
        const list = res.data.sort((a, b) => {
          return a._id - b._id;
        });
        list.map((item) =>
          setPStats((prev) => [
            ...prev,
            { name: MONTHS[item._id - 1], Sales: item.total },
          ])
        );
      } catch (err) {
        console.log(err);
      }
    };
    getStats();
  }, [productId, MONTHS]);

  return (
    <div className="single">
      <Sidebar />
      <div className="singleContainer">
        <Navbar />
        <div className="top">
          <div className="left">
            <div className="editButton">
              <Link to={`/products/edit/${product._id}`}> Edit </Link>
            </div>
            <h1 className="title">Information</h1>
            <div className="item">
              <img src={product.img} alt="" className="itemImg" />
              <div className="details">
                <h1 className="itemTitle">{product.title}</h1>
                <div className="detailItem">
                  <span className="itemKey">id:</span>
                  <span className="itemValue">{product._id}</span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">in stock:</span>
                  <span className="itemValue">{product.inStock + ""}</span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">Sales:</span>
                  <span className="itemValue">5342</span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">Description:</span>
                  <span className="itemValue">{product.desc}</span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">Category:</span>
                  <span className="itemValue">
                    {product.categories && product.categories.join(", ")}
                  </span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">Available Size:</span>
                  <span className="itemValue">
                    {product.size && product.size.join(", ")}
                  </span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">Available Color:</span>
                  <span className="itemValue">
                    {product.color && product.color.join(", ")}
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div className="right">
            <Chart aspect={3 / 1} title="product sales ( Last 6 Months)" />
          </div>
        </div>
        <div className="bottom">
          <h1 className="title">Last Purchase</h1>
          <List />
        </div>
      </div>
    </div>
  );
};

export default Product;
