import React, { useState, useEffect, Fragment } from "react";
import useProduct from "vtex.product-context/useProduct";
import "./typings/storefront";
import { useCssHandles } from "vtex.css-handles";

import Verso from "./components/verso";

const fetch = require("node-fetch");

require("./css/style.css");

const CSS_HANDLES = ["accordion", "separator", "compatibility"] as const;

interface Props {
  ventajas: string;
  detalle: string;
  caracteristicas: string;
}
const ProductDescription: StorefrontFunctionComponent<Props> = ({}) => {
  // grab product information
  // Similar a componentDidMount y componentDidUpdate:

  const valuesFromContext = useProduct();

  const { product } = valuesFromContext;
  const [compatibility, setcompatibility] = useState([]);

  useEffect(() => {
    GetCompatibility();
  }, [product]);

  const GetCompatibility = async () => {
    let sku = JSON.parse(JSON.stringify(product.items));

    sku = JSON.parse(JSON.stringify(sku[0].referenceId));

    sku = sku[0].Value;

    fetch(
      `/api/dataentities/AC/search?_fields=suk,marca,anio,modelo&_where=sku%3D${sku}&_schema=AutecoCombinacion&_sort=anio%20%20ASC`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/vnd.vtex.ds.v10+json",
          "REST-Range": "resources=0-2000",
        },
      }
    )
      .then((response) => response.json())
      .then((json) => {
        setcompatibility(json);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  if (product) {
    var productProperties = JSON.parse(JSON.stringify(product.properties));
  }

  const handles = useCssHandles(CSS_HANDLES);

  let materialDescription = productProperties.find((element) => element.name === "Descripción del material")
  let material = productProperties.find((element) => element.name === "Material")
  let colorGroup = productProperties.find((element) => element.name === "Grupo Color")
  let content = productProperties.find((element) => element.name === "Contenido")
  let fieldUtil = productProperties.find((element) => element.name === "Campo aplicación")

  return (
    <div>
      {/* Ventajas del producto */}
      {product ? (
        <div className={handles.accordion}>
          {productProperties.find((element) => element.name === "Descripción del material") ? (
            <Fragment>
              <Verso
                titulo="DESCRIPCIÓN DEL PRODUCTO"
                content={product.description.concat(
                  "|",
                  materialDescription.length > 0 ? materialDescription.values : ""
                )}
                // description={product.description}
                description=""
                isRenderChildren
                isSplit
                isCompatibility={false}
              />
            </Fragment>
          ) : (
            <Fragment>
              {productProperties.find((element) => element.name === "Material") ? (
                <Fragment>
                  <Verso
                    titulo="DESCRIPCIÓN DEL PRODUCTO"
                    content={product.description.concat(
                      "|",
                      material ? material.values : ''
                      , "|",
                      colorGroup ? colorGroup.values : ''
                    )}
                    // description={product.description}
                    description=""
                    isRenderChildren
                    isSplit
                    isCompatibility={false}
                  />
                </Fragment>
              ) : (
                <Fragment>
                  {productProperties.find((element) => element.name === "Contenido") ? (
                    <Fragment>
                      <Verso
                        titulo="DESCRIPCIÓN DEL PRODUCTO"
                        content={product.description.concat(
                          "|",
                          content ? content.values : ''
                        )}
                        // description={product.description}
                        description=""
                        isRenderChildren
                        isSplit
                        isCompatibility={false}
                      />
                    </Fragment>
                  ) : (
                    <Fragment>
                      <Verso
                        titulo="DESCRIPCIÓN DEL PRODUCTO"
                        content={product.description}
                        // description={product.description}
                        description=""
                        isRenderChildren
                        isSplit
                        isCompatibility={false}
                      />
                    </Fragment>
                  )}
                </Fragment>
              )}
            </Fragment>
          )}
          {
            productProperties.find((element) => element.name === "Campo aplicación")
            &&
            <Verso
                titulo=" MODO DE USO"
                content={ fieldUtil ? fieldUtil.values : '' }
                isSplit={false}
                description=""
                isCompatibility={false}
              />
          }
          {compatibility.length !== 0 ? (
            <div className={handles.compatibility}>
              <Verso
                titulo="PRODUCTO COMPATIBLE CON"
                content={compatibility}
                isSplit={false}
                description=""
                isCompatibility
              />
            </div>
          ) : null}
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
      title: "Características",
      description: "Características del producto",
      type: "string",
      default: "Características",
    },
  },
};

export default ProductDescription;
