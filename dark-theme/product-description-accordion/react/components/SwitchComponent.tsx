/* eslint-disable @typescript-eslint/no-require-imports */
import React, { FunctionComponent } from "react";
import { useCssHandles } from "vtex.css-handles";

const CSS_HANDLES = ["table", "iconTable", "titleTable", "subTitleTable"];

interface ContentProps {
  content: any;
  isCompatibility?: boolean;
}

const SwitchComponent: FunctionComponent<ContentProps> = ({
  content,
  isCompatibility,
}) => {
  const handles = useCssHandles(CSS_HANDLES);

  return (
    <div>
      {isCompatibility ? (
        <li className={`${handles.subTitleTable} mb3`}>
          <div>
            {`${content.marca} `}
            {`${content.modelo} `}
            {`${content.anio} `}
          </div>
        </li>
      ) : (
        <li className={`${handles.subTitleTable} mb3`}>{content}</li>
      )}
    </div>
  );
};

export default SwitchComponent;
