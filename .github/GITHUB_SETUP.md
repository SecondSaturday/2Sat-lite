# GitHub Setup Guide

## Repository Secrets Configuration

To enable GitHub Actions workflows for automated testing and deployment, you need to configure the following secrets in your GitHub repository.

### How to Add Secrets

1. Go to your repository on GitHub
2. Click **Settings** → **Secrets and variables** → **Actions**
3. Click **New repository secret**
4. Add each secret below

---

## Required Secrets

### Clerk Authentication

**NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY**
- Value: `pk_test_bGl2ZS1zYXR5ci0yLmNsZXJrLmFjY291bnRzLmRldiQ`
- Description: Public Clerk key for authentication
- Get from: https://dashboard.clerk.com → API Keys

**CLERK_SECRET_KEY**
- Value: `sk_test_kABsc5ZD3p5wKpq53oyi7CGkhzo5qOWgE4WoiasqUs`
- Description: Secret Clerk key for server-side authentication
- Get from: https://dashboard.clerk.com → API Keys

### Convex Backend

**NEXT_PUBLIC_CONVEX_URL**
- Value: `https://watchful-minnow-507.convex.cloud`
- Description: Public Convex deployment URL
- Get from: https://dashboard.convex.dev

**CONVEX_DEPLOY_KEY**
- Value: (Generate from Convex dashboard)
- Description: Deploy key for automated Convex deployments
- Get from: https://dashboard.convex.dev → Settings → Deploy Keys

### Vercel Deployment

**VERCEL_TOKEN**
- Value: (Generate from Vercel dashboard)
- Description: Vercel authentication token
- Get from: https://vercel.com/account/tokens

**VERCEL_ORG_ID**
- Value: (Get from project settings)
- Description: Your Vercel organization/team ID
- Get from: Project Settings → General → Project ID section

**VERCEL_PROJECT_ID**
- Value: (Get from project settings)
- Description: Your Vercel project ID
- Get from: Project Settings → General → Project ID

---

## Enabling Workflows

Once all secrets are configured:

### 1. Enable Test Workflow

Edit `.github/workflows/test.yml` and change:

```yaml
on:
  workflow_dispatch:  # Manual trigger only
```

To:

```yaml
on:
  pull_request:
    branches: [main, develop]
  push:
    branches: [main, develop]
```

### 2. Enable Deploy Workflow

Edit `.github/workflows/deploy.yml` and change:

```yaml
on:
  workflow_dispatch:  # Manual trigger only
```

To:

```yaml
on:
  push:
    branches: [main]
  workflow_dispatch:
```

---

## Workflow Overview

### Test Workflow (`test.yml`)

Runs on every push and pull request:
- ✅ Lints code
- ✅ Type checks with TypeScript
- ✅ Runs Playwright tests
- ✅ Uploads test results and reports

### Deploy Workflow (`deploy.yml`)

Runs on every push to main branch:
- ✅ Deploys Convex backend
- ✅ Deploys frontend to Vercel
- ✅ Notifies on success/failure

---

## Manual Deployment (Current Method)

Until workflows are configured, deploy manually:

### Deploy Convex
```bash
npx convex deploy
```

### Deploy Vercel
```bash
vercel --prod
```

---

## Security Notes

⚠️ **NEVER commit secrets to the repository**
- All secrets are stored in `.env.local` (git-ignored)
- GitHub Secrets are encrypted and only accessible to workflows
- Rotate keys immediately if accidentally exposed

---

Last updated: 2025-10-02
