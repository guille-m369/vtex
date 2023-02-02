import React from "react";
import useProduct from "vtex.product-context/useProduct";
import { useCssHandles } from "vtex.css-handles";
import "./typings/storefront";

const CSS_HANDLES = ["categoria"];

const ShowCategory: StorefrontFunctionComponent = ({}) => {
  const handles = useCssHandles(CSS_HANDLES);
  const valuesFromContext = useProduct();
  const { product } = valuesFromContext;
  const { properties } = product;

  let categoria = findValue("Tipo de Producto", properties);

  console.log("Product:", product);

  return (
    <div className={`${handles.categoria} c-on-base`}>
      {categoria}
    </div>
  );
};

function findValue(key, content) {
  var value = "";

  for (let i = 0; i < content.length; i++) {
    if (content[i].name) {
      if (key === content[i].name) {
        value = content[i].values;
      }
    } else {
      value = "N/A";
    }
  }
  return value;
}
export default ShowCategory;
