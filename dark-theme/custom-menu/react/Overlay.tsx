import React, { RefForwardingComponent } from 'react'
import { useCssHandles, applyModifiers } from 'vtex.css-handles'

interface Props {
  visible: boolean
  onClick(event: React.MouseEvent | React.TouchEvent): void
}

const CSS_HANDLES = ['overlay'] as const

const Overlay: RefForwardingComponent<HTMLDivElement, Props> = (
  { visible, onClick }: Props,
  ref
) => {
  const handles = useCssHandles(CSS_HANDLES)
  const ariaHidden = visible ? 'false' : 'true'
  return (
    <div
      ref={ref}
      aria-hidden={ariaHidden}
      role="presentation"
      onClick={onClick}
      style={{
        opacity: visible ? 0.5 : 0,
        pointerEvents: visible ? 'auto' : 'none',
        transition: 'opacity 300ms',
      }}
      className={`${applyModifiers(
        handles.overlay,
        visible ? 'visible' : ''
      )} bg-base--inverted z-999 fixed top-0 bottom-0 left-0 right-0`}
    />
  )
}

export default React.forwardRef(Overlay)
