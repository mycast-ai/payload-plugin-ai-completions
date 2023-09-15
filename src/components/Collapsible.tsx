import React, { useContext } from 'react'

import { Chevron } from 'payload/dist/admin/components'
import { AiCompletionsContext } from './Provider'

interface Props {
  children: React.ReactNode
  label: React.ReactNode
}

export const Collapsible: React.FC<Props> = ({ label, children }) => {
  const { dashboardCollapsed, setDashboardCollapsed } = useContext(AiCompletionsContext)
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        border: '1px solid var(--theme-elevation-150)',
      }}
    >
      <div
        style={{
          borderBottom: dashboardCollapsed ? 'none' : '1px solid var(--theme-elevation-150)',
          cursor: 'pointer',
        }}
        onClick={() => {
          setDashboardCollapsed(!dashboardCollapsed)
        }}
      >
        <header
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <h4
            style={{
              padding: '1rem',
              marginBottom: 0,
            }}
          >
            {label}
          </h4>
          <div
            className="collapsible__indicator"
            onClick={() => {
              setDashboardCollapsed(!dashboardCollapsed)
            }}
            style={{
              cursor: 'pointer',
              padding: '1rem',
              transform: dashboardCollapsed ? 'rotate(180deg)' : 'rotate(0deg)',
              transition: 'transform 0.3s ease',
            }}
          >
            <Chevron />
          </div>
        </header>
      </div>
      <div
        style={{
          height: dashboardCollapsed ? 0 : 'auto',
          overflow: 'hidden',
          transition: 'height 3s ease',
        }}
      >
        <div
          style={{
            padding: '0 1rem 1rem 1rem',
          }}
        >
          {children}
        </div>
      </div>
    </div>
  )
}
