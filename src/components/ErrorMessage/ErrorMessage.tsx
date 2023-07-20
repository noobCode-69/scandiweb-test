import React from "react";
import "./ErrorMessage.scss";

interface ErrorMessageProps {
  message: string;
}

const ErrorMessage: React.FC<ErrorMessageProps> = ({ message }) => {
  return (
    <div className="error_parent">
      <h2 className="error_parent__header">{message}</h2>
    </div>
  );
};

export default ErrorMessage;
