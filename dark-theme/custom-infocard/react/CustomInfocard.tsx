import React from "react";
import { useCssHandles } from "vtex.css-handles";
import { Link } from "vtex.render-runtime";
// CSS Handles
const CSS_HANDLES = ["CustomInfocardContainer", "CustomInfocard"];

interface customInfocardProps {
  width: string;
  maxHeight: string;
  src: string;
  link: string;
}
const CustomInfocard: StorefrontFunctionComponent<customInfocardProps> = ({ width, maxHeight, src, link }) => {
  const handles = useCssHandles(CSS_HANDLES);

  return (
    <div className={`${handles.CustomInfocardContainer}`}>
      <Link to={link}>
        <img className={handles.CustomInfocard}
          src={src}
          width={width}
          style={{ maxHeight: maxHeight }}
          alt={"custom-infocard"}
        />
      </Link>
    </div>
  );
};
CustomInfocard.schema = {
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

export default CustomInfocard;
