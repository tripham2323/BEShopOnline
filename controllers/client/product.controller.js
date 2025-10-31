const Product = require("../../models/product.model");
const productsHelper = require("../../helpers/products");

// [GET] /products 
module.exports.index = async (req, res) => {
const products = await Product.find({
  status: "active",
  deleted: false,
}).sort({ position: "desc" });

const newProducts = productsHelper.priceNewProducts(products);

// console.log(newProducts);

  res.render("client/pages/products/index", {
    pageTitle: "Danh sách sản phẩm",
    products: newProducts,
  });
};

// [GET] /products/:slug
module.exports.detail = async (req, res) => {
  // console.log(req.params.slug);

  try {
    const find = {
      slug: req.params.slug,
      deleted: false,
      status: "active"
    };

    const product = await Product.findOne(find);

    res.render("client/pages/products/detail", {
      pageTitle: product.title,
      product: product
    });
  } catch (error) {
    res.redirect(`/products`);
  }

};