# Ratatosk News

### NOROFF - FED2 OCT24FT - DP - Course Assignment

<p align="center">
  <img src="./ratatosk_logo.svg" alt="Ratatosk logo" width="250" />
</p>

Simple news platform built with HTML, CSS, JavaScript, and Supabase.

**View the live site at https://larstp.github.io/ratatosk-news.**

## What the project does

- Supabase manages all authentication and data persistence
- New users sign up and receive a verification email to activate their account
- Once verified, the user session is established and persists across pages
- The app detects authentication state and displays relevant UI components (login form hides when authenticated, create form shows for members)
- All posts load from the database as styled cards and refresh after create/delete actions

NOTE: Rate limiting applies for registration emails (supabase rules). Please don't send more than 10 in a row.

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

## Author

Lars Torp Pettersen
