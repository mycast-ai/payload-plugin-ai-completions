import React, { useContext } from 'react'
import { CollectionConfig } from 'payload/types'
import { Pill } from 'payload/dist/admin/components'
import { useDocumentInfo } from 'payload/components/utilities'
import { AutoCompletions } from './AutoCompletions'
import { CollectionOptions, PluginOptions } from '../types'
import { AiCompletionsContext } from './Provider'
import { Collapsible } from './Collapsible'
import { Checkbox } from './Checkbox'
import { AiIcon } from './icons/aiIcon'

interface Props {
  pluginOptions: PluginOptions
  collectionOptions: CollectionOptions
  collectionConfig: CollectionConfig
}

export const AiCompletionsDashboard: React.FC<Props> = ({
  pluginOptions,
  collectionOptions,
  collectionConfig,
}) => {
  const { minimalistic, setMinimalistic, totalTokens, currentlyCompleting } =
    useContext(AiCompletionsContext)
  const documentInfo = useDocumentInfo()
  if (!pluginOptions.dashboard?.enabled || Object.keys(documentInfo).length === 0) return null

  return (
    <div>
      <Collapsible
        label={
          <>
            <AiIcon />
            &nbsp;&nbsp;Ai Completion
          </>
        }
      >
        <AutoCompletions
          pluginOptions={pluginOptions}
          collectionOptions={collectionOptions}
          collectionConfig={collectionConfig}
        />
        <Pill rounded>{`Total Tokens: ${totalTokens || 'N/A'}`}</Pill>{' '}
        {!!currentlyCompleting && <Pill rounded>{`Completing path: ${currentlyCompleting}`}</Pill>}
        <Pill rounded>{`Model: ${pluginOptions.defaults?.model}`}</Pill>
        <Pill rounded>{`Max Tokens: ${pluginOptions.defaults?.max_tokens}`}</Pill>
        <div style={{ marginTop: '1rem' }}>
          <Checkbox label="Minimalistic" checked={minimalistic} onChange={setMinimalistic} />
        </div>
      </Collapsible>
    </div>
  )
}
