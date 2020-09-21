import * as bcrypt from 'bcryptjs'

module.exports = {
	getUsers: async (_, { token }, { models }) => {
		try {
			const users = await models.user.findAll()
			return users
		} catch (e) {
			console.log(`Error: ${e}, `)
			throw e
		}
	},
	getUserById: async (_, { id }, { models }) => {
		try {
			const users = await models.user.findByPk(id)
			return users
		} catch (e) {
			console.log(`Error: ${e}`)
			throw e
		}
	},
	userLogin: async (_, { input }, { models, req }) => {
		try {
			const user = await models.user.findOne({
				where: { email: input.email },
			})
			if (!user) {
				return { message: 'Please check your credentials' }
			}
			const valid = await bcrypt.compare(input.password, user.password)
			if (!valid) {
				return { message: 'Please check your credentials' }
			}

			// load up the session with info from the token.
			req.session.authenticated = true
			req.session.user = user

			return {
				message: 'User logged in successfully',
				user,
			}
		} catch (e) {
			console.log(e)
		}
	},
	userLogout: async (_, { input }, { req }) => {
		req.session.destroy()
		return {
			message: 'Logged out successfully',
			success: true,
		}
	},
}
