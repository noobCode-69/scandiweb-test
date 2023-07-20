import React from "react";
import "./LoadingSpinner.scss";

const LoadingSpinner: React.FC = () => {
  return (
    <div className="loading_parent">
      <div className="loading_parent__spinner"></div>
    </div>
  );
};

export default LoadingSpinner;
