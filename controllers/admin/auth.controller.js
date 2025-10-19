const Account = require("../../models/account.model");
const md5 = require("md5");
const systemConfig = require("../../config/system");

// [GET] /admin/auth/login
module.exports.login = async (req, res) => {
  res.render("admin/pages/auth/login", {
    pageTitle: "Đăng nhập",
  });
};

// [POST] /admin/auth/login
module.exports.loginPost = async (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  const user = await Account.findOne({
    email: email,
    deleted: false,
  });

  if (!user) {
    req.flash("error", "Tài khoản không tồn tại");
    res.redirect(`${systemConfig.prefixAdmin}/auth/login`);
    return;
  }

  if (md5(password) != user.password) {
    req.flash("error", "Sai mật khẩu");
    res.redirect(`${systemConfig.prefixAdmin}/auth/login`);
    return;
  }

  if (user.status == "inactive") {
    req.flash("error", "Tài khoản đã bị khoá");
    res.redirect(`${systemConfig.prefixAdmin}/auth/login`);
    return;
  }
  
  res.cookie("token", user.token);
  res.redirect(`${systemConfig.prefixAdmin}/dashboard`);
};
