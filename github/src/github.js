import axios from "axios";
import "dotenv/config";

let git_personal_token = process.env.GIT_TOKEN;

export const github = axios.create({
  baseURL: "https://api.github.com",
  headers: {
    Authorization: `Bearer ${git_personal_token}`,
    Accept: "application/vnd.github+json",
  }
});

// REPOSITORY OPERATIONS (Read - Metadata)

export async function getMyRepos() {
  const res = await github.get("/user/repos");
  return res.data;
}

export async function getRepo(owner, repo) {
  const res = await github.get(`/repos/${owner}/${repo}`);
  return res.data;
}

export async function listForks(owner, repo) {
  const res = await github.get(`/repos/${owner}/${repo}/forks`);
  return res.data;
}

export async function getRepoTopics(owner, repo) {
  const res = await github.get(`/repos/${owner}/${repo}/topics`, {
    headers: { Accept: "application/vnd.github.mercy-preview+json" }
  });
  return res.data;
}

export async function createRepo(name, description = "", isPrivate = false, autoInit = false) {
  const res = await github.post("/user/repos", {
    name,
    description,
    private: isPrivate,
    auto_init: autoInit
  });
  return res.data;
}

// ISSUE OPERATIONS (Read)

export async function listIssues(owner, repo, state = "open") {
  const res = await github.get(`/repos/${owner}/${repo}/issues`, {
    params: { state }
  });
  return res.data;
}

export async function getIssue(owner, repo, issueNumber) {
  const res = await github.get(`/repos/${owner}/${repo}/issues/${issueNumber}`);
  return res.data;
}

export async function listIssueComments(owner, repo, issueNumber) {
  const res = await github.get(`/repos/${owner}/${repo}/issues/${issueNumber}/comments`);
  return res.data;
}

// PULL REQUEST OPERATIONS (Read)

export async function listPullRequests(owner, repo, state = "open") {
  const res = await github.get(`/repos/${owner}/${repo}/pulls`, {
    params: { state }
  });
  return res.data;
}

export async function getPullRequest(owner, repo, prNumber) {
  const res = await github.get(`/repos/${owner}/${repo}/pulls/${prNumber}`);
  return res.data;
}

export async function listPRReviews(owner, repo, prNumber) {
  const res = await github.get(`/repos/${owner}/${repo}/pulls/${prNumber}/reviews`);
  return res.data;
}

export async function listPRFiles(owner, repo, prNumber) {
  const res = await github.get(`/repos/${owner}/${repo}/pulls/${prNumber}/files`);
  return res.data;
}

export async function listPRComments(owner, repo, prNumber) {
  const res = await github.get(`/repos/${owner}/${repo}/pulls/${prNumber}/comments`);
  return res.data;
}

// BRANCH OPERATIONS (Read/Write - Code)

export async function listBranches(owner, repo) {
  const res = await github.get(`/repos/${owner}/${repo}/branches`);
  return res.data;
}

export async function getBranch(owner, repo, branch) {
  const res = await github.get(`/repos/${owner}/${repo}/branches/${branch}`);
  return res.data;
}

export async function createBranch(owner, repo, newBranch, fromSha) {
  const res = await github.post(`/repos/${owner}/${repo}/git/refs`, {
    ref: `refs/heads/${newBranch}`,
    sha: fromSha
  });
  return res.data;
}

export async function deleteBranch(owner, repo, branch) {
  const res = await github.delete(`/repos/${owner}/${repo}/git/refs/heads/${branch}`);
  return res.data;
}

export async function getDefaultBranch(owner, repo) {
  const repoData = await getRepo(owner, repo);
  return repoData.default_branch;
}

// COMMIT OPERATIONS (Read - Code)

export async function listCommits(owner, repo, sha = "", path = "") {
  const params = {};
  if (sha) params.sha = sha;
  if (path) params.path = path;

  const res = await github.get(`/repos/${owner}/${repo}/commits`, { params });
  return res.data;
}

export async function getCommit(owner, repo, sha) {
  const res = await github.get(`/repos/${owner}/${repo}/commits/${sha}`);
  return res.data;
}

export async function compareCommits(owner, repo, base, head) {
  const res = await github.get(`/repos/${owner}/${repo}/compare/${base}...${head}`);
  return res.data;
}

// FILE OPERATIONS (Read/Write - Code)

export async function getFileContents(owner, repo, path, ref = "") {
  const params = ref ? { ref } : {};
  const res = await github.get(`/repos/${owner}/${repo}/contents/${path}`, { params });
  return res.data;
}

export async function createOrUpdateFile(owner, repo, path, message, content, sha = null, branch = "") {
  const data = {
    message,
    content, // Base64 encoded content
    ...(sha && { sha }),
    ...(branch && { branch })
  };
  const res = await github.put(`/repos/${owner}/${repo}/contents/${path}`, data);
  return res.data;
}

export async function deleteFile(owner, repo, path, message, sha, branch = "") {
  const data = {
    message,
    sha,
    ...(branch && { branch })
  };
  const res = await github.delete(`/repos/${owner}/${repo}/contents/${path}`, { data });
  return res.data;
}

export async function getDirectoryContents(owner, repo, path = "", ref = "") {
  const params = ref ? { ref } : {};
  const res = await github.get(`/repos/${owner}/${repo}/contents/${path}`, { params });
  return res.data;
}

// TREE OPERATIONS (Read - Code)

export async function getTree(owner, repo, treeSha, recursive = false) {
  const params = recursive ? { recursive: 1 } : {};
  const res = await github.get(`/repos/${owner}/${repo}/git/trees/${treeSha}`, { params });
  return res.data;
}

// BLOB OPERATIONS (Read/Write - Code)

export async function getBlob(owner, repo, fileSha) {
  const res = await github.get(`/repos/${owner}/${repo}/git/blobs/${fileSha}`);
  return res.data;
}

export async function createBlob(owner, repo, content, encoding = "utf-8") {
  const res = await github.post(`/repos/${owner}/${repo}/git/blobs`, {
    content,
    encoding
  });
  return res.data;
}

// REPOSITORY ADVISORIES (Read)

export async function listRepositoryAdvisories(owner, repo) {
  const res = await github.get(`/repos/${owner}/${repo}/security-advisories`);
  return res.data;
}

export async function getRepositoryAdvisory(owner, repo, ghsaId) {
  const res = await github.get(`/repos/${owner}/${repo}/security-advisories/${ghsaId}`);
  return res.data;
}

// SEARCH OPERATIONS (Read - Metadata)

export async function searchRepositories(query, sort = "", order = "desc") {
  const params = { q: query };
  if (sort) params.sort = sort;
  params.order = order;

  const res = await github.get("/search/repositories", { params });
  return res.data;
}

export async function searchCode(query, sort = "", order = "desc") {
  const params = { q: query };
  if (sort) params.sort = sort;
  params.order = order;

  const res = await github.get("/search/code", { params });
  return res.data;
}

export async function searchIssues(query, sort = "", order = "desc") {
  const params = { q: query };
  if (sort) params.sort = sort;
  params.order = order;

  const res = await github.get("/search/issues", { params });
  return res.data;
}

export async function searchCommits(query, sort = "", order = "desc") {
  const params = { q: query };
  if (sort) params.sort = sort;
  params.order = order;

  const res = await github.get("/search/commits", {
    params,
    headers: { Accept: "application/vnd.github.cloak-preview+json" }
  });
  return res.data;
}

// TAGS OPERATIONS (Read - Code)

export async function listTags(owner, repo) {
  const res = await github.get(`/repos/${owner}/${repo}/tags`);
  return res.data;
}

// DIFF OPERATIONS (Read - Code)

export async function getPullRequestDiff(owner, repo, prNumber) {
  const res = await github.get(`/repos/${owner}/${repo}/pulls/${prNumber}`, {
    headers: { Accept: "application/vnd.github.v3.diff" }
  });
  return res.data;
}

export async function getCommitDiff(owner, repo, sha) {
  const res = await github.get(`/repos/${owner}/${repo}/commits/${sha}`, {
    headers: { Accept: "application/vnd.github.v3.diff" }
  });
  return res.data;
}
