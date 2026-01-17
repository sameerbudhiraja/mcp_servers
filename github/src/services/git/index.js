import simpleGit from 'simple-git';

// Initialize a new Git repository
export async function gitInit(repoPath) {
  const git = simpleGit(repoPath);
  await git.init();
  return `Initialized empty Git repository in ${repoPath}`;
}


// Get repository status
export async function gitStatus(repoPath) {
  const git = simpleGit(repoPath);
  return await git.status();
}

// Stage files for commit
export async function gitAdd(repoPath, files) {
  const git = simpleGit(repoPath);
  await git.add(files);
  return `Added ${Array.isArray(files) ? files.join(', ') : files} to staging area`;
}

// Create a commit
export async function gitCommit(repoPath, message) {
  const git = simpleGit(repoPath);
  return await git.commit(message);
}

// Push commits to remote
export async function gitPush(repoPath, remote, branch, setUpstream = false) {
  const git = simpleGit(repoPath);
  const options = setUpstream ? ['--set-upstream', remote, branch] : [remote, branch];
  return await git.push(options);
}

// Pull changes from remote
export async function gitPull(repoPath, remote, branch) {
  const git = simpleGit(repoPath);
  return await git.pull(remote, branch);
}

// Clone a repository
export async function gitClone(url, targetPath) {
  const git = simpleGit();
  await git.clone(url, targetPath);
  return `Cloned repository from ${url} to ${targetPath}`;
}


// Add a remote repository
export async function gitRemoteAdd(repoPath, name, url) {
  const git = simpleGit(repoPath);
  await git.addRemote(name, url);
  return `Added remote '${name}' with URL: ${url}`;
}

// List remote repositories
export async function gitRemoteList(repoPath) {
  const git = simpleGit(repoPath);
  const remotes = await git.getRemotes(true);
  return remotes;
}

// Remove a remote repository
export async function gitRemoteRemove(repoPath, name) {
  const git = simpleGit(repoPath);
  await git.removeRemote(name);
  return `Removed remote '${name}'`;
}

// Get commit history
export async function gitLog(repoPath, maxCount = 10) {
  const git = simpleGit(repoPath);
  return await git.log({ maxCount });
}

// Show changes (diff)
export async function gitDiff(repoPath, options = {}) {
  const git = simpleGit(repoPath);
  return await git.diff(options);
}

// Reset to a commit
export async function gitReset(repoPath, mode = 'mixed', commit = 'HEAD') {
  const git = simpleGit(repoPath);
  const resetMode = `--${mode}`;
  await git.reset([resetMode, commit]);
  return `Reset to ${commit} with mode: ${mode}`;
}

// Switch or create branches
export async function gitCheckout(repoPath, branch, createNew = false) {
  const git = simpleGit(repoPath);
  if (createNew) {
    await git.checkoutLocalBranch(branch);
    return `Created and switched to new branch '${branch}'`;
  } else {
    await git.checkout(branch);
    return `Switched to branch '${branch}'`;
  }
}

// List local branches
export async function gitBranchList(repoPath) {
  const git = simpleGit(repoPath);
  return await git.branchLocal();
}

// Delete a branch
export async function gitBranchDelete(repoPath, branch, force = false) {
  const git = simpleGit(repoPath);
  await git.deleteLocalBranch(branch, force);
  return `Deleted branch '${branch}'${force ? ' (forced)' : ''}`;
}

// Stash changes
export async function gitStash(repoPath, action = 'save') {
  const git = simpleGit(repoPath);

  switch (action) {
    case 'save':
      await git.stash();
      return 'Changes stashed';
    case 'pop':
      await git.stash(['pop']);
      return 'Stash popped';
    case 'list':
      return await git.stashList();
    case 'clear':
      await git.stash(['clear']);
      return 'Stash cleared';
    default:
      throw new Error(`Unknown stash action: ${action}`);
  }
}

// Create a tag
export async function gitTag(repoPath, tagName, message = null) {
  const git = simpleGit(repoPath);
  if (message) {
    await git.addAnnotatedTag(tagName, message);
    return `Created annotated tag '${tagName}' with message: ${message}`;
  } else {
    await git.addTag(tagName);
    return `Created tag '${tagName}'`;
  }
}

// Fetch from remote
export async function gitFetch(repoPath, remote = 'origin') {
  const git = simpleGit(repoPath);
  return await git.fetch(remote);
}

// Merge branches
export async function gitMerge(repoPath, branch) {
  const git = simpleGit(repoPath);
  return await git.merge([branch]);
}
