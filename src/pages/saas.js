import TransitionEffect from "@/components/TransitionEffect";
import AnimatedText from "@/components/AnimatedText";
import { SaasCard } from "@/components/Card";
import Layout from "@/components/Layout";
import { getSaas } from "@/firebase";
import Head from "next/head";
import React from "react";


const Saas = ({ saas, source, time }) => {
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

export async function getServerSideProps() {
  try {
    const { data, source, time } = await getSaas();
    return { props: { saas: data, source, time } };
  } catch (e) {
    console.error("Error fetching saas", e);
    return { props: { saas: [], source: "", time: "" } };
  }
}

export default Saas;
