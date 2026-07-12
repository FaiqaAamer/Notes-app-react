# 📒 Notes App

A React-based Notes application with sidebar navigation, note editor, and notebook management.  
Supports pinning, archiving, trashing, restoring, and permanent deletion of notes.

---

## 🚀 Features

- **Sidebar Navigation**
  - All Notes
  - Pinned Notes
  - Archive
  - Trash
  - Custom Notebooks (with live note counts)

- **Note Management**
  - Create new notes
  - Edit existing notes
  - Pin/unpin notes
  - Archive/unarchive notes
  - Move notes to Trash
  - Restore notes from Trash
  - Permanently delete notes (with confirmation modal)

- **Responsive Layout**
  - Sidebar collapses automatically on small screens (`<= 480px`).

---

## 📂 Project Structure

```
src/
├── components/
│   ├── layout/
│   │   ├── Sidebar.jsx
│   │   └── Topbar.jsx
│   ├── notes/
│   │   ├── NoteList.jsx
│   │   ├── NoteCard.jsx
│   │   └── NoteEditor.jsx
│   └── Modal.css
├── App.jsx
└── index.js
```


---

## 🎨 Styling

- **NoteCard.css** → styles for individual note cards (title, preview, dropdown menu).
- **Modal.css** → styles for the confirmation modal:
  - Centered overlay with blur effect
  - Smooth fade-in animation
  - Buttons for Restore, Delete Permanently, Cancel
- Sidebar and Topbar use simple flexbox layouts for responsiveness.

---

## ▶️ Running the App

1. Clone the repository:
   ```bash
   git clone <your-repo-url>
   cd notes-app
2. Install dependencies:
   ```bash
   npm install
3. Start development server: 
   ```bash
   npm run dev
