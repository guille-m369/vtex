import React, { FunctionComponent } from 'react'
// import style from './styles/OneBlock.css'
import { useCssHandles } from 'vtex.css-handles'
import { Link, useRuntime } from 'vtex.render-runtime'

const CSS_HANDLES = [
  'mainContainer',
  'label',
  'title',
  'copy',
  "copy2",
  'ctaContainer',
  'ctaButton',
  'textContainer',
  'bottomRightContainer',
]

interface OneBlockProps {
  mobileTextPosition: string
  desktopTextPosition: string
  label: string
  title: string
  copy: string
  copy2: string
  ctaArray: {
    text: string
    url: string
  }[]
  desktopTextLocation: string
  imgUrl: string
  mobileImgUrl: string
  centerText: boolean
  titleImg: string
  height: string
  textWidth: string
  stackedButtons: boolean
  labelImg: string
}

interface MobileOneBlockProps {
  textPosition: string
  label: string
  title: string
  copy: string
  copy2:string
  ctaArray: {
    text: string
    url: string
  }[]
  imgUrl: string
  centerText: boolean
  titleImg: string
  height: string
  stackedButtons: boolean
  labelImg: string
}

const OneBlock: StorefrontFunctionComponent<OneBlockProps> = ({
  mobileTextPosition,
  desktopTextPosition,
  label,
  copy,
  copy2,
  title,
  ctaArray,
  desktopTextLocation,
  imgUrl,
  mobileImgUrl,
  centerText,
  titleImg,
  height,
  textWidth,
  stackedButtons,
  labelImg,
}) => {
  console.log(desktopTextLocation)

  const handles = useCssHandles(CSS_HANDLES)
  const { deviceInfo } = useRuntime()
  const { type } = deviceInfo
  const isMobile = type != "desktop" ? true : false;

  if (isMobile)
    return (
      <MobileOneBlock
        textPosition={mobileTextPosition}
        label={label}
        title={title}
        copy={copy}
        copy2={copy2}
        ctaArray={ctaArray}
        imgUrl={mobileImgUrl}
        centerText={centerText}
        titleImg={titleImg}
        height={height}
        stackedButtons={stackedButtons}
        labelImg={labelImg}
      />
    )
  console.log(height)

  return (
    <div style={{maxWidth: "1920px", margin:"0 auto"}}>
    <div
      className={`${handles.mainContainer} flex relative w-100
       ${
         desktopTextLocation === 'left'
           ? 'justify-start'
           : desktopTextLocation === 'right'
           ? 'justify-end'
           : 'justify-center'
       }
      `}
      style={{
        // height: 'calc(650px / 1920px * 100%)',
        background: `url(${imgUrl})`,
        backgroundSize: 'cover',
        maxWidth: '1920px',
        paddingTop: "33.8541%",
        maxHeight: '650px'
      }}
    >
      <div
        className={`${handles.textContainer}
       ${
         desktopTextPosition === 'start'
           ? 'justify-start'
           : desktopTextPosition === 'end'
           ? 'justify-end'
           : 'justify-center'
       }
        flex flex-column absolute  top-0  h-100 pa7
       ${centerText ? 'items-center' : ''}
       `}
        style={{ width: textWidth }}
      >
        <div className={`${handles.label} ${centerText ? 'tc' : ''} mb3`}>
          {labelImg ? (
            <img src={labelImg} alt="Banner Image Title" />
          ) : (
            <div
              className={`${centerText ? 'tc' : ''}`}
              dangerouslySetInnerHTML={{ __html: label }}
            ></div>
          )}
        </div>
        <div className={`${handles.title} f2`}>
          {titleImg ? (
            <img src={titleImg} alt="Banner Image Title" />
          ) : (
            <div
              className={`${centerText ? 'tc' : ''}`}
              dangerouslySetInnerHTML={{ __html: title }}
            ></div>
          )}
        </div>
        <div className={`${handles.copy} ${centerText ? 'tc' : ''} mt3`}>
          {copy}
        </div>
        <div className={`${handles.copy2} ${centerText ? 'tc' : ''} mt3`}>
          {copy2}
        </div>
        <div className={`${handles.ctaContainer} mv5 flex`}>
          {ctaArray.map((e: any, index: any) => (
            <Link
              to={e.url}
              key={index}
              className={`${handles.ctaButton} ttu mr3 ph6  pv4 tc fw6 bg-black-90 white no-underline`}
            >
              {e.text}
            </Link>
          ))}
        </div>
      </div>
    </div>
    </div>
  )
}

const MobileOneBlock: FunctionComponent<MobileOneBlockProps> = ({
  textPosition,
  label,
  copy,
  copy2,
  title,
  ctaArray,
  imgUrl,
  centerText,
  titleImg,
  height,
  stackedButtons,
  labelImg,
}) => {
  console.log(textPosition, height)

  // handles
  const handles = useCssHandles(CSS_HANDLES)
  return (
    <div
      className={`${handles.mainContainer} flex flex-column pa3 relative
      ${
        textPosition === 'top'
          ? 'justify-start'
          : textPosition === 'bottom'
          ? 'justify-end'
          : 'justify-center'
      }
      `}
      style={{
        // height: height,
        background: `url(${imgUrl}) no-repeat center`,
         paddingTop: "144%",
         backgroundSize: "cover"
      }}

      
    >
      <div
        className={`${handles.textContainer} flex flex-column absolute top-0 left-0 w-100 h-100 pa7
      ${centerText ? 'items-center' : ''}
      `}
      >
        <div className={`${handles.label} ${centerText ? 'tc' : ''} mb3`}>
          {labelImg ? (
            <img src={labelImg} alt="Banner Image Title" />
          ) : (
            <div
              className={`${centerText ? 'tc' : ''}`}
              dangerouslySetInnerHTML={{ __html: label }}
            ></div>
          )}
        </div>
        <div className={`${handles.title} f2`}>
          {titleImg ? (
            <img src={titleImg} alt="Banner Image Title" />
          ) : (
            <div
              className={`${centerText ? 'tc' : ''}`}
              dangerouslySetInnerHTML={{ __html: title }}
            ></div>
          )}
        </div>
        <div className={`${handles.copy} ${centerText ? 'tc' : ''} mt3`}>
          {copy}
        </div>
        <div className={`${handles.copy2} ${centerText ? 'tc' : ''} mt3`}>
          {copy2}
        </div>
        <div
          className={`${handles.ctaContainer} w-100 mv5 flex
        ${stackedButtons ? 'flex-column' : ''}
        `}
        >
          {ctaArray.map((e: any, index: any) => (
            <Link
              to={e.url}
              key={index}
              className={`${handles.ctaButton} ${
                stackedButtons ? 'mr3' : 'w-100 mb3'
              } pv3 tc fw6 bg-black-90 white no-underline`}
            >
              {e.text}
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}

OneBlock.schema = {
  title: 'OneBlock Info Card',
  description: 'OneBlock Info card',
  type: 'object',
  properties: {
    mobileTextPosition: {
      title: 'Mobile Text Location',
      description: 'Place text above or below the image',
      type: 'string',
      default: 'top',
    },
    desktopTextPosition: {
      title: 'Dekstop text location',
      description: 'Place text to the left or right of the image',
      type: 'string',
      default: 'left',
    },
    label: {
      title: 'label',
      description: 'label',
      type: 'string',
      default: '',
    },
    copy: {
      title: 'copy',
      description: 'copy',
      type: 'string',
      default: '',
    },
    copy2: {
      title: 'copy2',
      description: 'copy2',
      type: 'string',
      default: '',
    },
    title: {
      title: 'title',
      description: 'title',
      type: 'string',
      default: '',
    },
    ctaArray: {
      title: 'CTA Array',
      description: 'Call to action array',
      type: 'array',
      items: {
        text: {
          type: 'string',
          default: '',
        },
        url: {
          type: 'string',
          default: '',
        },
      },
    },
    desktopTextLocation: {
      title: 'title',
      description: 'title',
      type: 'string',
      default: '',
    },
    imgUrl: {
      title: 'title',
      description: 'title',
      type: 'string',
      default: '',
    },
    mobileImgUrl: {
      title: 'title',
      description: 'title',
      type: 'string',
      default: '',
    },
    centerText: {
      title: 'title',
      description: 'title',
      type: 'bolean',
      default: false,
    },
    titleImg: {
      title: 'title',
      description: 'title',
      type: 'string',
      default: '',
    },
  },
}
export default OneBlock
