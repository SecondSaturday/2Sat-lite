# 2Sat-lite POC - Agentic Development Framework

## 🎯 Project Context

### What This Is

**2Sat-lite** is a web-based POC (Proof of Concept) for a monthly friend group update newsletter app. Friends share monthly life updates through a structured form, and everyone receives a beautifully formatted HTML newsletter every second Saturday.

### POC Scope

This simplified version validates the core concept with real friends THIS month:

- ✅ **One friend group** (hardcoded for now)
- ✅ **5 prompts** for monthly contributions
- ✅ **Clerk authentication** (Google/Facebook/Discord/Email)
- ✅ **Automated HTML newsletter** sent every 2nd Saturday via Resend
- ✅ **Archive view** to browse past newsletters

### Tech Stack

- **Frontend**: Next.js 15 + React 19 + TypeScript
- **Backend**: Convex (database + server logic)
- **Auth**: Clerk
- **Email**: Resend
- **Styling**: Tailwind CSS + DaisyUI (cupcake theme)
- **Testing**: Playwright (via MCP)
- **CI/CD**: GitHub Actions
- **Deployment**: Vercel (frontend) + Convex Cloud (backend)

### Full Vision Context

The full app will support:
- Multiple friend groups
- Individual + group contribution flows
- Mobile apps (iOS/Android via Capacitor)
- Premium subscription ($3-6/month)
- Rich media (photos/videos)

**But for this POC**: We're validating the core loop with minimal features.

---

## 🤖 Agentic Framework Rules

### Agent Autonomy Boundaries

#### ✅ Agents Can Do Independently:
- Build features based on specifications
- Fix bugs and refactor code
- Update Convex schema (database models)
- Implement Clerk authentication flows
- Create/modify frontend components
- Write backend logic (mutations/queries/actions)
- Organize files and folders
- Choose variable/function names
- Add error handling
- Run Playwright tests and self-validate
- Update changelogs

#### ❌ Agents Must Ask for Approval:
- External API integrations requiring new auth tokens/keys
- Third-party service setup (beyond Clerk/Convex/Resend already configured)
- Major architectural changes (switching frameworks, databases)
- Design/styling decisions (colors, layouts, themes)
- Spending money (paid services, upgrades)

### Decision-Making Protocol

```
Task Assigned
    ↓
Is it API/auth/design related?
    Yes → Pause → Present options → Wait for approval
    No → Build autonomously
        ↓
    Build feature
        ↓
    Run Playwright tests
        ↓
    Pass? → Update changelog → Mark complete
    Fail? → Debug → Retry (max 3 attempts) → Escalate if stuck
```

---

## 📊 POC-Specific Logic

### Data Model (Convex Schema)

```typescript
// convex/schema.ts

users (synced from Clerk)
  - clerkId: string
  - email: string
  - name: string
  - profileImage: string
  - joinedAt: number

contributions
  - userId: Id<"users">
  - groupId: Id<"groups"> // hardcoded for POC
  - month: string // "2025-01"
  - prompt1: string // What did you do this month?
  - prompt2: string[] // Photo Wall (image URLs)
  - prompt3: string // One Good Thing
  - prompt4: string // On Your Mind
  - prompt5: string // Song you're listening to
  - submittedAt: number
  - updatedAt: number

groups
  - name: string // "My Friend Group"
  - createdAt: number
  - memberIds: Id<"users">[]

newsletters
  - groupId: Id<"groups">
  - month: string // "2025-01"
  - sentAt: number
  - htmlContent: string
  - recipientEmails: string[]
  - resendId: string (optional)
```

### Core Features

#### 1. Authentication (Clerk)
- Google OAuth
- Facebook OAuth
- Discord OAuth
- Email/Password
- Custom sign-in/sign-up pages at `/signin` and `/sign-up`
- Redirect to `/dashboard` after login

#### 2. Monthly Contribution Form
**Route**: `/contribute`

**Prompts**:
1. **What did you do this month?** (long text)
2. **Photo Wall** (image/video uploads, max 10 files)
3. **One Good Thing** (short text)
4. **On Your Mind** (medium text)
5. **What song are you listening to?** (short text + optional Spotify/YouTube link)

**Behavior**:
- Save draft as user types (auto-save every 30s)
- Users can edit until 2nd Saturday of next month
- Show submission status (draft/submitted)
- Validate: at least 1 prompt filled before submission

#### 3. Automated Newsletter (Cron Job)
**Schedule**: Every 2nd Saturday at 9:00 AM (user's timezone)

**Logic**:
- Query all contributions for current month
- Generate HTML newsletter with Hinge-style layout
- Send via Resend to all group members
- Store sent newsletter in database

**Convex Cron**:
```typescript
// convex/cron.ts
crons.monthly("send-newsletter", "0 9 * * 6#2", async (ctx) => {
  // Logic to send newsletter
});
```

#### 4. Archive View
**Route**: `/archive`

**Features**:
- List all past newsletters (newest first)
- Click to view full HTML newsletter
- Filter by month
- Download as PDF (future enhancement)

---

## 🏗️ Development Patterns

### File Structure

```
/app
  /(auth)
    /signin
      page.tsx
    /sign-up
      page.tsx
  /dashboard
    page.tsx         # Main landing after login
  /contribute
    page.tsx         # Monthly contribution form
  /archive
    page.tsx         # Past newsletters view
    /[month]
      page.tsx       # Individual newsletter view
  /api
    /webhooks
      /clerk
        route.ts     # Clerk user sync
  layout.tsx
  page.tsx           # Landing page (public)

/convex
  schema.ts          # Data models
  auth.ts            # Auth helper
  auth.config.ts     # Clerk config
  http.ts            # HTTP routes
  /functions
    users.ts         # User CRUD
    contributions.ts # Contribution CRUD
    newsletters.ts   # Newsletter generation
    groups.ts        # Group logic
  /cron
    sendNewsletter.ts # Scheduled newsletter job

/components
  /ui
    Button.tsx
    Card.tsx
    Input.tsx
    Textarea.tsx
    FileUpload.tsx
  /forms
    ContributionForm.tsx
    PromptField.tsx
  /newsletter
    NewsletterTemplate.tsx
    NewsletterPreview.tsx
  /layout
    Header.tsx
    Footer.tsx
    Sidebar.tsx

/lib
  utils.ts           # Utility functions
  constants.ts       # App constants

/public
  /images
  /fonts

/.claude
  claude.md          # This file
  CHANGELOG.md       # Session logs
  TESTING.md         # Playwright scenarios
  /workflows
    README.md        # Worktree guide

/.github
  /workflows
    test.yml         # CI testing
    deploy.yml       # Deployment
    parallel-agents.yml # Parallel execution

/scripts
  setup-worktree.sh  # Worktree helper

/docs
  POC.md             # POC overview
  ARCHITECTURE.md    # Technical docs
```

### State Management

**Philosophy**: Keep it simple with Convex reactive queries.

- **Backend state**: Convex queries (reactive, real-time)
- **Form state**: React `useState` + `useReducer`
- **No global state library** needed (Zustand, Redux, etc.)
- **Optimistic updates**: Use Convex mutations with optimistic UI

**Example**:
```typescript
// Fetch data
const contributions = useQuery(api.contributions.list);

// Mutate data
const addContribution = useMutation(api.contributions.create);

// Optimistic update
await addContribution({ ...data }, { optimistic: true });
```

### Styling Rules

**DaisyUI Cupcake Theme**:
- Use DaisyUI components whenever possible
- Theme: `cupcake` (cheerful, friendly colors)
- Override primary/accent via CSS variables:

```css
/* app/globals.css */
:root {
  --primary: #A442FE;
  --accent: #80E4E4;
}
```

**Tailwind Utilities**:
- Mobile-first responsive design
- Use semantic spacing (p-4, gap-6, etc.)
- Consistent border-radius (rounded-lg)

**Component Patterns**:
```tsx
// Good: DaisyUI + Tailwind
<button className="btn btn-primary">Submit</button>

// Good: Custom with DaisyUI base
<div className="card bg-base-100 shadow-xl">
  <div className="card-body">...</div>
</div>

// Avoid: Inline styles (use Tailwind instead)
<div style={{ padding: '16px' }}>...</div>
```

### Error Handling

**All user-facing operations must handle errors gracefully.**

**Pattern**:
```typescript
try {
  await mutation({ data });
  toast.success("Contribution saved!");
} catch (error) {
  console.error("Error saving contribution:", error);
  toast.error("Failed to save. Please try again.");
}
```

**Convex Errors**:
```typescript
// convex/contributions.ts
import { ConvexError } from "convex/values";

throw new ConvexError("User not found");
```

**Client Handling**:
```typescript
try {
  await addContribution(data);
} catch (error) {
  if (error instanceof ConvexError) {
    alert(error.message);
  }
}
```

---

## 🧪 Testing & Validation

### Self-Testing Protocol

**Every feature MUST be validated with Playwright MCP before marking complete.**

#### Test Scenarios (see `.claude/TESTING.md` for full specs):

1. **Authentication Flow**
   - Sign up with email
   - Sign in with Google/Facebook/Discord
   - Sign out
   - Session persistence

2. **Contribution Form**
   - Fill all prompts
   - Upload images/videos
   - Save draft
   - Submit contribution
   - Edit existing contribution

3. **Newsletter Generation**
   - Trigger cron job manually
   - Verify HTML output
   - Check email delivery (Resend)
   - Verify database record

4. **Archive View**
   - List newsletters
   - View individual newsletter
   - Filter by month

#### Validation Workflow

```
Build Feature
    ↓
Write Playwright Test
    ↓
Run Test via MCP
    ↓
Pass? → Mark complete
Fail? → Debug → Re-test (max 3 attempts)
    ↓
Still failing? → Escalate to user
```

#### CI/CD Testing

GitHub Actions runs Playwright tests on:
- Every PR
- Before merge to main
- Scheduled daily (catch regressions)

---

## ⚡ Performance Constraints

### Free Tier Limits

**Convex**:
- 1M function calls/month
- 1 GB database storage
- 1 GB bandwidth

**Strategies**:
- Use `db.query().take(N)` to limit results
- Paginate long lists
- Lazy load images
- Cache newsletter HTML

**Resend**:
- 100 emails/day (free tier)
- 3,000 emails/month

**Strategies**:
- Batch newsletter sends
- Only send to active users
- Use transactional emails (not marketing)

**Clerk**:
- 5,000 MAU (monthly active users)
- Unlimited social logins

**Strategies**:
- POC won't hit this limit
- Monitor usage in Clerk dashboard

**Vercel**:
- 100 GB bandwidth/month
- Serverless function: 100 GB-hours

**Strategies**:
- Optimize images (Next.js Image component)
- Use static generation where possible
- Minimize serverless function calls

---

## 🔗 Integration Setup

### MCPs to Configure

#### 1. Playwright MCP (Testing)
```bash
# Install
npm install -D @playwright/test

# Configure
npx playwright install
```

**Usage in claude.md**:
- Agents run tests via MCP before marking tasks complete
- Tests are stored in `/tests` directory

#### 2. Figma MCP (Design Handoff)
**Future enhancement** - for full app build.

#### 3. GitHub MCP (Actions Automation)
- Already configured via `.github/workflows/`
- Agents can trigger workflows, check status, view logs

### External Services

#### Clerk (Already Configured)
- Dashboard: https://dashboard.clerk.com
- API keys in `.env.local`
- Webhook for user sync: `/api/webhooks/clerk`

#### Convex (Already Configured)
- Dashboard: https://dashboard.convex.dev
- Deploy URL in `.env.local`

#### Resend (Needs API Key)
**Requires user approval before setup.**

When ready:
1. Sign up at https://resend.com
2. Get API key
3. Add to `.env.local`:
   ```
   RESEND_API_KEY=re_xxxxx
   ```
4. Configure sender domain (optional, can use `onboarding@resend.dev` for testing)

---

## 📝 Changelog Format

### Session-Based Tracking

Every agent session generates a changelog entry in `.claude/CHANGELOG.md`.

**Format**:
```markdown
## [2025-01-15] - Feature: Contribution Form

### Added
- Contribution form with 5 prompts
- Image/video upload (max 10 files)
- Auto-save draft every 30s
- Form validation before submission

### Fixed
- N/A

### Changed
- N/A

### Validated
- ✅ Form submission (Playwright)
- ✅ Image upload (Playwright)
- ✅ Auto-save (Playwright)

### Performance
- Optimized image uploads (lazy loading)
- Reduced bundle size by 12% (Next.js Image)

---
```

**Auto-generation**:
- Agents update changelog BEFORE marking task complete
- GitHub Actions appends commit links
- Grouped by date + feature

---

## 🌲 Git Worktrees & Parallel Agents

### Why Worktrees?

Git worktrees enable **parallel development** by allowing multiple agents to work on different branches simultaneously without conflicts.

**Use Cases**:
- Agent 1: Build contribution form (`feature/contribution-form`)
- Agent 2: Build newsletter template (`feature/newsletter-template`)
- Agent 3: Set up cron job (`feature/cron-newsletter`)

All working **at the same time** in isolated directories.

### Setup

```bash
# Create worktree for feature
./scripts/setup-worktree.sh feature/contribution-form

# This creates:
# ../2Sat-lite-contribution-form/
#   - Isolated working directory
#   - Separate node_modules (optional)
#   - Independent Convex dev instance
```

### Workflow

1. **User assigns parallel tasks**:
   ```
   "Build the contribution form AND newsletter template in parallel"
   ```

2. **Agent creates worktrees**:
   ```bash
   ./scripts/setup-worktree.sh feature/contribution-form
   ./scripts/setup-worktree.sh feature/newsletter-template
   ```

3. **GitHub Actions runs parallel agents**:
   - Triggered via `.github/workflows/parallel-agents.yml`
   - Each agent works in its own worktree
   - Tests run in isolation

4. **Agents merge back**:
   - Create PRs from each branch
   - CI tests pass
   - User reviews + merges

### Cleanup

```bash
# Remove worktree after merge
git worktree remove ../2Sat-lite-contribution-form
```

**See `.claude/workflows/README.md` for detailed guide.**

---

## 🚀 GitHub Actions Integration

### Workflows

#### 1. **test.yml** - Automated Testing
**Triggers**: PR, push to main

```yaml
name: Test
on: [pull_request, push]
jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - Checkout code
      - Install dependencies
      - Run Playwright tests
      - Upload test results
```

#### 2. **deploy.yml** - Deployment
**Triggers**: Push to main (after tests pass)

```yaml
name: Deploy
on:
  push:
    branches: [main]
jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - Deploy to Vercel (frontend)
      - Deploy to Convex (backend)
      - Notify on success/failure
```

#### 3. **parallel-agents.yml** - Parallel Execution
**Triggers**: Manual (workflow_dispatch) or comment `/parallel`

```yaml
name: Parallel Agents
on: workflow_dispatch
jobs:
  agent-1:
    runs-on: ubuntu-latest
    steps:
      - Setup worktree for feature A
      - Build feature A
      - Test feature A
  agent-2:
    runs-on: ubuntu-latest
    steps:
      - Setup worktree for feature B
      - Build feature B
      - Test feature B
```

**Usage**:
- User triggers via GitHub UI or comment `/parallel`
- Agents run concurrently
- Results reported back via PR comments

---

## 🎨 Design Constraints

### What Agents CANNOT Change

- **Theme**: DaisyUI cupcake (locked)
- **Colors**: Primary/accent set by user (ask before changing)
- **Layout philosophy**: Mobile-first, clean, minimal
- **Typography**: Default system fonts (can suggest but needs approval)

### What Agents CAN Change

- Component spacing (Tailwind utilities)
- Responsive breakpoints (within mobile-first approach)
- Icon choices (Heroicons, Lucide)
- Animation timing (subtle transitions)

**When in doubt**: Ask for approval.

---

## 📚 Code Quality Standards

### TypeScript

- **Strict mode enabled** (`tsconfig.json`)
- **No `any` types** (use `unknown` or proper types)
- **Explicit return types** for functions

**Good**:
```typescript
function calculateTotal(items: Item[]): number {
  return items.reduce((sum, item) => sum + item.price, 0);
}
```

**Bad**:
```typescript
function calculateTotal(items: any) {
  return items.reduce((sum, item) => sum + item.price, 0);
}
```

### Convex Functions

- **Named exports only** (no default exports)
- **Input validation** via Convex validators
- **Error handling** with `ConvexError`

**Example**:
```typescript
import { v } from "convex/values";
import { mutation } from "./_generated/server";

export const createContribution = mutation({
  args: {
    prompt1: v.string(),
    prompt2: v.array(v.string()),
    // ... more args
  },
  handler: async (ctx, args) => {
    // Validate user
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) throw new ConvexError("Not authenticated");

    // Business logic
    const contributionId = await ctx.db.insert("contributions", {
      userId: identity.subject,
      ...args,
      submittedAt: Date.now(),
    });

    return contributionId;
  },
});
```

### React Components

- **Functional components** (no class components)
- **TypeScript props interfaces**
- **Descriptive component names**

**Good**:
```typescript
interface ContributionFormProps {
  onSubmit: (data: ContributionData) => Promise<void>;
  initialData?: ContributionData;
}

export function ContributionForm({ onSubmit, initialData }: ContributionFormProps) {
  // ...
}
```

### Comments

- **Explain WHY, not WHAT**
- **Document complex logic**
- **TODOs for future enhancements**

**Good**:
```typescript
// Calculate 2nd Saturday of month for newsletter scheduling
// Month is 0-indexed, so January = 0
const secondSaturday = getSecondSaturday(new Date());
```

**Bad**:
```typescript
// Get second Saturday
const secondSaturday = getSecondSaturday(new Date());
```

---

## 🔒 Security Best Practices

### Environment Variables

- **Never commit** `.env.local` to git
- **Use `.env.example`** as template
- **Validate** required vars on startup

**Convex**:
- API keys stored in Convex dashboard (not in code)
- Access via `process.env` in actions

**Clerk**:
- Webhook signature verification
- Protect routes with Clerk middleware

### Data Validation

- **Client-side**: Form validation (UX)
- **Server-side**: Convex validators (security)
- **Never trust user input**

**Example**:
```typescript
// Client (UX feedback)
if (!email.includes("@")) {
  setError("Invalid email");
  return;
}

// Server (security)
export const createUser = mutation({
  args: { email: v.string() },
  handler: async (ctx, args) => {
    if (!args.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
      throw new ConvexError("Invalid email format");
    }
    // ...
  },
});
```

---

## 🎯 POC Success Criteria

### Metrics to Track

1. **User Engagement**
   - % of friends who submit each month
   - Time to complete form
   - Newsletter open rates (via Resend analytics)

2. **Technical Performance**
   - Page load time (<2s)
   - Form submission time (<1s)
   - Newsletter generation time (<30s)

3. **Reliability**
   - Newsletter delivery success rate (>95%)
   - Uptime (>99%)
   - Zero data loss

### User Feedback Questions

After 1 month of usage:
- Was the form easy to fill out?
- Did you read the newsletter?
- Would you pay $3-6/month for this?
- What features are missing?
- What would you change?

---

## 🚦 Next Steps After POC

If validation is successful:

1. **Add more friend groups** (multi-group support)
2. **Individual contributions** (personal storytelling)
3. **Mobile apps** (Capacitor + iOS/Android)
4. **Payment integration** (Stripe)
5. **Advanced newsletter** (video embeds, Spotify players)
6. **Notifications** (push, SMS reminders)

But **for now**: Focus on POC scope only.

---

## 📞 Escalation Protocol

### When Agents Should Ask for Help

1. **Stuck after 3 debugging attempts**
2. **Unclear requirements** (ambiguous task)
3. **External service issues** (Clerk/Convex/Resend downtime)
4. **Architecture decision needed** (major refactor)
5. **Security concern** (potential vulnerability)

**How to escalate**:
- Pause work
- Document the issue clearly
- Present options (if any)
- Wait for user decision

---

## 🛠️ Useful Commands

```bash
# Development
npm run dev              # Start Next.js + Convex dev servers
npm run dev:frontend     # Start Next.js only
npm run dev:backend      # Start Convex only

# Build & Deploy
npm run build            # Build Next.js app
npm run lint             # Lint code

# Testing
npx playwright test      # Run all tests
npx playwright test --ui # Run with UI

# Convex
npx convex dev           # Start Convex dev server
npx convex deploy        # Deploy to production
npx convex dashboard     # Open Convex dashboard

# Worktrees
./scripts/setup-worktree.sh <branch-name>  # Create worktree
git worktree list                          # List worktrees
git worktree remove <path>                 # Remove worktree

# Git
git status
git log --oneline -10
git diff main
```

---

## 📖 Learning Resources

- [Convex Docs](https://docs.convex.dev/)
- [Next.js Docs](https://nextjs.org/docs)
- [Clerk Docs](https://clerk.com/docs)
- [DaisyUI Components](https://daisyui.com/components/)
- [Playwright Docs](https://playwright.dev/)
- [Resend Docs](https://resend.com/docs)

---

## 🎉 Final Notes

This POC is about **speed and validation**, not perfection.

**Priorities**:
1. ✅ **Ship fast** (weeks, not months)
2. ✅ **Real user feedback** (your friend group)
3. ✅ **Learn quickly** (iterate based on usage)
4. ✅ **Validate demand** (before building full app)

**Non-priorities**:
- ❌ Perfect UI/UX (good enough is fine)
- ❌ Scalability (100 users is plenty for POC)
- ❌ Advanced features (save for full build)

**Remember**: The goal is to prove the concept works, not build the final product.

---

**Last Updated**: 2025-01-15
**Version**: 1.0.0
**Maintained By**: Agentic development framework + Kalyan (product owner)
