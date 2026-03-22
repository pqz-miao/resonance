import { TextToSpeechLayout } from "@/features/text-to-speech/views/text-to-speech-layout";

interface Props {
  children: React.ReactNode;
}

const Layout = ({ children }: Props) => {
  return <TextToSpeechLayout>{children}</TextToSpeechLayout>;
};

export default Layout;
