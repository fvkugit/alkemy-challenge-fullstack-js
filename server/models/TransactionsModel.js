import db from "../database/db.js";
import TransactionsCategories from "../models/CategoriesModel.js"
import { DataTypes } from "sequelize";

const TransactionsModel = db.define('movements', {
    amount: {type: DataTypes.INTEGER},
    categoryId: {type: DataTypes.INTEGER},
    desc: {type: DataTypes.STRING},
    isIncome: {type: DataTypes.BOOLEAN},
})

TransactionsCategories.hasMany(TransactionsModel,{foreignKey:{
    name: 'id',
    type: DataTypes.UUID,
    allowNull:false
}})
TransactionsModel.belongsTo(TransactionsCategories)

export default TransactionsModel
