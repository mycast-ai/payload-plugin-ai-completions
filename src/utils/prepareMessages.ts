import type { Fields } from 'payload/dist/admin/components/forms/Form/types'
import type { ContextType } from 'payload/dist/admin/components/utilities/DocumentInfo/types'
import type { ChatCompletionMessage } from 'openai/resources/chat'
import { getFieldPathsBaseOnContextOptions } from './getFieldPathsBaseOnContextOptions'
import type { CollectionOptions, FieldOptions, PluginOptions } from '../types'

export const prepareMessages = ({
  fields,
  pluginOptions,
  collectionOptions,
  fieldOptions,
  documentInfo,
  locale,
}: {
  fields: Fields
  pluginOptions: PluginOptions
  collectionOptions: CollectionOptions
  fieldOptions: FieldOptions
  documentInfo: ContextType
  locale: string
}): ChatCompletionMessage[] => {
  const filedsPathsAllowed = getFieldPathsBaseOnContextOptions(
    Object.keys(fields),
    collectionOptions,
  )
  const messages = [
    ...(pluginOptions.defaultMessages ?? []),
    {
      role: 'user',
      content: `Important! Return responses without the use of quotation marks and without unnecessary introductory phrases unless user specifies otherwise!`,
    },
    {
      role: 'system',
      content: `You will generate content for specified collection and field in payloadcms. Generated content will be in ${locale} locale, unless user specifies otherwise!.`,
    },
    {
      role: 'system',
      content: `The collection has singular label: ${documentInfo.collection?.labels.singular} and plural label: ${documentInfo.collection?.labels.plural}, and slug: ${documentInfo.collection?.slug}`,
    },
    {
      role: 'system',
      content: `These are fields values, read them carefully ${JSON.stringify(
        filedsPathsAllowed.map((fieldPath: string) => ({
          path: fieldPath,
          value: fields[fieldPath].value,
          // initialValue: fields[fieldName].initialValue,
          valid: fields[fieldPath].valid,
        })),
      )}.`,
    },
    {
      role: 'system',
      content: `You will generate content for field: ${fieldOptions.path} in collection: ${collectionOptions.slug}.`,
    },
    {
      role: 'user',
      content: `This is the prompt (follow carefully): ${fieldOptions.prompt}`,
    },
  ]
  return messages as ChatCompletionMessage[]
}
