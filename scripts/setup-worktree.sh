#!/bin/bash

# Setup Git Worktree for Parallel Development
# Usage: ./scripts/setup-worktree.sh <branch-name>

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Check if branch name provided
if [ -z "$1" ]; then
  echo -e "${RED}Error: Branch name required${NC}"
  echo "Usage: ./scripts/setup-worktree.sh <branch-name>"
  echo "Example: ./scripts/setup-worktree.sh feature/contribution-form"
  exit 1
fi

BRANCH_NAME=$1
REPO_ROOT=$(git rev-parse --show-toplevel)
REPO_NAME=$(basename "$REPO_ROOT")
WORKTREE_DIR=$(dirname "$REPO_ROOT")
WORKTREE_PATH="$WORKTREE_DIR/${REPO_NAME}-${BRANCH_NAME##*/}"

echo -e "${YELLOW}🌲 Setting up worktree for: $BRANCH_NAME${NC}"
echo ""

# Check if branch exists locally
if git show-ref --verify --quiet "refs/heads/$BRANCH_NAME"; then
  echo -e "${GREEN}✓${NC} Branch '$BRANCH_NAME' exists locally"
else
  # Check if branch exists remotely
  if git ls-remote --heads origin "$BRANCH_NAME" | grep -q "$BRANCH_NAME"; then
    echo -e "${YELLOW}⚠${NC} Branch '$BRANCH_NAME' exists remotely, checking out..."
    git fetch origin "$BRANCH_NAME:$BRANCH_NAME"
  else
    echo -e "${YELLOW}⚠${NC} Branch '$BRANCH_NAME' does not exist, creating from main..."
    git branch "$BRANCH_NAME" main
  fi
fi

# Check if worktree already exists
if [ -d "$WORKTREE_PATH" ]; then
  echo -e "${YELLOW}⚠${NC} Worktree already exists at: $WORKTREE_PATH"
  read -p "Remove and recreate? (y/n) " -n 1 -r
  echo
  if [[ $REPLY =~ ^[Yy]$ ]]; then
    echo -e "${YELLOW}Removing existing worktree...${NC}"
    git worktree remove "$WORKTREE_PATH" --force
  else
    echo -e "${RED}Aborted${NC}"
    exit 1
  fi
fi

# Create worktree
echo -e "${YELLOW}Creating worktree at: $WORKTREE_PATH${NC}"
git worktree add "$WORKTREE_PATH" "$BRANCH_NAME"

# Navigate to worktree
cd "$WORKTREE_PATH"

# Install dependencies
echo ""
echo -e "${YELLOW}📦 Installing dependencies...${NC}"
npm install

# Copy .env.local if it exists
if [ -f "$REPO_ROOT/.env.local" ]; then
  echo -e "${YELLOW}📄 Copying .env.local...${NC}"
  cp "$REPO_ROOT/.env.local" "$WORKTREE_PATH/.env.local"
fi

# Setup Convex dev instance (optional - for isolated testing)
echo ""
echo -e "${YELLOW}🔧 Convex Setup${NC}"
read -p "Create isolated Convex dev instance? (y/n) " -n 1 -r
echo
if [[ $REPLY =~ ^[Yy]$ ]]; then
  echo -e "${YELLOW}Starting Convex dev...${NC}"
  npx convex dev --once
fi

echo ""
echo -e "${GREEN}✅ Worktree setup complete!${NC}"
echo ""
echo -e "${GREEN}Worktree location:${NC} $WORKTREE_PATH"
echo -e "${GREEN}Branch:${NC} $BRANCH_NAME"
echo ""
echo -e "${YELLOW}Next steps:${NC}"
echo "  1. cd $WORKTREE_PATH"
echo "  2. npm run dev"
echo "  3. Start building!"
echo ""
echo -e "${YELLOW}To remove worktree when done:${NC}"
echo "  git worktree remove $WORKTREE_PATH"
echo ""
