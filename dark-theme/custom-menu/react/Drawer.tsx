import React, {
  Suspense,
  useReducer,
  MouseEventHandler,
  useMemo,
  useState,
} from 'react'
import { defineMessages } from 'react-intl'
import { IconMenu } from 'vtex.store-icons'
import { useCssHandles } from 'vtex.css-handles'
import { useChildBlock, ExtensionPoint } from 'vtex.render-runtime'
import { usePixelEventCallback } from 'vtex.pixel-manager'
import { PixelData } from 'vtex.pixel-manager/react/PixelContext'
import {
  MaybeResponsiveValue,
  useResponsiveValue,
} from 'vtex.responsive-values'

import Portal from './Portal'
import Overlay from './Overlay'
import useLockScroll from './modules/useLockScroll'
import DrawerCloseButton from './DrawerCloseButton'
import { DrawerContextProvider } from './DrawerContext'
import { isElementInsideLink } from './modules/isElementInsideLink'

const Swipable = React.lazy(() => import('./Swipable'))

interface MenuState {
  isOpen: boolean
  hasBeenOpened: boolean
}

interface MenuAction {
  type: 'open' | 'close'
}

const initialMenuState: MenuState = {
  isOpen: false,
  hasBeenOpened: false,
}

type Position = 'left' | 'right' | 'up' | 'down'
type SlideDirection = 'vertical' | 'horizontal' | 'rightToLeft' | 'leftToRight'
type Height = '100%' | 'auto' | 'fullscreen'
type Width = '100%' | 'auto'
type BackdropMode = 'visible' | 'none'

interface Props {
  actionIconId?: string
  dismissIconId?: string
  position: Position
  width?: Width
  height?: Height
  slideDirection?: SlideDirection
  isFullWidth?: boolean
  maxWidth?: number | string
  children: React.ReactNode
  customIcon?: React.ReactElement
  header?: React.ReactElement
  backdropMode?: MaybeResponsiveValue<BackdropMode>
  customPixelEventId?: PixelData['id']
  customPixelEventName?: PixelData['event']
}

function menuReducer(state: MenuState, action: MenuAction) {
  switch (action.type) {
    case 'open':
      return {
        ...state,
        isOpen: true,
        hasBeenOpened: true,
      }
    case 'close':
      return {
        ...state,
        isOpen: false,
        hasBeenOpened: false,
      }
    default:
      return state
  }
}

const useMenuState = () => {
  const [state, dispatch] = useReducer(menuReducer, initialMenuState)
  const setLockScroll = useLockScroll()

  const setMenuOpen = (value: boolean) => {
    dispatch({ type: value ? 'open' : 'close' })
    setLockScroll(value)
  }

  const openMenu = () => setMenuOpen(true)
  const closeMenu = () => setMenuOpen(false)

  return {
    state,
    openMenu,
    closeMenu,
  }
}

const CSS_HANDLES = [
  'openIconContainer',
  'drawer',
  'opened',
  'closed',
  'moving',
  'drawerContent',
  'childrenContainer',
  'closeIconContainer',
] as const

function Drawer(props: Props) {
  const {
    width,
    header,
    children,
    customIcon,
    isFullWidth,
    maxWidth = 450,
    slideDirection = 'horizontal',
    backdropMode: backdropModeProp = 'visible',
    customPixelEventId,
    customPixelEventName,
  } = props
  const handles = useCssHandles(CSS_HANDLES)
  const backdropMode = useResponsiveValue(backdropModeProp)
  const hasTriggerBlock = Boolean(useChildBlock({ id: 'drawer-trigger' }))
  const hasHeaderBlock = Boolean(useChildBlock({ id: 'drawer-header' }))
  const { state: menuState, openMenu, closeMenu } = useMenuState()
  const { isOpen: isMenuOpen, hasBeenOpened: hasMenuBeenOpened } = menuState
  const [isMoving, setIsMoving] = useState(false)

  // Always add the listener for 'openDrawer' events, since they're sent by
  // the drawer-trigger block.
  usePixelEventCallback({
    eventId: customPixelEventId,
    handler: openMenu,
    eventName: 'openDrawer',
  })

  usePixelEventCallback({
    eventId: customPixelEventId,
    handler: openMenu,
    eventName: customPixelEventName,
  })

  const handleContainerClick: MouseEventHandler<HTMLElement> = event => {
    // target is the clicked element
    // currentTarget is the element which was attached the event (e.g. the container)
    const { target, currentTarget } = event

    if (isElementInsideLink(target as HTMLElement, currentTarget)) {
      closeMenu()
    }
  }

  const direction =
    slideDirection === 'horizontal' || slideDirection === 'leftToRight'
      ? 'left'
      : 'right'

  const swipeHandler = direction === 'left' ? 'onSwipeLeft' : 'onSwipeRight'

  const contextValue = useMemo(
    () => ({
      isOpen: isMenuOpen,
      open: openMenu,
      close: closeMenu,
    }),
    [isMenuOpen, openMenu, closeMenu]
  )

  const overlayVisible = backdropMode === 'visible' && isMenuOpen

  return (
    <DrawerContextProvider value={contextValue}>
      <div
        onClick={openMenu}
        role="presentation"
        aria-hidden={isMenuOpen ? 'false' : 'true'}
        className={`pa4 pointer ${handles.openIconContainer}`}
      >
        {hasTriggerBlock ? (
          <ExtensionPoint id="drawer-trigger" />
        ) : (
          customIcon ?? <IconMenu size={20} />
        )}
      </div>
      <Portal>
        <Overlay visible={overlayVisible} onClick={closeMenu} />
        <Suspense fallback={<React.Fragment />}>
          <Swipable
            {...{
              [swipeHandler]: closeMenu,
            }}
            enabled={isMenuOpen}
            position={isMenuOpen ? 'center' : direction}
            allowOutsideDrag
            onUpdateOffset={value => {
              setIsMoving(!(value === '0%' || value === '-100%'))
            }}
            className={`${handles.drawer} ${
              isMenuOpen ? handles.opened : handles.closed
            } ${isMoving ? handles.moving : ''} ${
              direction === 'right' ? 'right-0' : 'left-0'
            } fixed top-0 bottom-0 bg-base z-999 flex flex-column`}
            style={{
              width: width ?? (isFullWidth ? '100%' : '85%'),
              maxWidth,
              minWidth: 280,
              pointerEvents: isMenuOpen ? 'auto' : 'none',
            }}
          >
            <div
              className={`${handles.drawerContent} overflow-y-auto`}
              style={{
                WebkitOverflowScrolling: 'touch',
              }}
            >
              {hasHeaderBlock ? (
                <ExtensionPoint id="drawer-header" />
              ) : (
                header ?? (
                  <div className={`flex ${handles.closeIconContainer}`}>
                    <DrawerCloseButton />
                  </div>
                )
              )}
              {/* The onClick handler below is done to fix a bug regarding drawers that wouldn't close when
               * navigating to the same page (e.g. from a search result page to another). It is not an element
               * intended to be clicked directly, so there's probably no need for it to have a role and to
               * handle keyboard events specifically */}
              {/* eslint-disable jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions */}
              <div
                className={`${handles.childrenContainer} flex flex-grow-1`}
                onClick={handleContainerClick}
              >
                {hasMenuBeenOpened && children}
              </div>
              {/* eslint-enable jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions */}
            </div>
          </Swipable>
        </Suspense>
      </Portal>
    </DrawerContextProvider>
  )
}

const messages = defineMessages({
  title: {
    defaultMessage: '',
    id: 'admin/editor.drawer.title',
  },
})

Drawer.schema = {
  title: messages.title.id,
}

export default Drawer
