import type { Server } from 'http'
import mongoose from 'mongoose'
import payload from 'payload'
import { start } from './src/server'

describe('Plugin tests', () => {
  let server: Server
  let postCollection: any

  beforeAll(async () => {
    server = await start({ local: true })
  })

  afterAll(async () => {
    await mongoose.connection.dropDatabase()
    await mongoose.connection.close()
    server.close()
  })

  // Add tests to ensure that the plugin works as expected

  // Example test to check for seeded data
  it('seeds data accordingly', async () => {
    const postsCollectionQuery = await payload.find({
      collection: 'posts',
      sort: 'createdAt',
    })
    expect(postsCollectionQuery.totalDocs).toEqual(1)
  })
})
