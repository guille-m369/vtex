import React, { useState, useEffect, Fragment } from "react";
import useProduct from "vtex.product-context/useProduct";
import "./typings/storefront";
import { useCssHandles } from "vtex.css-handles";

import ListToShow from './components/List';

const fetch = require("node-fetch");

require("./css/style.css");

const CSS_HANDLES = ["principalContainer", "compatibilityContainer", "compItemContainer", "titles", "brand", "model", "anio",
                      "descriptionContainer", "specificationContainer"] as const;

interface Props {
  type: any,
  ventajas: string;
  detalle: string;
  caracteristicas: string;
}
const ProductDescriptionList: StorefrontFunctionComponent<Props> = ({type}: Props) => {
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

  let ProductDescriptionList = () => {
    let listOfProduct = product ? product.description : ''
    listOfProduct = listOfProduct.split('|')
    let listResult = listOfProduct.map(element => {
      return(
        <ul>
          <li key={element}>{element}</li>
        </ul>
      )
    })
    return listResult
  }

  let CompatibilityList = () => {
    let compatibilityListResult = compatibility.map((item:any) => {
      return(
        <article className={handles.compItemContainer}>
          <div className={handles.titles}><span className={handles.brand}>{item.marca}</span> <span className={handles.model}>{item.modelo}</span></div>
          <span className={handles.anio}>{item.anio}</span>
        </article>
      )
    })
    return compatibilityListResult
  }

  const handles = useCssHandles(CSS_HANDLES);

  let materialDescription = productProperties.find((element) => element.name === "Descripción del material")
  let material = productProperties.find((element) => element.name === "Material")
  let colorGroup = productProperties.find((element) => element.name === "Grupo Color")
  let content = productProperties.find((element) => element.name === "Contenido")
  let fieldUtil = productProperties.find((element) => element.name === "Campo aplicación")
  let listDescription = ProductDescriptionList()
  let listCompatibility = compatibility ? CompatibilityList() : 'Sin información de compatibilidad.'
  console.log("comp",listCompatibility)
  return (
    <div className={handles.principalContainer}> 
      {/* Ventajas del producto */}

      {product &&  type == 0 ?
          (<>
            <Fragment >
                <div className={handles.descriptionContainer}>
                  <ListToShow title="Descripción" content={listDescription}/>
                </div>
                <div className={handles.specificationContainer}>
                  <ListToShow title="Descripción de Material" content={materialDescription ? materialDescription.values : ""} />
                  <ListToShow title="Colores" content={colorGroup ? colorGroup.values : ''} />
                  <ListToShow title="Material" content={material ? material.values : ''} />
                  <ListToShow title="Contenido" content={content ? content.values : ''} />
                  <ListToShow title="Campos de uso" content={fieldUtil ? fieldUtil.values : ''} />
                </div>
                
            </Fragment>
          </>)
        : type == 1 ?
        (
          <div className={handles.compatibilityContainer}>
            {listCompatibility.length ==  0 
            ? "Sin información de compatibilidad"
            : listCompatibility}
          </div>
        )
        : ("cargando...")}
    </div>
  );
};

ProductDescriptionList.schema = {
  title: "Product Descripction",
  description: "editor.image-grid.description",
  type: "object",
  properties: {
    type: {
      title: "Tipo",
      description: "Tipo de interface",
      type: "boolean",
      default: "false",
    },
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

export default ProductDescriptionList;
