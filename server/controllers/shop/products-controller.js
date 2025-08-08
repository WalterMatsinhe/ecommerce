const Product = require('../../models/Product');

const getFilteredProducts = async (req, res) => {
  try {
    const products = await Product.find({}); // changed from "product" to "products"

    res.status(200).json({
      success: true,
      data: products,
    });

  } catch (error) { // fixed variable name from "e" to "error"
    console.error(error);
    res.status(500).json({
      success: false,
      message: 'Some error occurred',
    });
  }
};

module.exports = { getFilteredProducts };
