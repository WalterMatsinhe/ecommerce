const Product = require('../../models/Product');

// GET /api/shop/products/get
const getFilteredProducts = async (req, res) => {
  try {
    let { category = '', brand = '', sortBy = 'price-lowtohigh' } = req.query;
    const filters = {};

    if (category) {
      filters.category = { $in: category.split(',') };
    }

    if (brand) {
      filters.brand = { $in: brand.split(',') };
    }

    let sort = {};
    switch (sortBy) {
      case 'price-lowtohigh':
        sort.price = 1;
        break;
      case 'price-hightolow':
        sort.price = -1;
        break;
      case 'title-atoz':
        sort.title = 1;
        break;
      case 'title-ztoa':
        sort.title = -1;
        break;
      default:
        sort.price = 1;
        break;
    }

    const products = await Product.find(filters).sort(sort);

    res.status(200).json({
      success: true,
      data: products,
    });
  } catch (error) {
    console.error("Error in getFilteredProducts:", error);
    res.status(500).json({
      success: false,
      message: 'Some error occurred while fetching products',
    });
  }
};

// GET /api/shop/products/get/:id
const getProductDetails = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findById(id);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Product not found',
      });
    }

    res.status(200).json({
      success: true,
      data: product,
    });
  } catch (error) {
    console.error("Error in getProductDetails:", error);
    res.status(500).json({
      success: false,
      message: 'Some error occurred while fetching product details',
    });
  }
};

module.exports = { getFilteredProducts, getProductDetails };
