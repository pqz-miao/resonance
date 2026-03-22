import { SettingsPanel } from "../components/settings-panel";
import { TextInputPanel } from "../components/text-input-panel";
import { VoicePreviewPlaceholder } from "../components/voice-preview-placeholder";
import {
  TextToSpeechForm,
  defaultTTSValues,
} from "../components/text-to-speech-form";

export const TextToSpeechView = () => {
  return (
    <TextToSpeechForm defaultValues={defaultTTSValues}>
      <div className="flex flex-1 min-h-0 overflow-hidden">
        <div className="flex flex-col flex-1 min-h-0">
          <TextInputPanel />
          <VoicePreviewPlaceholder />
        </div>
        <SettingsPanel />
      </div>
    </TextToSpeechForm>
  );
};
