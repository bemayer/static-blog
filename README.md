# Next.js Static Blog with Deno 📝🚀

A modern static blog built with **[Next.js](https://nextjs.org/)** running on
**[Deno](https://deno.com/)**, featuring integrated content management and
automated deployment to **GitHub Pages**.

👉 **Live Demo:**
[bemayer.github.io/static-blog](https://bemayer.github.io/static-blog)

## Table of Contents

- [Project Goals](#-project-goals)
- [Tech Stack](#️-tech-stack)
- [Getting Started](#-getting-started)
- [Deployment](#-deployment)
- [Content Management System (CMS)](#-content-management-system-cms)
- [Contributing](#-contributing)

## 📌 Project Goals

- **Static Site Generation**: Fast, SEO-friendly blog with Next.js static export
- **Deno Runtime**: Modern JavaScript runtime without Node.js dependencies
- **GitHub Integration**: Content management and deployment via GitHub
- **Multiple CMS Options**: Choose between advanced or simple content editing

## 🛠️ Tech Stack

- **[Next.js](https://nextjs.org/)** – React framework with static site
  generation
- **[Deno](https://deno.com/)** – Secure runtime for JavaScript and TypeScript
- **[GitHub Pages](https://pages.github.com/)** – Free static site hosting
- **[Tailwind CSS](https://tailwindcss.com/)** – Utility-first CSS framework
- **CMS Options**: Decap CMS or Prose.io for content management

## 🚀 Getting Started

### Prerequisites

- [Deno](https://deno.land/) installed

### Steps

```bash
# Clone the repository
git clone https://github.com/bemayer/static-blog.git

# Navigate to the project folder:
cd static-blog

# Install dependencies:
deno install

# Start the development server:
deno task dev
```

Then open **http://localhost:3000** in your browser.

## 📦 Building for Production

```bash
# Build the static site:
deno task build

# The static files will be generated in the 'out' directory
```

## 🚀 Deployment

### Enable GitHub Pages

1. Go to your repository on GitHub
2. Navigate to **Settings** → **Pages**
3. Under **Source**, select **GitHub Actions**
4. The workflow will automatically deploy when you push to the `main` branch

Your site will be available at `https://yourusername.github.io/repository-name`

## 📝 Content Management System (CMS)

Choose between two content management options based on your needs:

### Option 1: Decap CMS (Advanced)

**Benefits:**

- 🎨 **Visual Editor**: Rich WYSIWYG markdown editor
- 📸 **Media Management**: Upload and organize images
- 👥 **Workflow Support**: Editorial workflow with drafts/reviews
- 🔄 **Real-time Preview**: See changes before publishing

**How it works:** Decap CMS is served as static files at `/admin` and provides a
web-based interface for editing your blog content.

#### Authentication Flow

```mermaid
sequenceDiagram
    participant U as User
    participant CMS as Decap CMS
    participant N as Netlify OAuth
    participant GH as GitHub API
    participant GP as GitHub Pages

    U->>GP: Visit /admin
    GP->>U: Serve Decap CMS
    U->>CMS: Click "Login with GitHub"
    CMS->>N: Request OAuth (needs serverless endpoint)
    Note over CMS,N: GitHub Pages can't provide server-side<br/>OAuth token exchange
    N->>GH: GitHub OAuth flow
    GH->>N: Return access token
    N->>CMS: Provide token
    CMS->>GH: Make API calls with token
    CMS->>U: Authenticated interface
```

**Why Netlify is needed:** Decap CMS can absolutely use GitHub auth, but needs a
secure OAuth token exchange endpoint. GitHub Pages (static hosting) can't
provide this server-side component, so Netlify provides the missing serverless
OAuth proxy.

#### Setup Instructions

1. **Create GitHub OAuth App**:
   - Go to
     [GitHub Settings > Developer Settings > OAuth Apps](https://github.com/settings/developers)
   - Click **"New OAuth App"**
   - Fill in:
     - **Application name**: `Your Blog CMS`
     - **Homepage URL**: `https://yourusername.github.io/repository-name`
     - **Authorization callback URL**: `https://api.netlify.com/auth/done`
   - Save the **Client ID** and **Client Secret**

2. **Configure Netlify for OAuth** (not for hosting):
   - Sign up at [netlify.com](https://netlify.com) (free account)
   - Create new site from Git → Select your repository
   - Don't worry about build settings/deployment failures
   - Go to **Site Settings** → **Domain Management** → **Options** → **Access &
     Security** → **OAuth**
   - Click **"Install Provider"** → **"GitHub"**
   - Enter your Client ID and Client Secret
   - Save settings

3. **Access CMS**:
   - Visit `https://yourusername.github.io/repository-name/admin/`
   - Click "Login with GitHub"
   - Authorize the application
   - Start editing your content!

#### Troubleshooting

- **"Cannot connect to repository"**: Check your OAuth app callback URL is
  exactly `https://api.netlify.com/auth/done`
- **"Not Found" on /admin**: Ensure the deployment worked and try `/admin/` with
  trailing slash
- **Authentication loops**: Clear browser cache and cookies for both sites

### Option 2: Prose.io (Simple)

**Benefits:**

- 🚀 **Zero Setup**: No configuration required
- 🔗 **Direct GitHub**: Connects directly to your repository
- ⚡ **Lightweight**: Simple markdown editing interface
- 🔓 **No External Dependencies**: Works with just GitHub authentication

**How to use:**

1. Visit [prose.io](https://prose.io)
2. Authorize with your GitHub account
3. Navigate to your repository → `posts` folder
4. Edit existing posts or create new ones
5. Commit changes directly to GitHub

**When to choose:**

- You prefer simple markdown editing over visual editors
- You don't want to set up external services
- You occasionally edit content and don't need advanced features
- You're comfortable with markdown syntax

**Limitations:**

- No media upload interface (add images manually to `public/images/`)
- Basic markdown editor (no WYSIWYG)
- No editorial workflow features
- No real-time preview

## 🤝 Contributing

Contributions are welcome! Feel free to:

- 🐛 Report bugs
- 💡 Suggest new features
- 📝 Improve documentation
- 🔧 Submit pull requests

---

**Author**: [Benoît Mayer](https://github.com/bemayer)

**License**: MIT
