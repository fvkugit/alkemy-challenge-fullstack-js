import db from "../database/db.js";
import { DataTypes } from "sequelize";

const TransactionsCategories = db.define('categories', {
    id: {type: DataTypes.INTEGER, primaryKey:true},
    name: {type: DataTypes.STRING}
})

export default TransactionsCategories
