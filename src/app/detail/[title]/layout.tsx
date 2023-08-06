import React from "react";

export interface detailParams {
  params: {
    title: string;
  };
}

export const generateMetadata = ({ params: { title } }: detailParams) => {
  return {
    title,
  };
};

const DetailLayout: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return <main className="flex flex-col items-center">{children}</main>;
};

export default DetailLayout;

// export async function generateStaticParams() {
//   return;
// }
