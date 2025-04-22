import { getQueryClient, trpc } from "@/trpc/server";

const AwardWinning2024Component = async () => {
  const queryClient = getQueryClient();
  const videos = await queryClient.fetchQuery(
    trpc.doodle_meme_videos.getMany.queryOptions()
  );
  return <div>{`${JSON.stringify(videos, null, 2)}`}</div>;
};

export default AwardWinning2024Component;
