import React, { FunctionComponent } from "react";
import { Link } from 'vtex.render-runtime';
import { useCssHandles } from 'vtex.css-handles';


const CSS_HANDLES = [
  "subMenuItemList",
  "subMenuItem",
  "subMenuItemListContainer"

] as const;

interface SubMenuDesktopProps {
  title: string;
  href: string;
  submenu: any;
}

const SubMenuDesktop: FunctionComponent<SubMenuDesktopProps> = ({ title, href, submenu }) => {
  const handles = useCssHandles(CSS_HANDLES);

  return (
    <div className={handles.subMenuItemListContainer}>
      <ul className={handles.subMenuItemList}>
        <Link
          to={href}
          className={`w-100 pv3 mv3 no-underline c-on-base`}
        >
          <li
            className={`mb5 ${handles.subMenuItem}`}
            style={{ paddingLeft: "6px", fontWeight: "bold", fontSize: "16px", listStyle: "none", marginBottom: "22px" }}>
            {title}
          </li>
        </Link>
        {submenu.map((itemSubmenu: any, index: any) => (
          <Link
            to={itemSubmenu.href}
            key={index}
            className={`w-100 pv3 mv3 no-underline c-on-base`}
          >
            <li
              className={`mb5 ${handles.subMenuItem}`}
              style={{ paddingLeft: "6px", fontSize: "14px", listStyle: "none", color: "#999999" }}>
              {itemSubmenu.title}
            </li>
          </Link>
        ))}
      </ul>
    </div>
  );
};

export default SubMenuDesktop;
