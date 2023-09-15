import type { ChatCompletionMessageParam } from 'openai/resources/chat'

export const defaultPluginOptions: PluginOptions = {
  enabled: false,
  defaults: {
    model: 'gpt-3.5-turbo-16k',
    temperature: 1,
    frequency_penalty: 0.0,
    presence_penalty: 0.0,
    max_tokens: 2_048,
  },
  dashboard: {
    collapsed: false,
    completeAllButton: true,
    minimalisticUi: true,
  },
  collections: [],
}

interface Defaults {
  /**
   * Model to use for generating content
   * @default 'gpt-3.5-turbo-16k'
   * */
  model?: string
  /**
   * Temperature to use for generating content
   * @default 1
   * */
  temperature?: number
  /**
   * Frequency penalty to use for generating content
   * @default 0.0
   * */
  frequency_penalty?: number
  /**
   * Presence penalty to use for generating content
   * @default 0.0
   * */
  presence_penalty?: number
  /**
   * Max tokens to use for generating content
   * @default 2048
   * */
  max_tokens?: number
}

export interface FieldOptions {
  /**
   * Field path
   * */
  path: string
  /**
   * Prompt to generate content for field
   * */
  prompt: string
  /**
   * change defaults for this field
   * */
  // TODO: make this work
  // defaults?: Defaults
}

type ContextOptions =
  | { omitAllFields: true; denylist?: never; allowlist?: never }
  | { denylist: string[]; omitAllFields?: never; allowlist?: never }
  | { allowlist: string[]; omitAllFields?: never; denylist?: never }

export interface CollectionOptions {
  /**
   * Collection slug
   * */
  slug: string
  /**
   * Fields to generate content for
   * */
  fields: FieldOptions[]
  /**
   * Context to use for generating content
   * */
  context?: ContextOptions
}

export interface DashboardOptions {
  /**
   * Enable or disable dashboard
   * @default true
   * */
  enabled?: boolean
  /**
   * Enable or disable complete all button
   * @default true
   * */
  completeAllButton?: boolean
  /**
   * Enable or disable minilistic ui
   * @default true
   * */
  minimalisticUi?: boolean
  /**
   * Enable or disable collapsed dashboard
   * @default false
   * */
  collapsed?: boolean
}

export interface PluginOptions {
  /**
   * Enable or disable plugin
   * @default false
   */
  enabled?: boolean
  /**
   * Collections to add generate content endpoint to
   * @default []
   * */
  collections: CollectionOptions[]
  /**
   * Defaults to use for generating content
   * */
  defaults?: Defaults
  /**
   * Default messages to use for generating content
   * */
  defaultMessages?: ChatCompletionMessageParam[]
  /**
   * Dashboard options
   * */
  dashboard?: DashboardOptions
}
