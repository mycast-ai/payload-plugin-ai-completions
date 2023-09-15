'use client'

import { useField, useForm } from 'payload/components/forms'

import { Button } from 'payload/components/elements'
import React, { useContext, useEffect } from 'react'
import { ChatCompletion } from 'openai/resources/chat'
import { useDocumentInfo, useLocale } from 'payload/components/utilities'
import { CollectionOptions, FieldOptions, PluginOptions } from '../types'
import { Loader } from './Loader'
import { prepareMessages } from '../utils/prepareMessages'
import { AiCompletionsContext } from './Provider'
import { AiIcon } from './icons/aiIcon'

interface Props {
  pluginOptions: PluginOptions
  collectionOptions: CollectionOptions
  fieldOptions: FieldOptions
  rowLength?: number
}

export const FieldCompletionsWidget: React.FC<Props> = ({
  pluginOptions,
  collectionOptions,
  fieldOptions,
  rowLength,
}) => {
  const [loading, setLoading] = React.useState(false)

  const { getFields } = useForm()
  const { setValue } = useField<string>({ path: fieldOptions.path })
  const { minimalistic, setTotalTokens, currentlyCompleting, setCurrentlyCompleting } =
    useContext(AiCompletionsContext)
  const documentInfo = useDocumentInfo()
  const locale = useLocale()

  if (Object.keys(documentInfo).length === 0) return null

  useEffect(() => {
    if (currentlyCompleting === fieldOptions.path) {
      setLoading(true)
    } else {
      setLoading(false)
    }
  }, [currentlyCompleting, fieldOptions.path])

  const handleClick = async () => {
    setCurrentlyCompleting(fieldOptions.path)
    const messages = prepareMessages({
      fields: getFields(),
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
      setValue(completion.choices[0].message.content)
      setTotalTokens(completion.usage?.total_tokens ?? 0)
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error(error)
    } finally {
      setCurrentlyCompleting(null)
    }
  }

  if (minimalistic) {
    return (
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-end',
          justifyContent: 'space-between',
        }}
      >
        <button
          onClick={handleClick}
          disabled={!!currentlyCompleting}
          style={{
            background: 'transparent',
            border: 'none',
            marginTop: -16,
            marginBottom: 16,
            cursor: 'pointer',
          }}
        >
          {loading ? <Loader height={16} width={16} /> : <AiIcon height={16} />}
        </button>
      </div>
    )
  }

  return (
    <div
      style={{
        border: '1px solid var(--theme-elevation-150)',
        // borderLeft:  '10px solid blue',
        marginTop: -20,
        width: !rowLength ? '100%' : `${100 / rowLength}%`,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'flex-start',
        justifyContent: 'space-between',
        gap: '2rem',
        padding: 10,
        marginBottom: 40,
      }}
    >
      <div>
        <div
          style={{
            color: 'var(--theme-elevation-400)',
          }}
        >
          <small>PROMPT</small>
        </div>
        <div
          style={{
            color: 'var(--theme-elevation-500)',
          }}
        >
          {' '}
          {fieldOptions.prompt}
        </div>
      </div>
      <div
        style={{
          marginTop: -20,
          marginBottom: -30,
        }}
      >
        <Button
          size="small"
          buttonStyle="secondary"
          onClick={handleClick}
          disabled={!!currentlyCompleting}
        >
          <div
            style={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: '0.5rem',
            }}
          >
            {loading ? <Loader /> : <AiIcon height={12} />}
            <small>COMPLETE</small>
          </div>
        </Button>
      </div>
    </div>
  )
}
