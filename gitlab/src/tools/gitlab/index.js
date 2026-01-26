// GitLab Tools Registration
// Registers all GitLab-related MCP tools

import { TOOL_DEFINITIONS } from '../../constants/index.js';
import * as gitlabServices from '../../services/gitlab/index.js';
import { formatSuccess, formatError, formatText } from '../../utils/index.js';

// Get GitLab tool definitions
const { GITLAB } = TOOL_DEFINITIONS;

/**
 * Helper function to register a tool from its definition
 */
function registerTool(server, toolDef, handler) {
  server.registerTool(
    toolDef.name,
    {
      description: toolDef.description,
      inputSchema: toolDef.inputSchema,
    },
    handler
  );
}

/**
 * Register all GitLab tools
 * @param {McpServer} server - MCP server instance
 */
function registerGitLabTools(server) {
  // ===== PROJECT OPERATIONS =====
  
  registerTool(server, GITLAB.PROJECT.LIST_PROJECTS, async ({ membership, owned, starred }) => {
    try {
      const data = await gitlabServices.listProjects(membership, owned, starred);
      return formatSuccess(data);
    } catch (error) {
      return formatError(error);
    }
  });

  registerTool(server, GITLAB.PROJECT.GET_PROJECT, async ({ projectId }) => {
    try {
      const data = await gitlabServices.getProject(projectId);
      return formatSuccess(data);
    } catch (error) {
      return formatError(error);
    }
  });

  registerTool(server, GITLAB.PROJECT.CREATE_PROJECT, async ({ name, description, visibility, initializeWithReadme }) => {
    try {
      const data = await gitlabServices.createProject(name, description, visibility, initializeWithReadme);
      return formatSuccess(data);
    } catch (error) {
      return formatError(error);
    }
  });

  registerTool(server, GITLAB.PROJECT.LIST_PROJECT_FORKS, async ({ projectId }) => {
    try {
      const data = await gitlabServices.listProjectForks(projectId);
      return formatSuccess(data);
    } catch (error) {
      return formatError(error);
    }
  });

  // ===== MERGE REQUEST OPERATIONS =====
  
  registerTool(server, GITLAB.MERGE_REQUEST.LIST_MERGE_REQUESTS, async ({ projectId, state }) => {
    try {
      const data = await gitlabServices.listMergeRequests(projectId, state);
      return formatSuccess(data);
    } catch (error) {
      return formatError(error);
    }
  });

  registerTool(server, GITLAB.MERGE_REQUEST.GET_MERGE_REQUEST, async ({ projectId, mergeRequestIid }) => {
    try {
      const data = await gitlabServices.getMergeRequest(projectId, mergeRequestIid);
      return formatSuccess(data);
    } catch (error) {
      return formatError(error);
    }
  });

  registerTool(server, GITLAB.MERGE_REQUEST.GET_MERGE_REQUEST_DIFF, async ({ projectId, mergeRequestIid }) => {
    try {
      const data = await gitlabServices.getMergeRequestDiff(projectId, mergeRequestIid);
      return formatSuccess(data);
    } catch (error) {
      return formatError(error);
    }
  });

  registerTool(server, GITLAB.MERGE_REQUEST.LIST_MR_COMMITS, async ({ projectId, mergeRequestIid }) => {
    try {
      const data = await gitlabServices.listMRCommits(projectId, mergeRequestIid);
      return formatSuccess(data);
    } catch (error) {
      return formatError(error);
    }
  });

  registerTool(server, GITLAB.MERGE_REQUEST.LIST_MR_COMMENTS, async ({ projectId, mergeRequestIid }) => {
    try {
      const data = await gitlabServices.listMRComments(projectId, mergeRequestIid);
      return formatSuccess(data);
    } catch (error) {
      return formatError(error);
    }
  });

  // ===== BRANCH OPERATIONS =====
  
  registerTool(server, GITLAB.BRANCH.LIST_BRANCHES, async ({ projectId }) => {
    try {
      const data = await gitlabServices.listBranches(projectId);
      return formatSuccess(data);
    } catch (error) {
      return formatError(error);
    }
  });

  registerTool(server, GITLAB.BRANCH.GET_BRANCH, async ({ projectId, branchName }) => {
    try {
      const data = await gitlabServices.getBranch(projectId, branchName);
      return formatSuccess(data);
    } catch (error) {
      return formatError(error);
    }
  });

  registerTool(server, GITLAB.BRANCH.CREATE_BRANCH, async ({ projectId, branchName, ref }) => {
    try {
      const data = await gitlabServices.createBranch(projectId, branchName, ref);
      return formatSuccess(data);
    } catch (error) {
      return formatError(error);
    }
  });

  registerTool(server, GITLAB.BRANCH.DELETE_BRANCH, async ({ projectId, branchName }) => {
    try {
      const data = await gitlabServices.deleteBranch(projectId, branchName);
      return formatSuccess(data);
    } catch (error) {
      return formatError(error);
    }
  });

  // ===== COMMIT OPERATIONS =====
  
  registerTool(server, GITLAB.COMMIT.LIST_COMMITS, async ({ projectId, refName }) => {
    try {
      const data = await gitlabServices.listCommits(projectId, refName);
      return formatSuccess(data);
    } catch (error) {
      return formatError(error);
    }
  });

  registerTool(server, GITLAB.COMMIT.GET_COMMIT, async ({ projectId, sha }) => {
    try {
      const data = await gitlabServices.getCommit(projectId, sha);
      return formatSuccess(data);
    } catch (error) {
      return formatError(error);
    }
  });

  registerTool(server, GITLAB.COMMIT.GET_COMMIT_DIFF, async ({ projectId, sha }) => {
    try {
      const data = await gitlabServices.getCommitDiff(projectId, sha);
      return formatSuccess(data);
    } catch (error) {
      return formatError(error);
    }
  });

  registerTool(server, GITLAB.COMMIT.LIST_COMMIT_COMMENTS, async ({ projectId, sha }) => {
    try {
      const data = await gitlabServices.listCommitComments(projectId, sha);
      return formatSuccess(data);
    } catch (error) {
      return formatError(error);
    }
  });

  // ===== FILE OPERATIONS =====
  
  registerTool(server, GITLAB.FILE.GET_FILE, async ({ projectId, filePath, ref }) => {
    try {
      const data = await gitlabServices.getFile(projectId, filePath, ref);
      return formatSuccess(data);
    } catch (error) {
      return formatError(error);
    }
  });

  registerTool(server, GITLAB.FILE.GET_DIRECTORY, async ({ projectId, path, ref }) => {
    try {
      const data = await gitlabServices.getDirectory(projectId, path, ref);
      return formatSuccess(data);
    } catch (error) {
      return formatError(error);
    }
  });

  registerTool(server, GITLAB.FILE.CREATE_FILE, async ({ projectId, filePath, branch, content, commitMessage }) => {
    try {
      const data = await gitlabServices.createFile(projectId, filePath, branch, content, commitMessage);
      return formatSuccess(data);
    } catch (error) {
      return formatError(error);
    }
  });

  registerTool(server, GITLAB.FILE.UPDATE_FILE, async ({ projectId, filePath, branch, content, commitMessage }) => {
    try {
      const data = await gitlabServices.updateFile(projectId, filePath, branch, content, commitMessage);
      return formatSuccess(data);
    } catch (error) {
      return formatError(error);
    }
  });

  // ===== ISSUE OPERATIONS =====
  
  registerTool(server, GITLAB.ISSUE.LIST_ISSUES, async ({ projectId, state }) => {
    try {
      const data = await gitlabServices.listIssues(projectId, state);
      return formatSuccess(data);
    } catch (error) {
      return formatError(error);
    }
  });

  registerTool(server, GITLAB.ISSUE.GET_ISSUE, async ({ projectId, issueIid }) => {
    try {
      const data = await gitlabServices.getIssue(projectId, issueIid);
      return formatSuccess(data);
    } catch (error) {
      return formatError(error);
    }
  });

  registerTool(server, GITLAB.ISSUE.CREATE_ISSUE, async ({ projectId, title, description }) => {
    try {
      const data = await gitlabServices.createIssue(projectId, title, description);
      return formatSuccess(data);
    } catch (error) {
      return formatError(error);
    }
  });

  registerTool(server, GITLAB.ISSUE.UPDATE_ISSUE, async ({ projectId, issueIid, title, description, stateEvent }) => {
    try {
      const data = await gitlabServices.updateIssue(projectId, issueIid, title, description, stateEvent);
      return formatSuccess(data);
    } catch (error) {
      return formatError(error);
    }
  });

  registerTool(server, GITLAB.ISSUE.LIST_ISSUE_COMMENTS, async ({ projectId, issueIid }) => {
    try {
      const data = await gitlabServices.listIssueComments(projectId, issueIid);
      return formatSuccess(data);
    } catch (error) {
      return formatError(error);
    }
  });

  // ===== SEARCH OPERATIONS =====
  
  registerTool(server, GITLAB.SEARCH.SEARCH_CODE, async ({ searchQuery, projectId }) => {
    try {
      const data = await gitlabServices.searchCode(searchQuery, projectId);
      return formatSuccess(data);
    } catch (error) {
      return formatError(error);
    }
  });

  registerTool(server, GITLAB.SEARCH.SEARCH_PROJECTS, async ({ searchQuery }) => {
    try {
      const data = await gitlabServices.searchProjects(searchQuery);
      return formatSuccess(data);
    } catch (error) {
      return formatError(error);
    }
  });
}

export { registerGitLabTools };
