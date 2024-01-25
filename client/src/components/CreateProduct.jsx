import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/esm/Button";
import axiosClient from "../axiosConfig";
import "react-toastify/dist/ReactToastify.css";

export const CreateProduct = (props) => {
  const [name, setName] = useState("");
  const [brand, setBrand] = useState("");
  const [category, setCategory] = useState("");
  const [color, setColor] = useState("");
  const [sizes, setSizes] = useState({ XS: 0, S: 0, M: 0, L: 0, XL: 0 });
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);
  const [userId, setUserId] = useState("");

  const handleClose = () => {
    setShow(false);
    setName("");
    setBrand("");
    setCategory("");
    setColor("");
    setSizes({ XS: 0, S: 0, M: 0, L: 0, XL: 0 });
    setPrice("");
    setQuantity("");
    setDescription("");
    setImage("");
  };
  const handleShow = () => setShow(true);
  const [show, setShow] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("image", image);
    formData.append("name", name);
    formData.append("brand", brand);
    formData.append("category", category);
    formData.append("color", color);
    formData.append("sizes", JSON.stringify(sizes));
    formData.append("price", price);
    formData.append("quantity", quantity);
    formData.append("description", description);
    formData.append("userId", userId);

    try {
      const response = await axiosClient.post("/products/create", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      props.refreshProducts();
      toast.success("Product created successfully!");
      handleClose();
    } catch (error) {
      console.error("Error creating product:", error.message);
      toast.error("Error creating product");
    }
  };

  return (
    <>
      <ToastContainer />
      <Button variant="primary" onClick={handleShow}>
        Create New Product
      </Button>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add New Product</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={(e) => handleSubmit(e)}>
            <Form.Group className="mb">
              <Form.Label>Product Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter text"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb">
              <Form.Label>Category</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter text"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Brand</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter text"
                value={brand}
                onChange={(e) => setBrand(e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb">
              <Form.Label>Color</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter text"
                value={color}
                onChange={(e) => setColor(e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb">
              <Form.Label>Size XS</Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter quantity"
                value={sizes.XS}
                onChange={(e) => setSizes({ ...sizes, XS: e.target.value })}
              />
            </Form.Group>

            <Form.Group className="mb">
              <Form.Label>Size S</Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter quantity"
                value={sizes.S}
                onChange={(e) => setSizes({ ...sizes, S: e.target.value })}
              />
            </Form.Group>

            <Form.Group className="mb">
              <Form.Label>Size M</Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter quantity"
                value={sizes.M}
                onChange={(e) => setSizes({ ...sizes, M: e.target.value })}
              />
            </Form.Group>

            <Form.Group className="mb">
              <Form.Label>Size L</Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter quantity"
                value={sizes.L}
                onChange={(e) => setSizes({ ...sizes, L: e.target.value })}
              />
            </Form.Group>

            <Form.Group className="mb">
              <Form.Label>Size XL</Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter quantity"
                value={sizes.XL}
                onChange={(e) => setSizes({ ...sizes, XL: e.target.value })}
              />
            </Form.Group>

            <Form.Group className="mb">
              <Form.Label>Price</Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter text"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb">
              <Form.Label>Description</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter text"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Image</Form.Label>
              <Form.Control
                type="file"
                name="image"
                onChange={(e) => {
                  const file = e.target.files[0];
                  setImage(file); // Store the file, not the base64 string
                }}
              />
            </Form.Group>
            <Modal.Footer>
              <Button type="submit" className="button-panel-left">
                Create
              </Button>
              <Button variant="danger" onClick={handleClose}>
                Cancel
              </Button>
            </Modal.Footer>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
};
