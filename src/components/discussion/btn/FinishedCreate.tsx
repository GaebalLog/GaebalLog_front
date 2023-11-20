import React from "react";

import Button from "@/components/UI/buttons/base/Button";
interface props {
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
}
const FinishedCreate: React.FC<props> = ({ onClick }) => {
  return (
    <Button
      type="submit"
      className="px-12"
      size="bigLogin"
      color="black"
      onClick={onClick}
    >
      작성 완료
    </Button>
  );
};

export default FinishedCreate;
