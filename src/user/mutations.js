import bcrypt from 'bcrypt'

module.exports = {
	registerUser: async (_, { input }, { models }) => {
		try {
			const hashedPassword = await bcrypt.hash(input.password, 10)
			const data = {
				first_name: input.first_name,
				last_name: input.last_name,
				phone: input.phone,
				email: input.email,
				password: hashedPassword,
				preferred_name: `${input.first_name} ${input.last_name}`,
			}
			const user = await models.user.create(data)
			return {
				message: 'User created successfully',
				user,
			}
		} catch (e) {
			return { message: `Error: ${e}` }
		}
	},
	updateUser: async (_, { input }, { models }) => {
		try {
			const queryInstance = await models.user.findByPk(input.id)
			queryInstance.update(input)
			if (queryInstance) {
				return {
					user: queryInstance.dataValues,
					message: 'User updated successfully',
				}
			}
			return { message: 'Could not update user' }
		} catch (e) {
			return { message: `Error: ${e}` }
		}
	},
	deleteUser: async (_, { id }, { models }) => {
		try {
			const queryInstance = await models.user.findByPk(id)
			if (queryInstance) {
				await queryInstance.destroy({ returning: true })
				return {
					user: queryInstance.dataValues,
					message: 'User deleted successfully',
				}
			} else {
				return { message: 'Could not delete user' }
			}
		} catch (e) {
			return { message: `Error: ${e}` }
		}
	},
}
