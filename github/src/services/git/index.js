import simpleGit from 'simple-git';

// Initialize a new Git repository
export async function gitInit(payload) { 
  try {
    const git = simpleGit(payload.repoPath);
    await git.init();
    return `Initialized empty Git repository in ${payload.repoPath}`;
  } catch (error) {
    throw new Error(`Failed to initialize git repository at ${payload.repoPath}: ${error.message}`);
  }
}


// Get repository status
export async function gitStatus(payload) {
  try {
    const git = simpleGit(payload.repoPath);
    return await git.status();
  } catch (error) {
    throw new Error(`Failed to get git status for ${payload.repoPath}: ${error.message}`);
  }
}

// Stage files for commit
export async function gitAdd(payload) {
  try {
    const git = simpleGit(payload.repoPath);
    await git.add(payload.files);
    return `Added ${Array.isArray(payload.files) ? payload.files.join(', ') : payload.files} to staging area`;
  } catch (error) {
    throw new Error(`Failed to add files to git staging area in ${payload.repoPath}: ${error.message}`);
  }
}

// Create a commit
export async function gitCommit(payload) {
  try {
    const git = simpleGit(payload.repoPath);
    return await git.commit(payload.message);
  } catch (error) {
    throw new Error(`Failed to create git commit in ${payload.repoPath}: ${error.message}`);
  }
}

// Push commits to remote
export async function gitPush(payload) {
  try {
    const git = simpleGit(payload.repoPath);
    const options = payload.setUpstream ? ['--set-upstream', payload.remote, payload.branch] : [payload.remote, payload.branch];
    return await git.push(options);
  } catch (error) {
    throw new Error(`Failed to push to ${payload.remote}/${payload.branch} from ${payload.repoPath}: ${error.message}`);
  }
}

// Pull changes from remote
export async function gitPull(payload) {
  try {
    const git = simpleGit(payload.repoPath);
    return await git.pull(payload.remote, payload.branch);
  } catch (error) {
    throw new Error(`Failed to pull from ${payload.remote}/${payload.branch} to ${payload.repoPath}: ${error.message}`);
  }
}

// Clone a repository
export async function gitClone(payload) {
  try {
    const git = simpleGit();
    await git.clone(payload.url, payload.targetPath);
    return `Cloned repository from ${payload.url} to ${payload.targetPath}`;
  } catch (error) {
    throw new Error(`Failed to clone repository from ${payload.url} to ${payload.targetPath}: ${error.message}`);
  }
}


// Add a remote repository
export async function gitRemoteAdd(payload) {
  try {
    const git = simpleGit(payload.repoPath);
    await git.addRemote(payload.name, payload.url);
    return `Added remote '${payload.name}' with URL: ${payload.url}`;
  } catch (error) {
    throw new Error(`Failed to add remote '${payload.name}' in ${payload.repoPath}: ${error.message}`);
  }
}

// List remote repositories
export async function gitRemoteList(payload) {
  try {
    const git = simpleGit(payload.repoPath);
    const remotes = await git.getRemotes(true);
    return remotes;
  } catch (error) {
    throw new Error(`Failed to list remotes in ${payload.repoPath}: ${error.message}`);
  }
}

// Remove a remote repository
export async function gitRemoteRemove(payload) {
  try {
    const git = simpleGit(payload.repoPath);
    await git.removeRemote(payload.name);
    return `Removed remote '${payload.name}'`;
  } catch (error) {
    throw new Error(`Failed to remove remote '${payload.name}' from ${payload.repoPath}: ${error.message}`);
  }
}

// Get commit history
export async function gitLog(payload) {
  try {
    const git = simpleGit(payload.repoPath);
    return await git.log({ maxCount: payload.maxCount });
  } catch (error) {
    throw new Error(`Failed to get git log for ${payload.repoPath}: ${error.message}`);
  }
}

// Show changes (diff)
export async function gitDiff(payload) {
  try {
    const git = simpleGit(payload.repoPath);
    return await git.diff(payload.options);
  } catch (error) {
    throw new Error(`Failed to get git diff for ${payload.repoPath}: ${error.message}`);
  }
}

// Reset to a commit
export async function gitReset(payload) {
  try {
    const git = simpleGit(payload.repoPath);
    const resetMode = `--${payload.mode}`;
    await git.reset([resetMode, payload.commit]);
    return `Reset to ${payload.commit} with mode: ${payload.mode}`;
  } catch (error) {
    throw new Error(`Failed to reset git repository at ${payload.repoPath}: ${error.message}`);
  }
}

// Switch or create branches
export async function gitCheckout(payload) {
  try {
    const git = simpleGit(payload.repoPath);
    if (payload.createNew) {
      await git.checkoutLocalBranch(payload.branch);
      return `Created and switched to new branch '${payload.branch}'`;

    }
    await git.checkout(payload.branch);
    return `Switched to branch '${payload.branch}'`;
  } catch (error) {
    throw new Error(`Failed to checkout branch '${payload.branch}' in ${payload.repoPath}: ${error.message}`);
  }
}

// List local branches
export async function gitBranchList(payload) {
  try {
    const git = simpleGit(payload.repoPath);
    return await git.branchLocal();
  } catch (error) {
    throw new Error(`Failed to list branches in ${payload.repoPath}: ${error.message}`);
  }
}

// Delete a branch
export async function gitBranchDelete(payload) {
  try {
    const git = simpleGit(payload.repoPath);
    await git.deleteLocalBranch(payload.branch, payload.force);
    return `Deleted branch '${payload.branch}'${payload.force ? ' (forced)' : ''}`;
  } catch (error) {
    throw new Error(`Failed to delete branch '${payload.branch}' in ${payload.repoPath}: ${error.message}`);
  }
}

// Stash changes
export async function gitStash(payload) {
  try {
    const git = simpleGit(payload.repoPath);

    switch (payload.action) {
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
        throw new Error(`Unknown stash action: ${payload.action}`);
    }
  } catch (error) {
    throw new Error(`Failed to perform stash action '${payload.action}' in ${payload.repoPath}: ${error.message}`);
  }
}

// Create a tag
export async function gitTag(payload) {
  try {
    const git = simpleGit(payload.repoPath);
    if (payload.message) {
      await git.addAnnotatedTag(payload.tagName, payload.message);
      return `Created annotated tag '${payload.tagName}' with message: ${payload.message}`;
    }
    await git.addTag(payload.tagName);
    return `Created tag '${payload.tagName}'`;
  } catch (error) {
    throw new Error(`Failed to create tag '${payload.tagName}' in ${payload.repoPath}: ${error.message}`);
  }
}

// Fetch from remote
export async function gitFetch(payload) {
  try {
    const git = simpleGit(payload.repoPath);
    return await git.fetch(payload.remote);
  } catch (error) {
    throw new Error(`Failed to fetch from remote '${payload.remote}' in ${payload.repoPath}: ${error.message}`);
  }
}

// Merge branches
export async function gitMerge(payload) {
  try {
    const git = simpleGit(payload.repoPath);
    return await git.merge([payload.branch]);
  } catch (error) {
    throw new Error(`Failed to merge branch '${payload.branch}' in ${payload.repoPath}: ${error.message}`);
  }
}
