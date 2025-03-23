import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { listProducts, deleteProduct } from "../../Service/productService";
import { Modal, Button } from "react-bootstrap";

const ListPage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [products, setProducts] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [productToDelete, setProductToDelete] = useState(null);
  const productsPerPage = 6;

  const fetchProducts = async () => {
    try {
      const res = await listProducts();
      setProducts(res.data);
    } catch (err) {
      console.error(err?.response?.data?.message || "Something went wrong");
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleDeleteClick = (product) => {
    setProductToDelete(product);
    setShowModal(true);
  };

  const confirmDelete = async () => {
    try {
      await deleteProduct(productToDelete.id);
      setProducts(products.filter((p) => p.id !== productToDelete.id));
      setShowModal(false);
    } catch (err) {
      console.error(err?.response?.data?.message || "Delete failed");
    }
  };

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = products.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  const totalPages = Math.ceil(products.length / productsPerPage);

  return (
    <div className="container py-4">
      <div className="card shadow-sm">
        {/* Card Header */}
        <div className="card-header d-flex justify-content-between align-items-center py-3">
          <h5 className="mb-0">Product List</h5>
          <Link to="/product/add" className="btn btn-primary">
            Add Product
          </Link>
        </div>

        {/* Card Body */}
        <div className="card-body">
          <div className="table-responsive">
            <table className="table table-bordered table-hover mb-0">
              <thead className="table-light">
                <tr>
                  <th>#</th>
                  <th>Name</th>
                  <th>SKU</th>
                  <th>Category</th>
                  <th>Brand</th>
                  <th>Quantity</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {currentProducts?.length > 0 ? (
                  <>
                    {currentProducts.map((product, idx) => (
                      <tr key={product.id}>
                        <td>{indexOfFirstProduct + idx + 1}</td>
                        <td>{product.name}</td>
                        <td>{product.sku}</td>
                        <td>{product.category}</td>
                        <td>{product.brand}</td>
                        <td>{product.quantity}</td>
                        <td>
                          <Link
                            to={`/product/edit/${product.id}`}
                            className="btn btn-sm btn-outline-primary me-2"
                          >
                            Edit
                          </Link>
                          <Link
                            to={`/product/view/${product.id}`}
                            className="btn btn-sm btn-outline-secondary me-2"
                          >
                            View
                          </Link>
                          <button
                            onClick={() => handleDeleteClick(product)}
                            className="btn btn-sm btn-outline-danger"
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                  </>
                ) : (
                  <tr>
                    <td colSpan="8" className="text-center py-4">
                      No Products found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Card Footer */}
        <div className="card-footer d-flex justify-content-between align-items-center">
          <span>
            Page {currentPage} of {totalPages}
          </span>
          <div>
            <button
              className="btn btn-outline-secondary btn-sm me-2"
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
            >
              Previous
            </button>
            <button
              className="btn btn-outline-secondary btn-sm"
              onClick={() =>
                setCurrentPage((prev) => Math.min(prev + 1, totalPages))
              }
              disabled={currentPage === totalPages}
            >
              Next
            </button>
          </div>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      <Modal
        show={showModal}
        onHide={() => setShowModal(false)}
        centered={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Confirm Delete</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p className="mb-3">
            Are you sure you want to delete the product{" "}
            <strong>{productToDelete?.name}</strong> ?
          </p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Cancel
          </Button>
          <Button variant="danger" onClick={confirmDelete}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default ListPage;
