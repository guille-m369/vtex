import React, { FunctionComponent } from "react";
import { CsvToHtmlTable } from "react-csv-to-table";
import useProduct from "vtex.product-context/useProduct";
import { useCssHandles } from "vtex.css-handles";
require("./css/style.css");

const CSS_HANDLES = ["tabla", "tableTitle"];

//const images = require["context"]("./assets/images", true);
//const icons = require["context"]("./assets/icons", true);
//const data = require["context"](`./csv`, true);

const CsvCharacteristics: FunctionComponent = ({}) => {
  const valuesFromContext = useProduct();
  const { product } = valuesFromContext;
  /*console.log("values");
  console.log(valuesFromContext);
  console.log("priduct");
  console.log(product);*/
  console.log("valuesFromContext ==");
  const handles = useCssHandles(CSS_HANDLES);
  const especificaciones = product.description;
  let dta;
  dta = separarCadenas(especificaciones);

  return (
    <div>
      <div>
        {/* <div className={handles.tableTitle}>
          <h2 className={"t-heading-5 mb5 mt0"}>Especificaciones</h2>
        </div> */}
        <div className={handles.tabla}>
          <CsvToHtmlTable data={dta} csvDelimiter="," />
        </div>
      </div>
    </div>
  );
  function separarCadenas(cadena) {
    let arrayCadena = cadena.split("%-!-%!");
    if (arrayCadena[1]) {
      let resultadoSeparado = arrayCadena[1].split("|");
      let resultado = "";
      resultadoSeparado.map(
        (contenido: any) => (resultado += contenido + " \n")
      );
      //return arrayCadena[1].replace("|", "\n");
      return resultado;
    } else {
      return "Este producto no tiene especificaciones";
    }
  }
};
export default CsvCharacteristics;
