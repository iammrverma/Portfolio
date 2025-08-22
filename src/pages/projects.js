import TransitionEffect from "@/components/TransitionEffect";
import AnimatedText from "@/components/AnimatedText";
import { ProjectCard } from "@/components/Card";
import Layout from "@/components/Layout";
import { getProjects } from "@/firebase";
import Head from "next/head";
import React from "react";


const Projects = ({ projects, source, time }) => {
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
                <h2 className="w-[60vw] mb-4 sm:w-[80vw] text-lg text-right text-dark/75 dark:text-light/75">
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

export async function getServerSideProps() {
  try {
    const { data, source, time } = await getProjects();
    return { props: { projects: data, source, time } };
  } catch (e) {
    console.error("Error fetching Projects", e);
    return { props: { projects: [], source: "", time: "" } };
  }
}

export default Projects;
