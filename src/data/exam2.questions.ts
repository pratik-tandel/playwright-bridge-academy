import type { IExamQuestion } from './exam.questions';

/** Exam 2 — Core Mastery. 60 questions, none repeated from Exam 1. */
export const exam2Questions: IExamQuestion[] = [
  // ── CONFIGURATION (8) ────────────────────────────────────────────────────
  {
    id: 'e2-cfg-01',
    category: 'Configuration',
    difficulty: 'easy',
    question: 'What does `test.only()` do when placed on a single test?',
    options: [
      'Skips all other tests in the entire project',
      'Runs only that test (and any other `.only` tests) within the file',
      'Marks the test as mandatory in CI',
      'Doubles the retry count for that test',
    ],
    correctIndex: 1,
    explanation:
      '`test.only()` makes Playwright run only tests annotated with `.only` in that file. In a multi-file run, other files still execute unless you also pass `--grep`. Use sparingly — committed `.only` blocks others.',
    points: 2,
  },
  {
    id: 'e2-cfg-02',
    category: 'Configuration',
    difficulty: 'medium',
    code: `export default defineConfig({
  retries: 2,
});`,
    question: 'With `retries: 2`, how many total attempts does a failing test get?',
    options: ['1 (no retries)', '2 (original + 1 retry)', '3 (original + 2 retries)', '2 retries only, original attempt not counted'],
    correctIndex: 2,
    explanation:
      '`retries: 2` means Playwright retries a failing test up to 2 extra times after the initial attempt. Total = original + 2 retries = 3 attempts maximum.',
    points: 2,
  },
  {
    id: 'e2-cfg-03',
    category: 'Configuration',
    difficulty: 'medium',
    question: 'What does `reporter: "github"` do in playwright.config.ts?',
    options: [
      'Pushes results to a GitHub repository automatically',
      'Emits GitHub Actions workflow commands so failures appear as inline annotations in the PR diff',
      'Opens the GitHub API to fetch test history',
      'Enables GitHub Copilot suggestions inside tests',
    ],
    correctIndex: 1,
    explanation:
      'The `github` reporter outputs GitHub Actions workflow commands (`::error file=...::`) so that test failures are displayed as inline code annotations on pull request diffs in GitHub Actions.',
    points: 3,
  },
  {
    id: 'e2-cfg-04',
    category: 'Configuration',
    difficulty: 'easy',
    question: 'What happens when you set `workers: 1` in playwright.config.ts?',
    options: [
      'Tests run in a single browser only',
      'All tests run serially in one worker process — no parallelism',
      'Only one test file is executed per run',
      'The browser is shared across all tests without isolation',
    ],
    correctIndex: 1,
    explanation:
      '`workers: 1` disables parallel execution — every test runs one after another in a single worker. Useful for debugging or when tests share state (a database, files) that cannot be parallelised.',
    points: 2,
  },
  {
    id: 'e2-cfg-05',
    category: 'Configuration',
    difficulty: 'medium',
    question: 'What does the `testDir` option in playwright.config.ts control?',
    options: [
      'The output folder for test results',
      'The root directory Playwright scans for test files',
      'The directory where browser binaries are stored',
      'The folder containing test fixtures',
    ],
    correctIndex: 1,
    explanation:
      '`testDir` tells Playwright where to look for test files matching `testMatch` or `testIgnore` patterns. Default is the directory containing playwright.config.ts.',
    points: 2,
  },
  {
    id: 'e2-cfg-06',
    category: 'Configuration',
    difficulty: 'medium',
    code: `export default defineConfig({
  use: {
    viewport: { width: 375, height: 812 },
  },
});`,
    question: 'What does setting `viewport` in the `use` block achieve?',
    options: [
      'Opens the browser at exactly that window size',
      'Sets the simulated viewport for every test — useful for responsive or mobile testing',
      'Restricts the page from rendering content outside those dimensions',
      'Sets the screen resolution of the host machine',
    ],
    correctIndex: 1,
    explanation:
      '`viewport` sets the simulated browser window size for every page created in the test. It does not resize the actual OS window — it simulates the viewport, making it easy to test responsive layouts.',
    points: 3,
  },
  {
    id: 'e2-cfg-07',
    category: 'Configuration',
    difficulty: 'hard',
    question: 'What is the purpose of `use.locale` in playwright.config.ts?',
    options: [
      'Changes the language of Playwright error messages',
      'Sets the browser\'s `navigator.language` and `Accept-Language` header for i18n testing',
      'Translates test titles into the specified language',
      'Selects a locale-specific browser binary',
    ],
    correctIndex: 1,
    explanation:
      '`use.locale` (e.g. `"fr-FR"`) sets both `navigator.language` in the browser and the `Accept-Language` HTTP header. Essential for testing internationalisation — date formats, number separators, and translated UI strings.',
    points: 3,
  },
  {
    id: 'e2-cfg-08',
    category: 'Configuration',
    difficulty: 'hard',
    question: 'Where should you set `expect.timeout` globally to change the default assertion retry timeout?',
    options: [
      'In a beforeEach hook at the top of every test file',
      'Inside defineConfig({ expect: { timeout: 10000 } }) in playwright.config.ts',
      'By calling expect.configure({ timeout }) in each test',
      'Via the PLAYWRIGHT_EXPECT_TIMEOUT environment variable only',
    ],
    correctIndex: 1,
    explanation:
      'The global assertion timeout is configured via `expect: { timeout: N }` inside `defineConfig()`. It defaults to 5 000 ms. Per-test overrides use `expect.configure({ timeout })` or the `{ timeout }` option on individual assertions.',
    points: 4,
  },

  // ── LOCATORS (10) ─────────────────────────────────────────────────────────
  {
    id: 'e2-loc-01',
    category: 'Locators',
    difficulty: 'easy',
    question: 'How do you locate an `<a>` link by its accessible name using the recommended Playwright approach?',
    options: [
      'page.locator("a")',
      'page.getByRole("link", { name: "Learn More" })',
      'page.locator("a:has-text(\'Learn More\')")',
      'page.getByText("Learn More")',
    ],
    correctIndex: 1,
    explanation:
      '`getByRole("link", { name: "..." })` targets anchor elements by ARIA role and accessible name. This is resilient to href changes and matches how screen readers identify links.',
    points: 2,
  },
  {
    id: 'e2-loc-02',
    category: 'Locators',
    difficulty: 'medium',
    question: 'How do you locate a specific heading level, such as an `<h2>`, by its text?',
    options: [
      'page.locator("h2").getByText("Dashboard")',
      'page.getByRole("heading", { name: "Dashboard", level: 2 })',
      'page.getByHeading("Dashboard", 2)',
      'page.locator("h2:text(\'Dashboard\')")',
    ],
    correctIndex: 1,
    explanation:
      '`getByRole("heading", { level: 2, name: "Dashboard" })` is the most precise — it restricts to `<h2>` semantics and the accessible name. Omitting `level` matches any heading with that name.',
    points: 3,
  },
  {
    id: 'e2-loc-03',
    category: 'Locators',
    difficulty: 'easy',
    question: 'What does `locator.first()` return?',
    options: [
      'A synchronous DOM element',
      'A new Locator scoped to the first matched element',
      'The element\'s text content as a string',
      'A promise that resolves to the first element handle',
    ],
    correctIndex: 1,
    explanation:
      '`locator.first()` returns a new Locator that refers to only the first matched element. It is equivalent to `.nth(0)` and still has all locator auto-waiting semantics — it does not resolve to an element immediately.',
    points: 2,
  },
  {
    id: 'e2-loc-04',
    category: 'Locators',
    difficulty: 'easy',
    question: 'How do you get the last item in a list of matched elements?',
    options: [
      'page.locator("li").nth(-1)',
      'page.locator("li").last()',
      'page.locator("li:last-child")',
      'page.locator("li").pop()',
    ],
    correctIndex: 1,
    explanation:
      '`locator.last()` returns a new Locator scoped to the last matched element. CSS `:last-child` is a selector, not a Locator method, and may not always match the last item in a dynamically rendered list.',
    points: 2,
  },
  {
    id: 'e2-loc-05',
    category: 'Locators',
    difficulty: 'easy',
    question: 'How do you locate an image by its `alt` attribute text?',
    options: [
      'page.locator("img[alt=\'Company Logo\']")',
      'page.getByAltText("Company Logo")',
      'page.getByRole("img", { name: "Company Logo" })',
      'Both B and C are correct',
    ],
    correctIndex: 3,
    explanation:
      '`getByAltText("Company Logo")` matches images by their `alt` attribute. `getByRole("img", { name: "Company Logo" })` also works because the accessible name of an image is derived from `alt`. Both are valid.',
    points: 2,
  },
  {
    id: 'e2-loc-06',
    category: 'Locators',
    difficulty: 'medium',
    question: 'What does `page.getByTitle("Submit Form")` match?',
    options: [
      'Elements with a `data-title` attribute equal to "Submit Form"',
      'Elements with a `title` attribute equal to "Submit Form"',
      'Elements whose visible text is "Submit Form"',
      'The page `<title>` tag',
    ],
    correctIndex: 1,
    explanation:
      '`getByTitle()` locates elements by their `title` HTML attribute. This is used for tooltip text or assistive labels. It is distinct from `getByText()` (visible content) and `page.title()` (document title).',
    points: 2,
  },
  {
    id: 'e2-loc-07',
    category: 'Locators',
    difficulty: 'hard',
    code: `const locator = page.getByRole('button', { name: 'Save' })
  .or(page.getByRole('button', { name: 'Update' }));`,
    question: 'What does the `.or()` combinator do?',
    options: [
      'Matches elements that satisfy either the first OR the second locator',
      'Returns the first locator that resolves without error',
      'Tries the first locator, falls back to the second on failure',
      'Merges the two locators into one strict-mode locator',
    ],
    correctIndex: 0,
    explanation:
      '`locator.or(other)` creates a new locator that matches elements satisfying either condition. When both match, strict mode may throw — use `.first()` or `.filter()` to disambiguate.',
    points: 4,
  },
  {
    id: 'e2-loc-08',
    category: 'Locators',
    difficulty: 'hard',
    code: `const activeRow = page
  .locator('tr')
  .filter({ has: page.getByRole('checkbox', { checked: true }) });`,
    question: 'What does `.filter({ has: ... })` do here?',
    options: [
      'Filters rows that contain a checked checkbox anywhere inside them',
      'Selects only the checkbox element within each row',
      'Filters rows whose text contains the checkbox value',
      'This syntax is invalid — filter only accepts hasText',
    ],
    correctIndex: 0,
    explanation:
      '`filter({ has: locator })` narrows the matched elements to those that contain a descendant matching the inner locator. Here it selects only `<tr>` elements that have a checked checkbox inside them.',
    points: 4,
  },
  {
    id: 'e2-loc-09',
    category: 'Locators',
    difficulty: 'hard',
    code: `const rows = page
  .locator('tr')
  .filter({ hasNot: page.getByText('Archived') });`,
    question: 'What does `.filter({ hasNot: ... })` select?',
    options: [
      'Rows that do not contain the text "Archived" anywhere inside them',
      'Rows whose own text is not "Archived"',
      'All rows, excluding those immediately following "Archived"',
      'This is equivalent to .filter({ has: page.getByText("Archived") }).not',
    ],
    correctIndex: 0,
    explanation:
      '`filter({ hasNot: locator })` keeps only elements that do NOT contain a descendant matching the inner locator. The inverse of `{ has: ... }`, it is useful for excluding rows/cards with a specific status label.',
    points: 4,
  },
  {
    id: 'e2-loc-10',
    category: 'Locators',
    difficulty: 'medium',
    question: 'When `getByRole("button")` is used without a `name` option, what does it match?',
    options: [
      'Only buttons with no accessible name',
      'All elements with the ARIA role of button on the page',
      'The first button in the DOM',
      'Only `<button>` HTML elements, not `<div role="button">`',
    ],
    correctIndex: 1,
    explanation:
      'Omitting `name` means the locator matches every element with `role="button"` or the `<button>` element — including `<div role="button">`. This often triggers a strict-mode error when multiple buttons exist.',
    points: 3,
  },

  // ── ASSERTIONS (12) ───────────────────────────────────────────────────────
  {
    id: 'e2-ast-01',
    category: 'Assertions',
    difficulty: 'easy',
    question: 'Which assertion checks the document `<title>` of the current page?',
    options: [
      'await expect(page).toHaveHeading("My App")',
      'await expect(page).toHaveTitle("My App")',
      'await expect(page.title()).toBe("My App")',
      'await expect(page.locator("title")).toHaveText("My App")',
    ],
    correctIndex: 1,
    explanation:
      '`expect(page).toHaveTitle()` is a web-first assertion that auto-retries until the document title matches. `expect(page.title()).toBe()` is a point-in-time check that does not retry.',
    points: 2,
  },
  {
    id: 'e2-ast-02',
    category: 'Assertions',
    difficulty: 'medium',
    question: 'How do you assert that a link\'s `href` attribute points to a specific URL?',
    options: [
      'await expect(link).toHaveURL("/about")',
      'await expect(link).toHaveAttribute("href", "/about")',
      'await expect(link).toContainAttribute("href", "/about")',
      'await expect(link.getAttribute("href")).toBe("/about")',
    ],
    correctIndex: 1,
    explanation:
      '`toHaveAttribute("href", "/about")` checks the element\'s attribute value with auto-retry. You can also pass a regex: `toHaveAttribute("href", /\\/about/)`. `toHaveURL` is for the page\'s navigation URL, not element attributes.',
    points: 3,
  },
  {
    id: 'e2-ast-03',
    category: 'Assertions',
    difficulty: 'medium',
    question: 'How do you assert that an attribute exists without checking its value?',
    options: [
      'await expect(el).toHaveAttribute("disabled")',
      'await expect(el).toHaveAttribute("disabled", "")',
      'await expect(el).toHaveAttribute("disabled", /.*/ )',
      'All three approaches work to assert attribute existence',
    ],
    correctIndex: 3,
    explanation:
      'All three work: passing only the name checks existence; passing an empty string or a regex that matches anything also verifies the attribute is present. The single-name form is the most readable for boolean attributes like `disabled`.',
    points: 3,
  },
  {
    id: 'e2-ast-04',
    category: 'Assertions',
    difficulty: 'medium',
    question: 'What does `await expect(element).toHaveClass("active")` verify?',
    options: [
      'The element\'s entire class attribute equals "active"',
      'The element has "active" among its CSS classes',
      'The element has exactly one class named "active"',
      'The element\'s computed CSS includes the "active" selector',
    ],
    correctIndex: 1,
    explanation:
      '`toHaveClass("active")` checks that "active" is one of the element\'s CSS classes — the element may have other classes too. To match the full class string exactly, pass a regex: `toHaveClass(/^active$/)`. ',
    points: 3,
  },
  {
    id: 'e2-ast-05',
    category: 'Assertions',
    difficulty: 'hard',
    code: `await expect(page.locator('.price')).toHaveCSS('color', 'rgb(255, 0, 0)');`,
    question: 'What does `toHaveCSS()` check?',
    options: [
      'The inline `style` attribute of the element',
      'The computed CSS property value after all stylesheets are applied',
      'The value defined in a `.css` file linked to the page',
      'Whether a class containing that CSS rule is applied',
    ],
    correctIndex: 1,
    explanation:
      '`toHaveCSS()` uses `getComputedStyle()` internally — it checks the final computed value after cascading. Colors are always returned as `rgb(...)` regardless of how they are defined (hex, hsl, named).',
    points: 4,
  },
  {
    id: 'e2-ast-06',
    category: 'Assertions',
    difficulty: 'medium',
    question: 'How do you assert that an element has a specific `id` attribute value?',
    options: [
      'await expect(el).toHaveId("submit-btn")',
      'await expect(el).toHaveAttribute("id", "submit-btn")',
      'Both A and B are valid',
      'await expect(el).toMatchSelector("#submit-btn")',
    ],
    correctIndex: 2,
    explanation:
      'Both `toHaveId("submit-btn")` (convenience method) and `toHaveAttribute("id", "submit-btn")` work identically. `toHaveId()` is shorter and more semantic.',
    points: 2,
  },
  {
    id: 'e2-ast-07',
    category: 'Assertions',
    difficulty: 'medium',
    question: 'How do you assert that a text input is empty?',
    options: [
      'await expect(input).toHaveText("")',
      'await expect(input).toHaveValue("")',
      'await expect(input).toBeEmpty()',
      'Both B and C are correct',
    ],
    correctIndex: 3,
    explanation:
      'For inputs, `toHaveValue("")` checks the `.value` property is an empty string. `toBeEmpty()` is a broader assertion — for inputs it checks the value is empty, for elements it checks there are no child nodes. Both work here.',
    points: 3,
  },
  {
    id: 'e2-ast-08',
    category: 'Assertions',
    difficulty: 'medium',
    question: 'What is the difference between `toBeHidden()` and `not.toBeVisible()`?',
    options: [
      'They are exact inverses — no difference in practice',
      '`toBeHidden()` also passes for elements not attached to the DOM; `not.toBeVisible()` only passes for rendered-but-invisible elements',
      '`toBeHidden()` checks `display:none`; `not.toBeVisible()` checks `visibility:hidden`',
      '`toBeHidden()` is deprecated; use `not.toBeVisible()`',
    ],
    correctIndex: 1,
    explanation:
      '`toBeHidden()` passes when the element is hidden OR when it does not exist in the DOM at all. `not.toBeVisible()` fails if the element is not in the DOM (it expects the element to exist but be invisible). Prefer `toBeHidden()` when the element may not be in the DOM.',
    points: 4,
  },
  {
    id: 'e2-ast-09',
    category: 'Assertions',
    difficulty: 'medium',
    question: 'What does `await expect(input).toBeEditable()` verify?',
    options: [
      'The input is visible',
      'The input is not disabled and not read-only',
      'The input has a change event listener attached',
      'The input is focused',
    ],
    correctIndex: 1,
    explanation:
      '`toBeEditable()` checks that the form element is neither `disabled` nor `readonly`. An editable input can receive user input. It does not check visibility.',
    points: 3,
  },
  {
    id: 'e2-ast-10',
    category: 'Assertions',
    difficulty: 'hard',
    code: `const select = page.getByRole('listbox', { name: 'Permissions' });
await expect(select).toHaveValues(['read', 'write']);`,
    question: 'What does `toHaveValues()` assert for a multi-select element?',
    options: [
      'At least one of the listed values is selected',
      'The element\'s selected options match exactly the provided array',
      'The element\'s options include all the provided values',
      'The values are selected in the given order only',
    ],
    correctIndex: 1,
    explanation:
      '`toHaveValues()` checks that the multi-select\'s selected options exactly match the given array. Order matters — `["write", "read"]` would fail here. Use it instead of `toHaveValue()` for `<select multiple>`.',
    points: 4,
  },
  {
    id: 'e2-ast-11',
    category: 'Assertions',
    difficulty: 'medium',
    code: `await expect(page.locator('p.error')).toContainText(/required/i);`,
    question: 'What does passing a regex to `toContainText()` enable?',
    options: [
      'Nothing — toContainText only accepts strings',
      'Case-insensitive and pattern-based text matching',
      'Multiline text matching across child elements',
      'Matching the element\'s aria-label instead of text',
    ],
    correctIndex: 1,
    explanation:
      'Both `toHaveText()` and `toContainText()` accept a regex. `/required/i` matches any text containing "required" case-insensitively — useful for asserting validation messages without depending on exact punctuation.',
    points: 3,
  },
  {
    id: 'e2-ast-12',
    category: 'Assertions',
    difficulty: 'medium',
    question: 'How do you assert that a locator matches zero elements (nothing is rendered)?',
    options: [
      'await expect(locator).toBeNull()',
      'await expect(locator).toHaveCount(0)',
      'await expect(locator).not.toExist()',
      'await expect(locator).toBeEmpty()',
    ],
    correctIndex: 1,
    explanation:
      '`toHaveCount(0)` auto-retries until the locator resolves to exactly 0 matches. This is the idiomatic way to assert an element is absent from the DOM. `toBeHidden()` works for a single element; `toHaveCount(0)` works when you expect none.',
    points: 3,
  },

  // ── ACTIONS (10) ──────────────────────────────────────────────────────────
  {
    id: 'e2-act-01',
    category: 'Actions',
    difficulty: 'easy',
    question: 'What does `locator.hover()` do in Playwright?',
    options: [
      'Asserts the element is hovered',
      'Moves the mouse over the element, triggering mouseover and mouseenter events',
      'Focuses the element via keyboard',
      'Waits for the element\'s :hover CSS state to apply',
    ],
    correctIndex: 1,
    explanation:
      '`hover()` moves the mouse pointer to the element\'s center (scrolling it into view first). It dispatches `mouseover`, `mouseenter`, `mousemove` events — triggering tooltip displays, dropdown menus, and hover states.',
    points: 2,
  },
  {
    id: 'e2-act-02',
    category: 'Actions',
    difficulty: 'easy',
    question: 'What does `locator.dblclick()` simulate?',
    options: [
      'Two separate `.click()` calls with a short delay',
      'A native double-click interaction, firing mousedown, mouseup, click, mousedown, mouseup, click, dblclick events',
      'Exactly `click()` but twice as fast',
      'A right-click followed by a left-click',
    ],
    correctIndex: 1,
    explanation:
      '`dblclick()` dispatches the full native double-click sequence. It is distinct from calling `.click()` twice — the browser fires a single `dblclick` event at the end of the sequence, which `click()` called twice would not produce.',
    points: 2,
  },
  {
    id: 'e2-act-03',
    category: 'Actions',
    difficulty: 'medium',
    code: `await page.locator('.item').click({ button: 'right' });`,
    question: 'What interaction does this trigger?',
    options: [
      'A normal left click on the element',
      'A right-click, which typically opens the browser\'s context menu',
      'An alt-click for multi-select',
      'A force-click that bypasses actionability checks',
    ],
    correctIndex: 1,
    explanation:
      '`click({ button: "right" })` fires a right-click event. If the page has a custom context menu (suppressing the native one), this is useful for testing those interactions.',
    points: 3,
  },
  {
    id: 'e2-act-04',
    category: 'Actions',
    difficulty: 'medium',
    code: `await page.locator('.file').click({ modifiers: ['Shift'] });`,
    question: 'What does clicking with `modifiers: ["Shift"]` achieve?',
    options: [
      'Holds the Shift key during the click, enabling range selection in file lists or tables',
      'Submits the nearest form when clicking',
      'Opens the clicked link in a new tab',
      'Triggers the element\'s focus event instead of click',
    ],
    correctIndex: 0,
    explanation:
      '`modifiers: ["Shift"]` holds the Shift key during the click. Used for range-selecting in multi-select lists, or triggering Shift+Click behaviour in custom components. Other options include "Control", "Meta", "Alt".',
    points: 3,
  },
  {
    id: 'e2-act-05',
    category: 'Actions',
    difficulty: 'medium',
    question: 'What is the purpose of `locator.focus()` in Playwright?',
    options: [
      'Scrolls the element into the center of the viewport',
      'Moves keyboard focus to the element, triggering the `focus` event',
      'Clicks the element to give it focus',
      'Waits until the element has the `:focus` CSS state',
    ],
    correctIndex: 1,
    explanation:
      '`focus()` programmatically sets keyboard focus without simulating a click. Useful for testing focus trapping, tab order, or keyboard-accessible controls. Pair with `blur()` to test `focusout` handlers.',
    points: 3,
  },
  {
    id: 'e2-act-06',
    category: 'Actions',
    difficulty: 'easy',
    question: 'What does `locator.clear()` do?',
    options: [
      'Removes the element from the DOM',
      'Clears the value of a text input or textarea',
      'Resets all form fields in the parent form',
      'Clears the browser\'s localStorage',
    ],
    correctIndex: 1,
    explanation:
      '`clear()` selects all text in an input/textarea and deletes it — equivalent to Ctrl+A then Backspace. It triggers the appropriate input and change events. Prefer `fill("")` for cross-browser consistency.',
    points: 2,
  },
  {
    id: 'e2-act-07',
    category: 'Actions',
    difficulty: 'medium',
    question: 'What does `locator.press("Tab")` do?',
    options: [
      'Inserts a tab character into the focused input',
      'Moves keyboard focus to the next focusable element',
      'Submits the current form',
      'Opens the browser\'s Tab switcher',
    ],
    correctIndex: 1,
    explanation:
      '`press("Tab")` simulates pressing the Tab key, advancing focus to the next element in the tab order. Useful for testing tab navigation and accessibility flows. `press("Shift+Tab")` moves focus backwards.',
    points: 2,
  },
  {
    id: 'e2-act-08',
    category: 'Actions',
    difficulty: 'medium',
    question: 'What is the key difference between `locator.type("hello")` and `locator.fill("hello")`?',
    options: [
      'No difference — they are aliases',
      '`type()` fires keydown/keypress/keyup events per character; `fill()` sets the value atomically',
      '`fill()` fires keydown/keypress/keyup events per character; `type()` sets the value atomically',
      '`type()` only works on password fields; `fill()` works everywhere',
    ],
    correctIndex: 1,
    explanation:
      '`type()` simulates keystroke-by-keystroke input — useful for testing input masks, auto-complete, or character-limit enforcement. `fill()` is faster and sets the entire value at once, firing a single `input` event.',
    points: 3,
  },
  {
    id: 'e2-act-09',
    category: 'Actions',
    difficulty: 'medium',
    code: `await page.locator('.avatar').screenshot({ path: 'avatar.png' });`,
    question: 'What does `locator.screenshot()` capture?',
    options: [
      'The entire viewport',
      'Only the bounding box of the matched element',
      'The element and its siblings',
      'The visible portion of the element within the viewport',
    ],
    correctIndex: 1,
    explanation:
      '`locator.screenshot()` captures only the element\'s bounding box as a PNG. It scrolls the element into view if needed. Useful for visual regression on specific components rather than the full page.',
    points: 3,
  },
  {
    id: 'e2-act-10',
    category: 'Actions',
    difficulty: 'medium',
    question: 'When should you use `locator.tap()` instead of `locator.click()`?',
    options: [
      'When the element is inside an iframe',
      'When testing touch-screen devices or when the app uses touch event listeners instead of mouse events',
      '`tap()` is simply an alias for `click()`',
      'When the element requires double activation',
    ],
    correctIndex: 1,
    explanation:
      '`tap()` dispatches touch events (`touchstart`, `touchend`) instead of mouse events. Use it when testing mobile-specific touch handlers or when `click()` does not trigger the expected behaviour on a touch-enabled device simulation.',
    points: 3,
  },

  // ── NAVIGATION (10) ───────────────────────────────────────────────────────
  {
    id: 'e2-nav-01',
    category: 'Navigation',
    difficulty: 'easy',
    question: 'How do you navigate back to the previous page in a Playwright test?',
    options: [
      'await page.navigate(-1)',
      'await page.history.back()',
      'await page.goBack()',
      'await page.goto("javascript:history.back()")',
    ],
    correctIndex: 2,
    explanation:
      '`page.goBack()` is the Playwright API for browser history back navigation. It returns the Response for the navigation, similar to `page.goto()`. Use `page.goForward()` for the opposite.',
    points: 2,
  },
  {
    id: 'e2-nav-02',
    category: 'Navigation',
    difficulty: 'easy',
    question: 'What does `await page.reload()` do?',
    options: [
      'Clears the page content without a network request',
      'Navigates to the current URL again, triggering a full page reload',
      'Re-runs the last test step',
      'Refreshes all Playwright locators',
    ],
    correctIndex: 1,
    explanation:
      '`page.reload()` is equivalent to pressing F5 — it issues a new navigation to the current URL and waits for `page.waitForLoadState("load")` by default. Returns the Response.',
    points: 2,
  },
  {
    id: 'e2-nav-03',
    category: 'Navigation',
    difficulty: 'hard',
    code: `const downloadPromise = page.waitForEvent('download');
await page.getByText('Export CSV').click();
const download = await downloadPromise;
await download.saveAs('export.csv');`,
    question: 'Why must `waitForEvent("download")` be set up before the click?',
    options: [
      'To prevent the browser from blocking the download',
      'Because the download event fires before the click completes; setting up the listener first ensures it is not missed',
      'waitForEvent can only be called before any page interaction',
      'This is optional — the download object is available after the click anyway',
    ],
    correctIndex: 1,
    explanation:
      'The download starts immediately when the click fires. If you await the click first, the download event may have already fired before `waitForEvent` is registered and you would miss it — the same reason as new-tab handling with `Promise.all()`.',
    points: 4,
  },
  {
    id: 'e2-nav-04',
    category: 'Navigation',
    difficulty: 'medium',
    code: `await page.route('**/api/heavy', route => route.abort());`,
    question: 'What does `route.abort()` do?',
    options: [
      'Cancels the entire test',
      'Intercepts the request and returns a 404 response',
      'Cancels the network request so it never reaches the server, causing a network error in the browser',
      'Redirects the request to localhost',
    ],
    correctIndex: 2,
    explanation:
      '`route.abort()` cancels the request at the network level. The browser receives a network error (not an HTTP error). Useful for simulating network failures or blocking slow third-party resources to speed up tests.',
    points: 3,
  },
  {
    id: 'e2-nav-05',
    category: 'Navigation',
    difficulty: 'hard',
    code: `await page.addInitScript(() => {
  window.__TEST_MODE__ = true;
});`,
    question: 'When does a script added via `page.addInitScript()` execute?',
    options: [
      'After the page\'s DOMContentLoaded event',
      'Before any scripts on the page load, on every navigation',
      'Only once, immediately when addInitScript is called',
      'After the page\'s load event fires',
    ],
    correctIndex: 1,
    explanation:
      '`addInitScript()` injects the script into every new page or frame before any other scripts run. It executes on every navigation (including page reloads). Ideal for mocking globals, feature flags, or disabling analytics.',
    points: 4,
  },
  {
    id: 'e2-nav-06',
    category: 'Navigation',
    difficulty: 'medium',
    code: `await context.addCookies([{
  name: 'session',
  value: 'abc123',
  domain: 'localhost',
  path: '/',
}]);`,
    question: 'What is the correct way to inject cookies into a browser context?',
    options: [
      'This code is correct — context.addCookies() injects cookies before page requests',
      'You must use page.evaluate(() => document.cookie = "session=abc123") instead',
      'context.setCookies() is the correct method name',
      'Cookies can only be added via storageState files',
    ],
    correctIndex: 0,
    explanation:
      '`context.addCookies()` is the correct API. It sets cookies on the context level, so all pages in that context send the cookies. This is simpler than injecting via JavaScript and works for HTTP-only cookies too.',
    points: 3,
  },
  {
    id: 'e2-nav-07',
    category: 'Navigation',
    difficulty: 'medium',
    question: 'How do you remove all cookies from a browser context?',
    options: [
      'context.clearCookies()',
      'page.evaluate(() => document.cookie = "")',
      'context.clearPermissions()',
      'context.resetStorage()',
    ],
    correctIndex: 0,
    explanation:
      '`context.clearCookies()` removes all cookies from the context. To remove specific cookies, use `context.clearCookies({ name: "session" })`. You can also filter by domain or path.',
    points: 2,
  },
  {
    id: 'e2-nav-08',
    category: 'Navigation',
    difficulty: 'hard',
    code: `await page.waitForFunction(() => document.querySelectorAll('.item').length > 5);`,
    question: 'What does `page.waitForFunction()` wait for?',
    options: [
      'A Playwright locator to resolve to more than 5 elements',
      'A browser-side JavaScript function to return a truthy value',
      'The network to be idle for 5 seconds',
      'Any DOM mutation event to fire',
    ],
    correctIndex: 1,
    explanation:
      '`waitForFunction()` polls the provided function in the browser context until it returns a truthy value (or the timeout expires). More flexible than locator-based waiting for complex conditions not expressible via locators.',
    points: 4,
  },
  {
    id: 'e2-nav-09',
    category: 'Navigation',
    difficulty: 'hard',
    code: `await page.route('**/api/data', async route => {
  const response = await route.fetch();
  const json = await response.json();
  json.extra = 'injected';
  await route.fulfill({ response, json });
});`,
    question: 'What does `route.fetch()` do in this pattern?',
    options: [
      'It fetches data from a local mock server',
      'It makes the real network request and returns the actual server response',
      'It replays a recorded HAR response',
      'It fetches the page\'s own HTML document',
    ],
    correctIndex: 1,
    explanation:
      '`route.fetch()` forwards the request to the real server and returns the Response. This hybrid pattern lets you get the real data, modify it, then return the modified version — without fully mocking the API.',
    points: 4,
  },
  {
    id: 'e2-nav-10',
    category: 'Navigation',
    difficulty: 'medium',
    question: 'What does `page.waitForSelector(".spinner", { state: "hidden" })` wait for?',
    options: [
      'The spinner to appear in the DOM',
      'The spinner to become invisible or be removed from the DOM',
      'Any element with class "spinner" to gain focus',
      'The CSS animation on the spinner to complete',
    ],
    correctIndex: 1,
    explanation:
      '`waitForSelector` with `state: "hidden"` waits until the element is either not in the DOM or not visible. Useful for waiting for loading spinners to disappear before asserting page content. Prefer web-first assertions when possible.',
    points: 3,
  },

  // ── ADVANCED (10) ─────────────────────────────────────────────────────────
  {
    id: 'e2-adv-01',
    category: 'Advanced',
    difficulty: 'medium',
    code: `test('checkout flow', async ({ page }) => {
  await test.step('Add to cart', async () => {
    await page.getByText('Add').click();
  });
  await test.step('Complete purchase', async () => {
    await page.getByText('Buy Now').click();
  });
});`,
    question: 'What does `test.step()` provide?',
    options: [
      'Separate retries for each step independently',
      'Named groupings in the test report — each step appears with its own timing and pass/fail status',
      'Automatic rollback if a step fails',
      'A way to run steps in parallel within one test',
    ],
    correctIndex: 1,
    explanation:
      '`test.step()` annotates sections of a test with a human-readable name. In the HTML report and Trace Viewer, each step appears as a collapsible group with its own timing, making long tests much easier to navigate and debug.',
    points: 3,
  },
  {
    id: 'e2-adv-02',
    category: 'Advanced',
    difficulty: 'easy',
    question: 'What does `test.fixme()` do?',
    options: [
      'Automatically retries the test until it passes',
      'Marks the test as expected to fail and skips it — shown in the report as "fixme"',
      'Fixes common locator errors automatically',
      'Runs the test in slow motion for debugging',
    ],
    correctIndex: 1,
    explanation:
      '`test.fixme()` marks a test that is known to be broken and needs fixing. It is skipped during the run but reported distinctly from `test.skip()` — clearly communicating that this test needs attention, not just intentional skipping.',
    points: 2,
  },
  {
    id: 'e2-adv-03',
    category: 'Advanced',
    difficulty: 'medium',
    question: 'What does `test.slow()` do?',
    options: [
      'Introduces a 1-second delay between each action',
      'Triples the test timeout, giving the test three times as long to complete',
      'Enables slow-motion browser mode for that test',
      'Reduces the number of retries to prevent long CI runs',
    ],
    correctIndex: 1,
    explanation:
      '`test.slow()` multiplies the test\'s timeout by 3. Use it for inherently slow tests (e.g. file uploads, video processing) without hard-coding a large timeout in the config. It is self-documenting — communicating WHY the test needs more time.',
    points: 3,
  },
  {
    id: 'e2-adv-04',
    category: 'Advanced',
    difficulty: 'hard',
    code: `test('retry-aware', async ({}, testInfo) => {
  if (testInfo.retry > 0) {
    await clearTestData();
  }
});`,
    question: 'What does `testInfo.retry` tell you?',
    options: [
      'The total number of retries configured globally',
      'Which retry attempt the current run is (0 = first attempt, 1 = first retry, etc.)',
      'Whether the test is expected to be retried',
      'The number of retries remaining',
    ],
    correctIndex: 1,
    explanation:
      '`testInfo.retry` is 0 on the first attempt and increments with each retry. This lets you perform cleanup (clearing state, resetting data) only on retries — avoiding unnecessary work on the first run.',
    points: 4,
  },
  {
    id: 'e2-adv-05',
    category: 'Advanced',
    difficulty: 'hard',
    code: `test('with screenshot', async ({ page }, testInfo) => {
  const screenshot = await page.screenshot();
  await testInfo.attach('page-state', { body: screenshot, contentType: 'image/png' });
});`,
    question: 'What does `testInfo.attach()` do?',
    options: [
      'Saves the file to the OS desktop',
      'Embeds the attachment into the HTML test report under that test\'s entry',
      'Uploads the screenshot to a remote artifact store',
      'Attaches the file to a GitHub Actions workflow',
    ],
    correctIndex: 1,
    explanation:
      '`testInfo.attach()` adds a named attachment (image, text, JSON, HTML) to the test\'s record in the HTML report. Useful for preserving evidence like screenshots, API responses, or DOM snapshots directly in the report.',
    points: 4,
  },
  {
    id: 'e2-adv-06',
    category: 'Advanced',
    difficulty: 'hard',
    code: `const test = base.extend({
  sharedToken: [async ({}, use) => {
    const token = await fetchAuthToken();
    await use(token);
  }, { scope: 'worker' }],
});`,
    question: 'What does `scope: "worker"` mean for a fixture?',
    options: [
      'The fixture runs once per test file',
      'The fixture is set up once per worker process and shared across all tests in that worker',
      'The fixture runs in a separate worker thread for isolation',
      'The fixture is shared globally across all workers',
    ],
    correctIndex: 1,
    explanation:
      'A `"worker"`-scoped fixture is set up once when the worker starts and torn down when it finishes. All tests running in that worker share the fixture value. Ideal for expensive resources like auth tokens or database connections.',
    points: 4,
  },
  {
    id: 'e2-adv-07',
    category: 'Advanced',
    difficulty: 'medium',
    code: `export default defineConfig({
  reporter: [['html'], ['json', { outputFile: 'results.json' }]],
});`,
    question: 'What does specifying reporters as an array of arrays enable?',
    options: [
      'Reporters run in parallel for speed',
      'Multiple reporters run simultaneously, each generating their own output format',
      'Each sub-array is an alternative reporter (only the first one that works is used)',
      'The inner arrays are for reporter-specific metadata only',
    ],
    correctIndex: 1,
    explanation:
      'The array-of-arrays format runs all listed reporters at the same time. Here, both the HTML report and a JSON output file are generated from a single test run — no extra execution needed.',
    points: 3,
  },
  {
    id: 'e2-adv-08',
    category: 'Advanced',
    difficulty: 'easy',
    question: 'What does `npx playwright codegen https://example.com` do?',
    options: [
      'Runs all tests against example.com and generates a coverage report',
      'Opens a browser, records your interactions, and generates Playwright test code in real time',
      'Downloads example.com as a local static site for offline testing',
      'Generates stub test files based on the page\'s structure',
    ],
    correctIndex: 1,
    explanation:
      '`playwright codegen` opens a headed browser with a Playwright Inspector overlay. Every action you perform (clicks, fills, navigation) is recorded and translated into Playwright API calls shown live in the inspector panel.',
    points: 2,
  },
  {
    id: 'e2-adv-09',
    category: 'Advanced',
    difficulty: 'hard',
    question: 'You need to split a 500-test suite across 5 CI machines. Which command runs the first shard?',
    options: [
      'npx playwright test --workers=100',
      'npx playwright test --shard=1/5',
      'npx playwright test --ci-slot=1 --total=5',
      'npx playwright test --split=5 --index=1',
    ],
    correctIndex: 1,
    explanation:
      '`--shard=1/5` tells Playwright to run shard 1 of 5. Each machine gets a different shard number (1/5, 2/5, … 5/5). Playwright distributes tests deterministically so no test runs twice and all tests are covered.',
    points: 4,
  },
  {
    id: 'e2-adv-10',
    category: 'Advanced',
    difficulty: 'hard',
    code: `expect.configure({ timeout: 10000, message: 'Login must complete within 10s' });`,
    question: 'What does `expect.configure()` do?',
    options: [
      'Sets global defaults for all assertions in the entire test suite',
      'Creates a scoped `expect` with custom defaults for assertions in the current scope only',
      'Overrides playwright.config.ts expect settings permanently',
      'Configures only the next assertion call\'s timeout',
    ],
    correctIndex: 1,
    explanation:
      '`expect.configure()` returns a new `expect` instance with custom defaults. Assign it to a local variable: `const myExpect = expect.configure({ timeout: 10000 })`. It does not mutate the global `expect` — subsequent calls without `.configure()` use original defaults.',
    points: 4,
  },
];
