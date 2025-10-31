const Product = require("../../models/product.model");
const productsHelper = require("../../helpers/products");

module.exports.index = async (req, res) => {
  // Lấy ra sản phẩm nổi bật
  const productsFeatured = await Product.find({
    featured: "1",
    deleted: false,
    status: "active",
  }).limit(6);

  const newProducts = productsHelper.priceNewProducts(productsFeatured);

  // Hết lấy ra sản phẩm nổi bật
  res.render("client/pages/home/index", {
    pageTitle: "Trang chủ",
    productsFeatured: newProducts,
  });
};
