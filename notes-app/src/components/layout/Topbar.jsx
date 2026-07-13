import React, { useRef, useState } from "react";
import { MoreVertical } from "lucide-react";
import "./Topbar.css";

function Topbar({ onNewNote, onSearch, onToggleTheme, isCollapsed, onExport, onImport }) {
    const fileInputRef = useRef(null);
    const [menuOpen, setMenuOpen] = useState(false);

    return (
        <header className={`topbar ${isCollapsed ? "collapsed" : ""}`}>
            <input
                type="text"
                placeholder="Search notes..."
                onChange={(e) => onSearch && onSearch(e.target.value)}
            />
            <div className="actions">
                <button onClick={onNewNote}>+ New Note</button>

                {/* Desktop: show all buttons directly */}
                <div className="desktop-actions">
                    <button onClick={onToggleTheme}>Toggle Theme</button>
                    <button onClick={onExport}>Export</button>
                    <button onClick={() => fileInputRef.current.click()}>Import</button>
                </div>

                {/* Mobile: show a "more" menu instead */}
                <div className="mobile-menu-wrapper">
                    <button className="more-btn" onClick={() => setMenuOpen(prev => !prev)}>
                        <MoreVertical size={20} />
                    </button>
                    {menuOpen && (
                        <div className="mobile-dropdown">
                            <button onClick={() => { onToggleTheme(); setMenuOpen(false); }}>Toggle Theme</button>
                            <button onClick={() => { onExport(); setMenuOpen(false); }}>Export</button>
                            <button onClick={() => { fileInputRef.current.click(); setMenuOpen(false); }}>Import</button>
                        </div>
                    )}
                </div>

                <input
                    type="file"
                    accept=".json"
                    ref={fileInputRef}
                    style={{ display: "none" }}
                    onChange={onImport}
                />
            </div>
        </header>
    );
}

export default Topbar;