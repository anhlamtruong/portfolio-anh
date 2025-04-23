/* eslint-disable @typescript-eslint/no-explicit-any */

import React, { Suspense } from "react";

import { defaultCarouselConfig } from "./doodle-meme-carousel-config";
import DoodleMemeCarousal from "./doodle-meme-carousel";

import { getQueryClient, HydrateClient, trpc } from "../../_trpc/server";
import Loading from "../../_component/loading";

interface DoodleMemeComponentProps {
  component_id: string;
  description: string;
  link: string;
  thumbnails: string;
  title: string;
  config: Record<string, any>;
}

const DoodleMemeComponent: React.FC<DoodleMemeComponentProps> = async ({
  title,
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
      <h2 className="text-lg font-semibold">{title}</h2>
      <div className="container p-8 aspect-video mx-auto">
        <HydrateClient>
          <Suspense fallback={<Loading />}>
            <DoodleMemeCarousal config={mergedConfig}></DoodleMemeCarousal>
          </Suspense>
        </HydrateClient>
      </div>
    </main>
  );
};

export default DoodleMemeComponent;
