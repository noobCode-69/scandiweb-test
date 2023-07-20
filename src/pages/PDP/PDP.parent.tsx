import { useEffect } from "react";
import PDP from "./PDP.component";
import { useTypedSelector } from "../../hooks/useTypedSelector";
import { useActions } from "../../hooks/useActions";

function PDPParent() {
  const { data, error, loading } = useTypedSelector((state) => {
    return state.products;
  });
  const { currency } = useTypedSelector((state) => {
    return state.currency;
  });
  const { fetchProducts, toggleProductItem, massDeleteProducts } = useActions();
  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);
  return (
    <PDP
      massDeleteProducts={massDeleteProducts}
      toggleProductItem={toggleProductItem}
      loading={loading}
      error={error}
      products={data}
      currency={currency}
    />
  );
}

export default PDPParent;
