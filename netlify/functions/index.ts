import { ApolloServer, gql } from 'apollo-server-lambda'
import { config } from 'dotenv'
config()

const {
  SUPABASE_URL,
  SUPABASE_JWT_SECRET
} = process.env;

const typeDefs = gql`
type Query { hello: String }
`
const resolvers = {
  Query: { hello: () => "Hello from Apollo on Netlify!" }
}

const server = new ApolloServer({ typeDefs, resolvers })

exports.handler = server.createHandler()