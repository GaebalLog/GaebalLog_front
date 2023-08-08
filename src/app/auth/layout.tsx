import React from "react";

const AuthLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <main className="w-full h-[calc(100vh-94px)] flex justify-center items-center">
      {children}
    </main>
  );
};

export default AuthLayout;
