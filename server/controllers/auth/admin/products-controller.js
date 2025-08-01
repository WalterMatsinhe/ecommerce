const { imageUploadUtil } = require('../../../helpers/cloudinary');
const Product = require('../../../models/Product');

// Upload image to Cloudinary
const handleImageUpload = async (req, res) => {
  try {
    const file = req.file;

    if (!file) {
      return res.status(400).json({
        success: false,
        message: 'No image file provided',
      });
    }

    const b64 = Buffer.from(file.buffer).toString('base64');
    const url = `data:${file.mimetype};base64,${b64}`;

    const result = await imageUploadUtil(url);

    res.status(200).json({
      success: true,
      result,
    });

  } catch (error) {
    console.error('Image upload error:', error);
    res.status(500).json({
      success: false,
      message: 'Image upload failed',
    });
  }
};

// Add a new product
const addProduct = async (req, res) => {
  try {
    const {
      image,
      title,
      description,
      category,
      brand,
      price,
      salePrice,
      totalStock
    } = req.body;

    const newProduct = new Product({
      image,
      title,
      description,
      category,
      brand,
      price,
      salePrice,
      totalStock,
    });

    await newProduct.save();

    res.status(201).json({
      success: true,
      data: newProduct,
    });
  } catch (e) {
    console.log('Add product error:', e);
    res.status(500).json({
      success: false,
      message: 'Error occurred while adding product',
    });
  }
};

// Fetch all products
const fetchAllProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json({
      success: true,
      data: products,
    });
  } catch (e) {
    console.log('Fetch products error:', e);
    res.status(500).json({
      success: false,
      message: 'Error occurred while fetching products',
    });
  }
};

// Edit a product
const editProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      image,
      title,
      description,
      category,
      brand,
      price,
      salePrice,
      totalStock
    } = req.body;

    const product = await Product.findById(id);
    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Product not found',
      });
    }

    product.image = image || product.image;
    product.title = title || product.title;
    product.description = description || product.description;
    product.category = category || product.category;
    product.brand = brand || product.brand;
    product.price = price || product.price;
    product.salePrice = salePrice || product.salePrice;
    product.totalStock = totalStock || product.totalStock;

    await product.save();

    res.status(200).json({
      success: true,
      data: product,
    });
  } catch (e) {
    console.log('Edit product error:', e);
    res.status(500).json({
      success: false,
      message: 'Error occurred while editing product',
    });
  }
};

// Delete a product
const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;

    const product = await Product.findByIdAndDelete(id);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Product not found',
      });
    }

    res.status(200).json({
      success: true,
      message: 'Product deleted successfully',
    });
  } catch (e) {
    console.log('Delete product error:', e);
    res.status(500).json({
      success: false,
      message: 'Error occurred while deleting product',
    });
  }
};

module.exports = {
  handleImageUpload,
  addProduct,
  fetchAllProducts,
  editProduct,
  deleteProduct,
};
