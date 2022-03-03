import faunadb from 'faunadb'

const faunaClient = new faunadb.Client({
  secret: FAUNA_SECRET,
  domain: "db.us.fauna.com",
});

addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request))
})

const {Create, Collection, Match, Index, Get, Ref, Paginate, Sum, Delete, Add, Select, Let, Var, Update} = faunadb.query;

/**
 * Respond with hello worker text
 * @param {Request} request
 */
async function handleRequest(request) {
  if (request.method === 'POST') {
    if (!request.headers['Content-Type'] === 'application/json') {
      return new Response({ status: 400 })
    }
    const {serialNumber, title, weightLbs} = await request.json()
    try {
      const result = await faunaClient.query(
        Create(
          Collection('Products'),
          {
            data: {
              serialNumber,
              title,
              weightLbs,
              quantity: 0
            }
          }
        )
      );
      return new Response(result.ref.id, {headers: {'Content-Type': 'application/json'}})
    } catch (error) {
      return new Response(error)
    }
  }
  return new Response('Hello worker!', {
    headers: { 'content-type': 'text/plain' },
  })
}
