# Ratatosk News

<p align="center">
  <img src="./ratatosk_logo.svg" alt="Ratatosk logo" width="450" />
</p>

Simple news platform built with HTML, CSS, JavaScript, and Supabase.

View the live site at https://larstp.github.io/ratatosk-news.

## What this project does

- Register and log in users with Supabase Auth
- Show a feed of posts
- Let logged-in users create posts
- Hide/show parts of the UI based on login state

## Tech used

- Supabase (Auth + Database)
- Vanilla JavaScript
- Tailwind CSS (built with Tailwind CLI)

## Run locally

1. Install dependencies:

```bash
npm install
```

2. Build CSS once:

```bash
npm run build:css
```

3. (Optional) Watch CSS while editing:

```bash
npm run dev:css
```

4. Open `index.html` with your local server/live server.
   You can also view the live site at https://larstp.github.io/ratatosk-news.

## Main pages

- `index.html` - landing page
- `login.html` - login
- `register.html` - register
- `feed.html` - post feed

## Main JS files

- `js/supabase.js` - Supabase client
- `js/auth.js` - auth helpers
- `js/login.js` - login form logic
- `js/register.js` - register form logic
- `js/posts.js` - feed and post creation logic
- `js/header.js` - feed header auth button logic
- `js/ui.js` - message UI helper
