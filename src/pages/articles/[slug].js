import TransitionEffect from "@/components/TransitionEffect";
import { getArticle, getArticlesMeta } from "@/firebase";
import AnimatedText from "@/components/AnimatedText";
import ReactMarkdown from "react-markdown";
import Layout from "@/components/Layout";
import { useRouter } from "next/router";
import remarkGfm from "remark-gfm";
import Link from "next/link";
import Head from "next/head";


export default function ArticlePage({ article, meta }) {
  const router = useRouter();
  const title = meta?.title
    ? `${meta.title} | Article By iammrverma`
    : "Article By iammrverma";
  if (router.isFallback) {
    return <p>Loading...</p>;
  }

  if (!article) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen text-center">
        <h1 className="text-3xl font-bold">404 - Article Not Found</h1>
        <p className="text-dark/70 dark:text-light/70 mt-4">
          We couldn’t find this article. It might have been unpublished.
        </p>
      </div>
    );
  }

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={meta.description || ""} />

        {/* Open Graph */}
        <meta property="og:title" content={title} />
        <meta property="og:description" content={meta.description || ""} />
        <meta
          property="og:image"
          content={meta.imageUrl || "/default-og.png"}
        />
        <meta property="og:type" content="article" />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={meta.description || ""} />
        <meta name="twitter:image" content={meta.imageUrl} />

        <link
          rel="canonical"
          href={`https://iamrverma.tech/articles/${meta.slug}`}
        />
      </Head>

      <TransitionEffect />
      <main className="dark:text-light">
        <Layout>
          {/* Meta Info */}
          <div className="text-dark/70 dark:text-light/70 text-sm mb-6 flex flex-wrap justify-between items-center gap-3">
            <div className="flex flex-wrap gap-2">
              <span>Tags: </span>
              {meta.tags.map((tag, i) => (
                <span
                  key={i}
                  className="px-2 py-0.5 text-xs rounded-full bg-dark/10 dark:bg-light/10 text-dark dark:text-light"
                >
                  #{tag}
                </span>
              ))}
            </div>
            <div className="flex gap-2">
              <span>
                Posted on: {new Date(article.timestamp).toLocaleDateString()}
              </span>
              |<span>{meta.minRead} Min Read</span>
            </div>
          </div>
          {/* Cover Image */}
          {meta.imageUrl && (
            <div className="relative w-full mb-10">
              <img
                src={meta.imageUrl}
                alt={meta.title}
                className="w-full rounded-2xl shadow-md border-2 border-dark/10 dark:border-light/10"
              />
            </div>
          )}
          {/* Title */}
          <AnimatedText
            text={meta.title}
            className="mb-8 lg:!text-6xl sm:!text-5xl xs:!text-3xl text-left"
          />
          {/* Article Content */}
          <article className="prose prose-lg dark:prose-invert max-w-none prose-headings:font-bold prose-img:rounded-xl prose-img:shadow-lg mb-4">
            <ReactMarkdown remarkPlugins={[remarkGfm]}>
              {article.content}
            </ReactMarkdown>
          </article>
          <hr />
          <Link href={"/articles"}>
            <button className="border w-full text-center p-4 mt-4 border-dark dark:border-light">
              Read More Articles
            </button>
          </Link>
        </Layout>
      </main>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BlogPosting",
            headline: title,
            description: meta?.description,
            image: meta?.imageUrl,
            datePublished: new Date(article.timestamp).toISOString(),
            author: {
              "@type": "Person",
              name: "iammrverma", // change if multi-author
            },
            publisher: {
              "@type": "Organization",
              name: "iammrverma",
            },
          }),
        }}
      />
    </>
  );
}

// SSR
export async function getServerSideProps({ params }) {
  const { slug } = params;
  const { data: article, source, time } = await getArticle(slug);
  const { data } = await getArticlesMeta(slug);

  if (!article) {
    return { notFound: true };
  }

  return {
    props: { article, source, time, meta: data },
  };
}
