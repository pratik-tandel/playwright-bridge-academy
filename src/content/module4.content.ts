import type { IModule } from '../types';

export const module4: IModule = {
  id: 'module-4',
  number: 4,
  title: 'Automation Framework',
  subtitle: 'Production-ready test architecture',
  description: 'Design a scalable, maintainable automation framework. Learn Page Object Model at scale, utility patterns, CI/CD integration, and professional-grade reporting.',
  icon: '🏛️',
  color: 'teal',
  certificateId: 'certified',
  lessons: [
    {
      id: 'm4-l1',
      moduleId: 'module-4',
      number: 1,
      title: 'Framework Architecture',
      subtitle: 'Designing a scalable test framework',
      durationMinutes: 15,
      content: {
        manualScenario: `**Scenario:** Your test suite has grown to 200 tests across 15 features. Without architecture, it becomes impossible to maintain.`,
        whyJavaScript: `A well-architected framework uses JavaScript modules, classes, and imports to create a maintainable structure.`,
        theory: `## Framework Architecture — Scalable Structure

\`\`\`
automation-framework/
├── playwright.config.ts
├── tests/
│   ├── smoke/              ← Quick sanity tests
│   ├── regression/         ← Full regression tests
│   └── api/                ← API contract tests
├── pages/                  ← Page Object Models
│   ├── base/
│   │   └── BasePage.ts     ← Shared page functionality
│   ├── LoginPage.ts
│   ├── DashboardPage.ts
│   └── CheckoutPage.ts
├── fixtures/
│   ├── auth.fixtures.ts    ← Authentication setup
│   ├── data.fixtures.ts    ← Test data setup
│   └── index.ts            ← Combined fixtures export
├── helpers/
│   ├── api.helper.ts       ← API utility functions
│   ├── date.helper.ts      ← Date formatting helpers
│   └── string.helper.ts    ← String utilities
├── data/
│   ├── users.json          ← Static user test data
│   ├── products.json       ← Product test data
│   └── config/
│       ├── dev.env         ← Development environment
│       └── staging.env     ← Staging environment
└── reports/                ← Generated test reports
\`\`\`

### BasePage Pattern

\`\`\`typescript
// pages/base/BasePage.ts
import { type Page } from '@playwright/test';

export class BasePage {
  constructor(protected page: Page) {}

  async waitForPageLoad() {
    await this.page.waitForLoadState('networkidle');
  }

  async takeScreenshot(name: string) {
    await this.page.screenshot({ path: \`screenshots/\${name}.png\` });
  }

  async scrollToElement(selector: string) {
    await this.page.locator(selector).scrollIntoViewIfNeeded();
  }
}

// All page objects extend BasePage
export class LoginPage extends BasePage {
  async login(email: string, password: string) {
    await this.page.fill('#email', email);
    await this.page.fill('#password', password);
    await this.page.click('[type=submit]');
    await this.waitForPageLoad(); // inherited method
  }
}
\`\`\``,
        jsCode: `// Framework layers
const frameworkLayers = {
  config: 'playwright.config.ts — environment settings',
  pages: 'Page Objects — page-specific selectors + actions',
  fixtures: 'Test fixtures — reusable setup/teardown',
  helpers: 'Utility functions — date, string, API helpers',
  data: 'Test data files — users, products, configs',
  tests: 'Test files — organized by feature and type',
};

Object.entries(frameworkLayers).forEach(([layer, purpose]) => {
  console.log(layer + ': ' + purpose);
});`,
        playwrightCode: `// BasePage.ts
import { type Page } from '@playwright/test';

export class BasePage {
  constructor(protected page: Page) {}

  protected async waitForLoader() {
    const loader = this.page.locator('.loading-indicator');
    if (await loader.isVisible()) {
      await loader.waitFor({ state: 'hidden' });
    }
  }
}

// LoginPage.ts
import { BasePage } from './base/BasePage';

export class LoginPage extends BasePage {
  async login(email: string, password: string) {
    await this.page.fill('#email', email);
    await this.page.fill('#password', password);
    await this.page.click('[type=submit]');
    await this.waitForLoader(); // from BasePage
  }
}`,
        bridgeExplanation: 'A framework architecture is like a well-organized filing system — every file has its place, everything is findable.',
        bridgeSteps: [
          { step: 1, label: 'Problem', description: '200 tests in one folder — chaos', code: '// All in one file:\n// 5000 lines, impossible to navigate', color: 'red' },
          { step: 2, label: 'Architecture', description: 'Separate layers with clear responsibilities', code: '// tests/ pages/ fixtures/ helpers/ data/', color: 'yellow' },
          { step: 3, label: 'Result', description: 'Scalable, maintainable framework', code: "import { LoginPage } from '../pages/LoginPage';\nimport { testUsers } from '../data/users';", color: 'green' },
        ],
      },
      playground: {
        defaultCode: `// Design your framework structure

const frameworkDecisions = {
  // Where does login logic go?
  loginLogic: 'pages/LoginPage.ts',
  // Where do test users go?
  testUsers: 'data/users.json or fixtures/data.fixtures.ts',
  // Where does the "take screenshot on failure" logic go?
  screenshotHelper: 'helpers/screenshot.helper.ts or BasePage.ts',
  // Where does the baseURL go?
  baseUrl: 'playwright.config.ts use.baseURL',
  // Where do E2E tests go?
  e2eTests: 'tests/e2e/ or tests/regression/',
};

console.log('Framework layer decisions:');
Object.entries(frameworkDecisions).forEach(([decision, answer]) => {
  console.log(\`  \${decision}: \${answer}\`);
});`,
        language: 'typescript',
        hints: ['BasePage provides shared functionality to all page objects', 'Config should handle environment differences (dev/staging)', 'Helpers are pure functions with no page dependency'],
        patterns: [
          { regex: 'BasePage|extends\\s+Base', outputLines: ['✓ BasePage inheritance pattern'] },
          { regex: 'class\\s+\\w+Page', outputLines: ['✓ Page Object class defined'] },
        ],
        successMessage: '✓ You understand framework architecture!',
      },
      quiz: [
        { id: 'm4-l1-q1', type: 'multiple-choice', question: 'What is the purpose of a BasePage class?', options: ['Run all tests', 'Provide shared functionality (like waitForLoader) that all page objects inherit', 'Store test data', 'Configure browsers'], correctIndex: 1, explanation: 'BasePage centralizes common functionality. All page objects extend it and inherit shared methods.', points: 10 },
        { id: 'm4-l1-q2', type: 'multiple-choice', question: 'Where should test user data be stored in a framework?', options: ['Directly in each test file', 'In data/ or fixtures/ directory, separate from test logic', 'In playwright.config.ts', 'In page objects'], correctIndex: 1, explanation: 'Separating test data from test logic makes maintenance easier — change users in one file.', points: 10 },
        { id: 'm4-l1-q3', type: 'multiple-choice', question: 'What is the difference between helpers/ and pages/ in a framework?', options: ['No difference', 'helpers/ contains pure utility functions; pages/ contains page-specific actions and selectors', 'helpers/ is for backend, pages/ for frontend', 'pages/ runs first'], correctIndex: 1, explanation: 'Helpers are pure utility functions (format date, parse text). Pages are UI-bound (require a Playwright page).', points: 10 },
        { id: 'm4-l1-q4', type: 'multiple-choice', question: 'What should live in playwright.config.ts?', options: ['Test logic and assertions', 'Environment configuration — baseURL, browsers, timeouts, retries', 'Page object selectors', 'Test data'], correctIndex: 1, explanation: 'playwright.config.ts is the configuration layer — environment-specific settings that change between runs.', points: 10 },
        { id: 'm4-l1-q5', type: 'multiple-choice', question: 'When a test project grows from 10 to 200 tests, what architecture benefit matters most?', options: ['Faster test execution', 'Clear organization — everyone knows where to find and add code', 'Smaller bundle size', 'Fewer browser windows'], correctIndex: 1, explanation: 'At scale, discoverability and organization matter most. A clear architecture means new team members can contribute without breaking things.', points: 10 },
      ],
    },
    {
      id: 'm4-l2',
      moduleId: 'module-4',
      number: 2,
      title: 'Environment Configuration',
      subtitle: 'Managing dev, staging, and production environments',
      durationMinutes: 12,
      content: {
        manualScenario: `**Scenario:** You need to run tests against DEV (http://localhost:3000), STAGING (https://staging.myapp.com), and PRE-PROD (https://preprod.myapp.com) with different credentials for each.`,
        whyJavaScript: `Environment variables and TypeScript config objects manage different environments without changing test code.`,
        theory: `## Environment Configuration

### .env Files

\`\`\`bash
# .env.staging
BASE_URL=https://staging.myapp.com
API_URL=https://api.staging.myapp.com
ADMIN_EMAIL=admin@staging.myapp.com
ADMIN_PASSWORD=StagingPass@123
\`\`\`

### Reading Environment Variables

\`\`\`typescript
// playwright.config.ts
export default defineConfig({
  use: {
    baseURL: process.env.BASE_URL || 'http://localhost:3000',
  },
});
\`\`\`

### Environment Config Object

\`\`\`typescript
// config/environments.ts
type Environment = 'dev' | 'staging' | 'production';

const environments: Record<Environment, IEnvConfig> = {
  dev: {
    baseUrl: 'http://localhost:3000',
    apiUrl: 'http://localhost:8080',
    adminEmail: 'admin@local.com',
  },
  staging: {
    baseUrl: 'https://staging.myapp.com',
    apiUrl: 'https://api.staging.myapp.com',
    adminEmail: 'admin@staging.myapp.com',
  },
  production: {
    baseUrl: 'https://myapp.com',
    apiUrl: 'https://api.myapp.com',
    adminEmail: 'admin@myapp.com',
  },
};

export const env = environments[process.env.ENV as Environment ?? 'dev'];
\`\`\``,
        jsCode: `// Environment configuration pattern

const ENV = process.env.ENV || 'dev';

const environments = {
  dev:     { baseUrl: 'http://localhost:3000', name: 'Development' },
  staging: { baseUrl: 'https://staging.app.com', name: 'Staging' },
  prod:    { baseUrl: 'https://app.com', name: 'Production' },
};

const config = environments[ENV] || environments.dev;

console.log('Running tests on:', config.name);
console.log('Base URL:', config.baseUrl);`,
        playwrightCode: `import { defineConfig } from '@playwright/test';
import * as dotenv from 'dotenv';

// Load environment-specific .env file
dotenv.config({ path: \`.env.\${process.env.ENV || 'dev'}\` });

export default defineConfig({
  use: {
    baseURL: process.env.BASE_URL || 'http://localhost:3000',
    extraHTTPHeaders: {
      'x-test-run': process.env.TEST_RUN_ID || 'local',
    },
  },
});

// Run on staging:
// ENV=staging npx playwright test`,
        bridgeExplanation: 'Environment config separates what changes (URLs, credentials) from what stays the same (test logic).',
        bridgeSteps: [
          { step: 1, label: 'Problem', description: 'Hardcoded URLs in every test', code: "await page.goto('https://staging.app.com/login');", color: 'red' },
          { step: 2, label: 'Env Variable', description: 'Store URL in environment config', code: "BASE_URL=https://staging.myapp.com", color: 'yellow' },
          { step: 3, label: 'Config', description: 'Use env variable in config', code: "baseURL: process.env.BASE_URL", color: 'green' },
        ],
      },
      playground: {
        defaultCode: `// Environment configuration concept

// Simulate reading environment variables
const ENV = 'staging'; // In real code: process.env.ENV

const environments = {
  dev: {
    baseUrl: 'http://localhost:3000',
    apiUrl: 'http://localhost:8080',
    credentials: { email: 'admin@local', password: 'LocalPass1' },
  },
  staging: {
    baseUrl: 'https://staging.myapp.com',
    apiUrl: 'https://api.staging.myapp.com',
    credentials: { email: 'admin@staging', password: 'StagingPass1' },
  },
};

const config = environments[ENV];

console.log('Environment:', ENV);
console.log('Base URL:', config.baseUrl);
console.log('API URL:', config.apiUrl);
console.log('Admin email:', config.credentials.email);`,
        language: 'typescript',
        hints: ['process.env reads system environment variables', 'Use || for fallback: process.env.BASE_URL || "http://localhost"', 'Never commit passwords to source control — use .env files'],
        patterns: [
          { regex: 'process\\.env|ENV\\s*=', outputLines: ['✓ Environment variable accessed'] },
          { regex: 'environments\\[', outputLines: ['✓ Environment config selected'] },
        ],
        successMessage: '✓ You can manage multi-environment configuration!',
      },
      quiz: [
        { id: 'm4-l2-q1', type: 'multiple-choice', question: 'Why should you never hardcode URLs in test files?', options: ['URLs are too long', 'Tests would need to be updated every time the environment changes', 'Playwright does not support URLs', 'URLs slow down tests'], correctIndex: 1, explanation: 'Hardcoded URLs mean editing every test when switching environments. Configuration files change once, all tests update automatically.', points: 10 },
        { id: 'm4-l2-q2', type: 'multiple-choice', question: 'How do you run Playwright tests against staging?', options: ['Change playwright.config.ts to staging URL', 'Set ENV=staging and read it in config via process.env', 'Create separate test files for staging', 'Not possible without code changes'], correctIndex: 1, explanation: 'Environment variables (process.env) let you switch environments at run time: ENV=staging npx playwright test', points: 10 },
        { id: 'm4-l2-q3', type: 'multiple-choice', question: 'Where should you store environment-specific passwords?', options: ['In playwright.config.ts', 'In .env files (not committed to git)', 'In the test file directly', 'In package.json'], correctIndex: 1, explanation: '.env files hold secrets and are excluded from git via .gitignore. Never commit passwords or API keys to source control.', points: 10 },
        { id: 'm4-l2-q4', type: 'multiple-choice', question: 'What does process.env.BASE_URL || "http://localhost:3000" do?', options: ['Sets the BASE_URL variable', 'Uses the BASE_URL env variable if set, falls back to localhost if not', 'Throws an error if BASE_URL is missing', 'Connects to both URLs'], correctIndex: 1, explanation: 'The || operator provides a fallback — use the env variable if defined, otherwise use the hardcoded default.', points: 10 },
        { id: 'm4-l2-q5', type: 'multiple-choice', question: 'What command runs tests on production environment?', options: ['npx playwright test production', 'ENV=production npx playwright test', 'npx playwright test --env production', 'npx playwright test --url production'], correctIndex: 1, explanation: 'Set environment variable before the command: ENV=production npx playwright test. The config reads it with process.env.ENV.', points: 10 },
      ],
    },
    {
      id: 'm4-l3',
      moduleId: 'module-4',
      number: 3,
      title: 'Test Data Management',
      subtitle: 'Strategies for maintainable test data',
      durationMinutes: 14,
      content: {
        manualScenario: `**Scenario:** Your tests use hardcoded emails, names, and addresses. When the QA database resets, all tests break because the user data is gone. You need a better strategy.`,
        whyJavaScript: `JavaScript functions and modules let you generate, organize, and share test data in a structured way.`,
        theory: `## Test Data Strategies

### 1. Static Test Data (Simplest)
\`\`\`typescript
// data/users.ts
export const testUsers = {
  admin: { email: 'admin@test.com', password: 'Admin@123', role: 'admin' },
  buyer: { email: 'buyer@test.com', password: 'Buy@123', role: 'user' },
};
\`\`\`

### 2. Factory Functions (Dynamic)
\`\`\`typescript
// helpers/data.factory.ts
let userCounter = 0;

export function createUniqueUser(role = 'user') {
  userCounter++;
  return {
    email: \`testuser\${userCounter}\${Date.now()}@test.com\`,
    password: 'Test@Pass123',
    role,
    name: \`Test User \${userCounter}\`,
  };
}

// Each call creates a unique user — avoids conflicts
const user1 = createUniqueUser('admin');
const user2 = createUniqueUser('user');
\`\`\`

### 3. JSON Test Data Files
\`\`\`json
// data/products.json
[
  { "id": "P001", "name": "Laptop", "price": 999, "category": "Electronics" },
  { "id": "P002", "name": "Keyboard", "price": 79, "category": "Electronics" }
]
\`\`\`

### 4. API-Created Test Data (Setup via API)
\`\`\`typescript
test.beforeAll(async ({ request }) => {
  // Create test user via API before any test runs
  await request.post('/api/users', {
    data: { email: 'newuser@test.com', role: 'admin' }
  });
});
\`\`\``,
        jsCode: `// Test data factory function
let counter = 0;

function createTestUser(role = 'user') {
  counter++;
  return {
    email: \`test.user.\${counter}@test.com\`,
    password: 'TestPass@123',
    firstName: 'Test',
    lastName: \`User\${counter}\`,
    role,
  };
}

const admin = createTestUser('admin');
const user1 = createTestUser('user');
const user2 = createTestUser('user');

console.log('Admin:', admin.email);
console.log('User 1:', user1.email);
console.log('User 2:', user2.email);`,
        playwrightCode: `import { test, expect } from '@playwright/test';

// Factory function for unique test data
function makeUser(role: 'admin' | 'user' = 'user') {
  const ts = Date.now();
  return {
    email: \`test.\${role}.\${ts}@qa.com\`,
    password: 'TestPass@123',
    role,
  };
}

test('Create new user', async ({ page, request }) => {
  const newUser = makeUser('user');

  // Create via API to avoid UI form for setup
  const response = await request.post('/api/users', {
    data: newUser,
  });
  expect(response.ok()).toBeTruthy();

  // Now test via UI
  await page.goto('/login');
  await page.fill('#email', newUser.email);
  await page.fill('#password', newUser.password);
  await page.click('[type=submit]');
  await expect(page).toHaveURL('/dashboard');
});`,
        bridgeExplanation: 'Test data factories create unique data each run — no more conflicts from previous test runs.',
        bridgeSteps: [
          { step: 1, label: 'Problem', description: 'Hardcoded email causes conflict on second run', code: "const email = 'user@test.com'; // exists after first run", color: 'red' },
          { step: 2, label: 'Factory', description: 'Generate unique email each time', code: "const email = `user.${Date.now()}@test.com`;", color: 'yellow' },
          { step: 3, label: 'No Conflict', description: 'Each test run uses fresh data', code: "// user.1700000001@test.com\n// user.1700000002@test.com", color: 'green' },
        ],
      },
      playground: {
        defaultCode: `// Build test data factories

function generateTestUser(role: string = 'user') {
  const timestamp = Date.now();
  const counter = Math.floor(Math.random() * 1000);

  return {
    email: \`qa.\${role}.\${counter}\${timestamp}@testmail.com\`,
    password: 'AutoTest@Pass1',
    firstName: 'QA',
    lastName: \`Tester\${counter}\`,
    role,
    createdAt: new Date().toISOString(),
  };
}

function generateProduct(category: string = 'general') {
  const id = Math.floor(Math.random() * 10000);
  return {
    name: \`Test Product \${id}\`,
    sku: \`SKU-\${id}\`,
    price: (Math.random() * 100 + 10).toFixed(2),
    category,
    inStock: true,
  };
}

// Generate test data
const admin = generateTestUser('admin');
const user = generateTestUser('user');
const product = generateProduct('electronics');

console.log('Generated admin:', admin.email);
console.log('Generated user:', user.email);
console.log('Generated product:', product.name, '$' + product.price);`,
        language: 'typescript',
        hints: ['Use Date.now() for unique timestamps', 'Factory functions create fresh data each call', 'JSON files work for static reference data'],
        patterns: [
          { regex: 'Date\\.now\\(\\)|timestamp', outputLines: ['✓ Timestamp used for uniqueness'] },
          { regex: 'function.*create|function.*generate|function.*make', outputLines: ['✓ Factory function defined'] },
        ],
        successMessage: '✓ You can create robust test data strategies!',
      },
      quiz: [
        { id: 'm4-l3-q1', type: 'multiple-choice', question: 'Why use factory functions for test user emails?', options: ['Faster to type', 'Generate unique emails each run — avoid conflicts from previous test data', 'Required by Playwright', 'Better error messages'], correctIndex: 1, explanation: 'Unique emails (using timestamp or counter) prevent "email already exists" errors when tests run multiple times against the same environment.', points: 10 },
        { id: 'm4-l3-q2', type: 'multiple-choice', question: 'When is it better to create test data via API rather than UI?', options: ['Never — always use UI', 'For test SETUP data that is not under test (faster, more reliable)', 'Only for admin users', 'When the UI is broken'], correctIndex: 1, explanation: 'API setup is faster and more stable than UI. Use UI only to test the feature being tested. Set up prerequisites via API.', points: 10 },
        { id: 'm4-l3-q3', type: 'multiple-choice', question: 'What is the risk of using hardcoded test emails like "test@test.com"?', options: ['No risk', 'Tests fail if data was created in a previous run and not cleaned up', 'Email format is invalid', 'Playwright rejects them'], correctIndex: 1, explanation: 'Hardcoded emails fail if the user already exists from a previous test run. Unique data avoids this.', points: 10 },
        { id: 'm4-l3-q4', type: 'multiple-choice', question: 'Where should static reference data (like product categories) be stored?', options: ['Inline in each test', 'In a JSON or TypeScript data file imported by tests', 'In playwright.config.ts', 'Generated on each test run'], correctIndex: 1, explanation: 'Static reference data (values that do not change between runs) belongs in data files — JSON or TS constants.', points: 10 },
        { id: 'm4-l3-q5', type: 'multiple-choice', question: 'What does test.beforeAll() do in Playwright?', options: ['Runs before each individual test', 'Runs once before all tests in a describe block — ideal for setup data creation', 'Runs after all tests', 'Skips the first test'], correctIndex: 1, explanation: 'beforeAll runs once per describe block — use it to create test data once, shared across all tests in the block.', points: 10 },
      ],
    },
    {
      id: 'm4-l4',
      moduleId: 'module-4',
      number: 4,
      title: 'Utilities & Helpers',
      subtitle: 'Reusable utility functions',
      durationMinutes: 10,
      content: {
        manualScenario: `**Scenario:** You need to format dates, generate random data, extract numbers from text, and parse error messages in multiple tests. Writing these operations everywhere leads to duplication.`,
        whyJavaScript: `Pure utility functions with no browser dependency can be extracted into helpers — reusable by any test.`,
        theory: `## Utility & Helper Functions

### Date Helpers
\`\`\`typescript
// helpers/date.helper.ts
export function formatDateForInput(date: Date): string {
  return date.toISOString().split('T')[0]; // YYYY-MM-DD
}

export function addDays(date: Date, days: number): Date {
  const result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
}
\`\`\`

### String Helpers
\`\`\`typescript
// helpers/string.helper.ts
export function extractNumber(text: string): number {
  const match = text.match(/\\d+\\.?\\d*/);
  return match ? parseFloat(match[0]) : 0;
}

export function toTitleCase(str: string): string {
  return str.replace(/\\w\\S*/g, (txt) =>
    txt.charAt(0).toUpperCase() + txt.slice(1).toLowerCase()
  );
}
\`\`\`

### Wait Helpers
\`\`\`typescript
// helpers/wait.helper.ts
export async function retryUntil(
  action: () => Promise<boolean>,
  maxRetries = 3,
  delayMs = 1000,
): Promise<boolean> {
  for (let i = 0; i < maxRetries; i++) {
    if (await action()) return true;
    await new Promise(r => setTimeout(r, delayMs));
  }
  return false;
}
\`\`\``,
        jsCode: `// Utility functions

// Extract number from page text
function extractNumber(text: string): number {
  const match = text.match(/\\d+\\.?\\d*/);
  return match ? parseFloat(match[0]) : 0;
}

// Date formatter for inputs
function formatDate(date: Date): string {
  return date.toISOString().split('T')[0];
}

// Random item from array
function randomItem<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

// Usage examples
console.log(extractNumber('$49.99 total'));   // 49.99
console.log(extractNumber('3 items found'));  // 3
console.log(formatDate(new Date()));          // 2024-01-15
console.log(randomItem(['chrome', 'firefox', 'safari']));`,
        playwrightCode: `import { test, expect } from '@playwright/test';
import { extractNumber } from '../helpers/string.helper';
import { formatDate, addDays } from '../helpers/date.helper';

test('Price calculation is correct', async ({ page }) => {
  await page.goto('/cart');

  // Get price text from page
  const priceText = await page.locator('.total-price').textContent();
  const price = extractNumber(priceText ?? '');

  expect(price).toBeGreaterThan(0);
  expect(price).toBeLessThan(10000);
});

test('Future date can be set in date picker', async ({ page }) => {
  await page.goto('/booking');

  const tomorrow = addDays(new Date(), 1);
  const formattedDate = formatDate(tomorrow);

  await page.fill('#booking-date', formattedDate);
  await expect(page.locator('#booking-date')).toHaveValue(formattedDate);
});`,
        bridgeExplanation: 'Helper functions are your toolkit — write once, import anywhere.',
        bridgeSteps: [
          { step: 1, label: 'Repeated Logic', description: 'Same string parsing in 5 tests', code: "// In each test:\nconst n = parseInt(text.match(/\\d+/)[0]);", color: 'red' },
          { step: 2, label: 'Extract Helper', description: 'One function for everyone', code: "// helpers/string.helper.ts\nexport function extractNumber(text) { ... }", color: 'yellow' },
          { step: 3, label: 'Import & Reuse', description: 'Clean test code', code: "import { extractNumber } from '../helpers/string.helper';\nconst n = extractNumber(priceText);", color: 'green' },
        ],
      },
      playground: {
        defaultCode: `// Build utility functions for testing

// String utilities
function extractNumber(text: string): number {
  const match = text.match(/\\d+\\.?\\d*/);
  return match ? parseFloat(match[0]) : 0;
}

function slugify(text: string): string {
  return text.toLowerCase().replace(/\\s+/g, '-').replace(/[^a-z0-9-]/g, '');
}

// Date utilities
function formatDate(date: Date): string {
  return date.toISOString().split('T')[0];
}

function addDays(date: Date, days: number): Date {
  const d = new Date(date);
  d.setDate(d.getDate() + days);
  return d;
}

// Test the helpers
console.log('Number from "$49.99":', extractNumber('$49.99'));
console.log('Number from "3 items":', extractNumber('3 items found'));
console.log('Slug of "My Test Page":', slugify('My Test Page'));
console.log('Today:', formatDate(new Date()));
console.log('Tomorrow:', formatDate(addDays(new Date(), 1)));`,
        language: 'typescript',
        hints: ['String.match() with a regex extracts patterns', 'Pure functions (no page dependency) belong in helpers/', 'Helper functions are unit-testable'],
        patterns: [
          { regex: '\\.match\\(|\\.replace\\(', outputLines: ['✓ String manipulation utility'] },
          { regex: 'new Date\\(\\)', outputLines: ['✓ Date utility function'] },
          { regex: 'export function', outputLines: ['✓ Helper exported for reuse'] },
        ],
        successMessage: '✓ You can build reusable test utilities!',
      },
      quiz: [
        { id: 'm4-l4-q1', type: 'multiple-choice', question: 'What makes a function a "helper" vs a "page action"?', options: ['Helpers are smaller', 'Helpers have no Playwright page dependency — they are pure utility functions', 'Helpers run faster', 'Page actions are in separate files'], correctIndex: 1, explanation: 'Helpers are pure functions (no page parameter) — they transform data, format strings, etc. Page actions require the Playwright page.', points: 10 },
        { id: 'm4-l4-q2', type: 'code-reading', question: 'What does this helper return?', code: "function extractNumber(text: string): number {\n  const match = text.match(/\\d+/);\n  return match ? parseInt(match[0]) : 0;\n}\nextractNumber('3 items found');", options: ['0', '3', 'items', 'null'], correctIndex: 1, explanation: 'The regex /\\d+/ matches one or more digits. In "3 items found", it matches "3". parseInt("3") = 3.', points: 10 },
        { id: 'm4-l4-q3', type: 'multiple-choice', question: 'Why extract date formatting into a helper?', options: ['Dates are complex', 'Used in multiple tests — change the format once in the helper, all tests update', 'Playwright cannot handle dates', 'Required by standards'], correctIndex: 1, explanation: 'Date formatting logic used across tests belongs in a helper. If the date format changes (e.g., from YYYY-MM-DD to DD/MM/YYYY), update the helper once.', points: 10 },
        { id: 'm4-l4-q4', type: 'multiple-choice', question: 'Can helper functions be unit tested independently from Playwright?', options: ['No — helpers need a browser', 'Yes — pure functions with no page dependency can be tested with any test framework', 'Only in headless mode', 'Only if they return strings'], correctIndex: 1, explanation: 'Pure utility functions have no browser dependency. They can be tested with Jest, Vitest, or any unit testing framework.', points: 10 },
        { id: 'm4-l4-q5', type: 'multiple-choice', question: 'Which folder should date, string, and calculation utilities go in?', options: ['pages/', 'tests/', 'helpers/ or utils/', 'fixtures/'], correctIndex: 2, explanation: 'helpers/ or utils/ is the conventional location for pure utility functions with no page dependency.', points: 10 },
      ],
    },
    {
      id: 'm4-l5',
      moduleId: 'module-4',
      number: 5,
      title: 'CI/CD Integration',
      subtitle: 'Running Playwright in pipelines',
      durationMinutes: 12,
      content: {
        manualScenario: `**Scenario:** Your team wants tests to run automatically on every pull request and block deployment if tests fail. This requires integrating Playwright with GitHub Actions or Azure DevOps.`,
        whyJavaScript: `Playwright runs as a Node.js command-line tool — it integrates into any CI/CD pipeline that can run shell commands.`,
        theory: `## CI/CD Integration

### GitHub Actions

\`\`\`yaml
# .github/workflows/playwright.yml
name: Playwright Tests

on:
  push:
    branches: [main, develop]
  pull_request:
    branches: [main]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - name: Install Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '20'

      - name: Install dependencies
        run: npm ci

      - name: Install Playwright Browsers
        run: npx playwright install --with-deps

      - name: Run tests
        run: npx playwright test
        env:
          BASE_URL: \${{ secrets.STAGING_URL }}

      - name: Upload test report
        uses: actions/upload-artifact@v4
        if: always()
        with:
          name: playwright-report
          path: playwright-report/
          retention-days: 30
\`\`\`

### Key CI Considerations

\`\`\`typescript
// playwright.config.ts — CI-aware settings
export default defineConfig({
  retries: process.env.CI ? 2 : 0,    // retry in CI, not locally
  workers: process.env.CI ? 1 : 4,    // single worker in CI (often faster)
  reporter: process.env.CI
    ? [['github'], ['html']]           // GitHub summary + HTML
    : [['html']],                      // Just HTML locally
});
\`\`\``,
        jsCode: `// CI/CD configuration decisions

const isCiEnvironment = Boolean(process.env.CI);

const ciConfig = {
  retries: isCiEnvironment ? 2 : 0,
  workers: isCiEnvironment ? 2 : 4,
  headless: true, // always headless in CI
  reporter: isCiEnvironment ? 'github' : 'html',
};

console.log('Running in CI:', isCiEnvironment);
console.log('Retries:', ciConfig.retries);
console.log('Workers:', ciConfig.workers);
console.log('Reporter:', ciConfig.reporter);`,
        playwrightCode: `import { defineConfig } from '@playwright/test';

export default defineConfig({
  // Retry failed tests in CI — flaky test protection
  retries: process.env.CI ? 2 : 0,

  // Workers: adjust for CI environment
  workers: process.env.CI ? 2 : undefined,

  // CI-aware reporting
  reporter: process.env.CI
    ? [['github'], ['html', { outputFolder: 'playwright-report' }]]
    : [['html', { open: 'on-failure' }]],

  use: {
    baseURL: process.env.BASE_URL || 'http://localhost:3000',

    // Always capture on failure for CI debugging
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
    trace: 'on-first-retry',
  },
});`,
        bridgeExplanation: 'CI/CD runs your tests automatically on every code change — no manual test execution needed.',
        bridgeSteps: [
          { step: 1, label: 'Manual', description: 'Remember to run tests before each deploy', code: '// Developer must remember:\n// npm run test\n// npx playwright test', color: 'blue' },
          { step: 2, label: 'CI Pipeline', description: 'Tests run automatically on every push', code: '# GitHub Actions:\nnpx playwright test', color: 'yellow' },
          { step: 3, label: 'Gate', description: 'Deploy blocked if tests fail', code: '# Pipeline fails\n# No deployment\n# Notification sent', color: 'green' },
        ],
      },
      playground: {
        defaultCode: `// CI/CD configuration planning

// This simulates the decisions you make for CI integration
const isCI = process.env.CI === 'true' || false; // false = local

const config = {
  // More retries in CI to handle flakiness
  retries: isCI ? 2 : 0,

  // Parallel workers
  workers: isCI ? 4 : undefined,

  // Reporter
  reporters: isCI
    ? ['github', 'html']
    : ['html'],

  // Evidence capture
  screenshot: 'only-on-failure',
  video: isCI ? 'retain-on-failure' : 'off',
  trace: isCI ? 'on-first-retry' : 'off',
};

console.log('CI environment:', isCI);
console.log('\\nConfiguration:');
Object.entries(config).forEach(([key, value]) => {
  console.log(\`  \${key}: \${JSON.stringify(value)}\`);
});`,
        language: 'typescript',
        hints: ['process.env.CI is set to "true" by most CI systems automatically', 'Retries handle flaky tests in CI', 'Always capture screenshots and traces in CI for debugging'],
        patterns: [
          { regex: 'process\\.env\\.CI', outputLines: ['✓ CI environment detection'] },
          { regex: 'retries|workers|reporter', outputLines: ['✓ CI-aware configuration'] },
        ],
        successMessage: '✓ You understand CI/CD integration for Playwright!',
      },
      quiz: [
        { id: 'm4-l5-q1', type: 'multiple-choice', question: 'Why use retries: 2 in CI but retries: 0 locally?', options: ['CI runs are faster', 'CI environments can be flaky (network, resources) — retries reduce false failures', 'Required by GitHub Actions', 'Local tests always pass'], correctIndex: 1, explanation: 'CI environments share resources and may have network variability. Retries handle occasional flakiness without hiding real bugs.', points: 10 },
        { id: 'm4-l5-q2', type: 'multiple-choice', question: 'How does Playwright detect it is running in CI?', options: ['Via playwright.config.ts setting', 'Most CI systems automatically set process.env.CI = "true"', 'Via a special CLI flag', 'Via the browser version'], correctIndex: 1, explanation: 'GitHub Actions, Azure DevOps, Jenkins, and most CI systems automatically set CI=true environment variable.', points: 10 },
        { id: 'm4-l5-q3', type: 'multiple-choice', question: 'Why upload the playwright-report folder as a CI artifact?', options: ['Required by Playwright', 'To view the HTML report with failure screenshots and videos after the CI run', 'To deploy the app', 'To cache test results'], correctIndex: 1, explanation: 'The HTML report with screenshots, videos, and traces is stored as a CI artifact so you can download and inspect failures.', points: 10 },
        { id: 'm4-l5-q4', type: 'multiple-choice', question: 'What does "npx playwright install --with-deps" do in CI?', options: ['Installs Node.js', 'Installs Playwright browsers and their system dependencies (needed in Ubuntu CI)', 'Updates Playwright version', 'Configures the test runner'], correctIndex: 1, explanation: 'CI machines do not have browsers pre-installed. --with-deps installs Chromium, Firefox, WebKit and their OS dependencies.', points: 10 },
        { id: 'm4-l5-q5', type: 'multiple-choice', question: 'In a pull request workflow, what should happen when Playwright tests fail?', options: ['Merge anyway', 'Notify team but merge', 'Block the PR from merging until tests pass', 'Delete the branch'], correctIndex: 2, explanation: 'Tests failing on a PR should block the merge. This is the core CI/CD quality gate — broken code should not reach main.', points: 10 },
      ],
    },
    {
      id: 'm4-l6',
      moduleId: 'module-4',
      number: 6,
      title: 'Reporting & Debugging',
      subtitle: 'Making failures understandable',
      durationMinutes: 10,
      content: {
        manualScenario: `**Scenario:** A test fails in CI at 2 AM. The developer needs to understand exactly what went wrong — which step failed, what the page looked like, and what network calls were made.`,
        whyJavaScript: `Playwright's reporting ecosystem provides visual evidence and structured data to diagnose failures without re-running tests.`,
        theory: `## Playwright Reporters & Debugging

### Built-in Reporters

\`\`\`typescript
// playwright.config.ts
reporter: [
  ['html'],          // Interactive HTML report — best for debugging
  ['json', { outputFile: 'results.json' }],  // Machine-readable
  ['github'],        // GitHub PR annotations
  ['list'],          // Console output
  ['dot'],           // Minimal dots (good for CI)
];
\`\`\`

### Custom Test Annotations

\`\`\`typescript
test('Checkout with promo code', async ({ page }) => {
  test.info().annotations.push({
    type: 'test_case_id',
    description: 'TC-042',
  });

  // Attach custom data to the report
  await test.info().attach('cart-state', {
    body: JSON.stringify({ items: 3, total: 149.97 }),
    contentType: 'application/json',
  });
});
\`\`\`

### Debugging Strategies

1. **--debug flag**: Opens Playwright Inspector
2. **--headed**: Sees the browser
3. **pause()**: Stops test at a point
4. **console.log**: Logs to terminal

\`\`\`typescript
test('Debug this test', async ({ page }) => {
  await page.goto('/login');
  await page.pause(); // Opens inspector — stops here
  await page.fill('#email', 'admin@test.com');
});
\`\`\``,
        jsCode: `// Debugging strategies overview

const debugStrategies = [
  { method: '--debug', when: 'Step through actions interactively' },
  { method: '--headed', when: 'Watch the browser execute' },
  { method: 'page.pause()', when: 'Stop at a specific point' },
  { method: 'console.log()', when: 'Log values to terminal' },
  { method: 'screenshot', when: 'Capture page state' },
  { method: 'trace viewer', when: 'Post-mortem analysis of failures' },
];

console.log('Debugging toolkit:');
debugStrategies.forEach(({ method, when }) => {
  console.log(\`  \${method}: \${when}\`);
});`,
        playwrightCode: `import { test, expect } from '@playwright/test';

test('Checkout with debugging hooks', async ({ page }) => {
  // Attach test metadata to report
  test.info().annotations.push({ type: 'feature', description: 'checkout' });
  test.info().annotations.push({ type: 'priority', description: 'P1' });

  await page.goto('/cart');

  // Manual screenshot for report
  await page.screenshot({ path: 'screenshots/cart-before-checkout.png' });

  // Attach screenshot to Playwright report
  await test.info().attach('cart-screenshot', {
    path: 'screenshots/cart-before-checkout.png',
    contentType: 'image/png',
  });

  await page.click('#checkout-btn');

  // Console log is visible in test output
  console.log('Navigated to checkout, URL:', page.url());

  await expect(page).toHaveURL('/checkout');
});`,
        bridgeExplanation: 'Good reporting turns a 2 AM failure into a 5-minute diagnosis — without re-running the test.',
        bridgeSteps: [
          { step: 1, label: 'Failure at 2 AM', description: 'Test fails in CI pipeline', code: '// Test #42 FAILED\n// What happened?', color: 'red' },
          { step: 2, label: 'Evidence', description: 'Screenshot + trace attached', code: "screenshot: 'only-on-failure'\ntrace: 'on-first-retry'", color: 'yellow' },
          { step: 3, label: 'Diagnosis', description: 'Trace Viewer shows root cause', code: '// Step 15: "Add to Cart"\n// Error: Element not found\n// DOM: button was disabled', color: 'green' },
        ],
      },
      playground: {
        defaultCode: `// Reporting and debugging configuration

const reportingConfig = {
  // HTML report: most useful for human review
  htmlReport: {
    enabled: true,
    openOnFailure: true,
    features: ['screenshots', 'videos', 'traces', 'annotations'],
  },

  // Evidence capture settings
  evidenceCapture: {
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
    trace: 'on-first-retry',
  },

  // Annotations for traceability
  testAnnotations: [
    { type: 'feature', value: 'checkout' },
    { type: 'ticket', value: 'PROJ-123' },
    { type: 'priority', value: 'P1-critical' },
  ],
};

// What a good failure report contains:
const goodFailureReport = [
  '✓ Test name and description',
  '✓ Step where failure occurred',
  '✓ Expected vs actual value',
  '✓ Screenshot of page at failure',
  '✓ Video of the entire test run',
  '✓ Trace with DOM snapshots',
  '✓ Network requests timeline',
  '✓ Console errors logged',
];

console.log('Good failure report contains:');
goodFailureReport.forEach(item => console.log(' ', item));`,
        language: 'typescript',
        hints: ['HTML reporter is best for human review', 'Annotations add traceability to test management tools', 'page.pause() stops execution in Playwright Inspector'],
        patterns: [
          { regex: 'reporter|reporting', outputLines: ['✓ Reporter configuration'] },
          { regex: 'annotation|attach', outputLines: ['✓ Test evidence attachment'] },
          { regex: 'pause\\(\\)|debug', outputLines: ['✓ Debugging technique'] },
        ],
        successMessage: '✓ You can create actionable test reports!',
      },
      quiz: [
        { id: 'm4-l6-q1', type: 'multiple-choice', question: 'What is the best reporter for visually debugging failures?', options: ['list', 'dot', 'html', 'json'], correctIndex: 2, explanation: 'HTML reporter generates an interactive page with screenshots, videos, traces, and step-by-step details.', points: 10 },
        { id: 'm4-l6-q2', type: 'multiple-choice', question: 'What does page.pause() do during a test run?', options: ['Takes a screenshot', 'Pauses execution and opens Playwright Inspector for interactive debugging', 'Stops the browser', 'Takes a video'], correctIndex: 1, explanation: 'page.pause() halts test execution and opens Playwright Inspector — you can step through actions, inspect elements, and run commands.', points: 10 },
        { id: 'm4-l6-q3', type: 'multiple-choice', question: 'Why attach screenshots/videos to Playwright test reports?', options: ['Makes reports smaller', 'Provides visual evidence of failures — reviewers can see exactly what the browser showed', 'Required by Playwright', 'Runs tests faster'], correctIndex: 1, explanation: 'Visual evidence transforms "test failed" into "here is exactly what went wrong" — dramatically speeding up failure diagnosis.', points: 10 },
        { id: 'm4-l6-q4', type: 'multiple-choice', question: 'What are test annotations useful for?', options: ['Speeding up tests', 'Linking tests to requirements, tickets, or features in test management tools', 'Adding more assertions', 'Configuring browsers'], correctIndex: 1, explanation: 'Annotations (type: ticket, description: JIRA-123) create traceability between tests and requirements/tickets.', points: 10 },
        { id: 'm4-l6-q5', type: 'multiple-choice', question: 'Which command runs a specific test in debug mode with browser visible?', options: ['npx playwright test --silent', 'npx playwright test --debug --headed login.test.ts', 'npx playwright test --fast', 'npx playwright debug login.test.ts'], correctIndex: 1, explanation: '--debug opens Playwright Inspector, --headed shows the browser, and specifying the file runs only that test.', points: 10 },
      ],
    },
    {
      id: 'm4-l7',
      moduleId: 'module-4',
      number: 7,
      title: 'Framework Review',
      subtitle: 'Everything you have learned',
      durationMinutes: 15,
      content: {
        manualScenario: `**Final Scenario:** You have been asked to build an automation framework from scratch for a web application. Where do you start, and what does the final architecture look like?`,
        whyJavaScript: `You now know every JavaScript concept needed — variables, functions, objects, arrays, async/await, modules, and error handling. Combined with Playwright, you can build professional automation.`,
        theory: `## Your Complete Playwright Engineer Toolkit

### JavaScript → Playwright Mapping

| JavaScript Concept | Playwright Use Case |
|---|---|
| Variables (const, let) | Store URLs, credentials, selectors |
| Strings & templates | Build dynamic URLs, assertions |
| Arrays | Data-driven tests, multiple browsers |
| Objects | Test user models, config structures |
| Functions | login(), addToCart(), reusable actions |
| Conditions | Optional UI, role-based assertions |
| Loops | Validate multiple elements, iterate data |
| Async/Await | EVERY Playwright action |
| Import/Export | Organize across files, share helpers |
| Try/Catch | Optional popups, graceful failures |

### Playwright → Framework Mapping

| Playwright Concept | Framework Role |
|---|---|
| playwright.config.ts | Environment configuration |
| Page Object Model | pages/ — selectors + actions |
| Fixtures | fixtures/ — reusable state setup |
| Helpers | helpers/ — utility functions |
| Test data | data/ — users, products, orders |
| Reporters | CI artifacts + local HTML report |

### Career Path

**Junior QA Automation Engineer:**
- Writes tests using existing page objects
- Understands test data and fixtures

**Mid-level QA Automation Engineer:**
- Designs page objects and fixtures
- Integrates with CI/CD
- Mentors others on automation patterns

**Senior QA Automation Engineer:**
- Architects the entire framework
- Drives test strategy
- Improves reliability and performance`,
        jsCode: `// Complete framework mental model

const frameworkMap = {
  javascript: {
    variables:   'test data storage',
    functions:   'reusable actions (login, addToCart)',
    objects:     'test users, expected results',
    arrays:      'data-driven tests',
    asyncAwait:  'EVERY browser action',
    importExport: 'file organization',
    tryCatch:    'graceful error handling',
  },
  playwright: {
    config:     'environment + browser setup',
    locators:   'find page elements',
    actions:    'click, fill, navigate',
    assertions: 'verify outcomes',
    pom:        'page-level organization',
    fixtures:   'test setup/teardown',
    reporting:  'failure evidence',
  },
};

console.log('Your complete toolkit:');
Object.entries(frameworkMap.javascript).forEach(([js, use]) => {
  console.log(\`  JS \${js} → Playwright: \${use}\`);
});`,
        playwrightCode: `// A production-ready test demonstrating all concepts

import { test, expect, type Page } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { testUsers } from '../data/users';
import { extractNumber } from '../helpers/string.helper';

// Objects — structured test data
const checkoutData = {
  product: { id: 'LAPTOP-001', expectedPrice: 999 },
  shipping: { name: 'QA Tester', address: '123 Test St', country: 'AU' },
};

// Function — reusable helper
async function addProductToCart(page: Page, productId: string) {
  await page.getByTestId(\`product-\${productId}\`).click();
  await page.getByRole('button', { name: 'Add to Cart' }).click();
}

// Test — uses all concepts together
test('@regression Complete checkout flow', async ({ page }) => {
  // Variables + async/await
  const loginPage = new LoginPage(page);
  await loginPage.goto();
  await loginPage.login(testUsers.buyer.email, testUsers.buyer.password);

  // Function call — reusable action
  await addProductToCart(page, checkoutData.product.id);

  // Assertion — number extracted from text
  const cartText = await page.locator('.cart-badge').textContent();
  expect(extractNumber(cartText ?? '')).toBe(1);

  // Condition — optional checkout notice
  try {
    await page.click('#checkout-notice-close', { timeout: 2000 });
  } catch { /* notice not present */ }

  // Array — validate all required fields
  const requiredFields = ['#name', '#address', '#country'];
  for (const field of requiredFields) {
    await expect(page.locator(field)).toBeVisible();
  }
});`,
        bridgeExplanation: 'You have traveled the full path from Manual QA → JavaScript → Playwright → Production Framework.',
        bridgeSteps: [
          { step: 1, label: 'Manual QA', description: 'You understood how to test manually', code: '// Click Login\n// Fill form\n// Verify result', color: 'blue' },
          { step: 2, label: 'JavaScript for QAs', description: 'You learned the right concepts', code: "const email = 'admin@test.com';\nasync function login(page) { ... }", color: 'yellow' },
          { step: 3, label: 'Playwright Engineer', description: 'You can build production automation', code: "test('login', async ({ page }) => {\n  await loginPage.login(testUsers.admin);\n  await expect(page).toHaveURL('/dashboard');\n});", color: 'green' },
        ],
      },
      playground: {
        defaultCode: `// Your complete automation toolkit

// Everything you've learned — all in one place

// 1. Variables & Objects
const testUser = { email: 'qa@test.com', password: 'Test@Pass1', role: 'tester' };
const baseUrl = 'https://myapp.com';

// 2. Functions (reusable actions)
async function loginAs(page, user) {
  await page.goto(\`\${baseUrl}/login\`);
  await page.fill('#email', user.email);
  await page.fill('#password', user.password);
  await page.click('[type=submit]');
}

// 3. Arrays (data-driven)
const pagesToSmoke = ['/home', '/products', '/checkout', '/account'];

// 4. Conditions
const isAdmin = testUser.role === 'admin';
const expectedDashboard = isAdmin ? '/admin' : '/dashboard';

// 5. Loop
pagesToSmoke.forEach(page => {
  console.log(\`Smoke testing: \${baseUrl}\${page}\`);
});

// 6. Async/Await concept
console.log('Every Playwright action uses await:');
const actions = [
  "await page.goto(url)",
  "await page.fill('#email', email)",
  "await page.click('[type=submit]')",
  "await expect(page).toHaveURL('/dashboard')",
];
actions.forEach(a => console.log(' ', a));

console.log('\\n🎓 You are ready to be a Playwright Engineer!');`,
        language: 'typescript',
        hints: ['You have completed all modules!', 'Every concept bridges manual testing to automation', 'Your certification is ready'],
        patterns: [
          { regex: 'await\\s+', outputLines: ['✓ Async/await pattern'] },
          { regex: 'const|let', outputLines: ['✓ Variables'] },
          { regex: 'function|=>\\s*\\{', outputLines: ['✓ Functions'] },
          { regex: 'forEach|for.*of', outputLines: ['✓ Loops'] },
        ],
        successMessage: '🎓 Congratulations! You have completed the Playwright Bridge Academy!',
      },
      quiz: [
        { id: 'm4-l7-q1', type: 'multiple-choice', question: 'Which JavaScript concept is used in EVERY Playwright test without exception?', options: ['Arrays', 'Async/Await', 'Classes', 'Regular Expressions'], correctIndex: 1, explanation: 'Every Playwright action is asynchronous. Every test is async ({ page }) => {}, and every action needs await.', points: 10 },
        { id: 'm4-l7-q2', type: 'multiple-choice', question: 'A test reads: await loginPage.login(testUsers.buyer.email, testUsers.buyer.password). What concepts are used?', options: ['Variables only', 'Functions only', 'Objects (testUsers.buyer), functions (login()), and async/await', 'Import/export only'], correctIndex: 2, explanation: 'testUsers.buyer is an object property access, login() is a function call, and await means it is asynchronous.', points: 10 },
        { id: 'm4-l7-q3', type: 'multiple-choice', question: 'If you need to run the same test with 5 different users, which concept enables this?', options: ['Conditions', 'Objects', 'Arrays with loops (data-driven testing)', 'Import/export'], correctIndex: 2, explanation: 'Store users in an array, loop with for...of or forEach, run the same test logic for each user.', points: 10 },
        { id: 'm4-l7-q4', type: 'multiple-choice', question: 'Where does a login() helper function belong in the framework?', options: ['In playwright.config.ts', 'Directly in every test file', 'In pages/LoginPage.ts (page object) or helpers/', 'In .env file'], correctIndex: 2, explanation: 'A login function involving UI interactions belongs in a LoginPage page object. A purely data-manipulation login helper belongs in helpers/.', points: 10 },
        { id: 'm4-l7-q5', type: 'multiple-choice', question: 'What is the final career achievement after mastering this academy?', options: ['Manual QA Engineer', 'JavaScript Developer', 'QA Automation Engineer with Playwright expertise', 'DevOps Engineer'], correctIndex: 2, explanation: 'Completing this academy equips you to be a QA Automation Engineer specializing in Playwright — bridging your manual testing experience with modern automation.', points: 10 },
      ],
    },
  ],
};
