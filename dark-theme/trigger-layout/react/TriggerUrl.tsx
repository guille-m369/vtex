import React, { Fragment } from 'react'

interface TriggerUrlProps {
    triggerUrls: string[]
    children: React.ReactNode
}

const TriggerUrl: StorefrontFunctionComponent<TriggerUrlProps> = ({
    triggerUrls,
    children
}) => {

    let shouldTrigger = false

    const pathname = window?.location?.pathname

    if(pathname){
        const slugs = pathname.split('/')

        triggerUrls.forEach(triggerUrl => {
            if(slugs.find(slug => triggerUrl === slug)) {
                shouldTrigger = true
            }
        })
    }

    return (
        <Fragment>
            {
                shouldTrigger && children
            }
        </Fragment>
    )
}

export default TriggerUrl