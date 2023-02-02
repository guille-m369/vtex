import React, { FunctionComponent } from "react";
import useCollapse from "react-collapsed";
import { useCssHandles } from "vtex.css-handles";
import useProduct from "vtex.product-context/useProduct";
import arrowUp from "../assets/ios-arrow-up.svg";
import arrowdown from "../assets/ios-arrow-drown.svg";
import Content from "./content";
require(".././css/style.css");
interface AccordionProps {
  titulo: string;
  isContentImage: boolean;
  content: any;
  description?: string;
  isRenderChildren?: boolean;
}

const CSS_HANDLES = [
  "accordion",
  "title",
  "icon",
  "iconBox",
  "content",
  "ulContent",
  "subTitleTable",
];

const Verso: FunctionComponent<AccordionProps> = ({
  titulo,
  content,
  isContentImage,
  description,
  isRenderChildren,
}) => {

  const valuesFromContext = useProduct();

  const { product } = valuesFromContext;
  const producto = product.properties[0].values[0]
  console.log(product);
  console.log("hola2", product.properties[0].values[0]);
  const handles = useCssHandles(CSS_HANDLES);

  const [renderChildren, setRenderChildren] = React.useState(isRenderChildren);

  const { getToggleProps, getCollapseProps, isExpanded } = useCollapse({
    defaultExpanded: isRenderChildren,
    duration: 1000,
    onExpandStart() {
      setRenderChildren(true);
    },

    onCollapseEnd() {
      setRenderChildren(false);
    },
  });

  return (
    <div className={`${handles.accordion} pr5 pl5`}>
      <table style={{ width: "100%" }}>
        <tr>
          <th style={{ width: "95%", textAlign: "left" }}>
            <p
              className={handles.title}
              {...getToggleProps({ style: { display: "block" } })}
            >
              {titulo}
            
            </p>
          </th>
          <th className={handles.iconBox}>
            <img
              className={handles.icon}
              alt="arrow"
              width={12}
              src={isExpanded ? arrowdown : arrowUp}
              {...getToggleProps({ style: { display: "block" } })}
            />
          </th>
        </tr>
      </table>

      <div {...getCollapseProps({ style: {} })}>
        {renderChildren && (
          <div className={`${handles.content}`}>
            <p>{producto}</p>
            {/* si isContentImage es verdadero no muestra una tabla con las imagenes y ventaja
             De lo contrario si IsContentImage es falso muestra una lista con la descripcion del producto o caracteristicas del produto */}
            {isContentImage ? (
              <Content
                content={content}
                isContentImage={isContentImage}
              />
            ) : (
              <ul className={`${handles.ulContent} pr5 pl5`}>
                {description && (
                  <p className={`${handles.subTitleTable} mb6`}>
                    {description}
                  </p>
                )}
                <Content
                  content={content}
                  isContentImage={isContentImage}
                />
              </ul>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Verso;
