import React, { useEffect, useState } from "react";
import { SaasCard } from "@/components/Card";
import { getSaas } from "@/firebase";

import AnimatedText from "@/components/AnimatedText";
import Layout from "@/components/Layout";
import TransitionEffect from "@/components/TransitionEffect";
import Head from "next/head";


const Saas = () => {
  const [saas, setSaas] = useState([]);
  const [source, setSource] = useState("");
  const [time, setTime] = useState("");
  useEffect(() => {
    const fetchData = async () => {
      try {
        const { saas, source, time } = await getSaas();
        setSaas(saas);
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
          {saas && time && source && saas.length > 0 && (
            <div className="flex flex-col items-center justify-center">
              <h2 className="w-[60vw] mb-4 sm:w-[80vw] text-lg text-right text-dark/75 dark:text-light/75">
                {`From ${source} storage in ${time}`}
              </h2>
              {saas.map((saas, index) => (
                <div
                  key={index}
                  className="w-[60vw] mb-32 sm:w-[80vw] md:mb-24"
                >
                  <SaasCard
                    title={saas.title}
                    image={saas.images[0]}
                    summary={saas.summary}
                    link={saas.link ? saas.link : ""}
                    githubLink={saas.githubLink}
                    features={saas.features}
                    isLive={saas.link ? true : false}
                  />
                </div>
              ))}
            </div>
          )}
        </Layout>
      </main>
    </>
  );
};

export default Saas;
