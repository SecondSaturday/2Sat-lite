# Agent Orchestration - Task Routing & Coordination

## Overview

The 2Sat-lite agentic framework uses a **main orchestrator agent** that routes tasks to specialized sub-agents based on task type. This ensures expert-level execution with strict adherence to protocols.

---

## 🎭 Agent Roles

### Main Orchestrator Agent

**Role**: Task router, coordinator, integration manager

**Responsibilities**:
- Receive user tasks
- Analyze task type (frontend, backend, testing, full-stack)
- Route to appropriate specialized agent(s)
- Coordinate multi-agent workflows
- Integrate sub-agent outputs
- Report final results to user

**Does NOT**:
- Build UI components (delegates to Frontend Agent)
- Write Convex functions (delegates to Backend Agent when available)
- Write tests (delegates to Testing Agent when available)

---

### Frontend Agent

**Role**: UI/UX specialist, design system enforcer

**Documentation**: `.claude/FRONTEND_AGENT.md`

**Invoked For**:
- React component development
- Page layouts
- Forms and inputs
- Navigation components
- Styling and theming
- Responsive design
- Visual polish

**Expertise**:
- React 19 + Next.js 15
- TypeScript
- DaisyUI components
- Tailwind CSS
- Design system tokens
- Visual testing with Playwright

**Strict Rules**:
- ✅ MUST use `.claude/DESIGN_SYSTEM.md` tokens
- ✅ MUST use DaisyUI components
- ✅ MUST take screenshots at 3 breakpoints
- ✅ MUST run visual regression tests
- ❌ NEVER use hardcoded hex colors
- ❌ NEVER use arbitrary spacing/typography
- ❌ NEVER create custom components when DaisyUI exists

**Output**:
- React component code
- Visual test files
- Screenshots (desktop/tablet/mobile)
- Design system compliance report

---

### Backend Agent (Future)

**Role**: Server logic specialist, database architect

**Documentation**: `.claude/BACKEND_AGENT.md` (to be created)

**Invoked For**:
- Convex mutations/queries/actions
- Database schema design
- Cron jobs
- API integrations
- Business logic
- Data validation

**Expertise**:
- Convex functions
- TypeScript
- Database modeling
- API design
- Error handling

**Strict Rules**:
- ✅ MUST use Convex validators
- ✅ MUST handle errors with ConvexError
- ✅ MUST write unit tests
- ✅ MUST document function signatures
- ❌ NEVER expose sensitive data
- ❌ NEVER skip input validation

**Output**:
- Convex function code
- Schema updates
- Unit tests
- API documentation

---

### Testing Agent (Future)

**Role**: Quality assurance specialist

**Documentation**: `.claude/TESTING_AGENT.md` (to be created)

**Invoked For**:
- Writing Playwright tests
- Visual regression testing
- Debugging test failures
- Coverage analysis
- Test maintenance

**Expertise**:
- Playwright
- Visual testing
- Unit testing
- Integration testing
- E2E testing

**Strict Rules**:
- ✅ MUST follow `.claude/TESTING.md` protocols
- ✅ MUST capture screenshots for frontend tests
- ✅ MUST verify design system compliance
- ✅ MUST test at 3 breakpoints
- ❌ NEVER skip visual validation
- ❌ NEVER use hard-coded timeouts

**Output**:
- Test files
- Test results
- Screenshots
- Coverage reports

---

## 🔀 Task Routing Logic

### Decision Tree

```
User Task Received
    ↓
Analyze Task Type
    ↓
┌─────────────────────────────────────┐
│ Is it UI/component/styling related? │
│ Yes → ROUTE TO FRONTEND AGENT       │
│ No → Continue                        │
└─────────────────────────────────────┘
    ↓
┌─────────────────────────────────────┐
│ Is it Convex/database/API related?  │
│ Yes → ROUTE TO BACKEND AGENT        │
│ No → Continue                        │
└─────────────────────────────────────┘
    ↓
┌─────────────────────────────────────┐
│ Is it testing/QA related?           │
│ Yes → ROUTE TO TESTING AGENT        │
│ No → Continue                        │
└─────────────────────────────────────┘
    ↓
┌─────────────────────────────────────┐
│ Is it full-stack feature?           │
│ Yes → ROUTE TO MULTIPLE AGENTS      │
│ No → HANDLE DIRECTLY                │
└─────────────────────────────────────┘
```

### Task Classification Examples

#### Frontend Tasks

**Keywords**: build, create, design, style, layout, component, page, form, button, card, modal, navigation, responsive, UI, UX

**Examples**:
- "Build a contribution form"
- "Create the dashboard page"
- "Design the newsletter archive view"
- "Style the navigation bar"
- "Make the landing page responsive"
- "Add a modal for confirmation"

**Route To**: Frontend Agent

---

#### Backend Tasks

**Keywords**: database, schema, mutation, query, action, cron, API, integration, business logic, validation

**Examples**:
- "Create a Convex mutation to save contributions"
- "Update the schema to add a new field"
- "Build a cron job for newsletter sending"
- "Integrate with Resend API"
- "Add validation for user input"

**Route To**: Backend Agent

---

#### Testing Tasks

**Keywords**: test, spec, coverage, visual regression, screenshot, debug, failure, QA

**Examples**:
- "Write tests for the contribution form"
- "Debug failing Playwright tests"
- "Add visual regression tests for the dashboard"
- "Check test coverage for newsletter module"

**Route To**: Testing Agent

---

#### Full-Stack Tasks

**Keywords**: feature, end-to-end, flow, integrate, implement

**Examples**:
- "Build the monthly contribution feature"
- "Implement the newsletter archive system"
- "Add authentication flow"
- "Create the user dashboard"

**Route To**: Multiple agents in sequence

---

## 🔄 Multi-Agent Workflows

### Workflow 1: Simple Frontend Task

```
User: "Build a contribution form"
    ↓
Main Agent:
  1. Identifies: Frontend task
  2. Routes to: Frontend Agent
    ↓
Frontend Agent:
  1. Reads DESIGN_SYSTEM.md
  2. Builds ContributionForm.tsx using DaisyUI
  3. Takes screenshots (desktop/tablet/mobile)
  4. Runs visual regression tests
  5. Verifies design system compliance
  6. Returns: Code + screenshots + test results
    ↓
Main Agent:
  1. Integrates code into codebase
  2. Updates CHANGELOG.md
  3. Reports to user: "✅ Contribution form complete"
```

---

### Workflow 2: Full-Stack Feature

```
User: "Build the newsletter archive feature"
    ↓
Main Agent:
  1. Identifies: Full-stack task
  2. Breaks down into:
     - Backend: Convex query to fetch newsletters
     - Frontend: Archive page UI
     - Testing: E2E test for archive flow
  3. Coordinates execution
    ↓
Backend Agent (parallel):
  1. Creates newsletters.ts query
  2. Adds pagination logic
  3. Writes unit tests
  4. Returns: Code + tests
    ↓
Frontend Agent (parallel):
  1. Creates archive page
  2. Builds newsletter card components
  3. Takes screenshots
  4. Runs visual tests
  5. Returns: Code + screenshots + tests
    ↓
Main Agent:
  1. Integrates backend + frontend code
  2. Verifies integration
    ↓
Testing Agent:
  1. Writes E2E test for full archive flow
  2. Runs test
  3. Returns: Test results
    ↓
Main Agent:
  1. Updates CHANGELOG.md
  2. Reports to user: "✅ Newsletter archive feature complete"
```

---

### Workflow 3: Design System Update

```
User: "Add a new secondary color to the design system"
    ↓
Main Agent:
  1. Identifies: Design system change (requires approval)
  2. PAUSES execution
  3. Asks user:
     "This requires adding a new color to DESIGN_SYSTEM.md.
      New color: [provide details]
      Should I proceed?"
    ↓
User approves
    ↓
Main Agent:
  1. Updates DESIGN_SYSTEM.md
  2. Updates daisyui.config.ts
  3. Updates app/globals.css
  4. Notifies all agents: "Design system updated"
    ↓
Frontend Agent:
  1. Reviews new color tokens
  2. Updates component library documentation
    ↓
Main Agent:
  1. Updates CHANGELOG.md
  2. Reports to user: "✅ Design system updated"
```

---

## 🎯 Agent Communication Protocol

### Task Assignment Format

When main agent invokes sub-agent:

```typescript
{
  taskId: "unique-task-id",
  agentType: "frontend" | "backend" | "testing",
  task: "Build contribution form with 5 prompts",
  requirements: [
    "Use DaisyUI components",
    "Match design system colors",
    "Responsive mobile/tablet/desktop",
    "Visual test with screenshots"
  ],
  context: {
    designSystemRef: ".claude/DESIGN_SYSTEM.md",
    relatedFiles: ["components/forms/", "app/contribute/"],
    existingCode: "..."
  },
  constraints: {
    maxAttempts: 3,
    timeout: 600000, // 10 minutes
    mustValidate: true
  }
}
```

### Agent Response Format

Sub-agent returns to main agent:

```typescript
{
  taskId: "unique-task-id",
  status: "complete" | "failed" | "escalated",
  output: {
    code: {
      files: [
        { path: "components/forms/ContributionForm.tsx", content: "..." },
        { path: "tests/visual/contribution-form.spec.ts", content: "..." }
      ]
    },
    tests: {
      functional: { passed: 5, failed: 0 },
      visual: { passed: 3, failed: 0 },
      screenshots: [
        "screenshots/contribution-form-desktop.png",
        "screenshots/contribution-form-tablet.png",
        "screenshots/contribution-form-mobile.png"
      ]
    },
    validation: {
      designSystemCompliance: 100,
      issues: []
    }
  },
  metadata: {
    duration: 45000, // 45 seconds
    attempts: 1,
    tokensUsed: 12500
  },
  message: "✅ Contribution form built successfully. Design system compliant."
}
```

---

## 📊 Task Execution Flow Diagram

```
┌─────────────────────────────────────────────────────────────┐
│                     USER TASK REQUEST                        │
└─────────────────────────────────────────────────────────────┘
                            ↓
┌─────────────────────────────────────────────────────────────┐
│                   MAIN ORCHESTRATOR AGENT                    │
│  - Parse task                                                │
│  - Classify task type                                        │
│  - Route to specialized agent(s)                             │
└─────────────────────────────────────────────────────────────┘
                            ↓
         ┌──────────────────┼──────────────────┐
         ↓                  ↓                   ↓
┌──────────────────┐ ┌──────────────────┐ ┌──────────────────┐
│ FRONTEND AGENT   │ │ BACKEND AGENT    │ │ TESTING AGENT    │
│                  │ │                  │ │                  │
│ 1. Read design   │ │ 1. Design schema │ │ 1. Write tests   │
│    system        │ │ 2. Write Convex  │ │ 2. Run tests     │
│ 2. Build UI      │ │    functions     │ │ 3. Capture       │
│ 3. Take          │ │ 3. Validate data │ │    screenshots   │
│    screenshots   │ │ 4. Write tests   │ │ 4. Analyze       │
│ 4. Run visual    │ │ 5. Return code   │ │    coverage      │
│    tests         │ │                  │ │ 5. Return        │
│ 5. Validate      │ │                  │ │    results       │
│    compliance    │ │                  │ │                  │
│ 6. Return code   │ │                  │ │                  │
└──────────────────┘ └──────────────────┘ └──────────────────┘
         ↓                  ↓                   ↓
         └──────────────────┼──────────────────┘
                            ↓
┌─────────────────────────────────────────────────────────────┐
│             MAIN AGENT - INTEGRATION & VALIDATION            │
│  - Combine outputs from all agents                           │
│  - Run integration tests                                     │
│  - Verify end-to-end functionality                           │
│  - Update CHANGELOG.md                                       │
└─────────────────────────────────────────────────────────────┘
                            ↓
┌─────────────────────────────────────────────────────────────┐
│                    REPORT TO USER                            │
│  ✅ Task complete                                            │
│  📊 Test results                                             │
│  📸 Screenshots                                              │
│  📝 Changelog updated                                        │
└─────────────────────────────────────────────────────────────┘
```

---

## 🚨 Error Handling & Escalation

### Agent Failure Scenarios

#### Scenario 1: Frontend Agent - Design System Violation

```
Frontend Agent detects: Hardcoded hex color in code
    ↓
Frontend Agent: Auto-fix (replace with design token)
    ↓
Re-run visual test
    ↓
Pass? → Continue
Fail? → Retry (max 3 attempts)
    ↓
Still failing? → Escalate to Main Agent
    ↓
Main Agent: Report to user with details
```

#### Scenario 2: Backend Agent - Test Failure

```
Backend Agent: Writes Convex mutation
    ↓
Runs unit test → FAIL
    ↓
Debug → Fix → Re-run (Attempt 2)
    ↓
Still failing? → Retry (Attempt 3)
    ↓
Still failing? → Escalate to Main Agent
    ↓
Main Agent: Report to user:
  "Backend test failing after 3 attempts.
   Issue: [error details]
   Need guidance on: [specific question]"
```

#### Scenario 3: Multi-Agent Coordination Failure

```
Frontend Agent: Completes UI
Backend Agent: Completes API
    ↓
Main Agent: Attempts integration
    ↓
Integration test → FAIL (API response format mismatch)
    ↓
Main Agent:
  1. Identifies mismatch
  2. Asks Backend Agent to adjust response format
  3. Backend Agent fixes
  4. Re-test integration
    ↓
Pass? → Continue
Fail after 3 attempts? → Escalate to user
```

---

## 🎯 Agent Performance Metrics

### Tracked Metrics

**Per Agent**:
- Tasks completed
- Success rate
- Average duration
- Design system compliance (Frontend)
- Test pass rate
- Escalation frequency

**Overall System**:
- Multi-agent coordination success
- Time to completion (simple vs complex tasks)
- User satisfaction (task quality)

### Example Metrics Report

```markdown
## Agent Performance Report - Week 1

### Frontend Agent
- Tasks completed: 15
- Success rate: 93% (14/15)
- Average duration: 3.5 minutes
- Design system compliance: 100%
- Visual tests passed: 42/45 (93%)
- Escalations: 1 (color token missing)

### Backend Agent
- Tasks completed: 10
- Success rate: 100% (10/10)
- Average duration: 2.8 minutes
- Unit tests passed: 28/28 (100%)
- Escalations: 0

### Overall
- Multi-agent tasks: 5
- Integration success: 100%
- Average task completion: 6.2 minutes
- User satisfaction: ⭐⭐⭐⭐⭐
```

---

## 🔧 Main Agent Responsibilities

### Task Routing

```typescript
function routeTask(task: UserTask) {
  // Classify task
  const taskType = classifyTask(task.description);

  switch (taskType) {
    case 'frontend':
      return invokeFrontendAgent(task);

    case 'backend':
      return invokeBackendAgent(task);

    case 'testing':
      return invokeTestingAgent(task);

    case 'full-stack':
      return coordinateMultiAgent(task);

    default:
      return handleDirectly(task);
  }
}
```

### Multi-Agent Coordination

```typescript
async function coordinateMultiAgent(task: UserTask) {
  // Break down task
  const subtasks = decomposeTask(task);

  // Identify dependencies
  const { parallel, sequential } = analyzeDependencies(subtasks);

  // Execute parallel tasks
  const parallelResults = await Promise.all(
    parallel.map(subtask => routeTask(subtask))
  );

  // Execute sequential tasks
  const sequentialResults = [];
  for (const subtask of sequential) {
    const result = await routeTask(subtask);
    sequentialResults.push(result);
  }

  // Integrate results
  return integrateResults([...parallelResults, ...sequentialResults]);
}
```

### Integration & Validation

```typescript
async function integrateResults(results: AgentResult[]) {
  // Combine code from all agents
  const code = mergeCode(results.map(r => r.output.code));

  // Run integration tests
  const integrationTest = await runE2ETest(code);

  if (!integrationTest.passed) {
    // Attempt auto-fix
    const fixed = await attemptAutoFix(integrationTest.errors);
    if (!fixed) {
      escalateToUser(integrationTest.errors);
    }
  }

  // Update changelog
  updateChangelog(results);

  return {
    status: 'complete',
    code,
    tests: integrationTest,
  };
}
```

---

## 📚 Quick Reference

### When to Invoke Frontend Agent

✅ Task mentions: UI, component, page, form, button, card, style, layout, responsive, design
✅ Task involves: React, Next.js, Tailwind, DaisyUI
✅ Task requires: Visual polish, design system compliance

### When to Invoke Backend Agent

✅ Task mentions: database, schema, mutation, query, action, API, cron, business logic
✅ Task involves: Convex, data modeling, server functions
✅ Task requires: Data validation, error handling

### When to Invoke Testing Agent

✅ Task mentions: test, spec, coverage, visual regression, debug
✅ Task involves: Playwright, unit tests, E2E tests
✅ Task requires: Quality assurance, screenshot validation

### When to Use Multi-Agent

✅ Task requires both frontend + backend
✅ Task is a complete feature (end-to-end)
✅ Task spans multiple layers (UI + data + logic)

---

**Version**: 1.0.0
**Last Updated**: 2025-10-01
**Maintained By**: Agentic Framework Team
