import type { Metadata } from "next";

import { TextToSpeechView } from "@/features/text-to-speech/views/text-to-speech-view";

export const metadata: Metadata = {
  title: "Text to Speech",
};

const Page = () => {
  return <TextToSpeechView />;
};

export default Page;
