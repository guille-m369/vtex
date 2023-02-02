import React, { FunctionComponent } from "react";
import useCollapse from "react-collapsed";
import { useCssHandles } from "vtex.css-handles";

import arrowUp from "../assets/flecha-hacia-arriba.svg";
import arrowdown from "../assets/flecha-hacia-abajo.svg";
import Content from "./content";
//import { ImageDisplay } from "../components/ImageDisplay";
require(".././css/style.css");
interface AccordionProps {
  titulo: string;

  content: any;
  href: any;
  description?: string;
  isRenderChildren?: boolean;
}

const CSS_HANDLES = [
  "accordion",
  "accordionTitle",
  "icon",
  "iconBox",
  "content",
  "ulContent",
  "submenuItem",
  "subTitleTable",
];

const Verso: FunctionComponent<AccordionProps> = ({
  titulo,
  content,
  href,
  description,
  isRenderChildren,
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
    <div className={`${handles.accordion}`}>
      <table style={{ width: "100%" }}>
        <tbody>
          <tr >
           
            <th style={{ textAlign: "left", padding: "0" }}>
              <p
                className={`${handles.accordionTitle} c-on-base`}
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
                src={isExpanded ? arrowUp : arrowdown}
                {...getToggleProps({ style: { display: "block" } })}
              />
            </th>
          </tr>
        </tbody>
      </table>

      <div {...getCollapseProps({ style: {} })}>
        {renderChildren && (
          <div className={`${handles.content}`}>
            {
              <ul className={`${handles.ulContent}`}>
                {description && (
                  <p className={`${handles.subTitleTable} mb6`}>
                    {description}
                  </p>
                )}
                <div className={`${handles.submenuItem}`}>
                  <Content
                    href={href}
                    content={content} />
                </div>
              </ul>
            }
          </div>
        )}
      </div>
    </div>
  );
};

export default Verso;
