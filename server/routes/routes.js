import express from "express";
import { getAllTransactions, getTransaction, newTransaction, updateTransaction, deleteTransaction } from "../controllers/TransactionsController.js";
import { getAllCategories } from "../controllers/CategoriesController.js";
const router = express.Router()

router.post('/transactions/', newTransaction)
router.get('/transactions/', getAllTransactions)
router.get('/transactions/cats/', getAllCategories)
router.get('/transactions/:id', getTransaction)
router.put('/transactions/:id', updateTransaction)
router.delete('/transactions/:id', deleteTransaction)

export default router