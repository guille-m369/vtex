import React, { FunctionComponent } from "react";
import { useCssHandles } from "vtex.css-handles";



/**Categorias principales */
import agricola from "../assets/categorias/agriculture.svg";
import cerrajeria from "../assets/categorias/Cerrajeria.svg";
import ferreteria from "../assets/categorias/Ferreteria.svg";
import herramientas from "../assets/categorias/Herramientas.svg";
import herramientas_electricas from "../assets/categorias/Herramientas_Electricas.svg";
import hogar_y_limpieza from "../assets/categorias/Hogar_y_limpieza.svg";
import iluminacion from "../assets/categorias/Iluminacion.svg";
import jardineria from "../assets/categorias/Jardineria.svg";
import material_electrico from "../assets/categorias/Material_Electrico.svg";
import plomeria from "../assets/categorias/plomeria.svg";
import seguridad_industrial from "../assets/categorias/seguridad_industrial.svg";
import placeholder from "../assets/categorias/image.png";//Imagen default

/**Subcategorias */
/*
import aretes from "../assets/earing.png";
import brazaletes from "../assets/bracelet.png";
import collares from "../assets/necklace.png";
import disney from "../assets/disney.png";
import placeholder from "../assets/100.png";*/

const CSS_HANDLES = [
  "itemIcon"
] as const;

interface ImgDisplayProps {
  type: string;
}

const renderSwitch = (param: any) => {
  switch (param) {
    case "Agrícola":
      return agricola;
    case "Cerrajería":
      return cerrajeria;
    case "Ferretería":
      return ferreteria;
    case "Herramientas":
      return herramientas;
    case "Herramientas eléctricas":
      return herramientas_electricas;
    case "Hogar y limpieza":
      return hogar_y_limpieza;
    case "Iluminación":
      return iluminacion;
    case "Jardinería":
      return jardineria;
    case "Material eléctrico":
      return material_electrico;
    case "Plomería":
      return plomeria;
    case "Seguridad industrial":
      return seguridad_industrial;
    default:
      return placeholder;
  }
};

export const ImageDisplay: FunctionComponent<ImgDisplayProps> = ({ type }) => {
  //console.log(type);
  const handles = useCssHandles(CSS_HANDLES);

  return (
    <img className={handles.itemIcon} style={{ maxWidth: "100%" }} src={renderSwitch(type)} alt={type} />
  );
};
