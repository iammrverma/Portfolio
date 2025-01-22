import React from "react";
import Layout from "./Layout";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className="w-full border-2 border-solid border-dark font-medium text-lg dark:text-light dark:border-light sm:text-base">
      <Layout className="py-8 flex items-center justify-between lg:flex-col lg:py-6">
        <span>{new Date().getFullYear()} &copy; rights reserved</span>
        <div className="flex items-center lg:py-2">
          <Link href="/">iammrverma</Link>
        </div>
        <Link href="mailto:rajwebz2020@gmail.com" className="underline">
          Contact Now
        </Link>
      </Layout>
    </footer>
  );
};

export default Footer;
