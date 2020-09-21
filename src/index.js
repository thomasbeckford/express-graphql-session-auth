import express from 'express'
import expressGraphql from 'express-graphql'
import { join } from 'path'
import { loadSchemaSync, GraphQLFileLoader, addResolversToSchema } from 'graphql-tools'
import resolvers from './graphql/resolvers'
import { models } from './sequelize'
import pino from 'pino'
import session from 'express-session'
import { SESSION_SECRET } from './config'
const redis = require('redis')
// TODO IPLEMENT REDIS..

let RedisStore = require('connect-redis')(session)
let redisClient = redis.createClient()

const logger = pino({ prettyPrint: { colorize: true } })
const schema = loadSchemaSync(join(__dirname, './graphql/*.graphql'), { loaders: [new GraphQLFileLoader()] })
const schemaWithResolvers = addResolversToSchema({ schema, resolvers })

const app = express()

app.use(
	session({
		// store: new RedisStore({ client: redisClient }),
		secret: 'keyboard cat',
		resave: false,
		name: '_session',
		saveUninitialized: true,
	})
)


app.use((req, res, next) => {
	if (!req.session) {
		return next(new Error('oh no')) // handle error
	}
	next() // otherwise continue
})

app.get('/', (req, res) => {
	res.send({
		request: 'OK',
		api: '/api',
		playground: '/graphql',
	})
})

app.use('/graphql', (req, res) => {
	expressGraphql({
		schema: schemaWithResolvers,
		rootValue: global,
		graphiql: true,
		context: { models, req, res },
		pretty: true,
	})(req, res)
})

app.listen(4000)
logger.info('Server running on localhost:4000')
