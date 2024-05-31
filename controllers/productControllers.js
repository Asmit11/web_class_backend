const path = require('path')
const productModel = require('../models/productModel')

const createProduct = async (req, res) => {
    // check incoming data
    console.log(req.body)
    console.log(req.files)

    // destructuring the body data (json)
    const {
        productName,
        productPrice,
        productCategory,
        productDescription

    } = req.body;

    // validation (task)
    if (!productName || !productPrice || !productCategory || !productDescription) {
        return res.status(400).json({
            "success": false,
            "message": "Enter all fields!"
        })
    }

    // validate if there is image
    if (!req.files || !req.files.productImage) {
        return res.status(400).json({
            "success": false,
            "message": "Image not found!"
        })
    }

    const { productImage } = req.files;

    // upload image
    // 1. Generate the new image name ( abc.png ) -> (213456-abc.png)
    const imageName = `${Date.now()}-${productImage.name}`

    // 2. Make a upload path (/path/upload - directory)
    const imageUploadPath = path.join(__dirname, `../public/products/${imageName}`)

    // 3. Move to the directory (await, try-catch)
    try {
        await productImage.mv(imageUploadPath)


        // save to database
        const newProduct = new productModel({
            productName: productName,
            productPrice: productPrice,
            productCategory: productCategory,
            productDescription: productDescription,
            productImage: imageName
        })
        const product = await newProduct.save()
        res.status(201).json({
            "success": true,
            "message": "Product Created Succesfully!",
            "data": product
        })


    } catch (error) {
        console.log(error)
        res.status(500).json({
            "success": false,
            "message": "Image not found!",
            "error": error
        })
    }



};

// Fetch all products
const getAllProducts = async (req, res) => {

    // try catc
    try {
        const allProducts = await productModel.find({})
        res.status(201).json({
            "success": true,
            "message": "Product Fetched Succesfully",
            "products": allProducts
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            "success": false,
            "message": "Internal server error",
            "error": error
        })
    }

    // fetch all products
    // send respone

}


module.exports = {
    createProduct,
    getAllProducts,
};