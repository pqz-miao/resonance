"use client";

import { useSuspenseQuery } from "@tanstack/react-query";

import { useTRPC } from "@/trpc/client";
import { SettingsPanel } from "../components/settings-panel";
import { TextInputPanel } from "../components/text-input-panel";
import { TTSVoicesProvider } from "../contexts/tts-voices-context";
import { VoicePreviewPlaceholder } from "../components/voice-preview-placeholder";
import {
  TextToSpeechForm,
  defaultTTSValues,
  type TTSFormValues,
} from "../components/text-to-speech-form";

interface Props {
  initialValues?: Partial<TTSFormValues>;
}

export const TextToSpeechView = ({ initialValues }: Props) => {
  const trpc = useTRPC();
  const { data: voices } = useSuspenseQuery(
    trpc.voices.getAll.queryOptions({}),
  );

  const { custom: customVoices, system: systemVoices } = voices;
  const allVoices = [...customVoices, ...systemVoices];
  const fallbackVoiceId = allVoices[0]?.id ?? "";

  // Requested voice may no longer exist (deleted); fall back to first available
  const resolvedVoiceId =
    initialValues?.voiceId &&
    allVoices.some((v) => v.id === initialValues.voiceId)
      ? initialValues.voiceId
      : fallbackVoiceId;

  const defaultValues: TTSFormValues = {
    ...defaultTTSValues,
    ...initialValues,
    voiceId: resolvedVoiceId,
  };

  return (
    <TTSVoicesProvider value={{ customVoices, systemVoices, allVoices }}>
      <TextToSpeechForm defaultValues={defaultValues}>
        <div className="flex flex-1 min-h-0 overflow-hidden">
          <div className="flex flex-col flex-1 min-h-0">
            <TextInputPanel />
            <VoicePreviewPlaceholder />
          </div>
          <SettingsPanel />
        </div>
      </TextToSpeechForm>
    </TTSVoicesProvider>
  );
};
