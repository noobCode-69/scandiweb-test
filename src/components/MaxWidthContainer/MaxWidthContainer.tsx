import React, { ReactNode } from "react";
import "./MaxWidthContainer.scss";
interface MaxWidthContainerProps {
  maxWidth: string;
  children: ReactNode;
}

const MaxWidthContainer: React.FC<MaxWidthContainerProps> = ({
  maxWidth,
  children,
}) => {
  return (
    <div className="max_width" style={{ maxWidth: maxWidth }}>
      {children}
    </div>
  );
};

export default MaxWidthContainer;
