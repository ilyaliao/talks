import { ofetch } from 'ofetch'
import fs from 'node:fs/promises'
import { resolve } from 'node:path'
import { cac } from 'cac'
import consola from 'consola'
import { intro, outro, text, select, isCancel } from '@clack/prompts'
import ansis from 'ansis'

interface CommitInfo {
  date: string
  message: string
  sha?: string
  author?: string
}

interface PRInfo {
  date: string
  message: string
  number?: number
  author?: string
  state?: string
}

/**
 * Fetch commits by a specific user in a GitHub repository
 */
async function fetchUserCommits(owner: string, repo: string, username: string): Promise<CommitInfo[]> {
  const commits: CommitInfo[] = []
  let page = 1
  let hasMore = true
  
  while (hasMore) {
    try {
      const response = await ofetch(`https://api.github.com/repos/${owner}/${repo}/commits`, {
        query: { 
          per_page: 100, 
          page,
          author: username // Filter commits by username
        },
        headers: {
          'Accept': 'application/vnd.github.v3+json',
          'User-Agent': 'GitHub-Data-Fetcher'
        }
      })
      
      if (response.length === 0) {
        hasMore = false
      } else {
        for (const commit of response) {
          commits.push({
            date: commit.commit.author.date,
            message: commit.commit.message,
            sha: commit.sha,
            author: commit.commit.author.name
          })
        }
        page++
      }
    } catch (error) {
      consola.error('Error fetching commits:', error)
      hasMore = false
    }
  }
  
  return commits
}

/**
 * Fetch pull requests by a specific user in a GitHub repository
 */
async function fetchUserPullRequests(owner: string, repo: string, username: string): Promise<PRInfo[]> {
  const prs: PRInfo[] = []
  let page = 1
  let hasMore = true
  
  while (hasMore) {
    try {
      // First fetch all PRs, then filter by user on the client side
      const response = await ofetch(`https://api.github.com/repos/${owner}/${repo}/pulls`, {
        query: { 
          per_page: 100, 
          page,
          state: 'all'
        },
        headers: {
          'Accept': 'application/vnd.github.v3+json',
          'User-Agent': 'GitHub-Data-Fetcher'
        }
      })
      
      if (response.length === 0) {
        hasMore = false
      } else {
        // Filter PRs by the specific user
        const userPrs = response.filter(pr => pr.user.login === username)
        
        for (const pr of userPrs) {
          prs.push({
            date: pr.created_at,
            message: pr.title,
            number: pr.number,
            author: pr.user.login,
            state: pr.state
          })
        }
        
        page++
      }
    } catch (error) {
      consola.error('Error fetching pull requests:', error)
      hasMore = false
    }
  }
  
  return prs
}

async function writeToJsonFile(data: any, filename: string) {
  console.log('data', data)
  try {
    const filePath = resolve(process.cwd(), `${filename}.json`)
    await fs.writeFile(filePath, JSON.stringify(data, null, 2), 'utf-8')
    consola.success(`Data successfully saved to ${filePath}`)
  } catch (error) {
    consola.error('Error writing JSON file:', error)
  }
}

async function runInteractiveCLI() {
  intro(ansis.bgBlueBright(' GitHub Data Fetcher '))

  const owner = await text({
    message: 'Repository owner',
    placeholder: 'vueuse',
    validate: (value) => value.length === 0 ? 'Repository owner is required' : undefined
  })

  if (isCancel(owner)) {
    outro('Operation cancelled')
    return
  }

  const repo = await text({
    message: 'Repository name',
    initialValue: owner,
    validate: (value) => value.length === 0 ? 'Repository name is required' : undefined
  })

  if (isCancel(repo)) {
    outro('Operation cancelled')
    return
  }

  const username = await text({
    message: 'GitHub username',
    initialValue: 'ilyaliao',
    validate: (value) => value.length === 0 ? 'GitHub username is required' : undefined
  })

  if (isCancel(username)) {
    outro('Operation cancelled')
    return
  }

  const dataType = await select({
    message: 'What data would you like to fetch?',
    options: [
      { value: 'commits', label: 'Commits' },
      { value: 'prs', label: 'Pull Requests' }
    ]
  })

  if (isCancel(dataType)) {
    outro('Operation cancelled')
    return
  }

  const defaultFilename = `${username}-${repo}-${dataType === 'commits' ? 'commits' : 'pull-requests'}`
  
  const filename = await text({
    message: 'Output filename',
    placeholder: defaultFilename,
    initialValue: defaultFilename,
    validate: (value) => value.length === 0 ? 'Filename is required' : undefined
  })

  if (isCancel(filename)) {
    outro('Operation cancelled')
    return
  }

  consola.info(`Fetching ${dataType} by ${ansis.blueBright(username)} in ${ansis.blueBright(`${owner}/${repo}`)}...`)
  
  if (dataType === 'commits') {
    const commits = await fetchUserCommits(owner, repo, username)
    consola.info(`Found ${ansis.green(commits.length.toString())} commits`)
    await writeToJsonFile(commits, filename)
  } else {
    const prs = await fetchUserPullRequests(owner, repo, username)
    consola.info(`Found ${ansis.green(prs.length.toString())} pull requests`)
    await writeToJsonFile(prs, filename)
  }

  outro(`${ansis.green('Done!')} Data saved to ${ansis.blueBright(filename)}`)
}

const cli = cac('github-fetcher')

cli
  .command('interactive', 'Run in interactive mode with step-by-step prompts')
  .alias('i')
  .action(runInteractiveCLI)

cli.help()

if (process.argv.length <= 2) {
  runInteractiveCLI()
} else {
  cli.parse()
} 
