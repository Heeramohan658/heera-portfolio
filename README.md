# Heera Mohan Sardar — 3D Portfolio

A responsive portfolio website built with Python, Flask, HTML, CSS, JavaScript, and Three.js.

## Features
- Animated 3D particle background and perspective grid
- Responsive mobile navigation
- Intro, about, skills/interests, education, projects, and contact sections
- Email, LinkedIn, and GitHub links
- No database required

## Requirements
- Windows 10/11
- Python 3.10 or newer
- Internet access for the Three.js CDN and Google Fonts (the site can still render basic content without them)

## Run on Windows PowerShell

Open PowerShell in this folder and run:

```powershell
py -m venv .venv
.\.venv\Scripts\python.exe -m pip install --upgrade pip
.\.venv\Scripts\python.exe -m pip install -r requirements.txt
.\.venv\Scripts\python.exe app.py
```

Then open http://127.0.0.1:5000 in your browser.

Stop the development server with Ctrl+C.

## Customize
- Update profile information in `app.py`.
- Edit education entries in `EDUCATION` in `app.py`.
- Edit project cards in `PROJECTS` in `app.py`.
- Change colors and layout in `static/style.css`.
- Change 3D background behavior in `static/script.js`.

Project entries currently describe project ideas; replace them with accurate details and repository links when ready.

## Before deploying
This uses Flask's development server. Set `debug=False` and use a production WSGI server/hosting instructions appropriate for your host. Never expose secrets in source code.
