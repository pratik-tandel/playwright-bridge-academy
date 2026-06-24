import type { IModule } from '../types';

export const module2: IModule = {
  id: 'module-2',
  number: 2,
  title: 'JavaScript for QAs',
  subtitle: 'Only the concepts you need for Playwright',
  description: 'Learn JavaScript not as a programmer, but as a QA engineer. Every concept is taught through automation testing scenarios.',
  icon: '⚡',
  color: 'yellow',
  certificateId: 'explorer',
  lessons: [
    {
      id: 'm2-l1',
      moduleId: 'module-2',
      number: 1,
      title: 'Variables',
      subtitle: 'Store your test data',
      durationMinutes: 12,
      content: {
        manualScenario: `**Manual Testing Scenario:**

You are testing a login form. You need to test with:
- Admin user: admin@test.com / Admin@123
- Regular user: user@test.com / User@123
- Invalid user: wrong@email.com / wrongpass

Currently, you type these credentials fresh every single time you run the test. If the password policy changes, you update it in 20 different places.`,
        whyJavaScript: `**Variables** are how you store test data once and reuse it everywhere. Instead of typing \`admin@test.com\` 10 times, you store it in a variable and reference it 10 times. When the email changes, you update one place.`,
        theory: `## Variables — Storing Test Data

A variable is a **named container** that holds a value.

### \`const\` vs \`let\`

\`\`\`typescript
// const — value never changes (use this by default)
const adminEmail = 'admin@test.com';
const baseUrl = 'https://myapp.com';

// let — value can change (use when you need to update it)
let currentPage = 1;
let searchQuery = '';
currentPage = 2; // ✓ OK to update let
// adminEmail = 'new@test.com'; // ✗ ERROR — cannot update const
\`\`\`

### Naming Rules

\`\`\`typescript
// ✓ camelCase — standard JavaScript convention
const adminEmail = 'admin@test.com';
const isLoggedIn = true;
const userCount = 42;

// ✗ These would cause errors
// const 1user = 'bob';        // Cannot start with number
// const my-email = 'bob';     // Cannot contain hyphens
// const class = 'admin';      // Cannot use reserved words
\`\`\`

### Data Types

\`\`\`typescript
const email = 'admin@test.com';   // string (text)
const retryCount = 3;              // number
const isHeadless = true;           // boolean (true/false)
const pageTitle = null;            // null (intentionally empty)
\`\`\`

### Why const by default?

In Playwright tests, most test data does not change during a test run. Using \`const\` signals to other developers (and yourself) that this value is intentionally stable.`,
        jsCode: `// Test data stored in variables
const baseUrl = 'https://myapp.com';
const adminEmail = 'admin@test.com';
const adminPassword = 'Admin@123';

const regularEmail = 'user@test.com';
const regularPassword = 'User@123';

// Variables make tests reusable — change once, works everywhere
console.log('Testing URL:', baseUrl);
console.log('Admin login:', adminEmail);

// Using let for things that change during a test
let currentRetry = 0;
currentRetry = 1;
console.log('Retry attempt:', currentRetry);`,
        playwrightCode: `import { test, expect } from '@playwright/test';

// Variables defined outside tests are shared across the file
const baseUrl = 'https://myapp.com';
const adminEmail = 'admin@test.com';
const adminPassword = 'Admin@123';

test('Admin can log in', async ({ page }) => {
  // Variables are used in Playwright actions
  await page.goto(baseUrl + '/login');

  // Instead of hardcoding, we use variables
  await page.fill('#email', adminEmail);
  await page.fill('#password', adminPassword);
  await page.click('button[type="submit"]');

  await expect(page).toHaveURL(baseUrl + '/dashboard');
});

test('Regular user can log in', async ({ page }) => {
  // Same URL variable reused — if baseUrl changes, update once
  await page.goto(baseUrl + '/login');
  await page.fill('#email', 'user@test.com');
});`,
        bridgeExplanation: 'Variables store your test credentials and URLs once, making every test more maintainable.',
        bridgeSteps: [
          { step: 1, label: 'Manual Testing', description: 'Type credentials each time', code: '// Type in browser:\n// admin@test.com\n// Admin@123', color: 'blue' },
          { step: 2, label: 'JavaScript Variable', description: 'Store credentials once', code: "const email = 'admin@test.com';\nconst password = 'Admin@123';", color: 'yellow' },
          { step: 3, label: 'Playwright Usage', description: 'Use variables in actions', code: "await page.fill('#email', email);\nawait page.fill('#password', password);", color: 'green' },
        ],
      },
      playground: {
        defaultCode: `// Create variables for a test scenario
// Scenario: Testing a product search feature

// Store the base URL
const baseUrl = 'https://shop.example.com';

// Store search terms to test
const validSearch = 'laptop';
const emptySearch = '';

// Store expected results
const expectedResultCount = 10;
const expectedPageTitle = 'Search Results';

// Simulate using these in a test
console.log('Testing search on:', baseUrl);
console.log('Search term:', validSearch);
console.log('Expecting:', expectedResultCount, 'results');`,
        language: 'typescript',
        hints: [
          'Use const for values that do not change',
          'Use let for values that might change during testing',
          'camelCase naming: baseUrl, searchTerm, expectedCount',
        ],
        patterns: [
          { regex: 'const\\s+\\w+', outputLines: ['✓ Constant variable declared'] },
          { regex: 'let\\s+\\w+', outputLines: ['✓ Mutable variable declared'] },
          { regex: 'console\\.log', outputLines: ['📋 Variable value logged'] },
        ],
        successMessage: '✓ You can declare and use variables in test code!',
      },
      quiz: [
        { id: 'm2-l1-q1', type: 'multiple-choice', question: 'Which keyword should you use when a variable\'s value will never change?', options: ['let', 'var', 'const', 'static'], correctIndex: 2, explanation: 'const declares a constant — a variable whose value cannot be reassigned. Use it by default for test data that stays the same.', points: 10 },
        { id: 'm2-l1-q2', type: 'multiple-choice', question: 'You need to store a URL that stays the same across all tests. Which is best?', options: ["let baseUrl = 'https://app.com'", "const baseUrl = 'https://app.com'", "var baseUrl = 'https://app.com'", "url = 'https://app.com'"], correctIndex: 1, explanation: "const is best for a URL that does not change. It signals intent and prevents accidental reassignment.", points: 10 },
        { id: 'm2-l1-q3', type: 'code-reading', question: 'What is wrong with this code?', code: "const retryCount = 0;\nretryCount = 1;", options: ['Nothing is wrong', 'Cannot reassign a const variable', 'retryCount is not a valid name', 'The number 1 is invalid'], correctIndex: 1, explanation: 'const variables cannot be reassigned after declaration. Use let if the value needs to change.', points: 10 },
        { id: 'm2-l1-q4', type: 'multiple-choice', question: 'What naming convention is standard for JavaScript variables?', options: ['PascalCase: BaseUrl', 'snake_case: base_url', 'camelCase: baseUrl', 'UPPER_CASE: BASEURL'], correctIndex: 2, explanation: 'JavaScript variables use camelCase: first word lowercase, each subsequent word capitalized. Example: baseUrl, adminEmail, pageTitle.', points: 10 },
        { id: 'm2-l1-q5', type: 'code-reading', question: 'What value does adminEmail hold?', code: "const adminEmail = 'admin@test.com';\nconsole.log(adminEmail);", options: ["'admin'", "'test.com'", "'admin@test.com'", 'undefined'], correctIndex: 2, explanation: "The variable adminEmail holds the string value 'admin@test.com' as assigned.", points: 10 },
      ],
    },
    {
      id: 'm2-l2',
      moduleId: 'module-2',
      number: 2,
      title: 'Strings',
      subtitle: 'Working with text in tests',
      durationMinutes: 14,
      content: {
        manualScenario: `**Manual Testing Scenario:**

You need to verify that after login, the page shows:
"Welcome back, John Smith!"

And the page title is: "Dashboard — MyApp"

You also need to construct dynamic URLs like:
- /users/123/profile
- /users/456/profile

Every user has a different ID, so the URL changes.`,
        whyJavaScript: `Strings are text values. In Playwright, you constantly work with text — URLs, input values, assertions, selectors. **Template literals** let you build dynamic strings by embedding variables directly.`,
        theory: `## Strings — Text in Your Tests

### Creating Strings

\`\`\`typescript
const name = 'John Smith';           // single quotes
const title = "Dashboard — MyApp";   // double quotes (both are fine)
const message = \`Welcome back, \${name}!\`;  // template literal (backticks)
\`\`\`

### Template Literals — Build Dynamic Text

Template literals use backticks (\`) and \`\${}\` to embed variables:

\`\`\`typescript
const userId = '123';
const baseUrl = 'https://app.com';

// Without template literal (messy)
const url = baseUrl + '/users/' + userId + '/profile';

// With template literal (clean)
const url = \`\${baseUrl}/users/\${userId}/profile\`;

console.log(url); // https://app.com/users/123/profile
\`\`\`

### Useful String Methods

\`\`\`typescript
const email = '  Admin@Test.COM  ';

email.toLowerCase()  // 'admin@test.com'
email.toUpperCase()  // '  ADMIN@TEST.COM  '
email.trim()         // 'Admin@Test.COM' (removes spaces)
email.includes('@')  // true
email.startsWith(' ')// true
email.replace('Admin', 'user')  // '  user@Test.COM  '

// Get specific characters
const pageTitle = 'Login Page';
pageTitle.length     // 10
pageTitle[0]         // 'L'
pageTitle.slice(0, 5) // 'Login'
\`\`\``,
        jsCode: `// String operations for testing

const baseUrl = 'https://myapp.com';
const userId = '42';
const userName = 'Jane Doe';

// Template literal — build dynamic URL
const profileUrl = \`\${baseUrl}/users/\${userId}/profile\`;
console.log('Profile URL:', profileUrl);

// Template literal — build expected message
const welcomeMessage = \`Welcome back, \${userName}!\`;
console.log('Expected message:', welcomeMessage);

// String methods for data cleaning
const rawInput = '  admin@TEST.com  ';
const cleanEmail = rawInput.trim().toLowerCase();
console.log('Cleaned email:', cleanEmail);

// Check if string contains something
const errorText = 'Invalid email address';
console.log('Has "email":', errorText.includes('email'));`,
        playwrightCode: `import { test, expect } from '@playwright/test';

const baseUrl = 'https://myapp.com';
const userId = '42';
const userName = 'Jane Doe';

test('Dynamic URL navigation', async ({ page }) => {
  // Template literal builds the URL dynamically
  const profileUrl = \`\${baseUrl}/users/\${userId}/profile\`;
  await page.goto(profileUrl);

  // Assert welcome message with template literal
  const expectedMessage = \`Welcome back, \${userName}!\`;
  await expect(page.locator('.welcome-msg')).toHaveText(expectedMessage);
});

test('Validate page title', async ({ page }) => {
  await page.goto(\`\${baseUrl}/dashboard\`);

  // toContain checks if string includes a substring
  await expect(page).toHaveTitle(/Dashboard/);

  // Get element text and check it
  const titleText = await page.locator('h1').textContent();
  console.log('Page title:', titleText?.trim().toLowerCase());
});`,
        bridgeExplanation: 'Template literals replace string concatenation, making dynamic URLs and expected messages much cleaner to write.',
        bridgeSteps: [
          { step: 1, label: 'Manual', description: 'Navigate to user-specific URL', code: '// Manually type:\n// /users/42/profile', color: 'blue' },
          { step: 2, label: 'Template Literal', description: 'Build URL dynamically', code: "const url = `${baseUrl}/users/${userId}/profile`;", color: 'yellow' },
          { step: 3, label: 'Playwright', description: 'Navigate to dynamic URL', code: "await page.goto(`${baseUrl}/users/${userId}/profile`);", color: 'green' },
        ],
      },
      playground: {
        defaultCode: `// Practice template literals for test URLs and messages
const baseUrl = 'https://shop.example.com';
const productId = 'PROD-001';
const productName = 'Wireless Keyboard';
const expectedPrice = '$49.99';

// Build a product URL using template literal
const productUrl = \`\${baseUrl}/products/\${productId}\`;

// Build expected page title
const expectedTitle = \`\${productName} — Shop\`;

// Build assertion message
const assertionMessage = \`Product \${productName} should cost \${expectedPrice}\`;

console.log('Navigate to:', productUrl);
console.log('Expect title:', expectedTitle);
console.log('Assertion:', assertionMessage);`,
        language: 'typescript',
        hints: ['Template literals use backticks, not single quotes', 'Embed variables with ${variableName}', 'String.trim() removes leading/trailing spaces'],
        patterns: [
          { regex: '`.*\\$\\{', outputLines: ['✓ Template literal with variable interpolation'] },
          { regex: '\\.trim\\(\\)', outputLines: ['✓ Whitespace removed from string'] },
          { regex: '\\.toLowerCase\\(\\)', outputLines: ['✓ String normalized to lowercase'] },
          { regex: '\\.includes\\(', outputLines: ['✓ Checking if string contains value'] },
        ],
        successMessage: '✓ You can build dynamic strings for your tests!',
      },
      quiz: [
        { id: 'm2-l2-q1', type: 'multiple-choice', question: 'What character wraps a template literal?', options: ['Single quote \'', 'Double quote "', 'Backtick `', 'Parenthesis ()'], correctIndex: 2, explanation: 'Template literals use backticks (`). This allows you to embed variables with ${} syntax.', points: 10 },
        { id: 'm2-l2-q2', type: 'code-reading', question: 'What does this produce?', code: "const id = '99';\nconst url = `/users/${id}/edit`;", options: ['/users/id/edit', '/users/${id}/edit', '/users/99/edit', 'undefined'], correctIndex: 2, explanation: 'The template literal embeds the value of id (which is 99) into the string, producing /users/99/edit.', points: 10 },
        { id: 'm2-l2-q3', type: 'multiple-choice', question: 'Which string method removes extra whitespace from both ends?', options: ['.clean()', '.strip()', '.trim()', '.remove()'], correctIndex: 2, explanation: '.trim() removes whitespace (spaces, tabs, newlines) from the beginning and end of a string.', points: 10 },
        { id: 'm2-l2-q4', type: 'code-reading', question: 'What does this return?', code: "const text = 'Login Failed';\ntext.includes('Login');", options: ['false', 'true', "'Login'", 'null'], correctIndex: 1, explanation: '.includes() returns true because "Login Failed" does contain the substring "Login".', points: 10 },
        { id: 'm2-l2-q5', type: 'code-reading', question: 'What is the value of userName after this code?', code: "const raw = '  JohnDoe  ';\nconst userName = raw.trim();", options: ["'  JohnDoe  '", "'JohnDoe'", "'johndoe'", 'undefined'], correctIndex: 1, explanation: '.trim() removes the leading and trailing spaces, leaving just "JohnDoe".', points: 10 },
      ],
    },
    {
      id: 'm2-l3',
      moduleId: 'module-2',
      number: 3,
      title: 'Arrays',
      subtitle: 'Multiple test users, URLs, and data sets',
      durationMinutes: 15,
      content: {
        manualScenario: `**Manual Testing Scenario:**

You need to test that a product list shows items in alphabetical order.
The list contains: "Laptop", "Monitor", "Keyboard", "Mouse", "Webcam"

You also need to test the same login form with 5 different user accounts.

Currently you run the test 5 separate times, one per user.`,
        whyJavaScript: `Arrays let you store **lists of values**. In Playwright, arrays power **data-driven testing** — you loop through a list of test users or scenarios and run the same test for each.`,
        theory: `## Arrays — Lists of Test Data

### Creating Arrays

\`\`\`typescript
// Array of test emails
const testEmails = ['admin@test.com', 'user@test.com', 'guest@test.com'];

// Array of product names to verify
const expectedProducts = ['Keyboard', 'Laptop', 'Monitor', 'Mouse'];

// Mixed types (less common in tests)
const mixedData = ['hello', 42, true];
\`\`\`

### Accessing Elements

\`\`\`typescript
const users = ['Alice', 'Bob', 'Charlie'];

users[0]       // 'Alice'   (first element — index starts at 0)
users[1]       // 'Bob'
users[2]       // 'Charlie'
users.length   // 3
\`\`\`

### Useful Array Methods

\`\`\`typescript
const products = ['Monitor', 'Laptop', 'Keyboard'];

// Add / remove
products.push('Mouse');      // add to end
products.pop();              // remove from end

// Search
products.includes('Laptop')  // true
products.indexOf('Monitor')  // 0

// Transform (returns new array)
products.map(p => p.toUpperCase())
// ['MONITOR', 'LAPTOP', 'KEYBOARD']

products.filter(p => p.length > 6)
// ['Monitor', 'Keyboard']  (only items longer than 6 chars)

products.sort()
// ['Keyboard', 'Laptop', 'Monitor']  (alphabetical)
\`\`\``,
        jsCode: `// Arrays for test data management

const testUsers = [
  'admin@test.com',
  'manager@test.com',
  'user@test.com',
];

const expectedMenuItems = ['Dashboard', 'Users', 'Settings', 'Reports'];

// Check array length
console.log('Test users:', testUsers.length);

// Access specific elements
console.log('First user:', testUsers[0]);
console.log('Last user:', testUsers[testUsers.length - 1]);

// Check if item exists
console.log('Has admin?', testUsers.includes('admin@test.com'));

// Get sorted menu items for assertion
const sortedItems = [...expectedMenuItems].sort();
console.log('Sorted menu:', sortedItems);`,
        playwrightCode: `import { test, expect } from '@playwright/test';

const testUsers = [
  { email: 'admin@test.com', role: 'admin' },
  { email: 'user@test.com',  role: 'user' },
];

// Data-driven test — loop through users
for (const user of testUsers) {
  test(\`Login works for \${user.role}\`, async ({ page }) => {
    await page.goto('/login');
    await page.fill('#email', user.email);
    await page.fill('#password', 'Test@123');
    await page.click('button[type="submit"]');
    await expect(page).toHaveURL('/dashboard');
  });
}

test('Products display in order', async ({ page }) => {
  await page.goto('/products');

  // Get all product names from the page
  const productItems = page.locator('.product-name');
  const productNames = await productItems.allTextContents();

  // Verify the array has items
  expect(productNames.length).toBeGreaterThan(0);

  // Verify sorted order
  const sorted = [...productNames].sort();
  expect(productNames).toEqual(sorted);
});`,
        bridgeExplanation: 'Arrays turn one-at-a-time manual testing into a data-driven loop that runs the same test for every item in your list.',
        bridgeSteps: [
          { step: 1, label: 'Manual', description: 'Test 5 users one by one', code: '// Run test for admin...\n// Run test for user...\n// Run test for guest...', color: 'blue' },
          { step: 2, label: 'Array', description: 'Store all users in a list', code: "const users = [\n  'admin@test.com',\n  'user@test.com'\n];", color: 'yellow' },
          { step: 3, label: 'Playwright Loop', description: 'Run test for each user', code: "for (const user of users) {\n  test(`login: ${user}`, ...)\n}", color: 'green' },
        ],
      },
      playground: {
        defaultCode: `// Work with arrays of test data

// Test data: product names to verify on page
const expectedProducts = ['Laptop', 'Keyboard', 'Monitor', 'Mouse'];

// Test URLs to check
const pagesToTest = [
  '/home',
  '/products',
  '/cart',
  '/checkout',
];

// How many tests will run?
console.log('Products to verify:', expectedProducts.length);
console.log('Pages to test:', pagesToTest.length);

// First and last
console.log('First product:', expectedProducts[0]);
console.log('Last page:', pagesToTest[pagesToTest.length - 1]);

// Check if our critical page is in the list
const hasCriticalPage = pagesToTest.includes('/checkout');
console.log('Checkout included:', hasCriticalPage);`,
        language: 'typescript',
        hints: ['Access elements with array[0], array[1], etc.', 'array.length gives the count', 'array.includes(value) returns true or false'],
        patterns: [
          { regex: '\\[.*\\]', outputLines: ['✓ Array created with values'] },
          { regex: '\\.length', outputLines: ['✓ Array length accessed'] },
          { regex: '\\.includes\\(', outputLines: ['✓ Checking if value exists in array'] },
          { regex: '\\.push\\(', outputLines: ['✓ Added item to array'] },
        ],
        successMessage: '✓ You can work with arrays of test data!',
      },
      quiz: [
        { id: 'm2-l3-q1', type: 'multiple-choice', question: 'What is the index of the first element in a JavaScript array?', options: ['1', '0', '-1', 'first'], correctIndex: 1, explanation: 'JavaScript arrays are zero-indexed. The first element is at index 0, the second at index 1, etc.', points: 10 },
        { id: 'm2-l3-q2', type: 'code-reading', question: 'What does this expression evaluate to?', code: "const items = ['A', 'B', 'C'];\nitems.length;", options: ['2', '3', '4', 'items'], correctIndex: 1, explanation: 'The array has 3 elements (A, B, C), so .length returns 3.', points: 10 },
        { id: 'm2-l3-q3', type: 'multiple-choice', question: 'Which method adds an element to the END of an array?', options: ['.add()', '.append()', '.push()', '.insert()'], correctIndex: 2, explanation: '.push() adds one or more elements to the end of an array and returns the new length.', points: 10 },
        { id: 'm2-l3-q4', type: 'code-reading', question: 'What does this return?', code: "const pages = ['/home', '/login', '/cart'];\npages.includes('/login');", options: ['0', '1', 'false', 'true'], correctIndex: 3, explanation: ".includes() returns true because '/login' is in the array.", points: 10 },
        { id: 'm2-l3-q5', type: 'multiple-choice', question: 'In Playwright, what is the main benefit of using arrays for test data?', options: ['Tests run faster', 'Data-driven testing — run the same test for each item', 'Arrays are required by Playwright', 'Better error messages'], correctIndex: 1, explanation: 'Arrays enable data-driven testing: store multiple test scenarios, loop through them, run the same test logic for each — without duplicating code.', points: 10 },
      ],
    },
    {
      id: 'm2-l4',
      moduleId: 'module-2',
      number: 4,
      title: 'Objects',
      subtitle: 'Structured test data',
      durationMinutes: 15,
      content: {
        manualScenario: `**Manual Testing Scenario:**

You are testing a user registration form. Each test user has:
- email
- password
- first name
- last name
- role (admin/user/guest)

You have 10 test users. Managing these as separate variables becomes chaos.`,
        whyJavaScript: `Objects group related data together. A **test user object** keeps all properties of one user in one place. In Playwright, objects are your **test data models** — structured, readable, and easy to pass around.`,
        theory: `## Objects — Structured Test Data

### Creating Objects

\`\`\`typescript
const adminUser = {
  email: 'admin@test.com',
  password: 'Admin@123',
  firstName: 'John',
  lastName: 'Smith',
  role: 'admin',
};
\`\`\`

### Accessing Properties

\`\`\`typescript
// Dot notation (preferred)
console.log(adminUser.email);    // 'admin@test.com'
console.log(adminUser.role);     // 'admin'

// Bracket notation (use for dynamic keys)
const property = 'email';
console.log(adminUser[property]); // 'admin@test.com'
\`\`\`

### Updating Properties

\`\`\`typescript
const user = { name: 'Alice', isActive: false };

// Update a property
user.isActive = true;

// Add a new property
user.lastLogin = '2024-01-01';
\`\`\`

### Nested Objects

\`\`\`typescript
const testConfig = {
  baseUrl: 'https://app.com',
  credentials: {
    admin: { email: 'admin@test.com', password: 'Admin@123' },
    user:  { email: 'user@test.com',  password: 'User@123' },
  },
  timeouts: {
    short: 5000,
    long: 30000,
  },
};

// Access nested
console.log(testConfig.credentials.admin.email);
console.log(testConfig.timeouts.long);
\`\`\``,
        jsCode: `// Test user object
const adminUser = {
  email: 'admin@test.com',
  password: 'Admin@123',
  firstName: 'John',
  role: 'admin',
};

// Accessing properties
console.log('Email:', adminUser.email);
console.log('Role:', adminUser.role);

// Test configuration object
const testConfig = {
  baseUrl: 'https://myapp.com',
  credentials: {
    admin: { email: 'admin@test.com', password: 'Admin@123' },
    user: { email: 'user@test.com', password: 'User@123' },
  },
};

// Access nested properties
console.log('Admin email:', testConfig.credentials.admin.email);
console.log('Base URL:', testConfig.baseUrl);`,
        playwrightCode: `import { test, expect } from '@playwright/test';

// Test data as objects — clean, readable, easy to maintain
const testUsers = [
  { email: 'admin@test.com', password: 'Admin@123', expectedPage: '/admin' },
  { email: 'user@test.com',  password: 'User@123',  expectedPage: '/dashboard' },
];

for (const user of testUsers) {
  test(\`Login redirects \${user.email} correctly\`, async ({ page }) => {
    await page.goto('/login');

    // Use object properties directly
    await page.fill('#email', user.email);
    await page.fill('#password', user.password);
    await page.click('[type="submit"]');

    // Each user has their expected redirect page
    await expect(page).toHaveURL(user.expectedPage);
  });
}`,
        bridgeExplanation: 'Objects bundle related test data (email, password, expected outcome) into one unit — like a row in your test spreadsheet.',
        bridgeSteps: [
          { step: 1, label: 'Test Spreadsheet', description: 'Row with email, password, expected result', code: '// Email | Password | Expected\n// admin | Admin@123 | /admin', color: 'blue' },
          { step: 2, label: 'JavaScript Object', description: 'Same data as an object', code: "const user = {\n  email: 'admin@test.com',\n  password: 'Admin@123',\n  expected: '/admin'\n};", color: 'yellow' },
          { step: 3, label: 'Playwright', description: 'Use object properties', code: "await page.fill('#email', user.email);\nawait expect(page).toHaveURL(user.expected);", color: 'green' },
        ],
      },
      playground: {
        defaultCode: `// Model test data as objects

const productTestData = {
  name: 'Wireless Headphones',
  sku: 'WH-001',
  price: 79.99,
  inStock: true,
  category: 'Electronics',
};

const checkoutTestData = {
  shipping: {
    name: 'Jane Doe',
    address: '123 Test Street',
    city: 'Melbourne',
    postcode: '3000',
  },
  payment: {
    type: 'credit-card',
    last4: '4242',
  },
};

// Access properties
console.log('Product:', productTestData.name);
console.log('Price:', productTestData.price);
console.log('In stock:', productTestData.inStock);
console.log('Shipping to:', checkoutTestData.shipping.city);`,
        language: 'typescript',
        hints: ['Access nested objects with dot notation: obj.nested.property', 'Objects replace scattered variables', 'Arrays of objects = data-driven tests'],
        patterns: [
          { regex: '\\{[\\s\\S]*?\\}', outputLines: ['✓ Object created with properties'] },
          { regex: '\\.\\w+\\.\\w+', outputLines: ['✓ Nested object property accessed'] },
          { regex: 'console\\.log', outputLines: ['📋 Object property logged'] },
        ],
        successMessage: '✓ You can model test data with objects!',
      },
      quiz: [
        { id: 'm2-l4-q1', type: 'multiple-choice', question: 'How do you access the email property of a user object?', options: ['user[email]', 'user->email', 'user.email', 'email.user'], correctIndex: 2, explanation: 'Dot notation (user.email) is the standard way to access an object property in JavaScript.', points: 10 },
        { id: 'm2-l4-q2', type: 'code-reading', question: 'What does this log?', code: "const config = {\n  baseUrl: 'https://app.com',\n  timeout: 5000,\n};\nconsole.log(config.timeout);", options: ["'https://app.com'", "5000", "'timeout'", "undefined"], correctIndex: 1, explanation: 'config.timeout accesses the timeout property, which has the value 5000.', points: 10 },
        { id: 'm2-l4-q3', type: 'code-reading', question: 'How do you access the nested admin email?', code: "const data = {\n  credentials: {\n    admin: { email: 'admin@test.com' }\n  }\n};", options: ["data.credentials.email", "data.admin.email", "data.credentials.admin.email", "data['admin']['email']"], correctIndex: 2, explanation: 'To access nested objects, chain the dot notation: data.credentials.admin.email', points: 10 },
        { id: 'm2-l4-q4', type: 'multiple-choice', question: 'What best describes using objects for test data?', options: ['Objects make tests slower', 'Objects bundle related test properties together, like a row in a test spreadsheet', 'Objects are only for advanced users', 'Objects replace Playwright fixtures'], correctIndex: 1, explanation: 'Objects group related data (email + password + expected outcome) together — exactly like a row in a manual test spreadsheet.', points: 10 },
        { id: 'm2-l4-q5', type: 'code-reading', question: 'What is the value of user.role?', code: "const user = {\n  email: 'admin@test.com',\n  role: 'admin',\n  active: true,\n};\nconsole.log(user.role);", options: ["'email'", "'admin@test.com'", "'admin'", "true"], correctIndex: 2, explanation: "user.role accesses the role property, which holds the string value 'admin'.", points: 10 },
      ],
    },
    {
      id: 'm2-l5',
      moduleId: 'module-2',
      number: 5,
      title: 'Functions',
      subtitle: 'Reusable test actions',
      durationMinutes: 18,
      content: {
        manualScenario: `**Manual Testing Scenario:**

Every single test in your suite starts with:
1. Go to /login
2. Fill email
3. Fill password
4. Click submit

You are repeating these 4 steps in every test. That's 40 lines of code across 10 tests. When the login button selector changes, you update it in 10 places.`,
        whyJavaScript: `Functions let you name a block of code and reuse it. A \`login()\` function encapsulates your login steps. Every test calls \`login()\` instead of repeating the steps. When the login form changes, you fix it in one place.`,
        theory: `## Functions — Reusable Test Actions

### Function Declaration

\`\`\`typescript
// Declare a function (name the block of code)
function greet(name: string) {
  console.log(\`Hello, \${name}!\`);
}

// Call the function (execute it)
greet('Alice');   // Hello, Alice!
greet('Bob');     // Hello, Bob!
\`\`\`

### Arrow Functions (modern style)

\`\`\`typescript
// Arrow function — same thing, shorter syntax
const greet = (name: string) => {
  console.log(\`Hello, \${name}!\`);
};

// One-line arrow function
const double = (n: number) => n * 2;
console.log(double(5)); // 10
\`\`\`

### Parameters and Return Values

\`\`\`typescript
// Parameters: inputs to the function
// Return value: output of the function
function buildLoginUrl(baseUrl: string, redirect: string): string {
  return \`\${baseUrl}/login?redirect=\${redirect}\`;
}

const url = buildLoginUrl('https://app.com', 'dashboard');
console.log(url); // https://app.com/login?redirect=dashboard
\`\`\`

### Async Functions (for Playwright)

\`\`\`typescript
// async keyword means the function contains awaited operations
async function login(page: Page, email: string, password: string) {
  await page.fill('#email', email);
  await page.fill('#password', password);
  await page.click('button[type="submit"]');
}
\`\`\``,
        jsCode: `// Functions for reusable test actions

// Helper function to build test URLs
function buildUrl(path: string): string {
  const baseUrl = 'https://myapp.com';
  return \`\${baseUrl}\${path}\`;
}

console.log(buildUrl('/login'));      // https://myapp.com/login
console.log(buildUrl('/dashboard')); // https://myapp.com/dashboard

// Arrow function for generating test email
const generateTestEmail = (role: string): string => {
  return \`\${role}@test.com\`;
};

console.log(generateTestEmail('admin')); // admin@test.com
console.log(generateTestEmail('user'));  // user@test.com

// Function with multiple parameters
function createTestUser(email: string, role: string) {
  return { email, password: 'Test@123', role };
}

const admin = createTestUser('admin@test.com', 'admin');
console.log(admin);`,
        playwrightCode: `import { test, expect, type Page } from '@playwright/test';

const BASE_URL = 'https://myapp.com';

// Reusable login function — write once, use everywhere
async function login(page: Page, email: string, password: string) {
  await page.goto(\`\${BASE_URL}/login\`);
  await page.fill('#email', email);
  await page.fill('#password', password);
  await page.click('button[type="submit"]');
}

// Now every test calls login() instead of repeating steps
test('Admin dashboard loads', async ({ page }) => {
  await login(page, 'admin@test.com', 'Admin@123');
  await expect(page).toHaveURL('/admin/dashboard');
});

test('Admin can create user', async ({ page }) => {
  await login(page, 'admin@test.com', 'Admin@123');
  await page.click('#create-user-btn');
  // ...
});

test('User sees limited menu', async ({ page }) => {
  await login(page, 'user@test.com', 'User@123');
  // ...
});`,
        bridgeExplanation: 'Functions are the foundation of reusable automation. A login() function is your most-used building block.',
        bridgeSteps: [
          { step: 1, label: 'Repetition', description: 'Same 4 login steps in 10 tests', code: '// 10 tests × 4 lines\n// = 40 lines of duplicate code', color: 'blue' },
          { step: 2, label: 'Function', description: 'Extract to reusable function', code: "async function login(page, email, password) {\n  await page.fill('#email', email);\n  // ...\n}", color: 'yellow' },
          { step: 3, label: 'Reuse', description: 'One line per test', code: "// Each test:\nawait login(page, 'admin@test.com', 'Admin@123');", color: 'green' },
        ],
      },
      playground: {
        defaultCode: `// Build reusable test helper functions

// URL builder function
function buildUrl(path: string): string {
  const baseUrl = 'https://myapp.com';
  return \`\${baseUrl}\${path}\`;
}

// Test data generator function
function createUser(email: string, role: string) {
  return {
    email,
    password: 'Test@123',
    role,
    createdAt: new Date().toISOString(),
  };
}

// Format error message function
const formatError = (field: string, issue: string): string => {
  return \`Field '\${field}' is invalid: \${issue}\`;
};

// Use the functions
console.log(buildUrl('/login'));
console.log(buildUrl('/dashboard'));

const adminUser = createUser('admin@test.com', 'admin');
console.log('Created user:', adminUser.email);

const error = formatError('email', 'already taken');
console.log(error);`,
        language: 'typescript',
        hints: ['Functions start with function keyword or const name = () =>', 'Parameters are inputs, return sends output back', 'async functions are for Playwright actions'],
        patterns: [
          { regex: 'function\\s+\\w+', outputLines: ['✓ Function declared'] },
          { regex: 'const\\s+\\w+\\s*=\\s*\\(', outputLines: ['✓ Arrow function declared'] },
          { regex: 'return\\s+', outputLines: ['✓ Function returns a value'] },
          { regex: '\\w+\\(', outputLines: ['✓ Function called'] },
        ],
        successMessage: '✓ You can write reusable test helper functions!',
      },
      quiz: [
        { id: 'm2-l5-q1', type: 'multiple-choice', question: 'What is the main benefit of using a login() function in Playwright tests?', options: ['Tests run faster', 'Write the login steps once, reuse across all tests — fix in one place if it changes', 'Required by Playwright', 'Easier to read error messages'], correctIndex: 1, explanation: 'Functions eliminate code duplication. A login() function lets all tests share the same login logic.', points: 10 },
        { id: 'm2-l5-q2', type: 'code-reading', question: 'What does this function return?', code: "function buildUrl(path: string): string {\n  return `https://app.com${path}`;\n}\nconst result = buildUrl('/cart');", options: ["'/cart'", "'https://app.com'", "'https://app.com/cart'", "undefined"], correctIndex: 2, explanation: "The template literal combines 'https://app.com' with the path '/cart', returning 'https://app.com/cart'.", points: 10 },
        { id: 'm2-l5-q3', type: 'multiple-choice', question: 'Which keyword marks a function as asynchronous?', options: ['await', 'async', 'promise', 'defer'], correctIndex: 1, explanation: 'The async keyword before a function declaration makes it asynchronous. Inside async functions, you can use await.', points: 10 },
        { id: 'm2-l5-q4', type: 'code-reading', question: 'What is wrong with this arrow function syntax?', code: "const greet = name: string => {\n  return `Hello ${name}`;\n};", options: ['Nothing is wrong', 'Missing parentheses around the parameter', 'Should use function keyword', 'Arrow is wrong direction'], correctIndex: 1, explanation: 'Arrow function parameters need parentheses: const greet = (name: string) => { ... }', points: 10 },
        { id: 'm2-l5-q5', type: 'multiple-choice', question: 'What are the inputs to a function called?', options: ['Variables', 'Arguments / Parameters', 'Properties', 'Attributes'], correctIndex: 1, explanation: 'Parameters are defined in the function signature; arguments are the actual values passed when calling the function.', points: 10 },
      ],
    },
    {
      id: 'm2-l6',
      moduleId: 'module-2',
      number: 6,
      title: 'Conditions',
      subtitle: 'Handle different test scenarios',
      durationMinutes: 14,
      content: {
        manualScenario: `**Manual Testing Scenario:**

You are testing a dashboard. The content shown depends on the user's role:
- Admin users see a "Manage Users" button
- Regular users do NOT see that button

Sometimes a cookie consent banner appears, sometimes it doesn't. You need to handle both cases.`,
        whyJavaScript: `Conditions let your test code make **decisions**. If a cookie banner is visible, dismiss it. If the user is an admin, check for the admin button. This makes tests handle real-world variability.`,
        theory: `## Conditions — Decision Making in Tests

### if / else

\`\`\`typescript
const userRole = 'admin';

if (userRole === 'admin') {
  console.log('Show admin panel');
} else if (userRole === 'manager') {
  console.log('Show manager panel');
} else {
  console.log('Show basic dashboard');
}
\`\`\`

### Comparison Operators

\`\`\`typescript
const score = 85;

score === 85     // strictly equal (type + value) ✓ USE THIS
score !== 85     // not equal
score > 80       // greater than
score >= 85      // greater than or equal
score < 100      // less than
score <= 90      // less than or equal
\`\`\`

### Logical Operators

\`\`\`typescript
const isLoggedIn = true;
const isAdmin = false;

// AND — both must be true
if (isLoggedIn && isAdmin) {
  console.log('Show admin panel');
}

// OR — at least one must be true
if (isLoggedIn || isAdmin) {
  console.log('Show something');
}

// NOT — reverses the value
if (!isAdmin) {
  console.log('Not an admin');
}
\`\`\`

### Ternary Operator — Compact if/else

\`\`\`typescript
const role = 'admin';
const expectedPage = role === 'admin' ? '/admin' : '/dashboard';
// if role is 'admin', use '/admin', otherwise '/dashboard'
\`\`\``,
        jsCode: `// Conditions in test logic

const userRole = 'admin';
const score = 87;

// Basic condition
if (userRole === 'admin') {
  console.log('Testing admin features');
} else {
  console.log('Testing user features');
}

// Multiple conditions
if (score >= 90) {
  console.log('Grade: A');
} else if (score >= 80) {
  console.log('Grade: B');
} else {
  console.log('Grade: C');
}

// Ternary for expected page
const expectedPage = userRole === 'admin' ? '/admin' : '/dashboard';
console.log('Expected redirect:', expectedPage);

// Logical operators
const isActive = true;
const hasPermission = true;
if (isActive && hasPermission) {
  console.log('User can access the feature');
}`,
        playwrightCode: `import { test, expect } from '@playwright/test';

test('Handle optional cookie banner', async ({ page }) => {
  await page.goto('/');

  // Conditional handling — banner may or may not appear
  const cookieBanner = page.locator('#cookie-consent');
  if (await cookieBanner.isVisible()) {
    await cookieBanner.getByRole('button', { name: 'Accept' }).click();
  }

  // Continue with test regardless
  await expect(page.locator('h1')).toBeVisible();
});

test('Admin sees manage users button', async ({ page }) => {
  const user = { email: 'admin@test.com', role: 'admin' };
  await page.goto('/login');
  await page.fill('#email', user.email);
  await page.fill('#password', 'Admin@123');
  await page.click('[type="submit"]');

  // Conditional assertion based on role
  if (user.role === 'admin') {
    await expect(page.locator('#manage-users-btn')).toBeVisible();
  } else {
    await expect(page.locator('#manage-users-btn')).toBeHidden();
  }
});`,
        bridgeExplanation: 'Conditions handle the "sometimes" in testing — optional dialogs, role-based UI, variable outcomes.',
        bridgeSteps: [
          { step: 1, label: 'Manual', description: 'Cookie banner sometimes appears — dismiss if visible', code: '// If banner shows up\n// → click Accept\n// else → continue', color: 'blue' },
          { step: 2, label: 'Condition', description: 'Check if banner is visible', code: "if (await cookieBanner.isVisible()) {\n  // dismiss\n}", color: 'yellow' },
          { step: 3, label: 'Playwright', description: 'Conditional click', code: "if (await page.locator('#banner').isVisible()) {\n  await page.click('#accept-btn');\n}", color: 'green' },
        ],
      },
      playground: {
        defaultCode: `// Practice conditions for test scenarios

const userRole = 'admin';  // Try changing to 'user'
const pageLoadTime = 1200; // milliseconds

// Role-based test assertion
if (userRole === 'admin') {
  console.log('✓ Asserting admin panel is visible');
  console.log('✓ Asserting Manage Users button is visible');
} else {
  console.log('✓ Asserting admin panel is hidden');
  console.log('✓ Asserting basic dashboard is visible');
}

// Performance condition
if (pageLoadTime <= 1000) {
  console.log('✓ Page load is acceptable');
} else if (pageLoadTime <= 2000) {
  console.log('⚠️ Page load is slow but acceptable');
} else {
  console.log('✗ Page load time exceeds threshold');
}

// Ternary for expected URL
const expectedUrl = userRole === 'admin' ? '/admin/dashboard' : '/user/dashboard';
console.log('Expected redirect to:', expectedUrl);`,
        language: 'typescript',
        hints: ['Use === for comparison (not ==)', 'if/else handles two paths', 'if/else if/else handles multiple paths', 'ternary: condition ? valueIfTrue : valueIfFalse'],
        patterns: [
          { regex: 'if\\s*\\(', outputLines: ['✓ Conditional branch created'] },
          { regex: '===', outputLines: ['✓ Strict equality comparison'] },
          { regex: '\\?\\s*.*\\s*:', outputLines: ['✓ Ternary operator used'] },
          { regex: '&&|\\|\\|', outputLines: ['✓ Logical operator (AND/OR)'] },
        ],
        successMessage: '✓ You can write conditional test logic!',
      },
      quiz: [
        { id: 'm2-l6-q1', type: 'multiple-choice', question: 'Why do Playwright tests use conditions for cookie banners?', options: ['Cookies are always present', 'The banner may or may not appear — the test must handle both cases', 'Playwright cannot dismiss banners', 'Conditions make tests run faster'], correctIndex: 1, explanation: 'Cookie banners and other optional UI elements require conditional logic because they may or may not appear depending on session state.', points: 10 },
        { id: 'm2-l6-q2', type: 'multiple-choice', question: 'Which comparison operator should you use in JavaScript?', options: ['== (loose equal)', '=== (strict equal)', '= (assignment)', '!= (loose not equal)'], correctIndex: 1, explanation: '=== is strict equality — checks both value AND type. Always prefer === over == in JavaScript.', points: 10 },
        { id: 'm2-l6-q3', type: 'code-reading', question: 'What does this ternary return when role is "admin"?', code: "const role = 'admin';\nconst page = role === 'admin' ? '/admin' : '/home';", options: ["'/home'", "'/admin'", "'admin'", "true"], correctIndex: 1, explanation: "Since role === 'admin' is true, the ternary returns '/admin'.", points: 10 },
        { id: 'm2-l6-q4', type: 'multiple-choice', question: 'What does the && operator require?', options: ['At least one condition true', 'Both conditions true', 'Neither condition true', 'Either condition true'], correctIndex: 1, explanation: '&& (AND) requires BOTH conditions to be true. If either is false, the whole expression is false.', points: 10 },
        { id: 'm2-l6-q5', type: 'code-reading', question: 'When does this condition execute?', code: "const isAdmin = false;\nconst isManager = true;\nif (isAdmin || isManager) {\n  console.log('Access granted');\n}", options: ['Never — both are false', 'When isAdmin is true', 'When either isAdmin or isManager is true', 'Only when both are true'], correctIndex: 2, explanation: '|| (OR) executes when AT LEAST ONE condition is true. Since isManager is true, the block executes.', points: 10 },
      ],
    },
    {
      id: 'm2-l7',
      moduleId: 'module-2',
      number: 7,
      title: 'Loops',
      subtitle: 'Run tests for each test case',
      durationMinutes: 14,
      content: {
        manualScenario: `**Manual Testing Scenario:**

You need to verify that 50 items in a product list all have:
- A price (not empty)
- A name (not empty)
- An "Add to Cart" button

Manually clicking each of 50 items would take 30+ minutes. And you do this for every release.`,
        whyJavaScript: `Loops let you execute the same code **for each item** in a list. In Playwright, loops power data-driven tests and element validation — check all 50 products in seconds.`,
        theory: `## Loops — Repeat Actions for Each Item

### for...of — Looping Over Arrays (Most Common in Tests)

\`\`\`typescript
const testUrls = ['/home', '/products', '/cart', '/checkout'];

for (const url of testUrls) {
  console.log('Testing:', url);
  // In Playwright: await page.goto(url);
}
\`\`\`

### forEach — Array Method with Callback

\`\`\`typescript
const users = ['alice', 'bob', 'charlie'];

users.forEach((user) => {
  console.log(\`Testing as: \${user}\`);
});
\`\`\`

### for Loop — Classic (When You Need the Index)

\`\`\`typescript
const items = ['A', 'B', 'C'];

for (let i = 0; i < items.length; i++) {
  console.log(\`Item \${i + 1}: \${items[i]}\`);
}
// Item 1: A
// Item 2: B
// Item 3: C
\`\`\`

### Looping Over Objects — for...in

\`\`\`typescript
const user = { name: 'Alice', role: 'admin', active: true };

for (const key in user) {
  console.log(\`\${key}: \${user[key]}\`);
}
// name: Alice
// role: admin
// active: true
\`\`\``,
        jsCode: `// Loop examples for testing scenarios

const testUrls = ['/login', '/dashboard', '/profile', '/settings'];
const testUsers = ['admin@test.com', 'user@test.com', 'guest@test.com'];

// for...of — iterate over URLs
console.log('Pages to test:');
for (const url of testUrls) {
  console.log(' -', url);
}

// forEach — log test users
console.log('\\nTest users:');
testUsers.forEach((email, index) => {
  console.log(\`  \${index + 1}. \${email}\`);
});

// Classic for — when you need the index
console.log('\\nOrdered test steps:');
const steps = ['Navigate', 'Login', 'Verify', 'Logout'];
for (let i = 0; i < steps.length; i++) {
  console.log(\`Step \${i + 1}: \${steps[i]}\`);
}`,
        playwrightCode: `import { test, expect } from '@playwright/test';

const criticalPages = [
  { url: '/login',     title: 'Login' },
  { url: '/dashboard', title: 'Dashboard' },
  { url: '/products',  title: 'Products' },
];

// Smoke test: all critical pages load
for (const page_data of criticalPages) {
  test(\`\${page_data.url} loads correctly\`, async ({ page }) => {
    await page.goto(page_data.url);
    await expect(page).toHaveTitle(new RegExp(page_data.title, 'i'));
    await expect(page.locator('h1')).toBeVisible();
  });
}

test('All products have required elements', async ({ page }) => {
  await page.goto('/products');

  const productCards = page.locator('.product-card');
  const count = await productCards.count();

  // Loop through every product card on the page
  for (let i = 0; i < count; i++) {
    const card = productCards.nth(i);
    await expect(card.locator('.product-name')).not.toBeEmpty();
    await expect(card.locator('.product-price')).not.toBeEmpty();
    await expect(card.locator('[data-testid="add-to-cart"]')).toBeVisible();
  }
});`,
        bridgeExplanation: 'Loops turn your "test 50 products" scenario from a 30-minute manual task into a 10-second automated check.',
        bridgeSteps: [
          { step: 1, label: 'Manual', description: 'Check 50 products one by one', code: '// Open product 1... check\n// Open product 2... check\n// ... (48 more times)', color: 'blue' },
          { step: 2, label: 'Loop', description: 'Iterate over product elements', code: "for (let i = 0; i < count; i++) {\n  const card = cards.nth(i);\n}", color: 'yellow' },
          { step: 3, label: 'Playwright', description: 'Assert each card automatically', code: "await expect(card.locator('.name')).not.toBeEmpty();\nawait expect(card.locator('.price')).not.toBeEmpty();", color: 'green' },
        ],
      },
      playground: {
        defaultCode: `// Loops for test data iteration

const browsers = ['chrome', 'firefox', 'safari'];
const testEnvironments = ['dev', 'staging', 'production'];

// Loop through browsers
console.log('Running tests on:');
for (const browser of browsers) {
  console.log(\`  ✓ \${browser}\`);
}

// Loop with index using forEach
console.log('\\nTest environments:');
testEnvironments.forEach((env, index) => {
  const priority = index === 0 ? '(high priority)' : '';
  console.log(\`  \${index + 1}. \${env} \${priority}\`);
});

// Simulate iterating over page elements
const productCount = 5;
console.log('\\nValidating products:');
for (let i = 1; i <= productCount; i++) {
  console.log(\`  Checking product \${i}/\${productCount}...\`);
}`,
        language: 'typescript',
        hints: ['for...of is the cleanest for arrays', 'forEach gives you index as 2nd parameter', 'Use classic for loop when you need the index value'],
        patterns: [
          { regex: 'for\\s*\\(.*of\\s+', outputLines: ['✓ for...of loop iterating over array'] },
          { regex: '\\.forEach\\(', outputLines: ['✓ forEach iterating over array'] },
          { regex: 'for\\s*\\(let\\s+i', outputLines: ['✓ Classic for loop with index'] },
        ],
        successMessage: '✓ You can use loops to automate repetitive test scenarios!',
      },
      quiz: [
        { id: 'm2-l7-q1', type: 'multiple-choice', question: 'Which loop is best for iterating over an array of test users?', options: ['while loop', 'for...of loop', 'do...while loop', 'switch statement'], correctIndex: 1, explanation: 'for...of is the cleanest and most readable way to iterate over arrays in modern JavaScript.', points: 10 },
        { id: 'm2-l7-q2', type: 'code-reading', question: 'How many times does this loop run?', code: "const urls = ['/home', '/about', '/contact'];\nfor (const url of urls) {\n  console.log(url);\n}", options: ['2', '3', '4', 'undefined'], correctIndex: 1, explanation: 'The array has 3 elements, so the for...of loop runs 3 times — once for each URL.', points: 10 },
        { id: 'm2-l7-q3', type: 'multiple-choice', question: 'In Playwright, what does page.locator(".card").count() return?', options: ['The first card element', 'The number of elements matching .card on the page', 'An array of card text', 'A boolean'], correctIndex: 1, explanation: '.count() returns the total number of elements matching the selector on the current page.', points: 10 },
        { id: 'm2-l7-q4', type: 'code-reading', question: 'What does forEach provide as the second callback parameter?', code: "users.forEach((user, index) => {\n  console.log(index, user);\n});", options: ['The array length', 'The current index (0, 1, 2...)', 'The next item', 'undefined'], correctIndex: 1, explanation: 'forEach provides the current item as the first parameter and the current index (0, 1, 2...) as the second.', points: 10 },
        { id: 'm2-l7-q5', type: 'multiple-choice', question: 'How does looping help in Playwright testing?', options: ['It speeds up each individual test', 'It runs the same test logic for each item in a list (data-driven testing)', 'It replaces assertions', 'It avoids async/await'], correctIndex: 1, explanation: 'Loops enable data-driven testing — the same test logic executes for each item (user, URL, product) without duplicating code.', points: 10 },
      ],
    },
    {
      id: 'm2-l8',
      moduleId: 'module-2',
      number: 8,
      title: 'Async/Await',
      subtitle: 'The most important concept for Playwright',
      durationMinutes: 20,
      content: {
        manualScenario: `**Manual Testing Scenario:**

When you manually test a web app, you naturally wait:
- You click "Login" and WAIT for the dashboard to load
- You fill the form and WAIT for the confirmation message
- You search and WAIT for results to appear

You never click "Login" and immediately check the URL before the page loads. You wait.

Async/await is how you tell JavaScript to WAIT.`,
        whyJavaScript: `This is the **most important concept for Playwright**. Every Playwright command — clicking, typing, navigating — takes time to complete. \`await\` tells JavaScript: "wait for this to finish before moving to the next line." Without \`await\`, your test would check results before the page even loads.`,
        theory: `## Async/Await — The Most Critical Playwright Concept

### The Problem: JavaScript is Non-Blocking

By default, JavaScript does NOT wait. It executes the next line immediately:

\`\`\`typescript
// WITHOUT await — BROKEN (runs too fast)
page.click('#login-btn');          // click starts
page.waitForURL('/dashboard');     // checks IMMEDIATELY — page not loaded yet!
expect(page).toHaveURL('/dashboard'); // FAILS — still on /login
\`\`\`

### The Solution: async/await — Tell JavaScript to WAIT

\`\`\`typescript
// WITH await — CORRECT
await page.click('#login-btn');    // wait for click to complete
await page.waitForURL('/dashboard'); // wait for navigation to finish
await expect(page).toHaveURL('/dashboard'); // now check — ✓ passes
\`\`\`

### The Rules

**Rule 1:** Any function that uses \`await\` must be declared \`async\`:

\`\`\`typescript
// ✓ Correct — async function using await
async function login(page: Page, email: string) {
  await page.fill('#email', email);
  await page.click('[type="submit"]');
}

// ✗ Error — cannot use await without async
function badLogin(page: Page, email: string) {
  await page.fill('#email', email); // ERROR!
}
\`\`\`

**Rule 2:** Every Playwright action needs \`await\`:

\`\`\`typescript
await page.goto('/login');
await page.fill('#email', email);
await page.fill('#password', password);
await page.click('button[type="submit"]');
await expect(page).toHaveURL('/dashboard');
\`\`\`

**Rule 3:** The test function is async:

\`\`\`typescript
test('my test', async ({ page }) => {
//                ^^^^ always async
});
\`\`\`

### Why Playwright Uses Promises Under the Hood

\`await\` unwraps a **Promise** — a JavaScript object representing a future value.
- \`page.click()\` returns a Promise (the click will happen... eventually)
- \`await page.click()\` waits for that promise to resolve (click has happened)`,
        jsCode: `// Understanding async/await

// A Promise is a placeholder for a future value
function fetchData(): Promise<string> {
  return new Promise((resolve) => {
    // Simulate waiting 1 second (like a page loading)
    setTimeout(() => {
      resolve('Data loaded!');
    }, 1000);
  });
}

// WITHOUT async/await — doesn't wait
async function badExample() {
  const data = fetchData(); // returns Promise object, not the data!
  console.log(data); // [object Promise] — NOT the data!
}

// WITH async/await — waits correctly
async function goodExample() {
  const data = await fetchData(); // WAITS for promise to resolve
  console.log(data); // 'Data loaded!' ✓
}

// Most common pattern in Playwright:
async function runTest() {
  console.log('Step 1: Start');
  await new Promise(r => setTimeout(r, 100)); // simulated wait
  console.log('Step 2: Waited');
  console.log('Step 3: Continue');
}

runTest();`,
        playwrightCode: `import { test, expect } from '@playwright/test';

// Every test is async — no exceptions
test('Complete checkout flow', async ({ page }) => {

  // Every action is awaited — they happen in sequence
  await page.goto('/shop');

  // Wait for product page to load, then click
  await page.click('[data-testid="product-1"]');

  // Wait for product page, then add to cart
  await page.click('[data-testid="add-to-cart"]');

  // Wait for cart update, then navigate
  await page.click('[data-testid="cart-icon"]');

  // Wait for cart page, then assert
  await expect(page.locator('.cart-item')).toHaveCount(1);

  // Proceed to checkout
  await page.click('[data-testid="checkout-btn"]');

  // Wait for checkout page to load
  await expect(page).toHaveURL('/checkout');
});

// Async helper function
async function addToCart(page: Page, productId: string) {
  await page.click(\`[data-testid="product-\${productId}"]\`);
  await page.click('[data-testid="add-to-cart"]');
  await expect(page.locator('.cart-count')).not.toHaveText('0');
}`,
        bridgeExplanation: 'await makes JavaScript behave like YOU behave — waiting for each step to complete before moving to the next.',
        bridgeSteps: [
          { step: 1, label: 'Manual Behavior', description: 'Wait for page to load before checking', code: '// Click Login\n// → WAIT for dashboard\n// → Check URL', color: 'blue' },
          { step: 2, label: 'Without await', description: 'Test checks before page loads', code: "page.click('#login-btn'); // starts\npage.url(); // too fast! ✗", color: 'red' },
          { step: 3, label: 'With await', description: 'Test waits like a human', code: "await page.click('#login-btn'); // done\nawait expect(page).toHaveURL('/dashboard'); ✓", color: 'green' },
        ],
      },
      playground: {
        defaultCode: `// Understanding async/await with simulation

// This simulates what Playwright does when awaiting actions
async function simulatePageInteraction() {
  console.log('🚀 Test started');

  // Each await simulates waiting for a browser action
  await delay(100); // Simulates: await page.goto('/login')
  console.log('📄 Page loaded');

  await delay(50);  // Simulates: await page.fill('#email', email)
  console.log('✏️  Email filled');

  await delay(50);  // Simulates: await page.fill('#password', pass)
  console.log('✏️  Password filled');

  await delay(100); // Simulates: await page.click('[type="submit"]')
  console.log('🖱️  Login button clicked');

  await delay(200); // Simulates: await page.waitForURL('/dashboard')
  console.log('✓ Dashboard loaded');

  console.log('✅ Test passed!');
}

// Helper to simulate waiting
function delay(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms));
}

simulatePageInteraction();`,
        language: 'typescript',
        hints: ['async/await makes actions happen in sequence', 'Every Playwright method needs await', 'Functions using await must be declared async'],
        patterns: [
          { regex: 'async\\s+function|async\\s+\\(', outputLines: ['✓ Async function declared'] },
          { regex: 'await\\s+', outputLines: ['✓ Awaiting async operation'] },
          { regex: 'Promise', outputLines: ['✓ Promise-based async pattern'] },
        ],
        successMessage: '✓ You understand the most important Playwright concept!',
      },
      quiz: [
        { id: 'm2-l8-q1', type: 'multiple-choice', question: 'Why is async/await the most critical concept for Playwright?', options: ['It makes tests run faster', 'Every Playwright browser action takes time — await makes JavaScript wait for each action before moving on', 'It is required by TypeScript', 'It replaces assertions'], correctIndex: 1, explanation: 'Browser actions (clicking, navigating, filling) take time. await ensures each action completes before the next begins.', points: 10 },
        { id: 'm2-l8-q2', type: 'code-reading', question: 'What is wrong with this code?', code: "test('login test', async ({ page }) => {\n  page.goto('/login');\n  page.fill('#email', 'test@test.com');\n  expect(page).toHaveURL('/dashboard');\n});", options: ['Nothing is wrong', 'Missing await before each Playwright action', 'Missing import statement', 'test function is not async'], correctIndex: 1, explanation: 'Every Playwright action needs await. Without it, the test runs too fast — checking the URL before navigation completes.', points: 10 },
        { id: 'm2-l8-q3', type: 'multiple-choice', question: 'What must be true about a function that uses await?', options: ['It must return a string', 'It must be declared with the async keyword', 'It must be inside a class', 'It must have at least 2 parameters'], correctIndex: 1, explanation: 'Any function that uses await must be declared with async. This is a JavaScript rule.', points: 10 },
        { id: 'm2-l8-q4', type: 'code-reading', question: 'What does await do to a Promise?', code: "const result = await page.textContent('h1');", options: ['Creates a new Promise', 'Waits for the Promise to resolve and returns the value', 'Cancels the Promise', 'Runs the Promise in background'], correctIndex: 1, explanation: 'await pauses execution until the Promise resolves, then returns the resolved value (in this case, the text content of h1).', points: 10 },
        { id: 'm2-l8-q5', type: 'true-false', question: 'Without await, Playwright tests will still work correctly because Playwright handles the timing automatically.', options: ['True', 'False'], correctIndex: 1, explanation: 'False. Without await, JavaScript will execute the next line immediately — before the browser action completes. Tests will fail with timing errors.', points: 10 },
      ],
    },
    {
      id: 'm2-l9',
      moduleId: 'module-2',
      number: 9,
      title: 'Import & Export',
      subtitle: 'Organize tests across multiple files',
      durationMinutes: 12,
      content: {
        manualScenario: `**Manual Testing Scenario:**

Your test suite has grown to 50 tests in one file. The file is 2,000 lines long. Finding anything is painful.

You want to split it:
- \`login.helpers.ts\` — login helper functions
- \`test-data.ts\` — test users and test data
- \`login.test.ts\` — the actual login tests`,
        whyJavaScript: `Import/export lets you **split code across files** and share it. A helper function defined in one file can be imported and used in another. This is how Playwright test suites are organized.`,
        theory: `## Import & Export — Organizing Test Files

### Exporting from a File

\`\`\`typescript
// test-data.ts — defines and EXPORTS data
export const adminUser = {
  email: 'admin@test.com',
  password: 'Admin@123',
};

export const BASE_URL = 'https://myapp.com';

// You can also export functions
export async function login(page: Page, email: string, password: string) {
  await page.goto(BASE_URL + '/login');
  await page.fill('#email', email);
  await page.fill('#password', password);
  await page.click('[type="submit"]');
}
\`\`\`

### Importing into Another File

\`\`\`typescript
// login.test.ts — IMPORTS from test-data.ts
import { adminUser, BASE_URL, login } from './test-data';

test('Admin login', async ({ page }) => {
  await login(page, adminUser.email, adminUser.password);
  await expect(page).toHaveURL(BASE_URL + '/dashboard');
});
\`\`\`

### Default Export vs Named Export

\`\`\`typescript
// Named exports — export multiple things
export const user1 = { email: 'a@test.com' };
export const user2 = { email: 'b@test.com' };

// Default export — export ONE main thing from a file
export default class LoginPage { /* ... */ }

// Importing default export (no curly braces)
import LoginPage from './LoginPage';

// Importing named exports (with curly braces)
import { user1, user2 } from './test-data';
\`\`\`

### Playwright Import Pattern

\`\`\`typescript
// Playwright itself uses named exports
import { test, expect, type Page } from '@playwright/test';
//       ^^^^ ^^^^^^  ^^^^^^^^^^ these are all named exports
\`\`\``,
        jsCode: `// Simulating import/export concept

// === In file: test-users.ts ===
const testUsers = {
  admin: { email: 'admin@test.com', password: 'Admin@123', role: 'admin' },
  user:  { email: 'user@test.com',  password: 'User@123',  role: 'user' },
};
// export { testUsers };

// === In file: test-config.ts ===
const config = {
  baseUrl: 'https://myapp.com',
  timeout: 30000,
  retries: 2,
};
// export { config };

// === In file: login.test.ts ===
// import { testUsers } from './test-users';
// import { config } from './test-config';

// Simulating the imported values being used:
console.log('Base URL:', config.baseUrl);
console.log('Admin email:', testUsers.admin.email);
console.log('Test timeout:', config.timeout, 'ms');`,
        playwrightCode: `// helpers/auth.helpers.ts
import { type Page } from '@playwright/test';

export const BASE_URL = 'https://myapp.com';

export interface ITestUser {
  email: string;
  password: string;
  role: string;
}

export const testUsers: Record<string, ITestUser> = {
  admin: { email: 'admin@test.com', password: 'Admin@123', role: 'admin' },
  user:  { email: 'user@test.com',  password: 'User@123',  role: 'user' },
};

export async function loginAs(page: Page, userKey: string) {
  const user = testUsers[userKey];
  await page.goto(\`\${BASE_URL}/login\`);
  await page.fill('#email', user.email);
  await page.fill('#password', user.password);
  await page.click('[type="submit"]');
}

// ---

// tests/login.test.ts
import { test, expect } from '@playwright/test';
import { loginAs, BASE_URL } from '../helpers/auth.helpers';

test('Admin dashboard', async ({ page }) => {
  await loginAs(page, 'admin');
  await expect(page).toHaveURL(\`\${BASE_URL}/admin\`);
});`,
        bridgeExplanation: 'Import/export splits your 2,000-line file into organized modules — just like organizing your manual test cases into separate test plans.',
        bridgeSteps: [
          { step: 1, label: 'One big file', description: '2000 lines, impossible to navigate', code: '// login-tests.ts:\n// helper1...\n// helper2...\n// testData...\n// 50 tests...', color: 'blue' },
          { step: 2, label: 'Export helpers', description: 'Separate files with exports', code: "// auth.helpers.ts\nexport async function login(page, email) {\n  // ...\n}", color: 'yellow' },
          { step: 3, label: 'Import in tests', description: 'Clean test files', code: "import { login } from './auth.helpers';\n\ntest('admin login', async ({ page }) => {\n  await login(page, 'admin@test.com');\n});", color: 'green' },
        ],
      },
      playground: {
        defaultCode: `// Simulating the import/export pattern

// === Exported from: fixtures/users.ts ===
const users = {
  admin: {
    email: 'admin@company.com',
    password: 'Admin@Pass1',
    expectedUrl: '/admin/dashboard',
  },
  tester: {
    email: 'qa@company.com',
    password: 'QA@Pass1',
    expectedUrl: '/dashboard',
  },
};

// === Exported from: fixtures/config.ts ===
const config = {
  baseUrl: 'https://app.company.com',
  apiUrl: 'https://api.company.com',
  defaultTimeout: 30000,
};

// === In test file (these would be imported) ===
// Using the imported data:
console.log('Testing environment:', config.baseUrl);
console.log('Admin user:', users.admin.email);
console.log('QA user:', users.tester.email);
console.log('Timeout:', config.defaultTimeout + 'ms');`,
        language: 'typescript',
        hints: ['export makes a value available to other files', 'import { name } from "./file" brings it in', 'Playwright uses: import { test, expect } from "@playwright/test"'],
        patterns: [
          { regex: 'export\\s+', outputLines: ['✓ Value exported (available to other files)'] },
          { regex: 'import\\s+\\{', outputLines: ['✓ Named import from another file'] },
          { regex: 'import\\s+\\w+\\s+from', outputLines: ['✓ Default import from another file'] },
        ],
        successMessage: '✓ You understand how to organize tests across files!',
      },
      quiz: [
        { id: 'm2-l9-q1', type: 'multiple-choice', question: 'What does the export keyword do?', options: ['Copies the file to another location', 'Makes a variable or function available for import in other files', 'Runs the code in another file', 'Creates a new module'], correctIndex: 1, explanation: 'export makes values (variables, functions, classes) available to be imported in other files.', points: 10 },
        { id: 'm2-l9-q2', type: 'code-reading', question: 'How do you import the login function from this export?', code: "// auth.ts\nexport async function login(page, email, password) {\n  // ...\n}", options: ["import login from './auth'", "import { login } from './auth'", "require('./auth').login", "import * './auth'"], correctIndex: 1, explanation: 'Named exports (declared with export function/export const) are imported using curly braces: import { login } from "./auth"', points: 10 },
        { id: 'm2-l9-q3', type: 'code-reading', question: 'Which line uses import correctly for Playwright?', options: ["require('@playwright/test')", "import test, expect from '@playwright/test'", "import { test, expect } from '@playwright/test'", "from '@playwright/test' import test"], correctIndex: 2, explanation: 'Playwright uses named exports, so you import them with curly braces: import { test, expect } from "@playwright/test"', points: 10 },
        { id: 'm2-l9-q4', type: 'multiple-choice', question: 'What is the difference between default export and named export?', options: ['There is no difference', 'Default export: one main export per file (no curly braces to import). Named export: multiple exports per file (curly braces to import)', 'Named exports run faster', 'Default exports cannot be functions'], correctIndex: 1, explanation: 'A file can have ONE default export (imported without braces) and MANY named exports (imported with braces {}).', points: 10 },
        { id: 'm2-l9-q5', type: 'multiple-choice', question: 'Why is splitting tests into multiple files with import/export beneficial?', options: ['Files run faster when split', 'Organizes code, improves reusability, and makes large test suites maintainable', 'Required by Playwright', 'Reduces file download size'], correctIndex: 1, explanation: 'Splitting code into files with import/export creates a maintainable architecture — helpers, test data, and tests are all in their right place.', points: 10 },
      ],
    },
    {
      id: 'm2-l10',
      moduleId: 'module-2',
      number: 10,
      title: 'Error Handling',
      subtitle: 'Graceful test failures with try/catch',
      durationMinutes: 14,
      content: {
        manualScenario: `**Manual Testing Scenario:**

You are running a smoke test. You try to log in and the login page returns a 500 error. Your entire test suite crashes.

Or: You try to find an element that doesn't exist. Instead of getting a helpful "element not found" message, you get a cryptic crash.

Good tests handle errors gracefully and give you useful information when something goes wrong.`,
        whyJavaScript: `\`try/catch\` lets you handle errors gracefully. In Playwright, this means you can attempt a risky action, catch any error that occurs, log a helpful message, and continue (or fail with a useful description) rather than crashing with a confusing error.`,
        theory: `## Error Handling — Graceful Failures

### try/catch

\`\`\`typescript
try {
  // Code that might fail
  await page.click('#might-not-exist');
} catch (error) {
  // Runs if the above throws an error
  console.error('Click failed:', error.message);
  // Test can continue or fail with a useful message
}
\`\`\`

### Throwing Errors (Custom Errors)

\`\`\`typescript
function validateEmail(email: string) {
  if (!email.includes('@')) {
    throw new Error(\`Invalid email: \${email} does not contain @\`);
  }
  return email;
}

try {
  validateEmail('notanemail');
} catch (error) {
  console.log('Validation failed:', error.message);
}
\`\`\`

### try/catch/finally

\`\`\`typescript
async function runWithCleanup(page: Page) {
  try {
    await page.click('#checkout');
    await expect(page).toHaveURL('/thank-you');
  } catch (error) {
    console.error('Test failed:', error.message);
    await page.screenshot({ path: 'failure.png' });
  } finally {
    // Always runs — cleanup code
    await page.close();
  }
}
\`\`\`

### Error Types in Playwright

\`\`\`typescript
// TimeoutError — element not found within timeout
// NavigationError — page navigation failed
// AssertionError — expect() assertion failed

try {
  await page.click('#submit', { timeout: 5000 });
} catch (error) {
  if (error.name === 'TimeoutError') {
    console.log('Submit button not found within 5 seconds');
  }
}
\`\`\``,
        jsCode: `// Error handling patterns

// Basic try/catch
function parsePageCount(text: string): number {
  try {
    const count = parseInt(text, 10);
    if (isNaN(count)) {
      throw new Error(\`Cannot parse count from: "\${text}"\`);
    }
    return count;
  } catch (error) {
    console.error('Parse error:', error.message);
    return 0; // Return safe default
  }
}

console.log(parsePageCount('42'));   // 42
console.log(parsePageCount('abc'));  // Parse error: Cannot parse count...
                                     // 0

// try/catch/finally
async function safeScreenshot() {
  try {
    console.log('Taking screenshot...');
    // await page.screenshot({ path: 'test.png' });
    console.log('Screenshot saved');
  } catch (error) {
    console.error('Screenshot failed:', error);
  } finally {
    console.log('Cleanup complete (always runs)');
  }
}

safeScreenshot();`,
        playwrightCode: `import { test, expect } from '@playwright/test';

test('Handle optional promotional banner', async ({ page }) => {
  await page.goto('/home');

  try {
    // Try to dismiss promo — it might not be there
    await page.click('#promo-close-btn', { timeout: 2000 });
    console.log('Promo banner dismissed');
  } catch {
    // Promo not present — that is fine, continue
    console.log('No promo banner — continuing');
  }

  // Test continues regardless
  await expect(page.locator('h1')).toBeVisible();
});

test('Safe API response check', async ({ page }) => {
  try {
    await page.goto('/api-data-page');
    await expect(page.locator('.data-grid')).toBeVisible({ timeout: 10000 });

    const rowCount = await page.locator('.data-row').count();
    expect(rowCount).toBeGreaterThan(0);

  } catch (error) {
    // Take screenshot on failure for debugging
    await page.screenshot({ path: \`failure-\${Date.now()}.png\` });
    throw error; // Re-throw so the test still fails
  }
});`,
        bridgeExplanation: 'try/catch is your "Plan B" for when something unexpected happens — dismiss the popup or log a screenshot, then continue.',
        bridgeSteps: [
          { step: 1, label: 'Unexpected Event', description: 'Promotional popup appears during test', code: '// Your test tries to click "Add to Cart"\n// But a modal blocks it', color: 'blue' },
          { step: 2, label: 'Try the happy path', description: 'Attempt the normal flow', code: "try {\n  await page.click('#add-to-cart');\n} catch (err) {", color: 'yellow' },
          { step: 3, label: 'Catch & recover', description: 'Handle the unexpected event', code: "  await page.click('#modal-close');\n  await page.click('#add-to-cart');\n}", color: 'green' },
        ],
      },
      playground: {
        defaultCode: `// Practice error handling patterns

// Safe element text getter
async function safeGetText(selector: string): Promise<string> {
  try {
    // Simulating: const element = await page.locator(selector).textContent();
    if (selector === '#exists') {
      return 'Element text';
    }
    throw new Error(\`Element not found: \${selector}\`);
  } catch (error) {
    console.warn('Could not get text for', selector, '-', error.message);
    return ''; // Safe default
  }
}

// Test the function
async function main() {
  const text1 = await safeGetText('#exists');
  console.log('Found text:', text1);

  const text2 = await safeGetText('#missing-element');
  console.log('Fallback text:', JSON.stringify(text2));

  // try/catch/finally pattern
  try {
    console.log('Running risky operation...');
    throw new Error('Simulated timeout error');
  } catch (error) {
    console.error('Caught error:', error.message);
  } finally {
    console.log('Cleanup always runs');
  }
}

main();`,
        language: 'typescript',
        hints: ['try contains the risky code', 'catch handles the error', 'finally always runs (good for cleanup)', 'throw creates a custom error'],
        patterns: [
          { regex: 'try\\s*\\{', outputLines: ['✓ Try block — attempting risky operation'] },
          { regex: 'catch\\s*\\(', outputLines: ['✓ Catch block — handling potential error'] },
          { regex: 'finally\\s*\\{', outputLines: ['✓ Finally block — cleanup code'] },
          { regex: 'throw\\s+new\\s+Error', outputLines: ['✓ Custom error thrown'] },
        ],
        successMessage: '✓ You can handle errors gracefully in test code!',
      },
      quiz: [
        { id: 'm2-l10-q1', type: 'multiple-choice', question: 'What is the purpose of a try/catch block in Playwright tests?', options: ['To make tests run faster', 'To handle errors gracefully — attempt an action, recover if it fails', 'To skip tests', 'To import modules'], correctIndex: 1, explanation: 'try/catch allows tests to attempt risky operations and handle failures gracefully rather than crashing entirely.', points: 10 },
        { id: 'm2-l10-q2', type: 'multiple-choice', question: 'When does the finally block execute?', options: ['Only when there is no error', 'Only when there is an error', 'Always — whether or not an error occurs', 'Only when catch is triggered'], correctIndex: 2, explanation: 'finally always runs — on success and on error. This makes it ideal for cleanup code (closing pages, resetting state).', points: 10 },
        { id: 'm2-l10-q3', type: 'code-reading', question: 'What happens when this catch runs?', code: "try {\n  await page.click('#optional-btn', { timeout: 2000 });\n} catch {\n  console.log('Button not found, continuing...');\n}", options: ['Test fails immediately', 'Error is logged and the test continues after the try/catch block', 'Page is closed', 'Test is skipped'], correctIndex: 1, explanation: 'The catch block handles the error gracefully — logs a message and execution continues after the try/catch block.', points: 10 },
        { id: 'm2-l10-q4', type: 'multiple-choice', question: 'When should you re-throw an error in Playwright?', options: ['Never — always swallow errors', 'When you want to add context (screenshot/log) but still want the test to fail', 'When the error is expected', 'To reset the browser state'], correctIndex: 1, explanation: 'Re-throwing after adding debugging context (taking a screenshot) ensures the test still fails and shows the original error.', points: 10 },
        { id: 'm2-l10-q5', type: 'code-reading', question: 'What is the safest way to handle an optional cookie banner?', code: `try {\n  await page.click('#cookie-accept', { timeout: 2000 });\n} catch {\n  // banner not present\n}`, options: ['This is risky — avoid try/catch', 'This is correct — attempt click, ignore if not found, continue test', 'This will crash the test', 'catch needs a parameter'], correctIndex: 1, explanation: 'This is the recommended pattern for optional UI elements. The timeout prevents waiting too long, and catch ignores the error if the banner is absent.', points: 10 },
      ],
    },
    {
      id: 'm2-l11',
      moduleId: 'module-2',
      number: 11,
      title: 'Numbers & Booleans',
      subtitle: 'Count elements, check states',
      durationMinutes: 10,
      content: {
        manualScenario: `**Manual Testing Scenario:**

You need to verify:
- The cart shows exactly 3 items
- The pagination shows 10 results per page
- The "Remember Me" checkbox is checked (true)
- The Submit button is disabled (false)`,
        whyJavaScript: `Numbers and booleans are fundamental types used throughout Playwright for counting elements, measuring timeouts, and checking state (visible/hidden, enabled/disabled, checked/unchecked).`,
        theory: `## Numbers and Booleans

### Numbers

\`\`\`typescript
const itemCount = 3;
const pricePerItem = 9.99;
const totalItems = 50;
const timeout = 30000; // milliseconds

// Arithmetic
const total = itemCount * pricePerItem; // 29.97
const pageCount = Math.ceil(totalItems / 10); // 5 pages
const discounted = pricePerItem * 0.9; // 10% off = 8.991

// Useful Math methods
Math.round(4.7)    // 5
Math.floor(4.9)    // 4
Math.ceil(4.1)     // 5
Math.abs(-10)      // 10
\`\`\`

### Booleans

\`\`\`typescript
const isVisible = true;
const isDisabled = false;
const isChecked = true;

// Booleans in conditions
if (isVisible && !isDisabled) {
  console.log('Element is visible and enabled');
}

// Playwright methods that return booleans
// await page.locator('#btn').isVisible()   → true/false
// await page.locator('#btn').isEnabled()   → true/false
// await page.locator('#checkbox').isChecked() → true/false
\`\`\`

### Parsing Numbers from Page Text

\`\`\`typescript
// Page shows: "3 items in cart"
const cartText = '3 items in cart';
const cartCount = parseInt(cartText, 10); // 3
console.log('Cart has:', cartCount, 'items');

// Page shows: "$49.99"
const priceText = '$49.99';
const price = parseFloat(priceText.replace('$', '')); // 49.99
\`\`\``,
        jsCode: `// Numbers and booleans in testing

// Count-based test data
const expectedItemCount = 3;
const maxPerPage = 10;
const totalProducts = 47;

// Calculate expected page count
const expectedPages = Math.ceil(totalProducts / maxPerPage);
console.log('Expected pages:', expectedPages); // 5

// Price calculation for assertion
const unitPrice = 19.99;
const quantity = 3;
const expectedTotal = Math.round(unitPrice * quantity * 100) / 100;
console.log('Expected total: $' + expectedTotal); // $59.97

// Boolean states
const isLoggedIn = true;
const isAdminUser = false;
const hasPermission = isLoggedIn && isAdminUser;
console.log('Has admin permission:', hasPermission); // false

// Parsing from page text
const pageText = '47 products found';
const productCount = parseInt(pageText, 10);
console.log('Parsed count:', productCount); // 47`,
        playwrightCode: `import { test, expect } from '@playwright/test';

test('Cart item count is correct', async ({ page }) => {
  await page.goto('/cart');

  // Count elements on page
  const cartItems = page.locator('.cart-item');
  const count = await cartItems.count(); // returns a number

  // Number assertion
  expect(count).toBe(3);
  expect(count).toBeGreaterThan(0);
  expect(count).toBeLessThanOrEqual(10);
});

test('Checkbox state validation', async ({ page }) => {
  await page.goto('/settings');

  // Boolean check — isChecked() returns true/false
  const isChecked = await page.locator('#remember-me').isChecked();
  expect(isChecked).toBe(true);

  // isVisible(), isEnabled() also return booleans
  const isEnabled = await page.locator('#save-btn').isEnabled();
  expect(isEnabled).toBe(true);
});

test('Pagination count', async ({ page }) => {
  await page.goto('/products');

  // Parse number from text
  const countText = await page.locator('.result-count').textContent();
  const resultCount = parseInt(countText ?? '0', 10);
  expect(resultCount).toBeGreaterThan(0);
});`,
        bridgeExplanation: 'Numbers count your elements; booleans check their state. Together they cover all your "verify that..." assertions.',
        bridgeSteps: [
          { step: 1, label: 'Manual Check', description: 'Count items in cart visually', code: '// Open cart page\n// Count: I see 3 items', color: 'blue' },
          { step: 2, label: 'Number in JS', description: 'Store expected count', code: 'const expectedCount = 3;', color: 'yellow' },
          { step: 3, label: 'Playwright Assert', description: 'Verify count programmatically', code: "const count = await page.locator('.cart-item').count();\nexpect(count).toBe(3);", color: 'green' },
        ],
      },
      playground: {
        defaultCode: `// Numbers and booleans for test assertions

// Test scenario: verifying a product listing page

const totalProducts = 47;
const productsPerPage = 10;
const currentPage = 1;

// Calculate expected values
const expectedPageCount = Math.ceil(totalProducts / productsPerPage);
const expectedProductsOnPage = Math.min(productsPerPage, totalProducts);
const expectedFirstProductIndex = (currentPage - 1) * productsPerPage + 1;

console.log('Total products:', totalProducts);
console.log('Products per page:', productsPerPage);
console.log('Total pages:', expectedPageCount);
console.log('First product index on page:', expectedFirstProductIndex);

// Boolean state checks
const isFirstPage = currentPage === 1;
const isLastPage = currentPage === expectedPageCount;
const hasPreviousButton = !isFirstPage;
const hasNextButton = !isLastPage;

console.log('\\nPagination state:');
console.log('Previous button visible:', hasPreviousButton);
console.log('Next button visible:', hasNextButton);`,
        language: 'typescript',
        hints: ['Math.ceil rounds up (useful for page counts)', 'parseInt() converts text to integer', 'Boolean methods: isVisible(), isChecked(), isEnabled()'],
        patterns: [
          { regex: 'Math\\.ceil|Math\\.floor|Math\\.round', outputLines: ['✓ Math operation applied'] },
          { regex: 'parseInt|parseFloat', outputLines: ['✓ Parsing number from text'] },
          { regex: 'true|false', outputLines: ['✓ Boolean value used'] },
        ],
        successMessage: '✓ You can use numbers and booleans in test assertions!',
      },
      quiz: [
        { id: 'm2-l11-q1', type: 'multiple-choice', question: 'In Playwright, what does page.locator(".item").count() return?', options: ['The text of all items', 'The number of elements matching the selector', 'A boolean', 'The first element'], correctIndex: 1, explanation: '.count() returns the total number of elements matching the locator as a number.', points: 10 },
        { id: 'm2-l11-q2', type: 'code-reading', question: 'What does this calculate?', code: "const pages = Math.ceil(47 / 10);", options: ['4', '4.7', '5', '47'], correctIndex: 2, explanation: '47 / 10 = 4.7. Math.ceil rounds UP to the next whole number: 5.', points: 10 },
        { id: 'm2-l11-q3', type: 'multiple-choice', question: 'Which Playwright method returns a boolean?', options: ['page.locator().text()', 'page.locator().isVisible()', 'page.locator().count()', 'page.goto()'], correctIndex: 1, explanation: 'isVisible() returns true if the element is visible on the page, false otherwise.', points: 10 },
        { id: 'm2-l11-q4', type: 'code-reading', question: 'What does parseInt("$49.99".replace("$", ""), 10) equal?', options: ['49', '49.99', '4999', 'NaN'], correctIndex: 0, explanation: "After replace, the string becomes '49.99'. parseInt reads until it hits a non-numeric character — stops at the dot — returning 49.", points: 10 },
        { id: 'm2-l11-q5', type: 'true-false', question: 'In Playwright, await page.locator("#checkbox").isChecked() returns true even if the checkbox is not checked.', options: ['True', 'False'], correctIndex: 1, explanation: 'False. isChecked() returns true only when the checkbox is in the checked state, and false when it is unchecked.', points: 10 },
      ],
    },
  ],
};
