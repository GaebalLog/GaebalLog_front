import React from "react";
import { useSpeechRecognition } from "react-speech-recognition";

import useIcon from "@/hooks/useIcon";
import { BG_COLOR } from "@/constants/global/colors";

const BouncedMic = () => {
  const { isMicrophoneAvailable, transcript } = useSpeechRecognition();
  const { getIcon } = useIcon();
  const voiceSearch = getIcon("voiceSearch", 100, 100);
  return (
    <div className="absolute flex justify-center items-center bottom-[53px] left-[50%] translate-x-[-50%]">
      {isMicrophoneAvailable && transcript !== "" && (
        <span
          className={`animate-ping absolute inline-flex h-[90px] w-[90px] rounded-full ${BG_COLOR.accentPurple} opacity-100 -z-5`}
        />
      )}
      {isMicrophoneAvailable && transcript === "" && (
        <span
          className={`animate-ping absolute inline-flex h-[90px] w-[90px] rounded-full ${BG_COLOR.general07} opacity-30 -z-10`}
        />
      )}
      {voiceSearch}
    </div>
  );
};

export default BouncedMic;
