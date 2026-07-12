import { useState } from 'react';
import NoteCard from './NoteCard.jsx'
import "./NoteCard.css"

function NoteList({notes, onEditNote, onPin, onArchive, onDelete}){
    const [openMenuId, setOpenMenuId] = useState(null)
    
    const handleAddNote = (title, content, notebookId = null) => {
        const newNote = {
            id : notes.length + 1,
            title,
            content,
            date : new Date().toLocaleDateString(),
            notebookId
        }
        setNotes([...notes, newNote])
    }

    const styles = {
        display : "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
        gap : "0.5rem",
        padding: "1rem",
        boxSizing : "border-box"
    }
    return(<div style={styles} className='node-list'>
        {notes.map((note) => (<NoteCard key={note.id} note={note}
                                    isMenuOpen={openMenuId === note.id}
                                    onToggleMenu={() => setOpenMenuId (prev => (prev === note.id ? null : note.id))}
                                    onEdit={() => onEditNote(note)}
                                    onPin={onPin}
                                    onArchive={onArchive}
                                    onDelete={onDelete}
                                />))}
    </div>)
}

export default NoteList