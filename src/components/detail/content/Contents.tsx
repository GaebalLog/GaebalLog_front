import React from "react";

const Contents: React.FC<{ contents: string }> = ({ contents }) => {
  return (
    <div
      className="no-tailwind"
      dangerouslySetInnerHTML={{ __html: contents }}
    />
  );
};

export default Contents;
