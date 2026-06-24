export type ExamCategory = 'Configuration' | 'Locators' | 'Assertions' | 'Actions' | 'Navigation' | 'Advanced';

export interface IExamQuestion {
  id: string;
  category: ExamCategory;
  difficulty: 'easy' | 'medium' | 'hard';
  question: string;
  code?: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  points: number;
}

export const EXAM_PASS_THRESHOLD = 70;
export const EXAM_TIME_MINUTES = 60;
export const EXAM_TOTAL_QUESTIONS = 60;

export const CATEGORY_COLORS: Record<ExamCategory, string> = {
  Configuration: 'blue',
  Locators: 'violet',
  Assertions: 'green',
  Actions: 'orange',
  Navigation: 'cyan',
  Advanced: 'red',
};

export const examQuestions: IExamQuestion[] = [
  // ── CONFIGURATION (8) ─────────────────────────────────────────────────────
  {
    id: 'cfg-01',
    category: 'Configuration',
    difficulty: 'easy',
    question: 'Which command bootstraps a new Playwright project with all required files?',
    options: [
      'npm install playwright',
      'npm init playwright@latest',
      'npx create-playwright',
      'npm install @playwright/test --save-dev',
    ],
    correctIndex: 1,
    explanation:
      '`npm init playwright@latest` is the official scaffolding command. It creates playwright.config.ts, example tests, a .gitignore entry, and installs browser binaries automatically.',
    points: 2,
  },
  {
    id: 'cfg-02',
    category: 'Configuration',
    difficulty: 'easy',
    question: 'What is the default timeout for most Playwright actions and assertions?',
    options: ['5,000 ms', '10,000 ms', '30,000 ms', '60,000 ms'],
    correctIndex: 2,
    explanation:
      "Playwright's default action timeout is 30,000 ms (30 seconds). It can be overridden globally in playwright.config.ts with `timeout` and `expect.timeout`, or per-test with `test.setTimeout()`.",
    points: 2,
  },
  {
    id: 'cfg-03',
    category: 'Configuration',
    difficulty: 'medium',
    code: `export default defineConfig({
  use: {
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
    trace: 'on-first-retry',
  },
});`,
    question: 'With this configuration, when is a trace file saved?',
    options: [
      'For every test run',
      'Only for tests that fail on the first attempt',
      'Only when a test is retried after an initial failure',
      'For tests that fail on their last retry attempt',
    ],
    correctIndex: 2,
    explanation:
      '`trace: "on-first-retry"` records a trace only when Playwright retries a test (i.e., after the first failure). This keeps storage low in CI while still capturing useful debug data.',
    points: 3,
  },
  {
    id: 'cfg-04',
    category: 'Configuration',
    difficulty: 'medium',
    question: 'How do you run only tests whose title matches the word "login"?',
    options: [
      'npx playwright test login',
      'npx playwright test --grep login',
      'npx playwright test --filter login',
      'npx playwright test -t login',
    ],
    correctIndex: 1,
    explanation:
      '`--grep` accepts a regular expression and filters tests by title. `npx playwright test login` would look for a test file named "login", not filter by title.',
    points: 2,
  },
  {
    id: 'cfg-05',
    category: 'Configuration',
    difficulty: 'hard',
    code: `export default defineConfig({
  projects: [
    { name: 'chromium', use: { ...devices['Desktop Chrome'] } },
    { name: 'firefox',  use: { ...devices['Desktop Firefox'] } },
    { name: 'webkit',   use: { ...devices['Desktop Safari'] } },
  ],
});`,
    question: 'You have 10 test files. How many total test-file executions will Playwright run?',
    options: ['10', '20', '30', 'Depends on the --workers flag'],
    correctIndex: 2,
    explanation:
      'Each project runs every test file independently. 3 projects × 10 files = 30 executions. The `--workers` flag controls parallelism, but not the total count.',
    points: 3,
  },
  {
    id: 'cfg-06',
    category: 'Configuration',
    difficulty: 'medium',
    question: 'What is the purpose of `baseURL` in playwright.config.ts?',
    options: [
      'It sets the default HTTP origin for `page.goto()` relative paths',
      'It restricts tests to only run against that domain',
      'It is the URL of the Playwright report server',
      'It defines the API base URL for `page.request`',
    ],
    correctIndex: 0,
    explanation:
      'When `baseURL` is set, calls like `page.goto("/login")` are resolved against it — no need to repeat the full origin in every test.',
    points: 3,
  },
  {
    id: 'cfg-07',
    category: 'Configuration',
    difficulty: 'easy',
    question: 'Which command opens the interactive HTML test report after a run?',
    options: [
      'npx playwright show-report',
      'npx playwright open-report',
      'npx playwright report',
      'npx playwright view-results',
    ],
    correctIndex: 0,
    explanation:
      '`npx playwright show-report` opens the last generated HTML report in a local server. The report is generated by the `html` reporter configured in playwright.config.ts.',
    points: 2,
  },
  {
    id: 'cfg-08',
    category: 'Configuration',
    difficulty: 'hard',
    question: 'What does setting `fullyParallel: true` in playwright.config.ts do?',
    options: [
      'Runs all browsers simultaneously',
      'Runs individual test cases within a file in parallel, not just files',
      'Disables the worker limit and uses all CPU cores',
      'Enables parallel retries for flaky tests',
    ],
    correctIndex: 1,
    explanation:
      'By default Playwright parallelises at the file level. `fullyParallel: true` also parallelises individual `test()` calls within a single file — each test can run in a separate worker.',
    points: 4,
  },

  // ── LOCATORS (12) ──────────────────────────────────────────────────────────
  {
    id: 'loc-01',
    category: 'Locators',
    difficulty: 'easy',
    question: 'Which locator method does Playwright most strongly recommend for interactive elements?',
    options: [
      'page.locator("button")',
      'page.getByRole("button")',
      "page.$('button')",
      'page.querySelector("button")',
    ],
    correctIndex: 1,
    explanation:
      '`getByRole()` queries by ARIA role and accessible name, making tests resilient to DOM restructuring and aligned with how assistive technologies see the page.',
    points: 2,
  },
  {
    id: 'loc-02',
    category: 'Locators',
    difficulty: 'easy',
    question: 'How do you locate a form input by its associated `<label>` text?',
    options: [
      'page.locator("input[label=\'Email\']")',
      'page.getByPlaceholder("Email")',
      'page.getByLabel("Email")',
      "page.locator(\"label:has-text('Email') + input\")",
    ],
    correctIndex: 2,
    explanation:
      '`getByLabel()` finds the control associated with a label via `for`/`id` or by nesting. It is the accessible-first recommended approach for form inputs.',
    points: 2,
  },
  {
    id: 'loc-03',
    category: 'Locators',
    difficulty: 'medium',
    code: `const rows = page.locator('table tr');
const count = await rows.count();`,
    question: 'What type does `rows.count()` return?',
    options: [
      'A synchronous number',
      'A Promise<number>',
      'An array of ElementHandles',
      'A Locator object',
    ],
    correctIndex: 1,
    explanation:
      '`locator.count()` returns a `Promise<number>` — it must be awaited. All Playwright locator methods that produce values are asynchronous.',
    points: 3,
  },
  {
    id: 'loc-04',
    category: 'Locators',
    difficulty: 'medium',
    question: 'What is the correct Playwright way to select the third item in a list (index 2)?',
    options: [
      'page.locator("li")[2]',
      'page.locator("li:nth-child(3)")',
      'page.locator("li").nth(2)',
      'page.locator("li").get(2)',
    ],
    correctIndex: 2,
    explanation:
      '`locator.nth(n)` is 0-based and the idiomatic Playwright API. `page.locator("li")[2]` does not work — locators are not arrays.',
    points: 3,
  },
  {
    id: 'loc-05',
    category: 'Locators',
    difficulty: 'medium',
    question: 'Which of the following are valid ways to locate an element by visible text?',
    options: [
      'page.getByText("Submit") only',
      'page.locator("text=Submit") only',
      "page.locator(\":text('Submit')\") only",
      'All three are valid',
    ],
    correctIndex: 3,
    explanation:
      'All three work. `getByText()` is the modern recommended API. `text=Submit` and `:text()` are legacy text engine syntax still supported for backwards compatibility.',
    points: 3,
  },
  {
    id: 'loc-06',
    category: 'Locators',
    difficulty: 'hard',
    code: `const addBtn = page
  .locator('ul')
  .filter({ hasText: 'Product A' })
  .getByRole('button', { name: 'Add to cart' });`,
    question: 'What does this locator chain target?',
    options: [
      'All "Add to cart" buttons on the page',
      'The "Add to cart" button inside a <ul> that contains the text "Product A"',
      'A button followed immediately by "Product A" text',
      'This is invalid — filter() cannot be chained with getByRole()',
    ],
    correctIndex: 1,
    explanation:
      'The chain first finds a `<ul>` that contains "Product A", then scopes the `getByRole` lookup within that element. Chaining is the recommended alternative to fragile CSS paths.',
    points: 4,
  },
  {
    id: 'loc-07',
    category: 'Locators',
    difficulty: 'medium',
    question: 'Which two approaches correctly locate an element by its data-testid attribute?',
    options: [
      'page.locator("[data-testid=\'submit\']") and page.getByTestId("submit")',
      'page.getByTestId("submit") and page.findById("submit")',
      'page.locator("#submit") and page.getByTestId("submit")',
      'page.getBySelector("submit") and page.locator("[data-testid=\'submit\']")',
    ],
    correctIndex: 0,
    explanation:
      '`getByTestId("submit")` is shorthand for the CSS attribute selector. The attribute name defaults to `data-testid` but is configurable via `testIdAttribute` in the config.',
    points: 3,
  },
  {
    id: 'loc-08',
    category: 'Locators',
    difficulty: 'hard',
    code: `const dialog = page.getByRole('dialog');
await dialog.getByRole('button', { name: 'Confirm' }).click();`,
    question: 'What is the key benefit of chaining locators this way?',
    options: [
      'It is faster than a single CSS selector',
      'It scopes the button search inside the dialog, preventing false matches elsewhere',
      'It automatically waits for the dialog to open',
      'It disables strict mode for this interaction',
    ],
    correctIndex: 1,
    explanation:
      'Chaining scopes the inner locator to the outer element. Only buttons inside that specific dialog are considered, which prevents "strict mode violations" when the same button label exists elsewhere.',
    points: 4,
  },
  {
    id: 'loc-09',
    category: 'Locators',
    difficulty: 'easy',
    question: 'What attribute does `page.getByPlaceholder("Search...")` match?',
    options: [
      "The element's visible label text",
      "The input's placeholder attribute",
      "The input's name attribute",
      "The element's aria-label attribute",
    ],
    correctIndex: 1,
    explanation:
      '`getByPlaceholder()` matches the `placeholder` HTML attribute. Useful for inputs that lack a visible label.',
    points: 2,
  },
  {
    id: 'loc-10',
    category: 'Locators',
    difficulty: 'medium',
    code: `// Which approach has auto-waiting built in?
// A:
const btn = await page.$('button');
await btn?.click();
// B:
await page.locator('button').click();`,
    question: 'Which approach is preferred and why?',
    options: [
      'A — ElementHandle API is more explicit',
      'B — Locators have built-in auto-waiting and strict mode',
      'Both are identical in behavior',
      'A — page.$() is faster than locator()',
    ],
    correctIndex: 1,
    explanation:
      '`page.locator()` and `getBy*()` methods auto-wait for elements to be actionable and enforce strict mode. `page.$()` returns null if not found and has no retry logic — it is considered legacy.',
    points: 3,
  },
  {
    id: 'loc-11',
    category: 'Locators',
    difficulty: 'hard',
    question: "What happens when a locator matches multiple elements during an action like `.click()`?",
    options: [
      'Playwright clicks the first matching element',
      'Playwright throws a "strict mode violation" error',
      'Playwright waits until only one element matches',
      'Playwright clicks all matching elements',
    ],
    correctIndex: 1,
    explanation:
      'Strict mode is on by default for actions. If the locator resolves to more than one element, Playwright throws an error. Fix by using `.first()`, `.nth()`, or a more specific locator.',
    points: 4,
  },
  {
    id: 'loc-12',
    category: 'Locators',
    difficulty: 'medium',
    question: 'Which `getByRole` option filters by the visible text label of a button?',
    options: [
      '{ text: "Submit" }',
      '{ name: "Submit" }',
      '{ label: "Submit" }',
      '{ value: "Submit" }',
    ],
    correctIndex: 1,
    explanation:
      'The `name` option in `getByRole()` matches the accessible name of the element — which for buttons is typically the visible text or aria-label.',
    points: 3,
  },

  // ── ASSERTIONS (10) ───────────────────────────────────────────────────────
  {
    id: 'ast-01',
    category: 'Assertions',
    difficulty: 'easy',
    question: 'Which assertion correctly checks that the page navigated to `/dashboard`?',
    options: [
      'expect(page.url()).toBe("/dashboard")',
      'await expect(page).toHaveURL("/dashboard")',
      'await expect(page).toMatchURL("/dashboard")',
      'expect(await page.url()).toContain("/dashboard")',
    ],
    correctIndex: 1,
    explanation:
      '`await expect(page).toHaveURL()` is a web-first assertion that auto-retries until the URL matches or the timeout expires. The `expect(page.url()).toBe()` variant is a point-in-time check — it does not retry and will flake on slow navigation.',
    points: 2,
  },
  {
    id: 'ast-02',
    category: 'Assertions',
    difficulty: 'easy',
    question: 'How do you assert that a button is disabled?',
    options: [
      'await expect(button).toBeDisabled()',
      'await expect(button).not.toBeEnabled()',
      'await expect(button).toHaveAttribute("disabled")',
      'All of the above work',
    ],
    correctIndex: 3,
    explanation:
      'All three are valid. `toBeDisabled()` is the most semantic. `not.toBeEnabled()` is equivalent. `toHaveAttribute("disabled")` checks the DOM attribute directly, which also works for HTML disabled state.',
    points: 3,
  },
  {
    id: 'ast-03',
    category: 'Assertions',
    difficulty: 'medium',
    code: `await expect(page.getByRole('alert')).toBeVisible();`,
    question: 'What is the critical advantage of this web-first assertion over `expect(await el.isVisible()).toBe(true)`?',
    options: [
      'Web-first assertions are more readable',
      'Web-first assertions auto-retry until the condition passes or the timeout expires',
      'Web-first assertions work across multiple elements simultaneously',
      'Web-first assertions do not require `await`',
    ],
    correctIndex: 1,
    explanation:
      '`expect(locator).toBeVisible()` polls repeatedly until the element becomes visible, or fails after the assertion timeout. `expect(await el.isVisible()).toBe(true)` is a single snapshot — if the element is mid-animation, it flakes.',
    points: 3,
  },
  {
    id: 'ast-04',
    category: 'Assertions',
    difficulty: 'medium',
    question: 'What does `await expect(locator).toHaveText("Hello")` verify?',
    options: [
      "The element's innerHTML contains \"Hello\"",
      "The element's innerText exactly equals \"Hello\" (case-sensitive)",
      'The element\'s visible text matches "Hello" after whitespace normalisation',
      "The element's value attribute equals \"Hello\"",
    ],
    correctIndex: 2,
    explanation:
      '`toHaveText()` normalises whitespace and matches against the visible text content. Pass a regex for partial/case-insensitive matching, e.g. `toHaveText(/hello/i)`.',
    points: 3,
  },
  {
    id: 'ast-05',
    category: 'Assertions',
    difficulty: 'medium',
    code: `const cards = page.locator('.product-card');
await expect(cards).toHaveCount(5);`,
    question: 'When does `toHaveCount(5)` pass?',
    options: [
      'Immediately when exactly 5 elements exist in the DOM',
      'After polling until exactly 5 elements exist, or failing after the timeout',
      'If at least 5 elements exist',
      'Only when all 5 elements are visible',
    ],
    correctIndex: 1,
    explanation:
      '`toHaveCount()` is a web-first assertion — it retries until the locator matches the exact count. This handles asynchronous list rendering without manual waits.',
    points: 3,
  },
  {
    id: 'ast-06',
    category: 'Assertions',
    difficulty: 'hard',
    code: `await expect.soft(page.getByTestId('name')).toHaveText('Alice');
await expect.soft(page.getByTestId('email')).toHaveText('alice@test.com');
await expect.soft(page.getByTestId('role')).toHaveText('Admin');`,
    question: 'What is the purpose of `expect.soft()`?',
    options: [
      'Soft assertions do not throw immediately — all run and failures are reported together at the end',
      'Soft assertions have a longer retry timeout than regular assertions',
      'Soft assertions only emit console warnings instead of failing the test',
      'Soft assertions are for non-critical checks that always pass',
    ],
    correctIndex: 0,
    explanation:
      '`expect.soft()` marks an assertion as non-blocking. If it fails the test continues, and all accumulated soft-assertion failures are reported at the end. Ideal for form validation where you want to check every field at once.',
    points: 4,
  },
  {
    id: 'ast-07',
    category: 'Assertions',
    difficulty: 'medium',
    question: 'What is the correct assertion to verify an `<input>` field\'s current typed value?',
    options: [
      'await expect(input).toHaveText("hello")',
      'await expect(input).toHaveValue("hello")',
      'await expect(input).toContainText("hello")',
      'await expect(input).toHaveAttribute("value", "hello")',
    ],
    correctIndex: 1,
    explanation:
      '`toHaveValue()` checks the `.value` property of form elements. `toHaveText()` reads visible text content, not the input value. `toHaveAttribute("value")` only checks the initial HTML attribute, not what the user typed.',
    points: 2,
  },
  {
    id: 'ast-08',
    category: 'Assertions',
    difficulty: 'medium',
    question: 'How does `toContainText()` differ from `toHaveText()`?',
    options: [
      'They are aliases — no difference',
      '`toContainText()` checks for a substring; `toHaveText()` requires the full text to match',
      '`toContainText()` is case-insensitive; `toHaveText()` is case-sensitive',
      '`toContainText()` works on any element; `toHaveText()` only on text nodes',
    ],
    correctIndex: 1,
    explanation:
      '`toContainText("Welcome")` passes if the element text includes "Welcome" anywhere. `toHaveText("Welcome")` requires the full normalised text to equal "Welcome".',
    points: 3,
  },
  {
    id: 'ast-09',
    category: 'Assertions',
    difficulty: 'easy',
    question: 'Which assertion verifies that a checkbox is in the checked state?',
    options: [
      'await expect(checkbox).toHaveValue("true")',
      'await expect(checkbox).toBeChecked()',
      'await expect(checkbox).toHaveAttribute("checked")',
      'await expect(checkbox).toBeSelected()',
    ],
    correctIndex: 1,
    explanation:
      '`toBeChecked()` tests the `.checked` property of the element. `toHaveAttribute("checked")` only reflects the initial HTML attribute — it does not update when the user toggles the checkbox.',
    points: 2,
  },
  {
    id: 'ast-10',
    category: 'Assertions',
    difficulty: 'hard',
    question: 'How do you assert that a specific network request was made to `/api/users`?',
    options: [
      'await expect(page).toHaveRequest("/api/users")',
      'const req = await page.waitForRequest(/\\/api\\/users/); expect(req.url()).toContain("/api/users")',
      'await expect(page.route("/api/users")).toBeCalled()',
      'await expect(page.request).toMatchURL("/api/users")',
    ],
    correctIndex: 1,
    explanation:
      '`page.waitForRequest()` resolves when a matching request is made and returns the Request object. You then assert on its URL, method, headers, or body.',
    points: 4,
  },

  // ── ACTIONS (8) ───────────────────────────────────────────────────────────
  {
    id: 'act-01',
    category: 'Actions',
    difficulty: 'easy',
    question: 'How do you type text into an input, clearing any existing content first?',
    options: [
      'await page.getByLabel("Email").type("test@example.com")',
      'await page.getByLabel("Email").fill("test@example.com")',
      'await page.getByLabel("Email").sendKeys("test@example.com")',
      'await page.getByLabel("Email").setValue("test@example.com")',
    ],
    correctIndex: 1,
    explanation:
      '`fill()` clears the field and sets the value atomically, triggering input events. `type()` simulates keystroke-by-keystroke typing without clearing first and is slower.',
    points: 2,
  },
  {
    id: 'act-02',
    category: 'Actions',
    difficulty: 'medium',
    question: 'What is the difference between `locator.click()` and `locator.dispatchEvent("click")`?',
    options: [
      'No difference — both trigger identical behaviour',
      '`click()` simulates a real user interaction with pointer/hover events; `dispatchEvent` bypasses actionability checks',
      '`dispatchEvent()` is the recommended approach in Playwright',
      '`click()` only works on `<button>` elements',
    ],
    correctIndex: 1,
    explanation:
      '`click()` scrolls into view, checks visibility, fires pointer and mouse events — identical to a real user. `dispatchEvent("click")` fires the event without any actionability checks, useful only to test event handlers directly.',
    points: 3,
  },
  {
    id: 'act-03',
    category: 'Actions',
    difficulty: 'medium',
    code: `await page.getByRole('combobox', { name: 'Country' }).selectOption('Australia');`,
    question: 'What arguments can be passed to `selectOption()`?',
    options: [
      'Only the option label text',
      'Only the option value attribute',
      'A string (value or label), an object { value }, { label }, or { index }, or an array for multi-select',
      'Only a numeric index',
    ],
    correctIndex: 2,
    explanation:
      '`selectOption()` is flexible: pass a bare string (matched against value or label), `{ value: "au" }`, `{ label: "Australia" }`, `{ index: 2 }`, or an array of any of these for multi-select.',
    points: 3,
  },
  {
    id: 'act-04',
    category: 'Actions',
    difficulty: 'hard',
    question: 'What is the correct way to handle a file upload when the `<input type="file">` is hidden behind a styled button?',
    options: [
      'await page.locator("input[type=file]").setInputFiles("file.pdf")',
      'Use page.waitForEvent("filechooser") before triggering the open action, then call setFiles() on the chooser',
      'Directly call page.uploadFile("file.pdf")',
      'Both A and B are valid depending on the implementation',
    ],
    correctIndex: 3,
    explanation:
      'Both patterns work: `setInputFiles()` on a visible or hidden `<input type="file">` element, or `waitForEvent("filechooser")` + `filechooser.setFiles()` for custom upload buttons that programmatically open the dialog.',
    points: 4,
  },
  {
    id: 'act-05',
    category: 'Actions',
    difficulty: 'medium',
    question: 'How do you handle a browser `alert()` dialog in Playwright?',
    options: [
      'Playwright automatically dismisses all dialogs',
      'Register `page.on("dialog", dialog => dialog.accept())` before the action that triggers the alert',
      'Await `page.waitForAlert()` then call `.accept()`',
      'Dialogs are not supported in headless mode',
    ],
    correctIndex: 1,
    explanation:
      'Register the `dialog` event listener before the action that triggers it. The handler receives a `Dialog` object with `.accept()`, `.dismiss()`, `.message()`, and `.defaultValue()` methods.',
    points: 3,
  },
  {
    id: 'act-06',
    category: 'Actions',
    difficulty: 'medium',
    code: `await page.keyboard.press('Control+A');
await page.keyboard.press('Backspace');`,
    question: 'What does this keyboard sequence do?',
    options: [
      'Selects all text in the focused element and deletes it',
      'Opens the browser "select all" dialog then presses backspace',
      'Presses Ctrl, A, and Backspace simultaneously',
      'This syntax is invalid; use keyboard.down() instead',
    ],
    correctIndex: 0,
    explanation:
      '`keyboard.press("Control+A")` fires the Ctrl+A key combination (select all). `keyboard.press("Backspace")` then deletes the selection. The `+` syntax triggers simultaneous key presses.',
    points: 3,
  },
  {
    id: 'act-07',
    category: 'Actions',
    difficulty: 'hard',
    question: 'What is "actionability" in Playwright?',
    options: [
      'Whether an element has JavaScript event listeners attached',
      'A set of pre-checks (visible, stable, enabled, not obscured) Playwright performs before executing an action',
      'Whether an element is inside the viewport',
      'Whether all network requests for the page have completed',
    ],
    correctIndex: 1,
    explanation:
      'Before performing actions, Playwright auto-waits for elements to pass actionability checks: visible, stable (no active CSS animation/transition), enabled, and not covered by another element. This eliminates most timing-based flakiness.',
    points: 4,
  },
  {
    id: 'act-08',
    category: 'Actions',
    difficulty: 'medium',
    code: `await page.locator('.draggable').dragTo(page.locator('.drop-zone'));`,
    question: 'What interaction does `dragTo()` perform?',
    options: [
      'A full drag-and-drop — mousedown, mousemove to target, mouseup',
      'Copies the element into the drop zone',
      'Clicks the source then shift-clicks the target',
      'Moves the element in the DOM tree using JavaScript',
    ],
    correctIndex: 0,
    explanation:
      '`dragTo()` synthesises the full drag sequence: mousedown on the source, mousemove to the target, then mouseup. It handles scroll-into-view automatically.',
    points: 3,
  },

  // ── NAVIGATION & NETWORK (8) ──────────────────────────────────────────────
  {
    id: 'nav-01',
    category: 'Navigation',
    difficulty: 'easy',
    question: 'How do you navigate to a path relative to the `baseURL` set in playwright.config.ts?',
    options: [
      'await page.goto("http://localhost:3000/login")',
      'await page.goto("/login")',
      'await page.navigate("/login")',
      'await page.open("/login")',
    ],
    correctIndex: 1,
    explanation:
      'When `baseURL` is configured, `page.goto("/login")` is automatically resolved against it. This keeps tests portable across environments.',
    points: 2,
  },
  {
    id: 'nav-02',
    category: 'Navigation',
    difficulty: 'medium',
    question: 'What does `page.waitForLoadState("networkidle")` wait for?',
    options: [
      'All images, scripts, and stylesheets to finish downloading',
      'The DOM content to be fully parsed (`DOMContentLoaded`)',
      'No network connections for at least 500 ms',
      'The page `load` event to fire',
    ],
    correctIndex: 2,
    explanation:
      '"networkidle" waits until there are no more than 0 network connections for 500 ms. Use "load" for the load event, "domcontentloaded" for DOM parsing. "networkidle" is useful for SPAs after navigation.',
    points: 3,
  },
  {
    id: 'nav-03',
    category: 'Navigation',
    difficulty: 'medium',
    code: `const [newPage] = await Promise.all([
  context.waitForEvent('page'),
  page.getByText('Open in new tab').click(),
]);`,
    question: 'Why must `waitForEvent` and `click` be wrapped in `Promise.all()`?',
    options: [
      'To run them in parallel for speed',
      'If you `await click()` first, the new tab opens before the listener is set up and the event is missed',
      '`waitForEvent` requires a concurrent action to resolve',
      'This is optional; sequential execution also works',
    ],
    correctIndex: 1,
    explanation:
      '`Promise.all()` ensures the event listener is registered before `click()` fires. If `click()` were awaited first, the `page` event would already have fired by the time `waitForEvent` is registered.',
    points: 4,
  },
  {
    id: 'nav-04',
    category: 'Navigation',
    difficulty: 'hard',
    question: 'What is the recommended pattern to wait for an API response triggered by a button click?',
    options: [
      'await page.waitForTimeout(2000)',
      'await page.waitForSelector(".results")',
      'await page.waitForResponse("/api/search"); then await click()',
      'await Promise.all([page.waitForResponse("/api/search"), page.getByRole("button").click()])',
    ],
    correctIndex: 3,
    explanation:
      '`Promise.all()` registers `waitForResponse` before `click()` fires, so the response is never missed. Avoid `waitForTimeout` — it is slow and brittle.',
    points: 4,
  },
  {
    id: 'nav-05',
    category: 'Navigation',
    difficulty: 'medium',
    question: 'Why is `await page.waitForTimeout(3000)` considered an anti-pattern?',
    options: [
      '`waitForTimeout` is not a valid Playwright method',
      'It makes tests slow and brittle — tests should wait on conditions, not fixed durations',
      'It only accepts a maximum of 1000 ms',
      'It blocks the Node.js event loop',
    ],
    correctIndex: 1,
    explanation:
      'Fixed sleeps always waste time (wait even when done) and can still flake (CI is slower than dev). Replace with web-first assertions or event-based waiting: `waitForResponse`, `waitForSelector`, `toBeVisible()`, etc.',
    points: 3,
  },
  {
    id: 'nav-06',
    category: 'Navigation',
    difficulty: 'hard',
    code: `await page.route('**/api/users', route => {
  route.fulfill({
    status: 200,
    body: JSON.stringify([{ id: 1, name: 'Alice' }]),
  });
});`,
    question: 'What does `route.fulfill()` do?',
    options: [
      'Records the real response for later replay',
      'Intercepts the request and returns a mock response without contacting the server',
      'Blocks the request and returns a 404',
      'Modifies the request headers before forwarding to the server',
    ],
    correctIndex: 1,
    explanation:
      '`route.fulfill()` short-circuits the network request and returns the specified response from Playwright itself. The server is never contacted. Essential for testing UI with controlled data.',
    points: 4,
  },
  {
    id: 'nav-07',
    category: 'Navigation',
    difficulty: 'medium',
    question: 'How do you intercept a request and modify it before it reaches the server?',
    options: [
      'route.fulfill({ ...modified })',
      'route.abort()',
      'route.continue({ headers: { ...modified } })',
      'page.intercept(route => route.modify())',
    ],
    correctIndex: 2,
    explanation:
      '`route.continue()` forwards the request to the server with optional overrides (URL, method, headers, body). Use `route.fulfill()` to mock the response entirely, or `route.abort()` to cancel the request.',
    points: 3,
  },
  {
    id: 'nav-08',
    category: 'Navigation',
    difficulty: 'medium',
    question: 'What does `page.goto()` return?',
    options: [
      'void',
      'A Promise<Response | null>',
      'A Promise<Page>',
      'The response body as a string',
    ],
    correctIndex: 1,
    explanation:
      '`page.goto()` returns a `Promise<Response | null>`. The Response is the main document navigation response. It resolves to `null` for `data:` URLs and same-document navigations.',
    points: 3,
  },

  // ── ADVANCED (14) ─────────────────────────────────────────────────────────
  {
    id: 'adv-01',
    category: 'Advanced',
    difficulty: 'medium',
    question: 'What is a Browser Context in Playwright?',
    options: [
      'A separate browser process with its own memory space',
      'An isolated environment (cookies, storage, auth state) within a single browser instance',
      'A JavaScript execution context within a page',
      'A configuration object for browser launch options',
    ],
    correctIndex: 1,
    explanation:
      'A Browser Context is like a fresh incognito window — isolated cookies, localStorage, sessionStorage, and network state. Multiple contexts share one browser process, making parallel tests fast without spawning extra browsers.',
    points: 3,
  },
  {
    id: 'adv-02',
    category: 'Advanced',
    difficulty: 'hard',
    code: `// playwright.config.ts
export default defineConfig({
  use: { storageState: 'auth.json' },
});`,
    question: 'What is the purpose of `storageState` in Playwright?',
    options: [
      'To share localStorage across test files',
      'To save and restore authenticated session state (cookies + localStorage) so login is skipped',
      'To configure the maximum storage quota for tests',
      'To mock localStorage for testing purposes',
    ],
    correctIndex: 1,
    explanation:
      '`storageState` captures cookies and localStorage to a JSON file. When reused, every test context starts already logged in — skipping the full auth flow dramatically speeds up large test suites.',
    points: 4,
  },
  {
    id: 'adv-03',
    category: 'Advanced',
    difficulty: 'easy',
    question: 'What command launches Playwright UI Mode for interactive test debugging?',
    options: [
      'npx playwright test --debug',
      'npx playwright test --ui',
      'npx playwright show-report',
      'npx playwright open',
    ],
    correctIndex: 1,
    explanation:
      '`npx playwright test --ui` opens Playwright UI Mode — a visual interface to run, watch, filter, and debug tests with a live browser preview, time-travel replay, and detailed action logs.',
    points: 2,
  },
  {
    id: 'adv-04',
    category: 'Advanced',
    difficulty: 'medium',
    question: 'What is the Playwright Trace Viewer primarily used for?',
    options: [
      'Monitoring live test execution in CI pipelines',
      'Post-mortem debugging — replaying actions, DOM snapshots, network, and console logs step by step',
      'Real-time performance profiling of web applications',
      'Comparing screenshots across different browsers',
    ],
    correctIndex: 1,
    explanation:
      'The Trace Viewer lets you step through every action in a recorded test, seeing the DOM at each point, network calls, console output, and screenshots. Launch with `npx playwright show-trace trace.zip`.',
    points: 3,
  },
  {
    id: 'adv-05',
    category: 'Advanced',
    difficulty: 'hard',
    code: `test.describe.parallel('Dashboard', () => {
  test('loads widgets', async ({ page }) => { /* ... */ });
  test('shows correct totals', async ({ page }) => { /* ... */ });
});`,
    question: 'What does `test.describe.parallel()` do?',
    options: [
      'Runs these tests in parallel workers regardless of the global workers setting',
      'Allows the tests within this block to run concurrently in separate workers',
      'Runs all tests in the file in parallel',
      'It is identical to `test.describe()` — no behavioural difference',
    ],
    correctIndex: 1,
    explanation:
      'By default, tests in one file run sequentially. `test.describe.parallel()` opts those tests into parallel execution within the block. Each test still runs in its own worker context.',
    points: 4,
  },
  {
    id: 'adv-06',
    category: 'Advanced',
    difficulty: 'medium',
    question: 'What is the recommended way to share login setup efficiently across many test files?',
    options: [
      'Copy-paste the login code into each test file',
      'Use `globalSetup` to log in once and save session state with `storageState`',
      'Define a custom Playwright fixture with `test.extend()`',
      'Both B and C are valid and complementary approaches',
    ],
    correctIndex: 3,
    explanation:
      '`globalSetup` runs once before all tests — ideal for obtaining and saving auth state to `storageState`. Custom fixtures (via `test.extend()`) inject per-test or per-worker setup with automatic teardown. Both are used in production suites.',
    points: 4,
  },
  {
    id: 'adv-07',
    category: 'Advanced',
    difficulty: 'hard',
    code: `const isMobile = await page.evaluate(() => window.innerWidth < 768);`,
    question: 'What does `page.evaluate()` do?',
    options: [
      'Evaluates a CSS selector and returns matching elements',
      'Executes a JavaScript function in the browser context and returns the serialised result to Node.js',
      'Validates the page against WCAG accessibility rules',
      "Measures the page's Core Web Vitals",
    ],
    correctIndex: 1,
    explanation:
      '`page.evaluate()` runs the provided function inside the browser\'s JS environment. The return value is serialised (JSON-safe types) and returned to the Node.js test. Use it for browser APIs not exposed by Playwright.',
    points: 3,
  },
  {
    id: 'adv-08',
    category: 'Advanced',
    difficulty: 'medium',
    question: 'What is the Page Object Model (POM) pattern?',
    options: [
      'A built-in Playwright class for managing page state',
      'A design pattern that encapsulates page locators and interactions into reusable classes',
      'A pattern for sharing pages between browser contexts',
      'A way to run tests on multiple pages simultaneously',
    ],
    correctIndex: 1,
    explanation:
      'POM wraps locators and user-facing actions into a class per page/component. Tests call methods like `loginPage.signIn("user", "pass")` instead of raw selectors — improving readability and reducing duplication. Playwright recommends injecting POMs via fixtures.',
    points: 3,
  },
  {
    id: 'adv-09',
    category: 'Advanced',
    difficulty: 'hard',
    code: `const response = await page.request.get('/api/status');
expect(response.ok()).toBeTruthy();
const body = await response.json();`,
    question: 'What Playwright API is used here to make direct HTTP requests without a browser?',
    options: [
      'page.fetch()',
      'playwright.request()',
      'APIRequestContext (via `page.request` or `request` fixture)',
      'page.http()',
    ],
    correctIndex: 2,
    explanation:
      '`APIRequestContext` (accessed via `page.request` or the standalone `request` fixture) makes HTTP requests that share cookies/auth state with the browser context. Ideal for API assertions and test data seeding.',
    points: 4,
  },
  {
    id: 'adv-10',
    category: 'Advanced',
    difficulty: 'medium',
    question: 'How does Playwright handle iframes when using locators?',
    options: [
      'Locators automatically search inside iframes',
      'Use `page.frameLocator()` to scope locators to an iframe',
      'You must switch to the iframe context with `page.switchToFrame()`',
      'Iframes are not supported in Playwright',
    ],
    correctIndex: 1,
    explanation:
      '`page.frameLocator("#my-iframe")` returns a FrameLocator that scopes all subsequent `getBy*` and `locator()` calls inside the specified iframe — no context switching needed.',
    points: 3,
  },
  {
    id: 'adv-11',
    category: 'Advanced',
    difficulty: 'hard',
    code: `test.beforeAll(async ({ browser }) => {
  const context = await browser.newContext();
  const page = await context.newPage();
  await page.goto('/login');
  // ... perform login
  await context.storageState({ path: 'auth.json' });
  await context.close();
});`,
    question: 'What is the outcome of calling `context.storageState({ path: "auth.json" })`?',
    options: [
      'Clears all cookies and localStorage for the context',
      'Saves the current cookies and localStorage of the context to auth.json',
      'Restores previously saved state from auth.json',
      'Exports the network request log to auth.json',
    ],
    correctIndex: 1,
    explanation:
      '`context.storageState({ path })` serialises all cookies and origin-specific localStorage entries to a JSON file. Later tests reuse it via `use: { storageState: "auth.json" }` to start pre-authenticated.',
    points: 4,
  },
  {
    id: 'adv-12',
    category: 'Advanced',
    difficulty: 'medium',
    question: 'What does the `--headed` flag do when running Playwright tests?',
    options: [
      'Shows the browser UI during test execution instead of running headlessly',
      'Increases the test timeout to account for visual rendering',
      'Enables screenshot capture for every test step',
      'Forces tests to run on a single worker',
    ],
    correctIndex: 0,
    explanation:
      '`npx playwright test --headed` launches browsers in visible (non-headless) mode. Useful for local debugging to watch interactions in real time. CI typically runs headless for speed.',
    points: 2,
  },
  {
    id: 'adv-13',
    category: 'Advanced',
    difficulty: 'hard',
    question: 'How do you add a custom Playwright fixture that provides a pre-logged-in page?',
    options: [
      'Override the `page` fixture in playwright.config.ts',
      'Use `test.extend()` to define a new fixture that logs in and yields the page',
      'Subclass the `Page` class from @playwright/test',
      'Add a `beforeEach` hook in every test file',
    ],
    correctIndex: 1,
    explanation:
      '`test.extend()` creates a new `test` object with additional fixtures. The fixture function receives `{ page }`, performs login, then `yield`s — Playwright handles setup before each test and teardown after. This is the recommended POM injection pattern.',
    points: 4,
  },
  {
    id: 'adv-14',
    category: 'Advanced',
    difficulty: 'medium',
    question: 'What does `test.skip()` do when called inside a test?',
    options: [
      'Marks the entire test suite as skipped',
      'Skips the current test with an optional reason, shown in the report',
      'Skips the next test in the file',
      'Removes the test from the run without recording it',
    ],
    correctIndex: 1,
    explanation:
      '`test.skip()` (or `test.skip(condition, "reason")`) conditionally skips the current test. The skip is recorded in the HTML report with the provided reason, making it easy to track intentional skips.',
    points: 3,
  },
];
