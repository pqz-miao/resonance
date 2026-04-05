import { trpc, HydrateClient, prefetch } from "@/trpc/server";
import { TextToSpeechDetailView } from "@/features/text-to-speech/views/text-to-speech-detail-view";

interface Props {
  params: Promise<{ generationId: string }>;
}

const Page = async ({ params }: Props) => {
  const { generationId } = await params;

  prefetch(trpc.generations.getById.queryOptions({ id: generationId }));
  prefetch(trpc.voices.getAll.queryOptions({}));

  return (
    <HydrateClient>
      <TextToSpeechDetailView generationId={generationId} />
    </HydrateClient>
  );
};

export default Page;
