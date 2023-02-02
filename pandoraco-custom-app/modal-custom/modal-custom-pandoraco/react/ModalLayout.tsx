import React, { Fragment } from "react";
import {useState} from "react"
import "./typings/storefront";
import Modal from "./components/Modal";

// import Versonormal from "./components/versonormal";

const CSS_HANDLES = ["accordion"] as const;

interface Props {
 

  children: React.ReactNode | null;
  
}
const ModalLayout: StorefrontFunctionComponent<Props> = ({children}) => {
  // grab product information
  // Similar a componentDidMount y componentDidUpdate:

   // useEffect(()=>{
  //   //Usaré el orderForm() y cuando el useEffect detecte algun cambio en el me cierra el popup
    
  // },[]);

  const [openModal, setOpenModal] = useState(false)
  return (
    <div>
            <Fragment>
            <button  className="openModal-btn" onClick={() => setOpenModal(true)}>open modal</button>
              
               {openModal && <Modal children={children}/>}
             
            </Fragment>
    </div>
  );
};


ModalLayout.schema = {
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

export default ModalLayout;
