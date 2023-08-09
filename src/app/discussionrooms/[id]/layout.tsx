import React from "react";

export interface chatRoomParams {
  params: {
    id: string;
  };
}

export const generateMetadata = ({ params: { id } }: chatRoomParams) => {
  return {
    id,
  };
};

const ChatRoomLayout: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return (
    <main className="w-full h-[calc(100vh-94px)] flex justify-center items-center">
      {children}
    </main>
  );
};

export default ChatRoomLayout;

// export const generateStaticParams = async() => {
//   return;
// }
