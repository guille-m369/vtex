import React, { createContext, useContext } from 'react'

interface DrawerContext {
  isOpen: boolean
  open: () => void
  close: () => void
}

const ctx = createContext<DrawerContext | undefined>(undefined)

export const useDrawer = () => {
  const contextValue = useContext(ctx)

  if (contextValue === undefined) {
    throw new Error('useDrawer must be used inside <Drawer />')
  }

  return contextValue
}

export const DrawerContextProvider: React.FC<{ value: DrawerContext }> = ({
  value,
  children,
}) => {
  return <ctx.Provider value={value}>{children}</ctx.Provider>
}

export default { DrawerContextProvider, useDrawer }
