import React from "react";

const Contents: React.FC<{ contents: string }> = ({ contents }) => {
  return (
    <section
      className="no-tailwind"
      dangerouslySetInnerHTML={{ __html: contents }}
    />
  );
};

export default Contents;
