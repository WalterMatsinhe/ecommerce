const express = require('express');

const {
  handleImageUpload,
  addProduct,
  editProduct,
  fetchAllProducts,
  deleteProduct
} = require('../../controllers/admin/products-controller');

const { upload } = require('../../helpers/cloudinary');

const router = express.Router();

// Image upload (stays POST)
router.post('/upload-image', upload.single('my_file'), handleImageUpload);

// CREATE
router.post('/add', addProduct);

// READ — ✅ Change from POST to GET
router.get('/all', fetchAllProducts);

// UPDATE — ✅ Change from POST to PUT
router.put('/edit/:id', editProduct);

// DELETE — ✅ Change from POST to DELETE
router.delete('/delete/:id', deleteProduct);

module.exports = router;
