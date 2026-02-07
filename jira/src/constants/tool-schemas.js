import { z } from 'zod';

/**
 * Tool Definitions for Jira MCP Server
 * Each tool has a name, description, and Zod input schema for validation
 */

export const TOOL_DEFINITIONS = {
  JIRA: {
    // ==================== PROJECT TOOLS ====================
    PROJECT: {
      LIST_PROJECTS: {
        name: 'jira_list_projects',
        description: 'Lists all accessible Jira projects',
        inputSchema: {
          startAt: z.number().optional().describe('Starting index for pagination (default: 0)'),
          maxResults: z.number().optional().describe('Maximum results to return (default: 50)'),
        },
      },

      GET_PROJECT: {
        name: 'jira_get_project',
        description: 'Gets details of a specific Jira project',
        inputSchema: {
          projectIdOrKey: z.string().describe('Project ID or key'),
        },
      },

      CREATE_PROJECT: {
        name: 'jira_create_project',
        description: 'Creates a new Jira project',
        inputSchema: {
          key: z.string().describe('Project key (uppercase, max 10 characters)'),
          name: z.string().describe('Project name'),
          projectTypeKey: z.string().describe('Project type: software, service_desk, or business'),
          leadAccountId: z.string().describe('Account ID of the project lead'),
          description: z.string().optional().describe('Project description'),
        },
      },
    },

    // ==================== ISSUE TOOLS ====================
    ISSUE: {
      CREATE_ISSUE: {
        name: 'jira_create_issue',
        description: 'Creates a new Jira issue',
        inputSchema: {
          projectKey: z.string().describe('Project key'),
          summary: z.string().describe('Issue summary/title'),
          issueType: z.string().describe('Issue type (e.g., Bug, Task, Story)'),
          description: z.string().optional().describe('Issue description'),
          priority: z.string().optional().describe('Priority (e.g., Highest, High, Medium, Low, Lowest)'),
          labels: z.array(z.string()).optional().describe('Issue labels'),
          assigneeAccountId: z.string().optional().describe('Assignee account ID'),
        },
      },

      GET_ISSUE: {
        name: 'jira_get_issue',
        description: 'Gets details of a specific Jira issue',
        inputSchema: {
          issueIdOrKey: z.string().describe('Issue ID or key (e.g., PROJ-123)'),
          fields: z.array(z.string()).optional().describe('Specific fields to return'),
          expand: z.array(z.string()).optional().describe('Resources to expand (e.g., changelog, renderedFields)'),
        },
      },

      UPDATE_ISSUE: {
        name: 'jira_update_issue',
        description: 'Updates an existing Jira issue',
        inputSchema: {
          issueIdOrKey: z.string().describe('Issue ID or key'),
          summary: z.string().optional().describe('New summary'),
          description: z.string().optional().describe('New description'),
          priority: z.string().optional().describe('New priority'),
          labels: z.array(z.string()).optional().describe('New labels'),
        },
      },

      DELETE_ISSUE: {
        name: 'jira_delete_issue',
        description: 'Deletes a Jira issue',
        inputSchema: {
          issueIdOrKey: z.string().describe('Issue ID or key'),
          deleteSubtasks: z.boolean().optional().describe('Delete subtasks (default: false)'),
        },
      },

      ASSIGN_ISSUE: {
        name: 'jira_assign_issue',
        description: 'Assigns an issue to a user',
        inputSchema: {
          issueIdOrKey: z.string().describe('Issue ID or key'),
          accountId: z.string().describe('Account ID of the assignee (use "-1" to unassign)'),
        },
      },

      GET_ISSUE_CHANGELOG: {
        name: 'jira_get_issue_changelog',
        description: 'Gets the changelog for an issue',
        inputSchema: {
          issueIdOrKey: z.string().describe('Issue ID or key'),
          startAt: z.number().optional().describe('Starting index for pagination'),
          maxResults: z.number().optional().describe('Maximum results to return'),
        },
      },

      BULK_CREATE_ISSUES: {
        name: 'jira_bulk_create_issues',
        description: 'Creates multiple issues in a single request',
        inputSchema: {
          issues: z.array(z.object({
            projectKey: z.string(),
            summary: z.string(),
            issueType: z.string(),
            description: z.string().optional(),
          })).describe('Array of issues to create'),
        },
      },

      GET_CREATE_METADATA: {
        name: 'jira_get_create_metadata',
        description: 'Gets metadata required for creating issues',
        inputSchema: {
          projectKeys: z.array(z.string()).optional().describe('Project keys to get metadata for'),
          issueTypeNames: z.array(z.string()).optional().describe('Issue type names to get metadata for'),
        },
      },
    },

    // ==================== COMMENT TOOLS ====================
    COMMENT: {
      ADD_COMMENT: {
        name: 'jira_add_comment',
        description: 'Adds a comment to an issue',
        inputSchema: {
          issueIdOrKey: z.string().describe('Issue ID or key'),
          body: z.string().describe('Comment text'),
        },
      },

      GET_COMMENTS: {
        name: 'jira_get_comments',
        description: 'Gets all comments on an issue',
        inputSchema: {
          issueIdOrKey: z.string().describe('Issue ID or key'),
          startAt: z.number().optional().describe('Starting index for pagination'),
          maxResults: z.number().optional().describe('Maximum results to return'),
        },
      },

      UPDATE_COMMENT: {
        name: 'jira_update_comment',
        description: 'Updates an existing comment',
        inputSchema: {
          issueIdOrKey: z.string().describe('Issue ID or key'),
          commentId: z.string().describe('Comment ID'),
          body: z.string().describe('New comment text'),
        },
      },

      DELETE_COMMENT: {
        name: 'jira_delete_comment',
        description: 'Deletes a comment from an issue',
        inputSchema: {
          issueIdOrKey: z.string().describe('Issue ID or key'),
          commentId: z.string().describe('Comment ID'),
        },
      },
    },

    // ==================== SEARCH TOOLS ====================
    SEARCH: {
      SEARCH_ISSUES: {
        name: 'jira_search_issues',
        description: 'Searches for issues using JQL (Jira Query Language)',
        inputSchema: {
          jql: z.string().describe('JQL query string (e.g., "project=PROJ AND status=Open")'),
          startAt: z.number().optional().describe('Starting index for pagination (default: 0)'),
          maxResults: z.number().optional().describe('Maximum results to return (default: 50)'),
          fields: z.array(z.string()).optional().describe('Fields to return'),
        },
      },

      SEARCH_ISSUES_PAGINATED: {
        name: 'jira_search_issues_paginated',
        description: 'Searches for issues with cursor-based pagination',
        inputSchema: {
          jql: z.string().describe('JQL query string'),
          maxResults: z.number().optional().describe('Maximum results per page (default: 50)'),
          nextPageToken: z.string().optional().describe('Token for next page'),
        },
      },
    },

    // ==================== TRANSITION TOOLS ====================
    TRANSITION: {
      GET_TRANSITIONS: {
        name: 'jira_get_transitions',
        description: 'Gets available workflow transitions for an issue',
        inputSchema: {
          issueIdOrKey: z.string().describe('Issue ID or key'),
        },
      },

      TRANSITION_ISSUE: {
        name: 'jira_transition_issue',
        description: 'Transitions an issue to a new status',
        inputSchema: {
          issueIdOrKey: z.string().describe('Issue ID or key'),
          transitionId: z.string().describe('Transition ID to execute'),
          comment: z.string().optional().describe('Optional comment to add'),
          fields: z.record(z.any()).optional().describe('Fields to update during transition'),
        },
      },
    },

    // ==================== USER TOOLS ====================
    USER: {
      SEARCH_USERS: {
        name: 'jira_search_users',
        description: 'Searches for users in Jira',
        inputSchema: {
          query: z.string().describe('Search query (email, display name, or username)'),
          maxResults: z.number().optional().describe('Maximum results to return (default: 50)'),
        },
      },

      GET_CURRENT_USER: {
        name: 'jira_get_current_user',
        description: 'Gets the currently authenticated user',
        inputSchema: {},
      },
    },

    // ==================== SPRINT TOOLS ====================
    SPRINT: {
      GET_SPRINT: {
        name: 'jira_get_sprint',
        description: 'Gets details of a specific sprint',
        inputSchema: {
          sprintId: z.number().describe('Sprint ID'),
        },
      },

      GET_SPRINT_ISSUES: {
        name: 'jira_get_sprint_issues',
        description: 'Gets all issues in a sprint',
        inputSchema: {
          sprintId: z.number().describe('Sprint ID'),
          startAt: z.number().optional().describe('Starting index for pagination'),
          maxResults: z.number().optional().describe('Maximum results to return'),
        },
      },
    },

    // ==================== ATTACHMENT TOOLS ====================
    ATTACHMENT: {
      ADD_ATTACHMENT: {
        name: 'jira_add_attachment',
        description: 'Adds an attachment to an issue',
        inputSchema: {
          issueIdOrKey: z.string().describe('Issue ID or key'),
          filePath: z.string().describe('Path to the file to attach'),
        },
      },

      GET_ATTACHMENTS: {
        name: 'jira_get_attachments',
        description: 'Gets all attachments for an issue',
        inputSchema: {
          issueIdOrKey: z.string().describe('Issue ID or key'),
        },
      },

      DELETE_ATTACHMENT: {
        name: 'jira_delete_attachment',
        description: 'Deletes an attachment',
        inputSchema: {
          attachmentId: z.string().describe('Attachment ID'),
        },
      },
    },

    // ==================== WORKLOG TOOLS ====================
    WORKLOG: {
      ADD_WORKLOG: {
        name: 'jira_add_worklog',
        description: 'Adds a worklog entry to an issue',
        inputSchema: {
          issueIdOrKey: z.string().describe('Issue ID or key'),
          timeSpent: z.string().describe('Time spent (e.g., "3h 30m", "1d 2h")'),
          comment: z.string().optional().describe('Worklog comment'),
          started: z.string().optional().describe('Start time (ISO 8601 format)'),
        },
      },

      GET_WORKLOGS: {
        name: 'jira_get_worklogs',
        description: 'Gets all worklog entries for an issue',
        inputSchema: {
          issueIdOrKey: z.string().describe('Issue ID or key'),
        },
      },

      DELETE_WORKLOG: {
        name: 'jira_delete_worklog',
        description: 'Deletes a worklog entry',
        inputSchema: {
          issueIdOrKey: z.string().describe('Issue ID or key'),
          worklogId: z.string().describe('Worklog ID'),
        },
      },
    },

    // ==================== FILTER TOOLS ====================
    FILTER: {
      GET_FILTERS: {
        name: 'jira_get_filters',
        description: 'Gets saved filters',
        inputSchema: {
          expand: z.string().optional().describe('Resources to expand'),
          maxResults: z.number().optional().describe('Maximum results to return'),
        },
      },

      SEARCH_BY_FILTER: {
        name: 'jira_search_by_filter',
        description: 'Searches for issues using a saved filter',
        inputSchema: {
          filterId: z.string().describe('Filter ID'),
          startAt: z.number().optional().describe('Starting index for pagination'),
          maxResults: z.number().optional().describe('Maximum results to return'),
        },
      },
    },
  },
};

export default TOOL_DEFINITIONS;
