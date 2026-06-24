import type { IModule, ILesson } from '../types';

const makeLessonShell = (
  id: string, moduleId: string, number: number, title: string, subtitle: string,
  duration: number, theory: string, jsCode: string, playwrightCode: string,
  defaultCode: string, quizQ: [string, string[], number, string][],
): ILesson => ({
  id, moduleId, number, title, subtitle, durationMinutes: duration,
  content: {
    manualScenario: `**Manual Scenario:** ${subtitle} — the same concept you apply when testing manually, now automated with Playwright.`,
    whyJavaScript: `JavaScript is the foundation that makes this Playwright feature possible.`,
    theory,
    jsCode,
    playwrightCode,
    bridgeExplanation: `This Playwright concept maps directly to your manual testing experience.`,
    bridgeSteps: [
      { step: 1, label: 'Manual', description: 'How you do it manually', code: '// Manual test step', color: 'blue' },
      { step: 2, label: 'JavaScript', description: 'The underlying code concept', code: jsCode.split('\n')[0] || '// code', color: 'violet' },
      { step: 3, label: 'Playwright', description: 'The Playwright implementation', code: playwrightCode.split('\n')[0] || '// playwright', color: 'green' },
    ],
  },
  playground: {
    defaultCode,
    language: 'typescript',
    hints: ['Try modifying the code', 'Experiment with different values'],
    patterns: [
      { regex: 'await\\s+page\\.', outputLines: ['✓ Playwright action called'] },
      { regex: 'expect\\(', outputLines: ['✓ Assertion made'] },
      { regex: 'test\\(', outputLines: ['✓ Test defined'] },
    ],
    successMessage: '✓ Great work with Playwright!',
  },
  quiz: quizQ.map(([q, opts, correct, exp], i) => ({
    id: `${id}-q${i + 1}`,
    type: 'multiple-choice' as const,
    question: q,
    options: opts,
    correctIndex: correct,
    explanation: exp,
    points: 10,
  })),
});

export const module3: IModule = {
  id: 'module-3',
  number: 3,
  title: 'Playwright Fundamentals',
  subtitle: 'Core automation patterns',
  description: 'Master the essential Playwright APIs — locators, actions, assertions, waits, and debugging. Build your first complete test suite.',
  icon: '🎭',
  color: 'green',
  certificateId: 'practitioner',
  lessons: [
    makeLessonShell(
      'm3-l1', 'module-3', 1, 'Project Structure', 'How a Playwright project is organized', 12,
      `## Playwright Project Structure

\`\`\`
my-project/
├── playwright.config.ts    ← Configuration (browsers, baseURL, timeouts)
├── tests/
│   ├── auth/
│   │   ├── login.test.ts
│   │   └── logout.test.ts
│   └── e2e/
│       └── checkout.test.ts
├── helpers/               ← Shared helper functions
│   └── auth.helpers.ts
├── fixtures/              ← Test data
│   └── users.ts
└── page-objects/          ← Page Object Models
    └── LoginPage.ts
\`\`\`

### playwright.config.ts — The Nerve Center

\`\`\`typescript
import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  timeout: 30000,
  retries: 2,
  reporter: 'html',
  use: {
    baseURL: 'https://myapp.com',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
    trace: 'on-first-retry',
  },
  projects: [
    { name: 'chrome', use: { ...devices['Desktop Chrome'] } },
    { name: 'firefox', use: { ...devices['Desktop Firefox'] } },
  ],
});
\`\`\``,
      `// Key config values
const config = {
  testDir: './tests',
  timeout: 30000,       // 30 second timeout per test
  retries: 2,           // retry failed tests twice
  reporter: 'html',     // generate HTML report
};

console.log('Test directory:', config.testDir);
console.log('Timeout:', config.timeout + 'ms');`,
      `import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  timeout: 30000,
  retries: process.env.CI ? 2 : 0,
  reporter: 'html',
  use: {
    baseURL: process.env.BASE_URL || 'https://staging.myapp.com',
    screenshot: 'only-on-failure',
    trace: 'on-first-retry',
  },
  projects: [
    { name: 'chrome', use: { ...devices['Desktop Chrome'] } },
  ],
});`,
      `// Explore the Playwright config structure
const playwrightConfig = {
  testDir: './tests',
  timeout: 30000,
  retries: 2,
  use: {
    baseURL: 'https://myapp.com',
    screenshot: 'only-on-failure',
  },
};

// The baseURL means you can use relative paths in tests:
// await page.goto('/login')  ← resolves to https://myapp.com/login

console.log('Config loaded');
console.log('Base URL:', playwrightConfig.use.baseURL);
console.log('Timeout:', playwrightConfig.timeout);`,
      [
        ['Where does playwright.config.ts live?', ['Inside the tests/ folder', 'At the project root', 'Inside src/', 'Inside node_modules/'], 1, 'playwright.config.ts lives at the project root — it is the entry point Playwright reads when running tests.'],
        ['What does baseURL in playwright.config.ts allow?', ['Tests to run faster', 'Using relative paths like /login instead of full URLs in tests', 'Cross-browser testing', 'Automatic retries'], 1, 'baseURL lets you use page.goto("/login") instead of the full URL in every test — change one config, all tests update.'],
        ['What does retries: 2 mean?', ['Run each test 2 times', 'Re-run failing tests up to 2 more times before marking as failed', 'Timeout after 2 seconds', 'Use 2 browser workers'], 1, 'retries specifies how many times Playwright will re-run a failing test before marking it as failed.'],
        ['Which config option captures media when a test fails?', ['trace: on-first-retry', 'screenshot: only-on-failure', 'video: retain-on-failure', 'All of the above'], 3, 'All three options capture different types of debugging information on failure — screenshots, videos, and traces.'],
        ['What is testDir used for?', ['Storing test results', 'Telling Playwright where to find test files', 'Setting the base URL', 'Configuring browsers'], 1, 'testDir tells Playwright which directory to scan for test files (*.test.ts, *.spec.ts).'],
      ],
    ),
    makeLessonShell(
      'm3-l2', 'module-3', 2, 'Locators', 'Finding elements like a pro', 15,
      `## Playwright Locators — The Modern Way to Find Elements

Playwright provides **built-in locators** that are more resilient than raw CSS selectors.

### Recommended Locators (in order of preference)

\`\`\`typescript
// 1. By Role — most accessible, most resilient
page.getByRole('button', { name: 'Login' })
page.getByRole('textbox', { name: 'Email' })
page.getByRole('heading', { name: 'Dashboard' })

// 2. By Label — for form inputs
page.getByLabel('Email address')
page.getByLabel('Password')

// 3. By Test ID — developer-added attribute
page.getByTestId('submit-button')

// 4. By Text — for visible text
page.getByText('Sign in')
page.getByText('Welcome back')

// 5. By Placeholder
page.getByPlaceholder('Enter your email')
\`\`\`

### CSS Selectors (when needed)

\`\`\`typescript
page.locator('#email')              // by ID
page.locator('.btn-primary')        // by class
page.locator('[data-testid="btn"]') // by attribute
page.locator('form > button')       // CSS hierarchy
\`\`\`

### Chaining Locators

\`\`\`typescript
// Find a button WITHIN a specific form
page.locator('#login-form').getByRole('button', { name: 'Submit' })

// Find the nth element
page.locator('.product-card').nth(0)  // first card
page.locator('.product-card').last()  // last card
\`\`\``,
      `// Locator concepts
const selectors = {
  byId:          '#email',
  byClass:       '.submit-btn',
  byAttribute:   '[data-testid="login-btn"]',
  byRole:        'button[name="Login"]',
  byPlaceholder: 'input[placeholder="Email"]',
};

console.log('Best practice:', selectors.byAttribute);
console.log('Most readable:', 'getByRole("button", { name: "Login" })');`,
      `import { test, expect } from '@playwright/test';

test('Use modern Playwright locators', async ({ page }) => {
  await page.goto('/login');

  // Preferred: role-based locators
  await page.getByLabel('Email').fill('user@test.com');
  await page.getByLabel('Password').fill('pass123');
  await page.getByRole('button', { name: 'Login' }).click();

  // Get by test ID
  await page.getByTestId('welcome-message').waitFor();

  // Get by text
  await expect(page.getByText('Dashboard')).toBeVisible();
});`,
      `// Practice different locator strategies
// These represent elements on a login page:
// <input aria-label="Email" placeholder="Enter email" />
// <input aria-label="Password" type="password" />
// <button data-testid="submit-btn">Sign In</button>
// <h1>Welcome to MyApp</h1>
// <div class="error-msg">Invalid credentials</div>

const locators = {
  emailByLabel:       'getByLabel("Email")',
  passwordByLabel:    'getByLabel("Password")',
  submitByTestId:     'getByTestId("submit-btn")',
  headingByRole:      'getByRole("heading", { name: "Welcome to MyApp" })',
  errorByText:        'getByText("Invalid credentials")',
  emailByPlaceholder: 'getByPlaceholder("Enter email")',
};

// Which is the most resilient?
console.log('Most resilient:', locators.submitByTestId);
console.log('Most readable:', locators.emailByLabel);

Object.entries(locators).forEach(([name, locator]) => {
  console.log(name + ':', locator);
});`,
      [
        ['Which locator is most recommended in Playwright?', ['CSS selectors (#id, .class)', 'XPath', 'getByRole() and getByLabel()', 'document.querySelector()'], 2, 'Playwright recommends role-based locators (getByRole, getByLabel) as they are tied to accessibility attributes and are more resilient to UI changes.'],
        ['What is the benefit of getByTestId() over CSS selectors?', ['Faster execution', 'data-testid attributes are added specifically for testing and do not change with styling', 'Cross-browser compatible', 'Requires no HTML changes'], 1, 'data-testid attributes are specifically for testing — designers can change classes and IDs, but testIds remain stable.'],
        ['How do you get the second product card on a page?', ["page.locator('.product-card').first()", "page.locator('.product-card').nth(1)", "page.locator('.product-card')[1]", "page.locator('.product-card').second()"], 1, '.nth(1) gets the element at index 1 (second element, since indexing starts at 0).'],
        ['What does page.getByLabel("Email") target?', ['An element with id="Email"', 'A form input associated with a label containing "Email"', 'Any text containing "Email"', 'An element with class="Email"'], 1, 'getByLabel finds form inputs associated with a <label> element whose text matches.'],
        ['When should you use page.locator() with CSS?', ['Always — it is the best practice', 'When getByRole, getByLabel, and getByTestId are not suitable', 'Never', 'Only for buttons'], 1, 'CSS selectors are fine as a fallback, but prefer the semantic locators (role, label, testId) for better resilience.'],
      ],
    ),
    makeLessonShell(
      'm3-l3', 'module-3', 3, 'Actions', 'Interacting with the browser', 15,
      `## Playwright Actions — Simulating User Interactions

### Click Actions

\`\`\`typescript
await page.click('#submit');                    // standard click
await page.dblclick('.item');                  // double click
await page.click('#menu', { button: 'right' }); // right click

// Modern API
await page.getByRole('button', { name: 'Submit' }).click();
\`\`\`

### Input Actions

\`\`\`typescript
// Fill — clears field and types
await page.fill('#email', 'user@test.com');

// Type — simulates keystroke by keystroke (for autocomplete)
await page.type('#search', 'laptop');

// Press — keyboard shortcuts
await page.press('#search', 'Enter');
await page.keyboard.press('Tab');
await page.keyboard.press('Control+A');

// Clear a field
await page.fill('#email', ''); // fill with empty string
\`\`\`

### Select, Check, Upload

\`\`\`typescript
// Dropdown
await page.selectOption('#country', 'AU');
await page.selectOption('#country', { label: 'Australia' });

// Checkbox
await page.check('#remember-me');
await page.uncheck('#remember-me');
await page.locator('#terms').setChecked(true);

// File upload
await page.setInputFiles('#upload', 'path/to/file.pdf');
\`\`\`

### Navigation

\`\`\`typescript
await page.goto('/login');
await page.goto('https://app.com', { waitUntil: 'networkidle' });
await page.goBack();
await page.goForward();
await page.reload();
\`\`\``,
      `// Common Playwright actions
const actions = [
  "await page.goto('/login')",
  "await page.fill('#email', email)",
  "await page.click('button[type=submit]')",
  "await page.press('#search', 'Enter')",
  "await page.selectOption('#role', 'admin')",
  "await page.check('#terms')",
];

console.log('Common Playwright actions:');
actions.forEach(action => console.log(' ', action));`,
      `import { test, expect } from '@playwright/test';

test('Registration form', async ({ page }) => {
  await page.goto('/register');

  // Fill inputs
  await page.fill('#firstName', 'Jane');
  await page.fill('#lastName', 'Doe');
  await page.fill('#email', 'jane@test.com');

  // Select dropdown
  await page.selectOption('#country', 'AU');

  // Check checkbox
  await page.check('#terms-checkbox');

  // Upload file (optional)
  // await page.setInputFiles('#avatar', './test-avatar.png');

  // Submit
  await page.getByRole('button', { name: 'Create Account' }).click();

  // Assert success
  await expect(page.getByText('Account created!')).toBeVisible();
});`,
      `// Simulate a complex form interaction
const formData = {
  firstName: 'Jane',
  lastName: 'Doe',
  email: 'jane.doe@test.com',
  country: 'AU',
  role: 'tester',
  termsAccepted: true,
};

// What Playwright actions would fill this form?
const playwrightActions = [
  \`await page.fill('#firstName', '\${formData.firstName}')\`,
  \`await page.fill('#lastName', '\${formData.lastName}')\`,
  \`await page.fill('#email', '\${formData.email}')\`,
  \`await page.selectOption('#country', '\${formData.country}')\`,
  \`await page.selectOption('#role', '\${formData.role}')\`,
  formData.termsAccepted ? "await page.check('#terms')" : "await page.uncheck('#terms')",
  "await page.getByRole('button', { name: 'Submit' }).click()",
];

console.log('Test actions:');
playwrightActions.forEach(action => console.log(' ', action));`,
      [
        ['What is the difference between page.fill() and page.type()?', ['No difference', 'fill() clears the field then sets value; type() simulates keystroke by keystroke', 'type() is deprecated', 'fill() is only for text inputs'], 1, 'fill() is faster — clears and sets value instantly. type() simulates actual keystrokes — useful for testing autocomplete/typeahead.'],
        ['How do you select an option in a dropdown by visible text?', ["page.selectOption('#country', 'AU')", "page.selectOption('#country', { label: 'Australia' })", "page.click('#country option:text(\"Australia\")')", 'Both A and B work'], 3, 'Both work: value "AU" or label "Australia". Using label is more readable.'],
        ['What does page.check("#terms") do?', ['Unchecks a checkbox', 'Verifies a checkbox is checked', 'Checks a checkbox (sets it to checked state)', 'Clicks the checkbox element'], 2, 'page.check() sets a checkbox to the checked state. If already checked, it has no effect.'],
        ['Which action simulates pressing Enter in a search field?', ["page.fill('#search', 'Enter')", "page.press('#search', 'Enter')", "page.keyboard.type('Enter')", "page.click('#search')"], 1, 'page.press() simulates a keyboard key press on a specific element. page.keyboard.press() sends it to the focused element.'],
        ['What does await page.goto("/login") with baseURL set do?', ['Navigates to /login literal', 'Navigates to baseURL + /login (e.g., https://app.com/login)', 'Throws an error', 'Requires full URL'], 1, 'When baseURL is configured, relative paths automatically resolve: /login → https://app.com/login.'],
      ],
    ),
    makeLessonShell(
      'm3-l4', 'module-3', 4, 'Assertions', 'Verify the expected outcomes', 15,
      `## Playwright Assertions — Verifying What You See

### Basic Assertions

\`\`\`typescript
import { expect } from '@playwright/test';

// Element visibility
await expect(locator).toBeVisible();
await expect(locator).toBeHidden();

// Text content
await expect(locator).toHaveText('Expected text');
await expect(locator).toContainText('partial text');
await expect(locator).not.toHaveText('Wrong text');

// URL
await expect(page).toHaveURL('/dashboard');
await expect(page).toHaveURL(/dashboard/);  // regex

// Page title
await expect(page).toHaveTitle('Dashboard — MyApp');
\`\`\`

### Value Assertions

\`\`\`typescript
// Input value
await expect(page.locator('#email')).toHaveValue('user@test.com');

// Attribute
await expect(locator).toHaveAttribute('type', 'submit');
await expect(locator).toHaveAttribute('disabled');

// Count
await expect(page.locator('.item')).toHaveCount(5);

// State
await expect(locator).toBeChecked();
await expect(locator).toBeEnabled();
await expect(locator).toBeDisabled();
await expect(locator).toBeEmpty();
\`\`\`

### Soft Assertions — Continue After Failure

\`\`\`typescript
test('multiple assertions', async ({ page }) => {
  await page.goto('/profile');

  // Soft assertions don't stop the test on failure
  await expect.soft(page.locator('#name')).toHaveText('Jane Doe');
  await expect.soft(page.locator('#email')).toHaveText('jane@test.com');
  await expect.soft(page.locator('#role')).toHaveText('Admin');

  // Only fails at the end if any soft assertion failed
});
\`\`\``,
      `// Assertion examples
const assertionExamples = [
  "await expect(page).toHaveURL('/dashboard')",
  "await expect(locator).toBeVisible()",
  "await expect(locator).toHaveText('Welcome!')",
  "await expect(locator).toHaveCount(5)",
  "await expect(locator).toBeEnabled()",
  "await expect(locator).not.toBeVisible()",
];

assertionExamples.forEach(ex => console.log(ex));`,
      `import { test, expect } from '@playwright/test';

test('Login success assertions', async ({ page }) => {
  await page.goto('/login');
  await page.fill('#email', 'admin@test.com');
  await page.fill('#password', 'Admin@123');
  await page.click('[type="submit"]');

  // URL changed to dashboard
  await expect(page).toHaveURL('/dashboard');

  // Welcome message visible
  await expect(page.getByText('Welcome, Admin!')).toBeVisible();

  // Admin panel visible
  await expect(page.getByTestId('admin-panel')).toBeVisible();

  // Menu items count
  await expect(page.locator('.nav-item')).toHaveCount(5);

  // Error message is NOT visible
  await expect(page.locator('.error-msg')).not.toBeVisible();
});`,
      `// Practice building assertions

// Imagine you are on the dashboard after login
// What assertions would you write?

const assertionPlan = [
  { what: 'URL', assertion: "expect(page).toHaveURL('/dashboard')" },
  { what: 'Page title', assertion: "expect(page).toHaveTitle('Dashboard — MyApp')" },
  { what: 'Welcome message', assertion: "expect(page.getByText('Welcome back!')).toBeVisible()" },
  { what: 'Correct user name', assertion: "expect(page.locator('.username')).toHaveText('John Smith')" },
  { what: 'Navigation links count', assertion: "expect(page.locator('.nav-link')).toHaveCount(4)" },
  { what: 'Error message absent', assertion: "expect(page.locator('.error')).not.toBeVisible()" },
  { what: 'Submit button enabled', assertion: "expect(page.getByRole('button')).toBeEnabled()" },
];

console.log('Assertions for dashboard:');
assertionPlan.forEach(({ what, assertion }) => {
  console.log(\`  ✓ \${what}: \${assertion}\`);
});`,
      [
        ['What does await expect(locator).not.toBeVisible() assert?', ['The element does not exist in HTML', 'The element exists but is hidden or not on the page', 'The element has no text', 'The element is disabled'], 1, 'not.toBeVisible() passes when the element is hidden (display:none, visibility:hidden) or not in the DOM.'],
        ['What is a soft assertion?', ['An assertion that runs faster', 'An assertion that does not stop the test immediately on failure — all soft assertions are reported at the end', 'An assertion without await', 'A partial text match'], 1, 'Soft assertions (expect.soft) let the test continue after a failure, collecting all assertion failures before reporting.'],
        ['What does toHaveCount(3) verify?', ['A number equals 3', 'There are exactly 3 elements matching the locator', 'A string has 3 characters', 'A page loads 3 times'], 1, 'toHaveCount asserts the number of elements matching the locator selector.'],
        ['Which assertion checks the input field value?', ['toHaveText()', 'toContainText()', 'toHaveValue()', 'toHaveAttribute()'], 2, 'toHaveValue() checks the value of form inputs (input, select, textarea).'],
        ['What does await expect(page).toHaveURL(/dashboard/) check?', ['URL is exactly /dashboard', 'URL contains "dashboard" (regex match)', 'URL starts with /dashboard', 'URL ends with /dashboard'], 1, 'Passing a regex to toHaveURL checks if the current URL matches the pattern. /dashboard/ matches any URL containing "dashboard".'],
      ],
    ),
    makeLessonShell(
      'm3-l5', 'module-3', 5, 'Waits & Timeouts', 'Handling dynamic content', 12,
      `## Waits — Handling Dynamic Web Apps

### Auto-Wait (Built-in)

Playwright **automatically waits** before interacting with elements:
- Waits for element to be visible
- Waits for element to be enabled
- Waits for element to be stable (not animating)

\`\`\`typescript
// No manual wait needed — Playwright auto-waits
await page.click('#submit-btn'); // waits until button is clickable
\`\`\`

### Explicit Waits

\`\`\`typescript
// Wait for URL to change
await page.waitForURL('/dashboard');
await page.waitForURL(/dashboard/);

// Wait for element to appear
await page.locator('.loading-spinner').waitFor({ state: 'hidden' });
await page.locator('.results').waitFor({ state: 'visible' });

// Wait for network to idle
await page.waitForLoadState('networkidle');
await page.waitForLoadState('domcontentloaded');

// Custom timeout
await page.locator('.slow-element').waitFor({ timeout: 60000 });
\`\`\`

### Timeouts

\`\`\`typescript
// Global timeout (in config)
timeout: 30000  // 30 seconds per test

// Per-action timeout
await page.click('#btn', { timeout: 5000 });

// Per-expect timeout
await expect(locator).toBeVisible({ timeout: 10000 });
\`\`\``,
      `// Wait strategies
const waitStrategies = {
  autoWait: 'Playwright waits automatically before actions',
  waitForURL: "await page.waitForURL('/dashboard')",
  waitForElement: "await locator.waitFor({ state: 'visible' })",
  waitForNetwork: "await page.waitForLoadState('networkidle')",
  customTimeout: "await page.click('#btn', { timeout: 5000 })",
};

Object.entries(waitStrategies).forEach(([key, value]) => {
  console.log(key + ':', value);
});`,
      `import { test, expect } from '@playwright/test';

test('Dynamic content loads', async ({ page }) => {
  await page.goto('/dashboard');

  // Wait for loading spinner to disappear
  await page.locator('.loading-spinner').waitFor({ state: 'hidden' });

  // Now interact with the loaded content
  await expect(page.locator('.dashboard-data')).toBeVisible();

  // Click and wait for navigation
  await page.click('#reports-link');
  await page.waitForURL('/reports');

  // Wait for data table to load
  await page.locator('.data-table').waitFor({ state: 'visible', timeout: 15000 });
  await expect(page.locator('.data-table tbody tr')).toHaveCount(10);
});`,
      `// Understanding auto-wait vs explicit waits

// Auto-wait examples (no extra code needed):
const autoWaitExamples = [
  "await page.click('#btn')  // waits for btn to be clickable",
  "await page.fill('#input', 'text')  // waits for input to be ready",
  "await expect(locator).toBeVisible()  // has built-in timeout",
];

// Explicit wait examples (when auto-wait is not enough):
const explicitWaitExamples = [
  "await page.waitForURL('/dashboard')  // after form submit",
  "await spinner.waitFor({ state: 'hidden' })  // loading done",
  "await page.waitForLoadState('networkidle')  // all API calls done",
];

console.log('Auto-wait (built-in):');
autoWaitExamples.forEach(e => console.log(' ', e));

console.log('\\nExplicit wait (when needed):');
explicitWaitExamples.forEach(e => console.log(' ', e));`,
      [
        ['What does Playwright auto-wait for before clicking?', ['Nothing — you must add manual waits', 'Element to be visible, enabled, and stable', 'Only for the element to exist in DOM', 'Network requests to complete'], 1, 'Playwright auto-waits for actionability — the element must be visible, enabled, and not animating before an action proceeds.'],
        ['When would you use waitFor({ state: "hidden" })?', ['When you want to hide an element', 'When waiting for a loading spinner to disappear before checking results', 'To set an element invisible', 'To speed up the test'], 1, 'waitFor state hidden waits for an element to disappear — ideal for waiting for loading indicators to finish.'],
        ['What does page.waitForLoadState("networkidle") do?', ['Pauses for 1 second', 'Waits until there are no more than 0 active network connections for 500ms', 'Waits for the DOM to load', 'Reloads the page'], 1, 'networkidle means Playwright waits until all network activity stops — all API calls have completed.'],
        ['What is the default Playwright action timeout?', ['5 seconds', '10 seconds', '30 seconds', '60 seconds'], 2, 'The default timeout is 30 seconds per test, but each action has its own 30s timeout by default.'],
        ['When does Playwright auto-wait NOT help you?', ['Clicking a button', 'Filling an input', 'Waiting for a loading spinner to disappear before checking data', 'Navigating to a URL'], 2, 'Auto-wait handles actions, but for explicit state changes like waiting for loaders to disappear, you need waitFor().'],
      ],
    ),
    makeLessonShell(
      'm3-l6', 'module-3', 6, 'Screenshots & Tracing', 'Debugging test failures', 10,
      `## Capturing Evidence — Screenshots, Videos & Traces

### Screenshots

\`\`\`typescript
// Manual screenshot
await page.screenshot({ path: 'homepage.png' });
await page.screenshot({ path: 'full-page.png', fullPage: true });

// Screenshot of specific element
await page.locator('.product-card').screenshot({ path: 'product.png' });

// Auto-screenshot on failure (in config)
use: { screenshot: 'only-on-failure' }
\`\`\`

### Videos

\`\`\`typescript
// In config
use: { video: 'retain-on-failure' }
// or
use: { video: 'on' }  // always record
\`\`\`

### Trace Viewer — The Most Powerful Debug Tool

\`\`\`typescript
// In config
use: { trace: 'on-first-retry' }

// After running tests:
// npx playwright show-trace test-results/trace.zip
\`\`\`

The Trace Viewer shows:
- Every action timeline
- Before/after screenshots per action
- Network requests
- Console logs
- DOM snapshots`,
      `// Evidence capture configuration
const evidenceConfig = {
  screenshot: 'only-on-failure',
  video: 'retain-on-failure',
  trace: 'on-first-retry',
};

// After a failure, you get:
const debuggingEvidence = [
  'Screenshots at point of failure',
  'Video replay of the entire test',
  'Trace: every action + DOM state',
];

debuggingEvidence.forEach(e => console.log('✓', e));`,
      `import { test, expect } from '@playwright/test';

test('Dashboard with screenshot on failure', async ({ page }) => {
  await page.goto('/dashboard');

  // Manual screenshot for documentation
  await page.screenshot({ path: './screenshots/dashboard.png' });

  try {
    await expect(page.getByRole('heading')).toHaveText('Dashboard');
  } catch (error) {
    // Take screenshot on assertion failure for debugging
    await page.screenshot({
      path: \`./failures/dashboard-fail-\${Date.now()}.png\`,
      fullPage: true,
    });
    throw error; // Re-throw so test still fails
  }
});`,
      `// Debug strategy with Playwright evidence

const debugTools = {
  screenshot: {
    when: 'Manual capture or on failure',
    command: "await page.screenshot({ path: 'failure.png', fullPage: true })",
    use: 'See exact page state at failure moment',
  },
  video: {
    when: 'Configured to record on failure',
    command: "use: { video: 'retain-on-failure' }",
    use: 'Watch entire test replay to find where it went wrong',
  },
  trace: {
    when: 'On first retry',
    command: "use: { trace: 'on-first-retry' }",
    use: 'Step-by-step DOM snapshots + network + console',
  },
};

Object.entries(debugTools).forEach(([tool, info]) => {
  console.log('\\n' + tool.toUpperCase() + ':');
  console.log('  When:', info.when);
  console.log('  Use:', info.use);
});`,
      [
        ['What is the Playwright Trace Viewer?', ['A network proxy tool', 'A tool that shows step-by-step actions, DOM snapshots, and network requests from a test run', 'A screenshot editor', 'A CI/CD integration tool'], 1, 'Trace Viewer provides a complete recording of a test run including every action, DOM state, network calls, and console logs.'],
        ['What does screenshot: "only-on-failure" do in config?', ['Takes screenshots of every test', 'Takes a screenshot automatically when a test fails', 'Disables screenshots', 'Takes screenshots every 5 seconds'], 1, 'only-on-failure captures screenshots only when tests fail, saving disk space while still providing debug evidence.'],
        ['When should you use trace: "on-first-retry"?', ['Always record traces', 'Capture traces when a test fails and is retried — most useful for flaky test investigation', 'Never use traces in CI', 'Only use in local development'], 1, 'on-first-retry captures traces when a test fails on the first attempt and is retried. This is the most useful setting for CI.'],
        ['How do you open a Playwright trace file?', ['Double-click the .zip file', 'npx playwright show-trace test-results/trace.zip', 'Open in Chrome DevTools', 'Import into VS Code'], 1, 'npx playwright show-trace opens the trace viewer in a browser with the captured trace file.'],
        ['What evidence does fullPage: true add to a screenshot?', ['Only the visible viewport', 'The entire scrollable page, not just the visible portion', 'Only above the fold', 'The browser chrome/toolbar'], 1, 'fullPage: true captures the entire page including content below the fold by scrolling.'],
      ],
    ),
    makeLessonShell(
      'm3-l7', 'module-3', 7, 'Page Object Model', 'Organizing test code by page', 18,
      `## Page Object Model (POM) — The Architecture Pattern

POM organizes your test code by **page**. Each page in your app gets a class with:
- Locators for that page's elements
- Methods for actions on that page

\`\`\`typescript
// pages/LoginPage.ts
import { type Page } from '@playwright/test';

export class LoginPage {
  private page: Page;

  // Locators defined once in the class
  private emailInput = this.page.locator('#email');
  private passwordInput = this.page.locator('#password');
  private submitButton = this.page.getByRole('button', { name: 'Login' });
  private errorMessage = this.page.locator('.error-msg');

  constructor(page: Page) {
    this.page = page;
  }

  async goto() {
    await this.page.goto('/login');
  }

  async login(email: string, password: string) {
    await this.emailInput.fill(email);
    await this.passwordInput.fill(password);
    await this.submitButton.click();
  }

  async getErrorMessage(): Promise<string | null> {
    return this.errorMessage.textContent();
  }
}
\`\`\`

### Using POM in Tests

\`\`\`typescript
// tests/login.test.ts
import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';

test('Successful login', async ({ page }) => {
  const loginPage = new LoginPage(page);

  await loginPage.goto();
  await loginPage.login('admin@test.com', 'Admin@123');

  await expect(page).toHaveURL('/dashboard');
});
\`\`\``,
      `// Page Object Model concept
class LoginPage {
  constructor(private page) {}

  async goto() { /* await this.page.goto('/login') */ }
  async login(email, password) { /* fill + click */ }
  async getError() { /* return error text */ }
}

// Test becomes readable
// const loginPage = new LoginPage(page);
// await loginPage.goto();
// await loginPage.login('admin@test.com', 'Admin@123');

console.log('POM: selectors defined once, actions reusable');`,
      `import { type Page } from '@playwright/test';

export class LoginPage {
  constructor(private page: Page) {}

  private get emailInput() { return this.page.getByLabel('Email'); }
  private get passwordInput() { return this.page.getByLabel('Password'); }
  private get submitButton() { return this.page.getByRole('button', { name: 'Login' }); }
  private get errorMessage() { return this.page.locator('.error-msg'); }

  async goto() {
    await this.page.goto('/login');
  }

  async login(email: string, password: string) {
    await this.emailInput.fill(email);
    await this.passwordInput.fill(password);
    await this.submitButton.click();
  }

  async isErrorVisible(): Promise<boolean> {
    return this.errorMessage.isVisible();
  }
}`,
      `// Understand Page Object Model structure

// Without POM — login steps scattered in every test
const withoutPOM = \`
test('login admin', async ({ page }) => {
  await page.goto('/login');
  await page.fill('#email', 'admin@test.com');
  await page.fill('#password', 'Admin@123');
  await page.click('[type=submit]');
});

test('login user', async ({ page }) => {
  await page.goto('/login');       // DUPLICATED
  await page.fill('#email', 'user@test.com');
  await page.fill('#password', 'User@123');
  await page.click('[type=submit]'); // DUPLICATED
});
\`;

// With POM — clean and reusable
const withPOM = \`
test('login admin', async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.goto();
  await loginPage.login('admin@test.com', 'Admin@123');
});

test('login user', async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.goto();
  await loginPage.login('user@test.com', 'User@123');
});
\`;

console.log('Without POM: duplicated selectors and steps');
console.log('With POM: clean, maintainable, DRY');`,
      [
        ['What is the main purpose of the Page Object Model?', ['Run tests in parallel', 'Separate test data from test logic', 'Encapsulate page selectors and actions so they are defined once and reused', 'Connect to a database'], 2, 'POM centralizes page-specific selectors and interactions in one class — change a selector once, all tests that use the page object update automatically.'],
        ['Where should locators be defined in POM?', ['In the test file directly', 'In the page class as private properties', 'In a separate selectors file', 'In playwright.config.ts'], 1, 'Locators belong in the page class as private properties. Tests interact with the page through methods, not directly with selectors.'],
        ['What does the constructor(page: Page) do in a page object?', ['Creates a new browser page', 'Receives the Playwright page and stores it for use in the class methods', 'Opens the URL automatically', 'Registers the page object with Playwright'], 1, 'The constructor receives the Playwright page fixture and stores it (this.page = page) so all methods in the class can use it.'],
        ['What happens when the login button selector changes in a POM-based test suite?', ['All tests need to be updated', 'Only the LoginPage class needs to be updated', 'Tests break permanently', 'Playwright auto-detects the change'], 1, 'With POM, the selector exists only in the LoginPage class. Update it once there and all tests that use LoginPage are fixed.'],
        ['What is the recommended naming convention for page object files?', ['login.ts', 'loginHelper.ts', 'LoginPage.ts', 'login-page.spec.ts'], 2, 'Page object files use PascalCase and end with "Page": LoginPage.ts, DashboardPage.ts, CheckoutPage.ts.'],
      ],
    ),
    makeLessonShell(
      'm3-l8', 'module-3', 8, 'Test Data & Fixtures', 'Managing test data', 12,
      `## Test Data Management & Fixtures

### Playwright Fixtures — Built-in State Setup

\`\`\`typescript
// Extend built-in fixtures with your own
import { test as base } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';

type MyFixtures = {
  loginPage: LoginPage;
  loggedInPage: Page; // page already logged in
};

export const test = base.extend<MyFixtures>({
  loginPage: async ({ page }, use) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await use(loginPage); // provide to the test
  },

  loggedInPage: async ({ page }, use) => {
    await page.goto('/login');
    await page.fill('#email', 'admin@test.com');
    await page.fill('#password', 'Admin@123');
    await page.click('[type=submit]');
    await page.waitForURL('/dashboard');
    await use(page); // provide logged-in page
  },
});
\`\`\`

### Using Custom Fixtures

\`\`\`typescript
// Import your extended test
import { test } from '../fixtures/auth.fixtures';
import { expect } from '@playwright/test';

test('Admin dashboard', async ({ loggedInPage }) => {
  // Page is already logged in when this runs!
  await expect(loggedInPage).toHaveURL('/dashboard');
});
\`\`\``,
      `// Test fixtures concept
const fixtures = {
  purpose: 'Setup and teardown for tests',
  built_in: ['page', 'browser', 'context', 'request'],
  custom: ['loggedInPage', 'adminPage', 'testUser'],
};

console.log('Built-in fixtures:', fixtures.built_in.join(', '));
console.log('Custom fixtures share setup across tests');`,
      `import { test as base, expect } from '@playwright/test';

// Custom fixture: pre-logged-in page
const test = base.extend({
  loggedInPage: async ({ page }, use) => {
    await page.goto('/login');
    await page.fill('#email', 'admin@test.com');
    await page.fill('#password', 'Admin@123');
    await page.getByRole('button', { name: 'Login' }).click();
    await page.waitForURL('/dashboard');

    // Provide the logged-in page to the test
    await use(page);

    // Teardown: logout after test (optional)
    await page.goto('/logout');
  },
});

test('Dashboard features', async ({ loggedInPage }) => {
  await expect(loggedInPage.locator('h1')).toHaveText('Dashboard');
  await expect(loggedInPage.locator('.user-menu')).toBeVisible();
});`,
      `// Compare: with and without fixtures

const withoutFixture = \`
// Every test repeats login setup:
test('test 1', async ({ page }) => {
  await page.goto('/login');
  await page.fill('#email', 'admin@test.com');  // REPEATED
  await page.fill('#password', 'Admin@123');     // REPEATED
  await page.click('[type=submit]');             // REPEATED
  await page.waitForURL('/dashboard');           // REPEATED
  // ... actual test
});
\`;

const withFixture = \`
// Fixture handles setup once:
test('test 1', async ({ loggedInPage }) => {
  // Already logged in!
  await expect(loggedInPage.locator('h1')).toHaveText('Dashboard');
});
\`;

console.log('Without fixtures: repeated setup in every test');
console.log('With fixtures: setup defined once, reused everywhere');`,
      [
        ['What is a Playwright fixture?', ['A test data file', 'A setup/teardown mechanism that provides ready-to-use state to tests', 'A screenshot', 'A configuration value'], 1, 'Fixtures set up state (like logging in) before a test and tear it down after. Tests receive the ready state without repeating setup code.'],
        ['What built-in fixtures does Playwright provide?', ['browser, page, context, request', 'login, logout, navigate, click', 'beforeEach, afterEach, setup, teardown', 'chrome, firefox, safari, mobile'], 0, 'Playwright provides: page (a new browser page), browser, context (isolated browser context), and request (API testing).'],
        ['Why use custom fixtures for login?', ['To avoid TypeScript errors', 'Each test that needs a logged-in user gets one automatically without repeating login code', 'Required by Playwright', 'To run tests in parallel'], 1, 'A loggedInPage fixture performs login once and provides the pre-logged-in page to any test that requests it.'],
        ['What does await use(page) do in a fixture?', ['Closes the page', 'Provides the fixture value to the test — the test runs at this point', 'Creates a new page', 'Takes a screenshot'], 1, 'await use() is where the fixture hands control to the test. Code before use() is setup; code after is teardown.'],
        ['When would you use base.extend() in Playwright?', ['Never — fixtures cannot be extended', 'When creating custom fixtures that add new functionality to tests', 'Only for performance tests', 'To add browser projects'], 1, 'base.extend() creates a new test object with additional custom fixtures. It inherits all built-in fixtures and adds your own.'],
      ],
    ),
    makeLessonShell(
      'm3-l9', 'module-3', 9, 'Network & API Testing', 'Intercept and mock network requests', 12,
      `## Network Interception & API Testing

### Mock API Responses

\`\`\`typescript
test('Handle API error gracefully', async ({ page }) => {
  // Intercept the API call and return an error
  await page.route('**/api/users', (route) => {
    route.fulfill({
      status: 500,
      body: JSON.stringify({ error: 'Server Error' }),
    });
  });

  await page.goto('/users');

  // Assert error handling UI
  await expect(page.locator('.error-banner')).toBeVisible();
  await expect(page.locator('.error-banner')).toContainText('Server Error');
});
\`\`\`

### Wait for Network Requests

\`\`\`typescript
test('Data loads from API', async ({ page }) => {
  // Wait for a specific API request to complete
  const responsePromise = page.waitForResponse('**/api/products');

  await page.goto('/products');

  const response = await responsePromise;
  expect(response.status()).toBe(200);
});
\`\`\`

### Direct API Testing (no browser UI needed)

\`\`\`typescript
test('API returns correct data', async ({ request }) => {
  const response = await request.get('https://api.myapp.com/users');
  expect(response.ok()).toBeTruthy();

  const data = await response.json();
  expect(data).toHaveLength(10);
});
\`\`\``,
      `// Network testing scenarios
const networkTestScenarios = [
  'Mock API → test error handling UI without a real server error',
  'Intercept slow response → test loading spinner',
  'Block images → faster tests that still verify functionality',
  'Direct API calls → validate backend contracts',
];

networkTestScenarios.forEach((s, i) => console.log(i + 1 + '.', s));`,
      `import { test, expect } from '@playwright/test';

test('Mock empty product list', async ({ page }) => {
  // Return empty array instead of real products
  await page.route('**/api/products', (route) => {
    route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify([]),
    });
  });

  await page.goto('/products');

  // Without the mock, this state is hard to reproduce
  await expect(page.getByText('No products found')).toBeVisible();
});

test('API contract test', async ({ request }) => {
  const response = await request.post('/api/login', {
    data: { email: 'admin@test.com', password: 'Admin@123' },
  });

  expect(response.status()).toBe(200);
  const body = await response.json();
  expect(body).toHaveProperty('token');
  expect(body).toHaveProperty('user.email');
});`,
      `// Network mocking use cases

const mockScenarios = [
  {
    scenario: 'Empty state testing',
    problem: 'Hard to get 0 results in a real database',
    solution: 'Mock API to return empty array',
    benefit: 'Test "No results found" UI reliably',
  },
  {
    scenario: 'Error handling',
    problem: 'Cannot trigger real server errors on demand',
    solution: 'Mock API to return 500 status',
    benefit: 'Test error UI without breaking the server',
  },
  {
    scenario: 'Slow network',
    problem: 'Network too fast to test loading states',
    solution: 'Add delay to mocked response',
    benefit: 'Test loading spinners reliably',
  },
];

mockScenarios.forEach(({ scenario, benefit }) => {
  console.log('Scenario:', scenario);
  console.log('Benefit:', benefit);
  console.log('---');
});`,
      [
        ['What does page.route() allow you to do?', ['Navigate to a route', 'Intercept network requests and return custom responses', 'Create a new route in React Router', 'Check network speed'], 1, 'page.route() intercepts matching network requests and lets you return custom responses — mocking the backend.'],
        ['Why would you mock an API error response in tests?', ['To make tests fail', 'To test how the UI handles error states without needing a real server error', 'Required by Playwright', 'To test the API itself'], 1, 'Mocking error responses lets you test error handling UI (error banners, retry buttons) reliably without triggering real server errors.'],
        ['What fixture is used for direct API testing (without browser)?', ['page', 'browser', 'request', 'context'], 2, 'The request fixture provides an API testing client. It does not open a browser — it sends HTTP requests directly.'],
        ['What does page.waitForResponse() do?', ['Blocks all network requests', 'Waits for a specific API request to complete and returns the response', 'Caches network responses', 'Retries failed requests'], 1, 'waitForResponse() returns a Promise that resolves with the response when a matching request completes.'],
        ['What is the benefit of network mocking over end-to-end testing?', ['Mocking is always better', 'Test edge cases and error states that are difficult or impossible to reproduce with real data', 'Mocked tests run in all browsers', 'No setup required'], 1, 'Network mocking enables testing of rare states (empty data, server errors, slow responses) that are hard to reproduce consistently with real data.'],
      ],
    ),
    makeLessonShell(
      'm3-l10', 'module-3', 10, 'Running & Reporting', 'Executing tests and reading reports', 10,
      `## Running Tests & Reading Reports

### Running Tests

\`\`\`bash
# Run all tests
npx playwright test

# Run specific file
npx playwright test tests/login.test.ts

# Run with specific browser
npx playwright test --project=chrome

# Run in headed mode (see browser)
npx playwright test --headed

# Run with specific tag
npx playwright test --grep @smoke

# Run in debug mode
npx playwright test --debug

# Show last HTML report
npx playwright show-report
\`\`\`

### Test Annotations

\`\`\`typescript
test.skip('Not implemented yet', async ({ page }) => { });
test.fixme('Known bug', async ({ page }) => { });
test.only('Run only this test', async ({ page }) => { });

// Tags for filtering
test('@smoke Login works', async ({ page }) => { });
test('@regression Checkout flow', async ({ page }) => { });
\`\`\`

### HTML Report

The HTML report shows:
- Pass/fail counts per file
- Duration of each test
- Screenshots and traces on failure
- Retry information`,
      `// Common test commands
const commands = {
  runAll: 'npx playwright test',
  runFile: 'npx playwright test tests/login.test.ts',
  runChrome: 'npx playwright test --project=chrome',
  headed: 'npx playwright test --headed',
  debug: 'npx playwright test --debug',
  report: 'npx playwright show-report',
};

Object.entries(commands).forEach(([name, cmd]) => {
  console.log(name + ':', cmd);
});`,
      `import { test, expect } from '@playwright/test';

// Tagged tests for filtering
test('@smoke Login page loads', async ({ page }) => {
  await page.goto('/login');
  await expect(page.locator('h1')).toBeVisible();
});

// test.skip — known issue, exclude from run
test.skip('@regression Checkout with coupon', async ({ page }) => {
  // TODO: coupon feature not deployed yet
});

// test.describe — group related tests
test.describe('Authentication', () => {
  test('Valid login succeeds', async ({ page }) => { /* ... */ });
  test('Invalid password shows error', async ({ page }) => { /* ... */ });
  test('Locked account shows message', async ({ page }) => { /* ... */ });
});`,
      `// Test organization strategies

// Grouping with describe
const testGroups = [
  { group: 'Authentication', tests: ['login', 'logout', 'password-reset'] },
  { group: 'Product Catalog', tests: ['list', 'search', 'filter', 'details'] },
  { group: 'Shopping Cart', tests: ['add', 'remove', 'update-quantity'] },
  { group: 'Checkout', tests: ['address', 'payment', 'confirmation'] },
];

// Tags for different test run types
const testTags = {
  '@smoke': 'Quick sanity check — 5-10 critical tests',
  '@regression': 'Full regression — all tests',
  '@auth': 'Authentication-related tests only',
  '@ui': 'UI-only tests (no API)',
};

console.log('Test organization:');
testGroups.forEach(({ group, tests }) => {
  console.log(\`  \${group}: \${tests.length} tests\`);
});

console.log('\\nTest tags:');
Object.entries(testTags).forEach(([tag, desc]) => {
  console.log(\`  \${tag}: \${desc}\`);
});`,
      [
        ['How do you run only Chrome tests?', ['npx playwright test --chrome', 'npx playwright test --project=chrome', 'npx playwright test --browser=chrome', 'npx playwright test chrome'], 1, '--project=chrome runs only the tests configured under the project named "chrome" in playwright.config.ts.'],
        ['What does test.skip() do?', ['Marks a test to fail', 'Skips the test (it does not run) and marks it as skipped in the report', 'Runs the test slowly', 'Takes a screenshot'], 1, 'test.skip() excludes a test from the run and marks it as "skipped" in the report — useful for known issues.'],
        ['How do you run only tests tagged @smoke?', ['npx playwright test --tag=smoke', 'npx playwright test --grep @smoke', 'npx playwright test @smoke', 'npx playwright test -t smoke'], 1, '--grep filters tests by a pattern matching the test title. @smoke in the title allows: npx playwright test --grep @smoke'],
        ['What does npx playwright test --debug do?', ['Runs tests without output', 'Opens the Playwright Inspector for step-by-step debugging', 'Runs in headless mode', 'Shows only failed tests'], 1, '--debug opens the Playwright Inspector that lets you step through each action, inspect the DOM, and pause at any point.'],
        ['What command opens the HTML test report?', ['npx playwright open-report', 'npx playwright show-report', 'npx playwright test --report', 'npx playwright view-results'], 1, 'npx playwright show-report opens the last generated HTML report in your browser.'],
      ],
    ),
    makeLessonShell(
      'm3-l11', 'module-3', 11, 'Complete Test Suite', 'Putting it all together', 20,
      `## Building a Complete Test Suite

### The Full Picture

A production-ready Playwright suite combines all concepts:

\`\`\`
project/
├── playwright.config.ts       ← Config: browsers, baseURL, timeouts
├── pages/
│   ├── LoginPage.ts           ← POM: login page
│   ├── DashboardPage.ts       ← POM: dashboard
│   └── CheckoutPage.ts        ← POM: checkout
├── fixtures/
│   ├── auth.fixtures.ts       ← Custom fixtures: loggedInPage
│   └── test-data.ts           ← Test data: users, products
└── tests/
    ├── smoke/
    │   └── smoke.test.ts      ← @smoke: critical path
    └── e2e/
        ├── login.test.ts      ← Auth tests
        ├── products.test.ts   ← Product catalog
        └── checkout.test.ts   ← Full checkout flow
\`\`\`

### A Real End-to-End Test

\`\`\`typescript
// tests/e2e/checkout.test.ts
import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { testUsers } from '../fixtures/test-data';

test('@regression Complete purchase flow', async ({ page }) => {
  const login = new LoginPage(page);

  // Login
  await login.goto();
  await login.login(testUsers.customer.email, testUsers.customer.password);

  // Browse & add to cart
  await page.goto('/products');
  await page.getByTestId('product-laptop').click();
  await page.getByRole('button', { name: 'Add to Cart' }).click();
  await expect(page.locator('.cart-count')).toHaveText('1');

  // Checkout
  await page.goto('/cart');
  await page.getByRole('button', { name: 'Checkout' }).click();
  await expect(page).toHaveURL('/checkout');

  // Fill shipping
  await page.fill('#name', testUsers.customer.name);
  await page.fill('#address', '123 Test Street');
  await page.selectOption('#country', 'AU');

  // Place order
  await page.getByRole('button', { name: 'Place Order' }).click();
  await expect(page).toHaveURL('/order-confirmation');
  await expect(page.locator('h1')).toContainText('Order Confirmed');
});
\`\`\``,
      `// The complete suite architecture
const suiteStructure = {
  config: 'playwright.config.ts — browsers, baseURL, retries',
  pages: 'Page Objects — selectors + actions per page',
  fixtures: 'Custom fixtures — shared setup (auth, data)',
  testData: 'Static test data — users, products, orders',
  tests: 'Test files — organized by feature',
};

Object.entries(suiteStructure).forEach(([layer, desc]) => {
  console.log(layer + ': ' + desc);
});`,
      `import { test, expect } from '@playwright/test';

// A complete E2E test combining all concepts:
// - Variables (test data)
// - Functions (helper)
// - Objects (user data)
// - Async/await (every action)
// - Assertions (verification)
// - Error handling (screenshot on fail)

const testUser = { email: 'buyer@test.com', password: 'Buy@Test1' };

test('@smoke Purchase flow', async ({ page }) => {
  // Login
  await page.goto('/login');
  await page.fill('#email', testUser.email);
  await page.fill('#password', testUser.password);
  await page.click('[type=submit]');
  await expect(page).toHaveURL('/dashboard');

  // Add to cart
  await page.goto('/products');
  await page.getByTestId('product-1').click();
  await page.getByRole('button', { name: 'Add to Cart' }).click();

  // Verify cart
  const cartCount = page.locator('.cart-badge');
  await expect(cartCount).toHaveText('1');

  // Checkout
  await page.goto('/cart');
  await page.getByRole('button', { name: 'Checkout' }).click();
  await expect(page).toHaveURL('/checkout');
});`,
      `// Putting it all together — test architecture review

const allConcepts = [
  { concept: 'Variables', used_for: 'Store test data: emails, URLs, passwords' },
  { concept: 'Objects', used_for: 'Structured test users and expected data' },
  { concept: 'Arrays', used_for: 'Multiple test users, pages to test' },
  { concept: 'Functions', used_for: 'Reusable actions: login(), addToCart()' },
  { concept: 'Async/Await', used_for: 'Every Playwright action' },
  { concept: 'Conditions', used_for: 'Handle optional UI, role-based assertions' },
  { concept: 'Loops', used_for: 'Data-driven tests, verify multiple elements' },
  { concept: 'Try/Catch', used_for: 'Handle optional popups, screenshot on fail' },
  { concept: 'Import/Export', used_for: 'Organize code across files' },
  { concept: 'POM', used_for: 'Organize selectors and actions by page' },
  { concept: 'Fixtures', used_for: 'Reusable setup state across tests' },
];

console.log('Every JavaScript concept maps to a Playwright use case:\\n');
allConcepts.forEach(({ concept, used_for }) => {
  console.log(\`  ✓ \${concept}: \${used_for}\`);
});`,
      [
        ['Which Playwright concept reduces duplicated login code across tests?', ['Variables', 'Loops', 'Fixtures / Page Objects', 'Screenshots'], 2, 'Custom fixtures and Page Objects both reduce repetition. Fixtures handle state setup; POM handles selector/action reuse.'],
        ['In a test suite, where should test user data be stored?', ['Directly in each test file', 'In a shared fixtures/test-data.ts file imported by tests', 'In playwright.config.ts', 'In the browser localStorage'], 1, 'Centralizing test data in a shared file means updates in one place, consistent data across all tests.'],
        ['What is the correct order to structure a test suite?', ['Config → Tests → Pages → Fixtures', 'Fixtures → Config → Pages → Tests', 'Config → Pages → Fixtures → Tests', 'Tests → Config → Fixtures → Pages'], 2, 'Build bottom-up: Config (foundation) → Pages (selectors/actions) → Fixtures (state setup) → Tests (business logic).'],
        ['What are @smoke tests?', ['Tests that cause errors', 'A small set of critical path tests that verify core functionality quickly', 'Tests that run on Firefox only', 'Tests that capture screenshots'], 1, 'Smoke tests verify that the most critical features work. They run fast and act as a quick sanity check after deployment.'],
        ['If the login button selector changes app-wide, what is the minimum change in a POM-based suite?', ['Update the selector in every test file', 'Update the selector in the LoginPage class only', 'Update playwright.config.ts', 'Re-run all tests'], 1, 'With POM, the selector lives only in LoginPage.ts. One change there propagates to all tests that use that page object.'],
      ],
    ),
  ],
};
