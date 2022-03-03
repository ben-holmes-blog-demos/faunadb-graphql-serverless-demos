import { ApolloServer, gql } from 'apollo-server-lambda'
import { Client, Create, Collection } from 'faunadb'
import { config } from 'dotenv'
import mockGalaxies from './mockGalaxies'

config()

const faunaClient = new Client({
  secret: process.env.FAUNA_SECRET,
  domain: "db.us.fauna.com",
});

const typeDefs = gql`
type Galaxy {
  title: String,
  description: String,
  credits: String,
  imageUrl: String
}
type Query {
  galaxies: [Galaxy!]!
}
`
const resolvers = {
  Query: {
    galaxies() {
      return mockGalaxies
    }
  }
}

const server = new ApolloServer({ typeDefs, resolvers })

exports.handler = server.createHandler()
