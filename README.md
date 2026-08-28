# WaTodo ✅📝

[![Netlify Status](https://api.netlify.com/api/v1/badges/81f8dbc5-cc62-4def-afef-24dc3fdf2420/deploy-status)](https://app.netlify.com/projects/watodo-app/deploys)

WaTodo is a simple, friendly to‑do list application built in 2026 with a modern design system, accessibility‑first structure, and performance‑optimized styling. Designed to be lightweight yet reliable, it remembers your tasks between visits and helps you stay focused on what to do next.

**Live Demo:** [watodo-app.netlify.app](https://watodo-app.netlify.app/)

---

## 🌐 Project Overview

This app demonstrates how a straightforward concept can be elevated into a polished web project:

- **Semantic HTML5** for clarity, accessibility, and maintainability
- **Responsive SCSS/CSS3** with variables, grid, flexbox, and component‑based class naming
- **JavaScript (ES6 modules)** for dynamic list management, localStorage persistence, and accessible modal interactions
- **Clean UI/UX** — minimal, intuitive, and optimized for both keyboard and screen reader users

---

## 📂 File Structure

```
watodo-app/
│
├── index.html              # Main app shell
│
├── favicon/                # Favicon and PWA assets
│
├── scss/                   # Source SCSS partials
│   ├── _base.scss          # Design tokens & reset
│   ├── _utils.scss         # Utility classes (buttons, sr-only)
│   ├── _page.scss          # Layout shell
│   ├── _header.scss        # Wordmark & tagline
│   ├── _entry-card.scss    # Input form styles
│   ├── _list-card.scss     # To-do list display
│   ├── _modal.scss         # Clear confirmation modal
│   ├── _footer.scss        # Footer section
│   └── style.scss          # Main SCSS entrypoint
│
├── dist/
│   └── css/
│       ├── style.min.css       # Compiled & minified CSS
│       └── style.min.css.map   # Source map
│
└── js/
    ├── main.js             # App logic, rendering, persistence
    ├── ToDoItem.js         # Task model class
    └── ToDoList.js         # List manager class
```

---

## ✨ Highlights

- **Accessibility‑first design**  
  Semantic elements, ARIA attributes, inert handling for modals, and screen reader confirmation messages.

- **Persistent storage**  
  Tasks are saved in `localStorage` and restored automatically between visits.

- **Interactive UI**  
  Animated item check‑off, clear‑all confirmation modal, and responsive input focus management.

- **Modern styling**  
  SCSS partials with design tokens, responsive spacing, transitions, and component‑based class naming.

---

## 🚀 Getting Started

1. Clone the repository:
   ```bash
   git clone https://github.com/jjmginon/watodo-app.git
   ```
2. Navigate into the project folder:
   ```bash
   cd watodo-app
   ```
3. Open `index.html` in your browser to use the app.

---

## 🛠️ Technologies

- **HTML5** — semantic structure and accessibility
- **SCSS/CSS3** — design tokens, variables, grid, flexbox, transitions
- **JavaScript (ES6 modules)** — dynamic list management, localStorage persistence, accessible modal logic

---

## 📖 Context

WaTodo was created as a focused exercise in building a modern, accessible, and maintainable front‑end application. It demonstrates how a simple to‑do list can evolve into a clean, scalable project — emphasizing clarity, performance, and user experience.

---

## 👨‍💻 Author

**JJ Ginon**  
Front‑end Web Developer | Accessibility‑first, performance‑optimized, modern web projects
