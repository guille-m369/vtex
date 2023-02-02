import React, { FunctionComponent } from 'react';
import { useDevice } from "vtex.device-detector";
import CustomDesktopMenu from "./CustomDesktopMenu";
import CustomMobileMenu from './CustomMobileMenu';

interface CustomMenuProps {
  menu: any;
  dropRigthMenus: any;
  children: React.ReactNode | null;
}



const CustomMenu: FunctionComponent<CustomMenuProps> = ({ menu, dropRigthMenus, children }) => {

    const { isMobile } = useDevice();


  
  return (
    isMobile ? (<CustomMobileMenu menu = {menu} children = {children}   />)
    : (<CustomDesktopMenu menu = {menu} dropRigthMenus= {dropRigthMenus}/>)
  );
};

export default CustomMenu;
