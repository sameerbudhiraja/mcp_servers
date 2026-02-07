import { TOOL_DEFINITIONS } from '../../constants/index.js';
import jiraServices from '../../services/jira/index.js';
import { formatSuccess, formatError } from '../../utils/index.js';

const { JIRA } = TOOL_DEFINITIONS;

/**
 * Helper function to register a tool
 * @param {Object} server - MCP server instance
 * @param {Object} toolDef - Tool definition
 * @param {Function} handler - Tool handler function
 */
function registerTool(server, toolDef, handler) {
  server.registerTool(
    toolDef.name,
    {
      description: toolDef.description,
      inputSchema: toolDef.inputSchema,
    },
    handler,
  );
}

/**
 * Registers all Jira MCP tools
 * @param {Object} server - MCP server instance
 */
export function registerJiraTools(server) {
  // ==================== PROJECT TOOLS ====================
  registerTool(server, JIRA.PROJECT.LIST_PROJECTS, async (args) => {
    try {
      const data = await jiraServices.project.listProjects(args);
      return formatSuccess(data);
    } catch (error) {
      return formatError(error);
    }
  });

  registerTool(server, JIRA.PROJECT.GET_PROJECT, async (args) => {
    try {
      const data = await jiraServices.project.getProject(args.projectIdOrKey);
      return formatSuccess(data);
    } catch (error) {
      return formatError(error);
    }
  });

  registerTool(server, JIRA.PROJECT.CREATE_PROJECT, async (args) => {
    try {
      const data = await jiraServices.project.createProject(args);
      return formatSuccess(data);
    } catch (error) {
      return formatError(error);
    }
  });

  // ==================== ISSUE TOOLS ====================
  registerTool(server, JIRA.ISSUE.CREATE_ISSUE, async (args) => {
    try {
      const data = await jiraServices.issue.createIssue(args);
      return formatSuccess(data);
    } catch (error) {
      return formatError(error);
    }
  });

  registerTool(server, JIRA.ISSUE.GET_ISSUE, async (args) => {
    try {
      const data = await jiraServices.issue.getIssue(args.issueIdOrKey, args);
      return formatSuccess(data);
    } catch (error) {
      return formatError(error);
    }
  });

  registerTool(server, JIRA.ISSUE.UPDATE_ISSUE, async (args) => {
    try {
      const { issueIdOrKey, ...updateData } = args;
      const data = await jiraServices.issue.updateIssue(issueIdOrKey, updateData);
      return formatSuccess(data);
    } catch (error) {
      return formatError(error);
    }
  });

  registerTool(server, JIRA.ISSUE.DELETE_ISSUE, async (args) => {
    try {
      const data = await jiraServices.issue.deleteIssue(args.issueIdOrKey, args.deleteSubtasks);
      return formatSuccess(data);
    } catch (error) {
      return formatError(error);
    }
  });

  registerTool(server, JIRA.ISSUE.ASSIGN_ISSUE, async (args) => {
    try {
      const data = await jiraServices.issue.assignIssue(args.issueIdOrKey, args.accountId);
      return formatSuccess(data);
    } catch (error) {
      return formatError(error);
    }
  });

  registerTool(server, JIRA.ISSUE.GET_ISSUE_CHANGELOG, async (args) => {
    try {
      const data = await jiraServices.issue.getIssueChangelog(args.issueIdOrKey, args);
      return formatSuccess(data);
    } catch (error) {
      return formatError(error);
    }
  });

  registerTool(server, JIRA.ISSUE.BULK_CREATE_ISSUES, async (args) => {
    try {
      const data = await jiraServices.issue.bulkCreateIssues(args.issues);
      return formatSuccess(data);
    } catch (error) {
      return formatError(error);
    }
  });

  registerTool(server, JIRA.ISSUE.GET_CREATE_METADATA, async (args) => {
    try {
      const data = await jiraServices.issue.getCreateMetadata(args);
      return formatSuccess(data);
    } catch (error) {
      return formatError(error);
    }
  });

  // ==================== COMMENT TOOLS ====================
  registerTool(server, JIRA.COMMENT.ADD_COMMENT, async (args) => {
    try {
      const data = await jiraServices.comment.addComment(args.issueIdOrKey, args.body);
      return formatSuccess(data);
    } catch (error) {
      return formatError(error);
    }
  });

  registerTool(server, JIRA.COMMENT.GET_COMMENTS, async (args) => {
    try {
      const data = await jiraServices.comment.getComments(args.issueIdOrKey, args);
      return formatSuccess(data);
    } catch (error) {
      return formatError(error);
    }
  });

  registerTool(server, JIRA.COMMENT.UPDATE_COMMENT, async (args) => {
    try {
      const data = await jiraServices.comment.updateComment(
        args.issueIdOrKey,
        args.commentId,
        args.body,
      );
      return formatSuccess(data);
    } catch (error) {
      return formatError(error);
    }
  });

  registerTool(server, JIRA.COMMENT.DELETE_COMMENT, async (args) => {
    try {
      const data = await jiraServices.comment.deleteComment(args.issueIdOrKey, args.commentId);
      return formatSuccess(data);
    } catch (error) {
      return formatError(error);
    }
  });

  // ==================== SEARCH TOOLS ====================
  registerTool(server, JIRA.SEARCH.SEARCH_ISSUES, async (args) => {
    try {
      const { jql, ...options } = args;
      const data = await jiraServices.search.searchIssues(jql, options);
      return formatSuccess(data);
    } catch (error) {
      return formatError(error);
    }
  });

  registerTool(server, JIRA.SEARCH.SEARCH_ISSUES_PAGINATED, async (args) => {
    try {
      const { jql, ...options } = args;
      const data = await jiraServices.search.searchIssuesPaginated(jql, options);
      return formatSuccess(data);
    } catch (error) {
      return formatError(error);
    }
  });

  // ==================== TRANSITION TOOLS ====================
  registerTool(server, JIRA.TRANSITION.GET_TRANSITIONS, async (args) => {
    try {
      const data = await jiraServices.transition.getTransitions(args.issueIdOrKey);
      return formatSuccess(data);
    } catch (error) {
      return formatError(error);
    }
  });

  registerTool(server, JIRA.TRANSITION.TRANSITION_ISSUE, async (args) => {
    try {
      const { issueIdOrKey, transitionId, ...options } = args;
      const data = await jiraServices.transition.transitionIssue(issueIdOrKey, transitionId, options);
      return formatSuccess(data);
    } catch (error) {
      return formatError(error);
    }
  });

  // ==================== USER TOOLS ====================
  registerTool(server, JIRA.USER.SEARCH_USERS, async (args) => {
    try {
      const data = await jiraServices.user.searchUsers(args.query, args);
      return formatSuccess(data);
    } catch (error) {
      return formatError(error);
    }
  });

  registerTool(server, JIRA.USER.GET_CURRENT_USER, async () => {
    try {
      const data = await jiraServices.user.getCurrentUser();
      return formatSuccess(data);
    } catch (error) {
      return formatError(error);
    }
  });

  // ==================== SPRINT TOOLS ====================
  registerTool(server, JIRA.SPRINT.GET_SPRINT, async (args) => {
    try {
      const data = await jiraServices.sprint.getSprint(args.sprintId);
      return formatSuccess(data);
    } catch (error) {
      return formatError(error);
    }
  });

  registerTool(server, JIRA.SPRINT.GET_SPRINT_ISSUES, async (args) => {
    try {
      const { sprintId, ...options } = args;
      const data = await jiraServices.sprint.getSprintIssues(sprintId, options);
      return formatSuccess(data);
    } catch (error) {
      return formatError(error);
    }
  });

  // ==================== ATTACHMENT TOOLS ====================
  registerTool(server, JIRA.ATTACHMENT.ADD_ATTACHMENT, async (args) => {
    try {
      const data = await jiraServices.attachment.addAttachment(args.issueIdOrKey, args.filePath);
      return formatSuccess(data);
    } catch (error) {
      return formatError(error);
    }
  });

  registerTool(server, JIRA.ATTACHMENT.GET_ATTACHMENTS, async (args) => {
    try {
      const data = await jiraServices.attachment.getAttachments(args.issueIdOrKey);
      return formatSuccess(data);
    } catch (error) {
      return formatError(error);
    }
  });

  registerTool(server, JIRA.ATTACHMENT.DELETE_ATTACHMENT, async (args) => {
    try {
      const data = await jiraServices.attachment.deleteAttachment(args.attachmentId);
      return formatSuccess(data);
    } catch (error) {
      return formatError(error);
    }
  });

  // ==================== WORKLOG TOOLS ====================
  registerTool(server, JIRA.WORKLOG.ADD_WORKLOG, async (args) => {
    try {
      const data = await jiraServices.worklog.addWorklog(args.issueIdOrKey, args);
      return formatSuccess(data);
    } catch (error) {
      return formatError(error);
    }
  });

  registerTool(server, JIRA.WORKLOG.GET_WORKLOGS, async (args) => {
    try {
      const data = await jiraServices.worklog.getWorklogs(args.issueIdOrKey);
      return formatSuccess(data);
    } catch (error) {
      return formatError(error);
    }
  });

  registerTool(server, JIRA.WORKLOG.DELETE_WORKLOG, async (args) => {
    try {
      const data = await jiraServices.worklog.deleteWorklog(args.issueIdOrKey, args.worklogId);
      return formatSuccess(data);
    } catch (error) {
      return formatError(error);
    }
  });

  // ==================== FILTER TOOLS ====================
  registerTool(server, JIRA.FILTER.GET_FILTERS, async (args) => {
    try {
      const data = await jiraServices.filter.getFilters(args);
      return formatSuccess(data);
    } catch (error) {
      return formatError(error);
    }
  });

  registerTool(server, JIRA.FILTER.SEARCH_BY_FILTER, async (args) => {
    try {
      const { filterId, ...options } = args;
      const data = await jiraServices.filter.searchByFilter(filterId, options);
      return formatSuccess(data);
    } catch (error) {
      return formatError(error);
    }
  });

  // logger.info('Successfully registered all Jira MCP tools');
}
