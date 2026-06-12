# AI Instructions

## Available Commands

Ask the AI agent any of the following:

- **"deploy"** — commit and push all changes to GitHub
- **"update"** — pull latest changes and resolve any merge conflicts
- **"status"** — show what files have changed and what branch you're on
- **"add artifcat"** - create a new path in the project, and add a link to the path on the main homepage

---

## deploy

When the user asks to deploy, attempt to run the following shell commands directly. If you have permission to run shell commands, do so without asking. If not, provide the commands for the user to run.

```cmd
cd C:\Users\morga\Documents\github-stuff\time-is-money
git add .
git commit -m "<short description of changes>"
git push origin main
```

**If the user needs to open a terminal:**
- **Windows:** Press `Win + R`, type `cmd`, press Enter.

**If push is rejected** (remote has changes you don't have locally), run `update` first, then retry deploy.

---

## update

When the user asks to update, attempt to run these commands directly. If you have permission, do so without asking.

```cmd
cd C:\Users\morga\Documents\github-stuff\time-is-money
git fetch origin
git pull origin main
```

**If there are merge conflicts**, git will list the conflicted files. Resolve them by:

1. Open each conflicted file — look for sections marked like this:
   ```
   <<<<<<< HEAD
   your local changes
   =======
   incoming changes from remote
   >>>>>>> origin/main
   ```
2. Edit the file to keep the correct version and delete the conflict markers.
3. Then finalize:
   ```cmd
   git add .
   git commit -m "Resolve merge conflicts"
   git push origin main
   ```

---

## status

```cmd
cd C:\Users\morga\Documents\github-stuff\time-is-money
git status
git branch
```

---

## add artifcat

1. create a new jsx file in the src\pages directory for the new artifact.
2. create the code for the artifact so it is a self contained component.
3. add a route to the App.jsx to display and run the artifact.