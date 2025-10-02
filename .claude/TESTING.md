# Playwright Testing Scenarios

## Overview

This document defines all Playwright test scenarios for the 2Sat-lite POC. Every feature **must** be validated with these tests before marking tasks complete.

---

## Test Structure

```
/tests
  ├── auth/
  │   ├── signup.spec.ts
  │   ├── signin.spec.ts
  │   └── signout.spec.ts
  ├── contributions/
  │   ├── create-contribution.spec.ts
  │   ├── edit-contribution.spec.ts
  │   └── submit-contribution.spec.ts
  ├── newsletters/
  │   ├── generate-newsletter.spec.ts
  │   └── view-newsletter.spec.ts
  └── e2e/
      └── full-flow.spec.ts
```

---

## 1. Authentication Tests

### 1.1 Email Sign Up

**File**: `tests/auth/signup.spec.ts`

**Scenario**: New user signs up with email/password

```typescript
test('should sign up with email and password', async ({ page }) => {
  // Navigate to sign-up page
  await page.goto('/sign-up');

  // Fill out sign-up form
  await page.fill('[name="email"]', 'test@example.com');
  await page.fill('[name="password"]', 'SecurePassword123!');
  await page.fill('[name="confirmPassword"]', 'SecurePassword123!');

  // Submit form
  await page.click('button[type="submit"]');

  // Verify redirect to dashboard
  await page.waitForURL('/dashboard');

  // Verify user is logged in
  await expect(page.locator('[data-testid="user-menu"]')).toBeVisible();
});
```

**Validation**:
- ✅ Form validation works (weak passwords rejected)
- ✅ User created in Clerk
- ✅ User synced to Convex database
- ✅ Redirected to dashboard

---

### 1.2 Google OAuth Sign In

**File**: `tests/auth/signin.spec.ts`

**Scenario**: User signs in with Google OAuth

```typescript
test('should sign in with Google OAuth', async ({ page }) => {
  // Navigate to sign-in page
  await page.goto('/signin');

  // Click Google sign-in button
  await page.click('[data-provider="google"]');

  // Handle OAuth popup (mocked in test environment)
  // In real tests, use Clerk test mode or mock OAuth

  // Verify redirect to dashboard
  await page.waitForURL('/dashboard');

  // Verify user is logged in
  await expect(page.locator('[data-testid="user-menu"]')).toBeVisible();
});
```

**Validation**:
- ✅ Google OAuth flow completes
- ✅ User created/updated in Clerk
- ✅ User synced to Convex
- ✅ Redirected to dashboard

---

### 1.3 Sign Out

**File**: `tests/auth/signout.spec.ts`

**Scenario**: User signs out successfully

```typescript
test('should sign out and redirect to home', async ({ page }) => {
  // Prerequisite: User is logged in
  await page.goto('/dashboard');

  // Click sign out button
  await page.click('[data-testid="sign-out-button"]');

  // Verify redirect to sign-in page
  await page.waitForURL('/signin');

  // Verify user is logged out
  await expect(page.locator('[data-testid="user-menu"]')).not.toBeVisible();
});
```

**Validation**:
- ✅ Session cleared
- ✅ Redirected to sign-in page
- ✅ Cannot access protected routes

---

## 2. Contribution Form Tests

### 2.1 Create New Contribution

**File**: `tests/contributions/create-contribution.spec.ts`

**Scenario**: User fills out monthly contribution form

```typescript
test('should create new contribution with all prompts', async ({ page }) => {
  // Prerequisite: User is logged in
  await page.goto('/contribute');

  // Fill Prompt 1: What did you do this month?
  await page.fill('[data-prompt="1"]', 'Traveled to Japan and climbed Mount Fuji!');

  // Upload images for Prompt 2: Photo Wall
  await page.setInputFiles('[data-prompt="2"]', [
    'tests/fixtures/photo1.jpg',
    'tests/fixtures/photo2.jpg',
  ]);

  // Fill Prompt 3: One Good Thing
  await page.fill('[data-prompt="3"]', 'Met an old friend after 5 years');

  // Fill Prompt 4: On Your Mind
  await page.fill('[data-prompt="4"]', 'Thinking about career changes');

  // Fill Prompt 5: Song
  await page.fill('[data-prompt="5"]', 'Bohemian Rhapsody - Queen');

  // Save as draft
  await page.click('[data-action="save-draft"]');

  // Verify success message
  await expect(page.locator('[data-message="draft-saved"]')).toBeVisible();

  // Verify contribution exists in database
  const contribution = await convexClient.query('contributions.getByUserAndMonth', {
    month: '2025-01',
  });
  expect(contribution).toBeDefined();
  expect(contribution.status).toBe('draft');
});
```

**Validation**:
- ✅ All prompt fields work
- ✅ Image upload works (max 10 files)
- ✅ Auto-save every 30s
- ✅ Draft saved to database
- ✅ Success message shown

---

### 2.2 Edit Existing Contribution

**File**: `tests/contributions/edit-contribution.spec.ts`

**Scenario**: User edits a draft contribution

```typescript
test('should edit draft contribution', async ({ page }) => {
  // Prerequisite: User has existing draft
  await page.goto('/contribute');

  // Verify existing data is loaded
  await expect(page.locator('[data-prompt="1"]')).toHaveValue('Traveled to Japan...');

  // Edit Prompt 1
  await page.fill('[data-prompt="1"]', 'UPDATED: Traveled to Japan and South Korea!');

  // Save draft
  await page.click('[data-action="save-draft"]');

  // Verify update success
  await expect(page.locator('[data-message="draft-saved"]')).toBeVisible();

  // Verify database updated
  const contribution = await convexClient.query('contributions.getByUserAndMonth', {
    month: '2025-01',
  });
  expect(contribution.prompt1).toContain('South Korea');
});
```

**Validation**:
- ✅ Existing draft loaded
- ✅ Edits saved
- ✅ Database updated
- ✅ updatedAt timestamp changed

---

### 2.3 Submit Contribution

**File**: `tests/contributions/submit-contribution.spec.ts`

**Scenario**: User submits contribution for newsletter

```typescript
test('should submit contribution', async ({ page }) => {
  // Prerequisite: User has draft
  await page.goto('/contribute');

  // Fill at least one prompt
  await page.fill('[data-prompt="1"]', 'This month was amazing!');

  // Submit
  await page.click('[data-action="submit"]');

  // Verify confirmation modal
  await expect(page.locator('[data-modal="submit-confirmation"]')).toBeVisible();

  // Confirm submission
  await page.click('[data-action="confirm-submit"]');

  // Verify success message
  await expect(page.locator('[data-message="submitted"]')).toBeVisible();

  // Verify database updated
  const contribution = await convexClient.query('contributions.getByUserAndMonth', {
    month: '2025-01',
  });
  expect(contribution.status).toBe('submitted');
  expect(contribution.submittedAt).toBeDefined();
});
```

**Validation**:
- ✅ At least 1 prompt filled (validation)
- ✅ Confirmation modal shown
- ✅ Status changed to "submitted"
- ✅ submittedAt timestamp set
- ✅ Cannot edit after submission (until next month)

---

### 2.4 Image Upload Validation

**File**: `tests/contributions/image-upload.spec.ts`

**Scenario**: Validate image upload constraints

```typescript
test('should enforce max 10 images', async ({ page }) => {
  await page.goto('/contribute');

  // Try uploading 11 images
  const files = Array(11).fill('tests/fixtures/photo.jpg');
  await page.setInputFiles('[data-prompt="2"]', files);

  // Verify error message
  await expect(page.locator('[data-error="max-images"]')).toBeVisible();
  await expect(page.locator('[data-error="max-images"]')).toHaveText(
    'Maximum 10 images allowed'
  );
});

test('should reject invalid file types', async ({ page }) => {
  await page.goto('/contribute');

  // Try uploading PDF
  await page.setInputFiles('[data-prompt="2"]', ['tests/fixtures/document.pdf']);

  // Verify error message
  await expect(page.locator('[data-error="invalid-file"]')).toBeVisible();
});
```

**Validation**:
- ✅ Max 10 images enforced
- ✅ Only image/video files accepted
- ✅ File size limit (<10MB per file)
- ✅ Clear error messages

---

## 3. Newsletter Tests

### 3.1 Generate Newsletter (Cron Job)

**File**: `tests/newsletters/generate-newsletter.spec.ts`

**Scenario**: Cron job generates newsletter on 2nd Saturday

```typescript
test('should generate newsletter with all contributions', async ({ page }) => {
  // Prerequisite: Multiple users have submitted contributions

  // Trigger cron job manually (for testing)
  await convexClient.mutation('cron.sendNewsletter', { month: '2025-01' });

  // Wait for newsletter generation
  await page.waitForTimeout(5000);

  // Verify newsletter created in database
  const newsletter = await convexClient.query('newsletters.getByMonth', {
    month: '2025-01',
  });
  expect(newsletter).toBeDefined();
  expect(newsletter.htmlContent).toContain('What did you do this month?');
  expect(newsletter.recipientEmails.length).toBeGreaterThan(0);
});
```

**Validation**:
- ✅ Newsletter generated with all submitted contributions
- ✅ HTML properly formatted
- ✅ All users included
- ✅ Sent via Resend
- ✅ Database record created

---

### 3.2 View Newsletter in Archive

**File**: `tests/newsletters/view-newsletter.spec.ts`

**Scenario**: User views past newsletter in archive

```typescript
test('should view newsletter in archive', async ({ page }) => {
  // Navigate to archive
  await page.goto('/archive');

  // Verify newsletter list
  await expect(page.locator('[data-newsletter="2025-01"]')).toBeVisible();

  // Click to view newsletter
  await page.click('[data-newsletter="2025-01"]');

  // Verify newsletter content
  await page.waitForURL('/archive/2025-01');
  await expect(page.locator('[data-contribution]')).toHaveCount(5); // 5 users submitted
});
```

**Validation**:
- ✅ Archive lists all newsletters
- ✅ Newsletter renders correctly
- ✅ All contributions visible
- ✅ Images load

---

## 4. End-to-End Tests

### 4.1 Full User Flow

**File**: `tests/e2e/full-flow.spec.ts`

**Scenario**: Complete user journey from sign-up to newsletter

```typescript
test('full flow: sign up → contribute → receive newsletter', async ({ page }) => {
  // 1. Sign up
  await page.goto('/sign-up');
  await page.fill('[name="email"]', 'newuser@example.com');
  await page.fill('[name="password"]', 'Password123!');
  await page.click('button[type="submit"]');
  await page.waitForURL('/dashboard');

  // 2. Navigate to contribution form
  await page.click('[data-nav="contribute"]');
  await page.waitForURL('/contribute');

  // 3. Fill out contribution
  await page.fill('[data-prompt="1"]', 'My first month on 2Sat!');
  await page.fill('[data-prompt="3"]', 'Joined this awesome app');

  // 4. Submit
  await page.click('[data-action="submit"]');
  await page.click('[data-action="confirm-submit"]');

  // 5. Verify submission
  await expect(page.locator('[data-message="submitted"]')).toBeVisible();

  // 6. Trigger newsletter (manually for test)
  await convexClient.mutation('cron.sendNewsletter', { month: '2025-01' });

  // 7. Verify newsletter sent
  const newsletter = await convexClient.query('newsletters.getByMonth', {
    month: '2025-01',
  });
  expect(newsletter.recipientEmails).toContain('newuser@example.com');

  // 8. View newsletter in archive
  await page.goto('/archive/2025-01');
  await expect(page.locator('[data-contribution]')).toContainText('My first month');
});
```

**Validation**:
- ✅ Full user journey works end-to-end
- ✅ No errors or broken flows
- ✅ Newsletter includes new user's contribution

---

## 5. Error Handling Tests

### 5.1 Offline Handling

**File**: `tests/errors/offline.spec.ts`

```typescript
test('should show offline message when network fails', async ({ page, context }) => {
  // Go online first
  await page.goto('/contribute');

  // Simulate offline
  await context.setOffline(true);

  // Try to save
  await page.fill('[data-prompt="1"]', 'Test content');
  await page.click('[data-action="save-draft"]');

  // Verify error message
  await expect(page.locator('[data-error="network"]')).toBeVisible();
  await expect(page.locator('[data-error="network"]')).toContainText(
    'No internet connection'
  );
});
```

---

### 5.2 Unauthorized Access

**File**: `tests/errors/unauthorized.spec.ts`

```typescript
test('should redirect to sign-in when accessing protected route', async ({ page }) => {
  // Try accessing dashboard without login
  await page.goto('/dashboard');

  // Verify redirect to sign-in
  await page.waitForURL('/signin');
});
```

---

## Test Configuration

### Playwright Config

**File**: `playwright.config.ts`

```typescript
import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: 'html',

  use: {
    baseURL: 'http://localhost:3000',
    trace: 'on-first-retry',
  },

  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'Mobile Safari',
      use: { ...devices['iPhone 13'] },
    },
  ],

  webServer: {
    command: 'npm run dev',
    url: 'http://localhost:3000',
    reuseExistingServer: !process.env.CI,
  },
});
```

---

## Running Tests

### Local Development

```bash
# Run all tests
npx playwright test

# Run specific test file
npx playwright test tests/auth/signin.spec.ts

# Run with UI
npx playwright test --ui

# Debug mode
npx playwright test --debug

# Generate test report
npx playwright show-report
```

### CI/CD (GitHub Actions)

Tests run automatically on:
- Every pull request
- Every push to main
- Daily scheduled runs (catch regressions)

**See**: `.github/workflows/test.yml`

---

## Test Fixtures

**Directory**: `tests/fixtures/`

- `photo1.jpg` - Sample image for upload tests
- `photo2.jpg` - Sample image for upload tests
- `video.mp4` - Sample video for upload tests
- `document.pdf` - Invalid file type for negative tests

---

## Mocking Convex in Tests

**File**: `tests/helpers/convex-mock.ts`

```typescript
import { ConvexReactClient } from 'convex/react';

export function setupConvexMock() {
  const client = new ConvexReactClient(process.env.NEXT_PUBLIC_CONVEX_URL!);
  return client;
}
```

**Usage in tests**:
```typescript
const convexClient = setupConvexMock();

// Query data
const data = await convexClient.query('contributions.list');

// Mutate data
await convexClient.mutation('contributions.create', { ... });
```

---

## Coverage Requirements

**Minimum coverage targets**:
- **Line coverage**: 80%
- **Branch coverage**: 75%
- **Function coverage**: 80%

**Generate coverage report**:
```bash
npx playwright test --coverage
```

---

## Agent Self-Testing Workflow

### Before Marking Task Complete

1. **Write test** (if new feature)
2. **Run test** via Playwright MCP
3. **Verify pass** ✅
4. **If fail**: Debug → Fix → Re-test (max 3 attempts)
5. **If still failing**: Escalate to user
6. **Update changelog** with test results

### Example Agent Session

```markdown
## Agent Task: Build Contribution Form

### Steps:
1. ✅ Built ContributionForm.tsx component
2. ✅ Added 5 prompt fields
3. ✅ Implemented auto-save (30s interval)
4. ✅ Added image upload (max 10 files)

### Testing:
1. ✅ Run: npx playwright test tests/contributions/create-contribution.spec.ts
2. ✅ Result: All tests passed (5/5)

### Validated:
- ✅ Form renders correctly
- ✅ Auto-save works
- ✅ Image upload works
- ✅ Max 10 images enforced
- ✅ Draft saved to database

### Changelog:
- Added to CHANGELOG.md with test results
```

---

## Troubleshooting

### Common Issues

#### Issue: "Timeout waiting for element"

**Cause**: Element not rendering or selector wrong

**Fix**:
```typescript
// Bad: Assumes immediate render
await page.click('[data-testid="button"]');

// Good: Wait for element
await page.waitForSelector('[data-testid="button"]');
await page.click('[data-testid="button"]');
```

#### Issue: "Flaky tests (pass/fail randomly)"

**Cause**: Race conditions, network delays

**Fix**:
```typescript
// Bad: Hard-coded timeout
await page.waitForTimeout(1000);

// Good: Wait for specific condition
await page.waitForResponse(response =>
  response.url().includes('/api/save') && response.status() === 200
);
```

#### Issue: "Tests pass locally but fail in CI"

**Cause**: Different environment, timing issues

**Fix**:
- Increase timeout in CI: `timeout: 60000`
- Use headless mode consistently
- Mock external services (Clerk, Resend)

---

## Resources

- [Playwright Docs](https://playwright.dev/)
- [Playwright Best Practices](https://playwright.dev/docs/best-practices)
- [Testing Convex Apps](https://docs.convex.dev/client/react#testing)

---

**Last Updated**: 2025-01-15
**Version**: 1.0.0
