import { useState, useEffect } from "react";
import Sidebar from "./components/layout/Sidebar";
import Topbar from "./components/layout/Topbar";
import NoteList from "./components/notes/NoteList";
import NoteEditor from './components/notes/NoteEditor'
import './components/common/Modal.css'

function App() {

  const [isCollapsed, setIsCollapsed] = useState(false);
  const [activeSection, setActiveSection] = useState("all"); 
  const [isEditorOpen, setIsEditorOpen] = useState(false);
  const [notes, setNotes] = useState([]);
  const [editingNote, setEditingNote] = useState(null);
  const [notebooks, setNotebooks] = useState([]);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [noteToDelete, setNoteToDelete] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");


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

  return (
    
    <>
      <Sidebar isCollapsed={isCollapsed} onToggle={() => setIsCollapsed(prev => !prev)} activeSection={activeSection} setActiveSection={setActiveSection} notebooks={notebooks} setNotebooks={setNotebooks}/>
      <Topbar isCollapsed={isCollapsed} onNewNote={() => setIsEditorOpen(true)} onSearch={setSearchQuery}/>
      <main className={`main-content ${isCollapsed ? "collapsed" : ""}`}>
        {isEditorOpen || editingNote ? (
          <NoteEditor
            note={editingNote}
            onSave={handleAddNote}
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
              onEditNote={(note) => {
                setEditingNote(note);
                setIsEditorOpen(true);
              }}
              onPin={handlePin}
              onArchive={handleArchive}
              onDelete={handleDelete}
            />)}
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
        <div className="modal-overlay">
            <div className="modal-box">
                <h3>Delete Note Permanently?</h3>
                <p>This note is already in Trash. Do you want to restore it or delete it forever?</p>
                <div className="modal-actions">
                    <button className="btn restore" onClick={confirmRestore}>Restore</button>
                    <button className="btn delete" onClick={confirmPermanentDelete}>Delete Permanently</button>
                    <button className="btn cancel" onClick={() => setIsConfirmOpen(false)}>Cancel</button>
                </div>
            </div>
        </div>
      )}

    </>
  );
}

export default App;