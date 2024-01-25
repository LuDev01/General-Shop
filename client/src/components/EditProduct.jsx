import { useState,useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import { FaEdit } from "react-icons/fa";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import axiosClient from "../axiosConfig";
import "react-toastify/dist/ReactToastify.css";

export const EditProduct = (props) => {
  const [show, setShow] = useState(false);
  const [name, setName] = useState(props.name);
  const [brand, setBrand] = useState(props.brand);
  const [category, setCategory] = useState(props.category);
  const [color, setColor] = useState(props.color);
  const [sizes,setSizes]=useState(props.sizes)
  const [price, setPrice] = useState(props.price);
  const [description, setDescription] = useState(props.description);
  const [image, setImage] = useState(props.image.url);
  const [userId, setUserId] = useState(props.id);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  
  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      const formData = new FormData();
      formData.append("name", name);
      formData.append("brand", brand);
      formData.append("category", category);
      formData.append("color", color);
      formData.append("sizes", JSON.stringify(sizes));
      formData.append("price", price);
      formData.append("description", description);
      formData.append("userId", userId);

      if (image) {
        formData.append("image", image);
      }

      const response = await axiosClient.put(
        `products/${props.id}/edit`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      toast.success("Product edited successfully!");
      props.refreshProducts();
      handleClose();
    } catch (error) {
      console.error("Error editing product:", error.message);
      toast.error("Error editing product");
    }
  };
  return (
    <>
      <ToastContainer />
      <FaEdit onClick={handleShow} />
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Product</Modal.Title>
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
                placeholder="Enter text"
                name="image"
                onChange={(e) => {
                  const file = e.target.files[0];
                  setImage(file);
                }}
              />
            </Form.Group>
            <Modal.Footer>
              <Button type="submit" className="button-panel-left">
                Save Changes
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
