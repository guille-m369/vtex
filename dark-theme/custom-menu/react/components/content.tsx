import React, { FunctionComponent } from "react";
import { Link } from "vtex.render-runtime";

interface ContentProps {
  content: any;
  href: any;
}

const Content: FunctionComponent<ContentProps> = ({ content, href }) => {
  return (
    <div>
      {content.map((itemContent: any, index: any) => (
        <Link
          to={itemContent.href}
          key={index}
          className={`w-100 pv3 mv3 no-underline c-on-base`}
        >
          <li className={`mb5`} style={{ paddingLeft: "6px", fontSize: "16px", listStyle: "none", color: "#767676" }}>{itemContent.title}</li>
        </Link>
      ))}
      <Link
        to={href}
        className={`w-100 pv3 mv3 no-underline c-on-base`}
      >
        <li className={`mb5`} style={{ paddingLeft: "6px", fontSize: "16px", listStyle: "none", color: "#767676" }}>Ver todo</li>
      </Link>
    </div>
  );
};

export default Content;
