import type { CollectionConfig } from 'payload/types'

const Posts: CollectionConfig = {
  slug: 'posts',
  admin: {
    useAsTitle: 'title',
  },
  versions: true,
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Tab 1',
          name: 'tab1',
          fields: [
            {
              name: 'title',
              type: 'text',
            },
            {
              name: 'perex',
              type: 'text',
            },
            {
              name: 'description',
              type: 'text',
            },
            {
              name: 'body',
              type: 'textarea',
            },
            {
              name: 'meta',
              type: 'group',
              fields: [
                {
                  name: 'title',
                  type: 'text',
                },
                {
                  name: 'description',
                  type: 'text',
                },
              ],
            },
          ],
        },
        {
          label: 'Tab 2',
          name: 'tab2',
          fields: [
            {
              type: 'row',
              fields: [
                {
                  name: 'row1',
                  type: 'text',
                },
                {
                  name: 'row2',
                  type: 'text',
                },
              ],
            },
            {
              name: 'title',
              type: 'text',
              required: true,
            },
            {
              name: 'perex',
              type: 'text',
            },
            {
              name: 'description',
              type: 'text',
            },
            {
              name: 'body',
              type: 'textarea',
            },
            {
              name: 'meta',
              type: 'group',
              fields: [
                {
                  name: 'title',
                  type: 'text',
                },
                {
                  name: 'description',
                  type: 'text',
                },
              ],
            },
          ],
        },
        {
          label: 'Tab 3 - no name',

          fields: [
            {
              name: 'title',
              hidden: true,
              type: 'text',
              required: true,
            },
            {
              name: 'arrayFieldTest',
              label: 'Array Field Test',
              type: 'array',
              fields: [
                {
                  name: 'title',
                  type: 'text',
                },
              ],
            },
            {
              type: 'row',
              fields: [
                {
                  name: 'row1',
                  type: 'text',
                },
                {
                  name: 'row2',
                  type: 'text',
                },
              ],
            },
            {
              type: 'collapsible',
              label: 'CollapsibleFIELDS',
              fields: [
                {
                  name: 'collapsibleField1',
                  type: 'text',
                },
                {
                  name: 'collapsibleField2number',
                  type: 'number',
                },
              ],
            },
            {
              name: 'body',
              type: 'textarea',
            },
            {
              name: 'meta',
              type: 'group',
              fields: [
                {
                  name: 'title',
                  type: 'text',
                },
                {
                  name: 'description',
                  type: 'text',
                },
              ],
            },
          ],
        },
      ],
    },
    {
      name: 'slug',
      label: 'Slug',
      type: 'text',
      required: true,
      admin: {
        position: 'sidebar',
      },
    },
  ],
}

export default Posts
