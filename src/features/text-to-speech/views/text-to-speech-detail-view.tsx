"use client";

import { useSuspenseQueries } from "@tanstack/react-query";

import { useTRPC } from "@/trpc/client";
import { SettingsPanel } from "../components/settings-panel";
import { TextInputPanel } from "../components/text-input-panel";
import { TTSVoicesProvider } from "../contexts/tts-voices-context";
import { VoicePreviewPanel } from "../components/voice-preview-panel";
import {
  TextToSpeechForm,
  type TTSFormValues,
} from "../components/text-to-speech-form";
import { VoicePreviewMobile } from "../components/voice-preview-mobile";

interface Props {
  generationId: string;
}

export const TextToSpeechDetailView = ({ generationId }: Props) => {
  const trpc = useTRPC();
  const [generationQuery, voicesQuery] = useSuspenseQueries({
    queries: [
      trpc.generations.getById.queryOptions({ id: generationId }),
      trpc.voices.getAll.queryOptions({}),
    ],
  });

  const data = generationQuery.data;
  const { custom: customVoices, system: systemVoices } = voicesQuery.data;
  const allVoices = [...customVoices, ...systemVoices];
  const fallbackVoiceId = allVoices[0]?.id ?? "";

  // Requested voice may no longer exist (deleted); fall back to first available
  const resolvedVoiceId =
    data.voiceId && allVoices.some((v) => v.id === data.voiceId)
      ? data.voiceId
      : fallbackVoiceId;

  const defaultValues: TTSFormValues = {
    text: data.text,
    voiceId: resolvedVoiceId,
    temperature: data.temperature,
    topP: data.topP,
    topK: data.topK,
    repetitionPenalty: data.repetitionPenalty,
  };

  // Use the denormalized voiceName snapshot instead of a populated voice relation
  // so the preview always shows the voice name at the time of generation,
  // even if the voice was later renamed or deleted.
  const generationVoice = {
    id: data.voiceId ?? undefined,
    name: data.voiceName,
  };

  return (
    <TTSVoicesProvider value={{ customVoices, systemVoices, allVoices }}>
      <TextToSpeechForm key={generationId} defaultValues={defaultValues}>
        <div className="flex flex-1 min-h-0 overflow-hidden">
          <div className="flex flex-col flex-1 min-h-0">
            <TextInputPanel />
            <VoicePreviewMobile
              audioUrl={data.audioUrl}
              voice={generationVoice}
              text={data.text}
            />
            <VoicePreviewPanel
              audioUrl={data.audioUrl}
              voice={generationVoice}
              text={data.text}
            />
          </div>
          <SettingsPanel />
        </div>
      </TextToSpeechForm>
    </TTSVoicesProvider>
  );
};
