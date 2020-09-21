import Sequelize from 'sequelize'
import UserModel from './models/user'
import DatalogModel from './models/datalog'
import pino from 'pino'
const logger = pino({ prettyPrint: { colorize: true } })

const sequelize = new Sequelize('express_graphql', 'root', 'password', {
	host: 'localhost',
	dialect: 'mysql',
	pool: {
		max: 10,
		min: 0,
		acquire: 30000,
		idle: 10000,
	},
	logging: false,
})
// Add models
UserModel(sequelize, Sequelize)
DatalogModel(sequelize, Sequelize)

//  => force true run drop tables
sequelize.sync({ force: false }).then(() => {
	logger.info('Migration: database & tables created!')
})

module.exports = {
	models: sequelize.models,
}
