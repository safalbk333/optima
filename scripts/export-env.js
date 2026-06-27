#!/usr/bin/env node

/**
 * export-env.js
 * Recursively finds all .env* files from a root directory,
 * parses their key-value pairs, and saves the result to a JSON file.
 *
 * Usage:
 *   node export-env.js [rootDir] [outputFile]
 *
 * Defaults:
 *   rootDir    = current working directory (process.cwd())
 *   outputFile = env-export.json (saved in cwd)
 */

const fs   = require('fs');
const path = require('path');

// ── Config ────────────────────────────────────────────────────────────────────
const ROOT_DIR   = path.resolve(process.argv[2] || process.cwd());
const OUTPUT_FILE = path.resolve(process.argv[3] || path.join(process.cwd(), 'env-export.json'));

// Folders that are almost never worth scanning
const SKIP_DIRS = new Set(['node_modules', '.git', 'dist', 'build', '.next', 'coverage']);

// ── Helpers ───────────────────────────────────────────────────────────────────

/**
 * Returns true if the filename starts with ".env"
 * e.g. .env  .env.local  .env.production  .env.development.local
 */
function isEnvFile(name) {
  return name === '.env' || name.startsWith('.env.');
}

/**
 * Parse a raw .env file string into an object of key-value pairs.
 * Handles:
 *  - comments (#)
 *  - blank lines
 *  - quoted values  (single or double)
 *  - inline comments after quoted values
 *  - export keyword  (export KEY=value)
 */
function parseEnv(raw) {
  const result = {};

  for (const rawLine of raw.split(/\r?\n/)) {
    const line = rawLine.trim();

    // Skip blank lines and comments
    if (!line || line.startsWith('#')) continue;

    // Strip optional leading `export `
    const stripped = line.replace(/^export\s+/, '');

    // Split on the FIRST `=`
    const eqIdx = stripped.indexOf('=');
    if (eqIdx === -1) continue;

    const key = stripped.slice(0, eqIdx).trim();
    let   val = stripped.slice(eqIdx + 1).trim();

    if (!key) continue;

    // Remove surrounding quotes and handle escaped characters inside them
    if ((val.startsWith('"') && val.endsWith('"')) ||
        (val.startsWith("'") && val.endsWith("'"))) {
      val = val.slice(1, -1).replace(/\\n/g, '\n').replace(/\\r/g, '\r');
    } else {
      // Strip inline comments for unquoted values
      const commentIdx = val.indexOf(' #');
      if (commentIdx !== -1) val = val.slice(0, commentIdx).trim();
    }

    result[key] = val;
  }

  return result;
}

/**
 * Walk a directory tree recursively, collecting .env* files.
 * Returns an array of absolute file paths.
 */
function findEnvFiles(dir) {
  const found = [];

  let entries;
  try {
    entries = fs.readdirSync(dir, { withFileTypes: true });
  } catch {
    // Permission errors etc. — skip silently
    return found;
  }

  for (const entry of entries) {
    if (entry.isDirectory()) {
      if (!SKIP_DIRS.has(entry.name)) {
        found.push(...findEnvFiles(path.join(dir, entry.name)));
      }
    } else if (entry.isFile() && isEnvFile(entry.name)) {
      found.push(path.join(dir, entry.name));
    }
  }

  return found;
}

// ── Main ──────────────────────────────────────────────────────────────────────

console.log(`\n🔍  Scanning: ${ROOT_DIR}\n`);

const envFiles = findEnvFiles(ROOT_DIR);

if (envFiles.length === 0) {
  console.warn('⚠️  No .env* files found.');
  process.exit(0);
}

const exportData = envFiles.map(filePath => {
  const raw     = fs.readFileSync(filePath, 'utf8');
  const pairs   = parseEnv(raw);
  const keyCount = Object.keys(pairs).length;

  console.log(`  ✅  ${path.relative(ROOT_DIR, filePath)}  (${keyCount} key${keyCount !== 1 ? 's' : ''})`);

  return {
    location: path.relative(ROOT_DIR, filePath), // relative to scanned root
    keys: pairs,
  };
});

fs.writeFileSync(OUTPUT_FILE, JSON.stringify(exportData, null, 2), 'utf8');

console.log(`\n✨  Exported ${exportData.length} file(s) → ${OUTPUT_FILE}\n`);