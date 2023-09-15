# Payload Plugin AI Completions

A [Payload CMS](https://payloadcms.com) AI Completions plugin that utilizes OpenAI's API to generate content for fields. It provides an interface for generating content.

## ⚠️ Warning: Work in Progress ⚠️

This plugin is currently a work in progress and may not have all features implemented or may contain bugs. Use at your own risk.

## Installation

```shell
pnpm add @mycast-ai/payload-plugin-ai-completions
# OR
yarn add @mycast-ai/payload-plugin-ai-completions
# OR
npm i @mycast-ai/payload-plugin-ai-completions
```

To install any plugin, simply add it to your `payload.config.ts` in the Plugin array.

```ts
import { aiCompletions } from '@mycast-ai/payload-plugin-ai-completions';

export const config = buildConfig({
  plugins: [
    // minimal configuration
    aiCompletions({
      enabled: true,
      collections: [
        {
          slug: 'your-collection-slug'
          fields: [
            {
              path: 'title',
              prompt: 'Tell me a joke!'
            }
          ]
        }
      ]
    }),
  ]
});
```

## Usage

To use the plugin, make sure the plugin is enabled in the plugin options. You can also configure the default values and dashboard settings as desired. Add collections to the `collections` array to enable content generation for specific collections and fields.

**Make sure to have the `OPENAI_API_KEY` set in your environment variables for the plugin to work seamlessly.**
[How to generate your API KEY ?](https://help.openai.com/en/articles/4936850-where-do-i-find-my-secret-api-key)

## Supported fields

Currently the following field types are fully supported:

```ts
export const SUPPORTED_FIELD_TYPES = [
  'text',
  'textarea',
  'richtext',
  'collapsible',
  'date',
  'email',
  'group',
  'tabs',
  'code',
]
```

## Supported configuration

```javascript
export const config = buildConfig({
  plugins: [
    // You can pass options to the plugin
    aiCompletions({
      enabled: false, // Specify if the plugin is enabled or disabled
      defaults: {
        model: 'gpt-3.5-turbo-16k', // Specify the default model to use for generating content
        temperature: 1, // Specify the default temperature to use for generating content
        frequency_penalty: 0.0, // Specify the default frequency penalty to use for generating content
        presence_penalty: 0.0, // Specify the default presence penalty to use for generating content
        max_tokens: 2048, // Specify the default max tokens to use for generating content
      },
      dashboard: {
        collapsed: false, // Specify if the dashboard is collapsed by default
        completeAllButton: true, // Specify if the "Complete All" button is enabled in the dashboard
        minimalisticUi: true, // Specify if the dashboard has a minimalistic user interface
      },
      collections: [
        {
          slug: 'posts', // Specify the slug of the collection
          fields: [
            {
              path: 'body', // Specify the field path
              prompt: 'Write a blog post about', // Specify the prompt to generate content for the field
            },
          ],
          context: {
            // Context options for generating content
            denylist: ['title', 'description'], // Specify the fields to exclude in the content generation
            // allowlist: ['body']  // or
            // omitAllFields: true
          },
        },
      ],
    })]
})
```

## 📢 Feedback and Bug Reporting

During the beta testing phase, your feedback and bug reports play a crucial role in improving the plugin. If you encounter any issues, have suggestions for improvements, or need assistance, please [open an issue](https://github.com/mycast-ai/payload-plugin-ai-completions/issues) on the GitHub repository. Your contributions will help make the AI Chat Payload Plugin more stable and reliable.

## Contributions

Contributions to this plugin are welcome. If you encounter any issues or have suggestions for improvements, please create a new issue in the repository.

### Internal Development

This repository includes a fully working, self-seeding instance of Payload. To spin up the dev, follow these steps:

1. Clone the repository.
2. Navigate to the root directory of the plugin repository and run `yarn` to install the dependencies.
3. Navigate to the `dev` directory and run `yarn` to install the dev dependencies.
4. Run `yarn dev:seed` to start the dev server and seed data.
5. Open [http://localhost:3000/admin](http://localhost:3000/admin) in your browser.
6. Log in using the username `dev@payloadcms.com` and password `test`.
