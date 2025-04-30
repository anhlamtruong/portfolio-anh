// Configuration for the Award-Winning 2024 page
// Contains API URLs, storage paths, and video/font metadata

export const award_winning_2024_config = {
  apiUrl: "https://api.example.com/award-winning-2024", // API endpoint for fetching data
  storagePath: "creata/award-winning-2024", // Path for storing assets
  heroSectionVideo: [
    { id: "hero-1", path: "videos/hero-1.mp4", title: "Hero Video 1" },
    { id: "hero-2", path: "videos/hero-2.mp4", title: "Hero Video 2" },
    { id: "hero-3", path: "videos/hero-3.mp4", title: "Hero Video 3" },
    { id: "hero-4", path: "videos/hero-4.mp4", title: "Hero Video 4" },
  ], // Metadata for Hero Section videos
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
