const express = require('express');
const router = express.Router();
const productController = require('../controller/productController');
const multer = require('multer');
const path = require('path');
const { authVerify } = require('../middleware/authVerify');

// Multer config for multiple image uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/products/');
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    const filename = uniqueSuffix + path.extname(file.originalname);
    cb(null, filename);
  }
});

const upload = multer({ storage: storage });
// Routes
router.get('/list', authVerify , productController.productList);
router.post('/add', authVerify , upload.array('images', 5), productController.productAdd);
router.get('/view/:id', authVerify ,  productController.productView);
router.put('/edit/:id', authVerify , upload.array('imagesNew', 5), productController.productEdit);
router.post('/delete/:id', authVerify ,  productController.productDelete);

module.exports = router;
