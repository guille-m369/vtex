// import { relative } from "path";
import React from "react";
import { useCssHandles } from "vtex.css-handles";
import { Link } from "vtex.render-runtime";
// CSS Handles
const CSS_HANDLES = ["CustomInfocardButtonContainer","CustomInfocardContainerContainer","CustomInfoCardImage", "CustomInfocardHeadline", "CustomInfoCardContainerText", "CustomInfoCardContainerImage", "CustomInfocardContainer", "ButtonInfocard", "headlineInfoCardButton"];

interface CustomInfocardContainerProps {
  widthLogo: string;
  widthImage: string;
  maxHeightLogo: string;
  maxHeightImage: string;
  srcLogo: string;
  srcImage: string;
  headline: string;
  flex: number;
  textContainerWidth: string;
  textContainerHeight: string;
  paragraph: string;
  paragraph2: string;
  listButton: {
    title: string;
    href: string;
    blockClass: string;
  }[];
  
}
const CustomInfocardContainer: StorefrontFunctionComponent<CustomInfocardContainerProps> = ({ widthLogo, maxHeightLogo, srcLogo, listButton, headline, textContainerWidth, textContainerHeight, flex, srcImage, widthImage, maxHeightImage, paragraph, paragraph2 }) => {
  const handles = useCssHandles(CSS_HANDLES);

  return (
    <div style={{display: "flex"}} className={`${handles.CustomInfocardContainerContainer}`}>
        
              <div style={{width: textContainerWidth, height: textContainerHeight }} className={`${handles.CustomInfoCardContainerText}`}>

              <img className={handles.CustomInfocardContainer}
              src={srcLogo}
              width={widthLogo}
              style={{ maxHeight: maxHeightLogo }}
              alt={"custom-infocard"}
              />

              <h2 className={`${handles.CustomInfocardHeadline}`}>{headline}
              <br></br>
              {paragraph}
              <br></br>
              {paragraph2}</h2>
              { listButton ?
              listButton.map((item: any, index: any) => (
                <Link to={item.href}>
                  <button className={handles.ButtonInfocard+item.blockClass} key={index} >{item.title}</button>
                </Link>
              )
              )
              : (null)
              }

              </div>
        


        <div style={{ flex: flex }}className={`${handles.CustomInfoCardContainerImage}`}>
       
        <img className={handles.CustomInfoCardImage}
        src={srcImage}
        width={widthImage}
        style={{ maxHeight: maxHeightImage }}
        alt={"custom-infocard"}
      />

      
        </div>
    </div>
  );
};
CustomInfocardContainer.schema = {
  title: "Infocard",
  description: "Infocard custom",
  type: "object",
  properties: {
    widthLogo: {
      title: "Width Infocard",
      description: "Example 100% or 100px",
      type: "string",
      default: "100%",
    },
      flex: {
        title: "Width Infocard",
        description: "Example 100% or 100px",
        type: "string",
        default: "100%",
      },
      srcImage: {
        title: "SRCLogo Infocard",
        description: "Example 100% or 100px",
        type: "string",
        default: "auto",
      },
      widthImage: {
        title: "Width Infocard",
        description: "Example 100% or 100px",
        type: "string",
        default: "100%",
      },
      
      paragraph: {
        title: "Width Infocard",
        description: "Example 100% or 100px",
        type: "string",
        default: "100%",
      },
      textContainerWidth: {
        title: "Width Infocard",
        description: "Example 100% or 100px",
        type: "string",
        default: "100%",
      },
      textContainerHeight: {
        title: "Width Infocard",
        description: "Example 100% or 100px",
        type: "string",
        default: "100%",
      },
        paragraph2: {
        title: "Width Infocard",
        description: "Example 100% or 100px",
        type: "string",
        default: "100%",
      },
      
      maxHeightImage: {
        title: "MaxHeight Infocard",
        description: "Example 100% or 100px",
        type: "string",
        default: "auto",
      },
    headline: {
      title: "headline Infocard",
      description: "Example 100% or 100px",
      type: "string",
      default: "100%",
    },
    maxHeightLogo: {
      title: "MaxHeight Infocard",
      description: "Example 100% or 100px",
      type: "string",
      default: "auto",
    },
    srcLogo: {
      title: "SRC Infocard",
      description: "Example 100% or 100px",
      type: "string",
      default: "auto",
    },
  }
}

export default CustomInfocardContainer;
