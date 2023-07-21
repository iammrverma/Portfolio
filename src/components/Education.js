import React, { useRef } from "react";
import { useScroll, motion } from "framer-motion";
import LiIcon from "./LiIcon";
const Details = ({ type, time, place, info, grade=""}) => {
    const ref = useRef(null);
  return (
    <li ref={ref} className="my-8 first:mt-0 last:mb-0 w-[60%] mx-auto flex felx-col items-center justify-between">

    <LiIcon reference={ref}/>
      <motion.div
      initial={{y:50}}
      whileInView={{y:0}}
      transition={{duration:0.5, type:"spring"}}
      >
        <h3 className="capitalize font-bold text-2xl ">
          {type}&nbsp;
        </h3>

        <span className="capitalize font-medium text-dark/75 dark:text-light/75">{` ${time} | ${place}`}</span>
        <p className="fontt-medium w-full ">{info}</p>
      </motion.div>
    </li>
  );
};

const Education = () => {
  const ref = useRef(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "center start"],
  });
  return (
    <div className="my-64">
      <h2 className="font-bold text-8xl mb-32 w-full text-center">
        Education
      </h2>
      <div ref={ref} className="w-[75%] mx-auto relative">
        <motion.div
          style={{
            scaleY: scrollYProgress,
          }}
          className="absolute left-9 top-0 w-[4px] h-full bg-dark dark:bg-light origin-top"
        />
        <ul className="w-full flex flex-col items-start justify-between ml-4 ">
          <Details
            type="Bachelor Of Computer Applications"
            time="2021 - 2024"
            place="70A, Delhi-Jaipur Expy, Block A, Sector 34, Gurugram, Haryana"
            info="Relevant courses included Data Structures and Algorithms, Computer Systems Engineering, Web Technologies."
          />
                    <Details

            type="Intermediate"
            grade="90%"
            time="2021"
            place="Bhim Nagar 122001, Gurugram, Haryana"
            info="Basic Subjecs like Maths, Commerce, Accounts"
          />

      
        </ul>
      </div>
    </div>
  );
};

export default Education;
