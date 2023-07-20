import React from "react";
import "./404.scss";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

const PageNotFound: React.FC = () => {
  const { t } = useTranslation();
  return (
    <div className="page__container">
      <h2 className="page__text">{t("page_not_found_text")}</h2>
      <div className="page__link__container">
        <Link to={"/"}>{t("go_to_home_text")}</Link>
      </div>
    </div>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export default PageNotFound;
