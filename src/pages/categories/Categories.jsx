import * as React from "react"; // for React.forwardRef
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCategoryList } from "../../redux/apiCalls";
import "./categories.scss";
import { Link } from "react-router-dom";

import TreeView from "@mui/lab/TreeView";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import TreeItem, { useTreeItem, treeItemClasses } from "@mui/lab/TreeItem";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import { useRef } from "react";

//imports for adding delete icon in tree item label
import clsx from "clsx"; // for assigning class name dynamically
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";

//imports custom alert for material UI alert dialog
import ConfirmationDialog from "../../components/utility/ConfirmationDialog";

// creating custom content for @mui TreeView to add delete icon at the end of label

const CustomContent = React.forwardRef(function CustomContent(props, ref) {
  const {
    classes,
    label,
    nodeId,
    icon: iconProp,
    expansionIcon,
    displayIcon,
    onDelete,
  } = props;

  const {
    disabled,
    expanded,
    selected,
    focused,
    handleExpansion,
    handleSelection,
    preventSelection,
  } = useTreeItem(nodeId);

  const icon = iconProp || expansionIcon || displayIcon;
  const handleDelete = () => onDelete(nodeId);

  return (
    <div
      className={clsx(classes.root, {
        [classes.expanded]: expanded,
        [classes.selected]: selected,
        [classes.focused]: focused,
        [classes.disabled]: disabled,
      })}
      onMouseDown={preventSelection}
      ref={ref}
    >
      <span onClick={handleExpansion} className={classes.iconContainer}>
        {icon}
      </span>

      <Typography
        onClick={handleSelection}
        component="span"
        className={classes.label}
      >
        {label}
      </Typography>
      <IconButton size="small" onClick={handleDelete}>
        <DeleteIcon sx={{ "&:hover": { color: "#e39d9a" } }} fontSize="small" />
      </IconButton>
    </div>
  );
});

// creating treeview of nested categories
const Categories = () => {
  const dispatch = useDispatch();
  const categories = useSelector((state) => state.category.nestedCategory);
  const ids = useRef([]); // all ids for expanded nodes

  // state for current category that user choosen to delete
  const [currentCategoryId, setCurrentCategoryId] = useState(null);

  // states for values to the delete alert of category
  const [dialog, setDialog] = useState({
    message: "",
    isLoading: false,
    nameCategory: "",
  });

  // to set the values to the state for delete dialog
  const handleDialog = (message, isLoading, nameCategory) => {
    setDialog({
      message,
      isLoading,
      nameCategory,
    });
  };

  // execute delete functionality depending on user choosen action
  const areUSureDelete = (choose) => {
    if (choose) {
      // deleteCategory(currentProductId, dispatch);
      handleDialog("", false);
    } else {
      handleDialog("", false);
    }
  };

  // creating custom tree item where adding customcontent
  const MyTreeItem = (props) => {
    // handling event when delete icon clicked
    const handleNodeDelete = (nodeId, label, haschildren) => {
      handleDialog("Are you sure you want to delete?", true, label);
      if (haschildren) {
        console.log("First delete children category individually");
      } else {
        console.log("delete", nodeId);
      }
    };

    return (
      <TreeItem
        {...props}
        ContentComponent={CustomContent}
        ContentProps={{
          onDelete: (nodeId) => {
            handleNodeDelete(nodeId, props.label, props.haschildren);
          },
        }}
      />
    );
  };

  useEffect(() => {
    if (categories) {
      // Getting all ids from nested categories to expands all nodes
      JSON.stringify(categories, (key, value) => {
        if (key === "_id") ids.current.push(value);
        return value;
      });
    } else {
      // if not getting all category in state then calling api to get all nested categories
      getCategoryList(dispatch);
    }
  }, [dispatch, categories]);

  // Creating TreeItem using recursive function, providing nested arrays
  const renderTree = (nodes) => (
    <MyTreeItem
      haschildren={nodes.children.length === 0 ? false : true}
      key={nodes._id}
      nodeId={nodes._id}
      label={nodes.name}
    >
      {Array.isArray(nodes.children)
        ? nodes.children.map((node) => renderTree(node))
        : null}
    </MyTreeItem>
  );

  return (
    <div className="list">
      <Sidebar />
      <div className="listContainer">
        <Navbar />

        <div className="categoryList">
          <div className="categoryListTitle">
            Add New Category
            <Link to="/category/new" className="link">
              Add New
            </Link>
          </div>
          <div className="mainContent">
            {/* Confirmation dialog alert for deleting category */}
            {dialog.isLoading && (
              <ConfirmationDialog
                //Update
                nameProduct={dialog.nameCategory}
                onDialog={areUSureDelete}
                message={dialog.message}
              />
            )}

            {categories && (
              <TreeView
                aria-label="rich object"
                defaultCollapseIcon={<ExpandMoreIcon />}
                defaultExpandIcon={<ChevronRightIcon />}
                expanded={ids.current}
                sx={{
                  height: 800,
                  flexGrow: 1,
                  maxWidth: 400,
                  overflowY: "hidden",
                  overflowX: "hidden",
                }}
              >
                {renderTree(categories[0])}
              </TreeView>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Categories;
