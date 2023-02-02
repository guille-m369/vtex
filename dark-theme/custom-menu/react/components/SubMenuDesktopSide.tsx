import React, { FunctionComponent, useState } from 'react';
import { Link } from 'vtex.render-runtime';
import { useCssHandles } from 'vtex.css-handles';
import arrowRight from ".././assets/flecha-derecha-desktop.svg";
//import activeArrowRight from "../assets/chevron-right.svg";
//import { ImageDisplay } from "./ImageDisplay";
//import  SubMenuDesktop  from "./SubMenuDesktop";

interface SubMenuDesktopSideProps {
  menu: any;
}

const CSS_HANDLES = [
  "desktopSideMenuContainer",
  "sideItemContainer",
  "activeSideItemContainer",
  "textSideContainer",
  "textSideContainerTitle",
  "textSideTitle",
  "sideImage",
  'menuItem',
  'subMenuSideContainer',
  'subMenuContainerInactive',
  'submenuSideItem',
  'submenuSideItemText'];

const SubMenuDesktopSide: FunctionComponent<SubMenuDesktopSideProps> = ({ menu }) => {
  const handles = useCssHandles(CSS_HANDLES);

  const [mainMenu, setMainMenu] = useState(menu);
  const [submenu, setSubmenu] = useState([]);
  const [isActive, setActive] = useState(0);/**Para saber si el menu se esta mostrando */
  //const [title, setTitle] = useState("");

  const changeSubmenu = (item: any) => {
    let newArr = [...mainMenu];
    newArr.map((item) => {
      item.active = false;
    });
    const foundIndex = mainMenu.findIndex((x: any) => x.id === item.id);

    newArr[foundIndex].active = true;
    setMainMenu(menu);
    setSubmenu(item.items);
    // setTitle(item.title);
  };

  return (
    <div className="flex h-100" onMouseEnter={() => setActive(1)} onMouseLeave={() => setActive(0)}>
      <div className={handles.desktopSideMenuContainer} style={{ background: '#363636' }}>
        {/* Se recorre el contenido del menu */}
        {menu.map((contenido: any, index: any) => (
          <div className={handles.sideItemContainer} key={index}>
            <div className={`${handles.textSideContainer} ${contenido.active === true ? handles.activeSideItemContainer : ''
              }`} onMouseEnter={() => changeSubmenu(contenido)}>
              <Link
                to={contenido.href}
                className={`pv0 mv0 no-underline w-100`}
              >
                <div
                  className={`${handles.textSideContainerTitle} t-body mt6 c-on-base tl mw-100`}

                >
                  <p className={`${handles.textSideTitle}`}>{contenido.title}</p>
                  <img src={arrowRight} alt="flecha" className={`${handles.sideImage}`} />
                </div>
              </Link>
            </div>
          </div>
        ))}
      </div>
      {/**Segunda parte */}
      <div
        className={`flex flex-column justify-center pl5  
        ${isActive ? handles.subMenuSideContainer : handles.subMenuContainerInactive}`}
        style={{ background: '#363636' }}
      >

        {submenu &&
          submenu.map(function (item: any, index: any) {
            return (<div key={index}
              className={`${handles.submenuSideItem}`}>
              <Link
                to={item.href}
                key={index}
                className={`w-100 pv3 mv3 no-underline c-on-base ${handles.submenuSideItemText}`}
              >{item.title}</Link>
            </div>)
          })}

      </div>
    </div>
  );
};

export default SubMenuDesktopSide;
