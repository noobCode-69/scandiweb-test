import React, { useState } from "react";
import MaxWidthContainer from "../../components/MaxWidthContainer/";
import axios from "axios";
import { AxiosError } from "axios";
import { useTranslation } from "react-i18next";
import { Attribute } from "../../types/product";
import "./ProductAdd.scss";
import { useNavigate } from "react-router";

interface ProductFormData {
  sku: string;
  name: string;
  price: number;
  type: string;
  attributes: Attribute[];
}

interface ProductAddProps {
  showToast: (message: string) => void;
}

const attributeMap: { [key: string]: Attribute[] } = {
  DVD: [{ label: "Size", value: "", unit: "MB" }],
  Furniture: [
    { label: "Length", value: "", unit: "CM" },
    { label: "Width", value: "", unit: "CM" },
    { label: "Height", value: "", unit: "CM" },
  ],
  Book: [{ label: "Weight", value: "", unit: "KG" }],
};

const productDescriptionMap: { [key: string]: string } = {
  DVD: "Please provide Size",
  Furniture: "Please provide Dimensions",
  Book: "Please provide Weight",
};

const attributeValidationMap: {
  [key: string]: { validate: (value: string) => boolean; message: string };
} = {
  Size: {
    validate: (value: string) => /^\d+(\.\d+)?$/.test(value),
    message: "Size should be an integer.",
  },
  Length: {
    validate: (value: string) => /^\d+(\.\d+)?$/.test(value),
    message: "Length should be a number.",
  },
  Width: {
    validate: (value: string) => /^\d+(\.\d+)?$/.test(value),
    message: "Width should be a number.",
  },
  Height: {
    validate: (value: string) => /^\d+(\.\d+)?$/.test(value),
    message: "Height should be a number.",
  },
  Weight: {
    validate: (value: string) => /^\d+(\.\d+)?$/.test(value),
    message: "Weight should be a number.",
  },
};

const attributeIdMap: { [key: string]: string } = {
  Size: "size",
  Length: "length",
  Width: "width",
  Height: "height",
  Weight: "weight",
};

const initialFormData: ProductFormData = {
  sku: "",
  name: "",
  price: 0,
  type: "",
  attributes: [],
};

const ProductAdd: React.FC<ProductAddProps> = ({ showToast }) => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const [formData, setFormData] = useState<ProductFormData>(initialFormData);

  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string[]>([]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleAttributeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => {
      const { attributes } = prevFormData;
      const attributeIndex = attributes.findIndex(
        (attribute) => attribute.label === name
      );
      const updatedAttribute = { ...attributes[attributeIndex], value };

      const updatedAttributes = [
        ...attributes.slice(0, attributeIndex),
        updatedAttribute,
        ...attributes.slice(attributeIndex + 1),
      ];

      return {
        ...prevFormData,
        attributes: updatedAttributes,
      };
    });
  };

  const handleTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      type: value,
      attributes: attributeMap[value] || [],
    }));
  };

  const validateForm = (): string[] => {
    const formErrors: string[] = [];

    if (formData.sku.trim() === "") {
      formErrors.push("SKU should not be empty");
    }
    if (formData.name.trim() === "") {
      formErrors.push("Name should not be empty");
    }

    if (formData.type.trim() === "") {
      formErrors.push("Product Type should not be empty");
    }

    const invalidAttributes = formData.attributes.filter((attribute) => {
      const validationRule = attributeValidationMap[attribute.label];
      return validationRule && !validationRule.validate(attribute.value);
    });

    const invalidAttributesMessages = invalidAttributes.map((attribute) => {
      const validationRule = attributeValidationMap[attribute.label];
      return validationRule.message;
    });

    return [...formErrors, ...invalidAttributesMessages];
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const formErrors = validateForm();
    if (formErrors.length !== 0) {
      setError(formErrors);
      return;
    }
    setError([]);
    setFormData(initialFormData);
    setLoading(true);
    try {
      await axios.post(
        "https://unfooling-overlay.000webhostapp.com/",
        JSON.stringify(formData),
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      showToast("Product Added Successfully");
    } catch (error) {
      if (error instanceof AxiosError) {
        showToast(`Error: ${error.message}`);
      }
    } finally {
      setLoading(false);
      navigate("/");
    }
  };

  const handleCancel = async () => {
    setError([]);
    setFormData(initialFormData);
    navigate("/");
  };

  const renderAttributeInputs = (): JSX.Element | null => {
    const { attributes, type: productType } = formData;
    if (attributes.length == 0) {
      return null;
    }
    return (
      <div className="form__attributes">
        <div className="form_attributes__description">
          *{productDescriptionMap[productType]}
        </div>

        {attributes.map((attribute) => {
          const { label, value, unit } = attribute;
          const attributeId = attributeIdMap[label];
          return (
            <div className="form__controller" key={attribute.label}>
              <label className="form__controller__label">
                {label} ({unit})
              </label>

              <input
                id={attributeId}
                type="text"
                name={label}
                value={value || ""}
                onChange={handleAttributeChange}
                className="form__controller__input"
              />
            </div>
          );
        })}
      </div>
    );
  };

  const renderFormController = (
    label: string,
    type: string,
    value: string | number,
    onChange: (
      e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
    ) => void,
    name: string
  ): JSX.Element => {
    return (
      <div className="form__controller">
        <label className="form__controller__label">{label}</label>
        <input
          id={name}
          className="form__controller__input"
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          min={0}
        />
      </div>
    );
  };

  const renderForm = (): JSX.Element => {
    return (
      <form id="product_form" className="form">
        {renderFormController(
          "SKU ",
          "text",
          formData.sku,
          handleChange,
          "sku"
        )}
        {renderFormController(
          "Name ",
          "text",
          formData.name,
          handleChange,
          "name"
        )}
        {renderFormController(
          "Price ($) ",
          "number",
          formData.price,
          handleChange,
          "price"
        )}
        <div className="form__controller selector">
          <label className="form__controller__label">Type</label>
          <select
            className="form__controller__input selector__select"
            name="productType"
            id="productType"
            value={formData.type}
            onChange={handleTypeChange}
          >
            <option value="">Select a type</option>
            {Object.keys(attributeMap).map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
        </div>
        {renderAttributeInputs()}
      </form>
    );
  };

  const renderHeading = (): JSX.Element => {
    return (
      <div className="header">
        <div className="header--left">
          <h2 className="header__heading">{t("product_add_title_text")}</h2>
        </div>
        <div className="header--right">
          <button
            disabled={loading}
            onClick={handleSubmit}
            className="header__save"
          >
            {t("save_text")}
          </button>
          <button onClick={handleCancel} className="header__cancel">
            {t("cancel_text")}
          </button>
        </div>
      </div>
    );
  };

  const renderErrors = (): JSX.Element | null => {
    if (error.length == 0) {
      return null;
    }
    return (
      <div className="errors__container">
        <ul className="errors__container__ul">
          {error.map((errorItem) => {
            return <li key={errorItem}>{errorItem}</li>;
          })}
        </ul>
      </div>
    );
  };

  return (
    <MaxWidthContainer maxWidth={"1200px"}>
      <div className="productAdd">
        {renderHeading()}
        <div className="content">
          {renderErrors()}
          {renderForm()}
        </div>
      </div>
    </MaxWidthContainer>
  );
};

export default ProductAdd;
