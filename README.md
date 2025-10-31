# activity-finder
A web app for browsing and exploring community activities.

## Development Setup

This project includes a devcontainer configuration for a consistent development environment.

### Using Dev Containers

1. Install [Docker](https://www.docker.com/products/docker-desktop) and [VS Code](https://code.visualstudio.com/)
2. Install the [Dev Containers extension](https://marketplace.visualstudio.com/items?itemName=ms-vscode-remote.remote-containers) for VS Code
3. Open this repository in VS Code
4. When prompted, click "Reopen in Container" (or use Command Palette: "Dev Containers: Reopen in Container")

The devcontainer will automatically:
- Set up a Node.js 20 environment
- Install project dependencies
- Configure ESLint, Tailwind CSS, and Prettier extensions
- Forward port 3000 for the development server

### Manual Setup

If you prefer not to use devcontainers, ensure you have Node.js 20 or later installed, then run:

```bash
npm install
```
