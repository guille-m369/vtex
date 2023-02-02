import React, { FunctionComponent, useEffect} from "react";
import { useCssHandles } from "vtex.css-handles";

require(".././css/style.css");
interface AccordionProps {
  children: React.ReactNode | null;
}

const CSS_HANDLES = [
  
];

const Modal: FunctionComponent<AccordionProps> = ({children}) => {
  
  // useEffect(()=>{
  //   //Usaré el orderForm() y cuando el useEffect detecte algun cambio en el me cierra el popup
    
  // },[renderChildren]);


  return (
        <div>
           
           <p>hola</p>

             <div>{children[1]}</div> 
         
        </div>
      );
  
};

export default Modal;
