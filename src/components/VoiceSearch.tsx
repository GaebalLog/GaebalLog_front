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
  const { transcript, resetTranscript, listening } = useSpeechRecognition();
  const { getIcon } = useIcon();
  const mike = getIcon("mike", 100, 100, "cursor hover");

  const stopListening = () => {
    SpeechRecognition.stopListening();
    if (transcript !== "") setVoice(transcript);
    resetTranscript();
    closeModal();
  };
  // 음성인식에 따른 처리
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
    <div className={`w-[780px] h-[488px] ${BG_COLOR.general02}`}>
      {listening && <div>Listening...</div>}
      <span>{transcript}</span>
      <button onClick={closeModal}>닫기</button>
      {mike}
    </div>
  );
};

export default VoiceSearch;
