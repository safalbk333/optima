const fs = require('fs');
const path = require('path');

const env = process.argv[2];

if (!env) {
  console.log('Please provide environment');
  console.log('Example: node scripts/env.js development');
  process.exit(1);
}

const source = path.join(__dirname, `../.env.${env}`);
const target = path.join(__dirname, '../.env');

if (!fs.existsSync(source)) {
  console.log(`Environment file not found: .env.${env}`);
  process.exit(1);
}

fs.copyFileSync(source, target);

console.log(`Loaded .env.${env} → .env`);