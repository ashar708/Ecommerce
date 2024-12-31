const backendDomain = process.env.REACT_APP_BACKEND_URL;


const summaryApi = {
    signUp: {
        url: `${backendDomain}/api/signup`,
        method: "post"
    },
    signIn: {
        url: `${backendDomain}/api/signin`,
        method: "post"
    },
    current_user: {
        url: `${backendDomain}/api/user-details`,
        method: "get"
    },
    logged_out_user: {
        url: `${backendDomain}/api/userLoggedOut`,
        method: "get"
    },
    allUsers: {
        url: `${backendDomain}/api/all-users`,
        method: "get" 
    },
    updateUser : {
        url: `${backendDomain}/api/update-user`,
        method: "post" 
    },
    uploadProduct: {
        url: `${backendDomain}/api/upload-product`,
        method: "post"
    },
    getProduct: {
        url : `${backendDomain}/api/get-product`,
        method: "get"
    },
    updateProduct: {
        url : `${backendDomain}/api/update-product`,
        method: "post"
    },
    productCategory: {
        url: `${backendDomain}/api/get-all-products`,
        method: "get"
    },
    categoryWiseProduct : {
        url: `${backendDomain}/api/category-product`,
        method: "post"
    },
    productDetails : {
        url: `${backendDomain}/api/product-detail`,
        method: "post"
    },
    addToCart: {
        url: `${backendDomain}/api/addToCart`,
        method: "post"
    },
    countProducts: {
        url: `${backendDomain}/api/countProducts`,
        method: "get"
    },
    productView: {
        url: `${backendDomain}/api/product-view`,
        method: "get"
    },
    updateCartQty: {
        url: `${backendDomain}/api/updateCartQuantity`,
        method: "post"
    },
    deleteItem: {
        url: `${backendDomain}/api/deleteCartItems`,
        method: "post"
    },
    search: {
        url: `${backendDomain}/api/search`,
        method: "get"
    },
    filterProd: {
        url: `${backendDomain}/api/filterProduct`,
        method: "post"
    },
    checkout: {
        url: `${backendDomain}/api/payment`,
        method: "post"
    },
    order: {
        url: `${backendDomain}/api/orders`,
        method: "get"
    }
}

export default summaryApi;