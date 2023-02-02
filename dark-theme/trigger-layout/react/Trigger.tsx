import React, {useState } from 'react'
import { usePixel } from 'vtex.pixel-manager'
import { PixelData } from 'vtex.pixel-manager/react/PixelContext'

type TriggerElement = HTMLDivElement & HTMLLIElement

interface TriggerProps {
    defaultState?: boolean
    customPixelEventId?:string
    children: React.ReactNode
}

const Trigger: StorefrontFunctionComponent<TriggerProps> = ({
    defaultState,
    customPixelEventId,
    children
}) => {
    const { push } = usePixel()

    const [active, setActive] = useState(defaultState || false)

    const sendEvent = (isActive: boolean) => {
        const pixelEvent: PixelData = {
            id: customPixelEventId ? customPixelEventId : 'trigger-event',
            event: isActive ? 'activate' : 'deactivate' 
        }

        push(pixelEvent)
    }
    
    const handleTriggerClick:React.MouseEventHandler<TriggerElement>  = (event) => {
        event.stopPropagation()
        event.preventDefault()
        
        sendEvent(!active)
        setActive(!active)
    }

    return (
        <div onClick={handleTriggerClick}>
            {children}
        </div>
    )
}

export default Trigger