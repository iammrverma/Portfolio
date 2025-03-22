import React, { useState, useEffect } from "react";
import { ProjectCard } from "@/components/Card";
import { getProjects } from "@/firebase";

import AnimatedText from "@/components/AnimatedText";
import Layout from "@/components/Layout";
import Head from "next/head";
import TransitionEffect from "@/components/TransitionEffect";

const projects = () => {
  const [projects, setProjects] = useState([]);
  const [source, setSource] = useState("");
  const [time, setTime] = useState("");
  useEffect(() => {
    const fetchData = async () => {
      try {
        const { projects, source, time } = await getProjects();
        console.log(projects);
        setProjects(projects);
        setSource(source);
        setTime(time);
      } catch (error) {
        console.error("Error fetching projects:", error);
      }
    };

    fetchData();
  }, []);
  return (
    <>
      <Head>
        <title>Raj Verma | Projects page</title>
        <meta content="Explore Raj Verma (iammrverma)'s Portfolio Projects. Each project exemplifies My Web Development Skills, creativity, and dedication to delivering high-quality work. Discover a diverse range of projects, including [React projects, Pure html css js projects, projects with backend, live projects and many more]. Get inspired and see how I can bring your ideas to life." />
      </Head>
      <TransitionEffect />
      <main className="w-full mb-16 flex flex-col items-center justify-center dark:text-light">
        <Layout className="pt-16">
          <AnimatedText
            text="Imagination Trumps Knowledge!"
            className="mb-16 lg:!text-7xl sm:mb-8 sm:!text-6xl xs:!text-4xl"
          />
          {projects && time && source && projects.length > 0 && (
            <>
              <div className="flex flex-col items-center justify-center">
                <h2 className="w-[60vw] mb-32 sm:w-[80vw] md:mb-24 mb-4 text-lg text-right text-dark/75 dark:text-light/75">
                  {`From ${source} storage in ${time}`}
                </h2>
                {projects.map((project, index) => (
                  <div
                    key={index}
                    className="w-[60vw] mb-32 sm:w-[80vw] md:mb-24"
                  >
                    <ProjectCard
                      title={project.title}
                      images={project.images}
                      summary={project.summary}
                      link={project.link ? project.link : ""}
                      githubLink={project.githubLink}
                      skills={project.skills}
                      isLive={project.link ? true : false}
                    />
                  </div>
                ))}
              </div>
            </>
          )}
        </Layout>
      </main>
    </>
  );
};

export default projects;
