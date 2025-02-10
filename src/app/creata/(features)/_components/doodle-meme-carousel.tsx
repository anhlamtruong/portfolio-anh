import { Carousel, CarouselContent, CarouselItem } from "./carousel";
import { VideoDisplay } from "./videos-display";

interface DoodleMemeCarousalProps {
  component_id: string;
  description: string;
  link: string;
  thumbnails: string;
  title: string;
}

const DoodleMemeCarousal: React.FC<DoodleMemeCarousalProps> = ({ title }) => {
  return (
    <div className="pl-20 pr-20 w-screen items-center content-center">
      <h2 className="text-lg font-semibold">{title}</h2>
      <Carousel
        opts={{
          align: "start",
          loop: true,
        }}
        className=""
        orientation="horizontal"
      >
        <CarouselContent>
          <CarouselItem>
            <VideoDisplay
              key={"1"}
              src={"/videos/creata-doodle-meme-video/vid1.mp4"}
              title={""}
            />
          </CarouselItem>
          <CarouselItem>
            <div>Test2</div>
          </CarouselItem>
          <CarouselItem>
            <div>Test3</div>
          </CarouselItem>
        </CarouselContent>
      </Carousel>
    </div>
  );
};

export default DoodleMemeCarousal;
