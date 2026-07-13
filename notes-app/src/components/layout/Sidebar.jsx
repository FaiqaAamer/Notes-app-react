import React, {useState} from "react";
import {
  NotebookPen,
  Feather,
  FileText,
  Pin,
  Archive,
  Trash2,
  Briefcase,
  Home,
  Lightbulb,
  StickyNote as StickyNoteIcon,
  ArrowLeft,
  ArrowRight,
  Plus,
} from "lucide-react";
import "./Sidebar.css";
import Modal from "../common/Modal";

function Sidebar({ isCollapsed, onToggle, activeSection, setActiveSection, notebooks, setNotebooks, onDeleteNotebook}) {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [newNotebookName, setNewNotebookName] = useState("")

  const handleAddNotebook = () => {
    if(newNotebookName.trim() === "") return
    const newId = notebooks.length + 1
    const newNotebook = {
      id : newId,
      name : newNotebookName,
      count : 0,
      icon : <NotebookPen size={18}/>
    }
    setNotebooks([...notebooks, newNotebook])
    setNewNotebookName("")
    setIsModalOpen(false)
  }

  return (
    <aside className={`sidebar ${isCollapsed ? "collapsed" : ""}`}>
      {/* Top: App name + toggle arrow */}
      <div className="sidebar-header">
        {!isCollapsed && <span className="app-name"> <Feather size={15} /> <span>NoteNest</span> </span>}
        <button className="toggle-btn" onClick={onToggle}>
          {isCollapsed ? <ArrowRight size={15} /> : <ArrowLeft size={15} />}
        </button>
      </div>

      {/* App Sections */}
      <nav>
        <ul>
          <li title="All Notes" className={activeSection === "all" ? "active" : ""} onClick={() => setActiveSection("all")}>
            {isCollapsed && <span className="icon"><FileText size={18} /></span>}
            {!isCollapsed && <span>All Notes</span>}
          </li>
          <li title="Pinned" className={activeSection === "pinned" ? "active" : ""} onClick={() => setActiveSection("pinned")}>
            {isCollapsed && <span className="icon"><Pin size={18} /></span>}
            {!isCollapsed && <span>Pinned</span>}
          </li>
          <li title="Archive" className={activeSection === "archive" ? "active" : ""} onClick={() => setActiveSection("archive")}>
            {isCollapsed && <span className="icon"><Archive size={18} /></span>}
            {!isCollapsed && <span>Archive</span>}
          </li>
          <li title="Trash" className={activeSection === "trash" ? "active" : ""} onClick={() => setActiveSection("trash")}>
            {isCollapsed && <span className="icon"><Trash2 size={18} /></span>}
            {!isCollapsed && <span>Trash</span>}
          </li>
          <li title="Sticky Notes" onClick={() => setActiveSection("sticky")} className={activeSection === "sticky" ? "active" : ""}>
            {isCollapsed && <span className="icon"><StickyNoteIcon size={18} /></span>}
            {!isCollapsed && <span>Sticky Notes</span>}
          </li>
        </ul>
      </nav>

      {/* Notebook List */}
      <div className="notebook-list">
        {!isCollapsed && <h4>Notebooks</h4>}
        <ul>
          {notebooks.length === 0 && !isCollapsed && (
            <li className="empty">No notebooks yet</li>
          )}
          {notebooks.map((nb) => (
            <li key={nb.id} className={activeSection === nb.id ? "active" : ""} title={nb.name} onClick={() => setActiveSection(nb.id)}>
                {isCollapsed ? (
                    <span className="icon">{nb.icon}</span>
                ) : (
                    <>
                        <span>&nbsp;&nbsp;{nb.name}&nbsp; - &nbsp;{nb.count}</span>
                        <button
                            className="notebook-delete-btn"
                            onClick={(e) => {
                                e.stopPropagation();  // prevent triggering setActiveSection
                                onDeleteNotebook(nb.id);
                            }}
                        >
                            ✕
                        </button>
                    </>
                )}
            </li>
          ))}
        </ul>
      </div>

      {/* New Notebook Button */}
      <button className="new-notebook-btn" onClick={() => setIsModalOpen(true)} title="New Notebook">
        {isCollapsed ? "+" : "+ New Notebook"}
      </button>
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
          <h3>Add New Notebook</h3>
          <input type="text" placeholder="Notebook Title" value={newNotebookName} onChange={(e) => setNewNotebookName(e.target.value)}/>
          <div className="notebook-modal-actions">
            <button onClick={handleAddNotebook}>Add</button>
            <button onClick={() => setIsModalOpen(false)}>Cancel</button>
          </div>
      </Modal>
    </aside>
  );
}

export default Sidebar;