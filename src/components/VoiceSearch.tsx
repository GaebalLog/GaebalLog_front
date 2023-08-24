import React from "react";
import SpeechRecognition from "react-speech-recognition";
import { useSpeechRecognition } from "react-speech-recognition";

import useIcon from "@/hooks/useIcon";
import { BG_COLOR } from "@/constants/global/colors";
interface props {
  closeModal: () => void;
  setVoice: (value: string) => void;
}
const VoiceSearch: React.FC<props> = ({ closeModal, setVoice }) => {
  const { isMicrophoneAvailable, transcript, resetTranscript, listening } =
    useSpeechRecognition();

  const { getIcon } = useIcon();
  const close = getIcon("close", 20, 20, "cursor hover");
  const voiceSearch = getIcon("voiceSearch", 100, 100);

  const stopListening = () => {
    SpeechRecognition.stopListening();
    if (transcript !== "") setVoice(transcript);
    resetTranscript();
    closeModal();
  };

  // 음성입력이 되고 1초마다 음성입력이 없으면 검색
  React.useEffect(() => {
    const interval = setInterval(() => {
      if (transcript !== "" && !listening) stopListening();
    }, 100);
    return () => clearInterval(interval);
  }, [transcript, listening]);

  React.useEffect(() => {
    SpeechRecognition.startListening();
    return () => stopListening();
  }, []);

  return (
    <div
      className={`relative w-[780px] h-[488px] px-[24px] py-[30px] ${BG_COLOR.general02}`}
    >
      {!isMicrophoneAvailable && (
        <div>
          <h1>음성으로 검색</h1>
          <h2>
            음성으로 검색하려면 브라우저 설정으로 이동해 마이크에 대한 엑세스를
            허용하세요.
          </h2>
        </div>
      )}
      {isMicrophoneAvailable && <div className="text-[24px]">듣는 중...</div>}
      <span>검색어 : {transcript}</span>
      <button onClick={closeModal} className="absolute top-[24px] right-[24px]">
        {close}
      </button>
      <div className="absolute flex justify-center items-center bottom-[53px] left-[50%] translate-x-[-50%]">
        {isMicrophoneAvailable && (
          <span
            className={`animate-ping absolute inline-flex h-[90px] w-[90px] rounded-full ${BG_COLOR.general07} opacity-75 -z-10`}
          />
        )}
        {voiceSearch}
      </div>
    </div>
  );
};

export default VoiceSearch;
