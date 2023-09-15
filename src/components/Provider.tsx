import React, { createContext, useState } from 'react'
import { PluginOptions } from '../types'

interface Props {
  children: React.ReactNode
  pluginOptions: PluginOptions
}

export interface AiCompletionsContextType {
  minimalistic: boolean
  // eslint-disable-next-line no-unused-vars
  setMinimalistic: (value: boolean) => void
  dashboardCollapsed: boolean
  // eslint-disable-next-line no-unused-vars
  setDashboardCollapsed: (value: boolean) => void
  totalTokens: number
  // eslint-disable-next-line no-unused-vars
  setTotalTokens: (value: number) => void
  currentlyCompleting: string | null
  // eslint-disable-next-line no-unused-vars
  setCurrentlyCompleting: (value: string | null) => void
}

export const AiCompletionsContext = createContext<AiCompletionsContextType>({
  minimalistic: false,
  // eslint-disable-next-line no-unused-vars
  setMinimalistic: (value: boolean) => {},
  dashboardCollapsed: false,
  // eslint-disable-next-line no-unused-vars
  setDashboardCollapsed: (value: boolean) => {},
  totalTokens: 0,
  // eslint-disable-next-line no-unused-vars
  setTotalTokens: (value: number) => {},
  currentlyCompleting: null,
  // eslint-disable-next-line no-unused-vars
  setCurrentlyCompleting: (value: string | null) => {},
})

export const AiCompletionsProvider: React.FC<Props> = ({ children, pluginOptions }) => {
  const [minimalistic, setMinimalistic] = useState(!!pluginOptions.dashboard?.minimalisticUi)
  const [totalTokens, setTotalTokens] = useState(0)
  const [dashboardCollapsed, setDashboardCollapsed] = useState(!!pluginOptions.dashboard?.collapsed)
  const [currentlyCompleting, setCurrentlyCompleting] = useState<string | null>(null)
  //  const [modalOpen, setModalOpen] = useState(false)

  return (
    <div id="plugin-ai-completion-modal">
      <AiCompletionsContext.Provider
        value={{
          minimalistic,
          setMinimalistic,
          dashboardCollapsed,
          setDashboardCollapsed,
          totalTokens,
          setTotalTokens,
          currentlyCompleting,
          setCurrentlyCompleting,
        }}
      >
        {children}
      </AiCompletionsContext.Provider>
    </div>
  )
}
