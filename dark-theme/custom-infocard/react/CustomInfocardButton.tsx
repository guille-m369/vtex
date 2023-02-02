import React from "react";
import { useCssHandles } from "vtex.css-handles";
import { Link } from "vtex.render-runtime";
// CSS Handles
const CSS_HANDLES = ["CustomInfocardButtonContainer", "CustomInfocardButton", "ButtonInfocard", "headlineInfoCardButton"];

interface CustomInfocardButtonProps {
  width: string;
  maxHeight: string;
  src: string;
  headline: string;
  listButton: {
    title: string;
    href: string;
    blockClass: string;
  }[];
}
const CustomInfocardButton: StorefrontFunctionComponent<CustomInfocardButtonProps> = ({ width, maxHeight, src, listButton, headline }) => {
  const handles = useCssHandles(CSS_HANDLES);

  return (
    <div className={`${handles.CustomInfocardButtonContainer}`}>

      <img className={handles.CustomInfocardButton}
        src={src}
        width={width}
        style={{ maxHeight: maxHeight }}
        alt={"custom-infocard"}
      />
      <p className={handles.headlineInfoCardButton}>{headline}</p>

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
  );
};
CustomInfocardButton.schema = {
  title: "Infocard",
  description: "Infocard custom",
  type: "object",
  properties: {
    width: {
      title: "Width Infocard",
      description: "Example 100% or 100px",
      type: "string",
      default: "100%",
    },
    headline: {
      title: "headline Infocard",
      description: "Example 100% or 100px",
      type: "string",
      default: "100%",
    },
    maxHeight: {
      title: "MaxHeight Infocard",
      description: "Example 100% or 100px",
      type: "string",
      default: "auto",
    },
    src: {
      title: "SRC Infocard",
      description: "Example 100% or 100px",
      type: "string",
      default: "auto",
    },
  }
}

export default CustomInfocardButton;
