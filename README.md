# Fresh Blog 📝🚀

An experimental blog setup integrating **[Decap CMS](https://decapcms.org/)** (a headless CMS) with **[Fresh](https://fresh.deno.dev/)** (a modern web framework for Deno), all in the same repository.

👉 **Live Demo:** [bemayer-fresh-blog.deno.dev](https://bemayer-fresh-blog.deno.dev/)

## 📌 Project Goals

- **Seamless Integration**: Combining a headless CMS with a Fresh-powered frontend in a single repo.
- **Simple & Lightweight**: Leverage Deno’s Fresh framework for a minimal and fast blog.
- **Experimental Setup**: Exploring the viability of Decap CMS with Fresh for content management.

## 🛠️ Tech Stack

- **[Fresh](https://fresh.deno.dev/)** – Deno-native web framework, optimized for speed and simplicity.
- **[Decap CMS](https://decapcms.org/)** – A Git-based CMS for managing blog posts directly from the UI.
- **[Deno Deploy](https://dash.deno.com/)** – Hosting the project seamlessly with Deno's native deployment platform.

## 🚀 Running Locally

### Prerequisites
- [Deno](https://deno.land/) installed

### Steps

```bash
# Clone the repository
git clone https://github.com/bemayer/fresh-blog.git

# Navigate to the project folder:
cd fresh-blog

# Start the development server:
deno task start
```

Then open **http://localhost:8000** in your browser.

## 📖 Content Management

Decap CMS provides an admin interface for managing blog posts.
To access it, navigate to **/admin** in the deployed app.

## 🎯 Roadmap

- [ ] Enhance CMS configuration for more flexibility
- [ ] Add Markdown support for posts
- [ ] Improve styling & UI components

## 🛠️ Contributing

This is an experimental project, but contributions, feedback, and ideas are welcome!

---

**Author**: [Benoît Mayer](https://github.com/bemayer)

**License**: MIT
