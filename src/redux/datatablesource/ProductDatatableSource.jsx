import { useDispatch, useSelector } from "react-redux";
import { getProducts } from "../apiCalls";

export const productColumns = [
  { field: "_id", headerName: "ID", width: 220 },
  {
    field: "product",
    headerName: "Product",
    width: 200,
    renderCell: (params) => {
      return (
        <div className="productListItem">
          <img className="productListImg" src={params.row.img} alt="" />
          {params.row.title}
        </div>
      );
    },
  },
  { field: "inStock", headerName: "Stock", width: 200 },
  {
    field: "price",
    headerName: "Price",
    width: 160,
  },
  {
    field: "action",
    headerName: "Action",
    width: 150,
    renderCell: (params) => {
      return (
        <>
          <Link to={"/product/" + params.row._id}>
            <button className="productListEdit">Edit</button>
          </Link>
          <DeleteOutline
            className="productListDelete"
            onClick={() => handleDelete(params.row._id)}
          />
        </>
      );
    },
  },
];

export const productRows = () => {
  const products = useSelector((state) => state.product.products);
  const dispatch = useDispatch();
  getProducts(dispatch);
  return products;
};

export const actionColumn = [
  {
    field: "action",
    headerName: "Action",
    width: 200,
    renderCell: (params) => {
      return (
        <div className="cellAction">
          <Link to="/users/test" style={{ textDecoration: "none" }}>
            <div className="viewButton">View</div>
          </Link>
          <div
            className="deleteButton"
            onClick={() => handleDelete(params.row.id)}
          >
            Delete
          </div>
        </div>
      );
    },
  },
];
