"use client";

import Link from "next/link";
import Image from "next/image";

const links = [
  { title: "My Portfolio Website", url: "https://your-portfolio.com" },
  { title: "LinkedIn", url: "https://linkedin.com/in/yourprofile" },
  { title: "GitHub", url: "https://github.com/yourusername" },
  { title: "Threads Tech", url: "https://threads.net/yourprofile" },
  { title: "Cookit.dev Project", url: "https://cookit.dev" },
  // Add more links here
];

const LinkPage = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-violet-600 p-4">
      <div className="w-full max-w-md mx-auto text-center">
        <Image
          src="/assets/img/ava.jpg"
          alt="My Name"
          width={96}
          height={96}
          className="rounded-full mx-auto mb-4 border-2 border-white"
        />

        <h1 className="text-2xl font-bold text-white mb-2">Lam Anh Truong</h1>
        <p className="text-md text-gray-300 mb-8">
          Web Developer | Software Engineer | Tech Enthusiast
        </p>

        <div className="space-y-4">
          {links.map((link, index) => (
            <LinkButton key={index} title={link.title} url={link.url} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default LinkPage;

// Reusable Link Button Component (can be in the same file or separate)
const LinkButton = ({ title, url }: { title: string; url: string }) => {
  return (
    <Link
      href={url}
      target="_blank" // Open in new tab
      rel="noopener noreferrer" // Security best practice for target="_blank"
      className="block w-full bg-white bg-opacity-90 hover:bg-opacity-100 text-gray-900 font-semibold py-3 px-4 rounded-lg shadow-md transition-transform transform hover:scale-105"
    >
      {title}
    </Link>
  );
};
