import StickyNote from "./StickyNote.jsx";
import "./StickyNote.css";

function StickyNoteBoard({stickyNote, onUpdatePosition, onDelete, onChange}){
    return(<div className="sticky-note-board">
      {stickyNote.map(note => (
        <StickyNote
          key={note.id}
          note={note}
          onUpdatePosition={onUpdatePosition}
          onDelete={onDelete}
          onChange={onChange}
        />
      ))}
    </div>)
}

export default StickyNoteBoard