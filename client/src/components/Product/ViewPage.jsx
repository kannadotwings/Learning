import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Spinner } from "react-bootstrap";
import { viewProduct } from "../../Service/productService";

const IMAGE_URL = import.meta.env.VITE_APP_IMAGE_URL;
const ViewPage = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await viewProduct(id);
        if (res.status && res.data) {
          const data = res.data;
          const parsedImages = JSON.parse(data.image || "[]").map(
            (img) => img.replace(/\\\\/g, "/") // convert \\ to /
          );
          // Fix JSON parse of image array
          const images = data.image ? parsedImages : [];
          setProduct({ ...data, images });
        }
      } catch (err) {
        console.error("Failed to fetch product", err);
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  if (loading)
    return (
      <div className="text-center my-5">
        <Spinner animation="border" variant="primary" />
      </div>
    );

  if (!product) return <p>Product not found</p>;

  return (
    <div className="container mt-4">
      <div className="card p-4">
        <div className="row align-items-center mb-4">
          <div className="col-6">
            <h2 className="mb-0">Product Details</h2>
          </div>
          <div className="col-6 text-end">
            <Link to="/product/list" className="btn btn-primary">
              Back to List
            </Link>
          </div>
        </div>

        <div className="row mb-3">
          <div className="col-4 fw-bold">Name:</div>
          <div className="col-6">{product.name}</div>
        </div>
        <div className="row mb-3">
          <div className="col-4 fw-bold">SKU:</div>
          <div className="col-6">{product.sku}</div>
        </div>
        <div className="row mb-3">
          <div className="col-4 fw-bold">Category:</div>
          <div className="col-6">{product.category}</div>
        </div>
        <div className="row mb-3">
          <div className="col-4 fw-bold">Brand:</div>
          <div className="col-6">{product.brand}</div>
        </div>
        <div className="row mb-3">
          <div className="col-4 fw-bold">Barcode:</div>
          <div className="col-6">{product.barcode}</div>
        </div>
        <div className="row mb-3">
          <div className="col-4 fw-bold">Product Unit:</div>
          <div className="col-6">{product.product_unit}</div>
        </div>
        <div className="row mb-3">
          <div className="col-4 fw-bold">Sale Unit:</div>
          <div className="col-6">{product.sale_unit}</div>
        </div>
        <div className="row mb-3">
          <div className="col-4 fw-bold">Purchase Unit:</div>
          <div className="col-6">{product.purchase_unit}</div>
        </div>
        <div className="row mb-3">
          <div className="col-4 fw-bold">Quantity:</div>
          <div className="col-6">{product.quantity}</div>
        </div>
        <div className="row mb-3">
          <div className="col-4 fw-bold">Status:</div>
          <div className="col-6">
            {product.status === 1 ? "Active" : "Inactive"}
          </div>
        </div>
        <div className="row mb-3">
          <div className="col-4 fw-bold">Notes:</div>
          <div className="col-6">{product.notes}</div>
        </div>
        <div className="row mb-3">
          <div className="col-4 fw-bold">Images:</div>
          <div className="col-6">
            <div className="d-flex gap-3 flex-wrap">
              {product.images.map((img, index) => (
                <img
                  key={index}
                  src={`${IMAGE_URL}/${img}`}
                  alt={`Product ${index}`}
                  style={{
                    width: "100px",
                    height: "100px",
                    objectFit: "cover",
                    borderRadius: "8px",
                  }}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewPage;
