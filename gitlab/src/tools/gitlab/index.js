// GitLab Tools Registration
// Registers all GitLab-related MCP tools

import { TOOL_DEFINITIONS } from '../../constants/index.js';
import * as gitlabServices from '../../services/gitlab/index.js';
import { formatSuccess, formatError } from '../../utils/index.js';

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
  
  registerTool(server, GITLAB.PROJECT.LIST_PROJECTS, async ({ payload }) => {
    try {
      const data = await gitlabServices.listProjects(payload.membership, payload.owned, payload.starred);
      return formatSuccess(data);
    } catch (error) {
      return formatError(error);
    }
  });

  registerTool(server, GITLAB.PROJECT.GET_PROJECT, async ({ payload }) => {
    try {
      const data = await gitlabServices.getProject(payload.projectId);
      return formatSuccess(data);
    } catch (error) {
      return formatError(error);
    }
  });

  registerTool(server, GITLAB.PROJECT.CREATE_PROJECT, async ({ payload }) => {
    try {
      const data = await gitlabServices.createProject(payload.name, payload.description, payload.visibility, payload.initializeWithReadme);
      return formatSuccess(data);
    } catch (error) { 
      return formatError(error);
    }
  });

  registerTool(server, GITLAB.PROJECT.LIST_PROJECT_FORKS, async ({ payload }) => {
    try {
      const data = await gitlabServices.listProjectForks(payload.projectId);
      return formatSuccess(data);
    } catch (error) {
      return formatError(error);
    }
  });

  // ===== MERGE REQUEST OPERATIONS =====
  
  registerTool(server, GITLAB.MERGE_REQUEST.LIST_MERGE_REQUESTS, async ({ payload }) => {
    try {
      const data = await gitlabServices.listMergeRequests(payload.projectId, payload.state);
      return formatSuccess(data);
    } catch (error) {
      return formatError(error);
    }
  });

  registerTool(server, GITLAB.MERGE_REQUEST.GET_MERGE_REQUEST, async ({ payload }) => {
    try {
      const data = await gitlabServices.getMergeRequest(payload.projectId, payload.mergeRequestIid);
      return formatSuccess(data);
    } catch (error) {
      return formatError(error);
    }
  });

  registerTool(server, GITLAB.MERGE_REQUEST.GET_MERGE_REQUEST_DIFF, async ({ payload }) => {
    try {
      const data = await gitlabServices.getMergeRequestDiff(payload.projectId, payload.mergeRequestIid);
      return formatSuccess(data);
    } catch (error) {
      return formatError(error);
    }
  });

  registerTool(server, GITLAB.MERGE_REQUEST.LIST_MR_COMMITS, async ({ payload }) => {
    try {
      const data = await gitlabServices.listMRCommits(payload.projectId, payload.mergeRequestIid);
      return formatSuccess(data);
    } catch (error) {
      return formatError(error);
    }
  });

  registerTool(server, GITLAB.MERGE_REQUEST.LIST_MR_COMMENTS, async ({ payload }) => {
    try {
      const data = await gitlabServices.listMRComments(payload.projectId, payload.mergeRequestIid);
      return formatSuccess(data);
    } catch (error) {
      return formatError(error);
    }
  });

  // ===== BRANCH OPERATIONS =====
  
  registerTool(server, GITLAB.BRANCH.LIST_BRANCHES, async ({ payload }) => {
    try {
      const data = await gitlabServices.listBranches(payload.projectId);
      return formatSuccess(data);
    } catch (error) {
      return formatError(error);
    }
  });

  registerTool(server, GITLAB.BRANCH.GET_BRANCH, async ({ payload }) => {
    try {
      const data = await gitlabServices.getBranch(payload.projectId, payload.branchName);
      return formatSuccess(data);
    } catch (error) {
      return formatError(error);
    }
  });

  registerTool(server, GITLAB.BRANCH.CREATE_BRANCH, async ({ payload }) => {
    try {
      const data = await gitlabServices.createBranch(payload.projectId, payload.branchName, payload.ref);
      return formatSuccess(data);
    } catch (error) {
      return formatError(error);
    }
  });

  registerTool(server, GITLAB.BRANCH.DELETE_BRANCH, async ({ payload }) => {
    try {
      const data = await gitlabServices.deleteBranch(payload.projectId, payload.branchName);
      return formatSuccess(data);
    } catch (error) {
      return formatError(error);
    }
  });

  // ===== COMMIT OPERATIONS =====
  
  registerTool(server, GITLAB.COMMIT.LIST_COMMITS, async ({ payload }) => {
    try {
      const data = await gitlabServices.listCommits(payload.projectId, payload.refName);
      return formatSuccess(data);
    } catch (error) {
      return formatError(error);
    }
  });

  registerTool(server, GITLAB.COMMIT.GET_COMMIT, async ({ payload }) => {
    try {
      const data = await gitlabServices.getCommit(payload.projectId, payload.sha);
      return formatSuccess(data);
    } catch (error) {
      return formatError(error);
    }
  });

  registerTool(server, GITLAB.COMMIT.GET_COMMIT_DIFF, async ({ payload }) => {
    try {
      const data = await gitlabServices.getCommitDiff(payload.projectId, payload.sha);
      return formatSuccess(data);
    } catch (error) {
      return formatError(error);
    }
  });

  registerTool(server, GITLAB.COMMIT.LIST_COMMIT_COMMENTS, async ({ payload }) => {
    try {
      const data = await gitlabServices.listCommitComments(payload.projectId, payload.sha);
      return formatSuccess(data);
    } catch (error) {
      return formatError(error);
    }
  });

  // ===== FILE OPERATIONS =====
  
  registerTool(server, GITLAB.FILE.GET_FILE, async ({ payload }) => {
    try {
      const data = await gitlabServices.getFile(payload.projectId, payload.filePath, payload.ref);
      return formatSuccess(data);
    } catch (error) {
      return formatError(error);
    }
  });

  registerTool(server, GITLAB.FILE.GET_DIRECTORY, async ({ payload }) => {
    try {
      const data = await gitlabServices.getDirectory(payload.projectId, payload.path, payload.ref);
      return formatSuccess(data);
    } catch (error) {
      return formatError(error);
    }
  });

  registerTool(server, GITLAB.FILE.CREATE_FILE, async ({ payload }) => {
    try {
      const data = await gitlabServices.createFile(payload.projectId, payload.filePath, payload.branch, payload.content, payload.commitMessage);
      return formatSuccess(data);
    } catch (error) {
      return formatError(error);
    }
  });

  registerTool(server, GITLAB.FILE.UPDATE_FILE, async ({ payload }) => {
    try {
      const data = await gitlabServices.updateFile(payload.projectId, payload.filePath, payload.branch, payload.content, payload.commitMessage);
      return formatSuccess(data);
    } catch (error) {
      return formatError(error);
    }
  });

  // ===== ISSUE OPERATIONS =====
  
  registerTool(server, GITLAB.ISSUE.LIST_ISSUES, async ({ payload }) => {
    try {
      const data = await gitlabServices.listIssues(payload.projectId, payload.state);
      return formatSuccess(data);
    } catch (error) {
      return formatError(error);
    }
  });

  registerTool(server, GITLAB.ISSUE.GET_ISSUE, async ({ payload }) => {
    try {
      const data = await gitlabServices.getIssue(payload.projectId, payload.issueIid);
      return formatSuccess(data);
    } catch (error) {
      return formatError(error);
    }
  });

  registerTool(server, GITLAB.ISSUE.CREATE_ISSUE, async ({ payload }) => {
    try {
      const data = await gitlabServices.createIssue(payload.projectId, payload.title, payload.description);
      return formatSuccess(data);
    } catch (error) {
      return formatError(error);
    }
  });

  registerTool(server, GITLAB.ISSUE.UPDATE_ISSUE, async ({ payload }) => {
    try {
      const data = await gitlabServices.updateIssue(payload.projectId, payload.issueIid, payload.title, payload.description, payload.stateEvent);
      return formatSuccess(data);
    } catch (error) {
      return formatError(error);
    }
  });

  registerTool(server, GITLAB.ISSUE.LIST_ISSUE_COMMENTS, async ({ payload }) => {
    try {
      const data = await gitlabServices.listIssueComments(payload.projectId, payload.issueIid);
      return formatSuccess(data);
    } catch (error) {
      return formatError(error);
    }
  });

  // ===== SEARCH OPERATIONS =====
  
  registerTool(server, GITLAB.SEARCH.SEARCH_CODE, async ({ payload }) => {
    try {
      const data = await gitlabServices.searchCode(payload.searchQuery, payload.projectId);
      return formatSuccess(data);
    } catch (error) {
      return formatError(error);
    }
  });

  registerTool(server, GITLAB.SEARCH.SEARCH_PROJECTS, async ({ payload }) => {
    try {
      const data = await gitlabServices.searchProjects(payload.searchQuery);
      return formatSuccess(data);
    } catch (error) {
      return formatError(error);
    }
  });
}

export { registerGitLabTools };
