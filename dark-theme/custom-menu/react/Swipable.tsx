import React, { ReactElement } from 'react'

import { animate } from './modules/animation'
import parseMeasure from './modules/parseMeasure'
import getPointerPosition from './modules/getPointerPosition'

const CENTER = 'center'
const LEFT = 'left'
const RIGHT = 'right'

type Position = 'center' | 'left' | 'right'

interface Props {
  children: ReactElement
  onSwipeLeft: () => void
  onSwipeRight: () => void
  onTriggerChange: (
    args: {
      type: string
      speed: number
    } | null
  ) => void
  onLockScroll: () => void
  onUnlockScroll: () => void
  onDragStart: () => void
  onDragEnd: () => void
  onSetPosition: (args: {
    element: ReactElement | HTMLDivElement
    offset: number | string
  }) => void
  onUpdateOffset: (offset: number | string) => void
  threshold: number
  enabled: boolean
  rubberBanding: boolean
  element: ReactElement
  position: Position
  className: string
  style: object
  positionRight: number | string
  positionLeft: number | string
  preserveMomentum: boolean
  allowOutsideDrag: boolean
}

export default class Swipable extends React.Component<Props> {
  private dragContainer: React.RefObject<HTMLDivElement>
  private dragStartPos: { x: number; y: number }
  private isDragging: boolean
  private isPointerDown: boolean
  private isScrolling: boolean
  private momentum: number | null
  private momentumTimeout: NodeJS.Timeout | number | null
  private offset: string | number
  private offsetAnimation: { value: number | string }
  private stopAnimation: () => void
  private wasDragging: boolean
  private willTrigger: {
    type: string
    speed: number
  } | null

  private previousDragPositions: Array<{
    x: number
    y: number
    source: string
    timeStamp: number
  }>

  public static defaultProps = {
    onSwipeLeft: null,
    leftTargetPosition: null,
    onSwipeRight: null,
    rightTargetPosition: null,
    onTriggerChange: null,
    position: CENTER,
    onLockScroll: () => {},
    onUnlockScroll: () => {},
    onDragStart: () => {},
    onDragEnd: () => {},
    onSetPosition: ({
      element,
      offset,
    }: {
      element: HTMLDivElement
      offset: number
    }) => {
      const unit = typeof offset === 'number' ? 'px' : ''
      element.style.transform = `translate3d(${offset}${unit},0,0)`
    },
    onUpdateOffset: () => {},
    element: null,
    threshold: 0,
    enabled: true,
    rubberBanding: false,
    style: {},
    positionRight: '100%',
    positionLeft: '-100%',
    preserveMomentum: true,
    allowOutsideDrag: false,
  }

  constructor(props: Props) {
    super(props)

    this.dragContainer = React.createRef()

    this.stopAnimation = () => {}
    this.isPointerDown = false
    this.isDragging = false
    this.isScrolling = false

    /* Used for the click event handler, which is
     * fired after mouseup is fired.
     * See comment on handleClick function */
    this.wasDragging = false

    this.offset = this.getOffsetFromPosition()
    this.offsetAnimation = { value: this.offset }
    this.momentum = null
    this.momentumTimeout = null
    this.dragStartPos = {
      x: 0,
      y: 0,
    }
    this.previousDragPositions = []
    this.willTrigger = null
  }

  public componentDidMount() {
    if (!window || !window.document) {
      return
    }

    window.document.addEventListener('mousedown', this.handleDragStart)
    window.document.addEventListener('touchstart', this.handleDragStart)
    window.document.addEventListener('mousemove', this.handleDragMove)
    window.document.addEventListener('touchmove', this.handleDragMove)
    window.document.addEventListener('mouseup', this.handleDragEnd)
    window.document.addEventListener('touchend', this.handleDragEnd)
    window.document.addEventListener('click', this.handleClick, {
      capture: true,
    })
  }

  public componentWillUnmount() {
    if (!window || !window.document) {
      return
    }

    window.document.removeEventListener('mousedown', this.handleDragStart)
    window.document.removeEventListener('touchstart', this.handleDragStart)
    window.document.removeEventListener('mousemove', this.handleDragMove)
    window.document.removeEventListener('touchmove', this.handleDragMove)
    window.document.removeEventListener('mouseup', this.handleDragEnd)
    window.document.removeEventListener('touchend', this.handleDragEnd)
    window.document.removeEventListener('click', this.handleClick, {
      capture: true,
    })
  }

  /* Prevents click events from firing in the event of
   * firing swipe events. */
  private handleClick = (event: Event) => {
    if (this.wasDragging || this.isPointerDown) {
      event.preventDefault()
      event.stopPropagation()
    }
    this.wasDragging = false
  }

  public componentDidUpdate(prevProps: Props) {
    if (prevProps.enabled && !this.props.enabled && this.isPointerDown) {
      this.isPointerDown = false
    }

    if (prevProps.position !== this.props.position) {
      this.updatePosition()
    }
  }

  private updatePosition = () => {
    if (this.momentumTimeout) {
      clearTimeout(this.momentumTimeout as number)
      this.momentumTimeout = null
    }

    this.offsetAnimation.value = this.offset
    animate({
      object: this.offsetAnimation,
      prop: 'value',
      target: this.getOffsetFromPosition(),
      ...(this.momentum
        ? { speed: this.momentum, acceleration: 1.25 }
        : { duration: 0.25 }),
      onUpdate: (value: string) => {
        this.setOffset(value)
      },
    })

    this.momentum = null
  }

  private getOffsetFromPosition = () => {
    switch (this.props.position) {
      case 'center':
        return 0
      case 'right':
        return this.props.positionRight
      case 'left':
        return this.props.positionLeft
      default:
        return 0
    }
  }

  private handleDragStart = (event: MouseEvent | TouchEvent) => {
    if (this.isPointerDown || !this.props.enabled) {
      return
    }

    if (
      !this.props.allowOutsideDrag &&
      !this.dragContainer.current?.contains(event.target as Node)
    ) {
      return
    }

    const pos = getPointerPosition(event)
    if (pos === null) return

    this.isPointerDown = true
    this.isScrolling = false
    this.isDragging = false
    this.stopAnimation()
    this.dragStartPos = {
      ...pos,
    }
    this.previousDragPositions = [pos]
    this.willTrigger = null
    this.dispatchTriggerChange(this.willTrigger)
  }

  /** Lets the parent know that a swipe event will be triggered if the cursor
   * is released. Useful for displaying UI feedback */
  private dispatchTriggerChange = (
    willTrigger: {
      type: string
      speed: number
    } | null
  ) => {
    const { onTriggerChange } = this.props
    if (onTriggerChange) {
      onTriggerChange(willTrigger)
    }
  }

  private handleDragMove = (event: TouchEvent | MouseEvent) => {
    const {
      onDragStart,
      onLockScroll,
      onSwipeLeft,
      onSwipeRight,
      enabled,
      rubberBanding,
    } = this.props

    if (!this.isPointerDown || this.isScrolling) {
      return
    }

    const pos = getPointerPosition(event)

    if (pos === null) return

    const lastPos = this.previousDragPositions[
      this.previousDragPositions.length - 1
    ]

    if (lastPos && pos.source !== lastPos.source) {
      return
    }

    /* Values to determine if the dragging means either a swipe or a scroll */
    const threshold = {
      x: 15,
      y: 10,
    }

    const distance = {
      x: pos.x - this.dragStartPos.x,
      y: pos.y - this.dragStartPos.y,
    }

    if (!this.isDragging) {
      if (Math.abs(distance.x) >= threshold.x) {
        this.isDragging = true
        onDragStart()
        onLockScroll()
      } else if (Math.abs(distance.y) >= threshold.y) {
        this.isScrolling = true
      }
    } else {
      this.offset = distance.x

      /** Either applies rubberbanding or stops dragging at the limits */
      const limitDragging = (offset: number) => {
        const RUBBER_BANDING_MULTIPLIER = 0.3

        return rubberBanding ? offset * RUBBER_BANDING_MULTIPLIER : 0
      }

      if (!enabled || (!onSwipeLeft && this.offset < 0)) {
        this.offset = limitDragging(this.offset)
      } else if (!enabled || (!onSwipeRight && this.offset > 0)) {
        this.offset = limitDragging(this.offset)
      }

      this.setOffset(this.offset)
      this.previousDragPositions.push(pos)

      const willTrigger = this.checkTrigger()

      // eslint-disable-next-line eqeqeq
      if (this.willTrigger != willTrigger) {
        this.dispatchTriggerChange(willTrigger)
      }

      this.willTrigger = willTrigger
    }
  }

  private setOffset = (offset: number | string) => {
    if (this.dragContainer && this.dragContainer.current) {
      this.props.onSetPosition({
        element: this.props.element || this.dragContainer.current,
        offset,
      })
      this.props.onUpdateOffset(offset)
    }

    this.offset = offset
  }

  private setMomentum = (momentum: number, target: number | string) => {
    const [, targetUnit] = parseMeasure(target) ?? []
    if (this.dragContainer.current == null) return

    if (targetUnit === '%') {
      const bounds = this.dragContainer.current.getBoundingClientRect()
      const { width } = bounds
      this.offset = `${(Number(this.offset) / width) * 100}%`
      momentum = (momentum / width) * 100
    }
    this.momentum = momentum

    /* Lets momentum live only for a brief time. If position changes in this meantime,
     * then momentum is applied. Otherwise it's ignored and a regular transition is done */
    if (this.momentumTimeout) {
      clearTimeout(this.momentumTimeout as number)
    }
    this.momentumTimeout = setTimeout(() => {
      this.momentum = null
      this.momentumTimeout = null
    }, 100)
  }

  /** Checks if the mouse/touch movement at the time of release triggers a
   * swipe, and if so, to which direction */
  private checkTrigger = () => {
    if (!this.props.enabled) {
      return null
    }

    /* Checks the last $samples cursor positions to determine the
     * average speed and direction of movement */
    const samples = 6
    const fps = 60
    const releaseSpeed =
      this.previousDragPositions
        .slice(-samples)
        .map((cur, i, arr) => {
          const last = arr[i - 1]
          if (last == null) {
            return null
          }
          return cur.x - last.x
        })
        .filter(cur => cur != null)
        .reduce((sum: number, cur) => sum + (cur ?? 0) / samples, 0) * fps

    const { onSwipeLeft, onSwipeRight } = this.props

    const triggers = {
      left:
        onSwipeLeft && releaseSpeed < 0 && this.offset < -this.props.threshold,
      right:
        onSwipeRight && releaseSpeed > 0 && this.offset > this.props.threshold,
    }

    if (triggers.left) {
      return {
        type: LEFT,
        speed: releaseSpeed,
      }
    }
    if (triggers.right) {
      return {
        type: RIGHT,
        speed: releaseSpeed,
      }
    }
    return null
  }

  private handleDragEnd = (event: Event) => {
    if (this.isPointerDown && this.isDragging) {
      event.preventDefault()
      event.stopPropagation()
      const trigger = this.checkTrigger()
      if (trigger) {
        switch (trigger.type) {
          case LEFT:
            if (this.props.preserveMomentum) {
              this.setMomentum(trigger.speed, this.props.positionLeft)
            }
            this.props.onSwipeLeft()
            break
          case RIGHT:
            if (this.props.preserveMomentum) {
              this.setMomentum(trigger.speed, this.props.positionRight)
            }
            this.props.onSwipeRight()
            break
          default:
            break
        }
      } else {
        this.offsetAnimation.value = this.offset
        animate({
          object: this.offsetAnimation,
          prop: 'value',
          target: 0,
          duration: 0.2,
          onUpdate: (value: string) => {
            this.setOffset(value)
          },
        })
      }
      this.props.onDragEnd()
      this.props.onUnlockScroll()
    }
    this.isScrolling = false
    this.wasDragging = this.isPointerDown && this.isDragging
    this.isPointerDown = false
  }

  public render() {
    return (
      <div
        aria-hidden
        ref={this.dragContainer}
        style={{
          ...this.props.style,
          transform: `translate3d(${this.getOffsetFromPosition()}, 0, 0)`,
        }}
        className={this.props.className}
      >
        {this.props.children}
      </div>
    )
  }
}
