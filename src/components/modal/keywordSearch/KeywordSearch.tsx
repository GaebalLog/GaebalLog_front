import React from "react";
import Image from "next/image";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

import { BG_COLOR } from "@/constants/global/colors";
import { FONT_FAMILY } from "@/constants/global/fonts";
import Input from "@/components/designSystem/Input";
import Button from "@/components/designSystem/Button";
import { darkAtom, modalAtom } from "@/constants/global/atoms";
import { server } from "@/tests/msw/server";

import Modal from "../Modal";
import close from "../../../../public/assets/images/common/close.png";
import darkClose from "../../../../public/assets/images/common/darkClose.png";

const style = {
  container: `flex justify-center w-[1330px] h-[700px] ${BG_COLOR.general02}}`,
  widthWrapper: `flex flex-col items-center w-11/12`,
  title: `text-2xl ${FONT_FAMILY.hack} mt-6 mb-8`,
  keyworBox: `self-start`,
  keyworBoxTitle: `text-[18px] leading-[22.5px] text-[#888888]`,
  keywordList: `flex flex-wrap gap-[10px] mt-[22px]`,
  line: `w-[1330px] h-[3px] bg-[#DCDCDC] mt-[30px] mb-5`,
  buttonBox: `self-end mt-[57px]`,
};

const KeywordSearch = () => {
  const [keyword, setKeyword] = React.useState("");
  const isDark = useRecoilValue(darkAtom);
  const setIsModal = useSetRecoilState(modalAtom);

  const { data: myCategories } = useQuery({
    queryKey: ["userCategories"],
    queryFn: () => axios.get("/api/userCategories"),
  });
  const { data: trendCategories } = useQuery({
    queryKey: ["trendCategories"],
    queryFn: () => axios.get("/api/trendCategories"),
  });

  React.useEffect(() => {
    if (process.env.NODE_ENV === "development") {
      server.listen();

      return () => {
        server.close();
      };
    }
  }, []);

  return (
    <Modal background>
      <div className={style.container}>
        <div className={style.widthWrapper}>
          <span className={style.title}>Add my keywords</span>
          <Input
            type="searchModal"
            placeholder="키워드를 추가하여 나만의 키워드를 만들어 보세요."
            value={keyword}
            onChange={setKeyword}
          />
          <div className={style.keyworBox}>
            <span className={style.keyworBoxTitle}>현재 나의 키워드</span>
            <ul className={style.keywordList}>
              {myCategories?.data.map((category: string[]) => {
                return (
                  <li
                    key={`my_${category}`}
                    data-testid={`my_${category}`}
                    className="mb-[6px]"
                  >
                    <Button size="category" color="background" rounded withIcon>
                      <span>#{category}</span>
                      <Image
                        className="ml-[10px]"
                        src={isDark ? darkClose : close}
                        width={18}
                        height={18}
                        alt="삭제"
                      />
                    </Button>
                  </li>
                );
              })}
            </ul>
          </div>
          <hr className={style.line} />
          <div className={style.keyworBox}>
            <span className={style.keyworBoxTitle}>실시간 인기 키워드</span>
            <ul className={style.keywordList}>
              {trendCategories?.data.map((category: string[]) => {
                return (
                  <li
                    key={`trend_${category}`}
                    data-testid={`trend_${category}`}
                    className="mb-[6px]"
                  >
                    <Button size="category" color="background" rounded>
                      #{category}
                    </Button>
                  </li>
                );
              })}
            </ul>
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
