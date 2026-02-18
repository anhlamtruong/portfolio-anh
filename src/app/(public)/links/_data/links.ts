/**
 * Shared link data — used by both the modern and 8-bit link pages.
 * Single source of truth to avoid data duplication.
 */
export const LINK_DATA = [
  {
    title: "My Website",
    url: "https://lamanhtruong.com",
    emoji: "🌐",
  },
  {
    title: "LinkedIn",
    url: "https://www.linkedin.com/in/lam-anh-truong-b84724224/",
    emoji: "💼",
  },
  {
    title: "GitHub",
    url: "https://github.com/anhlamtruong",
    emoji: "🐙",
  },
  {
    title: "Transcript",
    url: "https://firebasestorage.googleapis.com/v0/b/lam-anh-truong-portfolio.firebasestorage.app/o/portfolio%2FTranscript%20-%20%20Lam%20Anh%20Truong.pdf?alt=media&token=e4e70ecf-41fc-401f-9f71-b4a96abf471f",
    emoji: "📜",
  },
  {
    title: "Resume",
    url: "https://firebasestorage.googleapis.com/v0/b/lam-anh-truong-portfolio.firebasestorage.app/o/portfolio%2FTruong_Resume.pdf?alt=media&token=400de9c9-c5b3-4ac5-bc70-032c1d316b16",
    emoji: "📄",
  },
  {
    title: "Threads",
    url: "https://www.threads.com/@lam.anh.truong",
    emoji: "🧵",
  },
  {
    title: "Projects",
    url: "https://lamanhtruong.com/?section=4",
    emoji: "🎮",
  },
] as const;

export const TECH_TAGS = [
  "PYTHON",
  "TYPESCRIPT",
  "REACT",
  "NODE.JS",
  "GIT",
] as const;
