const e = require('express');


const userSignUpController = require("../controller/user/user-signup");
const userSignInUserController = require('../controller/user/user-signin');
const userDetailsController = require('../controller/user/userDetails');
const authToken = require('../middleware/auth');
const userLogout = require('../controller/user/user-logout');
const allUsers = require('../controller/user/all-users');
const updateUser = require('../controller/user/update-user');
const UploadProductController = require('../controller/product/upload-product');
const getProductController = require('../controller/product/getProduct');
const updateProduct = require('../controller/product/updateProduct');
const getProductCategory = require('../controller/product/getSingleProductCategory');
const getCategoryWiseProduct = require('../controller/product/getCategoryWiseProduct');
const getProductDetails = require('../controller/product/getProductDetails');
const addToCart = require('../controller/user/addToCart');
const countProducts = require('../controller/user/countProducts');
const addToCartView = require('../controller/user/addToCartView');
const updateCartQuantity = require('../controller/user/updateCartQuantity');
const deleteCartItem = require('../controller/user/deleteCartItem');
const searchProduct = require('../controller/product/searchProduct');
const filterProduct = require('../controller/product/filterProduct');
const paymentController = require('../controller/order/payment');
const webhook = require('../controller/order/Webhooks');
const orderController = require('../controller/order/orderController');

const router = e.Router();


router.post('/signup',userSignUpController);
router.post('/signin',userSignInUserController);
router.get('/user-details', authToken,userDetailsController);
router.get('/userLoggedOut',userLogout);

//admin panel api's
router.get('/all-users',authToken,allUsers);
router.post('/update-user',authToken,updateUser);

//upload product
router.post('/upload-product',authToken,UploadProductController);

//get product
router.get('/get-product', getProductController);

//update product
router.post('/update-product',authToken,updateProduct);
router.get('/get-all-products',getProductCategory);
router.post('/category-product', getCategoryWiseProduct);
router.post('/product-detail',getProductDetails);
router.get('/search',searchProduct);
router.post('/filterProduct',filterProduct);

//user 
router.post('/addToCart',authToken,addToCart);
router.get('/countProducts',authToken,countProducts);
router.get('/product-view', authToken, addToCartView);
router.post('/updateCartQuantity',authToken,updateCartQuantity);
router.post('/deleteCartItems',authToken,deleteCartItem);

//order
router.post('/payment',authToken,paymentController);
router.post('/webhook', webhook); //api/webhook
router.get('/orders',authToken,orderController);
module.exports = router;