import { useState, useEffect } from "react";
import Sidebar from "./components/layout/Sidebar";
import Topbar from "./components/layout/Topbar";
import NoteList from "./components/notes/NoteList";
import NoteEditor from './components/notes/NoteEditor'

function App() {

  // return(<NoteEditor />)

  const [isCollapsed, setIsCollapsed] = useState(false);
  const [activeNotebookId, setActiveNotebookId] = useState(null);
  const [isEditorOpen, setIsEditorOpen] = useState(false);
  const [notes, setNotes] = useState([]);
  const [editingNote, setEditingNote] = useState(null);

  useEffect(() => {
    function handleResize() {
      if (window.innerWidth <= 480) {
        setIsCollapsed(true);
      }
    }
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

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
      };
      setNotes([...notes, newNote]);
    }
  };

  return (
    
    <>
      <Sidebar isCollapsed={isCollapsed} onToggle={() => setIsCollapsed(prev => !prev)} activeNotebookId={activeNotebookId}  onSelectNotebook={setActiveNotebookId}/>
      <Topbar isCollapsed={isCollapsed} onNewNote={() => setIsEditorOpen(true)}/>
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
        ) : (
          <NoteList
            notes={notes}
            onEditNote={(note) => {
              setEditingNote(note);      
              setIsEditorOpen(true);     
            }}
          />
        )}
      </main>

    </>
  );
}

export default App;