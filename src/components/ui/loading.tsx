import React from "react";

const LoadingVideo = ({ src }: { src: string }) => (
  <div className="flex items-center justify-center min-h-screen">
    <video
      autoPlay
      loop
      muted
      playsInline
      className="w-screen h-screen object-cover"
      preload="auto"
    >
      <source src={src} type="video/webm" />
      Your browser does not support the video tag.
    </video>
  </div>
);

export const PageLoading = () => (
  <LoadingVideo src="/loading/page-loading.webm" />
);
export const ComponentLoading = () => (
  <LoadingVideo src="/loading/component-loading.webm" />
);
