

//add product
const addProduct = async (req, res) => {


    try {
        const { name, description, price, image, category, subCategory, sizes, bestSeller } = req.body

        const image1 = req.files.image1 && req.files.image1[0]
        const image2 = req.files.image2 && req.files.image2[0]
        const image3 = req.files.image3 && req.files.image3[0]
        const image4 = req.files.image4 && req.files.image4[0]

        console.log(name, description, price, image, category, subCategory, sizes, bestSeller);
        console.log(image1, image2, image3, image4);

        res.status(200).json({ success: true, message: 'check console' })

    } catch (error) {
        console.log(error);
        res.status(400).json({ success: false, message: error.message || 'Something went wrong..' })
    }
}

//list all product
const listProduct = async () => {

}

//remove product
const removeProduct = async () => {

}

//single product
const singleProduct = async () => {

}

module.exports = {
    addProduct,
    listProduct,
    removeProduct,
    singleProduct
}