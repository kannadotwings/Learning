import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";
import {
  addProduct,
  editProduct,
  viewProduct,
} from "../../Service/productService";
const IMAGE_URL = import.meta.env.VITE_APP_IMAGE_URL;
const EditPage = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [serverImages, setServerImages] = useState([]);
  const [removedImages, setRemovedImages] = useState([]);
  const initialValues = {
    name: "",
    sku: "",
    barcode: "",
    category: "",
    brand: "",
    product_unit: "",
    sale_unit: "",
    purchase_unit: "",
    quantity: "",
    notes: "",
    images: [],
    imagesNew: [],
  };

  const validationSchema = Yup.object().shape({
    name: Yup.string().required("Name is required"),
    sku: Yup.string().required("SKU is required"),
    barcode: Yup.string().required("Barcode is required"),
    category: Yup.string().required("Category is required"),
    brand: Yup.string().required("Brand is required"),
    product_unit: Yup.number().required("Product unit is required"),
    sale_unit: Yup.string().required("Sale unit is required"),
    purchase_unit: Yup.string().required("Purchase unit is required"),
    quantity: Yup.number(),
    notes: Yup.string(),
  });

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: async (values) => {
      setLoading(true);
      const formData = new FormData();
      
      // Corrected this part
      for (let i = 0; i < values.imagesNew.length; i++) {
        formData.append("imagesNew", values.imagesNew[i]);
      }
  
      Object.keys(values).forEach((key) => {
        if (key !== "imagesNew") formData.append(key, values[key]);
      });
  
      // Append removed images list
      formData.append("removedImages", JSON.stringify(removedImages));
  
      try {
        const res = await editProduct(id, formData);
        if (res.status) {
          toast.success(res.message || "Product updated successfully");
          navigate("/product/list");
          formik.resetForm();
        }
      } catch (error) {
        toast.error(error?.response?.data?.message || "Failed to update product");
      } finally {
        setLoading(false);
      }
    },
  });
  

  // Fetch view API on mount
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await viewProduct(id);
        if (res.status && res.data) {
          const { data } = res;
          // Parse & normalize the image path
          const parsedImages = JSON.parse(data.image || "[]").map(
            (img) => img.replace(/\\\\/g, "/") // convert \\ to /
          );
          formik.setValues({
            ...formik.values,
            ...data,
            imagesNew: [], // optional, you can preload image previews if needed
          });
          setServerImages(parsedImages);
        }
      } catch (err) {
        toast.error("Failed to fetch product details");
      } finally {
        setFetching(false);
      }
    };

    fetchProduct();
  }, [id]);
  console.log("serverImages", serverImages);

  const removeServerImage = (imgName) => {
    // Filter it out from the serverImages list
    setServerImages((prev) => prev.filter((img) => img !== imgName));

    // Track it in removedImages
    setRemovedImages((prev) => [...prev, imgName]);
  };

  if (fetching) return <div>Loading product data...</div>;

  return (
    <div className="card p-4 shadow">
      <h3 className="mb-4">Product Edit</h3>
      <form onSubmit={formik.handleSubmit}>
        <div className="row mb-2">
          <div className="col-md-4">
            <label htmlFor="name" className="form-label">
              Name : *
            </label>
            <input
              type="text"
              className="form-control"
              id="name"
              placeholder="Enter name"
              {...formik.getFieldProps("name")}
            />
            {formik.touched.name && formik.errors.name && (
              <div className="text-danger">{formik.errors.name}</div>
            )}
          </div>

          <div className="col-md-4">
            <div className="mb-3">
              <label htmlFor="sku" className="form-label">
                SKU (Barcode) *
              </label>
              <input
                type="text"
                className="form-control"
                id="sku"
                placeholder="Enter SKU (Barcode) "
                {...formik.getFieldProps("sku")}
              />
              {formik.touched.sku && formik.errors.sku && (
                <div className="text-danger">{formik.errors.sku}</div>
              )}
            </div>
          </div>
          <div className="col-md-4">
            <div className="mb-3">
              <label htmlFor="images" className="form-label">
                Multiple images
              </label>
              <input
                type="file"
                accept="image/*"
                className="form-control"
                id="images"
                onChange={(event) => {
                  const files = Array.from(event.target.files);
                  formik.setFieldValue("imagesNew", [
                    ...formik.values.imagesNew,
                    ...files,
                  ]);
                }}
              />
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-md-8">
            <div className="row mb-2">
              <div className="col-md-6">
                <label htmlFor="category" className="form-label">
                  Product Category : *{" "}
                  <span className="text-danger ms-5">Dropdown</span>
                </label>
                <select
                  id="category"
                  className="form-select"
                  {...formik.getFieldProps("category")}
                >
                  <option value="">Select Category</option>
                  <option value="Food">Food </option>
                  <option value="Electronics">Electronics</option>
                </select>
                {formik.touched.category && formik.errors.category && (
                  <div className="text-danger">{formik.errors.category}</div>
                )}
              </div>
              <div className="col-md-6">
                <label htmlFor="brand" className="form-label">
                  Brand : * <span className="text-danger ms-5">Dropdown</span>
                </label>
                <select
                  id="brand"
                  className="form-select"
                  {...formik.getFieldProps("brand")}
                >
                  <option value="">Select Brand</option>
                  <option value="Puma">Puma </option>
                  <option value="Sparx">Sparx</option>
                </select>
                {formik.touched.brand && formik.errors.brand && (
                  <div className="text-danger">{formik.errors.brand}</div>
                )}
              </div>
            </div>
            <div className="row mb-2">
              <div className="col-md-6">
                <label htmlFor="barcode" className="form-label">
                  Barcode symbology : *{" "}
                  <span className="text-danger ms-5">Dropdown</span>
                </label>
                <select
                  id="barcode"
                  className="form-select"
                  {...formik.getFieldProps("barcode")}
                >
                  <option value="">Select Barcode</option>
                  <option value="Code 123">Code 123 </option>
                  <option value="Code 356">Code 356</option>
                </select>
                {formik.touched.barcode && formik.errors.barcode && (
                  <div className="text-danger">{formik.errors.barcode}</div>
                )}
              </div>
              <div className="col-md-6">
                <label htmlFor="brand" className="form-label">
                  Product Unit : *{" "}
                </label>
                <div className="input-group">
                  <input
                    type="number"
                    className="form-control"
                    id="sku"
                    placeholder="Enter product unit"
                    {...formik.getFieldProps("product_unit")}
                  />
                  <button
                    type="button"
                    className="btn btn-primary"
                    onClick={() => {
                      formik.setFieldValue(
                        "product_unit",
                        Number(formik.values.product_unit || 0) + 1
                      );
                    }}
                  >
                    +
                  </button>
                </div>
                {formik.touched.product_unit && formik.errors.product_unit && (
                  <div className="text-danger">
                    {formik.errors.product_unit}
                  </div>
                )}
              </div>
            </div>
            <div className="row mb-2">
              <div className="col-md-6">
                <label htmlFor="sale_unit" className="form-label">
                  Sale Unit : *{" "}
                  <span className="text-danger ms-5">Dropdown</span>
                </label>
                <select
                  id="sale_unit"
                  className="form-select"
                  {...formik.getFieldProps("sale_unit")}
                >
                  <option value="">Select Sale Unit</option>
                  <option value="Box">Box </option>
                  <option value="Bag">Bag</option>
                </select>
                {formik.touched.sale_unit && formik.errors.sale_unit && (
                  <div className="text-danger">{formik.errors.sale_unit}</div>
                )}
              </div>
              <div className="col-md-6">
                <label htmlFor="purchase_unit" className="form-label">
                  Purchase Unit : *{" "}
                  <span className="text-danger ms-5">Dropdown</span>
                </label>
                <select
                  id="purchase_unit"
                  className="form-select"
                  {...formik.getFieldProps("purchase_unit")}
                >
                  <option value="">Select Purchase Unit</option>
                  <option value="Box">Box </option>
                  <option value="Bag">Bag</option>
                </select>
                {formik.touched.purchase_unit &&
                  formik.errors.purchase_unit && (
                    <div className="text-danger">
                      {formik.errors.purchase_unit}
                    </div>
                  )}
              </div>
            </div>
            <div className="row mb-2">
              <div className="col-md-6">
                <label htmlFor="quantity" className="form-label">
                  Quantity Limitation :
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="quantity"
                  placeholder="Enter Quantity Limitation "
                  {...formik.getFieldProps("quantity")}
                />
              </div>
              <div className="col-md-6">
                <label htmlFor="note" className="form-label">
                  Notes
                </label>
                <textarea
                  className="form-control"
                  id="note"
                  placeholder="Enter Notes"
                  {...formik.getFieldProps("notes")}
                />
              </div>
            </div>
          </div>
          <div className="col-md-4">
            {/* Existing Images */}
            <div className="mt-2 d-flex gap-2 flex-wrap">
              {serverImages?.length > 0 &&
                serverImages?.map((img, idx) => (
                  <div key={idx} className="position-relative m-2">
                    <img
                      src={`${IMAGE_URL}/products/${img}`}
                      alt={`preview-${img}`}
                      width="60"
                      className="p-2 border rounded"
                    />
                    <button
                      type="button"
                      className="btn btn-sm btn-danger position-absolute top-0 start-100 translate-middle rounded-circle"
                      style={{
                        width: "20px",
                        height: "20px",
                        padding: "0",
                        fontSize: "12px",
                      }}
                      onClick={() => removeServerImage(img)}
                    >
                      X
                    </button>
                  </div>
                ))}
              {formik.values.imagesNew && (
                <>
                  {formik.values.imagesNew
                    .filter((file) => file instanceof File)
                    .map((file, idx) => (
                      <div key={idx} className="position-relative m-2">
                        <img
                          src={URL.createObjectURL(file)}
                          alt="preview"
                          width="60"
                          className="p-2 border rounded"
                        />
                        {/* Remove button */}
                        <button
                          type="button"
                          className="btn btn-sm btn-danger position-absolute top-0 start-100 translate-middle rounded-circle"
                          style={{
                            width: "20px",
                            height: "20px",
                            padding: "0",
                            fontSize: "12px",
                          }}
                          onClick={() => {
                            const updatedImages =
                              formik.values.imagesNew.filter(
                                (_, i) => i !== idx
                              );
                            formik.setFieldValue("imagesNew", updatedImages);
                          }}
                        >
                          &times;
                        </button>
                      </div>
                    ))}
                </>
              )}
            </div>
          </div>
        </div>
        <div className="d-flex justify-content-end">
          <button
            type="submit"
            disabled={loading}
            className="btn btn-primary col-md-1 mb-2 me-2"
          >
            {loading ? "Saving..." : "Save"}
          </button>
          <button
            type="button"
            className="btn btn-light col-md-1 mb-2"
            onClick={() => {
              formik.resetForm();
              navigate("/product/list");
            }}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditPage;
