import "./index.scss";

import React, { useState } from "react";

interface TooltipProps {
  text?: string;
  children: React.ReactNode;
  className?: string;
}

export const Tooltip = ({ text, children, className = "" }: TooltipProps) => {
  const [visible, setVisible] = useState(false);

  if (!text) {
    return <>{children}</>;
  }

  return (
    <div
      className={`rich-presence-tooltip-anchor ${className}`}
      onMouseEnter={() => setVisible(true)}
      onMouseLeave={() => setVisible(false)}
    >
      {children}
      {visible && (
        <div className="rich-presence-tooltip" role="tooltip">
          {text}
        </div>
      )}
    </div>
  );
};

export default Tooltip;
