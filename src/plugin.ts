import type { Field, CollectionConfig } from 'payload/types'
import type { Config } from 'payload/config'
import type { PayloadRequest } from 'payload/dist/types'
import { tabHasName } from 'payload/dist/fields/config/types'
import { generateSidebarFields, getAiGenerationField } from './fields/index'
import generateContentForFieldHandler from './services/generateContentForFieldHandler'
import type { PluginOptions, CollectionOptions } from './types'
import { defaultPluginOptions } from './types'
import { AiCompletionsProvider } from './components/Provider'
import deepmerge from './utils/deepmerge'

export const FIELD_TYPES = [
  'text',
  'number',
  'email',
  'textarea',
  'checkbox',
  'date',
  'block',
  'group',
  'radio',
  'relationship',
  'array',
  'richtext',
  'select',
  'upload',
  'code',
  'json',
  'point',
  'row',
  'collapsible',
  'tabs',
  'ui',
]

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

const processFields = (
  fields: Field[],
  collectionOptions: CollectionOptions,
  pluginOptions: PluginOptions,
  prefix: string,
): Field[] =>
  fields.reduce((acc: Field[], field: Field) => {
    const { type } = field

    if (!SUPPORTED_FIELD_TYPES.includes(type)) {
      // eslint-disable-next-line no-console
      console.warn(`WARNING: Plugin AI Completions does not support ${field.type} fields yet`)
      return acc.concat(field)
    }

    if (type === 'tabs' && field.tabs) {
      return acc.concat({
        ...field,
        tabs: field.tabs.map(tab => ({
          ...tab,
          fields: processFields(
            tab.fields,
            collectionOptions,
            pluginOptions,
            tabHasName(tab) ? `${prefix}${tab.name}.` : prefix,
          ),
        })),
      })
    }

    // @ts-expect-error its ok ;)
    if (field.hidden) return acc

    // This is commented as a temporary solution to avoid breaking the layout for ROW type fields.
    /*
    if (type === 'row' && field.fields.length > 0) {
      // eslint-disable-next-line no-console
      console.warn(
        `WARNING: Plugin AI Completions does not have full support for ${field.type} type fields yet. It may broke your layout.`,
      )
      return acc.concat({
        ...field,
        fields: processFields(field.fields, collectionOptions, pluginOptions, prefix),
      })
    }
   */

    if (type === 'collapsible' && field.fields.length > 0) {
      return acc.concat({
        ...field,
        fields: processFields(field.fields, collectionOptions, pluginOptions, prefix),
      })
    }

    if (type === 'group' && field.fields.length > 0) {
      return acc.concat({
        ...field,
        fields: processFields(
          field.fields,
          collectionOptions,
          pluginOptions,
          `${prefix}${field.name}.`,
        ),
      })
    }

    // @ts-expect-error its ok ;)
    const path = `${prefix}${field.name ?? ''}`

    const fieldOptions = collectionOptions.fields?.find(f => f.path === path)

    if (!fieldOptions) return acc.concat(field)

    return acc.concat(
      field,
      getAiGenerationField({
        pluginOptions,
        collectionOptions,
        fieldOptions: { ...fieldOptions, path },
        originalField: field,
      }),
    )
  }, [])

export const aiCompletions =
  (userPluginOptions: PluginOptions) =>
  (incomingConfig: Config): Config => {
    const pluginOptions = deepmerge(defaultPluginOptions, userPluginOptions)

    if (!pluginOptions.enabled) return incomingConfig

    const processCollection = (collectionConfig: CollectionConfig): CollectionConfig => {
      const collectionOption = pluginOptions.collections?.find(
        pC => pC.slug === collectionConfig.slug,
      )
      if (!collectionOption) return collectionConfig

      return {
        ...collectionConfig,
        fields: [
          ...processFields(collectionConfig.fields, collectionOption, pluginOptions, ''),
          generateSidebarFields({
            collectionConfig,
            pluginOptions,
            collectionOptions: collectionOption,
          }),
        ],
        endpoints: [
          ...(collectionConfig.endpoints ?? []),
          {
            path: '/:id/admin/generate-content',
            method: 'post',
            handler: (req: PayloadRequest, res: Response) =>
              generateContentForFieldHandler(req, res),
          },
        ],
      }
    }

    return {
      ...incomingConfig,
      collections: incomingConfig.collections?.map(processCollection),
      admin: {
        ...incomingConfig.admin,
        components: {
          ...incomingConfig.admin?.components,
          providers: [
            ...(incomingConfig.admin?.components?.providers ?? []),
            ({ children }: { children: React.ReactNode }) =>
              AiCompletionsProvider({ children, pluginOptions }),
          ],
        },
      },
    }
  }
