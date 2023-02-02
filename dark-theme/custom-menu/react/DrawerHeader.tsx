import React from 'react'
import { useCssHandles } from 'vtex.css-handles'

const CSS_HANDLES = ['drawerHeader'] as const

const DrawerHeader: React.FC = ({ children }) => {
  const handles = useCssHandles(CSS_HANDLES)

  return <div className={`flex ${handles.drawerHeader}`}>{children}</div>
}

export default DrawerHeader
