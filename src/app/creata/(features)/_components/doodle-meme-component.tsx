// import { VideoDisplay } from "./videos-display";
import React from "react";
import DoodleMemeCarousal from "./doodle-meme-carousel";

interface DoodleMemeComponentProps {
  component_id: string;
  description: string;
  link: string;
  thumbnails: string;
  title: string;
}

const DoodleMemeComponent: React.FC<DoodleMemeComponentProps> = ({ title }) => {
  return (
    <main className="p-5 w-screen h-screen">
      <h2 className="text-lg font-semibold">{title}</h2>
      <div className="container p-8 w-full h-full mx-auto">
        <DoodleMemeCarousal>
          <div className="bg-blue-500 h-64 flex items-center justify-center text-white text-2xl">
            Slide 1
          </div>
          <div className="bg-green-500 h-64 flex items-center justify-center text-white text-2xl">
            Slide 2
          </div>
          <div className="bg-red-500 h-64 flex items-center justify-center text-white text-2xl">
            Slide 3
          </div>
        </DoodleMemeCarousal>
      </div>
    </main>
  );
};

export default DoodleMemeComponent;
