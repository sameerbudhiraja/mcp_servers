import simpleGit from 'simple-git';

// Initialize a new Git repository
export async function gitInit(repoPath) {
  try {
    const git = simpleGit(repoPath);
    await git.init();
    return `Initialized empty Git repository in ${repoPath}`;
  } catch (error) {
    throw new Error(`Failed to initialize git repository at ${repoPath}: ${error.message}`);
  }
}


// Get repository status
export async function gitStatus(repoPath) {
  try {
    const git = simpleGit(repoPath);
    return await git.status();
  } catch (error) {
    throw new Error(`Failed to get git status for ${repoPath}: ${error.message}`);
  }
}

// Stage files for commit
export async function gitAdd(repoPath, files) {
  try {
    const git = simpleGit(repoPath);
    await git.add(files);
    return `Added ${Array.isArray(files) ? files.join(', ') : files} to staging area`;
  } catch (error) {
    throw new Error(`Failed to add files to git staging area in ${repoPath}: ${error.message}`);
  }
}

// Create a commit
export async function gitCommit(repoPath, message) {
  try {
    const git = simpleGit(repoPath);
    return await git.commit(message);
  } catch (error) {
    throw new Error(`Failed to create git commit in ${repoPath}: ${error.message}`);
  }
}

// Push commits to remote
export async function gitPush(repoPath, remote, branch, setUpstream = false) {
  try {
    const git = simpleGit(repoPath);
    const options = setUpstream ? ['--set-upstream', remote, branch] : [remote, branch];
    return await git.push(options);
  } catch (error) {
    throw new Error(`Failed to push to ${remote}/${branch} from ${repoPath}: ${error.message}`);
  }
}

// Pull changes from remote
export async function gitPull(repoPath, remote, branch) {
  try {
    const git = simpleGit(repoPath);
    return await git.pull(remote, branch);
  } catch (error) {
    throw new Error(`Failed to pull from ${remote}/${branch} to ${repoPath}: ${error.message}`);
  }
}

// Clone a repository
export async function gitClone(url, targetPath) {
  try {
    const git = simpleGit();
    await git.clone(url, targetPath);
    return `Cloned repository from ${url} to ${targetPath}`;
  } catch (error) {
    throw new Error(`Failed to clone repository from ${url} to ${targetPath}: ${error.message}`);
  }
}


// Add a remote repository
export async function gitRemoteAdd(repoPath, name, url) {
  try {
    const git = simpleGit(repoPath);
    await git.addRemote(name, url);
    return `Added remote '${name}' with URL: ${url}`;
  } catch (error) {
    throw new Error(`Failed to add remote '${name}' in ${repoPath}: ${error.message}`);
  }
}

// List remote repositories
export async function gitRemoteList(repoPath) {
  try {
    const git = simpleGit(repoPath);
    const remotes = await git.getRemotes(true);
    return remotes;
  } catch (error) {
    throw new Error(`Failed to list remotes in ${repoPath}: ${error.message}`);
  }
}

// Remove a remote repository
export async function gitRemoteRemove(repoPath, name) {
  try {
    const git = simpleGit(repoPath);
    await git.removeRemote(name);
    return `Removed remote '${name}'`;
  } catch (error) {
    throw new Error(`Failed to remove remote '${name}' from ${repoPath}: ${error.message}`);
  }
}

// Get commit history
export async function gitLog(repoPath, maxCount = 10) {
  try {
    const git = simpleGit(repoPath);
    return await git.log({ maxCount });
  } catch (error) {
    throw new Error(`Failed to get git log for ${repoPath}: ${error.message}`);
  }
}

// Show changes (diff)
export async function gitDiff(repoPath, options = {}) {
  try {
    const git = simpleGit(repoPath);
    return await git.diff(options);
  } catch (error) {
    throw new Error(`Failed to get git diff for ${repoPath}: ${error.message}`);
  }
}

// Reset to a commit
export async function gitReset(repoPath, mode = 'mixed', commit = 'HEAD') {
  try {
    const git = simpleGit(repoPath);
    const resetMode = `--${mode}`;
    await git.reset([resetMode, commit]);
    return `Reset to ${commit} with mode: ${mode}`;
  } catch (error) {
    throw new Error(`Failed to reset git repository at ${repoPath}: ${error.message}`);
  }
}

// Switch or create branches
export async function gitCheckout(repoPath, branch, createNew = false) {
  try {
    const git = simpleGit(repoPath);
    if (createNew) {
      await git.checkoutLocalBranch(branch);
      return `Created and switched to new branch '${branch}'`;

    }
    await git.checkout(branch);
    return `Switched to branch '${branch}'`;
  } catch (error) {
    throw new Error(`Failed to checkout branch '${branch}' in ${repoPath}: ${error.message}`);
  }
}

// List local branches
export async function gitBranchList(repoPath) {
  try {
    const git = simpleGit(repoPath);
    return await git.branchLocal();
  } catch (error) {
    throw new Error(`Failed to list branches in ${repoPath}: ${error.message}`);
  }
}

// Delete a branch
export async function gitBranchDelete(repoPath, branch, force = false) {
  try {
    const git = simpleGit(repoPath);
    await git.deleteLocalBranch(branch, force);
    return `Deleted branch '${branch}'${force ? ' (forced)' : ''}`;
  } catch (error) {
    throw new Error(`Failed to delete branch '${branch}' in ${repoPath}: ${error.message}`);
  }
}

// Stash changes
export async function gitStash(repoPath, action = 'save') {
  try {
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
  } catch (error) {
    throw new Error(`Failed to perform stash action '${action}' in ${repoPath}: ${error.message}`);
  }
}

// Create a tag
export async function gitTag(repoPath, tagName, message = null) {
  try {
    const git = simpleGit(repoPath);
    if (message) {
      await git.addAnnotatedTag(tagName, message);
      return `Created annotated tag '${tagName}' with message: ${message}`;
    } 
      await git.addTag(tagName);
      return `Created tag '${tagName}'`;
  } catch (error) {
    throw new Error(`Failed to create tag '${tagName}' in ${repoPath}: ${error.message}`);
  }
}

// Fetch from remote
export async function gitFetch(repoPath, remote = 'origin') {
  try {
    const git = simpleGit(repoPath);
    return await git.fetch(remote);
  } catch (error) {
    throw new Error(`Failed to fetch from remote '${remote}' in ${repoPath}: ${error.message}`);
  }
}

// Merge branches
export async function gitMerge(repoPath, branch) {
  try {
    const git = simpleGit(repoPath);
    return await git.merge([branch]);
  } catch (error) {
    throw new Error(`Failed to merge branch '${branch}' in ${repoPath}: ${error.message}`);
  }
}
