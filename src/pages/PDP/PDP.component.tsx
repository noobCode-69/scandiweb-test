/* eslint-disable react-refresh/only-export-components */
/* eslint-disable @typescript-eslint/no-explicit-any */
import "./PDP.scss";
import MaxWidthContainer from "../../components/MaxWidthContainer/MaxWidthContainer";
import LoadingSpinner from "../../components/LoadingSpinner/LoadingSpinner";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";
import { ActionTypes } from "../../state/action-types";
import { Product } from "../../types/product";
import { convertCurrency } from "../../utils/CurrencyUtil";
import { Currency } from "../../types/currency";
import CurrencySelect from "../../components/CurrencySelect";
import { useTranslation } from "react-i18next";

interface PDPPropsTypes {
  products: Product[];
  loading: boolean;
  error: string | null;
  currency: Currency;
  toggleProductItem: (id: string) => {
    type: ActionTypes;
    payload: string;
  };
  massDeleteProducts: (products: string[]) => any;
}

const PDP: React.FC<PDPPropsTypes> = ({
  products,
  loading,
  error,
  toggleProductItem,
  massDeleteProducts,
  currency,
}) => {
  const { t } = useTranslation();

  const renderHeading = (): JSX.Element => {
    const productToDelete: string[] = products
      .filter((product) => product.isSet)
      .map((product) => product.sku);

    const isAnythingToDelete: boolean = loading || productToDelete.length != 0;

    return (
      <div className="header">
        <div className="header--left">
          <h2 className="header__heading">{t("product_list_title_text")}</h2>
        </div>
        <div className="header--right">
          <CurrencySelect />
          <button
            onClick={() => massDeleteProducts(productToDelete)}
            disabled={!isAnythingToDelete}
            className="header__delete"
          >
            {t("mass_delete_text")}
          </button>
        </div>
      </div>
    );
  };

  const renderLoading = (): JSX.Element => {
    return <LoadingSpinner />;
  };

  const renderError = (error: string): JSX.Element => {
    return <ErrorMessage message={error} />;
  };

  const renderPrice = (price: number): JSX.Element => {
    const convertedPrice = convertCurrency("$", price, currency);
    return (
      <span>
        {currency} {convertedPrice}
      </span>
    );
  };

  const renderAttributes = (attributes: any): JSX.Element => {
    return (
      <div>
        {attributes.map((attribute: any, index: string) => {
          const {
            label: attributeLabel,
            value: attributeValue,
            unit: attributeUnit,
          } = attribute;
          return (
            <div
              key={index}
              className="products__product__container--attribute"
            >
              <span>{attributeLabel}</span>
              <span> : </span>
              <span>
                {attributeValue} {attributeUnit}
              </span>
            </div>
          );
        })}
      </div>
    );
  };

  const renderProductItem = (product: Product): JSX.Element => {
    const { name, isSet, sku, price, attributes } = product;

    return (
      <li className="products__product" key={sku}>
        <input
          onChange={() => toggleProductItem(sku)}
          className="products__product__checkbox delete-checkbox"
          type="checkbox"
          checked={isSet}
        ></input>
        <div className="products__product__container">
          <div className="products__product__container--sku">{sku}</div>
          <div className="products__product__container--name">{name}</div>
          <div className="products__product__container--price">
            {renderPrice(price)}
          </div>
          <div className="products__product__container--attributes">
            {renderAttributes(attributes)}
          </div>
        </div>
      </li>
    );
  };

  const renderProductList = (): JSX.Element => {
    if (loading) {
      return renderLoading();
    }

    if (error) {
      // passing this coz type-guards make sure "error" is string and not "error | null"
      return renderError(error);
    }

    return (
      <ul className="products">
        {products.map((product) => {
          return renderProductItem(product);
        })}
      </ul>
    );
  };

  return (
    <MaxWidthContainer maxWidth={"1200px"}>
      <div className="pdp">
        {renderHeading()}
        {renderProductList()}
      </div>
    </MaxWidthContainer>
  );
};

export default PDP;
