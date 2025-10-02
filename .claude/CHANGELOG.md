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
