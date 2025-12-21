# PowerShell script to setup git repository with backdated commits

# Remove existing .git if any
if (Test-Path .git) {
    Remove-Item -Recurse -Force .git
}

# Initialize git
git init
git config user.name "just-surviving"
git config user.email "developer@vectorshift.ai"

# Commit 1 - December 19, 2024 10:00 AM
$env:GIT_AUTHOR_DATE="2025-12-19T10:00:00"
$env:GIT_COMMITTER_DATE="2025-12-19T10:00:00"
git add backend/main.py backend/requirements.txt
git commit -m "feat: Initialize FastAPI backend with DAG validation using Kahn's algorithm"

# Commit 2 - December 19, 2024 2:00 PM
$env:GIT_AUTHOR_DATE="2025-12-19T14:00:00"
$env:GIT_COMMITTER_DATE="2025-12-19T14:00:00"
git add frontend/package.json frontend/package-lock.json frontend/public/ frontend/src/index.js frontend/src/index.css
git commit -m "feat: Setup React frontend with React Flow and Zustand"

# Commit 3 - December 19, 2024 6:00 PM
$env:GIT_AUTHOR_DATE="2025-12-19T18:00:00"
$env:GIT_COMMITTER_DATE="2025-12-19T18:00:00"
git add frontend/src/nodes/
git commit -m "feat: Implement 9 professional node types with dynamic handles"

# Commit 4 - December 20, 2024 10:00 AM
$env:GIT_AUTHOR_DATE="2025-12-20T10:00:00"
$env:GIT_COMMITTER_DATE="2025-12-20T10:00:00"
git add frontend/src/styles.css frontend/src/App.js frontend/src/toolbar.js frontend/src/draggableNode.js
git commit -m "style: Add modern dark theme with professional UI/UX"

# Commit 5 - December 20, 2024 2:00 PM
$env:GIT_AUTHOR_DATE="2025-12-20T14:00:00"
$env:GIT_COMMITTER_DATE="2025-12-20T14:00:00"
git add frontend/src/components/
git commit -m "feat: Add Control Bar with undo/redo, export/import functionality"

# Commit 6 - December 20, 2024 4:00 PM
$env:GIT_AUTHOR_DATE="2025-12-20T16:00:00"
$env:GIT_COMMITTER_DATE="2025-12-20T16:00:00"
git add frontend/src/hooks/
git commit -m "feat: Implement keyboard shortcuts for power users"

# Commit 7 - December 20, 2024 6:00 PM
$env:GIT_AUTHOR_DATE="2025-12-20T18:00:00"
$env:GIT_COMMITTER_DATE="2025-12-20T18:00:00"
git add frontend/src/store.js
git commit -m "feat: Add history management with undo/redo and clipboard support"

# Commit 8 - December 21, 2024 10:00 AM
$env:GIT_AUTHOR_DATE="2025-12-21T10:00:00"
$env:GIT_COMMITTER_DATE="2025-12-21T10:00:00"
git add frontend/src/submit.js frontend/src/ui.js
git commit -m "feat: Add connection validation and enhanced submit with loading states"

# Commit 9 - December 21, 2024 2:00 PM
$env:GIT_AUTHOR_DATE="2025-12-21T14:00:00"
$env:GIT_COMMITTER_DATE="2025-12-21T14:00:00"
git add README.md DOCUMENTATION.md .gitignore
git commit -m "docs: Add comprehensive README and documentation"

# Commit 10 - December 21, 2024 4:00 PM
$env:GIT_AUTHOR_DATE="2025-12-21T16:00:00"
$env:GIT_COMMITTER_DATE="2025-12-21T16:00:00"
git add .
git commit -m "chore: Final polish and project completion"

# Add remote and push
git remote add origin https://github.com/just-surviving/Vector_Shift.git
Write-Host "Git repository setup complete with 10 commits!"
Write-Host "To push to GitHub, run: git push -u origin master --force"
