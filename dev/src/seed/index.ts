import type { Payload } from 'payload'

export const seed = async (payload: Payload) => {
  payload.logger.info('Seeding data...')

  await payload.create({
    collection: 'users',
    data: {
      email: 'dev@payloadcms.com',
      password: 'test',
      firstName: 'Payload',
      lastName: 'CMS',
    },
  })
  await payload.create({
    collection: 'posts',
    data: {
      title: 'Hello, world!',
      slug: 'hello-world',
      content: 'This is a post',
      tab2: { title: 'tester title' },
    },
  })
}
