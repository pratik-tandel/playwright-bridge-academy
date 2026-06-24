import type { IModule } from '../types';

export const module1: IModule = {
  id: 'module-1',
  number: 1,
  title: 'Foundation',
  subtitle: 'Understanding the Automation World',
  description: 'Before writing a single line of code, understand why automation testing exists, what makes Playwright special, and how JavaScript connects to browser control.',
  icon: '🏗️',
  color: 'blue',
  lessons: [
    {
      id: 'm1-l1',
      moduleId: 'module-1',
      number: 1,
      title: 'What is Automation Testing?',
      subtitle: 'From clicking manually to scripting clicks',
      durationMinutes: 10,
      content: {
        manualScenario: `**Your current workflow as a Manual QA:**

Every time a new build is released, you:
1. Open the browser
2. Navigate to the login page
3. Type the username
4. Type the password
5. Click the Login button
6. Check if the dashboard loads correctly
7. Repeat this for 50+ scenarios

This works — but imagine doing this **100 times per day** across **5 different browsers**.`,
        whyJavaScript: `Automation testing replaces your manual clicks with **code instructions**. Instead of you clicking "Login", a program does it for you.

To write these instructions, you need a programming language. Playwright uses **JavaScript/TypeScript** — the language that browsers natively understand.`,
        theory: `## Automation Testing — The Big Picture

**Manual Testing:** A human runs test scenarios step by step.
**Automation Testing:** A program runs the same scenarios — faster, more reliably, repeatedly.

### Why Automate?

| Manual Testing | Automation Testing |
|---|---|
| Slow (minutes per test) | Fast (seconds per test) |
| Expensive for repetition | Cheap to re-run |
| Human error possible | Consistent execution |
| Limited to business hours | Runs 24/7 in CI/CD |

### What Automation Testing IS NOT

- It does not replace Manual Testing entirely
- It does not find exploratory bugs automatically
- It does not think — it only does what you tell it

### The Role of a QA Automation Engineer

You are still a **tester first** — you design the test scenarios. You now also write the code that executes those scenarios automatically.`,
        jsCode: `// This is what an automation instruction looks like in JavaScript
// Think of it as writing down your manual test steps

// Step 1: Tell the program to go to a URL
// (Like typing it in the browser address bar)
const url = 'https://example.com/login';

// Step 2: Prepare the test data
const email = 'admin@test.com';
const password = 'SecurePass123';

// Step 3: The test steps follow in sequence
console.log('Starting login test...');
console.log('URL:', url);
console.log('User:', email);`,
        playwrightCode: `import { test, expect } from '@playwright/test';

test('Login with admin credentials', async ({ page }) => {
  // Step 1: Navigate to URL (your manual step 1 & 2)
  await page.goto('https://example.com/login');

  // Step 2: Fill the email field (your manual step 3)
  await page.fill('#email', 'admin@test.com');

  // Step 3: Fill the password field (your manual step 4)
  await page.fill('#password', 'SecurePass123');

  // Step 4: Click login (your manual step 5)
  await page.click('button[type="submit"]');

  // Step 5: Check result (your manual step 6)
  await expect(page).toHaveURL('/dashboard');
});`,
        bridgeExplanation: `Every manual step you take maps directly to a Playwright command. The JavaScript code you write is simply a translation of your existing knowledge.`,
        bridgeSteps: [
          { step: 1, label: 'Manual Action', description: 'Type URL in browser', code: "// Open browser to URL\nconst url = 'https://example.com';", color: 'blue' },
          { step: 2, label: 'JavaScript', description: 'Store URL as variable', code: "const url = 'https://example.com';", color: 'violet' },
          { step: 3, label: 'Playwright', description: 'Navigate to URL', code: "await page.goto(url);", color: 'green' },
        ],
      },
      playground: {
        defaultCode: `// Welcome to your first automation concept!
// Try editing the test data below

const testUrl = 'https://example.com/login';
const testEmail = 'qa@mycompany.com';
const testPassword = 'TestPass123';

// This is what a Playwright test would look like:
// await page.goto(testUrl);
// await page.fill('#email', testEmail);
// await page.fill('#password', testPassword);
// await page.click('button[type="submit"]');

console.log('Test URL:', testUrl);
console.log('Testing with:', testEmail);`,
        language: 'typescript',
        hints: ['Try changing the testUrl value', 'Variables store your test data', 'The comments show Playwright usage'],
        patterns: [
          { regex: 'testUrl', outputLines: ['✓ URL variable defined', '✓ Test will navigate to: https://example.com/login'] },
          { regex: 'testEmail', outputLines: ['✓ Email variable defined', '✓ Will fill #email field with this value'] },
          { regex: 'testPassword', outputLines: ['✓ Password variable defined', '✓ Will fill #password field with this value'] },
          { regex: 'console\\.log', outputLines: ['📋 Output logged to console'] },
        ],
        successMessage: 'Great! You understand the concept of automation variables.',
      },
      quiz: [
        {
          id: 'm1-l1-q1',
          type: 'multiple-choice',
          question: 'What is the main advantage of automation testing over manual testing for regression suites?',
          options: ['Automation finds more bugs', 'Automation can run the same tests repeatedly without human effort', 'Automation replaces manual testing entirely', 'Automation is always more accurate'],
          correctIndex: 1,
          explanation: 'Automation excels at running the same tests repeatedly (regression), saving time and human effort. It does not replace all manual testing.',
          points: 10,
        },
        {
          id: 'm1-l1-q2',
          type: 'multiple-choice',
          question: 'Why does Playwright use JavaScript/TypeScript?',
          options: ['Because it is the only programming language', 'Because JavaScript is the native language of browsers', 'Because it is the easiest language to learn', 'Because Playwright was built by JavaScript developers'],
          correctIndex: 1,
          explanation: 'Browsers run JavaScript natively. Playwright leverages this to control browser behavior with precision.',
          points: 10,
        },
        {
          id: 'm1-l1-q3',
          type: 'code-reading',
          question: 'What does this code represent in automation terms?',
          code: "const email = 'admin@test.com';\nawait page.fill('#email', email);",
          options: ['Creating a user account', 'Storing test data in a variable and using it to fill a form field', 'Validating the email format', 'Checking if the field exists'],
          correctIndex: 1,
          explanation: 'The first line stores test data in a variable. The second line uses that variable to fill the #email field — exactly like you would type it manually.',
          points: 10,
        },
        {
          id: 'm1-l1-q4',
          type: 'true-false',
          question: 'Automation testing completely eliminates the need for Manual QA engineers.',
          options: ['True', 'False'],
          correctIndex: 1,
          explanation: 'False. Manual QA engineers are still needed for exploratory testing, usability testing, and designing the automation scenarios that code executes.',
          points: 10,
        },
        {
          id: 'm1-l1-q5',
          type: 'multiple-choice',
          question: 'Which Playwright command corresponds to manually typing in the browser address bar?',
          options: ['page.fill()', 'page.click()', 'page.goto()', 'page.type()'],
          correctIndex: 2,
          explanation: 'page.goto() navigates to a URL, just like typing an address in the browser bar.',
          points: 10,
        },
      ],
    },
    {
      id: 'm1-l2',
      moduleId: 'module-1',
      number: 2,
      title: 'Why Playwright?',
      subtitle: 'The modern browser automation tool',
      durationMinutes: 12,
      content: {
        manualScenario: `**Testing a web app across multiple browsers:**

Your team needs to verify that the checkout flow works on:
- Chrome (desktop and mobile)
- Firefox
- Safari (iOS)
- Edge

Doing this manually = 4× the effort for every test run.`,
        whyJavaScript: `Playwright was built by Microsoft specifically to solve cross-browser automation. It uses JavaScript/TypeScript as its language because they wanted engineers to write tests that run on any browser without changing the code.`,
        theory: `## What is Playwright?

Playwright is a **browser automation library** created by Microsoft. It lets you write code that controls Chrome, Firefox, and Safari — from one codebase.

### Key Capabilities

- **Cross-browser**: Chrome, Firefox, WebKit (Safari) — one test runs on all
- **Auto-wait**: Playwright automatically waits for elements before interacting (no manual \`sleep()\` calls)
- **Screenshots & Videos**: Capture failures automatically
- **Network interception**: Mock API responses in tests
- **Mobile emulation**: Test mobile viewports without a physical device
- **Parallel execution**: Run 100 tests simultaneously

### Playwright vs Selenium

| Feature | Playwright | Selenium |
|---|---|---|
| Speed | Fast | Slower |
| Auto-wait | Built-in | Manual |
| Browser support | Chrome, Firefox, Safari | Same |
| Setup complexity | Simple | Complex |
| API design | Modern async | Older |

### The Test Runner

Playwright comes with its own test runner: \`@playwright/test\`. It provides:
- Test organization (\`test.describe\`, \`test\`)
- Assertions (\`expect\`)
- Fixtures (\`page\`, \`browser\`, \`context\`)
- Parallel execution
- HTML reports`,
        jsCode: `// Playwright test file structure
// Every test file follows this pattern

import { test, expect } from '@playwright/test';

// Group related tests together
test.describe('Checkout Flow', () => {

  // Each test is one scenario you would test manually
  test('Add item to cart', async ({ page }) => {
    // Test steps go here
    await page.goto('/products');
    await page.click('[data-testid="add-to-cart"]');
    await expect(page.locator('.cart-count')).toHaveText('1');
  });

  test('Complete checkout', async ({ page }) => {
    // Another test
    await page.goto('/cart');
    await page.click('#checkout-button');
    await expect(page).toHaveURL('/checkout');
  });
});`,
        playwrightCode: `// Running across browsers is just a config change
// playwright.config.ts

import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  projects: [
    { name: 'chrome',  use: { ...devices['Desktop Chrome'] } },
    { name: 'firefox', use: { ...devices['Desktop Firefox'] } },
    { name: 'safari',  use: { ...devices['Desktop Safari'] } },
    { name: 'mobile',  use: { ...devices['iPhone 12'] } },
  ],
});

// Your ONE test file now runs on ALL four browsers automatically`,
        bridgeExplanation: 'Playwright turns your multi-browser test matrix from manual work into a configuration file.',
        bridgeSteps: [
          { step: 1, label: 'Manual', description: 'Test on Chrome manually', code: '// Open Chrome\n// Navigate to app\n// Run 20 steps...', color: 'blue' },
          { step: 2, label: 'Playwright Test', description: 'Write once', code: "test('checkout', async ({ page }) => {\n  // steps\n});", color: 'violet' },
          { step: 3, label: 'Config', description: 'Run on all browsers', code: "projects: [\n  { name: 'chrome' },\n  { name: 'firefox' },\n  { name: 'safari' },\n]", color: 'green' },
        ],
      },
      playground: {
        defaultCode: `// Explore Playwright's project configuration concept
// This shows how one test config targets multiple browsers

const playwrightConfig = {
  projects: [
    { name: 'chrome',  browser: 'chromium' },
    { name: 'firefox', browser: 'firefox' },
    { name: 'safari',  browser: 'webkit' },
  ],
  // How many tests to run at the same time
  workers: 4,
  // Where to save test reports
  reporter: 'html',
};

console.log('Browsers configured:', playwrightConfig.projects.length);
console.log('Workers:', playwrightConfig.workers);`,
        language: 'typescript',
        hints: ['Try adding a mobile project to the projects array', 'workers controls parallel execution'],
        patterns: [
          { regex: 'projects', outputLines: ['✓ Browser projects configured'] },
          { regex: 'workers', outputLines: ['✓ Parallel execution enabled'] },
          { regex: 'reporter', outputLines: ['✓ HTML report will be generated after tests'] },
        ],
        successMessage: 'You understand Playwright project configuration!',
      },
      quiz: [
        { id: 'm1-l2-q1', type: 'multiple-choice', question: 'What makes Playwright different from running manual tests across browsers?', options: ['Playwright is faster to set up', 'One Playwright test automatically runs on Chrome, Firefox, and Safari', 'Playwright only works on Chrome', 'Playwright tests run on a remote server'], correctIndex: 1, explanation: 'With the projects configuration, a single Playwright test file executes across all configured browsers.', points: 10 },
        { id: 'm1-l2-q2', type: 'multiple-choice', question: 'What is "auto-wait" in Playwright?', options: ['A feature that pauses tests for 5 seconds', 'Playwright waits for elements to be ready before interacting with them', 'A sleep function', 'Automatic test scheduling'], correctIndex: 1, explanation: 'Auto-wait means Playwright checks that an element is visible, enabled, and stable before clicking or typing — no manual sleep() calls needed.', points: 10 },
        { id: 'm1-l2-q3', type: 'code-reading', question: 'What does this Playwright config setting do?', code: "workers: 4", options: ['Limits tests to 4 per file', 'Runs 4 tests simultaneously in parallel', 'Sets 4 second timeout', 'Creates 4 browser windows'], correctIndex: 1, explanation: 'workers: 4 means Playwright runs 4 tests at the same time, dramatically speeding up your test suite.', points: 10 },
        { id: 'm1-l2-q4', type: 'multiple-choice', question: 'Which company created Playwright?', options: ['Google', 'Facebook', 'Microsoft', 'Netflix'], correctIndex: 2, explanation: 'Playwright was created by Microsoft, built by the same team that worked on Puppeteer at Google.', points: 10 },
        { id: 'm1-l2-q5', type: 'true-false', question: 'You need to write separate test code for Chrome, Firefox, and Safari in Playwright.', options: ['True', 'False'], correctIndex: 1, explanation: 'False. You write one test, and Playwright executes it on all browsers configured in playwright.config.ts.', points: 10 },
      ],
    },
    {
      id: 'm1-l3',
      moduleId: 'module-1',
      number: 3,
      title: 'The Browser & DOM',
      subtitle: 'How browsers render pages and why it matters for testing',
      durationMinutes: 15,
      content: {
        manualScenario: `**Inspecting elements in manual testing:**

When you manually test a form, you right-click → "Inspect Element" to find:
- The button's ID
- The input's name attribute
- What class an error message has

Playwright uses this exact same DOM structure to find and interact with elements.`,
        whyJavaScript: `The DOM (Document Object Model) is a JavaScript object that represents the entire webpage. When you write \`page.fill('#email', value)\`, Playwright uses JavaScript to find the element with id="email" in the DOM and sets its value.`,
        theory: `## The Browser & DOM

### How a Browser Renders a Page

1. Downloads HTML
2. Parses HTML → creates **DOM** (tree of elements)
3. Downloads CSS → applies styles
4. Downloads JavaScript → executes scripts
5. Displays the final result

### The DOM Tree

Every webpage is a tree structure:

\`\`\`
document
└── html
    ├── head
    │   └── title: "Login Page"
    └── body
        ├── h1: "Welcome"
        └── form
            ├── input[id="email"]
            ├── input[id="password"]
            └── button: "Login"
\`\`\`

### CSS Selectors — Finding Elements

Playwright uses CSS selectors to find elements (just like DevTools):

| Selector | Example | Finds |
|---|---|---|
| ID | \`#email\` | \`<input id="email">\` |
| Class | \`.btn-primary\` | \`<button class="btn-primary">\` |
| Tag | \`button\` | Any \`<button>\` element |
| Attribute | \`[type="submit"]\` | Elements with type="submit" |
| Text | \`text=Login\` | Elements containing "Login" |

### data-testid — The Testing Best Practice

The best practice is to add \`data-testid\` attributes to elements:

\`\`\`html
<button data-testid="login-submit">Login</button>
\`\`\`

Then in Playwright:
\`\`\`
page.getByTestId('login-submit')
\`\`\`

This makes tests resilient to style/class changes.`,
        jsCode: `// DOM selector examples

// 1. Find by ID
const emailField = '#email';

// 2. Find by class
const errorMessage = '.error-message';

// 3. Find by attribute
const submitButton = '[type="submit"]';

// 4. Find by data-testid (BEST PRACTICE)
const loginButton = '[data-testid="login-submit"]';

// 5. Find by text content
const heading = 'h1:text("Welcome")';

console.log('Email selector:', emailField);
console.log('Submit selector:', submitButton);
console.log('Best practice selector:', loginButton);`,
        playwrightCode: `import { test, expect } from '@playwright/test';

test('DOM interaction examples', async ({ page }) => {
  await page.goto('/login');

  // Find by ID selector
  await page.fill('#email', 'user@test.com');

  // Find by data-testid (recommended)
  await page.getByTestId('password-input').fill('password123');

  // Find by text
  await page.getByText('Forgot Password?').click();

  // Find by role (most accessible)
  await page.getByRole('button', { name: 'Login' }).click();

  // Assert element is visible
  await expect(page.getByText('Welcome back!')).toBeVisible();
});`,
        bridgeExplanation: 'Playwright locators mirror the way you find elements in browser DevTools — the knowledge transfers directly.',
        bridgeSteps: [
          { step: 1, label: 'Manual', description: 'Right-click → Inspect → copy selector', code: '// Inspecting: <input id="email">\n// ID = "email"', color: 'blue' },
          { step: 2, label: 'CSS Selector', description: 'Construct the selector', code: "const selector = '#email';", color: 'violet' },
          { step: 3, label: 'Playwright', description: 'Use selector to interact', code: "await page.fill('#email', 'test@test.com');", color: 'green' },
        ],
      },
      playground: {
        defaultCode: `// Practice CSS selectors
// These represent how you would target elements on a login page

// The HTML we're targeting:
// <form id="login-form">
//   <input id="email" type="email" />
//   <input id="password" type="password" />
//   <button data-testid="submit-btn" type="submit">Login</button>
//   <span class="error-message">Invalid credentials</span>
// </form>

const selectors = {
  form: '#login-form',
  email: '#email',
  password: '#password',
  submitButton: '[data-testid="submit-btn"]',
  errorMessage: '.error-message',
};

// In Playwright, you'd use these like:
// await page.fill(selectors.email, 'user@test.com');
// await page.click(selectors.submitButton);

console.log('Selectors ready:', Object.keys(selectors).length);`,
        language: 'typescript',
        hints: ['Try adding a selector for a heading: h1', 'data-testid selectors are most resilient'],
        patterns: [
          { regex: '#email', outputLines: ['✓ ID selector: targets <input id="email">'] },
          { regex: 'data-testid', outputLines: ['✓ data-testid selector: best practice for automation'] },
          { regex: '\\.error', outputLines: ['✓ Class selector: targets element with class="error-message"'] },
        ],
        successMessage: 'You know how to build CSS selectors for automation!',
      },
      quiz: [
        { id: 'm1-l3-q1', type: 'multiple-choice', question: 'What does DOM stand for?', options: ['Document Output Model', 'Document Object Model', 'Data Object Method', 'Dynamic Object Module'], correctIndex: 1, explanation: 'DOM stands for Document Object Model — a tree structure representing the HTML elements of a page.', points: 10 },
        { id: 'm1-l3-q2', type: 'code-reading', question: 'Which selector targets an element with id="submit-btn"?', code: `<button id="submit-btn">Submit</button>`, options: ['.submit-btn', '#submit-btn', 'submit-btn', '[submit-btn]'], correctIndex: 1, explanation: 'The # prefix targets elements by their id attribute in CSS selectors.', points: 10 },
        { id: 'm1-l3-q3', type: 'multiple-choice', question: 'What is the recommended way to select elements for automation testing?', options: ['By CSS class', 'By element tag', 'By data-testid attribute', 'By XPath'], correctIndex: 2, explanation: 'data-testid attributes are specifically for testing — they do not change when designers update classes or styles.', points: 10 },
        { id: 'm1-l3-q4', type: 'code-reading', question: 'What Playwright locator would you use to find this button?', code: `<button data-testid="checkout-btn">Checkout</button>`, options: ["page.locator('.checkout-btn')", "page.getByTestId('checkout-btn')", "page.getByText('data-testid')", "page.find('#checkout-btn')"], correctIndex: 1, explanation: 'page.getByTestId() is the Playwright method for targeting elements by their data-testid attribute.', points: 10 },
        { id: 'm1-l3-q5', type: 'true-false', question: 'Playwright uses the same DOM structure and CSS selectors that you see in browser DevTools.', options: ['True', 'False'], correctIndex: 0, explanation: 'True! Playwright interacts with the same DOM you inspect in browser DevTools. Your DevTools knowledge transfers directly.', points: 10 },
      ],
    },
  ],
};
