import OpenAI from 'openai'
import type {
  ChatCompletion,
  ChatCompletionCreateParamsBase,
} from 'openai/resources/chat/completions'

export const getChatCompletions = async ({
  messages,
  model,
  frequency_penalty,
  presence_penalty,
  max_tokens,
  temperature,
}: ChatCompletionCreateParamsBase): Promise<ChatCompletion> => {
  const openai = new OpenAI({
    // eslint-disable-next-line no-process-env
    apiKey: process.env.OPENAI_API_KEY,
  })
  const completion = await openai.chat.completions.create({
    messages,
    model,
    frequency_penalty,
    presence_penalty,
    max_tokens,
    temperature,
  })

  return completion
}
