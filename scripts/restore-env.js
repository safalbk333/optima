#!/usr/bin/env node

/**
 * restore-env.js
 * Reads an env-export.json (produced by export-env.js) and recreates
 * every .env* file at its original absolute location with the same key-value pairs.
 *
 * Usage:
 *   node restore-env.js [inputFile] [options]
 *
 * Options:
 *   --dry-run          Print what would be written without touching the filesystem
 *   --overwrite        Overwrite files that already exist (default: skip existing)
 *   --root <dir>       Override the base directory when using relative paths
 *                      (only needed if you moved the project between export and restore)
 *
 * Examples:
 *   node restore-env.js                           # uses ./env-export.json
 *   node restore-env.js /backups/env-export.json
 *   node restore-env.js env-export.json --dry-run
 *   node restore-env.js env-export.json --overwrite
 *   node restore-env.js env-export.json --root /new/project/root
 */

const fs   = require('fs');
const path = require('path');

// ── Arg parsing ───────────────────────────────────────────────────────────────
const args = process.argv.slice(2);

const DRY_RUN   = args.includes('--dry-run');
const OVERWRITE = args.includes('--overwrite');

const rootIdx = args.indexOf('--root');
// Default root = cwd (same directory you ran export-env.js from)
const ROOT_DIR = rootIdx !== -1 ? path.resolve(args[rootIdx + 1]) : process.cwd();

// First positional arg that isn't a flag or flag-value
const INPUT_FILE = path.resolve(
  args.find((a, i) => !a.startsWith('--') && args[i - 1] !== '--root') ||
  'env-export.json'
);

// ── Helpers ───────────────────────────────────────────────────────────────────

/**
 * Serialize a key-value object back to .env file format.
 * Values containing spaces, #, or special chars are double-quoted.
 * Newlines inside values are escaped.
 */
function serializeEnv(pairs) {
  return Object.entries(pairs)
    .map(([key, value]) => {
      // Escape embedded newlines
      const escaped = value.replace(/\n/g, '\\n').replace(/\r/g, '\\r');

      // Quote if value contains whitespace, #, $, quotes, or is empty
      const needsQuotes = /[\s#$"'`]/.test(escaped) || escaped === '';
      const serialized  = needsQuotes ? `"${escaped.replace(/"/g, '\\"')}"` : escaped;

      return `${key}=${serialized}`;
    })
    .join('\n') + '\n';
}

/**
 * Resolve the final file path by joining the root dir with the relative location.
 */
function resolvePath(entry) {
  return path.join(ROOT_DIR, entry.location);
}

// ── Main ──────────────────────────────────────────────────────────────────────

if (!fs.existsSync(INPUT_FILE)) {
  console.error(`❌  Input file not found: ${INPUT_FILE}`);
  console.error('    Run export-env.js first, or pass the correct path as an argument.');
  process.exit(1);
}

let entries;
try {
  entries = JSON.parse(fs.readFileSync(INPUT_FILE, 'utf8'));
} catch (err) {
  console.error(`❌  Failed to parse JSON: ${err.message}`);
  process.exit(1);
}

if (!Array.isArray(entries) || entries.length === 0) {
  console.warn('⚠️  No entries found in the export file.');
  process.exit(0);
}

if (DRY_RUN)   console.log('\n🔍  DRY RUN — no files will be written.\n');
if (OVERWRITE) console.log('\n⚠️   --overwrite enabled: existing files WILL be replaced.\n');

let created = 0, skipped = 0, errors = 0;

for (const entry of entries) {
  const targetPath = resolvePath(entry);
  const label      = entry.location;  // relative path from JSON
  const keyCount   = Object.keys(entry.keys || {}).length;

  // Skip existing unless --overwrite
  if (!OVERWRITE && fs.existsSync(targetPath)) {
    console.log(`  ⏭️   SKIP (already exists)  ${label}`);
    skipped++;
    continue;
  }

  const content = serializeEnv(entry.keys || {});

  if (DRY_RUN) {
    console.log(`  📝  WOULD WRITE  ${label}  (${keyCount} key${keyCount !== 1 ? 's' : ''})`);
    console.log(content.split('\n').map(l => `        ${l}`).join('\n'));
    created++;
    continue;
  }

  try {
    fs.mkdirSync(path.dirname(targetPath), { recursive: true });
    fs.writeFileSync(targetPath, content, 'utf8');
    console.log(`  ✅  CREATED  ${label}  (${keyCount} key${keyCount !== 1 ? 's' : ''})`);
    created++;
  } catch (err) {
    console.error(`  ❌  ERROR  ${label}: ${err.message}`);
    errors++;
  }
}

// ── Summary ───────────────────────────────────────────────────────────────────
console.log('\n─────────────────────────────────────────');
if (DRY_RUN) {
  console.log(`✨  Dry run complete. Would create ${created} file(s).`);
} else {
  console.log(`✨  Done.  Created: ${created}  |  Skipped: ${skipped}  |  Errors: ${errors}`);
}
console.log('');