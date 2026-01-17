/**
 * Repository Tools
 * MCP tool registrations for repository operations
 */

import { z } from 'zod';
import { SCHEMAS } from '../../constants/index.js';
import githubServices from '../../services/github/index.js';
import { formatSuccess, formatError } from '../../utils/index.js';

/**
 * Register all repository tools
 * @param {McpServer} server - MCP server instance
 */
function registerRepositoryTools(server) {
  // Get my repositories
  server.registerTool(
    'get_my_repositories',
    {
      description: 'Fetches all repositories for the authenticated user',
      inputSchema: {},
    },
    async () => {
      try {
        const data = await githubServices.getMyRepos();
        return formatSuccess(data);
      } catch (error) {
        return formatError(error);
      }
    }
  );

  // Get repository details
  server.registerTool(
    'get_repo_details',
    {
      description: 'Gets details of a specific repository',
      inputSchema: SCHEMAS.REPOSITORY.GET_REPO,
    },
    async ({ owner, repo }) => {
      try {
        const data = await githubServices.getRepo(owner, repo);
        return formatSuccess(data);
      } catch (error) {
        return formatError(error);
      }
    }
  );

  // List repository forks
  server.registerTool(
    'list_repo_forks',
    {
      description: 'Lists all forks of a repository',
      inputSchema: SCHEMAS.REPOSITORY.GET_REPO,
    },
    async ({ owner, repo }) => {
      try {
        const data = await githubServices.listForks(owner, repo);
        return formatSuccess(data);
      } catch (error) {
        return formatError(error);
      }
    }
  );

  // Get repository topics
  server.registerTool(
    'get_repo_topics',
    {
      description: 'Gets repository topics/tags',
      inputSchema: SCHEMAS.REPOSITORY.GET_REPO,
    },
    async ({ owner, repo }) => {
      try {
        const data = await githubServices.getRepoTopics(owner, repo);
        return formatSuccess(data);
      } catch (error) {
        return formatError(error);
      }
    }
  );

  // Create repository
  server.registerTool(
    'create_repo',
    {
      description: 'Creates a new repository for the authenticated user',
      inputSchema: SCHEMAS.REPOSITORY.CREATE_REPO,
    },
    async ({ name, description, isPrivate, autoInit }) => {
      try {
        const data = await githubServices.createRepo(name, description, isPrivate, autoInit);
        return formatSuccess(data);
      } catch (error) {
        return formatError(error);
      }
    }
  );

  // List repository advisories
  server.registerTool(
    'list_repository_advisories',
    {
      description: 'Lists security advisories for a repository',
      inputSchema: SCHEMAS.REPOSITORY.GET_REPO,
    },
    async ({ owner, repo }) => {
      try {
        const data = await githubServices.listRepositoryAdvisories(owner, repo);
        return formatSuccess(data);
      } catch (error) {
        return formatError(error);
      }
    }
  );

  // Get repository advisory
  server.registerTool(
    'get_repository_advisory',
    {
      description: 'Gets a specific security advisory',
      inputSchema: {
        owner: SCHEMAS.REPOSITORY.GET_REPO.owner,
        repo: SCHEMAS.REPOSITORY.GET_REPO.repo,
        ghsaId: z.string().describe('GHSA ID of the advisory'),
      },
    },
    async ({ owner, repo, ghsaId }) => {
      try {
        const data = await githubServices.getRepositoryAdvisory(owner, repo, ghsaId);
        return formatSuccess(data);
      } catch (error) {
        return formatError(error);
      }
    }
  );

  // List tags
  server.registerTool(
    'list_tags',
    {
      description: 'Lists all tags in a repository',
      inputSchema: SCHEMAS.REPOSITORY.GET_REPO,
    },
    async ({ owner, repo }) => {
      try {
        const data = await githubServices.listTags(owner, repo);
        return formatSuccess(data);
      } catch (error) {
        return formatError(error);
      }
    }
  );
}

export { registerRepositoryTools };
