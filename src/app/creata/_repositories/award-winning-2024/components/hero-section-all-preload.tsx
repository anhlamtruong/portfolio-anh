// "use client";

// import React, { useEffect, useState } from "react";
// import { useTRPC } from "@/app/creata/_trpc/client";
// import { useSuspenseQuery } from "@tanstack/react-query";
// import "../styles/index.css";

// const HeroSection = () => {
//   const trpc = useTRPC();
//   const { data } = useSuspenseQuery(
//     trpc.award_winning_2024.getHeroVideos.queryOptions()
//   );
//   const totalVideos = data.length;

//   const [currentIndex, setCurrentIndex] = useState(0);
//   const [videoBlobs, setVideoBlobs] = useState<string[]>([]);

//   const [hasClicked, setHasClicked] = useState(false);
//   const [isLoading, setIsLoading] = useState(true);
//   const [loadedVideos, setLoadedVideos] = useState(0);

//   useEffect(() => {
//     let isMounted = true;
//     const preloadVideos = async () => {
//       const blobs = await Promise.all(
//         data.map(async (video) => {
//           const res = await fetch(video.url);
//           const blob = await res.blob();
//           return URL.createObjectURL(blob);
//         })
//       );
//       if (isMounted) setVideoBlobs(blobs);
//     };
//     preloadVideos();
//     return () => {
//       isMounted = false;

//       videoBlobs.forEach((url) => URL.revokeObjectURL(url));
//     };
//     // eslint-disable-next-line
//   }, [data]);

//   const upcomingVideoIndex = (currentIndex + 1) % totalVideos;

//   const handleMiniVideoClick = () => {
//     setHasClicked(true);
//     setCurrentIndex((prevIndex) => (prevIndex + 1) % totalVideos);
//   };

//   const handleVideoLoad = () => {
//     setLoadedVideos((prev) => (prev + 1) % totalVideos);
//   };

//   const getVideoSource = (index: number) => {
//     return videoBlobs[index] || undefined;
//   };

//   if (!data || data.length === 0) {
//     return <div>No videos available</div>;
//   }

//   return (
//     <section className=" relative h-dvh w-screen">
//       <div
//         id="video-frame"
//         className="relative z-10 h-dvh w-screen overflow-hidden rounded-lg bg-custom-blue-75"
//       >
//         <div>
//           <div className="mask-clip-path absolute-center absolute-center z-50 size-64 cursor-pointer overflow-hidden rounded-lg">
//             <div
//               onClick={handleMiniVideoClick}
//               className="origin-center scale-50 opacity-0 transition-all duration-500 ease-in hover:scale-100 hover:opacity-100"
//             >
//               <video
//                 key={getVideoSource(upcomingVideoIndex)}
//                 id="current-video"
//                 autoPlay
//                 muted
//                 loop
//                 preload="auto"
//                 className=" size-64 origin-center scale-150 object-cover object-center"
//                 onLoadedData={handleVideoLoad}
//               >
//                 <source src={getVideoSource(upcomingVideoIndex)} />
//               </video>
//             </div>
//           </div>
//           <video preload="auto" key={getVideoSource(currentIndex)}>
//             <source src={getVideoSource(currentIndex)} />
//           </video>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default HeroSection;
