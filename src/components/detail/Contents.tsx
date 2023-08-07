import React from "react";

const Contents: React.FC<{ contents: string }> = ({ contents }) => {
  console.log(contents);

  return (
    <section
      className="no-tailwind"
      dangerouslySetInnerHTML={{ __html: contents }}
    />
  );
};

export default Contents;
