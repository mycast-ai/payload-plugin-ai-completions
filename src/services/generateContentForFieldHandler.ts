import type { PayloadRequest } from 'payload/types'

import { getChatCompletions } from './getChatCompletions'
// import type { PluginOptions } from '../types'

// eslint-disable-next-line
export default async function generateContentForFieldHandler(
  req: PayloadRequest,
  // eslint-disable-next-line
  res: any,
  // pluginOptions: PluginOptions,
) {
  const attributes = req.body
  const completions = await getChatCompletions(attributes)
  return res.status(200).json(completions)
}
