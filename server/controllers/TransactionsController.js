import TransactionsModel from "../models/TransactionsModel.js";
import TransactionsCategories from "../models/CategoriesModel.js"

export const getTransaction = async (req, res) => {
    try{
        const budgets = await TransactionsModel.findAll({
            where:{
                id:req.params.id
            }
        })
        res.json(budgets[0])
    }
    catch(error){
        res.json({message: error.message })
    }
}
//get all
export const getAllTransactions = async (req, res) => {
    try{
        const budgets = await TransactionsModel.findAll({
            include: [{
                model: TransactionsCategories,
                attributes:['name']
            }],
            attributes:['createdAt', 'amount', 'desc', 'isIncome', 'id', 'categoryId']
        })
        res.json(budgets)
    }
    catch(error){
        res.json({message: error.message })
    }
}
//create
export const newTransaction = async (req, res) => {
    try{
        await TransactionsModel.create(req.body)
        res.json({"message": "Transaction created!"})
    }
    catch(error){
        res.json({message: error.message })
    }
}
//update
export const updateTransaction = async (req, res) => {
    try{
        if (req.body.isIncome === undefined){
            await TransactionsModel.update(req.body, {where: {id:req.params.id}})
            res.json({"message": "Transaction updated!"})
        }else{res.json({"message": "Cant update transaction type!"})}        
    }
    catch(error){
        res.json({message: error.message })
    }
}
//delete
export const deleteTransaction = async (req, res) => {
    try{
        await TransactionsModel.destroy({where: {id:req.params.id}})
        res.json({"message": "Transaction deleted!"})
    }
    catch(error){
        res.json({message: error.message })
    }
}