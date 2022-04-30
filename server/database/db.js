import { Sequelize } from "sequelize";

const db = new Sequelize( 'budget_manager', 'root', '123', {host: 'localhost', dialect: 'mysql'})

export default db;