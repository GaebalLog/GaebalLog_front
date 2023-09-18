import React from "react";
import { useSetRecoilState } from "recoil";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import Button from "@/components/designSystem/Button";
import { modalAtom } from "@/constants/global/atoms";
import { authAPI } from "@/api/authAPI";
import { QUERY_KEYS } from "@/constants/global/querykeys";

const OkCancelButton: React.FC<{ data: string[] }> = ({ data }) => {
  const setIsModal = useSetRecoilState(modalAtom);
  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationFn: (slicedMyCategories: string[]) =>
      authAPI.postKeywords(slicedMyCategories),
    onSuccess() {
      queryClient.invalidateQueries([QUERY_KEYS.KEYWORDLIST]);
    },
  });

  const handleSubmit = () => {
    mutate(data);
  };

  return (
    <div className="self-end mt-[57px]">
      <Button
        className="mr-6"
        size="confirm"
        color="black"
        onClick={handleSubmit}
      >
        Ok
      </Button>
      <Button
        size="confirm"
        color="cancelButton"
        border
        onClick={() => setIsModal((prev) => !prev)}
      >
        Cancel
      </Button>
    </div>
  );
};

export default OkCancelButton;
