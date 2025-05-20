/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import Image from "next/image";
import React, { useEffect, useId, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

import { Check } from "lucide-react";
import { useOutsideClick } from "./hooks/use-outside-click";

export function ExpandableCard() {
  const [active, setActive] = useState<(typeof cards)[number] | boolean | null>(
    null
  );
  const ref = useRef<HTMLDivElement>(null);
  const id = useId();

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setActive(false);
      }
    }

    if (active && typeof active === "object") {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [active]);

  useOutsideClick(ref, () => setActive(null));

  return (
    <>
      <AnimatePresence>
        {active && typeof active === "object" && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/20 h-full w-full z-10"
          />
        )}
      </AnimatePresence>
      <AnimatePresence>
        {active && typeof active === "object" ? (
          <div className="fixed inset-0 grid place-items-center z-[100] overflow-hidden">
            <motion.button
              key={`button-${active.title}-${id}`}
              layout
              initial={{
                opacity: 0,
              }}
              animate={{
                opacity: 1,
              }}
              exit={{
                opacity: 0,
                transition: {
                  duration: 0.05,
                },
              }}
              className="flex absolute top-2 right-2 lg:hidden items-center justify-center bg-black  rounded-full h-8 w-8 md:h-6 md:w-6"
              onClick={() => setActive(null)}
            >
              <CloseIcon />
            </motion.button>
            <motion.div
              layoutId={`card-${active.title}-${id}`}
              ref={ref}
              className="w-full max-w-[500px] h-full md:h-fit md:max-h-[90%]  flex flex-col bg-white dark:bg-neutral-900 sm:rounded-3xl overflow-hidden"
            >
              <motion.div className="" layoutId={`image-${active.title}-${id}`}>
                <Image
                  priority
                  width={40}
                  height={40}
                  src={active.src}
                  alt={active.title}
                  className="w-full h-24 lg:h-24 sm:rounded-tr-lg sm:rounded-tl-lg object-contain object-top p-6"
                  style={{ width: "auto" }}
                />
              </motion.div>

              <div>
                <div className="flex justify-between items-start p-4">
                  <div className="">
                    <motion.h3
                      layoutId={`title-${active.title}-${id}`}
                      className="font-bold text-neutral-700 dark:text-neutral-200"
                    >
                      {active.title}
                    </motion.h3>
                    <motion.p
                      layoutId={`description-${active.description}-${id}`}
                      className="text-neutral-600 dark:text-neutral-400"
                    >
                      {active.description}
                    </motion.p>
                  </div>

                  <motion.a
                    layoutId={`button-${active.title}-${id}`}
                    href={active.ctaLink}
                    target="_blank"
                    className="px-4 py-3 text-sm rounded-full font-bold bg-black text-white hover:opacity-80"
                  >
                    {active.ctaText}
                  </motion.a>
                </div>
                <div className="pt-4 relative px-4">
                  <motion.div
                    layout
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="text-neutral-600 text-xs md:text-sm lg:text-base h-5/6 md:h-fit pb-10 flex flex-col items-start gap-4 overflow-auto dark:text-neutral-400 [mask:linear-gradient(to_bottom,white,white,transparent)] [scrollbar-width:none] [-ms-overflow-style:none] [-webkit-overflow-scrolling:touch]"
                  >
                    {typeof active.content === "function"
                      ? active.content()
                      : active.content}
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </div>
        ) : null}
      </AnimatePresence>
      <ul className="max-w-4/6 w-full gap-2 grid grid-cols-2 md:grid-cols-1 no-scrollbar h-full overflow-scroll pt-2">
        {cards.map((card, index) => (
          <motion.div
            layoutId={`card-${card.title}-${id}`}
            key={`card-${card.title}-${id}`}
            onClick={() => setActive(card)}
            className="p-4 flex flex-col md:flex-row justify-center md:justify-between items-center hover:bg-neutral-50 dark:hover:bg-neutral-800 rounded-xl cursor-pointer"
          >
            <div className="flex gap-2 flex-col md:flex-row justify-center items-center">
              <motion.div layoutId={`image-${card.title}-${id}`}>
                <Image
                  width={100}
                  height={100}
                  src={card.src}
                  alt={card.title}
                  className="h-40 w-40 md:h-14 md:w-14 rounded-lg object-contain"
                  style={{ width: "auto" }}
                />
              </motion.div>
              <div className="">
                <motion.h3
                  layoutId={`title-${card.title}-${id}`}
                  className="font-medium text-neutral-200 text-center md:text-left"
                >
                  {card.title}
                </motion.h3>
                <motion.p
                  layoutId={`description-${card.description}-${id}`}
                  className="text-neutral-400 text-center md:text-left"
                >
                  {card.description}
                </motion.p>
              </div>
            </div>
            <motion.button
              layoutId={`button-${card.title}-${id}`}
              className="px-4 py-2 text-sm rounded-full font-bold bg-gray-100 hover:opacity-80 hover:text-white text-black mt-4 md:mt-0"
            >
              {card.ctaText}
            </motion.button>
          </motion.div>
        ))}
      </ul>
    </>
  );
}

export const CloseIcon = () => {
  return (
    <motion.svg
      initial={{
        opacity: 0,
      }}
      animate={{
        opacity: 1,
      }}
      exit={{
        opacity: 0,
        transition: {
          duration: 0.05,
        },
      }}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-4 w-4 text-white"
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <path d="M18 6l-12 12" />
      <path d="M6 6l12 12" />
    </motion.svg>
  );
};

const cards = [
  {
    description: "Certificate earned at August 16, 2023",
    title: "AWS Certified Solutions Architect - Associate",
    src: "/assets/logos/aws.svg",
    ctaText: "Show certificate",
    ctaLink:
      "https://cp.certmetrics.com/amazon/en/public/verify/credential/KP71RW6C4M1Q1EWK",
    content: () => {
      const features = [
        {
          text: "Design, deploy, and manage an organization's cost-effective, scalable cloud infrastructures",
        },
        {
          text: "Develop cloud-based solutions to support an organization's business objectives",
        },
        {
          text: "Modernize obsolete systems inside a company to make them more efficient",
        },
        {
          text: "Keep downtime and security breaches to a minimum in the cloud setting",
        },
        {
          text: "Evaluate the risk of third-party platforms and frameworks",
        },
        {
          text: "Investigate methods to improve corporate operations by digitizing routine processes",
        },
        {
          text: "Perform internal cloud application development, construction, and maintenance for the enterprise",
        },
        {
          text: "Keep abreast of the newest cloud computing developments and work to improve the organization's cloud infrastructure",
        },
      ];

      return <FeatureList features={features}></FeatureList>;
    },
  },
  {
    description: "Certificate earned at October 23, 2024",
    title: "Meta Front-End Developer",
    src: "/assets/logos/meta-icon.svg",
    ctaText: "Show certificate",
    ctaLink:
      "https://www.coursera.org/account/accomplishments/specialization/certificate/9Q4LRT7VCCVO",
    content: () => {
      const features = [
        {
          text: "Create a responsive website using HTML to structure content, CSS to handle visual style, and JavaScript to develop interactive experiences.",
        },
        {
          text: "Learn to use React in relation to JavaScript libraries and frameworks.",
        },
        {
          text: "Learn Bootstrap CSS Framework to create webpages and work with GitHub repositories and version control.",
        },
        {
          text: "Prepare for a coding interview, learn best approaches to problem-solving, and build portfolio-ready projects you can share during job interviews.",
        },
      ];

      return <FeatureList features={features}></FeatureList>;
    },
  },

  {
    description: "Certificate earned at April 5, 2024",
    title: "Google UX Design",
    src: "/assets/logos/google-icon.svg",
    ctaText: "Show certificate",
    ctaLink:
      "https://www.coursera.org/account/accomplishments/specialization/certificate/CJKM3JF96EZB",
    content: () => {
      const features = [
        {
          text: "Follow the design process: empathize with users, define pain points, ideate solutions, create wireframes and prototypes, test and iterate on designs",
        },
        {
          text: "Apply foundational UX concepts, like user-centered design, accessibility, and equity-focused design",
        },
        {
          text: "Understand the basics of UX research, like planning research studies, conducting interviews and usability studies, and synthesizing research results",
        },
        {
          text: "Create a professional UX portfolio, including end-to-end projects, so that you're ready to apply for jobs",
        },
      ];

      return <FeatureList features={features}></FeatureList>;
    },
  },
  {
    description: "Certificate earned at July 4, 2024",
    title: "Google Cloud Digital Leader Training",
    src: "/assets/logos/google-cloud.svg",
    ctaText: "Show certificate",
    ctaLink:
      "https://www.coursera.org/account/accomplishments/specialization/certificate/YXEJRM2ELTNG",
    content: () => {
      const features = [
        {
          text: "Recall fundamental cloud terminology. ",
        },
        {
          text: "Explain how cloud technology and data can be leveraged to innovate within organizations.",
        },
        {
          text: "Identify Google Cloud products and solutions that support digital transformation.",
        },
        {
          text: "Identify key change patterns and Google Cloud products for infrastructure and application modernization.",
        },
      ];

      return <FeatureList features={features}></FeatureList>;
    },
  },
  {
    description: "Certificate earned at August 1, 2024",
    title: "Google Cloud Certification: Cloud Developer",
    src: "/assets/logos/google-cloud.svg",
    ctaText: "Show certificate",
    ctaLink:
      "https://www.coursera.org/account/accomplishments/specialization/certificate/PMUATOWH1TZP",
    content: () => {
      const features = [
        {
          text: "Identify the purpose and value of Google Cloud products and services.",
        },
        {
          text: "Learn the skills needed to be successful in a cloud developer engineering role.",
        },
        {
          text: "Choose among and use application deployment environments on Google Cloud: App Engine, Google Kubernetes Engine, and Compute Engine.",
        },
        {
          text: "Techniques for monitoring, troubleshooting, and improving infrastructure and application performance in Google Cloud",
        },
      ];

      return <FeatureList features={features}></FeatureList>;
    },
  },
];

const FeatureList = ({ features }: { features: { text: string }[] }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6">
      {features &&
        features.map((feature, index) => (
          <div key={index} className="flex items-start space-x-3">
            <Check className="text-green-500" size={24} />
            <p className="text-gray-800">{feature.text}</p>
          </div>
        ))}
    </div>
  );
};
