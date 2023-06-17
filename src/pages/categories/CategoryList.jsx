import React from "react";

import {
  TreeList,
  Editing,
  Column,
  RequiredRule,
  Lookup,
  Button,
} from "devextreme-react/tree-list";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllCategory } from "../../redux/apiCalls";

import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import { useRef } from "react";
import { Link } from "react-router-dom";

const CategoryList = () => {
  const dispatch = useDispatch();
  const categories = useSelector((state) => state.category.allCategory);
  const ids = useRef([]); // all ids for expanded nodes

  const headDataSource = {
    store: categories,
    sort: "name",
  };

  useEffect(() => {
    if (categories) {
      // Getting all ids from nested categories
      JSON.stringify(categories, (key, value) => {
        if (key === "_id") ids.current.push(value);
        return value;
      });
    } else {
      // if not getting all category in state then calling api to get all nested categories
      getAllCategory(dispatch);
    }
  }, [dispatch, categories]);

  const onEditorPreparing = (e) => {};

  const onInitNewRow = (e) => {};

  const onSavingRow = (e) => {
    console.log("saving", e);
  };

  const onRowRemoving = (e) => {
    console.log("removing", e);
  };

  const onSavedRow = (e) => {
    console.log("Saved", e);
  };

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
          {categories && (
            <TreeList
              id="categories"
              dataSource={categories}
              showRowLines={true}
              showBorders={true}
              columnAutoWidth={true}
              autoExpandAll={true}
              keyExpr="_id"
              parentIdExpr="parent_id"
              onEditorPreparing={onEditorPreparing}
              onInitNewRow={onInitNewRow}
              onSaving={onSavingRow}
              onSaved={onSavedRow}
              onRowRemoving={onRowRemoving}
            >
              <Editing
                allowUpdating={true}
                allowDeleting={true}
                allowAdding={true}
                mode="row"
              />
              <Column dataField="name" caption="Name">
                <RequiredRule />
              </Column>
              <Column dataField="parent_id" caption="Parent Category">
                <Lookup
                  dataSource={headDataSource}
                  valueExpr="_id"
                  displayExpr="name"
                />
                <RequiredRule />
              </Column>
              <Column dataField="slug" caption="Slug">
                <RequiredRule />
              </Column>
              <Column type="buttons">
                <Button name="edit" />
                <Button name="delete" />
              </Column>
            </TreeList>
          )}
        </div>
      </div>
    </div>
  );
};

export default CategoryList;
