import React, { useState } from 'react'
import { useCssHandles, applyModifiers } from 'vtex.css-handles'
import { usePixelEventCallback } from 'vtex.pixel-manager'

interface TriggerLayoutProps {
    customPixelEventId?:string
    children: React.ReactNode
}

const CSS_HANDLES = [
    'layoutContainer'
]

const TriggerLayout: StorefrontFunctionComponent<TriggerLayoutProps> = ({
    customPixelEventId,
    children
}) => {
    const handles = useCssHandles(CSS_HANDLES)

    const [active, setActive] = useState(false)

    const activate = () => {
        setActive(true)
    }

    const deactivate = () => {
        setActive(false)
    }

    const eventId = customPixelEventId ? customPixelEventId : 'trigger-event'

    usePixelEventCallback({
        eventId: eventId,
        handler: activate,
        eventName: 'activate'
    })

    usePixelEventCallback({
        eventId: eventId,
        handler: deactivate,
        eventName: 'deactivate'
    })

    const classes = `${applyModifiers(
        handles.layoutContainer, 
        active ? 'active' : 'inactive'    
    )}`

    return (
        <div className={classes}>
            {children}
        </div>
    )
}

export default TriggerLayout