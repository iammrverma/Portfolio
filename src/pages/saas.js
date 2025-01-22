import AnimatedText from "@/components/AnimatedText";
import { SaaSCard } from "@/components/Card";
import Layout from "@/components/Layout";
import TransitionEffect from "@/components/TransitionEffect";
import Head from "next/head";
import React from "react";
import { saasData } from "../../public/data";

const saas = () => {
  return (
    <>
      <Head>
        <title>Raj Verma | SaaS Solutions</title>
        <meta
          name="description"
          content="Discover Raj Verma (iammrverma)'s SaaS Projects. Showcasing innovative, scalable, and efficient SaaS solutions designed to streamline workflows and enhance productivity. Explore my expertise in developing high-quality web applications with cutting-edge technologies. Get inspired and see how I can transform your ideas into reality."
        />
      </Head>
      <TransitionEffect />
      <main className="w-full mb-16 flex flex-col items-center justify-center dark:text-light">
        <Layout className="pt-16">
          <AnimatedText
            text="I Serve Softwares, Don't sell them"
            className="mb-16 lg:!text-7xl sm:mb-8 sm:!text-6xl xs:!text-4xl"
          />

          <div className="flex flex-col items-center justify-center">
            {saasData.map((saas, index) => (
              <div key={index} className="w-[60vw] mb-32 sm:w-[80vw] md:mb-24">
                <SaaSCard
                  title={saas.title}
                  image={saas.image}
                  summary={saas.summary}
                  link={saas.link ? saas.link : ""}
                  githubLink={saas.githubLink}
                  tags={saas.tags}
                  isLive={saas.link ? true : false}
                />
              </div>
            ))}
          </div>
        </Layout>
      </main>
    </>
  );
};

export default saas;
