import React, { FunctionComponent } from "react";
import useProduct from "vtex.product-context/useProduct";
import { useCssHandles } from "vtex.css-handles";

const CSS_HANDLES = ["titleDescription", "description", "paragraph"];

const CustomProductDescription: FunctionComponent = ({}) => {
  const valuesFromContext = useProduct();
  const { product } = valuesFromContext;
  /*console.log("values");
  console.log(valuesFromContext);
  console.log("priduct");
  console.log(product);*/
  console.log(valuesFromContext);
  const handles = useCssHandles(CSS_HANDLES);
  const descripcion = product.description;
  let dta;
  dta = obtenerDescripcion(descripcion);

  return (
    <div>
      <div>
        {/* <div className={handles.titleDescription}>
          <h2 className={"t-heading-5 mb5 mt0"}>Descripcion del Producto</h2>
        </div> */}
        <div className={handles.description}>{dta}</div>
      </div>
    </div>
  );
  function obtenerDescripcion(cadena) {
    let arrayCadena = cadena.split("%-!-%!");

    if (arrayCadena[0]) {
      //console.log(arrayCadena[0].replace("|", "\n"));
      //return arrayCadena[0].split("|");
      let resultado = arrayCadena[0].split("|");
      return resultado.map((contenido: any, index: any) => (
        <p
          key={index}
          className={handles.paragraph}
          style={{ color: "rgb(71, 70, 70)" }}
        >
          {contenido}
        </p>
      ));
    } else {
      return "Este producto no tiene descripcion";
    }
  }
};
export default CustomProductDescription;
