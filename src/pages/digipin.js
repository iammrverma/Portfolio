import { useEffect, useState } from "react";
import Layout from "@/components/Layout";
import { getDigiPin } from "digipinjs";
import Card from "@/components/Card";
import dynamic from "next/dynamic";
import Head from "next/head";


const TransitionEffect = dynamic(() => import("@/components/TransitionEffect"));

const getCoords = () => {
  return new Promise((resolve, reject) => {
    if (typeof window === "undefined" || !navigator.geolocation) {
      reject("Geolocation is not supported or not in the browser.");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;
        resolve({ latitude, longitude });
      },
      (error) => {
        reject(error);
      }
    );
  });
};
const Copy = ({ text }) => {
  const [copied, setCopied] = useState(false);
  const handleCopyPin = async () => {
    if (!text) return;
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
    } catch (e) {
      console.error(e);
    }
  };
  useEffect(() => {
    if (!copied) return;
    const timer = setTimeout(() => setCopied(false), 1500);
    return () => clearTimeout(timer);
  }, [copied]);
  return copied ? (
    <button disabled>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
        className="lucide lucide-clipboard-check-icon lucide-clipboard-check"
      >
        <rect width="8" height="4" x="8" y="2" rx="1" ry="1" />
        <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" />
        <path d="m9 14 2 2 4-4" />
      </svg>
    </button>
  ) : (
    <button onClick={handleCopyPin}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
        className="lucide lucide-clipboard-icon lucide-clipboard"
      >
        <rect width="8" height="4" x="8" y="2" rx="1" ry="1" />
        <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" />
      </svg>
    </button>
  );
};
const DigipinFromCoords = ({ className }) => {
  const [pin, setPin] = useState("");
  const [loadingCoords, setLoadingCoords] = useState(false);

  const callGetDigiPin = async () => {
    try {
      setLoadingCoords(true);
      const { latitude, longitude } = await getCoords();
      setPin(getDigiPin(latitude, longitude));
    } catch (e) {
      console.error("Error Fetching coordinates", e);
      alert(
        "Unable to get your location. Please allow GPS access in your browser."
      );
    } finally {
      setLoadingCoords(false);
    }
  };

  useEffect(() => callGetDigiPin(), []);

  return (
    <Card className={`flex-col items-stretch ${className}`}>
      <div className="flex justify-between">
        <button onClick={callGetDigiPin} aria-label="Refresh Digipin">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            className="lucide lucide-rotate-cw-icon lucide-rotate-cw"
          >
            <path d="M21 12a9 9 0 1 1-9-9c2.52 0 4.93 1 6.74 2.74L21 8" />
            <path d="M21 3v5h-5" />
          </svg>
        </button>
        {loadingCoords ? (
          <span className="text-sm text-gray-500">Fetching location…</span>
        ) : (
          <code className="font-mono text-lg">{pin}</code>
        )}
        <Copy text={pin} />
      </div>
    </Card>
  );
};
const digipin = () => {
  return (
    <>
      <Head>
        <title>Get Your Digipin - Instant Location-based Digital Pin</title>
        <meta
          name="description"
          content="Generate your unique Digipin instantly using your device's location. Fast, secure, and private."
        />
        <meta
          name="keywords"
          content="Digipin, location pin, GPS pin, digital pin, geolocation, instant location"
        />
        <meta name="author" content="Raj Verma" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#ffffff" />

        {/* Open Graph for social sharing */}
        <meta
          property="og:title"
          content="Get Your Digipin - Instant Location-based Digital Pin"
        />
        <meta
          property="og:description"
          content="Use your GPS location to generate a unique Digipin instantly. No signup required."
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://iammrverma.tech/digipin" />

        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:title"
          content="Get Your Digipin - Instant Location-based Digital Pin"
        />
        <meta
          name="twitter:description"
          content="Generate your unique Digipin instantly using your device's location. Fast, secure, and private."
        />

        {/* Canonical */}
        <link rel="canonical" href="https://iammrverma.tech/digipin" />
      </Head>

      <TransitionEffect />
      <main className="w-full mb-16 flex flex-col items-center justify-center overflow-hidden dark:text-light">
        <Layout className="pt-16">
          <h1 className="text-4xl font-bold mb-4 text-center">
            Get Your Digipin Instantly
          </h1>

          <DigipinFromCoords className="mb-4" />
          <p>
            Example Digipin: <code>XP3-92J-22LK</code> (sample only).
          </p>

          <p className="my-6 text-lg">
            Digipin is a unique code generated from your exact GPS location. Use
            it to share your position securely, bookmark places, or verify
            location. This page lets you generate your Digipin instantly with
            one click.
          </p>
        </Layout>
      </main>
    </>
  );
};

export default digipin;
