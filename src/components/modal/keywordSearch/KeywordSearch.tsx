import React from "react";
import { useSetRecoilState } from "recoil";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

import { BG_COLOR } from "@/constants/global/colors";
import { FONT_FAMILY } from "@/constants/global/fonts";
import Button from "@/components/designSystem/Button";
import { modalAtom } from "@/constants/global/atoms";
import { server } from "@/tests/msw/server";

import Modal from "../Modal";

import KeywordList from "./KeywordList";
import RealtimeSearch from "./RealTimeSearch";

const style = {
  container: `flex justify-center w-[1330px] h-[700px] ${BG_COLOR.general02}}`,
  widthWrapper: `flex flex-col items-center w-11/12`,
  title: `text-2xl ${FONT_FAMILY.hack} mt-6 mb-8`,
  keyworBox: `self-start w-full`,
  keyworBoxTitle: `text-[18px] leading-[22.5px] text-[#888888]`,
  line: `w-[1330px] h-[3px] bg-[#DCDCDC] mt-[30px] mb-5`,
  buttonBox: `self-end mt-[57px]`,
};

const KeywordSearch = () => {
  const [keyword, setKeyword] = React.useState("");
  const setIsModal = useSetRecoilState(modalAtom);

  const { data: myCategories, isLoading: myCategoriesLoading } = useQuery({
    queryKey: ["userCategories"],
    queryFn: () => axios.get("/api/userCategories"),
  });
  const { data: trendCategories, isLoading: trendCategoriesLoading } = useQuery(
    {
      queryKey: ["trendCategories"],
      queryFn: () => axios.get("/api/trendCategories"),
    },
  );

  React.useEffect(() => {
    if (process.env.NODE_ENV === "development") {
      server.listen();

      return () => {
        server.close();
      };
    }
  }, []);

  return (
    <Modal isBgColor onBackdropClick={() => setIsModal(false)}>
      <div className={style.container}>
        <div className={style.widthWrapper}>
          <span className={style.title}>Add my keywords</span>
          <RealtimeSearch value={keyword} onChange={setKeyword} />
          <div className={style.keyworBox}>
            <span className={style.keyworBoxTitle}>현재 나의 키워드</span>
            {
              <KeywordList
                data={myCategories?.data ?? []}
                type="myCategory"
                noneIcon
                isLoading={myCategoriesLoading}
              />
            }
          </div>
          <hr className={style.line} />
          <div className={style.keyworBox}>
            <span className={style.keyworBoxTitle}>실시간 인기 키워드</span>
            {
              <KeywordList
                data={trendCategories?.data ?? []}
                type="trendCategory"
                isLoading={trendCategoriesLoading}
              />
            }
          </div>
          <div className={style.buttonBox}>
            <Button className="mr-6" size="confirm" color="black">
              Ok
            </Button>
            <Button
              size="confirm"
              color="cancleButton"
              border
              onClick={() => setIsModal((prev) => !prev)}
            >
              Cancle
            </Button>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default KeywordSearch;
