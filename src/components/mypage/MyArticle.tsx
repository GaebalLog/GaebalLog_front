import React from "react";

interface props {
  mode: "discussion" | "post";
}
const MyArticle: React.FC<props> = ({ mode }) => {
  console.log(mode);
  return <div></div>;
};

export default MyArticle;
