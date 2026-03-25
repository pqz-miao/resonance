import type { Metadata } from "next";

import { trpc, HydrateClient, prefetch } from "@/trpc/server";
import { TextToSpeechView } from "@/features/text-to-speech/views/text-to-speech-view";

export const metadata: Metadata = {
  title: "Text to Speech",
};

interface Props {
  searchParams: Promise<{ text?: string; voiceId?: string }>;
}

const Page = async ({ searchParams }: Props) => {
  const { text, voiceId } = await searchParams;

  prefetch(trpc.voices.getAll.queryOptions({}));

  return (
    <HydrateClient>
      <TextToSpeechView initialValues={{ text, voiceId }} />
    </HydrateClient>
  );
};

export default Page;
