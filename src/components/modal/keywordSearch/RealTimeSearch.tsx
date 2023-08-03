import React from "react";
import Image from "next/image";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";

import Input from "@/components/designSystem/Input";

import search from "../../../../public/assets/home/search.png";
import NonPortalModal from "../NonPortalModal";

interface realtimeSearchProps {
  value: string;
  onChange: React.Dispatch<React.SetStateAction<string>>;
}

const RealtimeSearch = ({ value, onChange }: realtimeSearchProps) => {
  const modalRef = React.useRef<HTMLUListElement | null>(null);
  const [isModal, setIsModal] = React.useState<boolean>(false);
  const inputRef = React.useRef<HTMLLabelElement | null>(null);

  const { data } = useQuery({
    queryKey: ["liveSearch"],
    queryFn: () => axios.get("/api/liveSearch"),
  });

  const closeOnOutsideClick = (event: MouseEvent) => {
    if (!(event.target instanceof Node)) return;
    const isClickInsideInput = inputRef.current?.contains(event.target);
    const isClickInsideModal = modalRef.current?.contains(event.target);
    if (!isClickInsideInput && !isClickInsideModal) setIsModal(false);
  };

  React.useEffect(() => {
    setIsModal(Boolean(value));
  }, [value]);

  React.useEffect(() => {
    document.addEventListener("mousedown", closeOnOutsideClick);
    return () => document.removeEventListener("mousedown", closeOnOutsideClick);
  }, []);

  return (
    <div className="w-full">
      <label
        data-testid="realTimeInput"
        htmlFor="searchModal"
        className="relative"
        ref={inputRef}
      >
        <Input
          type="searchModal"
          placeholder="키워드를 추가하여 나만의 키워드를 만들어 보세요."
          value={value}
          onChange={onChange}
        />
        {isModal && (
          <NonPortalModal topLeft={{ top: 50, left: 19.5 }} noneBackdrop>
            <ul className="w-[1180px] shadow-xl" ref={modalRef}>
              {data?.data.map((result: string, i: number) => {
                return (
                  <li
                    key={i}
                    className={`flex items-center w-full h-[60px] bg-white cursor-pointer hover:bg-gray-200`}
                    onClick={() => setIsModal((prev) => !prev)}
                  >
                    <Image
                      className="px-6"
                      src={search}
                      width={18}
                      height={18}
                      alt="돋보기"
                    />
                    <span>{result}</span>
                  </li>
                );
              })}
            </ul>
          </NonPortalModal>
        )}
      </label>
    </div>
  );
};

export default RealtimeSearch;
