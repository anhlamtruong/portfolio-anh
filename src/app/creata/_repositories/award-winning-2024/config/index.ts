// Configuration for the Award-Winning 2024 page
// Contains API URLs, storage paths, and video/font metadata

export const award_winning_2024_config = {
  apiUrl: "https://api.example.com/award-winning-2024", // API endpoint for fetching data
  storagePath: "creata/award-winning-2024", // Path for storing assets
  heroSectionVideo: [
    {
      id: "hero-1",
      path: "videos/hero-1.mp4",
      title: "Welcome to Nexus",
      second_title: "The Gateway Begins",
      description: ["Explore infinite worlds", "Own your journey"],
    },
    {
      id: "hero-2",
      path: "videos/hero-2.mp4",
      title: "Forge Your Path",
      second_title: "Evolve Through Battle",
      description: ["Earn through skill", "Dominate the play economy"],
    },
    {
      id: "hero-3",
      path: "videos/hero-3.mp4",
      title: "Realms of Valor",
      second_title: "Conquer or Perish",
      description: ["Claim rare assets", "Build your legend"],
    },
    {
      id: "hero-4",
      path: "videos/hero-4.mp4",
      title: "MetaCore Awakens",
      second_title: "Your Identity. Reinvented.",
      description: ["Shape the metagame", "Be who you were meant to be"],
    },
  ],
  fontPath: [
    "fonts/circularweb-book.woff2",
    "fonts/general.woff2",
    "fonts/robert-medium.woff2",
    "fonts/robert-regular.woff2",
    "fonts/zentry-regular.woff2",
  ], // Paths for fonts
  fontName: [
    "circularweb-book",
    "general",
    "robert-medium",
    "robert-regular",
    "zentry-regular",
  ], // Font names
};
