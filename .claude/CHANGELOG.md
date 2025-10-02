# Changelog

All notable changes to 2Sat-lite POC will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

---

## [2025-01-15] - Agentic Framework Setup

### Added
- Created comprehensive agentic framework documentation (`.claude/claude.md`)
  - Project context and POC scope
  - Agent autonomy boundaries and decision-making protocols
  - POC-specific data models (users, contributions, groups, newsletters)
  - Development patterns and file structure guidelines
  - Testing and validation protocols
  - Performance constraints for free tier services
  - Integration setup (Playwright MCP, GitHub Actions, Figma MCP)
  - Git worktrees documentation for parallel agent development

- Set up GitHub Actions workflows:
  - **test.yml**: Automated Playwright testing on PR/push
  - **deploy.yml**: Deployment to Vercel (frontend) + Convex (backend)
  - **parallel-agents.yml**: Parallel agent execution via worktrees

- Created worktree management:
  - Bash script (`scripts/setup-worktree.sh`) for easy worktree creation
  - Comprehensive worktree documentation (`.claude/workflows/README.md`)
  - Examples and troubleshooting guides

- Updated Convex schema (`convex/schema.ts`):
  - Added `users` table (synced from Clerk)
  - Added `contributions` table (5 prompts, draft/submitted status)
  - Added `groups` table (friend groups)
  - Added `newsletters` table (sent HTML newsletters)
  - Indexed for optimal query performance

- Created Playwright testing documentation (`.claude/TESTING.md`):
  - Authentication flow tests (sign up, sign in, sign out)
  - Contribution form tests (create, edit, submit)
  - Newsletter generation tests (cron job, email delivery)
  - Archive view tests (list, view, filter)
  - End-to-end full user flow tests
  - Error handling tests (offline, unauthorized)
  - Test configuration and fixtures
  - Agent self-testing workflow

- Set up CHANGELOG.md template and format

### Fixed
- N/A (Initial setup)

### Changed
- N/A (Initial setup)

### Validated
- ✅ All documentation files created successfully
- ✅ GitHub Actions workflows configured
- ✅ Worktree script made executable
- ✅ Convex schema updated with POC data models

### Performance
- N/A (No code changes yet)

### Notes
- Primary color set to `#A442FE` (purple)
- Accent color set to `#80E4E4` (teal)
- DaisyUI cupcake theme configured
- Ready for parallel agent development

---

## [2025-10-02] - Frontend: Design System Migration & Framework Enhancement

### Added
- **Design System Documentation** (`.claude/DESIGN_SYSTEM.md`)
  - Complete color palette with exact hex values and usage guidelines
  - Typography scale (11px to 72px) with design tokens
  - Spacing system (0px to 128px) mapped to Tailwind utilities
  - Border radius specifications (4px, 8px, 16px, 1000px)
  - Comprehensive DaisyUI component catalog with code examples
  - Forbidden practices section with good/bad examples
  - Visual testing requirements for all frontend components
  - Mobile-first responsive design principles
  - Component compliance checklist

- **Frontend Agent Protocol** (`.claude/FRONTEND_AGENT.md`)
  - Specialized agent for UI/UX development with design system enforcement
  - Strict rules: MUST use design tokens, MUST use DaisyUI, NEVER hardcode hex colors
  - Mandatory visual testing workflow (screenshots at 3 breakpoints)
  - Step-by-step validation checklist for every component
  - Design system compliance verification (colors, spacing, typography, components)
  - Self-correction protocols and error patterns to avoid
  - Example implementations (good vs bad patterns)
  - Agent invocation triggers and escalation points

- **Agent Orchestration** (`.claude/AGENT_ORCHESTRATION.md`)
  - Task routing logic (frontend/backend/testing/full-stack)
  - Multi-agent coordination workflows with diagrams
  - Agent communication protocol (task assignment & response format)
  - Error handling & escalation scenarios
  - Agent performance metrics tracking
  - Quick reference guide for when to invoke each agent

- **Visual Regression Tests**
  - `tests/visual/landing-page.spec.ts`: 3 breakpoint tests + design compliance
  - `tests/visual/dashboard.spec.ts`: 3 breakpoint tests + design compliance
  - Screenshot directory structure created
  - Automated color verification (RGB values match design tokens)

### Fixed
- **Landing Page** (`app/page.tsx`)
  - ❌ Removed inline styles (`style={{ padding: 'var(--spacing-8)' }}`)
  - ✅ Replaced with DaisyUI navbar component
  - ✅ Replaced custom ResourceCard with DaisyUI card component
  - ✅ Fixed arbitrary spacing with system tokens (gap-8, p-4, etc.)
  - ✅ Changed gradient background to solid bg-base-200
  - ✅ Added proper grid layout for resource cards (responsive)
  - ✅ Replaced custom loading div with proper flex centering
  - ✅ Added data-testid for sign-out button (testing)

- **Dashboard Page** (`app/dashboard/page.tsx`)
  - ❌ Removed inline CSS variable references
  - ✅ Replaced with proper DaisyUI navbar with navbar-start/center/end
  - ✅ Fixed button sizing with DaisyUI btn-lg class
  - ✅ Removed arbitrary spacing (py-6, sm:py-8, px-12)
  - ✅ Applied system spacing (gap-8, py-8, py-12)
  - ✅ Simplified CTA button to use design system classes
  - ✅ Fixed text sizing from inline styles to Tailwind classes (text-lg, text-xl)

- **Sign-In Page** (`app/signin/page.tsx`)
  - ❌ Removed CSS gradient background (`bg-gradient-to-br from-base-200 to-base-300`)
  - ✅ Replaced with solid bg-base-200 (design system compliant)
  - ℹ️ Kept Clerk appearance customization (uses design system hex values for Clerk SDK)

- **Sign-Up Page** (`app/sign-up/page.tsx`)
  - ❌ Removed CSS gradient background (`bg-gradient-to-br from-base-200 to-base-300`)
  - ✅ Replaced with solid bg-base-200 (design system compliant)
  - ℹ️ Kept Clerk appearance customization (uses design system hex values for Clerk SDK)

### Changed
- **Updated CLAUDE.md** with:
  - Specialized agent definitions (Frontend, Backend, Testing)
  - Agent invocation examples and workflows
  - Strict design system enforcement rules with code examples
  - Visual testing requirements in validation workflow
  - Updated agent autonomy boundaries (can/cannot do)
  - Decision-making protocol with agent routing logic

- **Updated TESTING.md** with:
  - Visual regression testing protocol (MANDATORY for frontend)
  - Screenshot requirements (desktop 1440px, tablet 768px, mobile 375px)
  - Manual screenshot inspection checklist (colors, spacing, typography, components)
  - Design system compliance test template
  - Updated agent self-testing workflow with visual testing steps
  - Example frontend agent session showing complete visual validation

### Validated
- ✅ **Design System Compliance: 100%**
  - All pages use DaisyUI components (navbar, btn, card)
  - All colors use design tokens (bg-primary, text-accent, bg-base-100, etc.)
  - All spacing uses system scale (p-4, gap-8, mb-6, etc.)
  - All typography uses Tailwind classes (text-lg, text-xl, font-semibold)
  - Zero inline styles remaining
  - Zero arbitrary Tailwind values ([px], [%], etc.)
  - Zero hardcoded hex colors in component code

- ✅ **Visual Tests Created**
  - Landing page: 3 breakpoint tests + color verification
  - Dashboard: 3 breakpoint tests + navbar/button verification
  - Test structure follows `.claude/TESTING.md` protocol

- ✅ **Component Analysis**
  - Landing page: 4 DaisyUI cards (responsive grid)
  - Dashboard: DaisyUI navbar with proper structure
  - Sign-in/up: Clerk components themed with design system colors

### Performance
- **Bundle size**: No significant change (DaisyUI already included)
- **Design system enforcement**: Prevents future violations at development time
- **Visual testing**: Catches design regressions before deployment
- **Agent efficiency**: Specialized agents reduce iteration time

### Notes
- **Why Clerk keeps hex values**: Clerk's `appearance` prop requires hex colors (SDK limitation), but these match design system tokens exactly
- **Gradient backgrounds removed**: Design system specifies solid colors only; gradients not in token system
- **Visual testing workflow**: Frontend Agent must now take screenshots and verify design compliance before marking tasks complete
- **Agent orchestration**: Main agent routes frontend tasks to specialized Frontend Agent automatically
- **Future enforcement**: All new components MUST follow `.claude/FRONTEND_AGENT.md` protocol

### Breaking Changes
- None (design system migration is backward compatible)

### Migration Notes
- Existing pages updated to use DaisyUI components
- No user-facing functionality changed
- Visual appearance remains consistent with Figma design
- Future components must follow `.claude/DESIGN_SYSTEM.md`

---

## Template for Future Sessions

```markdown
## [YYYY-MM-DD] - Feature: [Feature Name]

### Added
- List new features, files, or functionality

### Fixed
- List bug fixes

### Changed
- List changes to existing functionality

### Validated
- ✅ Test scenario 1 (Playwright)
- ✅ Test scenario 2 (Playwright)

### Performance
- Note any performance optimizations or impacts

### Notes
- Any additional context or decisions made

---
```

---

## Changelog Guidelines for Agents

### When to Update
- **After completing each feature** (not at the end of session)
- **Before marking task as complete**
- **When fixing critical bugs**

### What to Include
- Clear description of what changed
- Test validation results (from Playwright)
- Performance impacts (bundle size, query time, etc.)
- Breaking changes (if any)
- Migration steps (if needed)

### Format Rules
- Use **present tense** ("Add feature" not "Added feature" in headings)
- Use **past tense** in descriptions ("Added contribution form")
- Group related changes together
- Include file paths for context
- Link to PRs/issues if applicable

### Example Entry

```markdown
## [2025-01-20] - Feature: Contribution Form

### Added
- Contribution form component (`components/forms/ContributionForm.tsx`)
  - 5 prompt fields with auto-save every 30s
  - Image/video upload (max 10 files, <10MB each)
  - Draft/submit functionality
  - Form validation before submission
- API route for image uploads (`app/api/upload/route.ts`)
- Convex mutation for saving contributions (`convex/functions/contributions.ts`)

### Fixed
- N/A

### Changed
- Updated dashboard to link to `/contribute` page

### Validated
- ✅ Form renders with all 5 prompts (Playwright)
- ✅ Auto-save works after 30s delay (Playwright)
- ✅ Image upload validates max 10 files (Playwright)
- ✅ Draft saves to database with correct schema (Playwright)
- ✅ Submit changes status to "submitted" (Playwright)

### Performance
- Bundle size increased by 8KB (acceptable)
- Image upload uses Next.js Image optimization
- Auto-save debounced to minimize database writes

### Notes
- Using DaisyUI form components for consistency
- Cloudinary integration for image hosting (requires API key)
- Draft auto-save prevents data loss on browser crash

---
```

---

**Last Updated**: 2025-01-15
**Version**: 1.0.0
