import React from "react";
import {
  NotebookPen,
  FileText,
  Pin,
  Archive,
  Trash2,
  Briefcase,
  Home,
  Lightbulb,
  ArrowLeft,
  ArrowRight,
  Plus,
} from "lucide-react";
import "./Sidebar.css";

function Sidebar({ isCollapsed, onToggle }) {
  const dummyNotebooks = [
    { id: 1, name: "Work", count: 5, icon: <Briefcase size={18} />},
    { id: 2, name: "Personal", count: 3, icon: <Home size={18} /> },
    { id: 3, name: "Ideas", count: 7, icon: <Lightbulb size={18} /> },
  ];

  const activeNotebook = 1;

  return (
    <aside className={`sidebar ${isCollapsed ? "collapsed" : ""}`}>
      {/* Top: App name + toggle arrow */}
      <div className="sidebar-header">
        {!isCollapsed && <span className="app-name"><NotebookPen size={13} />&nbsp; Notes App</span>}
        <button className="toggle-btn" onClick={onToggle}>
          {isCollapsed ? <ArrowRight size={15} /> : <ArrowLeft size={15} />}
        </button>
      </div>

      {/* App Sections */}
      <nav>
        <ul>
          <li title="All Notes">
            {isCollapsed && <span className="icon"><FileText size={18} /></span>}
            {!isCollapsed && <span>All Notes</span>}
          </li>
          <li title="Pinned">
            {isCollapsed && <span className="icon"><Pin size={18} /></span>}
            {!isCollapsed && <span>Pinned</span>}
          </li>
          <li title="Archive">
            {isCollapsed && <span className="icon"><Archive size={18} /></span>}
            {!isCollapsed && <span>Archive</span>}
          </li>
          <li title="Trash">
            {isCollapsed && <span className="icon"><Trash2 size={18} /></span>}
            {!isCollapsed && <span>Trash</span>}
          </li>
        </ul>
      </nav>

      {/* Notebook List */}
      <div className="notebook-list">
        {!isCollapsed && <h4>Notebooks</h4>}
        <ul>
          {dummyNotebooks.map((nb) => (
            <li
              key={nb.id}
              title={nb.name}
              className={nb.id === activeNotebook ? "active" : ""}
            >
              {isCollapsed && <span className="icon">{nb.icon}</span>}
              {!isCollapsed && <span>{nb.name}&nbsp;-&nbsp;{nb.count}</span>}
            </li>
          ))}
        </ul>
      </div>

      {/* New Notebook Button */}
      <button className="new-notebook-btn" title="New Notebook">
        {isCollapsed ? "+" : "+ New Notebook"}
      </button>
    </aside>
  );
}

export default Sidebar;