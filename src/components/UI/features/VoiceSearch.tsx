import React from "react";
import SpeechRecognition from "react-speech-recognition";
import { useSpeechRecognition } from "react-speech-recognition";

import useIcon from "@/hooks/useIcon";
import { BG_COLOR, TEXT_COLOR } from "@/config/constants/colors";

import BouncedMic from "./BouncedMic";
interface props {
  closeModal: () => void;
  setVoice: (value: string) => void;
}
const VoiceSearch: React.FC<props> = ({ closeModal, setVoice }) => {
  const [validation, setValidation] = React.useState(false);
  const { isMicrophoneAvailable, transcript, resetTranscript, listening } =
    useSpeechRecognition();
  const { getIcon } = useIcon();
  const close = getIcon("close", 20, 20, "cursor hover");
  const voiceSearch = getIcon("voiceSearch", 100, 100, "cursor hover");

  const stopListening = () => {
    SpeechRecognition.stopListening();
    if (transcript !== "") setVoice(transcript);
    resetTranscript();
    closeModal();
  };

  // 음성입력이 되고 0.1초마다 음성입력이 없으면 검색
  React.useEffect(() => {
    const interval = setInterval(() => {
      if (transcript !== "" && !listening) stopListening();
      else if (transcript === "" && !listening) {
        SpeechRecognition.stopListening();
        setValidation(true);
      }
    }, 100);
    return () => clearInterval(interval);
  }, [transcript, listening]);

  React.useEffect(() => {
    SpeechRecognition.startListening();
    return () => stopListening();
  }, []);

  return (
    <div
      className={`relative w-[780px] h-[488px] px-[24px] pt-[68px] ${BG_COLOR.general02}`}
    >
      {/* 마이크가 동작하지 않는 경우 */}
      {!isMicrophoneAvailable && (
        <>
          <p className="text-[24px]">음성으로 검색</p>
          <p className="mt-[40px]">
            음성으로 검색하려면 브라우저 설정으로 이동해 마이크에 대한 엑세스를
            허용하세요.
          </p>
          <BouncedMic />
        </>
      )}
      {/* 정상 동작할 경우 */}
      {isMicrophoneAvailable && listening && (
        <>
          <p className="text-[24px]">듣는 중...</p>
          <p className={`text-[20px] mt-[40px] ${TEXT_COLOR.general04}`}>
            검색어 : {transcript}
          </p>
          <BouncedMic />
        </>
      )}
      <button onClick={closeModal} className="absolute top-[24px] right-[24px]">
        {close}
      </button>
      {isMicrophoneAvailable && validation && !listening && (
        <>
          <p className="text-[24px]">인식하지 못하였습니다.</p>
          <p className="mt-[40px]">아래 버튼을 클릭하여 다시 시도하세요.</p>
          <div
            className="absolute flex justify-center items-center bottom-[53px] left-[50%] translate-x-[-50%]"
            onClick={() => SpeechRecognition.startListening()}
          >
            {voiceSearch}
          </div>
        </>
      )}
    </div>
  );
};

export default VoiceSearch;
