import React from "react";
import Link from "next/link";
import Image from "next/image";

import { GithubIcon } from "@/components/Icons";
import { motion } from "framer-motion";
import { useState } from "react";

const FramerImage = motion(Image);

const SideShadow = () => (
  <div className="absolute top-0 -right-3 -z-10 w-[101%] h-[103%] rounded-[2.5rem] bg-dark dark:bg-light rounded-br-3xl xs:-right-2 sm:h-[102%] xs:w-full xs:rounded-[1.5rem]" />
);

const ButtonFill = ({ text, target, disabled }) => {
  const handleClick = (event) => {
    if (disabled) {
      event.preventDefault(); // Prevent navigation
    }
  };

  return (
    <Link
      href={disabled ? "#" : target}
      target={disabled ? undefined : "_blank"}
      className={`ml-4 rounded-lg p-2 px-6 text-lg font-semibold
        ${
          disabled
            ? "bg-gray-400 text-gray-700 cursor-not-allowed"
            : "bg-dark dark:bg-light text-light dark:text-dark"
        }
        sm:px-4 sm:text-base`}
      onClick={handleClick}
    >
      {text}
    </Link>
  );
};

const Card = ({ children, col }) => {
  return (
    <article
      className={`w-full flex ${
        col ? "flex-col" : ""
      } items-center justify-between relative rounded-br-2xl rounded-3xl border border-solid border-dark bg-light shadow-2xl p-6 dark:bg-dark dark:border-light lg:flex-col lg:p-8 xs:rounded-2xl xs:rounded-br-3xl xs:p-4`}
    >
      <SideShadow />
      {children}
    </article>
  );
};

const Label = ({ text }) => (
  <div className="p-2 mt-2 mr-2 text-md sm:p-1 font-bold sm:m-1 sm:text-sm border-2 border-solid rounded-lg border-dark text-dark dark:border-light dark:text-light">
    {text}
  </div>
);

const Title = ({ text, target }) => (
  <Link
    href={target}
    target="_blank"
    className="hover:underline underline-offset-2"
  >
    <h2 className="my-2 w-full text-left text-3xl font-bold dark:text-light sm:text-sm">
      {text}
    </h2>
  </Link>
);

export const ProjectCard = ({
  skills,
  title,
  summary,
  images,
  link,
  githubLink,
  isLive = true,
}) => {
  const [currImg, setCurrImg] = useState(images[0]);
  const [hoveredImg, setHoveredImg] = useState(null);
  const handleHover = (img) => {
    setHoveredImg(img);
  };

  const handleMouseLeave = () => {
    setHoveredImg(null);
  };

  const handleClick = (img) => {
    setCurrImg(img);
  };

  return (
    <Card>
      <div className="w-1/2 cursor-pointer overflow-hidden rounded-lg lg:!w-full relative">
        <div key={currImg}>
          <FramerImage
            src={currImg}
            alt={title}
            width={350}
            height={200}
            className="w-auto h-full"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.2 }}
            priority
            sizes="(max-width:768px) 100vw, (max-width: 1200px) 50vw, 50vw"
          />
        </div>
        <div className="w-full h-[20%] flex absolute bottom-0 items-center justify-center p-1 dark:bg-light/0 backdrop-blur-[10px]">
          {images.map((img, index) => (
            <FramerImage
              key={index}
              src={img}
              alt={index}
              width={80}
              height={50}
              style={{ objectFit: "contain" }}
              className={`w-[15%] h-full mx-2 rounded-sm border-solid border-dark border-[3px] ${
                hoveredImg === img ? "opacity-50" : "opacity-100"
              } ${currImg === img ? "!border-primary" : ""}`}
              onClick={() => handleClick(img)}
              onMouseEnter={() => handleHover(img)}
              onMouseLeave={handleMouseLeave}
            />
          ))}
        </div>
      </div>

      <div className="w-1/2 flex flex-col items-start justify-between pl-6 lg:w-full lg:pl-0 lg:pt-6">
        <Title text={title} target={link} />
        <div className="flex flex-wrap items-center">
          {skills.map((skill, index) => (
            <Label key={index} text={skill} />
          ))}
        </div>
        <p className="my-2 font-medium text-dark/75 dark:text-light/75 sm:text-sm">
          {summary}
        </p>
        <div className="mt-2 flex items-center ">
          <Link href={githubLink} target="_blank" className="w-10">
            <GithubIcon />
          </Link>

          {isLive && <ButtonFill text="Live" target={link} />}
        </div>
      </div>
    </Card>
  );
};

export const SaaSCard = ({
  image,
  title,
  link,
  tags,
  summary,
  githubLink = "https://github.com/iammrverma",
  isLive,
}) => {
  return (
    <Card col>
      <div className="w-full cursur-pointer overflow-hidden rounded-lg lg:!w-full relative">
        {image && (
          <FramerImage
            src={image}
            alt={title}
            className="w-full h-[60vh] sm:h-[40vh]"
            priority
          />
        )}
      </div>
      <div className="mt-6 flex flex-col items-start ">
        <Title text={title} target={link} />
        <div className="flex flex-wrap items-center">
          {tags.map((tag, index) => (
            <Label key={index} text={tag} />
          ))}
        </div>
        <p className="my-4 font-medium text-dark/75 dark:text-light/75 sm:text-sm">
          {summary}
        </p>
        <div className="mt-2 flex items-center ">
          <Link href={githubLink} target="_blank" className="w-10">
            <GithubIcon />
          </Link>

          <ButtonFill
            text={`${isLive ? "Learn More" : "Comming Soon"}`}
            target={link}
            disabled={!isLive}
          />
        </div>
      </div>
    </Card>
  );
};

export default Card;
