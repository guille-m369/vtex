import React, { Fragment } from "react";
//import "./typings/storefront";
import { useCssHandles } from "vtex.css-handles";
import { Link } from "vtex.render-runtime";

import Verso from "./verso";

const CSS_HANDLES = [
  "menuContainer",
  "accordeonItemContainer",
  "textContainer",
  "textContainerTitle",
  "textTitle",
  "imageContainer",
  "accordionContent",
  "separator",
  "tituloNivel3"
] as const;

interface Props {
  menu: any;
}
const Acordeon: StorefrontFunctionComponent<Props> = ({ menu }) => {
  // grab product information

  const handles = useCssHandles(CSS_HANDLES);
  //console.log(menu);
  return (
    <div className={handles.menuContainer}>
      {
        <div>
          {/* Se recorre el contenido del menu */}
          {menu.map((contenido: any, index: any) => (
            <div className={handles.accordeonItemContainer} key={index}>
              <div className={handles.textContainer}>
                <div className={handles.accordionContent}>
                  {contenido.items.length != 0 ? (
                  <Fragment>
                    <Verso
                      titulo={contenido.title}
                      href={contenido.href}
                      content={contenido.items} />
                    <hr className={handles.separator} />
                  </Fragment>) : 
                  (
                  <Link
                    to={contenido.href}
                    className={`pv0 mv0 no-underline c-on-base w-100`}
                  >
                    <p
                      className={handles.tituloNivel3}
                    >
                      {contenido.title}
                    </p>
                  </Link>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      }
    </div>
  );
};

export default Acordeon;
