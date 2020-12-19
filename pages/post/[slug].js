import Theme from "../../components/Theme";
import Youtube from "../../components/Youtuve";
import ms from "ms";
import Markdown from "markdown-to-jsx";
import githubCMS from "../../lib/github-cms";

export default function Post({ post }) {
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

export async function getServerSideProps({ params }) {
  const post = await githubCMS.getPost(params.slug);

  return {
    props: {
      post,
    },
  };
}
