import "./styles/index.css";
import { getQueryClient, trpc } from "../../_trpc/server";
import HeroSection from "./components/hero-section";

const AwardWinning2024Component = async () => {
  const queryClient = getQueryClient();
  // font-family: "circularweb-book", "general", "robert-medium", "robert-regular", "zentry", sans-serif;
  const fonts_string = await queryClient.fetchQuery(
    trpc.award_winning_2024.getFonts.queryOptions()
  );
  return (
    <div className="font-sans bg-[#dfdff0] w-[100dvw] overflow-x-hidden">
      <style>{fonts_string}</style>
      <div
        className="relative min-h-screen w-screen overflow-x-hidden"
        style={{ fontFamily: "circularweb-book, sans-serif" }}
      >
        <HeroSection></HeroSection>
      </div>
    </div>
  );
};

export default AwardWinning2024Component;
