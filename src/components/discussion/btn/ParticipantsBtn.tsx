import React from "react";

import useIcon from "@/hooks/useIcon";
import Button from "@/components/designSystem/Button";

interface props {
  count: number;
}
const ParticipantsBtn: React.FC<props> = ({ count }) => {
  const { getIcon } = useIcon();
  const participantsIcon = getIcon("people", 18, 16);

  return (
    <Button
      size="withIcon"
      color="background"
      rounded
      border
      className="cursor-default"
    >
      {participantsIcon}
      {count}
    </Button>
  );
};

export default ParticipantsBtn;
