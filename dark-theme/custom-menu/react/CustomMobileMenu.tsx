import "./typings/storefront";
import { useCssHandles } from "vtex.css-handles";
import { Link } from "vtex.render-runtime";
import React, { useState } from "react";
import Acordeon from "./components/acordeon";
import arrowRight from "./assets/angle-right.svg";
import arrowLeft from "./assets/flecha-izquierda.svg";

const CSS_HANDLES = [
  "menuTitle",
  "menuContainer",
  "itemContainer",
  "textContainer",
  "textContainerTitle",
  "textContainerRegresar",
  "imageContainerRegresar",
  "textTitle",
  "image",
  "accordion",
  "separator",
  "childrenContainer1",
  "childrenContainer2"
] as const;

interface Props {
  menu: any;
  children: React.ReactNode | null;
}
const CustomMobileMenu: StorefrontFunctionComponent<Props> = ({ menu, children }) => {
  // grab product information

  const [selectedItem, setSelectedItem] = useState(0);
  const handles = useCssHandles(CSS_HANDLES);
  //console.log(menu);
  //console.log(children)
  return (
    <div>
      {selectedItem == 0 ? (
        <div>
          <div  className={`${handles.menuTitle} c-on-base`}>Categorías</div>
          {/* Se recorre el contenido del menu */}
          {menu.map((contenido: any, index: any) => (
            <div className={handles.itemContainer} key={index}>
              <div className={handles.textContainer}>
                {contenido.items.length != 0 ? (<div
                  className={`${handles.textContainerTitle} t-body mt6 c-on-base tl mw-100`}
                  onClick={() => setSelectedItem(contenido.id)}
                >
                  <p className={`${handles.textTitle}`}>{contenido.title}</p>
                  <img src={arrowRight} alt="flecha" className={`${handles.image}`} />
                </div>) : (<div
                  className={`${handles.textContainerTitle} t-body mt6 c-on-base tl mw-100`}
                >
                  <Link
                    to={contenido.href}
                    className={`pv0 mv0 no-underline c-on-base w-100`}
                  >
                    <p className={`${handles.textTitle}`}>{contenido.title}</p>
                  </Link>
                </div>)}
              </div>
            </div>
          ))}
          <div className={handles.childrenContainer1}>
            {/**Aqui se incluye el children */}
            {children}
          </div>
        </div>
      ) : (
          <div>
            <div className={handles.textContainerRegresar} >
              <div className={handles.imageContainerRegresar} onClick={() => setSelectedItem(0)}>
                <img src={arrowLeft} alt="regresar" className={`${handles.image}`} />
              </div>
              <p className={`${handles.textTitle}`}>

                <Link
                  to={menu.find(function (objeto) {
                    return objeto.id == selectedItem;
                  }).href}
                  className={`pv0 mv0 no-underline w-100 ${handles.textTitle}`}
                >{menu.find(function (objeto) {
                  return objeto.id == selectedItem;
                }).title}
                </Link></p>
            </div>
            <Acordeon
              menu={
                menu.find(function (objeto) {
                  return objeto.id == selectedItem;
                }).items
              }
            />
          </div>
        )}
    </div>
  );
};

export default CustomMobileMenu;
