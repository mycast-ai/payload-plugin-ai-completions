import React from 'react'
import { Bars } from 'react-loader-spinner'

interface Props {
  height?: number
  width?: number
}

export const Loader: React.FC<Props> = ({ height = 12, width = 12 }) => {
  return (
    <Bars
      height={height}
      width={width}
      color="var(--theme-elevation-800)"
      ariaLabel="bars-loading"
      wrapperStyle={{}}
      wrapperClass=""
      visible={true}
    />
  )
}
