import "./list.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import ProductDatatable from "../../components/datatable/ProductDatatable";
import UserDatatable from "../../components/datatable/UserDatatable";

import { useParams } from "react-router-dom";

const List = () => {
  const { listing } = useParams();
  return (
    <div className="list">
      <Sidebar />
      <div className="listContainer">
        <Navbar />
        {listing === "products" && <ProductDatatable />}
        {listing === "users" && <UserDatatable />}
      </div>
    </div>
  );
};

export default List;
