import { getArticle, getArticlesMeta } from "@/firebase";
import { useRouter } from "next/router";
import Head from "next/head";


export default function ArticlePage({ article, source, time, meta }) {
  const router = useRouter();
  // TODO: Use Meta to render and style the article page.
  // Show loading state on fallback pages
  if (router.isFallback) {
    return <p>Loading...</p>;
  }

  // If article not found
  if (!article) {
    return (
      <div>
        <h1>404 - Article Not Found</h1>
        <p>We couldn’t find this article. It might have been unpublished.</p>
      </div>
    );
  }

  return (
    <>
      <Head>
        <title>{article.title} | My Blog</title>
        <meta name="description" content={article.description || ""} />
        <meta name="keywords" content={article.tags?.join(", ") || ""} />

        {/* Open Graph (for social sharing) */}
        <meta property="og:title" content={article.title} />
        <meta property="og:description" content={article.description || ""} />
        <meta property="og:image" content={article.imageUrl || "/default-og.png"} />
        <meta property="og:type" content="article" />

        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={article.title} />
        <meta name="twitter:description" content={article.description || ""} />
        <meta name="twitter:image" content={article.imageUrl || "/default-og.png"} />

        {/* Canonical URL */}
        <link rel="canonical" href={`https://yourdomain.com/articles/${article.slug}`} />
      </Head>

      <article>
        <h1>{article.title}</h1>
        <p>
          <small>
            Published on {new Date(article.timestamp?.seconds * 1000).toLocaleDateString()} • {article.minRead} min read
          </small>
        </p>
        <div dangerouslySetInnerHTML={{ __html: article.content }} />

        {/* Debug info (optional) */}
        <hr />
        <p>
          <strong>Source:</strong> {source} | <strong>Load Time:</strong> {time}
        </p>
      </article>
    </>
  );
}

// SSR: runs at request time
export async function getServerSideProps({ params }) {
  const { slug } = params;
  const { data: article, source, time } = await getArticle(slug);
  const { data } = await getArticlesMeta(slug);

  if (!article) {
    return { notFound: true }; // Next.js will serve 404
  }

  return {
    props: {
      article,
      source,
      time,
      meta: data
    },
  };
}
