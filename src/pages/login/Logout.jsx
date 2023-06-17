import React from "react";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { revertAll } from "../../redux/apiCalls";
import { useNavigate } from "react-router-dom";

const Logout = () => {
  let navigate = useNavigate();

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(revertAll());
    navigate("/login");
  }, [dispatch, navigate]);
  return <div></div>;
};

export default Logout;
