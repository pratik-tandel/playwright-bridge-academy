import type { IExamQuestion } from './exam.questions';

/** Exam 3 — Advanced Patterns. 60 questions, none repeated from Exam 1 or 2. */
export const exam3Questions: IExamQuestion[] = [
  // ── CONFIGURATION (8) ────────────────────────────────────────────────────
  {
    id: 'e3-cfg-01',
    category: 'Configuration',
    difficulty: 'medium',
    code: `export default defineConfig({
  use: {
    geolocation: { latitude: 51.5074, longitude: -0.1278 },
    permissions: ['geolocation'],
  },
});`,
    question: 'What must you include alongside `geolocation` for the location mock to work?',
    options: [
      'Nothing — geolocation mocking works without extra permissions',
      '`permissions: ["geolocation"]` to grant the browser permission to access location',
      '`proxy: true` to route geolocation requests through a mock server',
      '`acceptDownloads: true` to allow geolocation data files',
    ],
    correctIndex: 1,
    explanation:
      'Simply setting coordinates is not enough — the browser also needs `navigator.geolocation` permission granted. Without `permissions: ["geolocation"]`, the page would receive a permission-denied error even though coordinates are set.',
    points: 3,
  },
  {
    id: 'e3-cfg-02',
    category: 'Configuration',
    difficulty: 'medium',
    code: `export default defineConfig({
  use: {
    colorScheme: 'dark',
  },
});`,
    question: 'What does `colorScheme: "dark"` affect in the test browser?',
    options: [
      'The Playwright UI\'s colour scheme',
      'The `prefers-color-scheme` CSS media feature — the browser reports dark mode to the page',
      'The operating system\'s dark mode setting',
      'The screenshot background colour',
    ],
    correctIndex: 1,
    explanation:
      '`colorScheme` sets the browser\'s `prefers-color-scheme` media feature. Pages using `@media (prefers-color-scheme: dark)` will render their dark theme, enabling dark-mode visual testing.',
    points: 2,
  },
  {
    id: 'e3-cfg-03',
    category: 'Configuration',
    difficulty: 'hard',
    code: `export default defineConfig({
  use: {
    offline: true,
  },
});`,
    question: 'What happens when you set `offline: true` in the use block?',
    options: [
      'The test machine\'s internet connection is disabled',
      'The browser context simulates being offline — network requests fail with a connection error',
      'Only API requests are blocked; page navigation still works',
      'The test skips if no internet connection is available',
    ],
    correctIndex: 1,
    explanation:
      '`offline: true` puts the browser context in offline mode — all network requests (including page navigations and fetch calls) fail as if the device has no connectivity. Useful for testing offline-first PWA behavior, service workers, and error states.',
    points: 3,
  },
  {
    id: 'e3-cfg-04',
    category: 'Configuration',
    difficulty: 'medium',
    code: `export default defineConfig({
  use: {
    timezoneId: 'America/New_York',
  },
});`,
    question: 'What does `timezoneId` control during tests?',
    options: [
      'The timezone displayed in Playwright\'s HTML report',
      'The browser\'s reported timezone for `Date`, `Intl`, and timezone-sensitive APIs',
      'The test runner\'s scheduling timezone for cron-based tests',
      'The server\'s timezone when making API requests',
    ],
    correctIndex: 1,
    explanation:
      '`timezoneId` overrides the operating system timezone for the browser context. All JavaScript `Date` operations and `Intl` formatting in the page use the specified timezone — essential for testing date-sensitive UI without changing the host machine\'s clock.',
    points: 3,
  },
  {
    id: 'e3-cfg-05',
    category: 'Configuration',
    difficulty: 'medium',
    code: `export default defineConfig({
  use: {
    extraHTTPHeaders: {
      'X-Custom-Header': 'playwright-test',
    },
  },
});`,
    question: 'When is `extraHTTPHeaders` useful?',
    options: [
      'When you want to add custom headers to Playwright\'s HTML report',
      'To inject custom HTTP headers on every request made by the browser — useful for auth tokens or test-mode flags',
      'To override the Accept-Language header only',
      'To set headers sent in fetch() calls from Node.js in the test file',
    ],
    correctIndex: 1,
    explanation:
      '`extraHTTPHeaders` adds specified headers to every HTTP request made by the browser context. Common use: passing an API key, a test-mode flag, or a bypass token to prevent rate limiting during tests.',
    points: 3,
  },
  {
    id: 'e3-cfg-06',
    category: 'Configuration',
    difficulty: 'hard',
    question: 'How do you reuse an authenticated session across tests without logging in each time?',
    options: [
      'Set `reuseExistingServer: true` in the config',
      'Save state with `context.storageState({ path: "state.json" })` and set `storageState: "state.json"` in the use block',
      'Use `global.setup.ts` to set a cookie via the OS clipboard',
      'Pass `--headed` flag to reuse the browser window between runs',
    ],
    correctIndex: 1,
    explanation:
      'The authentication pattern: (1) log in once in a global setup, (2) save the storage state (cookies + localStorage) to a file, (3) reference that file via `use.storageState`. Playwright restores the full session for each test without re-logging in.',
    points: 4,
  },
  {
    id: 'e3-cfg-07',
    category: 'Configuration',
    difficulty: 'medium',
    question: 'What does `testMatch` in playwright.config.ts control?',
    options: [
      'The regex used to match test names for `--grep`',
      'The glob patterns for files Playwright treats as test files',
      'The naming convention enforced for test() blocks',
      'The matching strategy for locators (exact vs. substring)',
    ],
    correctIndex: 1,
    explanation:
      '`testMatch` is a string or array of glob patterns that determine which files are considered test files. Default is `**/*.{test,spec}.{js,mjs,cjs,jsx,ts,tsx,mts,cts}`. You can restrict to only `.spec.ts` files or expand to custom suffixes.',
    points: 2,
  },
  {
    id: 'e3-cfg-08',
    category: 'Configuration',
    difficulty: 'hard',
    question: 'In a multi-project playwright.config.ts, how do you run a project only after another project completes?',
    options: [
      'Set `after: ["setup-project"]` inside the dependent project',
      'Use `dependencies: ["setup-project"]` in the dependent project\'s config',
      'List the projects in order — Playwright runs them sequentially',
      'Use `runAfter: ["setup-project"]` in the project block',
    ],
    correctIndex: 1,
    explanation:
      '`dependencies` in a project config lists projects that must complete first. If the dependency project fails, the dependent project is skipped. This is the standard pattern for global auth setup: the "setup" project logs in and saves state; all test projects depend on it.',
    points: 4,
  },

  // ── LOCATORS (10) ─────────────────────────────────────────────────────────
  {
    id: 'e3-loc-01',
    category: 'Locators',
    difficulty: 'hard',
    code: `const frame = page.frameLocator('#preview-iframe');
await frame.getByRole('button', { name: 'Subscribe' }).click();`,
    question: 'What is `page.frameLocator()` used for?',
    options: [
      'Selecting a `<frame>` HTML element for visual assertion',
      'Creating a locator that resolves elements inside an iframe\'s document',
      'Waiting for an iframe to finish loading',
      'Accessing the iframe\'s network requests',
    ],
    correctIndex: 1,
    explanation:
      '`frameLocator()` returns a locator scoped to the content inside an iframe. All chained locator methods (getByRole, getByText, etc.) resolve within that frame\'s document, not the main page. Use `.nth(0)` for multiple iframes.',
    points: 4,
  },
  {
    id: 'e3-loc-02',
    category: 'Locators',
    difficulty: 'hard',
    code: `await page.locator('.host-element').locator('pierce/.shadow-btn').click();`,
    question: 'What does the `pierce/` prefix in a CSS selector do?',
    options: [
      'Forces Playwright to bypass actionability checks',
      'Crosses Shadow DOM boundaries — locating elements inside a shadow root',
      'Targets elements using the browser\'s pierce (experimental) engine',
      'Targets the element\'s parent across any DOM depth',
    ],
    correctIndex: 1,
    explanation:
      'The `pierce/` prefix makes the CSS selector pierce through Shadow DOM boundaries. Without it, standard CSS selectors cannot reach inside shadow roots. `locator("pierce/.shadow-btn")` finds `.shadow-btn` inside any attached shadow root.',
    points: 4,
  },
  {
    id: 'e3-loc-03',
    category: 'Locators',
    difficulty: 'hard',
    code: `const items = await page.locator('.list-item').all();
for (const item of items) {
  console.log(await item.textContent());
}`,
    question: 'What does `locator.all()` return?',
    options: [
      'A list of all matching DOM element handles',
      'An array of Locator objects, one per matched element, resolved at call time',
      'A promise for the first matched element only',
      'A count of how many elements matched',
    ],
    correctIndex: 1,
    explanation:
      '`locator.all()` resolves the locator immediately and returns an array of Locator instances — one per element. Unlike `locator.count()`, it gives you iterable Locators. Note: there is no auto-waiting — if elements haven\'t loaded, the array may be empty.',
    points: 4,
  },
  {
    id: 'e3-loc-04',
    category: 'Locators',
    difficulty: 'medium',
    question: 'What does `await locator.allTextContents()` return?',
    options: [
      'A single string joining all matching elements\' text',
      'An array of strings — one text content per matched element',
      'The text of only the first matched element',
      'An array of ElementHandle objects with a `text` property',
    ],
    correctIndex: 1,
    explanation:
      '`allTextContents()` is a shorthand that returns `Promise<string[]>` — the text content of each element matching the locator. Equivalent to `all()` followed by `Promise.all(items.map(i => i.textContent()))` but shorter.',
    points: 3,
  },
  {
    id: 'e3-loc-05',
    category: 'Locators',
    difficulty: 'medium',
    question: 'What does `await locator.count()` return?',
    options: [
      'A Locator with the count as its text',
      'The number of elements currently matching the locator',
      'The total number of assertions that ran against the locator',
      'The number of retries performed',
    ],
    correctIndex: 1,
    explanation:
      '`locator.count()` resolves immediately and returns a number — the current count of matched elements. For asserting on the count with auto-retry, prefer `expect(locator).toHaveCount(N)` instead.',
    points: 2,
  },
  {
    id: 'e3-loc-06',
    category: 'Locators',
    difficulty: 'hard',
    code: `const button = page
  .getByRole('button', { name: 'Save' })
  .and(page.locator('[data-testid="primary-action"]'));`,
    question: 'What does the `.and()` combinator do?',
    options: [
      'Adds the second locator as an additional fallback',
      'Matches only elements that satisfy BOTH locators simultaneously',
      'Runs assertions from both locators and merges the results',
      'Returns a union of elements matching either locator',
    ],
    correctIndex: 1,
    explanation:
      '`locator.and(other)` creates a locator that matches elements satisfying both the original and the `other` locator. Think of it as a CSS `:is()` intersection — narrowing results that match both criteria.',
    points: 4,
  },
  {
    id: 'e3-loc-07',
    category: 'Locators',
    difficulty: 'medium',
    code: `const row = page.locator('tr').nth(2);`,
    question: 'What does `.nth(2)` target?',
    options: [
      'The 2nd element (1-indexed) — same as CSS :nth-child(2)',
      'The 3rd element (0-indexed)',
      'Elements at positions 2 through the end',
      'Every 2nd element in the list',
    ],
    correctIndex: 1,
    explanation:
      '`.nth()` is 0-indexed — `.nth(0)` is the first match, `.nth(1)` is the second, `.nth(2)` is the third. This is different from CSS `:nth-child()` which is 1-indexed.',
    points: 2,
  },
  {
    id: 'e3-loc-08',
    category: 'Locators',
    difficulty: 'medium',
    code: `const text = await page.locator('#tooltip').evaluate(el => el.dataset.content);`,
    question: 'What does `locator.evaluate()` do?',
    options: [
      'Runs an assertion on the element in Node.js',
      'Executes a function in the browser with the DOM element as the argument and returns the result',
      'Evaluates the CSS selector of the locator',
      'Returns the element\'s computed accessibility tree node',
    ],
    correctIndex: 1,
    explanation:
      '`locator.evaluate(fn)` passes the matched DOM element as the argument to `fn`, which runs in the browser context. The return value is serialised and returned to Node.js. Useful for reading properties not exposed by Playwright\'s API.',
    points: 3,
  },
  {
    id: 'e3-loc-09',
    category: 'Locators',
    difficulty: 'medium',
    code: `const locators = await page.locator('.card').evaluateAll(cards =>
  cards.map(c => c.getAttribute('data-id'))
);`,
    question: 'What is the difference between `evaluate()` and `evaluateAll()`?',
    options: [
      'No difference — both pass a single element to the callback',
      '`evaluateAll()` passes an array of ALL matched elements to the callback at once',
      '`evaluateAll()` runs the callback once per matched element in parallel',
      '`evaluateAll()` returns all results as a flat array, `evaluate()` returns only the first',
    ],
    correctIndex: 1,
    explanation:
      '`evaluateAll(fn)` passes the entire NodeList / array of matched elements to `fn` in the browser. This is more efficient than calling `evaluate()` per element when you need to process them all together.',
    points: 3,
  },
  {
    id: 'e3-loc-10',
    category: 'Locators',
    difficulty: 'medium',
    question: 'Which locator method returns the `textContent` of a single element as a string?',
    options: [
      'await locator.getText()',
      'await locator.textContent()',
      'await locator.innerText()',
      'Both B and C work but have a subtle difference',
    ],
    correctIndex: 3,
    explanation:
      '`textContent()` returns all text inside the element including hidden text. `innerText()` returns only the rendered, visible text (respects CSS `display:none` and `visibility:hidden`). For most UI testing, `innerText()` is more accurate.',
    points: 3,
  },

  // ── ASSERTIONS (10) ───────────────────────────────────────────────────────
  {
    id: 'e3-ast-01',
    category: 'Assertions',
    difficulty: 'hard',
    code: `await expect(page).toHaveScreenshot('homepage.png', { maxDiffPixels: 50 });`,
    question: 'What does `toHaveScreenshot()` do on its first run?',
    options: [
      'Fails because no baseline image exists yet',
      'Generates a new baseline screenshot and saves it — subsequent runs compare against it',
      'Downloads the reference image from the Playwright repository',
      'Passes unconditionally and creates a "pending" marker',
    ],
    correctIndex: 1,
    explanation:
      'On the first run, `toHaveScreenshot()` creates the baseline image in the `__snapshots__` directory and the test passes. All subsequent runs compare the new screenshot against the saved baseline. Use `--update-snapshots` to regenerate baselines.',
    points: 4,
  },
  {
    id: 'e3-ast-02',
    category: 'Assertions',
    difficulty: 'hard',
    code: `await expect.poll(async () => {
  const count = await db.query('SELECT COUNT(*) FROM orders');
  return count.rows[0].count;
}, { timeout: 10000 }).toBe('5');`,
    question: 'When is `expect.poll()` the right tool?',
    options: [
      'When asserting on a Playwright locator or page object',
      'When asserting on an external async value that is not a Playwright object (e.g. a database or API call)',
      'When you want to retry a failing assertion exactly 5 times',
      '`expect.poll()` is a deprecated alias for `expect.configure()`',
    ],
    correctIndex: 1,
    explanation:
      '`expect.poll()` retries a custom async callback until the assertion passes or times out. Use it for non-Playwright values — database queries, API responses, file system checks. Regular `expect()` assertions on Playwright locators already auto-retry natively.',
    points: 4,
  },
  {
    id: 'e3-ast-03',
    category: 'Assertions',
    difficulty: 'hard',
    code: `await expect(async () => {
  const response = await fetch('/api/health');
  expect(response.ok).toBeTruthy();
}).toPass({ timeout: 15000, intervals: [1000, 2000, 4000] });`,
    question: 'What does `expect().toPass()` provide that `expect.poll()` does not?',
    options: [
      'The ability to assert on Playwright locators',
      'Full `expect()` assertions inside the callback — any inner expect failure retries the whole block',
      'Exponential backoff built in by default',
      'Parallel execution of the inner callback',
    ],
    correctIndex: 1,
    explanation:
      '`toPass()` retries the entire async function (including inner `expect()` calls) until all assertions pass or timeout. `expect.poll()` only retries a single return value. `toPass()` handles multi-step sequences that all need to succeed together.',
    points: 4,
  },
  {
    id: 'e3-ast-04',
    category: 'Assertions',
    difficulty: 'medium',
    question: 'How do you assert that an API response has status 200?',
    options: [
      'await expect(response).toHaveStatus(200)',
      'await expect(response).toBeOK()',
      'await expect(response.status()).toBe(200)',
      'Both B and C are correct approaches',
    ],
    correctIndex: 3,
    explanation:
      '`toBeOK()` is the web-first assertion — it checks that `response.ok` is true (status 200–299). `expect(response.status()).toBe(200)` is a point-in-time check. Both work; `toBeOK()` is more semantic for "success" vs. a specific code.',
    points: 3,
  },
  {
    id: 'e3-ast-05',
    category: 'Assertions',
    difficulty: 'hard',
    code: `await expect(page).toHaveURL(/\\/checkout\\/step-[23]/);`,
    question: 'What does passing a regex to `toHaveURL()` enable?',
    options: [
      'Nothing — toHaveURL only accepts exact string URLs',
      'Pattern matching — asserts the URL matches the regex anywhere in the string',
      'Waiting for a URL pattern during a redirect chain',
      'Matching only the hash portion of the URL',
    ],
    correctIndex: 1,
    explanation:
      '`toHaveURL()` accepts a string (exact match after the base URL is stripped) or a regex. The regex is tested against the full URL. Here `/\\/checkout\\/step-[23]/` matches both `/checkout/step-2` and `/checkout/step-3`.',
    points: 4,
  },
  {
    id: 'e3-ast-06',
    category: 'Assertions',
    difficulty: 'hard',
    code: `test('checkout flow', async ({ page }) => {
  await expect.soft(page.getByText('Cart(3)')).toBeVisible();
  await expect.soft(page.getByRole('button', { name: 'Checkout' })).toBeEnabled();
  // test continues even if assertions above fail
});`,
    question: 'What is the behaviour of `expect.soft()`?',
    options: [
      'The assertion has a shorter timeout than normal',
      'A failing assertion does not stop the test — all soft failures are reported together at the end',
      'The assertion is marked as a warning, not a failure',
      'The assertion uses fuzzy matching instead of strict equality',
    ],
    correctIndex: 1,
    explanation:
      '`expect.soft()` records a failure but lets the test continue. All soft assertion failures accumulate and are reported as a group when the test ends. Use for checking multiple independent UI states without an early exit on the first failure.',
    points: 4,
  },
  {
    id: 'e3-ast-07',
    category: 'Assertions',
    difficulty: 'medium',
    question: 'How do you assert a checkbox is unchecked?',
    options: [
      'await expect(checkbox).toBeUnchecked()',
      'await expect(checkbox).toBeChecked({ checked: false })',
      'await expect(checkbox).not.toBeChecked()',
      'All three approaches work',
    ],
    correctIndex: 3,
    explanation:
      'All three are equivalent: `toBeUnchecked()` is the semantic shorthand; `toBeChecked({ checked: false })` explicitly sets the expected state; `not.toBeChecked()` uses negation. Choose whichever is most readable in context.',
    points: 3,
  },
  {
    id: 'e3-ast-08',
    category: 'Assertions',
    difficulty: 'medium',
    question: 'What does `await expect(page.locator("ul")).toHaveText(["Item 1", "Item 2"])` assert?',
    options: [
      'The entire list\'s combined text equals "Item 1Item 2"',
      'Each direct child of `ul` has exactly those texts in that order',
      'The list contains both strings somewhere among its children',
      'This usage is invalid — toHaveText only accepts a single string',
    ],
    correctIndex: 1,
    explanation:
      'Passing an array to `toHaveText()` asserts that the locator resolves to multiple elements and each element\'s text matches the corresponding array entry. The assertion is strict about order and count.',
    points: 3,
  },
  {
    id: 'e3-ast-09',
    category: 'Assertions',
    difficulty: 'medium',
    question: 'Which assertion verifies a locator resolves to an element that is present in the DOM (regardless of visibility)?',
    options: [
      'await expect(locator).toBeVisible()',
      'await expect(locator).toBeAttached()',
      'await expect(locator).toExist()',
      'await expect(locator).toHaveCount(1)',
    ],
    correctIndex: 1,
    explanation:
      '`toBeAttached()` passes when the element is in the DOM even if it is hidden (display:none, visibility:hidden, off-screen). `toBeVisible()` additionally requires the element to be visible. `toExist()` is not a Playwright API.',
    points: 3,
  },
  {
    id: 'e3-ast-10',
    category: 'Assertions',
    difficulty: 'hard',
    code: `await expect(locator).toHaveAccessibleDescription('Upload your profile picture here');`,
    question: 'What does `toHaveAccessibleDescription()` check?',
    options: [
      'The element\'s `aria-label` attribute',
      'The element\'s accessible description — typically from `aria-describedby` or `aria-description`',
      'The element\'s visible label text',
      'The element\'s `title` attribute tooltip text',
    ],
    correctIndex: 1,
    explanation:
      '`toHaveAccessibleDescription()` checks the computed accessible description — derived from `aria-describedby` (references to other elements) or `aria-description`. Distinct from accessible name (checked by `toHaveAccessibleName()` via `aria-label`, `aria-labelledby`, or element content).',
    points: 4,
  },

  // ── ACTIONS (10) ──────────────────────────────────────────────────────────
  {
    id: 'e3-act-01',
    category: 'Actions',
    difficulty: 'medium',
    code: `await page.emulateMedia({ colorScheme: 'dark', media: 'print' });`,
    question: 'What does `page.emulateMedia()` allow you to do?',
    options: [
      'Block media (images, video) from loading on the page',
      'Override CSS media features like `prefers-color-scheme` and the `@media print` query',
      'Stream a media file into the page for testing',
      'Set the browser\'s audio output device',
    ],
    correctIndex: 1,
    explanation:
      '`emulateMedia()` overrides CSS media features mid-test without a page reload. `colorScheme` controls `prefers-color-scheme` dark/light; `media` toggles the `@media screen` vs `@media print` context — great for print preview testing.',
    points: 3,
  },
  {
    id: 'e3-act-02',
    category: 'Actions',
    difficulty: 'medium',
    question: 'How do you programmatically grant a browser permission (like notifications) during a test?',
    options: [
      'page.allow("notifications")',
      'context.grantPermissions(["notifications"])',
      'page.setPermission("notifications", "granted")',
      'context.setPermissions({ notifications: true })',
    ],
    correctIndex: 1,
    explanation:
      '`context.grantPermissions(["notifications"])` grants the specified permissions to all pages in the context. You can optionally scope it to a specific origin: `context.grantPermissions(["notifications"], { origin: "https://app.example.com" })`.',
    points: 2,
  },
  {
    id: 'e3-act-03',
    category: 'Actions',
    difficulty: 'hard',
    code: `await page.touchscreen.tap(150, 300);`,
    question: 'When would you use `page.touchscreen.tap()` instead of `locator.tap()`?',
    options: [
      'Never — they are identical',
      'When targeting a specific pixel coordinate on the page rather than a DOM element',
      'When the element does not have an accessible name',
      'When simulating multi-touch gestures',
    ],
    correctIndex: 1,
    explanation:
      '`page.touchscreen.tap(x, y)` fires a touch event at an absolute viewport coordinate. `locator.tap()` resolves the element\'s center automatically. Use `touchscreen.tap()` for canvas-based interactions or when coordinates are more meaningful than element identity.',
    points: 3,
  },
  {
    id: 'e3-act-04',
    category: 'Actions',
    difficulty: 'medium',
    code: `await page.evaluate(() => {
  sessionStorage.setItem('cart', JSON.stringify([{ id: 1, qty: 2 }]));
});`,
    question: 'Why use `page.evaluate()` to set sessionStorage rather than a Playwright API?',
    options: [
      'Because sessionStorage can only be accessed from the browser context — there is no Playwright API for it',
      'Because evaluate() is faster than dedicated storage APIs',
      'Because sessionStorage must be set before the page loads',
      'Because this bypasses CORS restrictions on storage',
    ],
    correctIndex: 0,
    explanation:
      'Playwright has `context.addCookies()` and `context.storageState()` for cookies and localStorage, but sessionStorage must be set via `page.evaluate()` since it is not exposed in the storage state API. This runs in the browser context where sessionStorage is accessible.',
    points: 3,
  },
  {
    id: 'e3-act-05',
    category: 'Actions',
    difficulty: 'medium',
    code: `await page.dragAndDrop('#source', '#target');`,
    question: 'What does `page.dragAndDrop()` do?',
    options: [
      'Performs a CSS transition between the two elements',
      'Simulates a complete drag-and-drop interaction from source to target using mouse events',
      'Copies the DOM content of source into target',
      'Clicks source, then shift-clicks target',
    ],
    correctIndex: 1,
    explanation:
      '`page.dragAndDrop(source, target)` fires `mousedown`, `dragstart`, `drag`, `dragenter`, `dragover`, `drop`, and `mouseup` events — the full native drag sequence. For complex drags (custom coordinates or canvas), use `mouse.move()` + `mouse.down()` + `mouse.move()` + `mouse.up()`.',
    points: 3,
  },
  {
    id: 'e3-act-06',
    category: 'Actions',
    difficulty: 'hard',
    code: `await page.keyboard.press('Control+A');
await page.keyboard.press('Control+C');`,
    question: 'What sequence of keyboard events does `page.keyboard.press("Control+A")` fire?',
    options: [
      'keydown (A), keyup (A)',
      'keydown (Control), keydown (A), keyup (A), keyup (Control)',
      'keypress (Ctrl+A as a combined character)',
      'keydown (Control+A as a single event)',
    ],
    correctIndex: 1,
    explanation:
      '`keyboard.press("Control+A")` holds Control, presses A (firing keydown for Control, then keydown for A), releases A, then releases Control. This mirrors exactly how browsers handle keyboard shortcuts — both modifier and key events are fired.',
    points: 4,
  },
  {
    id: 'e3-act-07',
    category: 'Actions',
    difficulty: 'hard',
    code: `await page.mouse.move(200, 200, { steps: 10 });`,
    question: 'What does the `steps` option do in `mouse.move()`?',
    options: [
      'Limits the move to 10 pixels per frame',
      'Interpolates the mouse path into 10 intermediate positions, simulating a more realistic move',
      'Sets the speed of the mouse in milliseconds per step',
      'Makes the move repeat 10 times',
    ],
    correctIndex: 1,
    explanation:
      'The `steps` option interpolates the path — the mouse fires 10 `mousemove` events evenly spaced from the current position to the target. Useful for slider controls, canvas drawing, or any code listening to intermediate positions.',
    points: 4,
  },
  {
    id: 'e3-act-08',
    category: 'Actions',
    difficulty: 'medium',
    code: `await page.locator('input[type="file"]').setInputFiles('photo.jpg');`,
    question: 'What does `setInputFiles()` do?',
    options: [
      'Opens the OS file picker dialog with the file pre-selected',
      'Programmatically attaches files to a file input without opening a dialog',
      'Reads a file from the test machine and asserts its contents',
      'Creates a virtual file on the test server',
    ],
    correctIndex: 1,
    explanation:
      '`setInputFiles()` directly sets the files on a `<input type="file">` element — bypassing the native OS file picker dialog entirely. Pass an array for multiple files. You can also use `{ name, mimeType, buffer }` for virtual files.',
    points: 2,
  },
  {
    id: 'e3-act-09',
    category: 'Actions',
    difficulty: 'medium',
    code: `await page.locator('select').selectOption({ label: 'United Kingdom' });`,
    question: 'What does `selectOption({ label: "..." })` match on a `<select>` element?',
    options: [
      'The option\'s `value` attribute',
      'The option\'s visible display text',
      'The option\'s `data-label` attribute',
      'The option\'s index in the list',
    ],
    correctIndex: 1,
    explanation:
      '`selectOption({ label: "..." })` matches the option whose visible text equals the label. You can also select by `value` (the `value` attribute) or `index`. Multiple options can be selected at once by passing an array.',
    points: 2,
  },
  {
    id: 'e3-act-10',
    category: 'Actions',
    difficulty: 'hard',
    code: `await page.locator('.sortable-handle').dispatchEvent('mousedown', { clientX: 100, clientY: 200 });`,
    question: 'When would you use `locator.dispatchEvent()` instead of `locator.click()` or `mouse.*`?',
    options: [
      'When you want to bypass actionability checks for every interaction',
      'When you need to fire a custom event or provide specific event properties the high-level APIs don\'t expose',
      '`dispatchEvent` is always preferred for performance',
      'When the element is inside a Shadow DOM',
    ],
    correctIndex: 1,
    explanation:
      '`dispatchEvent()` fires any DOM event with custom properties. Use it for custom events (non-standard) or when you need precise event properties like `clientX/Y`, `dataTransfer`, or `detail`. High-level APIs like `click()` and `hover()` handle common cases more reliably.',
    points: 4,
  },

  // ── NAVIGATION (12) ───────────────────────────────────────────────────────
  {
    id: 'e3-nav-01',
    category: 'Navigation',
    difficulty: 'hard',
    code: `const popupPromise = page.waitForEvent('popup');
await page.getByText('Open in new tab').click();
const popup = await popupPromise;
await popup.waitForLoadState();`,
    question: 'Why must `waitForEvent("popup")` be registered before the click?',
    options: [
      'Playwright blocks popups by default; registering first unblocks them',
      'The popup opens synchronously with the click; if you await the click first, you might miss the event',
      'You can register it after — the popup is queued until you listen',
      'It is a style choice — order does not matter',
    ],
    correctIndex: 1,
    explanation:
      'Popups open immediately when triggered. If you await the click before setting up the listener, the popup event may fire between the click resolution and your `waitForEvent` call — causing a race condition. The pattern is: register listener, then trigger.',
    points: 4,
  },
  {
    id: 'e3-nav-02',
    category: 'Navigation',
    difficulty: 'hard',
    code: `const download = await page.waitForEvent('download');
const path = await download.path();`,
    question: 'What does `download.path()` return?',
    options: [
      'The server-side path the file was saved to',
      'The absolute path on the local filesystem where Playwright saved the downloaded file',
      'The URL the file was downloaded from',
      'The file name without the directory path',
    ],
    correctIndex: 1,
    explanation:
      '`download.path()` returns the absolute local filesystem path to the downloaded file. Playwright automatically saves downloads to a temporary directory. Use `download.saveAs()` to copy to a specific location. `download.suggestedFilename()` returns the browser\'s suggested file name.',
    points: 4,
  },
  {
    id: 'e3-nav-03',
    category: 'Navigation',
    difficulty: 'hard',
    code: `await context.routeFromHAR('fixtures/api.har', {
  url: '**/api/**',
  update: false,
});`,
    question: 'What does `context.routeFromHAR()` do?',
    options: [
      'Records all network traffic to a HAR file',
      'Serves API responses from a pre-recorded HAR file, acting as a mock for those requests',
      'Replays all browser interactions from a HAR file',
      'Converts HAR entries into Playwright fixtures automatically',
    ],
    correctIndex: 1,
    explanation:
      '`routeFromHAR()` intercepts matching requests and returns recorded responses from the HAR file without hitting the network. `update: false` uses the existing file; `update: true` makes real requests and updates the HAR. Ideal for reproducible API mocking.',
    points: 4,
  },
  {
    id: 'e3-nav-04',
    category: 'Navigation',
    difficulty: 'medium',
    code: `const pageTwo = await context.newPage();
await pageTwo.goto('https://app.example.com/admin');`,
    question: 'What does `context.newPage()` create?',
    options: [
      'A new browser context and page',
      'A new page (browser tab) within the same browser context — sharing cookies and auth state',
      'An iframe within the existing page',
      'A new incognito window',
    ],
    correctIndex: 1,
    explanation:
      '`context.newPage()` opens a new tab within the current context — it inherits all cookies, localStorage, and auth state from the context. Use `browser.newContext()` if you need a fully isolated session.',
    points: 3,
  },
  {
    id: 'e3-nav-05',
    category: 'Navigation',
    difficulty: 'medium',
    code: `const messages = [];
page.on('console', msg => messages.push(msg.text()));
await page.goto('/app');
expect(messages).toContain('App initialised');`,
    question: 'What does listening to the `"console"` event provide?',
    options: [
      'Access to Node.js console.log calls from the test file',
      'All browser console messages (log, warn, error, info) emitted by the page',
      'Only console.error messages from the page',
      'Playwright\'s internal debug log stream',
    ],
    correctIndex: 1,
    explanation:
      'The `"console"` page event fires for every browser-side console call. The `ConsoleMessage` object has `.type()` ("log", "warning", "error") and `.text()`. Useful for asserting analytics events, debugging, or detecting unexpected errors.',
    points: 3,
  },
  {
    id: 'e3-nav-06',
    category: 'Navigation',
    difficulty: 'hard',
    code: `await page.route('**/api/search', async route => {
  await route.continue({ headers: { ...route.request().headers(), 'X-Test': 'true' } });
});`,
    question: 'What does `route.continue()` do?',
    options: [
      'Lets the request pass through unchanged',
      'Forwards the request to the server, optionally with modified URL, headers, method, or body',
      'Fulfills the request with an empty 200 response',
      'Aborts the request and retries it once',
    ],
    correctIndex: 1,
    explanation:
      '`route.continue()` forwards the request to the real server but allows overriding URL, method, headers, and postData. `route.fulfill()` responds with a mock. `route.abort()` cancels. `route.fetch()` gets the real response for modification.',
    points: 4,
  },
  {
    id: 'e3-nav-07',
    category: 'Navigation',
    difficulty: 'medium',
    question: 'What is the purpose of `page.waitForURL()` after a form submission?',
    options: [
      'Pauses the test until the URL changes to the expected destination — confirming navigation succeeded',
      'Asserts the current URL without waiting',
      'Watches for URL hash changes only',
      'Blocks navigation until a condition is met',
    ],
    correctIndex: 0,
    explanation:
      '`page.waitForURL(urlOrRegex)` waits until `page.url()` matches the given string or regex. Use it after clicking a submit button to confirm the redirect has completed before asserting the next page\'s content.',
    points: 2,
  },
  {
    id: 'e3-nav-08',
    category: 'Navigation',
    difficulty: 'medium',
    code: `await page.route('**/analytics/**', route => route.abort());
await page.route('**/cdn.third-party.com/**', route => route.abort());`,
    question: 'Why is blocking analytics and third-party CDNs with `route.abort()` a good practice?',
    options: [
      'It is required for tests to pass when running offline',
      'It speeds up tests and makes them more deterministic by removing slow, flaky external dependencies',
      'It prevents CORS errors in the test environment',
      'Third-party resources are blocked by default; this just makes it explicit',
    ],
    correctIndex: 1,
    explanation:
      'Blocking analytics tracking and CDNs prevents test slowdowns from slow external servers, removes flakiness from third-party outages, and avoids sending real analytics events from test runs. This is a common Playwright performance best practice.',
    points: 3,
  },
  {
    id: 'e3-nav-09',
    category: 'Navigation',
    difficulty: 'hard',
    code: `await page.addLocatorHandler(
  page.getByRole('dialog', { name: 'Cookie Consent' }),
  async (dialog) => {
    await dialog.getByRole('button', { name: 'Accept' }).click();
  }
);`,
    question: 'What does `page.addLocatorHandler()` solve?',
    options: [
      'It registers a custom locator resolution strategy',
      'It automatically handles overlaying UI elements (modals, banners) that appear randomly and block test interactions',
      'It adds event listeners to DOM elements found by the locator',
      'It retries a locator until it resolves to a visible element',
    ],
    correctIndex: 1,
    explanation:
      '`addLocatorHandler()` registers a handler that fires whenever the given locator appears on the page — before Playwright performs any action. If a cookie banner or modal blocks an interaction, the handler clicks "Accept" automatically, keeping the test focused on its actual scenario.',
    points: 4,
  },
  {
    id: 'e3-nav-10',
    category: 'Navigation',
    difficulty: 'medium',
    question: 'How do you wait for a specific network response matching a URL pattern?',
    options: [
      'await page.waitForRequest("**/api/users")',
      'await page.waitForResponse("**/api/users")',
      'await page.waitForNetwork("**/api/users")',
      'Both A and B — one waits for request, one for response',
    ],
    correctIndex: 3,
    explanation:
      '`waitForRequest()` resolves when the browser sends a matching request; `waitForResponse()` resolves when the server reply arrives. For verifying data was sent, use `waitForRequest()`. For verifying data was received, use `waitForResponse()`.',
    points: 3,
  },
  {
    id: 'e3-nav-11',
    category: 'Navigation',
    difficulty: 'medium',
    question: 'What does `await page.waitForLoadState("networkidle")` wait for?',
    options: [
      'The page\'s DOMContentLoaded event to fire',
      'At least 500ms with no more than 0 ongoing network connections',
      'All images and stylesheets to finish loading',
      'All JavaScript on the page to finish executing',
    ],
    correctIndex: 1,
    explanation:
      '`networkidle` waits until there have been no more than 0 network connections for at least 500ms. Useful for pages that fire many async requests. Note: it can be slow on analytics-heavy pages — use `domcontentloaded` or `load` for most cases.',
    points: 3,
  },
  {
    id: 'e3-nav-12',
    category: 'Navigation',
    difficulty: 'hard',
    code: `const storageState = await context.storageState();
// serialized state includes cookies and localStorage
`,
    question: 'What is included in a `context.storageState()` snapshot?',
    options: [
      'Cookies only',
      'Cookies and localStorage values from all origins visited by the context',
      'Cookies, localStorage, and sessionStorage',
      'All browser storage including IndexedDB',
    ],
    correctIndex: 1,
    explanation:
      '`storageState()` captures cookies and localStorage from all origins visited in the context. sessionStorage and IndexedDB are NOT included. The returned object can be passed to `browser.newContext({ storageState })` to restore the session in another test.',
    points: 4,
  },

  // ── ADVANCED (10) ─────────────────────────────────────────────────────────
  {
    id: 'e3-adv-01',
    category: 'Advanced',
    difficulty: 'hard',
    code: `test.beforeAll(async ({ browser }) => {
  const page = await browser.newPage();
  await page.goto('/login');
  // perform login
  await page.context().storageState({ path: 'state.json' });
  await page.close();
});`,
    question: 'What fixture is available in `beforeAll` but NOT in `beforeEach`?',
    options: [
      'page',
      'context',
      'browser',
      'request',
    ],
    correctIndex: 2,
    explanation:
      'The `browser` fixture is worker-scoped and is available in `beforeAll` (which runs once per worker). `page` and `context` are test-scoped — they are created fresh for each test and are not available in `beforeAll`.',
    points: 4,
  },
  {
    id: 'e3-adv-02',
    category: 'Advanced',
    difficulty: 'hard',
    code: `test.describe.configure({ mode: 'parallel' });

test.describe('Suite A', () => {
  test('test 1', async ({ page }) => { ... });
  test('test 2', async ({ page }) => { ... });
});`,
    question: 'What does `test.describe.configure({ mode: "parallel" })` do?',
    options: [
      'Sets all test files to run in parallel (same as workers config)',
      'Allows tests WITHIN the same describe block to run concurrently in different workers',
      'Makes the describe block run after all other describe blocks',
      'Enables async iteration inside the describe callback',
    ],
    correctIndex: 1,
    explanation:
      'By default, tests within a `describe` block run serially in one worker. `mode: "parallel"` lets them run concurrently. Without this, parallelism only works across files — not within a single file\'s describe block.',
    points: 4,
  },
  {
    id: 'e3-adv-03',
    category: 'Advanced',
    difficulty: 'medium',
    code: 'expect.extend({\n  async toBeValidEmail(received: string) {\n    const pass = /^[^@]+@[^@]+\\.[^@]+$/.test(received);\n    return {\n      pass,\n      message: () => `Expected "${received}" to be a valid email`,\n    };\n  },\n});',
    question: 'What does `expect.extend()` allow you to do?',
    options: [
      'Override built-in Playwright assertions',
      'Add custom matcher functions that can be used like built-in expect matchers',
      'Extend the timeout of all assertions globally',
      'Import matchers from jest-dom into Playwright',
    ],
    correctIndex: 1,
    explanation:
      '`expect.extend()` registers custom matchers so you can write `await expect(value).toBeValidEmail()`. Custom matchers have access to `this.isNot`, `this.utils`, and can be async. They appear in the HTML report like built-in matchers.',
    points: 3,
  },
  {
    id: 'e3-adv-04',
    category: 'Advanced',
    difficulty: 'easy',
    question: 'What does running a test with `PWDEBUG=1` environment variable do?',
    options: [
      'Enables verbose console output in the test process',
      'Opens the Playwright Inspector in debug mode — tests pause and you can step through actions',
      'Records a video of the test run',
      'Disables parallelism and enables trace recording',
    ],
    correctIndex: 1,
    explanation:
      'Setting `PWDEBUG=1` (or `PWDEBUG=console` for console output) runs tests in headed mode with the Playwright Inspector open. The test pauses before each action so you can inspect the page, highlight locators, and step forward manually.',
    points: 2,
  },
  {
    id: 'e3-adv-05',
    category: 'Advanced',
    difficulty: 'medium',
    question: 'What does `npx playwright test --last-failed` do?',
    options: [
      'Shows a report of the last test run\'s failures',
      'Re-runs only the tests that failed in the immediately preceding run',
      'Removes the last failed test from the suite permanently',
      'Resets retry counts for all tests',
    ],
    correctIndex: 1,
    explanation:
      '`--last-failed` is a Playwright CLI flag that re-runs only the tests from the previous run\'s failure list. Playwright saves the failure list in a `.playwright-last-run-info` file. Speeds up local debugging — no need to re-run the whole suite.',
    points: 3,
  },
  {
    id: 'e3-adv-06',
    category: 'Advanced',
    difficulty: 'hard',
    question: 'Where does `globalSetup` run in relation to project dependencies?',
    options: [
      'After all project dependency projects complete',
      'Before any projects run — once for the entire test run, regardless of projects',
      'Once per project before that project\'s tests start',
      'In parallel with the first project\'s test execution',
    ],
    correctIndex: 1,
    explanation:
      '`globalSetup` runs once at the very start of the test run — before any project (including dependency projects). `globalTeardown` runs once at the very end. For project-specific setup (like auth), use project dependencies with a setup project instead.',
    points: 4,
  },
  {
    id: 'e3-adv-07',
    category: 'Advanced',
    difficulty: 'medium',
    question: 'How do you attach custom metadata (annotations) to a test for reporting?',
    options: [
      'test.annotation("type", "value")',
      'test("name", { annotation: { type: "issue", description: "BUG-123" } }, async () => {})',
      'testInfo.tag("BUG-123")',
      'test.describe.only("BUG-123", () => {})',
    ],
    correctIndex: 1,
    explanation:
      'Annotations are passed in the test options object: `test("name", { annotation: { type: "issue", description: "BUG-123" } }, fn)`. Multiple annotations are passed as an array. They appear in the HTML report and can be used for linking to bug trackers.',
    points: 3,
  },
  {
    id: 'e3-adv-08',
    category: 'Advanced',
    difficulty: 'hard',
    code: `test('tagged test', { tag: '@smoke' }, async ({ page }) => { });`,
    question: 'How do you run only tests tagged with `@smoke` from the CLI?',
    options: [
      'npx playwright test --tag @smoke',
      'npx playwright test --grep @smoke',
      'npx playwright test --filter tag=@smoke',
      'npx playwright test --only @smoke',
    ],
    correctIndex: 1,
    explanation:
      'Tags in Playwright are matched by `--grep` (which filters by test title pattern) — but since tags added via the `tag` option are prepended to the test title in the grep index, `--grep @smoke` selects them. Alternatively use `--grep-invert @smoke` to exclude tagged tests.',
    points: 4,
  },
  {
    id: 'e3-adv-09',
    category: 'Advanced',
    difficulty: 'hard',
    question: 'What is the purpose of `mergeTests()` from `@playwright/test`?',
    options: [
      'Merges the results of two test runs into a single HTML report',
      'Combines multiple `test` objects (from different fixture extensions) into one to avoid re-declaring fixtures',
      'Merges duplicate test cases detected across files',
      'Merges the test suite with a jest test suite',
    ],
    correctIndex: 1,
    explanation:
      '`mergeTests()` combines multiple extended test fixtures into a single test object so all fixtures are available without repeated `base.extend()` calls. Useful for large fixture libraries split into multiple files: `const test = mergeTests(testA, testB)`.',
    points: 4,
  },
  {
    id: 'e3-adv-10',
    category: 'Advanced',
    difficulty: 'medium',
    code: `test.describe('Auth tests', () => {
  test.use({ storageState: 'admin-state.json' });

  test('admin can delete user', async ({ page }) => { ... });
});`,
    question: 'What does `test.use()` inside a `describe` block do?',
    options: [
      'Applies the option globally to all tests in the suite',
      'Overrides the specified options only for tests within that describe block',
      'Imports a fixture file into the block',
      'Sets the option for the next single test only',
    ],
    correctIndex: 1,
    explanation:
      '`test.use()` inside a `describe` block scopes the option override to only the tests in that block. Here all tests in "Auth tests" start with the admin storage state. Other describe blocks are unaffected.',
    points: 3,
  },
];
