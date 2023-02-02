import React, { FunctionComponent, useState } from 'react';
import { Link } from 'vtex.render-runtime';
import { useCssHandles } from 'vtex.css-handles';
import arrowRight from "./assets/flecha-derecha-desktop.svg";
//import activeArrowRight from "./assets/chevron-right.svg";
import SubMenuDesktop from "./components/SubMenuDesktop";
import SubMenuDesktopSide from './components/SubMenuDesktopSide';

interface CustomDesktopMenuProps {
  menu: any;
  dropRigthMenus: any;
}

const CSS_HANDLES = [
  "desktopMenuContainer",
  "itemContainer",
  "activeItemContainer",
  "textContainer",
  "textContainerTitle",
  "textTitle",
  "image",
  "chilrenContainer1",
  'menuItem',
  'subMenuContainer',
  'subMenuDesktopSideContainer',
  'subMenuContainerInactive',
  'subMenuContainerBig',
  'submenuItem',
  'submenuItemText'];

const CustomDesktopMenu: FunctionComponent<CustomDesktopMenuProps> = ({ menu, dropRigthMenus }) => {
  const handles = useCssHandles(CSS_HANDLES);

  const [mainMenu, setMainMenu] = useState(menu);
  const [submenu, setSubmenu] = useState([]);
  const [isActive, setActive] = useState(0);/**Para saber si el menu se esta mostrando */
  const [title, setTitle] = useState("");

  const changeSubmenu = (item: any) => {
    let newArr = [...mainMenu];
    newArr.map((item) => {
      item.active = false;
    });
    const foundIndex = mainMenu.findIndex((x: any) => x.id === item.id);

    newArr[foundIndex].active = true;
    setMainMenu(menu);
    setSubmenu(item.items);
    setTitle(item.title);
  };

  return (
    <div className="flex" onMouseEnter={() => setActive(1)} onMouseLeave={() => setActive(0)}>
      <div className={handles.desktopMenuContainer} style={{ background: '#363636' }}>
        {/* Se recorre el contenido del menu */}
        {menu.map((contenido: any, index: any) => (
          <div className={handles.itemContainer} key={index}>
            <div className={`${handles.textContainer} ${contenido.active === true ? handles.activeItemContainer : ''
              }`} onMouseEnter={() => changeSubmenu(contenido)}>
              {contenido.items.length != 0 ? (
                <Link
                  to={contenido.href}
                  className={`pv0 mv0 no-underline w-100`}
                >
                  <div
                    className={`${handles.textContainerTitle} t-body mt6 c-on-base tl mw-100`}
                  >
                    
                    <p className={`${handles.textTitle}`}>{contenido.title}</p>
                    <img src={arrowRight} alt="flecha" className={`${handles.image}`} />
                  </div>
                </Link>) : (<div
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
      </div>
      {/**Segunda parte */}
      {//title == "Herramientas" || title == "Ferretería" ? 
        dropRigthMenus &&
          dropRigthMenus.includes(title) ?
          (

            <div
              className={`flex flex-column justify-center pl5  
          ${isActive ? handles.subMenuDesktopSideContainer : handles.subMenuContainerInactive}`}
              style={{ background: '#363636' }}
            >

              <SubMenuDesktopSide menu={submenu} />

            </div>
          ) : (

            <div
              className={`flex flex-column justify-center pl5  
        ${isActive ? handles.subMenuContainer : handles.subMenuContainerInactive}
        ${title === "Herramientas" ? handles.subMenuContainerBig : ''}`}
              style={{ background: '#363636' }}
            >

              {
                submenu &&
                submenu.map(function (item: any, index: any) {
                  return (<div key={index}>
                    <SubMenuDesktop
                      title={item.title}
                      href={item.href}
                      submenu={item.items} />
                  </div>)
                })}

            </div>
          )}
    </div>
  );
};

export default CustomDesktopMenu;
