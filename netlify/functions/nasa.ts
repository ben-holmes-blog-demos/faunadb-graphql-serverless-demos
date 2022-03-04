import { ApolloServer, gql } from 'apollo-server-lambda'
import { query as q } from 'faunadb'
import getFaunaClient from '../utils/getFaunaClient'

const faunaClient = getFaunaClient()

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
    async galaxies() {
      const galaxiesRaw = await faunaClient.query(
        q.Map(
          q.Paginate(q.Documents(q.Collection("galaxies"))),
          q.Lambda("galaxyRef", q.Get(q.Var("galaxyRef")))
        )
      )
      try {
        return galaxiesRaw.data.map(galaxyRaw => galaxyRaw.data)
      } catch {
        console.error(`The fauna galaxies query returned malformed data: ${JSON.stringify(galaxiesRaw, null, 2)}`)
        return []
      }
    }
  }
}

const server = new ApolloServer({ typeDefs, resolvers })

exports.handler = server.createHandler()
