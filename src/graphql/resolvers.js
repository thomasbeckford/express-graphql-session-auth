import userQueries from '../user/queries'
import userMutations from '../user/mutations'
import userResolvers from '../user/resolvers'

const resolvers = {
	Query: {
		me: (_, __, { req, models }) => {
			if (req.session.authenticated) {	
					return {
						message: 'User is authenticated',
						success: true,
						user: req.session.user
					}
				} else {
					return {
						message: 'User is not authenticated',
						success: false,
						user: null
					}
			}
		},
		...userQueries,
	},
	Mutation: {
		...userMutations,
	},
	User: { ...userResolvers }, // Create a custom resolver.
}

export default resolvers
