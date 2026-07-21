# 🪶 NoteNest

🔗 **[Live Demo](https://notes-app-react-t18o.vercel.app/)**

A modern, theme-based React notes app designed for productivity and creativity.
 
NoteNest helps you organize your thoughts by creating notebooks, managing notes, and using colorful sticky notes — all within a clean, responsive, and user-friendly interface.
 
---
 
## Features
 
**Notebook Management**
- Create and delete notebooks.
- Organize notes into separate categories.
  
**Notes Editor**
- Create and edit notes.
- Pin important notes.
- Archive notes.
- Move notes to trash.
  
**Sticky Notes**
- Create colorful sticky notes.
- Drag and reposition notes freely.
- Random color generation for better visual organization.
  
**Light & Dark Theme**
- Switch seamlessly between light and dark modes.
- Consistent styling across the application.
- Pill-style toggle button with sun and moon icons.
  
**Export & Import Notes**
- Export all notes as a .json file.
- Import notes back into the app for backup or migration.
  
**Responsive Mobile Menu**
- On desktop, all action buttons (theme toggle, export, import) are visible.
- On mobile, these actions collapse into a "three dots" dropdown menu for a cleaner UI.
  
**Responsive Sidebar**
- Collapsible navigation panel.
- Quick notebook access.
- Modern icon-based interface.
  
**Reusable Modals**
- Add notebook dialog.
- Delete confirmation dialog.
- Smooth user interactions.
  
**Modern UI**
- Built with Lucide React Icons.
- Clean and responsive layout.
- Component-based architecture.
---
 
## Project Structure
 
```text
src/
├── assets/                     # Images, icons, and static assets
├── components/
│   ├── common/
│   │   ├── Modal.css
│   │   └── Modal.jsx
│   │
│   ├── layout/
│   │   ├── Sidebar.css
│   │   ├── Sidebar.jsx
│   │   ├── Topbar.css
│   │   └── Topbar.jsx
│   │
│   ├── notes/
│   │   ├── NoteCard.css
│   │   ├── NoteCard.jsx
│   │   ├── NoteEditor.css
│   │   ├── NoteEditor.jsx
│   │   └── NoteList.jsx
│   │
│   └── stickyNotes/
│       ├── StickyNote.css
│       ├── StickyNote.jsx
│       └── StickyNoteBoard.jsx
│
├── App.jsx
├── index.css
├── main.jsx
├── index.html
├── eslint.config.js
├── package.json
├── package-lock.json
└── README.md
```
 
---
 
## Built With
 
- React
- Vite
- CSS3
- Lucide React Icons
- npm
---
 
## Getting Started
 
### 1. Clone the Repository
 
```bash
git clone https://github.com/yourusername/notenest.git
```
 
### 2. Navigate to the Project
 
```bash
cd notenest
```
 
### 3. Install Dependencies
 
```bash
npm install
```
 
### 4. Start the Development Server
 
```bash
npm run dev
```
 
Open your browser and visit:
 
```
http://localhost:5173
```
 
---
 
## Component Overview
 
| Component | Description |
|-----------|-------------|
| Sidebar | Navigation and notebook management |
| Topbar | Theme toggle and application controls |
| NoteEditor | Create and edit notes |
| NoteCard | Displays an individual note |
| NoteList | Renders all notes |
| StickyNoteBoard | Displays draggable sticky notes |
| StickyNote | Individual sticky note |
| Modal | Reusable confirmation/input modal |
 
---
 
## Styling
 
- Modular CSS for every component.
- Global variables are defined in `index.css`.
- Responsive layout for desktop and mobile.
- Smooth transitions and animations.
- Dark mode implemented using theme-based CSS classes.
---
 
## Theme Support
 
- Light Mode
- Dark Mode
The application allows users to switch themes instantly while maintaining a consistent design throughout the interface.
 
---
 
## Future Enhancements
 
- Add labels and categories.
- Firebase/Supabase cloud synchronization.
- User authentication.
- Export notes as PDF or Markdown.
- Favorite notebooks.
- Reminders and due dates.
---
 
## Support
 
If you found this project helpful, consider giving it a star on GitHub.
---

## License

Open source under the [MIT License](LICENSE).

---

## Author
**Faiqa Aamer** 

---

## Connect with me
- 🌐 GitHub: https://github.com/FaiqaAamer  
- 💼 LinkedIn: https://www.linkedin.com/in/faiqa-aamer-a84a083ab/
