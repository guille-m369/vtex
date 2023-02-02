import React, { FC } from 'react'
import { usePixel } from 'vtex.pixel-manager'
import { PixelData } from 'vtex.pixel-manager/react/PixelContext'
import { useCssHandles } from 'vtex.css-handles'

interface Props {
  customPixelEventId?: string
}

const CSS_HANDLES = ['drawerTriggerContainer'] as const

const DrawerTrigger: FC<Props> = ({ children, customPixelEventId }) => {
  const { push } = usePixel()
  const handles = useCssHandles(CSS_HANDLES)

  const handleInteraction = () => {
    if (!customPixelEventId) {
      return
    }

    const pixelEvent: PixelData = {
      id: customPixelEventId,
      event: 'openDrawer',
    }

    push(pixelEvent)
  }

  return (
    <div
      role="button"
      tabIndex={0}
      className={handles.drawerTriggerContainer}
      onClick={handleInteraction}
      onKeyDown={handleInteraction}
    >
      {children}
    </div>
  )
}

export default DrawerTrigger
