import type { IExamQuestion } from './exam.questions';

/** Exam 4 — Expert Level. 60 questions, none repeated from Exams 1–3. */
export const exam4Questions: IExamQuestion[] = [
  // ── CONFIGURATION (10) ───────────────────────────────────────────────────
  {
    id: 'e4-cfg-01',
    category: 'Configuration',
    difficulty: 'hard',
    code: `export default defineConfig({
  use: {
    bypassCSP: true,
  },
});`,
    question: 'When would you set `bypassCSP: true`?',
    options: [
      'To disable CORS checks between test and app origins',
      'To allow Playwright to inject scripts (like `addInitScript`) into pages with a strict Content-Security-Policy that would block them',
      'To run tests in headless mode without certificate checks',
      'To skip SSL verification for self-signed development certificates',
    ],
    correctIndex: 1,
    explanation:
      '`bypassCSP: true` disables the page\'s Content-Security-Policy so Playwright can inject scripts via `addInitScript()` or `addScriptTag()` without the CSP blocking them. Use carefully — it changes security behavior from what real users experience.',
    points: 4,
  },
  {
    id: 'e4-cfg-02',
    category: 'Configuration',
    difficulty: 'hard',
    code: `export default defineConfig({
  use: {
    javaScriptEnabled: false,
  },
});`,
    question: 'What does `javaScriptEnabled: false` enable you to test?',
    options: [
      'Server-side rendering output — how the page looks before any client-side JavaScript runs',
      'Whether JavaScript errors are thrown during test execution',
      'Pages that explicitly opt out of JavaScript via a meta tag',
      'Tests that only use CSS selectors without JavaScript locators',
    ],
    correctIndex: 0,
    explanation:
      '`javaScriptEnabled: false` disables JavaScript execution in the browser entirely. Useful for testing SSR/static sites, checking that critical content is not hidden behind JS, or verifying no-JS accessibility.',
    points: 4,
  },
  {
    id: 'e4-cfg-03',
    category: 'Configuration',
    difficulty: 'medium',
    code: `export default defineConfig({
  webServer: {
    command: 'npm run dev',
    url: 'http://localhost:3000',
    reuseExistingServer: !process.env.CI,
  },
});`,
    question: 'What does `webServer.reuseExistingServer` control?',
    options: [
      'Whether Playwright reuses the same browser between test files',
      'Whether Playwright reuses an already-running dev server (true) or always starts a fresh one (false)',
      'Whether multiple test workers share a single server connection',
      'Whether the server\'s port is reused after the test run',
    ],
    correctIndex: 1,
    explanation:
      '`reuseExistingServer: !process.env.CI` means: on a developer\'s machine (no CI env), reuse the existing dev server if one is running — avoiding a 30-second startup. On CI (where `CI` is always set), always start a fresh server for reproducibility.',
    points: 3,
  },
  {
    id: 'e4-cfg-04',
    category: 'Configuration',
    difficulty: 'medium',
    code: `export default defineConfig({
  testIgnore: ['**/*helper*.ts', '**/fixtures/**'],
});`,
    question: 'What does `testIgnore` do?',
    options: [
      'Lists test titles to skip during the run',
      'Glob patterns for files that should be ignored when scanning for test files',
      'Patterns of test IDs excluded from retries',
      'Names of test.describe blocks to skip',
    ],
    correctIndex: 1,
    explanation:
      '`testIgnore` is an array of globs — files matching these patterns are excluded from the test discovery even if they match `testMatch`. Use it to exclude helper files or fixture definitions that live alongside test files.',
    points: 2,
  },
  {
    id: 'e4-cfg-05',
    category: 'Configuration',
    difficulty: 'medium',
    question: 'What does `outputDir` in playwright.config.ts control?',
    options: [
      'The directory for compiled TypeScript output',
      'The folder where test artifacts (screenshots, videos, traces) are saved',
      'The location of the generated HTML report',
      'The directory Playwright scans for page object models',
    ],
    correctIndex: 1,
    explanation:
      '`outputDir` sets the base directory for test artifacts — failed screenshots, traces, and videos. Default is `test-results/`. The HTML report location is controlled separately via the `html` reporter\'s `outputFolder` option.',
    points: 2,
  },
  {
    id: 'e4-cfg-06',
    category: 'Configuration',
    difficulty: 'hard',
    code: `use: {
  screenshot: 'only-on-failure',
  video: 'retain-on-failure',
  trace: 'on-first-retry',
}`,
    question: 'What does `trace: "on-first-retry"` do?',
    options: [
      'Records a trace file only when the test succeeds on its first retry',
      'Starts tracing from the first retry attempt — so the trace captures the exact failing scenario',
      'Records the first action of every test then stops',
      'Enables tracing globally but only for one retry per test',
    ],
    correctIndex: 1,
    explanation:
      '`trace: "on-first-retry"` begins trace recording when a test retries for the first time. This balances performance (no trace on passing tests) and debugging value (full trace of the failure). The trace is discarded if the retry passes.',
    points: 4,
  },
  {
    id: 'e4-cfg-07',
    category: 'Configuration',
    difficulty: 'hard',
    question: 'What is the purpose of `use.serviceWorkers` in playwright.config.ts?',
    options: [
      'Installs a Service Worker for all tests automatically',
      'Controls whether Playwright allows or blocks service worker registration ("allow" | "block")',
      'Sets the caching strategy for service worker assets',
      'Registers a Node.js worker for parallel test execution',
    ],
    correctIndex: 1,
    explanation:
      '`use.serviceWorkers: "block"` prevents service workers from being registered, ensuring tests always hit the real network (bypassing cache). `"allow"` (default) lets service workers run normally. Block them when testing cache-busting or network-dependent scenarios.',
    points: 4,
  },
  {
    id: 'e4-cfg-08',
    category: 'Configuration',
    difficulty: 'hard',
    question: 'How are timeout priority levels ordered in Playwright (from highest to lowest priority)?',
    options: [
      'Global config → Project config → test.setTimeout() → individual assertion timeout',
      'test.setTimeout() → Project config → Global config → individual assertion timeout',
      'Individual assertion timeout → test.setTimeout() → Project config → Global config',
      'All timeouts have equal priority — last one set wins',
    ],
    correctIndex: 1,
    explanation:
      'Per-test `test.setTimeout()` overrides project-level `timeout`, which overrides the global `timeout` in `defineConfig()`. Individual assertion timeouts (passed as options) override `expect.timeout`. The most specific setting always wins.',
    points: 4,
  },
  {
    id: 'e4-cfg-09',
    category: 'Configuration',
    difficulty: 'medium',
    question: 'What does `fullyParallel: true` do when set at the config level?',
    options: [
      'Runs each test file in its own process',
      'Runs all tests (even those within the same file) in parallel across workers',
      'Makes the reporter output synchronously instead of streaming',
      'Disables test isolation between tests in the same file',
    ],
    correctIndex: 1,
    explanation:
      'By default, tests within a file run serially. `fullyParallel: true` allows Playwright to parallelize across individual tests — not just across files. Each test may get a different worker. Ensure tests are fully isolated (no shared file state) before enabling this.',
    points: 3,
  },
  {
    id: 'e4-cfg-10',
    category: 'Configuration',
    difficulty: 'medium',
    question: 'What is the difference between `page.setDefaultTimeout()` and `page.setDefaultNavigationTimeout()`?',
    options: [
      'No difference — they both set the same underlying timeout',
      '`setDefaultTimeout` affects all waits and assertions; `setDefaultNavigationTimeout` only affects `goto()`, `goBack()`, `goForward()`, and `reload()`',
      '`setDefaultNavigationTimeout` affects all waits; `setDefaultTimeout` only affects assertions',
      '`setDefaultTimeout` is deprecated; only `setDefaultNavigationTimeout` should be used',
    ],
    correctIndex: 1,
    explanation:
      '`setDefaultTimeout()` sets the default for all `page.wait*`, `locator.*`, and expect operations. `setDefaultNavigationTimeout()` sets the default specifically for navigation operations. Navigation timeout also overrides the default timeout for navigation actions.',
    points: 3,
  },

  // ── LOCATORS (10) ─────────────────────────────────────────────────────────
  {
    id: 'e4-loc-01',
    category: 'Locators',
    difficulty: 'medium',
    question: 'How do you locate an element by its `data-testid` attribute?',
    options: [
      'page.locator("[data-testid=\'submit\']")',
      'page.getByTestId("submit")',
      'Both A and B work',
      'page.getByAttribute("data-testid", "submit")',
    ],
    correctIndex: 2,
    explanation:
      'Both work: `getByTestId("submit")` is shorthand for `locator("[data-testid=\'submit\']")`. The attribute name can be customised via `use.testIdAttribute` in playwright.config.ts (e.g. to `data-cy` for Cypress compatibility).',
    points: 2,
  },
  {
    id: 'e4-loc-02',
    category: 'Locators',
    difficulty: 'medium',
    question: 'How do you retrieve the bounding box (position and size) of an element?',
    options: [
      'await locator.getRect()',
      'await locator.boundingBox()',
      'await locator.dimensions()',
      'await page.measure(locator)',
    ],
    correctIndex: 1,
    explanation:
      '`locator.boundingBox()` returns `{ x, y, width, height }` in pixels relative to the viewport. Returns `null` if the element is not visible. Useful for precise mouse interactions or visual calculations.',
    points: 2,
  },
  {
    id: 'e4-loc-03',
    category: 'Locators',
    difficulty: 'medium',
    code: `const tableRow = page.getByRole('row', { name: 'Alice Johnson' });
const deleteBtn = tableRow.getByRole('button', { name: 'Delete' });`,
    question: 'What does chaining locators (calling `getByRole` on another locator) do?',
    options: [
      'Searches the entire page for the button named "Delete"',
      'Scopes the button search to only within the matched row element',
      'Creates a CSS descendant selector automatically',
      'Combines both locators into a list and returns all matches',
    ],
    correctIndex: 1,
    explanation:
      'Chaining locators restricts the search scope. `tableRow.getByRole("button", { name: "Delete" })` only looks for the Delete button inside the Alice Johnson row — preventing false matches from other rows that also have Delete buttons.',
    points: 2,
  },
  {
    id: 'e4-loc-04',
    category: 'Locators',
    difficulty: 'hard',
    code: `const input = page.getByRole('textbox').filter({ hasText: 'Search' });`,
    question: 'Does `.filter({ hasText: ... })` work on input elements that have no text content?',
    options: [
      'Yes — it matches inputs whose `placeholder` or `value` contains the text',
      'No — inputs are void elements and have no text content; this filter would always return 0 matches',
      'Yes — it searches the `aria-label` attribute instead',
      'It depends on whether the input has a label element',
    ],
    correctIndex: 1,
    explanation:
      'Input elements have no inner text — `.filter({ hasText: "Search" })` checks `textContent()`, which is empty for `<input>`. Use `.filter({ has: page.getByPlaceholder("Search") })` or filter by a nearby label using `.getByRole("textbox", { name: "Search" })`.',
    points: 4,
  },
  {
    id: 'e4-loc-05',
    category: 'Locators',
    difficulty: 'medium',
    question: 'What is the key advantage of `getByRole()` over CSS or XPath selectors?',
    options: [
      'It is faster because it uses native browser APIs',
      'It tests from the accessibility tree — the same way screen readers and assistive technologies navigate',
      'It works across Shadow DOM boundaries without the `pierce/` prefix',
      'It automatically handles dynamic element IDs',
    ],
    correctIndex: 1,
    explanation:
      '`getByRole()` queries the accessibility tree rather than the DOM structure. This means tests verify that the element is accessible — not just present. If the role is wrong (e.g. a div acting as a button without `role="button"`), `getByRole` will fail, catching accessibility regressions.',
    points: 3,
  },
  {
    id: 'e4-loc-06',
    category: 'Locators',
    difficulty: 'hard',
    code: `await page.locator('#container').highlight();`,
    question: 'What does `locator.highlight()` do?',
    options: [
      'Adds a yellow background to the matched element in production',
      'Draws a red border around matched elements in the headed browser for visual debugging',
      'Returns the element\'s highlighted text selection',
      'Runs the locator in strict mode and throws if multiple elements match',
    ],
    correctIndex: 1,
    explanation:
      '`locator.highlight()` is a debug-only method that visually marks matched elements in a headed browser run. It helps verify your locator selects exactly the right element. Never use in committed code — it has no effect in assertions.',
    points: 3,
  },
  {
    id: 'e4-loc-07',
    category: 'Locators',
    difficulty: 'medium',
    question: 'How do you get all inner texts of a locator as an array using a single call?',
    options: [
      'await locator.textContent()',
      'await locator.allInnerTexts()',
      'await locator.allTextContents()',
      'Both B and C — with a subtle visibility difference',
    ],
    correctIndex: 3,
    explanation:
      '`allInnerTexts()` uses `innerText` for each element — respects CSS visibility and returns only rendered text. `allTextContents()` uses `textContent` — includes hidden text. Both return `string[]`. Choose based on whether you want to include hidden text.',
    points: 3,
  },
  {
    id: 'e4-loc-08',
    category: 'Locators',
    difficulty: 'hard',
    question: 'What does `locator.inputValue()` return for a `<textarea>` element?',
    options: [
      'The visible text displayed in the textarea',
      'The current value (typed or pre-filled content) of the textarea',
      'The textarea\'s `placeholder` attribute',
      'The number of characters in the textarea',
    ],
    correctIndex: 1,
    explanation:
      '`locator.inputValue()` returns the `.value` property of `<input>`, `<textarea>`, and `<select>` elements. For textareas, this is the current content — the same as what would be submitted in a form. Use `getAttribute("placeholder")` for the placeholder.',
    points: 3,
  },
  {
    id: 'e4-loc-09',
    category: 'Locators',
    difficulty: 'hard',
    code: `const frame = page.frameLocator('iframe').nth(1);
const button = frame.getByRole('button', { name: 'Pay' });`,
    question: 'What does `.nth(1)` do when chained on `page.frameLocator("iframe")`?',
    options: [
      'Gets the second iframe (0-indexed) on the page',
      'Gets the first iframe (1-indexed) on the page',
      'Gets all iframes except the first',
      'Returns the iframe at position 1 only if it is visible',
    ],
    correctIndex: 0,
    explanation:
      '`.nth()` is 0-indexed — `.nth(0)` is the first, `.nth(1)` is the second iframe. When multiple iframes exist (e.g. embedded payment forms), use `.nth()` to disambiguate which frame\'s contents to interact with.',
    points: 4,
  },
  {
    id: 'e4-loc-10',
    category: 'Locators',
    difficulty: 'hard',
    question: 'In strict mode, what happens when a locator matches more than one element during an action?',
    options: [
      'The action is applied to all matched elements',
      'Playwright throws a strict mode violation error — one locator must resolve to exactly one element',
      'The action is applied to the first matched element silently',
      'Playwright warns but continues with the first match',
    ],
    correctIndex: 1,
    explanation:
      'Playwright uses strict mode by default — if a locator resolves to multiple elements when performing an action (click, fill, etc.), it throws an error listing the matches. This prevents accidentally interacting with the wrong element. Use `.first()`, `.nth()`, or `.filter()` to be explicit.',
    points: 4,
  },

  // ── ASSERTIONS (10) ───────────────────────────────────────────────────────
  {
    id: 'e4-ast-01',
    category: 'Assertions',
    difficulty: 'hard',
    code: `await expect(page).toHaveScreenshot('button.png', {
  maxDiffPixels: 100,
  threshold: 0.2,
  clip: { x: 0, y: 0, width: 200, height: 50 },
});`,
    question: 'What does the `clip` option in `toHaveScreenshot()` do?',
    options: [
      'Crops the comparison to only the specified rectangle within the page',
      'Limits the pixel diff to the clipped area',
      'Clips text rendering to fit within the given dimensions',
      'Sets the viewport to the given dimensions before screenshotting',
    ],
    correctIndex: 0,
    explanation:
      '`clip` restricts the screenshot to the specified `{ x, y, width, height }` rectangle before comparison — useful for comparing only a specific region of the page. `maxDiffPixels` sets a maximum absolute pixel count that can differ.',
    points: 4,
  },
  {
    id: 'e4-ast-02',
    category: 'Assertions',
    difficulty: 'hard',
    code: `await expect(locator).toBeInViewport({ ratio: 0.5 });`,
    question: 'What does the `ratio` option in `toBeInViewport()` control?',
    options: [
      'The element must be at least 50% visible within the viewport',
      'The viewport must be resized to 50% of the element\'s size',
      'The test retries until 50% of matching elements are in view',
      'The assertion scales the viewport ratio before checking',
    ],
    correctIndex: 0,
    explanation:
      '`toBeInViewport({ ratio: 0.5 })` asserts that at least 50% of the element\'s area is within the visible viewport. Without `ratio`, any non-zero intersection passes. Useful for infinite-scroll tests where partial visibility matters.',
    points: 4,
  },
  {
    id: 'e4-ast-03',
    category: 'Assertions',
    difficulty: 'medium',
    question: 'What does `expect(locator).not.toBeAttached()` assert?',
    options: [
      'The element is in the DOM but hidden',
      'The element is not present in the DOM at all',
      'The element is detached from keyboard tab order',
      'The element has no attached event listeners',
    ],
    correctIndex: 1,
    explanation:
      '`not.toBeAttached()` passes when the element is completely absent from the DOM. This is more explicit than `toHaveCount(0)` when you have a single known element reference. Equivalent to checking `locator.count() === 0` with auto-retry.',
    points: 3,
  },
  {
    id: 'e4-ast-04',
    category: 'Assertions',
    difficulty: 'hard',
    code: `const errors: string[] = [];
test.beforeEach(({ page }) => {
  page.on('pageerror', err => errors.push(err.message));
});

test('no JS errors', async ({ page }) => {
  await page.goto('/');
  expect(errors).toHaveLength(0);
});`,
    question: 'What does the `"pageerror"` event capture?',
    options: [
      'HTTP 4xx/5xx responses from the server',
      'Uncaught JavaScript exceptions thrown in the browser context',
      'Playwright assertion failures',
      'Console.error() calls from the page',
    ],
    correctIndex: 1,
    explanation:
      '`"pageerror"` fires for uncaught exceptions — runtime JavaScript errors that bubble up to `window.onerror`. This is different from `"console"` which captures explicit `console.error()` calls. Listening to `pageerror` is a clean way to assert zero runtime errors.',
    points: 4,
  },
  {
    id: 'e4-ast-05',
    category: 'Assertions',
    difficulty: 'hard',
    code: `await expect(locator).toMatchAriaSnapshot(\`
  - heading "Dashboard" [level=1]
  - navigation:
    - link "Home"
    - link "Reports"
\`);`,
    question: 'What does `toMatchAriaSnapshot()` assert?',
    options: [
      'The element\'s screenshot matches a saved ARIA diagram',
      'The accessibility tree structure of the element matches the YAML-style snapshot string',
      'The ARIA labels of all children are sorted as specified',
      'The element renders with the correct contrast ratio',
    ],
    correctIndex: 1,
    explanation:
      '`toMatchAriaSnapshot()` checks the element\'s ARIA tree against a human-readable YAML-style string. It verifies semantic structure — heading levels, navigation landmarks, link names — making it excellent for accessibility regression testing.',
    points: 4,
  },
  {
    id: 'e4-ast-06',
    category: 'Assertions',
    difficulty: 'medium',
    question: 'What is the difference between `toHaveText()` and `toContainText()`?',
    options: [
      'No difference — they are aliases',
      '`toHaveText()` requires the full text to match; `toContainText()` passes if the text is a substring',
      '`toContainText()` is case-insensitive; `toHaveText()` is case-sensitive',
      '`toHaveText()` checks `innerText`; `toContainText()` checks `textContent`',
    ],
    correctIndex: 1,
    explanation:
      '`toHaveText("Saved")` asserts the element\'s trimmed text equals exactly "Saved" (or matches the full regex). `toContainText("Saved")` passes if "Saved" appears anywhere in the text. Use `toHaveText` for exact matches and `toContainText` for substring checks.',
    points: 3,
  },
  {
    id: 'e4-ast-07',
    category: 'Assertions',
    difficulty: 'medium',
    code: `await expect(response).toHaveHeader('Content-Type', 'application/json');`,
    question: 'Where does `response.toHaveHeader()` come from in Playwright?',
    options: [
      'The `APIResponse` assertion methods via `expect(response)` on an `APIResponse` object from `request.get()`',
      'The `page.response` object returned from `page.waitForResponse()`',
      'A built-in Node.js HTTP assertion',
      'The `context.on("response")` handler',
    ],
    correctIndex: 0,
    explanation:
      '`toHaveHeader()` is an `APIResponse` assertion — it works on responses from `request.get()`, `request.post()`, etc. (Playwright\'s built-in API testing via `APIRequestContext`). `page.waitForResponse()` returns a plain `Response`, not an `APIResponse`.',
    points: 4,
  },
  {
    id: 'e4-ast-08',
    category: 'Assertions',
    difficulty: 'medium',
    question: 'What does `await expect(locator).toBeEnabled()` assert for a `<button>` element?',
    options: [
      'The button is visible on the page',
      'The button does not have a `disabled` attribute or property',
      'The button has a click event listener attached',
      'The button is the active focused element',
    ],
    correctIndex: 1,
    explanation:
      '`toBeEnabled()` checks that the element is not disabled. For `<button>`, it checks that the `disabled` DOM property is false. It also inherits disabled state from a parent `<fieldset disabled>`. Use `not.toBeEnabled()` as an alias for `toBeDisabled()`.',
    points: 2,
  },
  {
    id: 'e4-ast-09',
    category: 'Assertions',
    difficulty: 'hard',
    code: `await expect(locator).toHaveAccessibleName('Full name');`,
    question: 'How is an element\'s accessible name computed?',
    options: [
      'From `aria-label`, `aria-labelledby`, associated `<label>`, or element content — in priority order',
      'Only from the `aria-label` attribute',
      'From the element\'s `name` attribute',
      'From the element\'s visible text content only',
    ],
    correctIndex: 0,
    explanation:
      'The accessible name is computed via the accessible name calculation algorithm: `aria-labelledby` first (references other elements), then `aria-label`, then element-specific naming (e.g. `<label for="...">`, `<img alt="...">`, button text content). `toHaveAccessibleName()` checks this computed value.',
    points: 4,
  },
  {
    id: 'e4-ast-10',
    category: 'Assertions',
    difficulty: 'easy',
    question: 'What does `await expect(locator).toBeChecked()` assert?',
    options: [
      'The element has been clicked at least once',
      'The checkbox or radio button\'s `checked` property is true',
      'The element passed all previous assertions',
      'The element has a `data-checked="true"` attribute',
    ],
    correctIndex: 1,
    explanation:
      '`toBeChecked()` asserts the DOM `checked` property is `true` for `<input type="checkbox">` or `<input type="radio">`. Pass `{ checked: false }` to assert it is unchecked, or use the equivalent `toBeUnchecked()`.',
    points: 2,
  },

  // ── ACTIONS (10) ──────────────────────────────────────────────────────────
  {
    id: 'e4-act-01',
    category: 'Actions',
    difficulty: 'hard',
    code: `await page.mouse.wheel(0, 500);`,
    question: 'What does `page.mouse.wheel(deltaX, deltaY)` simulate?',
    options: [
      'Drags the element 500 pixels down the page',
      'Fires a `wheel` event with the given horizontal and vertical scroll deltas',
      'Scrolls the page to position (0, 500)',
      'Rotates the mouse wheel 500 degrees',
    ],
    correctIndex: 1,
    explanation:
      '`mouse.wheel(deltaX, deltaY)` fires a native `wheel` event. The browser\'s scroll behavior depends on whether anything is listening to the event. `deltaY: 500` scrolls downward. Use `page.evaluate(() => window.scrollTo(0, 500))` for direct viewport scrolling.',
    points: 3,
  },
  {
    id: 'e4-act-02',
    category: 'Actions',
    difficulty: 'medium',
    code: `await page.keyboard.insertText('café ☕');`,
    question: 'What is the key difference between `keyboard.insertText()` and `keyboard.type()`?',
    options: [
      '`insertText()` presses keys one at a time; `type()` inserts the whole string at once',
      '`insertText()` inserts text without firing keydown/keyup events; `type()` fires the full key event sequence',
      '`insertText()` is faster; `type()` is more accurate',
      '`type()` handles special characters like emoji; `insertText()` does not',
    ],
    correctIndex: 1,
    explanation:
      '`keyboard.insertText()` inserts the string directly into the focused element without simulating individual key strokes — only the `input` event fires. Useful for non-keyboard characters (accents, emoji, Unicode) that cannot be expressed as single key presses.',
    points: 3,
  },
  {
    id: 'e4-act-03',
    category: 'Actions',
    difficulty: 'hard',
    code: `await page.locator('.overlay-btn').click({ force: true });`,
    question: 'What does `click({ force: true })` do, and when should it be used cautiously?',
    options: [
      'Bypasses all actionability checks and clicks even if covered or invisible — use only when actionability checks are incorrectly blocking a valid test',
      'Applies extra click force to trigger animations that require hard presses',
      'Clicks multiple times until the element responds',
      '`force: true` is the default for all actions; this option resets it',
    ],
    correctIndex: 0,
    explanation:
      '`force: true` skips Playwright\'s actionability checks (visibility, stability, hit-test, enabled). It should be used sparingly — if a user cannot click an element, your test probably shouldn\'t either. Legitimate use: elements in transition animations or test harnesses with intentional overlays.',
    points: 4,
  },
  {
    id: 'e4-act-04',
    category: 'Actions',
    difficulty: 'medium',
    code: `const box = await page.locator('.target').boundingBox();
if (box) {
  await page.mouse.click(box.x + box.width / 2, box.y + box.height / 2);
}`,
    question: 'When would you use `boundingBox()` to compute click coordinates rather than `locator.click()`?',
    options: [
      'When the element is inside an iframe',
      'When you need to click at a specific offset from the element\'s center (e.g. exactly 10px from the left edge)',
      '`locator.click()` does not scroll — `boundingBox()` is needed for scroll-dependent elements',
      'Locator.click() always clicks at position (0,0); boundingBox is needed for accuracy',
    ],
    correctIndex: 1,
    explanation:
      '`locator.click({ position: { x, y } })` accepts relative offsets from the element\'s top-left corner, which is usually sufficient. `boundingBox()` is useful for custom coordinate calculations — like clicking exactly at 75% of the width or chaining with canvas-coordinate math.',
    points: 3,
  },
  {
    id: 'e4-act-05',
    category: 'Actions',
    difficulty: 'medium',
    question: 'How do you upload multiple files using `setInputFiles()`?',
    options: [
      'Call `setInputFiles()` once per file',
      'Pass an array of file paths: `locator.setInputFiles(["file1.txt", "file2.txt"])`',
      'Use `locator.uploadFiles(["file1.txt", "file2.txt"])`',
      'Only one file can be uploaded per `setInputFiles()` call',
    ],
    correctIndex: 1,
    explanation:
      'Pass an array to `setInputFiles()` to simulate selecting multiple files at once: `locator.setInputFiles(["a.pdf", "b.pdf"])`. The input must have the `multiple` attribute. To clear selected files, pass an empty array: `setInputFiles([])`.',
    points: 2,
  },
  {
    id: 'e4-act-06',
    category: 'Actions',
    difficulty: 'hard',
    code: `await page.locator('.slider').click({
  position: { x: 150, y: 10 },
});`,
    question: 'What does the `position` option in `click()` specify?',
    options: [
      'The absolute viewport coordinates of the click',
      'The offset in pixels from the element\'s top-left corner where the click lands',
      'The offset from the element\'s center',
      'The CSS transform coordinates of the element',
    ],
    correctIndex: 1,
    explanation:
      '`position: { x, y }` is relative to the element\'s top-left corner. So `{ x: 150, y: 10 }` clicks 150px from the left edge and 10px from the top of the element. Default is the element\'s center.',
    points: 4,
  },
  {
    id: 'e4-act-07',
    category: 'Actions',
    difficulty: 'medium',
    code: `await page.locator('select#country').selectOption(['US', 'CA']);`,
    question: 'What happens when you pass an array to `selectOption()`?',
    options: [
      'The first value in the array is selected; the rest are ignored',
      'All specified values are selected simultaneously — works for `<select multiple>`',
      'A new option is added with the combined values',
      'It throws an error — selectOption only accepts a single value',
    ],
    correctIndex: 1,
    explanation:
      'Passing an array selects multiple options at once — the `<select>` must have the `multiple` attribute. Playwright deselects all current options first and then selects the specified ones.',
    points: 2,
  },
  {
    id: 'e4-act-08',
    category: 'Actions',
    difficulty: 'medium',
    question: 'What does `locator.blur()` do?',
    options: [
      'Visually blurs the element with a CSS filter',
      'Removes keyboard focus from the element, triggering `blur` and `focusout` events',
      'Waits until the element loses focus naturally',
      'Blurs the viewport for screenshot comparison testing',
    ],
    correctIndex: 1,
    explanation:
      '`locator.blur()` programmatically removes focus from an element. It dispatches `blur` and `focusout` events, allowing you to test form validation that triggers on field exit.',
    points: 2,
  },
  {
    id: 'e4-act-09',
    category: 'Actions',
    difficulty: 'hard',
    question: 'How do you make Playwright wait for an element to finish animating before clicking it?',
    options: [
      'Call `locator.waitForAnimation()` before `.click()`',
      'Playwright\'s actionability checks automatically wait for the element to be stable (not moving) before clicking',
      'Set `animationTimeout` in the click options',
      'Add `await page.waitForFunction(() => !isAnimating())` before every click',
    ],
    correctIndex: 1,
    explanation:
      'Playwright\'s stability check (part of actionability) waits until the element\'s bounding box has not moved for two consecutive animation frames before clicking. This is automatic — no explicit waiting needed for most CSS transitions and animations.',
    points: 4,
  },
  {
    id: 'e4-act-10',
    category: 'Actions',
    difficulty: 'hard',
    code: `await page.locator('[contenteditable]').fill('New content');`,
    question: 'Does `locator.fill()` work on `contenteditable` elements?',
    options: [
      'No — `fill()` only works on `<input>` and `<textarea>`',
      'Yes — `fill()` works on `contenteditable` elements and rich-text editors',
      'Only when the element also has a `data-fill` attribute',
      'Only in Chrome — not in Firefox or WebKit',
    ],
    correctIndex: 1,
    explanation:
      '`fill()` supports `<input>`, `<textarea>`, and `[contenteditable]` elements. It focuses the element, clears existing content, and types the new value. For complex rich-text editors that intercept paste events, `keyboard.insertText()` may be more reliable.',
    points: 4,
  },

  // ── NAVIGATION (10) ───────────────────────────────────────────────────────
  {
    id: 'e4-nav-01',
    category: 'Navigation',
    difficulty: 'hard',
    question: 'What is `page.context()` and when would you call it?',
    options: [
      'Returns the Playwright test context object with testInfo data',
      'Returns the `BrowserContext` that owns this page — useful for adding cookies or opening sibling pages',
      'Returns the page\'s JavaScript execution context for `evaluate()`',
      'Returns the current navigation context (URL, history)',
    ],
    correctIndex: 1,
    explanation:
      '`page.context()` returns the `BrowserContext` parent. Use it to add cookies, intercept requests, or open new pages within the same context from a helper that only has access to a `Page` object. Also useful in POM classes that receive `page` but need context-level operations.',
    points: 4,
  },
  {
    id: 'e4-nav-02',
    category: 'Navigation',
    difficulty: 'medium',
    question: 'How do you get all frames (including nested iframes) on a page?',
    options: [
      'await page.allFrames()',
      'page.frames()',
      'page.locator("iframe").all()',
      'page.childFrames()',
    ],
    correctIndex: 1,
    explanation:
      '`page.frames()` returns a flat array of all `Frame` objects including the main frame and all nested iframes. `page.mainFrame()` returns only the top-level frame. `page.frames()` is synchronous — no await needed.',
    points: 2,
  },
  {
    id: 'e4-nav-03',
    category: 'Navigation',
    difficulty: 'hard',
    code: `const client = await context.newCDPSession(page);
await client.send('Network.setOfflineMode', { offline: true });`,
    question: 'What is a CDP session and when do you need one?',
    options: [
      'A Chrome DevTools Protocol session — required for features not exposed in Playwright\'s API',
      'A cached page display session for offline mode',
      'A Content Delivery Protocol session for HAR recording',
      'A cross-device-performance session for measuring render times',
    ],
    correctIndex: 0,
    explanation:
      'CDP (Chrome DevTools Protocol) provides low-level browser control. Playwright wraps most common features, but edge cases (e.g. exact CPU throttling, network emulation profiles) may require a raw CDP session. Only works in Chromium-based browsers.',
    points: 4,
  },
  {
    id: 'e4-nav-04',
    category: 'Navigation',
    difficulty: 'hard',
    code: `await page.route('**/api/**', async route => {
  const response = await route.fetch();
  route.fulfill({ response });
});`,
    question: 'What does `route.fulfill({ response })` do when passed an existing response?',
    options: [
      'Replaces all response headers with the existing response\'s headers only',
      'Replays the existing response to the page exactly as received — body, status, and headers',
      'Fulfills the route with a 200 status regardless of the actual response',
      'Caches the response for future identical requests',
    ],
    correctIndex: 1,
    explanation:
      'Passing the `response` object from `route.fetch()` to `route.fulfill({ response })` proxies the real response unchanged. This is the "passthrough" pattern — useful when you only want to intercept some routes and let others pass through normally.',
    points: 4,
  },
  {
    id: 'e4-nav-05',
    category: 'Navigation',
    difficulty: 'hard',
    code: `await page.route('**/api/**', route => route.fallback());`,
    question: 'What does `route.fallback()` do?',
    options: [
      'Returns a 503 fallback response when the server is unreachable',
      'Passes the request to the next matching route handler, or makes the real request if no other handler matches',
      'Falls back to a cached version of the previous response',
      'Aborts the request and fires the next registered error handler',
    ],
    correctIndex: 1,
    explanation:
      '`route.fallback()` hands off the request to the next registered `page.route()` handler. If no subsequent handler matches, the request proceeds normally to the network. Use this to build middleware-style request chains.',
    points: 4,
  },
  {
    id: 'e4-nav-06',
    category: 'Navigation',
    difficulty: 'medium',
    question: 'How do you wait for a navigation triggered by a form submission?',
    options: [
      'await page.waitForNavigation() called before form.submit()',
      'await Promise.all([page.waitForNavigation(), form.submit()])',
      'await form.submit(); await page.waitForLoadState()',
      'page.waitForNavigation() is deprecated; use page.waitForURL() instead',
    ],
    correctIndex: 3,
    explanation:
      '`page.waitForNavigation()` is now deprecated. The modern pattern is `page.waitForURL(expectedUrl)` after the action, or simply checking the next page\'s content with web-first assertions — they internally wait for navigation to complete.',
    points: 3,
  },
  {
    id: 'e4-nav-07',
    category: 'Navigation',
    difficulty: 'medium',
    question: 'When does `page.goto()` resolve by default?',
    options: [
      'When the `DOMContentLoaded` event fires',
      'When the `load` event fires',
      'When the network is idle for 500ms',
      'When the first response headers arrive',
    ],
    correctIndex: 1,
    explanation:
      '`page.goto()` defaults to `waitUntil: "load"` — it resolves when the page\'s `load` event fires. Override with `waitUntil: "domcontentloaded"` for faster navigation waits, or `"networkidle"` for SPAs that load data after the initial page load.',
    points: 2,
  },
  {
    id: 'e4-nav-08',
    category: 'Navigation',
    difficulty: 'hard',
    code: `await context.grantPermissions(['notifications'], { origin: 'https://app.example.com' });`,
    question: 'What does the `origin` option in `grantPermissions()` control?',
    options: [
      'Scopes the permission grant to only that specific origin — other origins in the context are unaffected',
      'Sets the referrer origin for the permission request',
      'Verifies the origin certificate before granting the permission',
      'The origin option is ignored — permissions always apply to all origins',
    ],
    correctIndex: 0,
    explanation:
      'Without `origin`, the permission is granted to all origins visited in the context. With `origin`, it is scoped to only that specific origin — important when tests visit multiple domains and you don\'t want to grant permissions universally.',
    points: 4,
  },
  {
    id: 'e4-nav-09',
    category: 'Navigation',
    difficulty: 'medium',
    question: 'How do you set a custom HTTP header for all requests in a context?',
    options: [
      'context.setHTTPHeaders({ "X-Token": "abc" })',
      'context.setExtraHTTPHeaders({ "X-Token": "abc" })',
      'Use `use.extraHTTPHeaders` in playwright.config.ts only',
      'page.setExtraHTTPHeaders() must be called on each page individually',
    ],
    correctIndex: 1,
    explanation:
      '`context.setExtraHTTPHeaders()` adds headers to all requests made by any page in the context for the remainder of its lifetime. `page.setExtraHTTPHeaders()` also exists but applies only to that page. The `use.extraHTTPHeaders` config sets them at context creation.',
    points: 2,
  },
  {
    id: 'e4-nav-10',
    category: 'Navigation',
    difficulty: 'medium',
    question: 'What does `context.setOffline(true)` do after a context is created?',
    options: [
      'It throws an error — offline mode can only be set at context creation time',
      'Puts the already-running context into offline mode dynamically — subsequent requests from all pages in the context fail',
      'It only affects new pages opened after the call',
      'It simulates a slow (2G) connection rather than full offline',
    ],
    correctIndex: 1,
    explanation:
      '`context.setOffline(true)` dynamically toggles offline mode on a running context. All pages in the context immediately lose network connectivity. Call `context.setOffline(false)` to restore. This is the API-based equivalent of `use.offline: true` in config.',
    points: 3,
  },

  // ── ADVANCED (10) ─────────────────────────────────────────────────────────
  {
    id: 'e4-adv-01',
    category: 'Advanced',
    difficulty: 'hard',
    code: `test.describe.configure({ mode: 'serial' });`,
    question: 'When is `mode: "serial"` useful inside a describe block?',
    options: [
      'When you want the describe block to run before all other describe blocks',
      'When tests within the block must run in order and share state — e.g. a multi-step wizard where step 2 depends on step 1',
      'To disable parallelism globally when placed in a describe block',
      '`mode: "serial"` is the default — configuring it has no effect',
    ],
    correctIndex: 1,
    explanation:
      '`mode: "serial"` ensures tests run one after another in the same worker, sharing the `page`/`context` fixture between them. If one test fails, subsequent ones are skipped. This is the exception pattern for inherently sequential flows.',
    points: 4,
  },
  {
    id: 'e4-adv-02',
    category: 'Advanced',
    difficulty: 'hard',
    code: `const test = base.extend({
  autoLogger: [async ({ page }, use) => {
    page.on('console', msg => console.log('Browser:', msg.text()));
    await use();
  }, { auto: true }],
});`,
    question: 'What does `{ auto: true }` on a fixture mean?',
    options: [
      'The fixture automatically retries on failure',
      'The fixture is set up for every test without needing to be listed as a parameter in the test function',
      'The fixture automatically generates a default value if not provided',
      'The fixture scope is automatically determined by its dependencies',
    ],
    correctIndex: 1,
    explanation:
      'An auto fixture runs for every test in the suite that uses the extended `test` object — even if the test function doesn\'t declare the fixture as a parameter. Ideal for background setup like request logging, performance monitoring, or console error collection.',
    points: 4,
  },
  {
    id: 'e4-adv-03',
    category: 'Advanced',
    difficulty: 'medium',
    question: 'What does `await page.pause()` do in a Playwright test?',
    options: [
      'Pauses for 1 second and then resumes automatically',
      'Halts test execution and opens the Playwright Inspector — resumes when you click the green play button',
      'Saves a checkpoint that can be resumed later with `--resume`',
      'Pauses network traffic but continues test execution',
    ],
    correctIndex: 1,
    explanation:
      '`page.pause()` suspends the test and opens the Playwright Inspector in the running browser. You can inspect elements, run actions, and step through. Resume by clicking the green button in the Inspector. Only useful during development — remove before committing.',
    points: 3,
  },
  {
    id: 'e4-adv-04',
    category: 'Advanced',
    difficulty: 'hard',
    question: 'In Playwright\'s three-layer timeout hierarchy, what is the correct hierarchy from largest to smallest scope?',
    options: [
      'Global timeout → Test timeout → Action/assertion timeout',
      'Test timeout → Action/assertion timeout → Global timeout',
      'Action/assertion timeout → Test timeout → Global timeout',
      'Global timeout → Action/assertion timeout → Test timeout',
    ],
    correctIndex: 0,
    explanation:
      'The hierarchy is: (1) Global test timeout (`defineConfig({ timeout })`) — max time for the entire test; (2) Individual action/assertion timeout (per-call `{ timeout }` or `expect({ timeout })`). If the action timeout is larger than the remaining test time, the test timeout triggers first.',
    points: 4,
  },
  {
    id: 'e4-adv-05',
    category: 'Advanced',
    difficulty: 'hard',
    code: `export default defineConfig({
  projects: [
    { name: 'setup', testMatch: /global.setup.ts/ },
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'], storageState: 'state.json' },
      dependencies: ['setup'],
    },
  ],
});`,
    question: 'If the "setup" project fails, what happens to the "chromium" project?',
    options: [
      'The "chromium" project runs anyway and may fail on auth-related tests',
      'The "chromium" project is automatically skipped',
      'The "chromium" project is retried with a fresh context',
      'Playwright prompts for manual intervention',
    ],
    correctIndex: 1,
    explanation:
      'When a project listed in `dependencies` fails, all dependent projects are automatically skipped — not failed. This prevents a cascade of auth failures when the setup is broken. The report clearly shows which tests were skipped due to dependency failure.',
    points: 4,
  },
  {
    id: 'e4-adv-06',
    category: 'Advanced',
    difficulty: 'medium',
    question: 'How do you record a Playwright trace for all tests?',
    options: [
      'Run `npx playwright trace record`',
      'Set `use.trace: "on"` in playwright.config.ts',
      'Add `await context.tracing.start()` at the beginning of every test',
      'Pass `--trace` flag to the CLI',
    ],
    correctIndex: 1,
    explanation:
      '`use.trace: "on"` enables tracing for all tests. Options include `"off"`, `"on"`, `"retain-on-failure"`, `"on-first-retry"`, and `"on-all-retries"`. Traces are viewable with `npx playwright show-trace trace.zip` or in the HTML report.',
    points: 3,
  },
  {
    id: 'e4-adv-07',
    category: 'Advanced',
    difficulty: 'hard',
    question: 'What is `testInfo.annotations` used for in a test?',
    options: [
      'Reading annotations added via the test option object in code or via `testInfo.annotations.push()`',
      'Filtering which assertions run based on annotations',
      'Adding comments to the generated TypeScript type declarations',
      'Annotating DOM elements for accessibility testing',
    ],
    correctIndex: 0,
    explanation:
      '`testInfo.annotations` is a mutable array of `{ type, description }` objects. You can push to it programmatically at runtime: `testInfo.annotations.push({ type: "jira", description: "PROJ-123" })`. These appear in the HTML report alongside the test.',
    points: 4,
  },
  {
    id: 'e4-adv-08',
    category: 'Advanced',
    difficulty: 'medium',
    question: 'What does `npx playwright show-report` do?',
    options: [
      'Opens the last HTML test report in your default browser',
      'Prints the test results summary to the terminal',
      'Uploads the report to the Playwright cloud dashboard',
      'Generates a new report from the existing test-results directory',
    ],
    correctIndex: 0,
    explanation:
      '`npx playwright show-report` starts a local HTTP server and opens the HTML report (from `playwright-report/`) in your browser. You can filter, search, view screenshots, and open traces directly from the report.',
    points: 2,
  },
  {
    id: 'e4-adv-09',
    category: 'Advanced',
    difficulty: 'hard',
    code: `import { test as base } from '@playwright/test';

const testA = base.extend({ fixtureA: async ({}, use) => { await use('A'); } });
const testB = base.extend({ fixtureB: async ({}, use) => { await use('B'); } });

import { mergeTests } from '@playwright/test';
export const test = mergeTests(testA, testB);`,
    question: 'What does the resulting `test` object from `mergeTests(testA, testB)` provide?',
    options: [
      'Both `fixtureA` and `fixtureB` are available without needing to double-extend `base`',
      'A test runner that runs testA and testB suites sequentially',
      'A merged reporter that combines both fixture outputs',
      'An error — mergeTests only works with the same base object',
    ],
    correctIndex: 0,
    explanation:
      '`mergeTests()` combines the fixture sets of multiple extended test objects into one. The resulting `test` has all fixtures from `testA` and `testB` — you can use both `fixtureA` and `fixtureB` in the same test without chaining `.extend()` repeatedly.',
    points: 4,
  },
  {
    id: 'e4-adv-10',
    category: 'Advanced',
    difficulty: 'medium',
    question: 'What is a Page Object Model (POM) and what problem does it solve in Playwright tests?',
    options: [
      'A design pattern that wraps page interactions and locators into classes — reducing duplication and making tests resilient to UI changes',
      'A built-in Playwright class that auto-generates test code from a page\'s DOM',
      'A performance profiling model that tracks page load metrics',
      'An official Playwright feature accessible via `page.model()`',
    ],
    correctIndex: 0,
    explanation:
      'The Page Object Model is a design pattern (not a Playwright API). Each page or component gets a class with locators and action methods. Tests call POM methods instead of directly using locators. When the UI changes, only the POM updates — not every test that touches that page.',
    points: 3,
  },
];
