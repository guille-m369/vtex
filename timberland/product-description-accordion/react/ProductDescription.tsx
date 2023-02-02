import React, { Fragment } from "react";
import useProduct from "vtex.product-context/useProduct";
import "./typings/storefront";
import { useCssHandles } from "vtex.css-handles";

import Verso from "./components/verso";

const CSS_HANDLES = ["accordion"] as const;

interface Props {
  ventajas: string;
  detalle: string;
  caracteristicas: string;
  collapsed: boolean;
}
const ProductDescription: StorefrontFunctionComponent<Props> = ({
  collapsed = true,
}) => {
  // grab product information
  // Similar a componentDidMount y componentDidUpdate:

  const valuesFromContext = useProduct();

  const { product } = valuesFromContext;
  const producto = product.properties[0].values[0]
  console.log(product);
  console.log("hola2", product.properties[0].values[0]);

  if (product) {
    var productProperties = JSON.parse(JSON.stringify(product.properties));
  }

  const handles = useCssHandles(CSS_HANDLES);
  return (
    <div>
   
      {/* Ventajas del producto */}
      {product ? (
        <div className={handles.accordion}>
      
          {/* Detalle del producto */}
          {productProperties.find(
            (element) => element.name === "Descripción de Tecnologías 2"
          ) ? (
            <Fragment>
              <hr />
          <span>{producto}</span>
              <Verso
              
                titulo="TECNOLOGÍA"
                content={
                  productProperties.find(
                    (element) => element.name === "Descripción de Tecnologías 2"
                  ).values
                }
                isContentImage
                isRenderChildren={collapsed}
              />
            </Fragment>
          ) : (
            ""
          )}
          {/* {Caracteristica de Tecnología} */}
          {productProperties.find(
            (element) => element.name === "Descripción Material"
          ) ? (
            <Fragment>
              <hr />

              <Verso
                titulo="DESCRIPCIÓN"
                content={
                  productProperties.find(
                    (element) => element.name === "Descripción Material"
                  ).values
                }
                isContentImage={false}
                description={product.description}
                isRenderChildren={collapsed}
              />
            </Fragment>
          ) : (
            ""
          )}

          {/* Caracteristicas del producto */}
          {}
        </div>
      ) : (
        "cargando"
      )}
    </div>
  );
};

ProductDescription.schema = {
  title: "Product Descripction",
  description: "editor.image-grid.description",
  type: "object",
  properties: {
    ventajas: {
      title: "Ventajas",
      description: "Producto ventajas",
      type: "string",
      default: "Ventajas",
    },
    detalle: {
      title: "Detalle",
      description: "Detalle de producto",
      type: "string",
      default: "Detalle",
    },
    caracteristicas: {
      title: "Característivas",
      description: "Características del producto",
      type: "string",
      default: "Características",
    },
  },
};

export default ProductDescription;
