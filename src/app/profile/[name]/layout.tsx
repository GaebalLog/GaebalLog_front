import React from "react";

import ProfileSidebar from "@/components/profile/ProfileSidebar";

export interface profileParams {
  params: {
    name: string;
  };
}

export const generateMetadata = ({ params: { name } }: profileParams) => {
  return {
    title: `${name}님의 프로필`,
    describe: `${name}님의 프로필입니다.`,
  };
};

const ProfileLayout: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return (
    <main className="flex junstify-center">
      <ProfileSidebar />
      {children}
    </main>
  );
};

export default ProfileLayout;
