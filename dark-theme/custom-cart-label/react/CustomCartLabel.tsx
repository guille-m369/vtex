import React, { useEffect, useState } from "react";
import { useOrderForm } from "vtex.order-manager/OrderForm";
import { useCssHandles } from "vtex.css-handles";
import "./typings/storefront";
//require("./css/style.css");

interface CustomCartLabelProps {
  children: React.ReactNode | null;
}

const CSS_HANDLES = ["container", "miniCartContainer", "label"];

const CustomCartLabel: StorefrontFunctionComponent<CustomCartLabelProps> = ({
  children,
}) => {
  const handles = useCssHandles(CSS_HANDLES);
  const { orderForm, loading } = useOrderForm();
  const [total, setTotal] = useState(0);

  useEffect(() => {
    let summary = String(orderForm.items.length);
    setTotal(Number(summary));
    console.log(orderForm);
  }, [orderForm]);

  if (loading) {
    return null;
  } else {
    return (
      <div className={`${handles.container} flex`}>
        <div className={`${handles.miniCartContainer}`}>{children}</div>

        <span className={`${handles.label} c-on-base`}>Carrito ({total}) </span>
      </div>
    );
  }
};

export default CustomCartLabel;
