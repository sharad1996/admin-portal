import React, { useState, useEffect } from "react";
import ProductDetailPage from "./ProductDetailPage";
import Button from "react-bootstrap/Button";
import { fetchApi } from "../apis";
import CreateProduct from "./CreateProduct";

const UserPage = ({ userId }) => {
  const [show, setShow] = useState(false);
  const [prouctList, setProductList] = useState(null);

  const handleClose = () => setShow(false);

  const handleShow = () => setShow(true);

  const getProducts = async () => {
    const options = {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    };
    const response = await fetchApi(`products/${userId}`, options);
    if (response.products) {
      setProductList(response.products);
    } else {
      setProductList(null);
    }
  };

  useEffect(() => {
    if (userId) {
      getProducts();
    }
  }, [userId]);

  return (
    <div className="dashboard-wrapper">
      <div className="dashboard-head-wrapper">
        <div>
          <h1>List of Product </h1>
        </div>
        <div>
          <CreateProduct
            userId={userId}
            show={show}
            handleClose={handleClose}
            getProduct={getProducts}
          />
          <Button variant="secondary" onClick={handleShow}>
            Create Product +
          </Button>
        </div>
      </div>

      <ProductDetailPage productList={prouctList} />
    </div>
  );
};

export default UserPage;
