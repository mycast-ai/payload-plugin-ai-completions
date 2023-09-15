import React from 'react'
import { CollectionConfig } from 'payload/types'
import { Button } from 'payload/components/elements'
import { useAllFormFields } from 'payload/components/forms'
import { useDocumentInfo, useLocale } from 'payload/components/utilities'
import { ChatCompletion } from 'openai/resources/chat'
import { CollectionOptions, FieldOptions, PluginOptions } from '../types'
import { Loader } from './Loader'
import { prepareMessages } from '../utils/prepareMessages'
import { AiCompletionsContext } from './Provider'
import { AiIcon } from './icons/aiIcon'

interface Props {
  pluginOptions: PluginOptions
  collectionOptions: CollectionOptions
  collectionConfig: CollectionConfig
}

export const AutoCompletions: React.FC<Props> = ({
  pluginOptions,
  collectionOptions,
  // collectionConfig,
}) => {
  const [loading, setLoading] = React.useState(false)
  const [fields, dispatchFields] = useAllFormFields()
  const documentInfo = useDocumentInfo()

  const locale = useLocale()

  const { setTotalTokens, setCurrentlyCompleting } = React.useContext(AiCompletionsContext)

  const completionForField = async (fieldOptions: FieldOptions) => {
    const messages = prepareMessages({
      fields,
      pluginOptions,
      collectionOptions,
      fieldOptions,
      documentInfo,
      locale,
    })
    try {
      const result = await fetch(
        `/api/${documentInfo.slug}/${documentInfo.id}/admin/generate-content`,
        {
          method: 'post',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            ...pluginOptions.defaults,
            messages,
          }),
        },
      )

      const completion = (await result.json()) as ChatCompletion
      dispatchFields({
        type: 'UPDATE',
        path: fieldOptions.path,
        value: completion.choices[0].message.content,
      })
      setTotalTokens(completion.usage?.total_tokens ?? 0)
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error(error)
    } finally {
      setCurrentlyCompleting(null)
    }
  }

  const handleClick = async () => {
    setLoading(true)
    for (const fieldOptions of collectionOptions.fields) {
      setCurrentlyCompleting(fieldOptions.path)

      await completionForField(fieldOptions)
    }
    setLoading(false)
  }

  if (!pluginOptions.dashboard?.completeAllButton) return null

  return (
    <div
      style={{
        marginBottom: 0,
      }}
    >
      <Button size="small" buttonStyle="primary" onClick={handleClick} disabled={loading}>
        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '0.5rem',
          }}
        >
          {loading ? <Loader height={16} width={16} /> : <AiIcon height={16} />}
          <small>AUTO COMPLETE</small>
        </div>
      </Button>
    </div>
  )
}
