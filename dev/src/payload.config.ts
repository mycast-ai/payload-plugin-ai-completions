import { buildConfig } from 'payload/config'
import path from 'path'
import Users from './collections/Users'
import Posts from './collections/Posts'

import { aiCompletions } from '../../src'

export default buildConfig({
  serverURL: 'http://localhost:3000',
  admin: {
    user: Users.slug,
    // this is just for development purposes
    webpack: config => {
      const newConfig = {
        ...config,
        resolve: {
          ...config.resolve,
          alias: {
            ...(config?.resolve?.alias || {}),
            react: path.join(__dirname, '../node_modules/react'),
            'react-dom': path.join(__dirname, '../node_modules/react-dom'),
            payload: path.join(__dirname, '../node_modules/payload'),
          },
        },
      }
      return newConfig
    },
  },
  collections: [Posts, Users],
  typescript: {
    outputFile: path.resolve(__dirname, 'payload-types.ts'),
  },
  graphQL: {
    schemaOutputFile: path.resolve(__dirname, 'generated-schema.graphql'),
  },
  plugins: [
    aiCompletions({
      enabled: true,
      dashboard: {
        enabled: true,
        collapsed: false,
        completeAllButton: true,
        minimalisticUi: true,
      },
      collections: [
        {
          slug: Users.slug,
          context: {
            omitAllFields: true,
          },
          fields: [
            {
              path: 'firstName',
              prompt: 'Retrun random first name',
            },
            {
              path: 'lastName',
              prompt: 'Retrun random last name',
            },
            {
              path: 'email',
              prompt: 'Return random email based on first and last name',
            },
          ],
        },
        {
          slug: Posts.slug,
          context: {
            omitAllFields: true,
          },
          fields: [
            {
              path: 'title',
              prompt: 'Write a perex for this post',
            },
            {
              path: 'tab1.title',
              prompt: 'Write a clickbait title for this post',
            },
            {
              path: 'tab1.perex',
              prompt: 'Write a clickbait perex for this post',
            },
            {
              path: 'row2',
              prompt: 'Write random city',
            },
            {
              path: 'tab2.title',
              prompt:
                'Write a clickbait title for this post all words have to start with letter "A"',
            },
            {
              path: 'tab2.row2',
              prompt: 'Write random address',
            },
            {
              path: 'slug',
              prompt: 'Design the best fitting slug for this post',
            },
            {
              path: 'tab2.body',
              prompt: 'Write a blog post body in markdown based on the description.',
            },
            {
              path: 'tab1.meta.title',
              prompt: 'Create SEO friendly title for this post',
            },
            {
              path: 'tab2.meta.description',
              prompt: 'Create SEO friendly description for this post',
            },
            {
              path: 'collapsibleField1',
              prompt: 'Return random number',
            },
          ],
        },
      ],

      defaultMessages: [
        {
          role: 'system',
          content: 'Keep in mind, for field type string you can use generate max 256 characters.',
        },
      ],
    }),
  ],
})
