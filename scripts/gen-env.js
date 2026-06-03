const fs = require('fs');
const path = require('path');

// Define all env files with their paths and content
const envFiles = {
  // Root level env files
  '.env': {
    development: `DATABASE_URL="postgresql://postgres.wcrcsawahvulpvmkltnh:*f.%23w_VAE67GYfa@aws-1-ap-southeast-1.pooler.supabase.com:5432/postgres?pgbouncer=true"
POSTGRES_USER=postgres
POSTGRES_PASSWORD=postgres
POSTGRES_DB=optima_app
KC_DB_USERNAME=keycloak
KC_DB_PASSWORD=keycloakpassword
KC_DB_URL_DATABASE=optima_keycloak_db
KEYCLOAK_ADMIN=admin
KEYCLOAK_ADMIN_PASSWORD=admin`,
    production: `DATABASE_URL="postgresql://postgres.wcrcsawahvulpvmkltnh:*f.%23w_VAE67GYfa@aws-1-ap-southeast-1.pooler.supabase.com:5432/postgres?pgbouncer=true"
POSTGRES_USER=postgres
POSTGRES_PASSWORD=postgres
POSTGRES_DB=optima_app
KC_DB_USERNAME=keycloak
KC_DB_PASSWORD=keycloakpassword
KC_DB_URL_DATABASE=optima_keycloak_db
KEYCLOAK_ADMIN=admin
KEYCLOAK_ADMIN_PASSWORD=admin`,
  },

  // API Gateway
  'apps/api-gateway/.env.development': `APP_NAME=OPTIMA App API
APP_DESCRIPTION=API Gateway Documentation
APP_VERSION=1.0

PORT=3000
HOST=localhost

VENDOR_SERVICE_PORT=3001
VENDOR_SERVICE_HOST=localhost

AUTH_SERVICE_PORT=3002
AUTH_SERVICE_HOST=localhost

CONTRACTS_SERVICE_PORT=3003
CONTRACTS_SERVICE_HOST=localhost

KEYCLOAK_URL=http://localhost:8080
REALMNAME=optima
FRONTEND_REDIRECT_URL=http://localhost:5173/callback

BYPASS_SSL=true
ALLOWED_ORIGINS=http://localhost:5173,http://localhost:3002,http://localhost:3000
ALLOWED_CLIENTS=optima-backend,auth-client,middleware-service,user-login-client,react-web-client
DEV_MODE=false

AUTH_CLIENT_ID=auth-client
AUTH_CLIENT_SECRET=2QlUAeG6CitpyMZnAtKtWx3hblGW6eUC
AUDIENCE=middleware-service

HRMS_CLIENT=react-web-client
HRMS_CLIENT_SECRET=gz1E6czaXtt24xrHniiSEiRXQbptEVYo`,

  'apps/api-gateway/.env.production': `APP_NAME=OPTIMA App API
APP_DESCRIPTION=API Gateway Documentation
APP_VERSION=1.0

PORT=3000
HOST=0.0.0.0

VENDOR_SERVICE_PORT=3001
VENDOR_SERVICE_HOST=vendor-service

AUTH_SERVICE_PORT=3002
AUTH_SERVICE_HOST=auth-service

CONTRACTS_SERVICE_PORT=3003
CONTRACTS_SERVICE_HOST=contracts-service

KEYCLOAK_URL=http://keycloak:8080
REALMNAME=optima
FRONTEND_REDIRECT_URL=http://localhost:5173/callback

BYPASS_SSL=true
ALLOWED_ORIGINS=http://localhost:5173,http://localhost:3002,http://localhost:3000
ALLOWED_CLIENTS=optima-backend,auth-client,middleware-service,user-login-client,react-web-client
DEV_MODE=false

AUTH_CLIENT_ID=auth-client
AUTH_CLIENT_SECRET=2QlUAeG6CitpyMZnAtKtWx3hblGW6eUC
AUDIENCE=middleware-service

HRMS_CLIENT=react-web-client
HRMS_CLIENT_SECRET=gz1E6czaXtt24xrHniiSEiRXQbptEVYo`,

  // Auth Service
  'apps/auth-service/.env.development': `PORT=3002
HOST=localhost

KEYCLOAK_URL=http://localhost:8080
REALMNAME=optima
FRONTEND_REDIRECT_URL=http://localhost:5173/callback

BYPASS_SSL=true
ALLOWED_ORIGINS=http://localhost:5173,http://localhost:3002,http://localhost:3000
ALLOWED_CLIENTS=optima-backend,auth-client,middleware-service,user-login-client,react-web-client
DEV_MODE=true

AUTH_CLIENT_ID=auth-client
AUTH_CLIENT_SECRET=2QlUAeG6CitpyMZnAtKtWx3hblGW6eUC
AUDIENCE=middleware-service

HRMS_CLIENT=react-web-client
HRMS_CLIENT_SECRET=gz1E6czaXtt24xrHniiSEiRXQbptEVYo`,

  'apps/auth-service/.env.production': `PORT=3002
HOST=0.0.0.0

KEYCLOAK_URL=http://keycloak:8080
REALMNAME=optima
FRONTEND_REDIRECT_URL=http://0.0.0.0:5173/callback

BYPASS_SSL=true
ALLOWED_ORIGINS=http://localhost:5173,http://localhost:3002,http://localhost:3000
ALLOWED_CLIENTS=optima-backend,auth-client,middleware-service,user-login-client,react-web-client
DEV_MODE=false

AUTH_CLIENT_ID=auth-client
AUTH_CLIENT_SECRET=2QlUAeG6CitpyMZnAtKtWx3hblGW6eUC
AUDIENCE=middleware-service

HRMS_CLIENT=react-web-client
HRMS_CLIENT_SECRET=gz1E6czaXtt24xrHniiSEiRXQbptEVYo`,

  // Vendor Service
  'apps/vendor-service/.env.development': `PORT=3001
HOST=localhost`,

  'apps/vendor-service/.env.production': `PORT=3001
HOST=0.0.0.0`,

  // Contracts Service
  'apps/contracts-service/.env.development': `PORT=3003
HOST=localhost`,

  'apps/contracts-service/.env.production': `PORT=3003
HOST=0.0.0.0`,

  // Shipment Service
  'apps/shipment-service/.env.development': `PORT=3004
HOST=localhost`,

  'apps/shipment-service/.env.production': `PORT=3004
HOST=0.0.0.0`,

  // Master Service
  'apps/master-service/.env.development': `PORT=3005
HOST=localhost`,

  'apps/master-service/.env.production': `PORT=3005
HOST=0.0.0.0`,

  // Request Service
  'apps/request-service/.env.development': `PORT=3006
HOST=localhost`,

  'apps/request-service/.env.production': `PORT=3006
HOST=0.0.0.0`,

  // User Service
  'apps/user-service/.env.development': `PORT=3007
HOST=localhost`,

  'apps/user-service/.env.production': `PORT=3007
HOST=localhost`,
};

/**
* Create all .env files in their respective directories
* @param {string} environment - 'development' or 'production'
*/
function createEnvFiles(environment) {
  if (!environment || (environment !== 'development' && environment !== 'production')) {
    console.error('❌ Invalid environment. Please specify "development" or "production"');
    console.log('Usage: node scripts/create-env-files.js [development|production]');
    process.exit(1);
  }

  const projectRoot = path.join(__dirname, '..');
  let createdCount = 0;
  let errorCount = 0;

  console.log(`\n📦 Creating ${environment} environment files...\n`);

  Object.entries(envFiles).forEach(([filePath, content]) => {
    // Handle root .env file
    let envContent = content;
    let fullPath = filePath;

    if (filePath === '.env') {
      envContent = content[environment];
      fullPath = path.join(projectRoot, '.env');
    } else {
      // For service .env files, the key already includes the environment
      fullPath = path.join(projectRoot, filePath);
    }

    try {
      // Create directory if it doesn't exist
      const dir = path.dirname(fullPath);
      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
      }

      // Write the env file
      fs.writeFileSync(fullPath, envContent, 'utf8');
      console.log(`✅ Created: ${filePath}`);
      createdCount++;
    } catch (error) {
      console.error(`❌ Error creating ${filePath}:`, error.message);
      errorCount++;
    }
  });

  console.log(`\n${'─'.repeat(50)}`);
  console.log(`✅ Successfully created: ${createdCount} file(s)`);
  if (errorCount > 0) {
    console.log(`❌ Failed to create: ${errorCount} file(s)`);
    process.exit(1);
  }
  console.log(`${'─'.repeat(50)}\n`);
}

// Get environment from command line argument
const environment = process.argv[2];
createEnvFiles(environment);

 