const mockGalaxies = require('./mockGalaxies')
const getFaunaClient = require('./getFaunaClient')
const { query: q } = require('faunadb')

;(async function seed() {
  const faunaClient = getFaunaClient()
  await faunaClient.query(
    q.CreateCollection({ name: 'galaxies' })
  )
  console.log("🗄 Generated galaxies collection")

  await faunaClient.query(
    q.Map(
      mockGalaxies,
      q.Lambda(
        'galaxy',
        q.Create(
          q.Collection('galaxies'),
          { data: q.Var('galaxy') }
        )
      )
    )
  )

  console.log("📝 Generated galaxy data")
})()