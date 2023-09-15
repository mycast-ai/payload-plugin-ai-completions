import type { CollectionConfig, Field, UIField } from 'payload/types'

import type { PluginOptions, CollectionOptions, FieldOptions } from '../types'

import { FieldCompletionsWidget } from '../components/FieldCompletionsWidget'
import { AiCompletionsDashboard } from '../components/AiCompletionsDashboard'

export const getAiGenerationField = ({
  pluginOptions,
  collectionOptions,
  fieldOptions,
  originalField,
}: {
  pluginOptions: PluginOptions
  collectionOptions: CollectionOptions
  fieldOptions: FieldOptions
  originalField: Field
  rowLength?: number
}): UIField => {
  return {
    type: 'ui',
    name: 'fieldCompletionsWidget',
    admin: {
      ...originalField.admin,
      components: {
        Field: () =>
          FieldCompletionsWidget({
            pluginOptions,
            collectionOptions,
            fieldOptions,
          }),
      },
    },
  }
}

export const generateSidebarFields = ({
  collectionConfig,
  pluginOptions,
  collectionOptions,
}: {
  collectionConfig: CollectionConfig
  pluginOptions: PluginOptions
  collectionOptions: CollectionOptions
}): UIField => {
  return {
    type: 'ui',
    name: 'name',
    admin: {
      position: 'sidebar',
      components: {
        Field: () => AiCompletionsDashboard({ collectionConfig, pluginOptions, collectionOptions }),
      },
    },
  }
}
