import React from 'react'

interface Props {}

export const ChevronIcon: React.FC<Props> = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="icon icon--chevron collapsible__indicator"
      viewBox="0 0 25 25"
    >
      <path d="M9 10.5l3.5 4 3.5-4" className="stroke"></path>
    </svg>
  )
}
