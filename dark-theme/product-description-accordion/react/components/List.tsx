/* eslint-disable @typescript-eslint/no-require-imports */
import React, { FunctionComponent } from "react";
import { useCssHandles } from "vtex.css-handles";

const CSS_HANDLES = ["content__container"];

interface ContentProps {
  title: string;
  content: any;
}

const ListToShow: FunctionComponent<ContentProps> = ({
  title,
  content
}) => {
  const handles = useCssHandles(CSS_HANDLES);
    return(
        <>
          {content ? <h3>{title}</h3> : ''}
          {content ? (
            <div className={`${handles.content__container} mb3`}>
                {content}
            </div>) 
            : 
            null}
        </>
    )
};

export default ListToShow;
