import React, { FunctionComponent } from "react";

import SwitchComponent from "./SwitchComponent";

interface ContentProps {
  content: any;
  isSplit: boolean;
  isCompatibility?: boolean;
}
const Content: FunctionComponent<ContentProps> = ({
  content,
  isSplit,
  isCompatibility,
}) => {
  // Esta validación se aplica para las ocaciones cuando las propiedades
  // estan en una solo pisición del arreglo y son separadas por  un |
  if (isSplit) {
    if (Array.isArray(content)) {
      content = content[0].split("|");
    } else {
      content = content.split("|");
    }

    content = content.filter(Boolean);
  }

  return (
    <div>
      {content.map((itemContent: any, index: any) => (
        <SwitchComponent
          content={itemContent}
          isCompatibility={isCompatibility}
          key={index}
        />
      ))}
    </div>
  );
};

export default Content;
