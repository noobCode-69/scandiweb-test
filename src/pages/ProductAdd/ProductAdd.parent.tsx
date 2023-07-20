import ProductAdd from "./ProductAdd.component";
import { useContext } from "react";

import { ToastContext } from "../../App";

function ProductAddParent() {
  const context = useContext(ToastContext);

  if (context == undefined) {
    throw new Error("ToastContext must be within ToastContextProvider");
  }

  const { showToast } = context;

  return (
    <div>
      <ProductAdd showToast={showToast} />
    </div>
  );
}

export default ProductAddParent;
