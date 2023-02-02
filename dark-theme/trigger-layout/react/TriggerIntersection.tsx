import React, { useEffect, useRef } from 'react'
import { usePixel } from 'vtex.pixel-manager'
import { PixelData } from 'vtex.pixel-manager/react/PixelContext'

interface TriggerProps {
    defaultState?: boolean
    customPixelEventId?:string
    rootMargin: string,
    threshold: number,
    inverted: boolean,
    children: React.ReactNode
}

const Trigger: StorefrontFunctionComponent<TriggerProps> = ({
    customPixelEventId,
    rootMargin = '0px',
    threshold = 1.0,
    inverted = false,
    children
}) => {
    const { push } = usePixel()

    let firstTimeSended = false

    const sendEvent = (event: string) => {
        const pixelEvent: PixelData = {
            id: customPixelEventId ? customPixelEventId : 'trigger-intersection-event',
            event
        }

        push(pixelEvent)
    }

    const onIntersected = (entries : any) => {
        // Doesn't send the first time, this is to avoid problems when are two TriggerIntersection in the same page 
        if(!firstTimeSended){
            firstTimeSended = true
            return
        }

        entries.forEach((entrie: any) => {
            const isActive = entrie.isIntersecting
            const event = !(inverted && isActive) && (inverted || isActive) ? 'activate' : 'deactivate'
            sendEvent(event)
        });
    }
    
    const options = { root: null, rootMargin, threshold }
    
    const observed = useRef<HTMLDivElement | null >(null)

    useEffect(() => {
        const observer = new IntersectionObserver(onIntersected, options)

        if(observed.current != null){
            observer.observe(observed.current)
        }
    }, [observed])

    return (
        <div ref={observed}>
            {children}
        </div>
    )
}

export default Trigger