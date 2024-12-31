const { default: summaryApi } = require("../common")

const fetchCateogryWiseProduct = async (category) => {
    //console.log("fetchProductwisecategory",category);
    const response = await fetch(summaryApi.categoryWiseProduct.url,{
        method: summaryApi.categoryWiseProduct.method,
        headers: {
            "content-type": "application/json"
        },
        body: JSON.stringify({
            category: category
        })
    })

    const dataResponse = await response.json();

    console.log("product category", dataResponse);

    return dataResponse;

}

export default fetchCateogryWiseProduct;