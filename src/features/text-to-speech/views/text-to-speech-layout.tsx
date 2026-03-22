import { PageHeader } from "@/components/page-header";

interface Props {
  children: React.ReactNode;
}

export const TextToSpeechLayout = ({ children }: Props) => {
  return (
    <div className="flex flex-col h-full min-h-0 overflow-hidden">
      <PageHeader title="Text to speech" />
      {children}
    </div>
  );
};
