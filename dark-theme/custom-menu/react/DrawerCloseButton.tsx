import React from 'react'
import { useCssHandles } from 'vtex.css-handles'
import { IconClose } from 'vtex.store-icons'

import { useDrawer } from './DrawerContext'

const CSS_HANDLES = ['closeIconButton'] as const

interface Props {
  size?: number
  type?: 'filled' | 'line'
  text?: string
}

const DrawerCloseButton: React.FC<Props> = ({
  size = 30,
  type = 'line',
  text,
}) => {
  const { close } = useDrawer()

  const handles = useCssHandles(CSS_HANDLES)

  return (
    <button
      className={`${handles.closeIconButton} pa4 pointer bg-transparent transparent bn pointer`}
      onClick={close}
    >
      {text ?? <IconClose size={size} type={type} />}
    </button>
  )
}

export default DrawerCloseButton
