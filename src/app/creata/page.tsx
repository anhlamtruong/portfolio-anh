"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { VideoDisplay } from "./(features)/_components/videos-display";
import { useRouter } from "next/navigation";

const cards = [
  {
    id: "k6I8MYN8fV0bSVYQN3A9",
    cardTitle: "Doodle-Meme-Video",
    cardDescription: "ヾ(≧▽≦*)o     (●'◡'●)    ヾ(•ω•`)o",
    cardFooter: "Author Creata",
    cardThumbnail: "",
    cardContent: (
      <VideoDisplay
        key={"1"}
        src={"/videos/creata-doodle-meme-video/vid1.mp4"}
        title={""}
      />
    ),
  },
  {
    id: "2",
    cardTitle: "Doodle-Meme-Video",
    cardDescription: "ヾ(≧▽≦*)o     (●'◡'●)    ヾ(•ω•`)o",
    cardFooter: "Author Creata",
    cardContent: (
      <VideoDisplay
        key={"1"}
        src={"/videos/creata-doodle-meme-video/vid1.mp4"}
        title={""}
      />
    ),
  },
  {
    id: "3",
    cardTitle: "Doodle-Meme-Video",
    cardDescription: "ヾ(≧▽≦*)o     (●'◡'●)    ヾ(•ω•`)o",
    cardFooter: "Author Creata",
    cardContent: (
      <VideoDisplay
        key={"1"}
        src={"/videos/creata-doodle-meme-video/vid1.mp4"}
        title={""}
      />
    ),
  },
  {
    id: "4",
    cardTitle: "Doodle-Meme-Video",
    cardDescription: "ヾ(≧▽≦*)o     (●'◡'●)    ヾ(•ω•`)o",
    cardFooter: "Author Creata",
    cardContent: (
      <VideoDisplay
        key={"1"}
        src={"/videos/creata-doodle-meme-video/vid1.mp4"}
        title={""}
      />
    ),
  },
  {
    id: "5",
    cardTitle: "Doodle-Meme-Video",
    cardDescription: "ヾ(≧▽≦*)o     (●'◡'●)    ヾ(•ω•`)o",
    cardFooter: "Author Creata",
    cardContent: (
      <VideoDisplay
        key={"1"}
        src={"/videos/creata-doodle-meme-video/vid1.mp4"}
        title={""}
      />
    ),
  },
];

export default function CreataDashboardLayout() {
  const router = useRouter();
  return (
    <div className="p-8">
      <div className="grid grid-cols-4 gap-2 ">
        {cards.map((card) => {
          return (
            <Card
              key={card.id}
              className="transition-transform duration-300 hover:scale-110 focus:scale-90"
              onClick={() => router.push(`/creata/${card.id}`)}
            >
              <CardHeader>
                <CardTitle>{card.cardTitle}</CardTitle>
                <CardDescription>{card.cardDescription}</CardDescription>
              </CardHeader>
              <CardContent>{card.cardContent}</CardContent>
              <CardFooter>
                <p className=" text-sm font-extralight  ">{card.cardFooter}</p>
              </CardFooter>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
