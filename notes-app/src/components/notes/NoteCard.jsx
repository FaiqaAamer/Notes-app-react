import { MoreVertical, Pin } from "lucide-react";
import React, { useState } from "react"
import "./NoteCard.css"

function NoteCard({note  : {id, title, content, date, pinned}, isMenuOpen, onToggleMenu, onEdit, onPin, onDelete, onArchive, theme}){
    const styles = {
        minHeight : "250px",
        width : "220px",
        border : "2px solid #7B6A55",
        borderRadius : "5px",
        margin : "5px",
        padding : "5px",
        backgroundColor: theme === "dark" ? "#3a2d20" : "#fdf9f5",
    }
    const h2 = {
        margin : "5px",
        padding : "5px 0",
        textAlign : "center",
        fontFamily : "Cambria",
        fontSize : "20px",
        color: theme === "dark" ? "#fdf9f5" : "#2b2014",
    }
    const div = {
        margin : "10px 13px",
        padding: "8px 16px",
        backgroundColor: theme === "dark" ? "#4a3a2a" : "#fff",
        border : "2px solid #8b592b3a",
        borderRadius : "5px",
        height : "150px",
        overflow : "hidden",
        display : "-webkit-box",
        WebkitLineClamp : "5",
        WebkitBoxOrient : "vertical",
        textOverflow : "ellipsis",
        whiteSpace: "pre-line",      
        wordWrap: "break-word",   
        boxSizing : "border-box",
    }
    const footer = {
        display : "flex",
        alignItems : "center",
        justifyContent : "space-between",
        marginLeft : "15px",
        marginTop : "-10px",
        position : "relative"
    }
    const p2 = {
        fontWeight : "bold",
        paddingBottom : "25px",
        color: theme === "dark" ? "#fdf9f5" : "#000"
    }
    const menuBtn = {
        background : "none",
        border : "none",
        cursor : "pointer",
        paddingBottom : "25px",
        color : "#7B6A55",
        color: theme === "dark" ? "#c2a27a" : "#7B6A55"
    }
    const dropdown = {
        position : "absolute",
        right : "10px",
        top : "35px",
        backgroundColor: theme === "dark" ? "#3a2d20" : "#fff",
        border: `1px solid ${theme === "dark" ? "#c2a27a" : "#ccc"}`,
        borderRadius : "5px",
        boxShadow : "0 2px 6px rgba(0,0,0,0.15)",
        display : "flex",
        flexDirection : "column",
        zIndex : 10,
        minWidth : "120px"
    }
    const dropdownItem = {
        padding : "8px 12px",
        background : "none",
        border : "none",
        textAlign : "left",
        cursor : "pointer",
        fontSize : "14px",
        color: theme === "dark" ? "#fdf9f5" : "#000"
    }

    function sanitizePreviewHtml(html) {
        const temp = document.createElement("div");
        temp.innerHTML = html;
        temp.querySelectorAll("table").forEach(table => table.remove());
        temp.querySelectorAll("img").forEach(img => img.remove());
        return temp.innerHTML;

    }


    return(<div style={styles} className="note-card" onClick={onEdit}>
        <h2 style={h2}>{title} {pinned && (<Pin size={16} color="#7B6A55" style={{ marginLeft: "6px", verticalAlign: "middle" }} />)}</h2>
        <div
            style={div}
            className="note-preview-content"
            dangerouslySetInnerHTML={{ __html: sanitizePreviewHtml(content) }}>
        </div>
        <div style={footer}>
            <p style={p2}>{date}</p>
            <button style={menuBtn} onClick={(e) => { e.stopPropagation(); onToggleMenu()}} > 
                <MoreVertical size={18} />
            </button>
            {isMenuOpen && (
                <div style={dropdown}>
                    <button style={dropdownItem} onClick={(e) => {e.stopPropagation(); onPin(id); onToggleMenu()}}>Pin</button>
                    <button style={dropdownItem} onClick={(e) => {e.stopPropagation(); onArchive(id); onToggleMenu()}}>Archive</button>
                    <button style={dropdownItem} onClick={(e) => {e.stopPropagation(); onDelete(id); onToggleMenu()}}>Delete</button>
                </div>
            )}
        </div>
    </div>)
}

export default NoteCard