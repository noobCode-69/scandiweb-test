import React from "react";
import "./Navbar.scss";
import { UrlMap, UrlMapItem } from "./Navbar.config";
import { Link, useLocation } from "react-router-dom";

const Navbar: React.FC = () => {
  const { pathname: currentUrl } = useLocation();

  const renderTitle = (): JSX.Element => {
    return <h2 className="navbar__heading">Scandiweb</h2>;
  };

  const renderLinks = (): JSX.Element => {
    return (
      <ul className="navbar__links">
        {UrlMap.map((url) => {
          return renderLink(url);
        })}
      </ul>
    );
  };

  const renderInactiveLink = (text: string): JSX.Element => {
    return (
      <li className="navbar__links__link link_active" key={text}>
        {text}
      </li>
    );
  };

  const renderActiveLink = (text: string, href: string): JSX.Element => {
    return (
      <li key={text}>
        <Link className="navbar__links__link link_inactive" to={href}>
          {text}
        </Link>
      </li>
    );
  };

  const renderLink = (url: UrlMapItem): JSX.Element => {
    const { text, href } = url;
    if (currentUrl == href) {
      return renderInactiveLink(text);
    }
    return renderActiveLink(text, href);
  };

  return (
    <div className="navbar">
      {renderTitle()}
      {renderLinks()}
    </div>
  );
};

export default Navbar;
