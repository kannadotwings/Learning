const models = require("../models");
const fs = require("fs");

// List with pagination
const productList = async (req, res) => {
  try {
    const rows = await models.product.findAll({
      where: { status: 1 },
      order: [["id", "DESC"]],
    });

    if (rows.length === 0) {
      return res.status(404).json({
        status: false,
        message: "No products found",
      });
    }
    return res.status(200).json({
      status: true,
      message: "Products list fetched successfully",
      data: rows,
    });
  } catch (error) {
    console.error("An error occurred while fetching product list:", error);
    res.status(500).json({
      status: false,
      message: "An error occurred while fetching product list",
    });
  }
};

// Add Product
const productAdd = async (req, res) => {
  try {
    const imagePaths = req.files.map(file => file.path);

    const created = await models.product.create({
      ...req.body,
      image: JSON.stringify(imagePaths),
      status: 1
    });

    return res.status(201).json({
      status: true,
      message: "Product added successfully",
      data: created,
    });
  } catch (error) {
    console.error("An error occurred while adding product:", error);
    res.status(500).json({
      status: false,
      message: "An error occurred while adding product",
    });
  }
};

// View Product
const productView = async (req, res) => {
  try {
    const item = await models.product.findByPk(req.params.id);

    if (!item) {
      return res.status(404).json({
        status: false,
        message: "Product not found",
      });
    }

    return res.status(200).json({
      status: true,
      message: "Product details fetched successfully",
      data: item,
    });
  } catch (error) {
    console.error("An error occurred while fetching product details:", error);
    res.status(500).json({
      status: false,
      message: "An error occurred while fetching product details",
    });
  }
};

// Edit Product
const productEdit = async (req, res) => {
  try {
    const item = await models.product.findByPk(req.params.id);

    if (!item) {
      return res.status(404).json({
        status: false,
        message: "Product not found",
      });
    }

    if (req.files.length > 0) {
      const oldImages = JSON.parse(req.body.removedImages || '[]');
      oldImages.forEach(img => {
        if (fs.existsSync(img)) {
          fs.unlinkSync(img);
        }
      });
    }

    const imagePaths = req.files.length > 0 ? req.files.map(file => file.path) : JSON.parse(item.image || '[]');

    await item.update({
      ...req.body,
      image: JSON.stringify(imagePaths)
    });

    return res.status(200).json({
      status: true,
      message: "Product updated successfully",
      data: item,
    });
  } catch (error) {
    console.error("An error occurred while updating product:", error);
    res.status(500).json({
      status: false,
      message: "An error occurred while updating product",
    });
  }
};

// Delete Product
const productDelete = async (req, res) => {
  try {
    const item = await models.product.findByPk(req.params.id);

    if (!item) {
      return res.status(404).json({
        status: false,
        message: "Product not found",
      });
    }

    await item.update({status : 0});

    return res.status(200).json({
      status: true,
      message: "Product deleted successfully",
    });
  } catch (error) {
    console.error("An error occurred while deleting product:", error);
    res.status(500).json({
      status: false,
      message: "An error occurred while deleting product",
    });
  }
};

module.exports = {
  productList,
  productAdd,
  productView,
  productEdit,
  productDelete
};
