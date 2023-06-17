import "./productDatatable.scss";
import { DataGrid } from "@mui/x-data-grid";
import { Link } from "react-router-dom";

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteProduct, getProducts } from "../../redux/apiCalls";

//imports for material UI alert dialog
import ConfirmationDialog from "../utility/ConfirmationDialog";

const ProductDatatable = () => {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.product.products);

  const [currentProductId, setCurrentProductId] = useState(null);

  const [dialog, setDialog] = useState({
    message: "",
    isLoading: false,
    nameProduct: "",
  });

  const handleDialog = (message, isLoading, nameProduct) => {
    setDialog({
      message,
      isLoading,
      nameProduct,
    });
  };

  const areUSureDelete = (choose) => {
    if (choose) {
      deleteProduct(currentProductId, dispatch);
      handleDialog("", false);
    } else {
      handleDialog("", false);
    }
  };

  useEffect(() => {
    getProducts(dispatch);
  }, [dispatch]);

  const handleDelete = (id) => {
    const index = products.findIndex((p) => p._id === id);
    handleDialog(
      "Are you sure you want to delete?",
      true,
      products[index].title
    );
    setCurrentProductId(id);

    //deleteProduct(id, dispatch);
    //  setData(data.filter((item) => item.id !== id));
  };

  const columns = [
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
  ];

  const actionColumn = [
    {
      field: "action",
      headerName: "Action",
      width: 200,
      renderCell: (params) => {
        return (
          <div className="cellAction">
            <Link
              to={`/products/${params.row._id}`}
              style={{ textDecoration: "none" }}
            >
              <div className="viewButton">View</div>
            </Link>
            <div
              className="deleteButton"
              onClick={() => handleDelete(params.row._id)}
            >
              Delete
            </div>
          </div>
        );
      },
    },
  ];
  return (
    <div>
      {dialog.isLoading && (
        <ConfirmationDialog
          //Update
          nameProduct={dialog.nameProduct}
          onDialog={areUSureDelete}
          message={dialog.message}
        />
      )}
      <div className="datatable">
        <div className="datatableTitle">
          Add New Product
          <Link to="/products/new" className="link">
            Add New
          </Link>
        </div>
        {products && (
          <DataGrid
            className="datagrid"
            rows={products}
            columns={columns.concat(actionColumn)}
            pageSize={9}
            rowsPerPageOptions={[9]}
            checkboxSelection
            getRowId={(row) => row._id}
          />
        )}
      </div>
    </div>
  );
};

export default ProductDatatable;
