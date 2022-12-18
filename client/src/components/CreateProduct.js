import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { fetchApi } from "../apis";

function CreateProduct({ show, userId, handleClose, getProducts }) {
  const [product, setProduct] = useState({
    name: "",
    price: "",
    desc: "",
    category: "",
  });

  const handleSubmit = async () => {
    if (
      product.name === "" &&
      product.price === "" &&
      product.category === ""
    ) {
      alert("Please Enter details properly");
      return;
    }
    const options = {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ...product, user_id: userId }),
    };
    const response = await fetchApi("products", options);

    if (response.id) {
      handleClose();
      getProducts();
    } else {
      alert(response.message);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
  };

  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add Product Detail</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="mb-3">
            <label>Name</label>
            <input
              type="text"
              className="form-control"
              placeholder="Enter name"
              name="name"
              value={product.name}
              onChange={handleChange}
            />
          </div>
          <div className="mb-3">
            <label>Price</label>
            <input
              type="text"
              className="form-control"
              placeholder="Enter price"
              name="price"
              value={product.price}
              onChange={handleChange}
            />
          </div>
          <div className="mb-3">
            <label>Description</label>
            <textarea
              type="text"
              className="form-control"
              placeholder="Enter description"
              name="desc"
              value={product.desc}
              onChange={handleChange}
            />
          </div>
          <div className="mb-3">
            <label>Category</label>
            <select
              type="category"
              className="form-control"
              placeholder="Enter category"
              name="category"
              value={product.category}
              onChange={handleChange}
            >
              <option value="" label="select" />
              <option value="male" label="Male" />
              <option value="female" label="Female" />
            </select>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSubmit}>
            Save
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default CreateProduct;
