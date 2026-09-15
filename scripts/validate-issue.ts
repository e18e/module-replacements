import {writeFile} from 'node:fs/promises';

const DOWNLOADS_THRESHOLD = 10_000;
const TITLE_PATTERN = /^\[Replacement\]:\s*`?([^`\s]+)`?\s*$/;
const FAILURE_FILE = 'issue-validation-failure.md';
const BODY_FILE = 'issue-body.md';
const NPMX_LINK_PATTERN = /^\*\*npmx:\*\* \S+\s+/;

async function fetchWeeklyDownloads(moduleName: string): Promise<number> {
  const url = `https://api.npmjs.org/downloads/point/last-week/${encodeURIComponent(moduleName)}`;
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(
      `Failed to fetch downloads for ${moduleName}: ${response.statusText}`
    );
  }
  const data = (await response.json()) as {downloads: number};
  return data.downloads;
}

async function writeFailure(message: string): Promise<void> {
  console.error(message);
  await writeFile(FAILURE_FILE, message, 'utf8');
}

async function writeNpmxLink(moduleName: string): Promise<void> {
  const body = process.env.ISSUE_BODY ?? '';
  const link = `**npmx:** https://npmx.dev/package/${moduleName}`;
  const updated = `${link}\n\n${body.replace(NPMX_LINK_PATTERN, '')}`;
  if (updated !== body) {
    await writeFile(BODY_FILE, updated, 'utf8');
  }
}

async function main() {
  const title = process.env.ISSUE_TITLE;

  if (!title) {
    throw new Error('ISSUE_TITLE environment variable is not set');
  }

  const match = TITLE_PATTERN.exec(title.trim());

  if (!match) {
    console.log(`Title does not match the replacement format, skipping.`);
    return;
  }

  const moduleName = match[1];

  console.log(`Checking downloads for ${moduleName}...`);

  let downloads: number;

  try {
    downloads = await fetchWeeklyDownloads(moduleName);
  } catch {
    await writeFailure(
      `Could not find \`${moduleName}\` on npm, so we were unable to validate it.\n\n` +
        `Please check the package name in the issue title is correct.`
    );
    process.exit(1);
  }

  await writeNpmxLink(moduleName);

  console.log(
    `  ${moduleName}: ${downloads.toLocaleString()} weekly downloads`
  );

  if (downloads < DOWNLOADS_THRESHOLD) {
    await writeFailure(
      `\`${moduleName}\` has ${downloads.toLocaleString()} weekly downloads, ` +
        `which is below our threshold of ${DOWNLOADS_THRESHOLD.toLocaleString()}.\n\n` +
        `We only add replacements for packages with enough usage to be worth ` +
        `recommending against, so this suggestion is unlikely to be accepted.`
    );
    process.exit(1);
  }

  console.log('\nAll checks passed.');
}

main().catch((error) => {
  console.error('Error:', error);
  process.exit(1);
});
