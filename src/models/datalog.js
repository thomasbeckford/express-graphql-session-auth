module.exports = (sequelize, type) => {
	const Datalog = sequelize.define(
		'datalog',
		{
			action: {
				type: type.STRING,
				unique: false,
				allowNull: false,
			},
			table: {
				type: type.STRING,
				unique: false,
				allowNull: false,
			},
			oldValues: {
				type: type.TEXT,
				unique: false,
				allowNull: true,
			},
			newValues: {
				type: type.TEXT,
				unique: false,
				allowNull: true,
			},
		},
		{
			timestamps: true,
		}
	)

	return Datalog
}
