import React from "react";
import "./Topbar.css";

function Topbar({ onNewNote, onSearch, onToggleTheme, isCollapsed }) {
  return (
    <header className={`topbar ${isCollapsed ? "collapsed" : ""}`}>
      <input
        type="text"
        placeholder="Search notes..."
        onChange={(e) => onSearch && onSearch(e.target.value)}
      />
      <div className="actions">
        <button onClick={onNewNote}>+ New Note</button>
        <button onClick={onToggleTheme}>Toggle Theme</button>
      </div>
    </header>
  );
}

export default Topbar;