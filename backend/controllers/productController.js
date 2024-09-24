const { ProductModel } = require("../models/productModel");

const cloudinary = require("cloudinary").v2

//add product
const addProduct = async (req, res) => {
    try {
        const { name, description, price, category, subCategory, sizes, bestSeller } = req.body;

        if (!name || !description || !price || !category || !subCategory || !sizes || !bestSeller) {
            return res.status(400).json({ success: false, message: 'Required fields are missing' });
        }

        // Accessing uploaded files
        const image1 = req.files.image1 && req.files.image1[0];
        const image2 = req.files.image2 && req.files.image2[0];
        const image3 = req.files.image3 && req.files.image3[0];
        const image4 = req.files.image4 && req.files.image4[0];

        const images = [image1, image2, image3, image4].filter((item) => item !== undefined)

        const imagesURL = await Promise.all(
            images.map( async (item) => {
                let response = await cloudinary.uploader.upload(item.path, {
                    resource_type: "image",
                    transformation: { width: 500, quality: "auto:good" },
                })
                return response.secure_url
            })
        )

        const productData = {
            name,
            description,
            price: Number(price),
            category,
            subCategory,
            sizes: JSON.parse(sizes),
            bestSeller: bestSeller === "true" ? true : false,
            image: imagesURL,
            date: Date.now()
        }

        const newProduct = new ProductModel(productData)
        await newProduct.save()

        // console.log("Product Details:", name, description, price, category, subCategory, sizes, bestSeller);
        // console.log("Uploaded Images:", image1, image2, image3, image4);
        // console.log("Filtered Images:", images);
        // console.log("productData:", productData);

        res.status(200).json({ success: true, product: newProduct, message: 'Product Added Successfully!!' });


    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: error.message || 'Internal Server Error' });
    }
};

//list all product
const listProduct = async (req, res) => {
    try {
        const products = await ProductModel.find({})
        res.status(200).json({ success: true, products });

    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: error.message || 'Internal Server Error' });
    }
}

//remove product
const removeProduct = async (req, res) => {
    try {
        const removedProduct = await ProductModel.findByIdAndDelete(req.body.id);
        if (removedProduct) {
            res.status(200).json({ success: true, removedProduct: removedProduct, message: 'Product removed Successfully!!' });
        }

    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: error.message || 'Internal Server Error' });
    }
}

//single product
const singleProduct = async (req, res) => {
    try {
        const { productId } = req.body

        const singleProduct = await ProductModel.findById(productId)

        if (singleProduct) {
            res.status(200).json({ success: true, singleProduct });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: error.message || 'Internal Server Error' });
    }
}

module.exports = {
    addProduct,
    listProduct,
    removeProduct,
    singleProduct
}