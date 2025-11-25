/* eslint-disable @typescript-eslint/no-explicit-any */

import React, { Suspense } from "react";

import { defaultCarouselConfig } from "./doodle-meme-carousel-config";
import DoodleMemeCarousal from "./doodle-meme-carousel";

import { getQueryClient, HydrateClient, trpc } from "../../_trpc/server";
import { PageLoading } from "@/components/ui/loading";

interface DoodleMemeComponentProps {
  component_id: string;
  description: string;
  link: string;
  thumbnails: string;
  title: string;
  config: Record<string, any>;
}

const DoodleMemeComponent: React.FC<DoodleMemeComponentProps> = async ({
  // title,
  config,
}) => {
  const mergedConfig = {
    ...defaultCarouselConfig,
    ...config,
  };
  const queryClient = getQueryClient();
  void queryClient.prefetchQuery(
    trpc.doodle_meme_videos.getMany.queryOptions()
  );

  return (
    <main className="p-5 w-screen h-screen">
      <div className="container p-8 aspect-video mx-auto">
        <HydrateClient>
          <Suspense fallback={<PageLoading />}>
            <DoodleMemeCarousal config={mergedConfig}></DoodleMemeCarousal>
          </Suspense>
        </HydrateClient>
      </div>
    </main>
  );
};

export default DoodleMemeComponent;
