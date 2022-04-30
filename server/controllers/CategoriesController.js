import TransactionsCategories from "../models/CategoriesModel.js";

export const getAllCategories = async (req, res) => {
    try{
        const categories = await TransactionsCategories.findAll({
            attributes:['id', 'name']
        })
        res.json(categories)
    }
    catch(error){
        res.json({message: error.message })
    }
}