const systemConfig = require("../../config/system");

module.exports.loginPost = (req, res, next) => {
  if (!req.body.fullName) {
    req.flash("error", "Vui lòng nhập tên!");
    res.redirect(`${systemConfig.prefixAdmin}/auth/login`);

    return;
  }

  if (!req.body.password) {
    req.flash("error", "Vui lòng nhập mật khẩu!");
    res.redirect(`${systemConfig.prefixAdmin}/auth/login`);

    return;
  }

  next();
};
