let dataValues = []
let prevValues = []

module.exports = (sequelize, type) => {
	const User = sequelize.define(
		'user',
		{
			first_name: {
				type: type.STRING,
				unique: false,
				allowNull: false,
			},
			last_name: {
				type: type.STRING,
				unique: false,
				allowNull: false,
			},
			preferred_name: {
				type: type.STRING,
				unique: false,
				allowNull: false,
			},
			phone: {
				type: type.STRING,
				unique: false,
				allowNull: true,
			},
			email: {
				type: type.STRING,
				unique: true,
				allowNull: false,
			},
			password: {
				type: type.STRING,
				allowNull: false,
			},
		},
		{
			timestamps: true,
		}
	)

	// DATALOG HOOKS
	User.addHook('afterCreate', (data) => {
		updateDatalog('Created', data._modelOptions.name.plural, null, JSON.stringify(data.dataValues))
	})
	User.addHook('afterUpdate', (data) => {
		Object.keys(data._changed).map((x) => {
			if (x !== 'password' && x !== 'salt') {
				dataValues.push({ [x]: data.dataValues[x] })
				prevValues.push({ [x]: data._previousDataValues[x] })
			}
		})
		if (prevValues.length && dataValues.length)
			updateDatalog(
				'Updated',
				data._modelOptions.name.plural,
				JSON.stringify(prevValues),
				JSON.stringify(dataValues)
			)
	})
	User.addHook('afterDestroy', (data) => {
		updateDatalog('Deleted', data._modelOptions.name.plural, JSON.stringify(data.dataValues), null)
	})

	const updateDatalog = (action, table, oldValues, newValues) => {
		const data = { action, table, oldValues, newValues }
		return sequelize.models.datalog.create(data)
	}

	return User
}
