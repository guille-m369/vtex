import React, { FunctionComponent } from "react";

import SwitchComponent from "./SwitchComponent";

interface ContentProps {
  content: any;
  isContentImage: boolean;
  
}
const Content: FunctionComponent<ContentProps> = ({
  content,
  isContentImage,
  
}) => {
  content = content[0].split("|");
  content = content.filter(Boolean);
  //Esta validación se aplica para las ocaciones cuando las propiedades
  // estan en una solo pisición del arreglo y son separadas por  un |
  
  return (
    <div>
      {content.map((itemContent) => (
        <SwitchComponent
          isContentImage={isContentImage}
          content={itemContent}
        />
      ))}
    </div>
  );
};

export default Content;
