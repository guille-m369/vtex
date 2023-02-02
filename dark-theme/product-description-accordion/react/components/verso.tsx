import React, { FunctionComponent } from "react";
import useCollapse from "react-collapsed";
import { useCssHandles } from "vtex.css-handles";

import arrowUp from "../assets/ios-arrow-up.svg";
import arrowdown from "../assets/ios-arrow-drown.svg";
import Content from "./content";

require("../css/style.css");

interface AccordionProps {
  titulo: string;
  content: any;
  description?: string;
  isRenderChildren?: boolean;
  isSplit: boolean;
  isCompatibility?: boolean;
}

const CSS_HANDLES = [
  "accordion",
  "title",
  "icon",
  "iconBox",
  "content",
  "ulContent",
  "subTitleTable",
  "separator",
];

const Verso: FunctionComponent<AccordionProps> = ({
  titulo,
  content,
  description,
  isRenderChildren,
  isSplit,
  isCompatibility,
}) => {
  const handles = useCssHandles(CSS_HANDLES);

  const [renderChildren, setRenderChildren] = React.useState(isRenderChildren);

  const { getToggleProps, getCollapseProps, isExpanded } = useCollapse({
    defaultExpanded: isRenderChildren,
    duration: 1000,
    onExpandStart() {
      setRenderChildren(true);
    },

    onCollapseEnd() {
      setRenderChildren(false);
    },
  });

  return (
    <div className={`${handles.accordion} `}>
      <table style={{ width: "100%" }}>
        <tbody>
          <tr>
            <th style={{ width: "95%", textAlign: "left", padding: "0" }}>
              <p
                className={handles.title}
                {...getToggleProps({ style: { display: "block" } })}
              >
                {titulo}
              </p>
            </th>
            <th className={handles.iconBox}>
              <img
                className={handles.icon}
                alt="arrow"
                width={12}
                src={isExpanded ? arrowdown : arrowUp}
                {...getToggleProps({ style: { display: "block" } })}
              />
            </th>
          </tr>
          <tr>
            <td colSpan={2}>
              <hr className={handles.separator} />
            </td>
          </tr>
        </tbody>
      </table>

      <div {...getCollapseProps({ style: {} })}>
        {renderChildren && (
          <div className={`${handles.content}`}>
            <ul className={`${handles.ulContent} pr5 pl1`}>
              {description && (
                <p className={`${handles.subTitleTable} mb6`}>{description}</p>
              )}
              <div className="pr5 pl7">
                <Content
                  content={content}
                  isSplit={isSplit}
                  isCompatibility={isCompatibility}
                />
              </div>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default Verso;
