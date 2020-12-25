import githubCMS from "./github-cms";
import * as fsCMS from "./fs-cms";

function canUseGitHub() {
  return Boolean(process.env.GITHUB_PAT);
}

export async function getPostList() {
  if (canUseGitHub()) {
    return githubCMS.getPostList();
  }

  return fsCMS.getPostList();
}

export async function getPost(slug) {
  if (canUseGitHub()) {
    return githubCMS.getPost(slug);
  }

  return fsCMS.getPost(slug);
}

const users = {};

export async function saveUser(type, profile) {
  console.log("profile", profile);
  const user = {
    id: `${type}-${profile.id}`,
    [type]: profile,
  };

  await fsCMS.saveUser(user);
  return user.id;
}

export async function getUser(id) {
  return fsCMS.getUser(id);
}
