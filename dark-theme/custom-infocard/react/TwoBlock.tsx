import React, { FunctionComponent } from 'react'
// import style from './styles/twoBlock.css'
import { useCssHandles } from 'vtex.css-handles'
import { Link, useRuntime } from 'vtex.render-runtime'

const CSS_HANDLES = [
  'mainContainer',
  'label',
  'title',
  'title1',
  'title2',
  'title3',
  'copy',
  'ctaContainer',
  'ctaButton',
  'topLeftContainer',
  'bottomRightContainer',
]

interface TwoBlockProps {
  mobileTextLocation: string
  desktopTextPosition: string
  label: string
  title: string
  title1: string
  title2: string
  title3: string
  copy: string
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
  width: string
  labelImg: string
  stackedButtons: boolean
}

interface MobileTwoBlockProps {
  textLocation: string
  label: string
  title: string
  title1: string
  title2: string
  title3: string
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

const TwoBlock: StorefrontFunctionComponent<TwoBlockProps> = ({
  mobileTextLocation,
  desktopTextPosition,
  label,
  copy,
  title,
  title1,
  title2,
  title3,
  ctaArray,
  desktopTextLocation,
  imgUrl,
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
  console.log(type);
  
  const isMobile = type != "desktop" ? true : false;
  console.log(width, height);
  

  if (isMobile)
    return (
      <MobileTwoBlock
        textLocation={mobileTextLocation}
        label={label}
        title={title}
        title1={title1}
        title2={title2}
        title3={title3}
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
    <div
      className={`${handles.mainContainer} flex ${
        desktopTextLocation === 'right' ? 'flex-row-reverse' : ''
      }`}
      style={{
        maxWidth:"1920px"
      }}
    >
      <div
        className={`${handles.topLeftContainer}
       ${
         desktopTextPosition === 'start'
           ? 'justify-start'
           : desktopTextPosition === 'end'
           ? 'justify-end'
           : 'justify-center'
       }
       flex flex-column
       pa6
       ${centerText ? 'items-center' : ''}
       `}
        style={{ flex: 2, minWidth:"30%" }}
        
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
        <div className={`${handles.title1} f2`}>
          {titleImg ? (
            <img src={titleImg} alt="Banner Image Title" />
          ) : (
            <div
              className={`${centerText ? 'tc' : ''}`}
              dangerouslySetInnerHTML={{ __html: title1 }}
            ></div>
          )}
        </div>
        <div className={`${handles.title2} f2`}>
          {titleImg ? (
            <img src={titleImg} alt="Banner Image Title" />
          ) : (
            <div
              className={`${centerText ? 'tc' : ''}`}
              dangerouslySetInnerHTML={{ __html: title2 }}
            ></div>
          )}
        </div>
        <div className={`${handles.title3} f2`}>
          {titleImg ? (
            <img src={titleImg} alt="Banner Image Title" />
          ) : (
            <div
              className={`${centerText ? 'tc' : ''}`}
              dangerouslySetInnerHTML={{ __html: title3 }}
            ></div>
          )}
        </div>
        <div className={`${handles.copy} ${centerText ? 'tc' : ''} mt3`}
        dangerouslySetInnerHTML={{ __html: copy }}>
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
        className={`${handles.bottomRightContainer}`}
        // style={{
        //   height: height,
        //   background: `url(${imgUrl}) no-repeat center`,
        //   backgroundSize: 'cover',
        //   flex: 2,
        // }}
      >
        <img width="100%" height="100%" src={imgUrl} alt=""/>

      </div>
    </div>
    </div>
  )
}

const MobileTwoBlock: FunctionComponent<MobileTwoBlockProps> = ({
  textLocation,
  label,
  copy,
  title,
  title1,
  title2,
  title3,
  ctaArray,
  imgUrl,
  centerText,
  titleImg,
  labelImg,
  stackedButtons
}) => {
  // handles
  const handles = useCssHandles(CSS_HANDLES)
  return (
    <div style={{  paddingTop: "134%"}} className={`relative w-100`} >
    <div
      className={`${handles.mainContainer} absolute top-0 left-0 w-100 h-100 flex ${
        textLocation != 'bottom' ? 'flex-column' : 'flex-column-reverse'
      }`}
    >
      <div
        className={`${handles.topLeftContainer} flex flex-column pa4
      ${centerText ? 'items-center' : ''}
      `}
      >
        <div className={`${handles.label} ${centerText ? 'tc' : ''} mb5`}>
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
        <div className={`${handles.title1} f2`}>
          {titleImg ? (
            <img src={titleImg} alt="Banner Image Title" />
          ) : (
            <div
              className={`${centerText ? 'tc' : ''}`}
              dangerouslySetInnerHTML={{ __html: title1}}
            ></div>
            
          )}
        </div>
        <div className={`${handles.title2} f2`}>
          {titleImg ? (
            <img src={titleImg} alt="Banner Image Title" />
          ) : (
            <div
              className={`${centerText ? 'tc' : ''}`}
              dangerouslySetInnerHTML={{ __html: title2}}
            ></div>
            
          )}
        </div>
        <div className={`${handles.title3} f2`}>
          {titleImg ? (
            <img src={titleImg} alt="Banner Image Title" />
          ) : (
            <div
              className={`${centerText ? 'tc' : ''}`}
              dangerouslySetInnerHTML={{ __html: title3}}
            ></div>
            
          )}
        </div>
        <div className={`${handles.copy} ${centerText ? 'tc' : ''} mt3`}
        dangerouslySetInnerHTML={{ __html: copy }}
        >
        </div>
        <div
          className={`${handles.ctaContainer} w-100 mv6 flex
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
      <div className={`${handles.bottomRightContainer}`}>
        <img className="w-100" src={imgUrl} alt="banner image" />
      </div>
    </div>
    </div>
  )
}

TwoBlock.schema = {
  title: 'TwoBlock Info Card',
  description: 'TwoBlock Info card',
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
    title1: {
      title: 'title1',
      description: 'title1',
      type: 'string',
      default: '',
    },
    title2: {
      title: 'title2',
      description: 'title2',
      type: 'string',
      default: '',
    },
    title3: {
      title: 'title3',
      description: 'title3',
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
export default TwoBlock

