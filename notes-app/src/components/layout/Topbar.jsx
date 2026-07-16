import React, { useRef, useState } from "react";
import { MoreVertical, Sun, Moon, Download, Upload } from "lucide-react";
import "./Topbar.css";

function Topbar({ onNewNote, onSearch, onToggleTheme, isCollapsed, onExport, onImport, theme}) {
    const fileInputRef = useRef(null);
    const [menuOpen, setMenuOpen] = useState(false);
    const isDark = theme === "dark";

    return (
        <header className={`topbar ${isCollapsed ? "collapsed" : ""}`}>
            <input
                type="text"
                placeholder="Search notes..."
                onChange={(e) => onSearch && onSearch(e.target.value)}
            />
            <div className="actions">
                <button className="new-btn" onClick={onNewNote}>+ New Note</button>

                {/* Desktop: show all buttons directly */}
                <div className="desktop-actions">
                    <button
                        className={`theme-toggle ${isDark ? "dark" : "light"}`}
                        onClick={onToggleTheme}
                        aria-label="Toggle theme"
                    >
                        <span className="theme-toggle-knob">
                            {isDark ? <Moon size={16} /> : <Sun size={16} />}
                        </span>
                    </button>
                    <button className="icon-btn" onClick={onExport} title="Export" aria-label="Export">
                        <Download size={18} />
                    </button>
                    <button className="icon-btn" onClick={() => fileInputRef.current.click()} title="Import" aria-label="Import">
                        <Upload size={18} />
                    </button>
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