import { useState, useEffect, useRef } from "react";
import Sidebar from "./components/layout/Sidebar";
import Topbar from "./components/layout/Topbar";
import NoteList from "./components/notes/NoteList";
import NoteEditor from './components/notes/NoteEditor'
import StickyNoteBoard from './components/stickyNotes/StickyNoteBoard.jsx'
import './components/common/Modal.css'

function App() {

  //States
  const [isCollapsed, setIsCollapsed] = useState(window.innerWidth <= 480);
  const [activeSection, setActiveSection] = useState("all"); 
  const [isEditorOpen, setIsEditorOpen] = useState(false);
  const [notes, setNotes] = useState([]);
  const [editingNote, setEditingNote] = useState(null);
  const [notebooks, setNotebooks] = useState([]);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [noteToDelete, setNoteToDelete] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [theme, setTheme] = useState("light");
  const [stickyNotes, setStickyNotes] = useState([]);
  const noteColors = ["#F4A99E", "#A8DDBE", "#A8D4EA", "#FBDCA0", "#b18fc2"];
  const lastColorRef = useRef(null);
  const [isLoaded, setIsLoaded] = useState(false);

  //Effects
  useEffect(() => {
    function handleResize() {
      if (window.innerWidth <= 480) {
        setIsCollapsed(true);
      }
    }
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  useEffect(() => {
    setNotebooks(prev =>
      prev.map(nb => ({
        ...nb,
        count: notes.filter(
          n => n.notebookId === nb.id && !n.trashed && !n.archived
        ).length
      }))
    );
  }, [notes]);
  useEffect(() => {
    setSearchQuery("");
  }, [activeSection]);
  
  //Local Storage Effects
  useEffect(() => {
      const savedNotes = localStorage.getItem("notenest-notes");
      const savedNotebooks = localStorage.getItem("notenest-notebooks");
      const savedStickyNotes = localStorage.getItem("notenest-sticky");

      if (savedNotes) setNotes(JSON.parse(savedNotes));
      if (savedNotebooks) setNotebooks(JSON.parse(savedNotebooks));
      if (savedStickyNotes) setStickyNotes(JSON.parse(savedStickyNotes));

      setIsLoaded(true);
  }, []);
  useEffect(() => {
      if (isLoaded) localStorage.setItem("notenest-notes", JSON.stringify(notes));
  }, [notes, isLoaded]);
  useEffect(() => {
      if (isLoaded) localStorage.setItem("notenest-notebooks", JSON.stringify(notebooks));
  }, [notebooks, isLoaded]);
  useEffect(() => {
      if (isLoaded) localStorage.setItem("notenest-sticky", JSON.stringify(stickyNotes));
  }, [stickyNotes, isLoaded]);

  //Note handlers
  const handleAddNote = (note) => {
        if (note.id) {
        setNotes((prev) =>
          prev.map((n) => (n.id === note.id ? note : n))
        );
    } else {
      const newNote = {
        ...note,
        id: notes.length + 1,
        date: new Date().toLocaleDateString(),
        notebookId: typeof activeSection === "number" ? activeSection : null
      };
      setNotes([...notes, newNote]);
    }
  };
  const handlePin = (id) => {
    setNotes(prev => 
      prev.map(n => n.id === id ? {...n, pinned : !n.pinned} : n)
    )
  }
  const handleArchive = (id) => {
    setNotes(prev => 
      prev.map(n => n.id === id ? {...n, archived : !n.archived} : n)
    )
  }
  const handleDelete = (id) => {
    const target = notes.find(n => n.id === id)
    if(target?.trashed){
      setNoteToDelete(id)
      setIsConfirmOpen(true)
    }else{
      setNotes(prev => 
        prev.map(n => n.id === id ? {...n, trashed : !n.trashed} : n)
      )
    }
  }
  const confirmPermanentDelete = () => {
    setNotes(prev => prev.filter(n => n.id !== noteToDelete))
    setIsConfirmOpen(false)
    setNoteToDelete(null)
  }
  const confirmRestore = () => {
    setNotes(prev => prev.map(n => n.id === noteToDelete ? {...n, trashed : false} : n))
    setIsConfirmOpen(false)
    setNoteToDelete(null)
  }
  const filteredNotes = notes.filter(note => {
    const matchesSearch = note.title.toLowerCase().includes(searchQuery.toLowerCase());

      if (activeSection === "all") return !note.archived && !note.trashed && matchesSearch;
      if (activeSection === "pinned") return note.pinned && !note.archived && !note.trashed && matchesSearch;
      if (activeSection === "archive") return note.archived && !note.trashed && matchesSearch;
      if (activeSection === "trash") return note.trashed && matchesSearch;
      return note.notebookId === activeSection && !note.archived && !note.trashed && matchesSearch;
  });
  const toggleTheme = () => {
    setTheme(prev => (prev === "light" ? "dark" : "light"));
  };
  const handleDeleteNotebook = (notebookId) => {
    setNotebooks(prev => prev.filter(nb => nb.id !== notebookId));
    setNotes(prev => prev.filter(n => n.notebookId !== notebookId));  // permanently remove notes in this notebook
    if (activeSection === notebookId) {
        setActiveSection("all");
    }
  };

  //StickyNote handlers
  const addStickyNote = () => {
    let color;
    do {
        color = noteColors[Math.floor(Math.random() * noteColors.length)];
    } while (color === lastColorRef.current && noteColors.length > 1);

    lastColorRef.current = color;
    const newNote = {
      id : Date.now(),
      text : "",
      color : color,
      x : 100,
      y : 100
    }
    setStickyNotes(prev => [...prev, newNote])
  }
  const updateStickyNotePosition = (id, x, y) => {
    setStickyNotes(prev => prev.map(note => note.id === id ? {...note, x, y} : note))
  }
  const updateStickyNoteText = (id, text) => {
    setStickyNotes(prev => prev.map(note => note.id === id ? {...note, text} : note))
  }
  const deleteStickyNote = (id) => {
    setStickyNotes(prev => prev.filter(note => note.id !== id))
  }

  //Export/Import handlers
  const exportData = () => {
      const data = { notes, notebooks, stickyNotes };
      const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "notenest-backup.json";
      a.click();
      URL.revokeObjectURL(url);
  };
  const importData = (e) => {
      const file = e.target.files[0];
      if (!file) return;

      const reader = new FileReader();
      reader.onload = (event) => {
          try {
              const data = JSON.parse(event.target.result);
              setNotes(data.notes || []);
              setNotebooks(data.notebooks || []);
              setStickyNotes(data.stickyNotes || []);
              alert("Notes imported successfully!");
          } catch (err) {
              alert("Invalid backup file. Please select a valid NoteNest export.");
          }
      };
      reader.readAsText(file);

      e.target.value = ""; // reset so selecting the same file again still triggers onChange
  };

  //Render
  return (
    
    <>
    <div className={`app ${theme}`}>
      <Sidebar isCollapsed={isCollapsed} onToggle={() => setIsCollapsed(prev => !prev)} activeSection={activeSection} setActiveSection={setActiveSection} notebooks={notebooks} setNotebooks={setNotebooks} theme={theme} onDeleteNotebook={handleDeleteNotebook}/>
      <Topbar isCollapsed={isCollapsed} onNewNote={() => setIsEditorOpen(true)} onSearch={setSearchQuery} onToggleTheme={toggleTheme} theme={theme} onExport={exportData} onImport={importData}/>
      <main className={`main-content ${isCollapsed ? "collapsed" : ""}`}>
        {isEditorOpen || editingNote ? (
          <NoteEditor
            note={editingNote}
            onSave={handleAddNote}
            theme={theme}
            onClose={() => {
              setIsEditorOpen(false);
              setEditingNote(null);
            }}
          />
        ) : activeSection === "all" ? (
          <>
            <h2 className="notebook-title">All Notes</h2>
            <hr />
            {filteredNotes.length === 0 ? (
              <p>No notes found.</p>
            ) : (
            <NoteList
              notes={filteredNotes} 
              theme={theme}
              onEditNote={(note) => {
                setEditingNote(note);
                setIsEditorOpen(true);
              }}
              onPin={handlePin}
              onArchive={handleArchive}
              onDelete={handleDelete}
            />)}
          </>
        ) : activeSection === "pinned" ? (
          <>
            <h2 className="notebook-title">Pinned Notes</h2>
            <hr />
            {filteredNotes.length === 0 ? (
              <p>No notes found.</p>
            ) : (
            <NoteList
              notes={filteredNotes} 
              theme={theme}
              onEditNote={(note) => {
                setEditingNote(note);
                setIsEditorOpen(true);
              }}
              onPin={handlePin}
              onArchive={handleArchive}
              onDelete={handleDelete}
            />)}
          </>
        ) : activeSection === "archive" ? (
          <>
            <h2 className="notebook-title">Archive</h2>
            <hr />
            {filteredNotes.length === 0 ? (
              <p>No notes found.</p>
            ) : (
            <NoteList
              notes={filteredNotes} 
              theme={theme}
              onEditNote={(note) => {
                setEditingNote(note);
                setIsEditorOpen(true);
              }}
              onPin={handlePin}
              onArchive={handleArchive}
              onDelete={handleDelete}
            />)}
          </>
        ) : activeSection === "trash" ? (
          <>
            <h2 className="notebook-title">Trash</h2>
            <hr />
            {filteredNotes.length === 0 ? (
              <p>No notes found.</p>
            ) : (
            <NoteList
              notes={filteredNotes} 
              theme={theme}
              onEditNote={(note) => {
                setEditingNote(note);
                setIsEditorOpen(true);
              }}
              onPin={handlePin}
              onArchive={handleArchive}
              onDelete={handleDelete}
            />)}
          </>
        ) : activeSection === "sticky" ? (
          <>
              <h2 className="notebook-title">Sticky Notes</h2>
              <hr />
              <button className="save-btn" onClick={addStickyNote}>+ New Sticky Note</button>
              <StickyNoteBoard
                  stickyNote={stickyNotes}
                  onUpdatePosition={updateStickyNotePosition}
                  onChange={updateStickyNoteText}
                  onDelete={deleteStickyNote}
              />
          </>
        ) : (
          <>
            <h2 className="notebook-title">
              Notebook - {notebooks.find(nb => nb.id === activeSection)?.name}
            </h2>
            <hr />
            {filteredNotes.length === 0 ? (
              <p>No notes found.</p>
            ) : (
            <NoteList
              notes={filteredNotes} 
              theme={theme}
              onEditNote={(note) => {
                setEditingNote(note);
                setIsEditorOpen(true);
              }}
              onPin={handlePin}
              onArchive={handleArchive}
              onDelete={handleDelete}
            />)}
          </>
        )}
      </main>
      {isConfirmOpen && (
        <div className="confirm-modal-overlay">
            <div className="confirm-modal-box">
                <h3>Delete Note Permanently?</h3>
                <p>This note is already in Trash. Do you want to restore it or delete it forever?</p>
                <div className="confirm-modal-actions">
                    <button className="btn restore" onClick={confirmRestore}>Restore</button>
                    <button className="btn delete" onClick={confirmPermanentDelete}>Delete Permanently</button>
                    <button className="btn cancel" onClick={() => setIsConfirmOpen(false)}>Cancel</button>
                </div>
            </div>
        </div>
      )}
    </div>
    </>
  );
}

export default App;