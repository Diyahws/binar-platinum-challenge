const router = require("express").Router();
const auth = require("../middlewares/auth");
const authController = require("../controllers/authController");
const productController = require("../controllers/productController");
const emailController = require("../controllers/emailController");
const uploadController = require("../controllers/uploadController");

const { uploadSingleImage } = require("../helpers/multer");
// const homeController = require('../controllers/homeController')

//LOGIN REGISTER
router.post("/register", auth.auth_register, authController.registerUser);
router.post("/login", authController.loginUser);

//IMAGE
router.post("/uploadSingle", auth.auth, uploadController.uploadSingle);

//PRODUCT
router.post("/product", auth.auth, productController.addProduct);
router.get("/product", auth.auth, productController.getProd);
router.get("/product/:id", auth.auth, productController.show_single_product);
router.put("/product/:id", auth.auth, productController.update_product);
router.delete("/product/:id", auth.auth, productController.delete_product);

// Send Email Blast
router.get("/send-email", emailController.sendEmail);

module.exports = router;
