import React, { useState, useEffect } from "react";
import ProductDetailPage from "./ProductDetailPage";
import { fetchApi } from "../apis";

const AdminPage = () => {
  const [prouctList, setProductList] = useState(null);

  const getProducts = async () => {
    const options = {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    };
    const response = await fetchApi("products/all", options);
    if (response.products) {
      setProductList(response.products);
    } else {
      alert(response.message);
    }
  };

  useEffect(() => {
    getProducts();
  }, []);

  return (
    <div className="dashboard-wrapper">
      <div className="dashboard-head-wrapper">
        <div>
          <h1>List of Product </h1>
        </div>
      </div>

      <ProductDetailPage productList={prouctList} />
    </div>
  );
};

export default AdminPage;
