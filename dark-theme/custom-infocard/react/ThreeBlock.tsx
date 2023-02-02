import React, { FunctionComponent } from 'react'
// import style from './styles/ThreeBlock.css'
import { useCssHandles } from 'vtex.css-handles'
import { Link, useRuntime } from 'vtex.render-runtime'

const CSS_HANDLES = [
  'mainContainer',
  'label',
  'title',
  'copy',
  'ctaContainer',
  'ctaButton',
  'rightContainer',
  'leftContainer',
  'middleContainer',
  'mobileImgContainer',
]

interface ThreeBlockProps {
  mobileTextLocation: string
  desktopTextPosition: string
  label: string
  title: string
  copy: string
  ctaArray: {
    text: string
    url: string
  }[]
  firstImgUrl: string
  secondImgUrl: string
  mobileImgUrl: string
  centerText: boolean
  titleImg: string
  height: string
  width: string
  labelImg: string
  stackedButtons: boolean
}

interface MobileThreeBlockProps {
  textLocation: string
  label: string
  title: string
  copy: string
  ctaArray: {
    text: string
    url: string
  }[]
  imgUrl: string
  centerText: boolean
  titleImg: string
  labelImg: string
  stackedButtons: boolean
}

const ThreeBlock: StorefrontFunctionComponent<ThreeBlockProps> = ({
  mobileTextLocation,
  desktopTextPosition,
  label,
  copy,
  title,
  ctaArray,
  firstImgUrl,
  secondImgUrl,
  mobileImgUrl,
  centerText,
  titleImg,
  height,
  width,
  labelImg,
  stackedButtons
}) => {
  const handles = useCssHandles(CSS_HANDLES)
  const { deviceInfo } = useRuntime()
 const { type } = deviceInfo
  const isMobile = type != "desktop" ? true : false;
  console.log(width, height);
  

  if (isMobile)
    return (
      <MobileThreeBlock
        textLocation={mobileTextLocation}
        label={label}
        title={title}
        copy={copy}
        ctaArray={ctaArray}
        imgUrl={mobileImgUrl}
        centerText={centerText}
        titleImg={titleImg}
        labelImg={labelImg}
        stackedButtons={stackedButtons}
      />
    )

  return (
     <div style={{maxWidth: "1920px", margin:"0 auto", maxHeight: height}}>
    <div className={`${handles.mainContainer} flex`}
     style={{
        maxWidth:"1920px"
      }}
    >
      <div
        className={`${handles.leftContainer}`}
        // style={{
        //   height: height,
        //   background: `url(${firstImgUrl}) no-repeat center`,
        //   backgroundSize: 'cover',
        //   flex: 2,
        // }}
      >
        <img width="100%" height="100%" src={firstImgUrl} alt=""/>
      </div>
      <div
        className={`${handles.middleContainer}
         ${
           desktopTextPosition === 'start'
             ? 'justify-start'
             : desktopTextPosition === 'end'
             ? 'justify-end'
             : 'justify-center'
         }
       flex flex-column
       ${centerText ? 'items-center' : ''}

         pa6
       `}
        style={{ flex: 2, minWidth:"30%" }}
      >
        <div className={`${handles.label} ${centerText ? 'tc' : ''} mb3`}>
          {labelImg ? (
            <img src={labelImg} alt="Banner Image label" />
          ) : (
            <div
              className={`${centerText ? 'tc' : ''}`}
              dangerouslySetInnerHTML={{ __html: label }}
            ></div>
          )}
        </div>
        <div className={`${handles.title}  f2`}>
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
        <div className={`${handles.ctaContainer} mv5 flex`}>
          {ctaArray.map((e: any, index: any) => (
            <Link
              to={e.url}
              key={index}
              className={`${handles.ctaButton} ttu mr3 ph8  pv4 tc fw6 bg-black-90 white no-underline`}
            >
              {e.text}
            </Link>
          ))}
        </div>
      </div>
      <div
        className={`${handles.rightContainer}`}
        // style={{
        //   height: height,
        //   background: `url(${secondImgUrl}) no-repeat center`,
        //   backgroundSize: 'cover',
        //   flex: 2,
        // }}
      >
        <img width="100%" height="100%" src={secondImgUrl} alt=""/>
      </div>
    </div>
    </div>
  )
}

const MobileThreeBlock: FunctionComponent<MobileThreeBlockProps> = ({
  textLocation,
  label,
  copy,
  title,
  ctaArray,
  imgUrl,
  centerText,
  titleImg,
  labelImg,
  stackedButtons
}) => {
  console.log(title)

  // handles
  const handles = useCssHandles(CSS_HANDLES)
  return (
    <div
      className={`${handles.mainContainer} flex ${
        textLocation != 'bottom' ? 'flex-column' : 'flex-column-reverse'
      }`}
    >
      <div
        className={`${handles.middleContainer} flex flex-column pa4
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
        <div className={`${handles.copy} ${centerText ? 'tc' : ''}mt3`}>
          {copy}
        </div>
         <div
          className={`${handles.ctaContainer} w-100 mv5 flex
        ${stackedButtons ? 'flex-column' : ''}
        ${centerText ? 'justify-center' : ''}
        `}
        >
          {ctaArray.map((e: any, index: any) => (
            <Link
              to={e.url}
              key={index}
              className={`${handles.ctaButton}  ${
                !stackedButtons ? 'mr3' : 'w-100 mb3'
              } pv4 ph8 tc fw6 bg-black-90 white no-underline`}
            >
              {e.text}
            </Link>
          ))}
        </div>
      </div>
      <div className={`${handles.mobileImgContainer}`}>
        <img className="w-100" src={imgUrl} alt="banner image" />
      </div>
    </div>
  )
}

ThreeBlock.schema = {
  title: 'ThreeBlock Info Card',
  description: 'ThreeBlock Info card',
  type: 'object',
  properties: {
    mobileTextLocation: {
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
export default ThreeBlock
