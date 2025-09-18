# Next.js Blog with Deno 📝🚀

A modern blog setup integrating **[Decap CMS](https://decapcms.org/)** (a headless CMS) with **[Next.js](https://nextjs.org/)** running on **[Deno](https://deno.com/)**, deployed to **GitHub Pages**.

👉 **Live Demo:** [Your GitHub Pages URL will be here]

## 📌 Project Goals

- **Static Site Generation**: Fast, SEO-friendly blog with Next.js static export
- **Deno Runtime**: Modern JavaScript runtime without Node.js dependencies
- **GitHub Integration**: Content management and deployment via GitHub
- **Headless CMS**: Easy content editing with Decap CMS

## 🛠️ Tech Stack

- **[Next.js](https://nextjs.org/)** – React framework with static site generation
- **[Deno](https://deno.com/)** – Secure runtime for JavaScript and TypeScript
- **[Decap CMS](https://decapcms.org/)** – Git-based CMS for managing blog posts
- **[GitHub Pages](https://pages.github.com/)** – Free static site hosting
- **[Tailwind CSS](https://tailwindcss.com/)** – Utility-first CSS framework

## 🚀 Running Locally

### Prerequisites
- [Deno](https://deno.land/) installed

### Steps

```bash
# Clone the repository
git clone https://github.com/bemayer/fresh-blog.git

# Navigate to the project folder:
cd fresh-blog

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

## 🚀 Deployment Setup

### 1. Enable GitHub Pages

1. Go to your repository on GitHub
2. Navigate to **Settings** → **Pages**
3. Under **Source**, select **GitHub Actions**
4. The workflow will automatically deploy when you push to the `main` branch

### 2. Configure Decap CMS Authentication

To enable content editing through the `/admin` interface:

1. **Go to GitHub Settings**:
   - Visit: https://github.com/settings/developers
   - Click **New OAuth App**

2. **Create OAuth App**:
   - **Application name**: `Your Blog Name - CMS`
   - **Homepage URL**: `https://yourusername.github.io/repository-name`
   - **Authorization callback URL**: `https://yourusername.github.io/repository-name/admin/`
   - Click **Register application**

3. **Get Credentials**:
   - Copy the **Client ID**
   - Generate and copy the **Client Secret**

4. **Add to Netlify (for auth)**:
   - Sign up at [Netlify](https://netlify.com)
   - Go to **Site settings** → **Identity** → **External providers**
   - Enable **GitHub** and add your OAuth credentials
   - Set **Git Gateway** to enabled

5. **Update CMS Config**:
   Update `public/admin/config.yml` with your repository details:
   ```yaml
   backend:
     name: github
     repo: yourusername/repository-name
     branch: main
   ```

### 📖 Content Management

After setup, access the admin interface at `/admin` to:
- ✍️ Create and edit blog posts
- 📸 Upload images
- 📝 Manage content with a visual editor
- 🚀 Auto-deploy changes via GitHub

---

**Author**: [Benoît Mayer](https://github.com/bemayer)

**License**: MIT
