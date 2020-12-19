import { useRouter } from "next/router";
import Head from "next/head";
import Theme from "../../components/Theme";
import Youtube from "../../components/Youtuve";
import ms from "ms";
import Markdown from "markdown-to-jsx";
import githubCMS from "../../lib/github-cms";

export default function Post({ post }) {
  const router = useRouter();
  if (router.isFallback) {
    return (
      <Theme>
        <Head>
          <meta name="robots" content="noindex" />
        </Head>
        404 - Page not found!
      </Theme>
    );
  }
  return (
    <Theme>
      <div className="post">
        <div className="time">
          Published {ms(Date.now() - post.createdAt, { long: true })} ago
        </div>
        <h1>{post.title}</h1>
        <div className="content">
          <Markdown
            options={{ overrides: { Youtube: { component: Youtube } } }}
          >
            {post.content}
          </Markdown>
        </div>
      </div>
    </Theme>
  );
}

export async function getStaticPaths() {
  const postList = await githubCMS.getPostList();
  const paths = postList.map((post) => ({ params: { slug: post.slug } }));

  return {
    paths,
    fallback: true,
  };
}

export async function getStaticProps({ params }) {
  let post = null;
  try {
    post = await githubCMS.getPost(params.slug);
  } catch (error) {
    if (error.status !== 404) {
      throw error;
    }
  }

  return {
    props: {
      post,
    },
    revalidate: 2,
  };
}
